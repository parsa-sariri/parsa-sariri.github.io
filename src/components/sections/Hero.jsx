import { useEffect, useRef, lazy, Suspense } from 'react';
import { ChevronDown, Terminal, Shield, Radio } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// Load the Three.js particle network on demand — it's the heaviest module
// (~500KB) and only needed in the hero, so the initial page loads faster.
const ParticleNetwork = lazy(() => import('@/components/three/ParticleNetwork'));

export default function Hero({ reducedMotion }) {
  const { t, lang } = useLanguage();
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el || reducedMotion) return;
    function onScroll() {
      const scrollY = window.scrollY;
      const pct = Math.min(scrollY / window.innerHeight, 1);
      el.style.transform = `translateY(${-scrollY * 0.15}px) scale(${1 - pct * 0.05})`;
      el.style.opacity = String(Math.max(0, 1 - pct / 0.7));
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  const name1 = lang === 'fa' ? 'پارسا' : 'PARSA';
  const name2 = lang === 'fa' ? 'سریری آجیلی' : 'SARIRI AJILI';

  return (
    <section id="nexus" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 grid-bg opacity-30" />}>
          <ParticleNetwork reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div
        ref={titleRef}
        className="relative z-10 text-center px-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 glass rounded-full">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
            {t.hero.systemOnline}
          </span>
        </div>

        <h1 className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-gradient-cobalt text-glow leading-none mb-4">
          {name1}
        </h1>
        <p className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[hsl(var(--foreground))] leading-none mb-2">
          {name2}
        </p>

        <p className="font-body text-base sm:text-lg text-[hsl(var(--muted-foreground))] mt-6 max-w-xl mx-auto">
          {t.hero.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
            <Radio className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-heading tracking-wider text-[hsl(var(--muted-foreground))]">
              {t.hero.birthTag}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
            <Terminal className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-heading tracking-wider text-[hsl(var(--muted-foreground))]">
              {t.hero.statusTag}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border-[hsl(var(--accent)/0.3)]">
            <Shield className="w-4 h-4 text-[hsl(var(--accent))]" />
            <span className="text-xs font-heading tracking-wider text-[hsl(var(--accent))]">
              {t.hero.pivotTag}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#stack"
            className="px-8 py-3 bg-[hsl(var(--primary))] text-white font-heading text-sm font-semibold tracking-widest rounded-lg hover:bg-[hsl(var(--primary)/0.8)] transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
          >
            {t.hero.viewStack}
          </a>
          <a
            href="#connect"
            className="px-8 py-3 glass text-[hsl(var(--foreground))] font-heading text-sm font-semibold tracking-widest rounded-lg hover:border-[hsl(var(--accent))] transition-all"
          >
            {t.hero.initiateContact}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-heading tracking-widest text-[hsl(var(--muted-foreground))]">
          {t.hero.scrollToTraverse}
        </span>
        <ChevronDown className="w-5 h-5 text-[hsl(var(--primary))] animate-bounce" />
      </div>
    </section>
  );
}