import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ArrowLeft, Clock, ChevronRight, AlertTriangle, Github, ExternalLink, ShieldCheck, Award,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import CredlyBadge from '@/components/CredlyBadge';
import CopyButton from '@/components/CopyButton';
import { getCaseBySlug, GITHUB_URL, CREDENTIALS, MS_APPLIED_SKILLS, CREDLY_PROFILE_URL } from '@/lib/writeupsData';

export default function WriteupReader() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { reducedMotion, toggleMotion } = useReducedMotion();
  const w = t.writeups;
  const item = getCaseBySlug(slug);
  const data = item ? w[item.i18nKey] : null;

  useEffect(() => {
    if (data) {
      document.title = `${data.title} — ${w.metaTitleSuffix}`;
    }
    return () => {
      document.title = 'Parsa Sariri Ajili';
    };
  }, [data, w.metaTitleSuffix]);

  if (!item || !data) {
    return (
      <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar reducedMotion={reducedMotion} onToggleMotion={toggleMotion} />
        <main className="pt-40 pb-24 px-6 flex items-center justify-center">
          <div className="glass rounded-xl p-10 text-center max-w-md">
            <AlertTriangle className="w-6 h-6 text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
            <p className="font-heading text-sm text-[hsl(var(--foreground))] mb-1">{w.notFoundTitle}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-6">{w.notFoundDesc}</p>
            <Link
              to="/writeups"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-heading text-xs font-bold tracking-wide hover:bg-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              {w.backToWriteups}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const s = w.sections;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar reducedMotion={reducedMotion} onToggleMotion={toggleMotion} />

      <main className="pt-28 pb-24">
        {/* Reader shell */}
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/writeups"
            className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            {w.backToWriteups}
          </Link>

          <header className="border-b border-[#1f2430] pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                [{w.categories[item.category]}]
              </span>
              <span className="text-[hsl(var(--muted-foreground))]">{item.date}</span>
              <span className="text-slate-600">•</span>
              <span className="text-[hsl(var(--muted-foreground))]">{data.status}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4 leading-snug">
                  {data.title}
                </h1>
                <div className="flex flex-wrap gap-2 font-mono text-xs mb-4">
                  {item.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded bg-[#111318] text-cyan-400 border border-cyan-500/20">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  {w.viewRepo}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {item.hasCredlyBadge && (
                <div className="flex-shrink-0 flex flex-col items-start lg:items-end gap-3">
                  <div className="flex flex-wrap gap-4">
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
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                    {w.credentials.appliedSkills}
                    <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                  </a>
                  <a
                    href={CREDLY_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-amber-300/80 hover:text-amber-200 transition-colors"
                  >
                    <Award className="w-3 h-3 flex-shrink-0 text-amber-400" />
                    {w.credentials.viewAllBadges}
                    <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </header>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                1. {s.abstract}
              </h2>
              <p>{data.content.abstract}</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                2. {s.problem}
              </h2>
              <p>{data.content.problem}</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                3. {s.environment}
              </h2>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {data.content.environment.map((line, idx) => (
                  <li key={idx} className="flex gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 rtl:rotate-180" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                4. {s.evidence}
              </h2>
              <div className="space-y-3">
                {data.content.evidence.map((ev, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#111318] border border-[#1f2430] font-mono text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-cyan-400 font-semibold mb-2">
                      <span>{ev.event}</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ev.timestamp}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-slate-300 leading-relaxed break-words">{ev.detail}</p>
                      <CopyButton text={ev.detail} className="flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between border-b border-[#1f2430] pb-2 mb-3">
                <h2 className="text-lg font-heading font-bold text-white">
                  5. {s.timeline}
                </h2>
                <CopyButton text={data.content.timeline.join('\n')} />
              </div>
              <pre className="p-4 rounded-lg bg-[#0a0b0e] border border-[#1f2430] text-emerald-300 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre">
                {data.content.timeline.join('\n')}
              </pre>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                6. {s.methodology}
              </h2>
              <ul className="space-y-3">
                {data.content.methodology.map((m, idx) => {
                  const [head, ...rest] = m.split(':');
                  return (
                    <li key={idx} className="text-xs leading-relaxed">
                      <span className="font-mono text-cyan-400 font-semibold">{head}:</span>
                      <span className="text-slate-300">{rest.join(':')}</span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                7. {s.findings}
              </h2>
              <ul className="list-disc list-inside space-y-1.5 mb-4 text-xs text-slate-300 marker:text-emerald-400">
                {data.content.findings.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <div className="p-3 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
                <strong>{w.limitationLabel}:</strong> {data.content.limitations}
              </div>
              <div className="p-3 rounded bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                <strong>{w.reproductionLabel}:</strong> {data.content.reproduction}
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1f2430]">
            <Link
              to="/writeups"
              className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              {w.backToWriteups}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
