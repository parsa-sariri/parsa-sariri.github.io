import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Award, Shield, ChevronRight, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { CASES, CATEGORY_ORDER } from '@/lib/writeupsData';

export default function WriteupsCatalog() {
  const { t, lang } = useLanguage();
  const { reducedMotion, toggleMotion } = useReducedMotion();
  const w = t.writeups;
  const [filter, setFilter] = useState('all');

  const visible = CASES.filter((c) => filter === 'all' || c.category === filter);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar reducedMotion={reducedMotion} onToggleMotion={toggleMotion} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[hsl(var(--muted-foreground))] hover:text-cyan-300 transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            {w.backHome}
          </Link>

          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
                {w.catalogBadge}
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
              {w.title1} <span className="text-gradient-cobalt">{w.title2}</span>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              {w.catalogSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs" delay={100}>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-md border transition-all ${
                  filter === cat
                    ? 'bg-cyan-500 text-black font-semibold border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    : 'bg-[hsl(var(--secondary)/0.4)] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border)/0.6)] hover:text-cyan-300 hover:border-cyan-500/40'
                }`}
              >
                [{w.categories[cat]}]
              </button>
            ))}
          </ScrollReveal>

          {visible.length === 0 && (
            <ScrollReveal className="glass rounded-xl p-10 text-center" delay={150}>
              <AlertTriangle className="w-6 h-6 text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
              <p className="font-heading text-sm text-[hsl(var(--foreground))] mb-1">{w.emptyTitle}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-sm mx-auto">{w.emptyDesc}</p>
            </ScrollReveal>
          )}

          <div className="grid grid-cols-1 gap-4">
            {visible.map((item, idx) => {
              const data = w[item.i18nKey];
              return (
                <ScrollReveal key={item.id} delay={150 + idx * 80}>
                  <Link
                    to={`/writeups/${item.id}`}
                    className={`group block p-6 sm:p-7 rounded-xl transition-all ${
                      item.featured
                        ? 'bg-gradient-to-br from-amber-400/10 via-transparent to-transparent border border-amber-400/30 hover:border-amber-400/60'
                        : 'glass hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-semibold">
                          [{w.categories[item.category]}]
                        </span>
                        {item.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-semibold">
                            <Award className="w-3 h-3" />
                            {w.featuredBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[hsl(var(--muted-foreground))]">{item.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[hsl(var(--muted-foreground))] flex-shrink-0" />
                      {data.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))] mb-4 leading-relaxed">
                      {data.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[11px]">
                      {item.tools.map((tool) => (
                        <span key={tool} className="px-2 py-0.5 rounded bg-[hsl(var(--secondary)/0.6)] text-slate-300 border border-[hsl(var(--border)/0.6)]">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs pt-3 border-t border-[hsl(var(--border)/0.6)] text-[hsl(var(--muted-foreground))]">
                      <span>{w.difficulty}: <strong className="text-slate-200">{item.difficulty[lang]}</strong></span>
                      <span className="text-cyan-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                        {w.readFull}
                        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
