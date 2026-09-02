import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Terminal, Shield, CheckCircle, AlertTriangle, ExternalLink, Code2 } from 'lucide-react';
import { writeupsData } from '@/content/writeupsData';

export default function SingleWriteupPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const writeup = writeupsData.find((w) => w.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!writeup) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] text-[#d1d5db] flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center p-8 rounded-lg border border-[#1f242d] bg-[#11141c]">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">ARTICLE NOT FOUND</h1>
          <p className="text-xs font-mono text-[#9ca3af] mb-6">The requested technical investigation does not exist or has been relocated.</p>
          <Link to="/writeups" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[hsl(var(--primary))] text-black font-mono text-xs font-bold">
            <ArrowLeft className="w-4 h-4" />
            RETURN TO ARCHIVE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#d1d5db] font-sans antialiased selection:bg-[hsl(var(--primary))] selection:text-black">
      {/* Top Navbar Header */}
      <header className="border-b border-[#1f242d] bg-[#0e1117]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/writeups" className="flex items-center gap-2 group text-white hover:text-[hsl(var(--primary))] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[hsl(var(--primary))] transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-xs text-[#9ca3af] group-hover:text-white">
              / WRITEUPS / {writeup.category}
            </span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[#6b7280]">
            <span>INVESTIGATION_LOG</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb & Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs">
          <span className="px-2.5 py-0.5 rounded bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] font-semibold">
            [{writeup.category}]
          </span>
          <span className="text-[#6b7280]">•</span>
          <span className="flex items-center gap-1 text-[#9ca3af]">
            <Calendar className="w-3.5 h-3.5" />
            {writeup.date}
          </span>
          <span className="text-[#6b7280]">•</span>
          <span className="flex items-center gap-1 text-[#9ca3af]">
            <Clock className="w-3.5 h-3.5" />
            {writeup.readTime}
          </span>
          <span className="text-[#6b7280]">•</span>
          <span className="text-[#9ca3af]">
            Difficulty: <span className="text-white">{writeup.difficulty}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight mb-8">
          {writeup.title}
        </h1>

        {/* TL;DR Executive Box */}
        <div className="rounded-lg border border-[hsl(var(--primary))]/30 bg-[#0d131c] p-6 mb-12 shadow-sm">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>TL;DR // EXECUTIVE_SUMMARY</span>
          </div>
          <p className="text-sm md:text-base text-[#e5e7eb] leading-relaxed font-sans">
            {writeup.tldr}
          </p>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-12 text-[#d1d5db] text-base leading-relaxed">
          
          {/* Section 01 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">01 /</span>
              <span>PROBLEM STATEMENT</span>
            </h2>
            <p className="text-sm md:text-base text-[#9ca3af] leading-relaxed font-sans">
              {writeup.problem}
            </p>
          </section>

          {/* Section 02 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">02 /</span>
              <span>TEST ENVIRONMENT & TOOLCHAIN</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs mt-4">
              <div className="p-3 rounded border border-[#1f242d] bg-[#11141c]">
                <span className="text-[#6b7280] block mb-1">TARGET OS:</span>
                <span className="text-white font-semibold">{writeup.environment.targetOS}</span>
              </div>
              <div className="p-3 rounded border border-[#1f242d] bg-[#11141c]">
                <span className="text-[#6b7280] block mb-1">ANALYSIS RIG:</span>
                <span className="text-white font-semibold">{writeup.environment.analysisWorkstation}</span>
              </div>
              <div className="p-3 rounded border border-[#1f242d] bg-[#11141c] md:col-span-2">
                <span className="text-[#6b7280] block mb-1">CORE TOOLCHAIN:</span>
                <span className="text-[hsl(var(--primary))]">{writeup.environment.toolsUsed}</span>
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">03 /</span>
              <span>INITIAL OBSERVATIONS</span>
            </h2>
            <ul className="space-y-2 mt-4 font-sans text-sm md:text-base text-[#9ca3af]">
              {writeup.initialObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mt-2.5 shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 04 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">04 /</span>
              <span>TRIAGE METHODOLOGY</span>
            </h2>
            <div className="p-4 rounded border border-[#1f242d] bg-[#11141c] font-sans text-sm md:text-base text-[#9ca3af] whitespace-pre-line leading-relaxed">
              {writeup.methodology}
            </div>
          </section>

          {/* Section 05 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">05 /</span>
              <span>ATTACK TIMELINE & CORRELATION</span>
            </h2>
            <div className="my-4 p-4 rounded-lg border border-[#1f242d] bg-[#0c0e14] overflow-x-auto">
              <pre className="font-mono text-xs text-[#a5f3fc] leading-relaxed">
                {writeup.timelineDiagram}
              </pre>
            </div>
          </section>

          {/* Section 06 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">06 /</span>
              <span>PRIMARY TELEMETRY FINDINGS</span>
            </h2>
            <div className="space-y-3 mt-4">
              {writeup.findings.map((f, idx) => (
                <div key={idx} className="p-4 rounded border border-[#1f242d] bg-[#11141c] font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[hsl(var(--primary))] font-bold">{f.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-bold">
                      {f.severity}
                    </span>
                  </div>
                  <div className="text-[#6b7280] mb-1">EVENT TYPE: <span className="text-white">{f.eventID}</span></div>
                  <div className="text-[#d1d5db] font-sans text-sm mt-2">{f.description}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 07 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">07 /</span>
              <span>REPRODUCIBLE COMMANDS</span>
            </h2>
            <div className="space-y-3 mt-4">
              {writeup.commands.map((cmd, idx) => (
                <div key={idx} className="p-4 rounded border border-[#1f242d] bg-[#0d1017]">
                  <div className="font-mono text-xs text-[#9ca3af] mb-2">{cmd.label}</div>
                  <div className="p-3 rounded bg-black/60 border border-[#242b38] overflow-x-auto">
                    <code className="font-mono text-xs text-[hsl(var(--primary))] select-all">
                      {cmd.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 08 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">08 /</span>
              <span>LIMITATIONS & THREAT BOUNDARIES</span>
            </h2>
            <div className="p-4 rounded border border-amber-500/20 bg-amber-500/5 text-sm md:text-base text-[#d1d5db] leading-relaxed font-sans">
              {writeup.limitations}
            </div>
          </section>

          {/* Section 09 */}
          <section>
            <h2 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mb-3 flex items-center gap-2 border-b border-[#1f242d] pb-2">
              <span className="font-mono text-sm text-[hsl(var(--primary))]">09 /</span>
              <span>REFERENCES & PRIMARY SOURCES</span>
            </h2>
            <ul className="space-y-2 mt-4 font-mono text-xs">
              {writeup.references.map((ref, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ca3af] hover:text-[hsl(var(--primary))] underline underline-offset-4 transition-colors"
                  >
                    {ref.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#1f242d] flex items-center justify-between">
          <Link
            to="/writeups"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[hsl(var(--primary))] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ARCHIVE</span>
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs text-[#6b7280] hover:text-white transition-colors"
          >
            TOP_OF_PAGE ↑
          </button>
        </div>
      </main>
    </div>
  );
}
