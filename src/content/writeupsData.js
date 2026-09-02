export const writeupsData = [
  {
    slug: "windows-artifact-triage-hayabusa",
    title: "From Event Log to Attack Timeline: A Reproducible Windows Triage Workflow with Hayabusa",
    category: "DFIR",
    date: "2026-09-02",
    difficulty: "Intermediate",
    readTime: "12 min read",
    summary: "A structured engineering postmortem investigating a simulated initial compromise. Correlating EVTX telemetry, Sigma rule detections, PowerShell script block logs, and process execution trees into a verifiable timeline.",
    tools: ["Hayabusa v2.17", "EvtxECmd", "Timeline Explorer", "PowerShell 7", "Sigma Rules"],
    tags: ["Windows", "DFIR", "Event Logs", "Incident Response", "Sigma"],
    tldr: "Demonstrates an end-to-end Windows incident triage workflow. By ingesting security and PowerShell operational event logs into Hayabusa with Sigma rule mappings, we reconstruct an adversary's execution chain from initial macro-enabled Word document execution down to memory injection and persistence in under 3 minutes.",
    problem: "In high-pressure incident response scenarios, manual inspection of millions of raw Windows Event Logs (EVTX) introduces severe cognitive load, high latency, and elevated risk of missed IoCs. Traditional timeline generation often suffers from noisy artifacts and fragmented evidence across isolated channels.",
    environment: {
      targetOS: "Windows 11 Enterprise (Build 22631.3880) x64",
      analysisWorkstation: "Ubuntu Linux 24.04 LTS (Kernel 7.0) / Dell Latitude 7430",
      toolsUsed: "Hayabusa v2.17.0 (Rust-based EVTX hunter), Eric Zimmerman's EvtxECmd v0.5.1.0, PowerShell 7.4.4",
      dataset: "Sanitized EVTX telemetry capture (System, Security, PowerShell/Operational, Sysmon)"
    },
    initialObservations: [
      "Unusual parent-child process relationship: WINWORD.EXE spawning powershell.exe with base64 encoded command arguments.",
      "High volume of Event ID 4688 (Process Creation) with Command Line auditing enabled.",
      "Event ID 4104 (Script Block Logging) capturing multi-stage payload decryption logic in memory."
    ],
    methodology: "1. Triage Ingestion: Mount forensic image / copy locked EVTX artifacts using raw disk access semantics.\n2. Sigma-Driven Parsing: Run Hayabusa with high-fidelity Sigma threat-hunting profiles filtering on critical/high severity alerts.\n3. Normalization & Correlation: Convert structured outputs to standardized CSV/JSON timelines, standardizing on UTC timestamps.\n4. Micro-Analysis: Pivot into individual Event IDs (4688, 4104, 7045) to reconstruct intent and lateral movement vectors.",
    findings: [
      {
        timestamp: "2026-09-02 08:14:22 UTC",
        eventID: "4688 / Sysmon 1",
        description: "Initial process spawn: `WINWORD.EXE` (PID 4820) -> `powershell.exe -NoP -NonI -W Hidden -Enc SUVYKE5ldy...`",
        severity: "CRITICAL"
      },
      {
        timestamp: "2026-09-02 08:14:35 UTC",
        eventID: "4104 (PowerShell)",
        description: "Script Block Execution: Memory decryption routine targeting AMSI bypass via memory patch (`AmsiUtils`).",
        severity: "HIGH"
      },
      {
        timestamp: "2026-09-02 08:15:10 UTC",
        eventID: "4624 (Security)",
        description: "Type 3 Network Logon followed by Service Installation (Event 7045) for persistence mechanism.",
        severity: "HIGH"
      }
    ],
    commands: [
      {
        label: "Hayabusa Rapid High-Severity Scan",
        command: "hayabusa csv-timeline -d ./evtx_artifacts/ -o timeline.csv --min-level high --RFC-3339"
      },
      {
        label: "Targeted PowerShell Script Block Extraction",
        command: "hayabusa search -d ./evtx_artifacts/ -r \"Microsoft-Windows-PowerShell%4Operational.evtx\" -k \"ScriptBlockText\" -o ps_extracted.json"
      }
    ],
    timelineDiagram: `[Initial Vector]
      │
      ▼ (08:14:22 UTC)
WINWORD.EXE ──Spawns──► powershell.exe (Base64 Encoded Payload)
                              │
                              ▼ (08:14:35 UTC)
                        AMSI Bypass / Memory Injection (Event 4104)
                              │
                              ▼ (08:15:10 UTC)
                        Scheduled Task / Persistence Created (Event 7045)
                              │
                              ▼ (08:15:45 UTC)
                        LSASS Memory Read Indicator (Sysmon 10)`,
    reproduction: "To reproduce this lab benchmark:\n1. Clone the evidence repository.\n2. Ingest the provided sample EVTX bundle into Hayabusa v2.17 using the ruleset provided in /rules/sigma-windows-triage.yml.\n3. Compare the generated timeline.csv against the baseline hash in SHA256SUMS.",
    limitations: "This investigation specifically examines artifact footprints where full command-line process auditing (Event ID 4688) and PowerShell Script Block Logging (Event ID 4104) were pre-configured via GPO. In environments lacking script block logging or where ETW patching was successful prior to execution, forensic recovery relies on unallocated RAM analysis rather than event telemetry alone.",
    references: [
      { name: "Hayabusa Threat Hunting & Fast Forensics", url: "https://github.com/Yamato-Security/hayabusa" },
      { name: "Sigma Rules Repository (Windows Sysmon & Security)", url: "https://github.com/SigmaHQ/sigma" },
      { name: "Microsoft Security Event Auditing Reference (Event ID 4688/4104)", url: "https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4688" }
    ]
  }
];
