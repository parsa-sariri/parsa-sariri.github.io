import { useEffect, useRef, useState } from 'react';
import { Radio, ShieldCheck, ArrowRight, Cpu, Lock, Server, Network, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

function AnimatedProgress({ value, className }) {
  const trackRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={trackRef} className="flex-1 h-2 rounded-full bg-[hsl(var(--secondary))] overflow-hidden">
      <div
        className={`h-full rounded-full ${className}`}
        style={{
          width: isVisible ? `${value}%` : '0%',
          transition: 'width 1800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}

export default function Trajectory() {
  const { t, lang } = useLanguage();

  const currentGrid = [
    { icon: Network, label: t.trajectory.currentGrid ? t.trajectory.currentGrid.routing : 'Routing & Switching' },
    { icon: Cpu, label: t.trajectory.currentGrid ? t.trajectory.currentGrid.infra : 'Infrastructure' },
    { icon: Server, label: t.trajectory.currentGrid ? t.trajectory.currentGrid.server : 'Server Administration' },
    { icon: Shield, label: t.trajectory.currentGrid ? t.trajectory.currentGrid.defense : 'Network Defense' },
  ];
  const futureGrid = [
    { icon: Lock, label: t.trajectory.futureGrid ? t.trajectory.futureGrid.pentest : 'Penetration Testing' },
    { icon: Shield, label: t.trajectory.futureGrid ? t.trajectory.futureGrid.threat : 'Threat Analysis' },
    { icon: Server, label: t.trajectory.futureGrid ? t.trajectory.futureGrid.secArch : 'Sec Architecture' },
    { icon: Cpu, label: t.trajectory.futureGrid ? t.trajectory.futureGrid.incident : 'Incident Response' },
  ];

  const timeline = [
    { year: lang === 'fa' ? '۲۰۰۷' : '2007', event: lang === 'fa' ? 'تولد' : 'BORN', done: true },
    { year: lang === 'fa' ? 'اکنون' : 'NOW', event: lang === 'fa' ? 'مهندسی شبکه' : 'NETWORK_ENGINEERING', done: true },
    { year: lang === 'fa' ? 'بعدی' : 'NEXT', event: lang === 'fa' ? 'تحصیل امنیت سایبری' : 'CYBERSECURITY_STUDIES', done: false },
    { year: lang === 'fa' ? 'آینده' : 'FUTURE', event: lang === 'fa' ? 'معمار امنیت' : 'SECURITY_ARCHITECT', done: false },
  ];

  return (
    <section id="trajectory" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.3)] to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
            <Radio className="w-4 h-4 text-[hsl(var(--accent))]" />
            <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
              {t.trajectory.label}
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
            {t.trajectory.titleFrom} <span className="text-gradient-cobalt">{t.trajectory.titleNetwork}</span>{' '}
            {t.trajectory.titleTo} <span className="text-gradient-amber">{t.trajectory.titleSecurity}</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            {t.trajectory.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 gap-6 relative" delay={150}>
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 overflow-hidden z-10">
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent data-pulse" />
          </div>
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-strong items-center justify-center">
            <ArrowRight className="w-6 h-6 text-[hsl(var(--accent))] rtl:rotate-180" />
          </div>

          {/* Current: Networking */}
          <div className="glass rounded-2xl p-8 relative overflow-hidden scanline">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(var(--primary)/0.1)] rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                  <Radio className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <span className="text-xs font-heading tracking-widest text-[hsl(var(--primary))]">
                    {t.trajectory.currentState}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[hsl(var(--foreground))]">
                    {t.trajectory.networkMastery}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {currentGrid.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border)/0.4)]">
                      <Icon className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                      <span className="text-xs text-[hsl(var(--foreground))]">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t.trajectory.currentDesc}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <AnimatedProgress
                  value={85}
                  className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]"
                />
                <span className="font-heading text-xs text-[hsl(var(--primary))]">85%</span>
              </div>
              <span className="text-[10px] font-heading tracking-widest text-[hsl(var(--muted-foreground))] mt-1 block">
                {t.trajectory.masteryLevel}
              </span>
            </div>
          </div>

          {/* Future: Cybersecurity */}
          <div className="glass rounded-2xl p-8 relative overflow-hidden scanline border-[hsl(var(--accent)/0.2)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(var(--accent)/0.1)] rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--accent)/0.1)] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[hsl(var(--accent))]" />
                </div>
                <div>
                  <span className="text-xs font-heading tracking-widest text-[hsl(var(--accent))]">
                    {t.trajectory.nextVector}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[hsl(var(--foreground))]">
                    {t.trajectory.cybersecurity}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {futureGrid.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border)/0.4)]">
                      <Icon className="w-4 h-4 text-[hsl(var(--accent))] flex-shrink-0" />
                      <span className="text-xs text-[hsl(var(--foreground))]">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t.trajectory.futureDesc}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <AnimatedProgress
                  value={10}
                  className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.5)] animate-pulse"
                />
                <span className="font-heading text-xs text-[hsl(var(--accent))]">10%</span>
              </div>
              <span className="text-[10px] font-heading tracking-widest text-[hsl(var(--muted-foreground))] mt-1 block">
                {t.trajectory.inProgress}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-12 glass rounded-xl p-6" delay={300}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {timeline.map((stop, i) => (
              <div key={i} className="flex items-center gap-3 flex-1 min-w-[140px]">
                <div className={`w-3 h-3 rounded-full ${stop.done ? 'bg-[hsl(var(--primary))]' : 'border-2 border-[hsl(var(--accent))]'} flex-shrink-0`} />
                <div>
                  <div className={`font-heading text-sm font-bold ${stop.done ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--accent))]'}`}>
                    {stop.year}
                  </div>
                  <div className="text-[10px] font-heading tracking-wider text-[hsl(var(--muted-foreground))]">
                    {stop.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
