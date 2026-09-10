import { Link } from 'react-router-dom';
import { Terminal, Award, Github, ExternalLink, ChevronRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import CredlyBadge from '@/components/CredlyBadge';
import { CASES, GITHUB_URL, CREDENTIALS, MS_APPLIED_SKILLS, CREDLY_PROFILE_URL } from '@/lib/writeupsData';

export default function Writeups() {
  const { t } = useLanguage();
  const w = t.writeups;
  const featured = CASES.find((c) => c.featured);

  return (
    <section id="writeups" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
              {w.badge}
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
            {w.title1} <span className="text-gradient-cobalt">{w.title2}</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            {w.subtitle}
          </p>
        </ScrollReveal>

        {/* Featured marquee card */}
        {featured && (
          <ScrollReveal delay={150}>
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/70 via-amber-500/20 to-transparent">
              <div className="relative rounded-2xl bg-[#0d0f14] border border-[#1f2430] p-7 sm:p-9 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-semibold tracking-wide">
                        <Award className="w-3.5 h-3.5" />
                        {w.featuredBadge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 tracking-widest">
                        {w.featuredEyebrow}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3 leading-snug">
                      {w.kda.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-3xl">
                      {w.kda.description}
                    </p>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      {featured.metrics.map((m) => {
                        const Icon = m.icon;
                        return (
                          <div key={m.metricKey} className="p-3.5 rounded-lg bg-[#111318] border border-[#1f2430]">
                            <Icon className="w-4 h-4 text-cyan-400 mb-2" />
                            <div className="font-heading font-bold text-base text-white leading-tight">{m.value}</div>
                            <div className="font-mono text-[10px] text-slate-500 tracking-wide mt-0.5">
                              {w.kda.metrics[m.metricKey]}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-7 font-mono text-[11px]">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded bg-[#1a1d24] text-slate-300 border border-[#1f2430]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        to={`/writeups/${featured.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-heading text-xs font-bold tracking-wide hover:bg-cyan-400 transition-colors"
                      >
                        {w.readFull}
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-slate-300 font-mono text-xs hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        {w.viewRepo}
                      </a>
                    </div>
                  </div>

                  {/* Verified credentials rack */}
                  <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-4 lg:border-l lg:border-[#1f2430] lg:pl-8">
                    <span className="font-mono text-[10px] tracking-widest text-amber-300/70">
                      {w.credentials.rackLabel}
                    </span>
                    <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                      {CREDENTIALS.map((cred) => (
                        <CredlyBadge
                          key={cred.id}
                          compact
                          badgeId={cred.badgeId}
                          verifyUrl={cred.verifyUrl}
                          label={w.credentials[cred.labelKey]}
                        />
                      ))}
                    </div>
                    <a
                      href={MS_APPLIED_SKILLS.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-cyan-300 transition-colors text-center"
                    >
                      <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                      {w.credentials.appliedSkills}
                      <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                    </a>
                    <a
                      href={CREDLY_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-amber-300/80 hover:text-amber-200 transition-colors text-center"
                    >
                      <Award className="w-3 h-3 flex-shrink-0 text-amber-400" />
                      {w.credentials.viewAllBadges}
                      <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* View all CTA */}
            <div className="flex justify-center mt-8">
              <Link
                to="/writeups"
                className="group inline-flex items-center gap-2 font-heading text-sm font-semibold tracking-wide text-[hsl(var(--foreground))] hover:text-cyan-300 transition-colors"
              >
                {w.viewAllLink}
                <ChevronRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
