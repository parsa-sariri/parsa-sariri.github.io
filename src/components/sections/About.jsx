import { useEffect, useMemo, useRef, useState } from 'react';
import { User, Award, Calendar, MapPin, Activity, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

function AnimatedStatValue({ value, lang }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const normalizedValue = String(value).replace(/[۰-۹]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit));
  const target = Number.parseInt(normalizedValue, 10);
  const suffix = normalizedValue.replace(/^\d+/, '');

  useEffect(() => {
    const element = ref.current;
    if (!element || Number.isNaN(target)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!hasStarted || Number.isNaN(target)) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return undefined;
    }

    const duration = 1800;
    let frameId;
    let startTime;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, target]);

  if (Number.isNaN(target)) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{lang === 'fa' ? count.toLocaleString('fa-IR') : count}{suffix}</span>;
}

function TerminalBio({ lines, lang }) {
  const terminalRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [command, setCommand] = useState('');
  const [commandComplete, setCommandComplete] = useState(false);
  const [output, setOutput] = useState(() => lines.map(() => ''));

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(terminal);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return undefined;

    let cancelled = false;
    const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const showEverything = () => {
      setCommand('cat about.md');
      setCommandComplete(true);
      setOutput(lines);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showEverything();
      return undefined;
    }

    async function typeTerminal() {
      const commandText = 'cat about.md';
      setCommand('');
      setCommandComplete(false);
      setOutput(lines.map(() => ''));

      for (let index = 0; index < commandText.length; index += 1) {
        if (cancelled) return;
        setCommand(commandText.slice(0, index + 1));
        await wait(85);
      }

      await wait(350);
      if (cancelled) return;
      setCommandComplete(true);
      await wait(450);

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        for (let characterIndex = 0; characterIndex < lines[lineIndex].length; characterIndex += 1) {
          if (cancelled) return;
          const typedLine = lines[lineIndex].slice(0, characterIndex + 1);
          setOutput((currentOutput) => currentOutput.map((line, index) => (
            index === lineIndex ? typedLine : line
          )));
          await wait(12);
        }

        await wait(260);
      }
    }

    typeTerminal();
    return () => { cancelled = true; };
  }, [hasStarted, lang, lines]);

  return (
    <div ref={terminalRef} className="h-full">
      <div className="flex items-center gap-2 mb-6 font-heading text-xs" dir="ltr">
        <span className="text-[hsl(var(--primary))]">~/</span>
        <span className="text-[hsl(var(--muted-foreground))]">{command}</span>
        {!commandComplete && <span className="text-[hsl(var(--accent))] blink">_</span>}
      </div>

      {commandComplete && (
        <div dir={lang === 'fa' ? 'rtl' : 'ltr'}>
          <p className="text-[hsl(var(--foreground))] leading-relaxed mb-4">
            {output[0]}
            {output[0].length < lines[0].length && <span className="text-[hsl(var(--accent))] blink">_</span>}
          </p>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
            {output[1]}
            {output[0].length === lines[0].length && output[1].length < lines[1].length && <span className="text-[hsl(var(--accent))] blink">_</span>}
          </p>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
            {output[2]}
            {output[1].length === lines[1].length && output[2].length < lines[2].length && <span className="text-[hsl(var(--accent))] blink">_</span>}
          </p>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.about;

  const stats = [
    { icon: Award, value: '10+', label: a.statsCerts, color: 'primary' },
    { icon: Zap, value: '8+', label: a.statsDomains, color: 'accent' },
    { icon: Calendar, value: lang === 'fa' ? '۱۹' : '19', label: a.statsAge, color: 'primary' },
    { icon: Activity, value: '∞', label: a.statsLearning, color: 'accent' },
  ];

  const focus = lang === 'fa'
    ? ['سیسکو', 'میکروتیک', 'لینوکس', 'مایکروسافت', 'مجازی‌سازی', 'اتوماسیون', 'پایتون', 'امنیت']
    : ['Cisco', 'MikroTik', 'Linux', 'Microsoft', 'Virtualization', 'Automation', 'Python', 'Security'];
  const bioLines = useMemo(() => [a.bio1, a.bio2, a.bio3], [a.bio1, a.bio2, a.bio3]);

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-[hsl(var(--primary)/0.06)] rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
            <User className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
              {a.label}
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
            {a.title1} <span className="text-gradient-cobalt">{a.title2}</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Bio */}
          <ScrollReveal className="lg:col-span-3" delay={100}>
            <div className="glass rounded-2xl p-8 h-full scanline">
              <TerminalBio lines={bioLines} lang={lang} />

              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[hsl(var(--border))]">
                {focus.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-[10px] font-heading tracking-widest rounded-full glass text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats grid */}
          <ScrollReveal className="lg:col-span-2" delay={200}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                const isAccent = stat.color === 'accent';
                return (
                  <div
                    key={i}
                    className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary)/0.4)] transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${isAccent ? 'bg-[hsl(var(--accent)/0.1)]' : 'bg-[hsl(var(--primary)/0.1)]'} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${isAccent ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`} />
                    </div>
                    <div className={`font-heading font-bold text-3xl ${isAccent ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>
                      <AnimatedStatValue value={stat.value} lang={lang} />
                    </div>
                    <div className="text-[10px] font-heading tracking-widest text-[hsl(var(--muted-foreground))] mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
