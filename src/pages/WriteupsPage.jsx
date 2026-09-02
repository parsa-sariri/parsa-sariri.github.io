import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, ArrowRight, ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { writeupsData } from '@/content/writeupsData';

export default function WriteupsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const categories = ['ALL', 'DFIR', 'INFRA', 'SYSTEMS', 'MALWARE', 'NETWORK'];

  const filteredWriteups = selectedCategory === 'ALL'
    ? writeupsData
    : writeupsData.filter(w => w.category.toUpperCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#d1d5db] font-sans antialiased selection:bg-[hsl(var(--primary))] selection:text-black">
      {/* Top Navbar Header */}
      <header className="border-b border-[#1f242d] bg-[#0e1117]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group text-white hover:text-[hsl(var(--primary))] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[hsl(var(--primary))] transition-transform group-hover:-translate-x-1" />
            <span className="font-heading font-bold text-xs tracking-widest text-[#9ca3af] group-hover:text-white">
              BACK TO NEXUS
            </span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[hsl(var(--primary))]">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"></span>
            <span>SYSTEM // RESEARCH_ARCHIVE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Title Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))] font-mono text-xs tracking-widest uppercase mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Investigation Archive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight mb-3">
            LAB NOTEBOOK & WRITEUPS
          </h1>
          <p className="text-sm md:text-base text-[#9ca3af] leading-relaxed max-w-2xl font-sans">
            Reproducible engineering postmortems, digital forensics workflows, and systems security research with verifiable artifact telemetry.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#1f242d]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded font-mono text-xs tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[hsl(var(--primary))] text-black font-bold shadow-sm shadow-[hsl(var(--primary))]/20'
                  : 'bg-[#141820] text-[#9ca3af] hover:text-white hover:bg-[#1a202c] border border-[#1f242d]'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredWriteups.length === 0 ? (
            <div className="p-8 text-center rounded border border-[#1f242d] bg-[#11141c]">
              <p className="font-mono text-xs text-[#6b7280]">NO INVESTIGATIONS CATALOGED UNDER THIS DISCIPLINE YET.</p>
            </div>
          ) : (
            filteredWriteups.map((writeup) => (
              <article
                key={writeup.slug}
                className="group relative rounded-lg border border-[#1f242d] bg-[#11141c] hover:border-[hsl(var(--primary))]/50 transition-all p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-4 mb-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] font-semibold tracking-wider">
                    [{writeup.category}]
                  </span>
                  <div className="flex items-center gap-3 text-[#6b7280]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {writeup.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {writeup.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[hsl(var(--primary))] transition-colors mb-3 leading-snug">
                  <Link to={`/writeups/${writeup.slug}`}>
                    {writeup.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#9ca3af] leading-relaxed mb-6 font-sans">
                  {writeup.summary}
                </p>

                {/* Tools & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {writeup.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded font-mono text-[11px] bg-[#181d26] text-[#9ca3af] border border-[#242b38]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1f242d] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#6b7280]">
                    Difficulty: <span className="text-[#d1d5db]">{writeup.difficulty}</span>
                  </span>
                  <Link
                    to={`/writeups/${writeup.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[hsl(var(--primary))] hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>READ_REPORT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
