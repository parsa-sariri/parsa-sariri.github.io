import { useState, useEffect } from 'react';
import { Server, ChevronRight, X, Cpu, Network, Terminal, Boxes, Monitor, HardDrive } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const certifications = [
  { code: 'A+', nameKey: 'aplus', icon: Cpu, rack: '01', color: 'primary' },
  { code: 'NET+', nameKey: 'netplus', icon: Network, rack: '02', color: 'primary' },
  { code: 'MCSA', nameKey: 'mcsa', icon: Monitor, rack: '03', color: 'primary' },
  { code: 'LPIC-1', nameKey: 'lpic1', icon: Terminal, rack: '04', color: 'accent' },
  { code: 'PYNET', nameKey: 'pynet', icon: Terminal, rack: '05', color: 'accent' },
  { code: 'CCNA', nameKey: 'ccna', icon: Network, rack: '06', color: 'primary' },
  { code: 'MTCNA', nameKey: 'mtcna', icon: Network, rack: '07', color: 'primary' },
  { code: 'LPIC-2', nameKey: 'lpic2', icon: Terminal, rack: '08', color: 'accent' },
  { code: 'VCP', nameKey: 'vcp', icon: Boxes, rack: '09', color: 'primary' },
  { code: 'B&M', nameKey: 'bm', icon: HardDrive, rack: '10', color: 'primary' },
];

export default function Skills() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const selectedInfo = selected ? t.certs[selected.nameKey] : null;

  // Close modal on ESC key
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[hsl(var(--primary)/0.08)] rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
            <Server className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
              {t.skills.label}
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
            {t.skills.title1} <span className="text-gradient-cobalt">{t.skills.title2}</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            {t.skills.description}
          </p>
        </ScrollReveal>

        <div className="perspective-rack max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[hsl(var(--border))]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[hsl(var(--destructive)/0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(var(--accent)/0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary)/0.6)]" />
              </div>
              <span className="font-heading text-xs tracking-widest text-[hsl(var(--muted-foreground))]">
                {t.skills.rackInfo}
              </span>
            </div>

            <div className="space-y-2">
              {certifications.map((cert, idx) => {
                const Icon = cert.icon;
                const info = t.certs[cert.nameKey];
                const isAccent = cert.color === 'accent';
                return (
                  <div
                    key={cert.code}
                    className="rack-blade group relative cursor-pointer"
                    onClick={() => setSelected(cert)}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border)/0.4)] hover:border-[hsl(var(--primary)/0.6)] transition-all duration-300 hover:bg-[hsl(var(--secondary))]">
                      <span className="font-heading text-xs text-[hsl(var(--muted-foreground))] w-6">
                        {cert.rack}
                      </span>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAccent ? 'bg-[hsl(var(--accent)/0.1)]' : 'bg-[hsl(var(--primary)/0.1)]'}`}>
                        <Icon className={`w-5 h-5 ${isAccent ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className={`font-heading font-bold text-sm tracking-wider ${isAccent ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>
                            {cert.code}
                          </span>
                          <span className="font-body font-medium text-sm sm:text-base text-[hsl(var(--foreground))] truncate">
                            {info.name}
                          </span>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block px-3 py-1 text-[10px] font-heading tracking-widest rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                        {info.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] rtl:rotate-180 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selected && selectedInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-strong rounded-2xl max-w-lg w-full p-8 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${selected.color === 'accent' ? 'bg-[hsl(var(--accent)/0.1)]' : 'bg-[hsl(var(--primary)/0.1)]'}`}>
                <selected.icon className={`w-7 h-7 ${selected.color === 'accent' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[hsl(var(--foreground))]">
                  {selectedInfo.name}
                </h3>
                <span className="text-xs font-heading tracking-widest text-[hsl(var(--muted-foreground))]">
                  BLADE_{selected.rack} // {selectedInfo.category}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-heading tracking-widest text-[hsl(var(--primary))] mb-3">
                {t.skills.masteryPoints}
              </p>
              {selectedInfo.mastery.map((point, i) => (
                <div key={point} className="flex items-center gap-3 p-2 rounded-md bg-[hsl(var(--secondary)/0.5)]">
                  <span className="font-heading text-xs text-[hsl(var(--primary))]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-[hsl(var(--foreground))]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}