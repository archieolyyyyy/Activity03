export type NavSection =
  | 'overview'
  | 'evidenceBoard'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'phase4'
  | 'phase5'
  | 'timelineSection'
  | 'impactSection'
  | 'improvementSection'
  | 'recommendationsSection';

export const CASE_FILE_PDF_NAME = 'CASE FILE 02 - Security Investigation Report (Malicay-Adian) FINAL.pdf';
// pdf file name
export const CASE_FILE_PDF_ASSET = CASE_FILE_PDF_NAME;

export const CASE_METADATA = {
  id: 'USIU-CF-2024-002',
  classification: 'CONFIDENTIAL',
  investigators: ['Felixandra Malicay', 'Alfahad Adian'] as const,
  timeDetected: '08:45',
  activePhases: 5,
};

export const NAV_SECTIONS: { id: NavSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'evidenceBoard', label: 'Evidence' },
  { id: 'phase1', label: 'Phase 1' },
  { id: 'phase2', label: 'Phase 2' },
  { id: 'phase3', label: 'Phase 3' },
  { id: 'phase4', label: 'Phase 4' },
  { id: 'phase5', label: 'Phase 5' },
  { id: 'timelineSection', label: 'Timeline' },
  { id: 'impactSection', label: 'Impact' },
  { id: 'improvementSection', label: 'Remediation' },
  { id: 'recommendationsSection', label: 'Recommendations' },
];

export const BOOT_LINES = [
  '> USIU SECURE TERMINAL v4.2.1',
  '> AUTHENTICATING OPERATOR...........OK',
  '> LOADING CASE FILE #02...............FOUND',
  '> THREAT LEVEL: HIGH',
  '> 5 INVESTIGATION PHASES DETECTED',
  '> FORENSIC EVIDENCE: PRESERVED',
  '> INITIALIZING SECURE DISPLAY.........',
  '> [PRESS ANY KEY TO BEGIN INVESTIGATION]',
];

export const HERO_OVERVIEW =
  'A suspected insider threat has compromised five critical university facilities. Initial forensic analysis confirms unauthorized physical entry via tailgating, systematic exfiltration of 3.1 GB of confidential data to a personal USB storage device, and deliberate attempts to destroy digital evidence before departure. The subject — a recently resigned employee whose access was never revoked — exploited multiple compounding security failures across physical, personnel, and management domains. USIU investigation is ongoing. Threat level remains HIGH.';

export const AFFECTED_ZONES = [
  { name: 'Research & Innovation Center', icon: 'building' },
  { name: "Registrar's Office", icon: 'clipboard' },
  { name: 'Data Center Facility', icon: 'server' },
  { name: 'Human Resource Office', icon: 'users' },
  { name: 'Faculty Records Repository', icon: 'books' },
];

export const HERO_STATS = [
  { label: 'Incident Type', value: 'Insider Threat', tone: 'danger' as const },
  { label: 'Attack Vector', value: 'Tailgating', tone: 'warning' as const },
  { label: 'Data Exfiltrated', value: '3.1 GB', tone: 'danger' as const },
  { label: 'Subject', value: 'Resigned Employee', tone: 'info' as const },
  { label: 'Threat Level', value: 'HIGH', tone: 'danger' as const },
];

export const EVIDENCE_CARDS = [
  { id: 'phase1', phase: 'PHASE 1', title: 'Physical Security Breach', icon: 'door' },
  { id: 'phase2', phase: 'PHASE 2', title: 'Mobile Device & Data Handling', icon: 'usb' },
  { id: 'phase3', phase: 'PHASE 3', title: 'Personnel Security', icon: 'user' },
  { id: 'phase4', phase: 'PHASE 4', title: 'Security Management Review', icon: 'shield' },
  { id: 'phase5', phase: 'PHASE 5', title: 'Digital Forensics', icon: 'fingerprint' },
];

export const ROOM_DATA: Record<string, { title: string; text: string }> = {
  reception: {
    title: 'Reception Area',
    text: 'No visitor verification after hours. The front desk was unmanned. Access logs show the individual entered without signing the visitor register — a critical procedural failure.',
  },
  server: {
    title: 'Server Room',
    text: 'Unauthorized personnel gained access via tailgating. No mantrap or anti-passback system. CCTV coverage incomplete. The individual spent approximately 4 minutes inside, sufficient to connect USB and copy data.',
  },
  restricted: {
    title: 'Restricted Floor',
    text: 'Access card was never deactivated post-resignation. The terminated employee\'s credentials still validated at card readers. No alert generated for after-hours access by a non-active employee.',
  },
};

export const TERMINAL_LOG = [
  { time: '23:41:02', text: 'USB DEVICE CONNECTED — SanDisk 64GB', highlight: false },
  { time: '23:41:08', text: 'FILE ACCESS: /confidential/student_records.xlsx', highlight: false },
  { time: '23:41:12', text: 'FILE COPY: 847 MB transferred', highlight: true },
  { time: '23:42:33', text: 'FILE ACCESS: /research/project_nova_blueprints.pdf', highlight: false },
  { time: '23:42:41', text: 'FILE COPY: 2.3 GB transferred', highlight: true },
  { time: '23:43:05', text: 'BROWSER HISTORY CLEARED', highlight: false },
  { time: '23:43:09', text: 'USB DEVICE REMOVED', highlight: false },
];

export const PRIVILEGE_VECTORS = [
  { id: 'ad' as const, label: 'Active Directory Account', initial: 'STILL ACTIVE' },
  { id: 'admin' as const, label: 'Administrator Rights', initial: 'STILL ACTIVE' },
  { id: 'card' as const, label: 'Physical Access Card', initial: 'STILL ACTIVE' },
  { id: 'device' as const, label: 'University Device (Laptop)', initial: 'NOT RETURNED' },
];

export const GAUGE_CONFIG = [
  { id: 'policy' as const, label: 'Policy Currency', baseline: 12, desc: 'Last reviewed 3 years ago' },
  { id: 'vuln' as const, label: 'Vulnerability Assessments', baseline: 5, desc: 'Rarely conducted' },
  { id: 'training' as const, label: 'Training Freshness', baseline: 20, desc: 'Outdated material' },
  { id: 'audit' as const, label: 'Audit Completion', baseline: 0, desc: 'None completed' },
];

export const FORENSIC_FILES = [
  {
    id: 'report',
    name: 'deleted_report_final.docx',
    status: 'DELETED — RECOVERABLE',
    statusTone: 'warning' as const,
    meta: [
      ['File Path', 'C:\\Users\\jdelacruz\\Documents\\'],
      ['Created', '2024-01-15 09:23:14'],
      ['Modified', '2024-03-02 14:56:33'],
      ['Accessed', '2024-03-10 23:41:08'],
      ['MD5 Hash', 'a3f7c2d8e1b5940f6c8d2e7a1b3f5c9d'],
      ['Status', 'Recoverable from unallocated clusters'],
      ['Forensic Note', 'File headers intact. Deleted via Shift+Del.'],
    ],
  },
  {
    id: 'browser',
    name: 'browser_history.db',
    status: 'DELETED — FRAGMENTS FOUND',
    statusTone: 'warning' as const,
    meta: [
      ['File Path', 'C:\\Users\\jdelacruz\\AppData\\Local\\'],
      ['Created', '2023-06-01 08:00:00'],
      ['Modified', '2024-03-10 23:43:05'],
      ['Accessed', '2024-03-10 23:43:09'],
      ['MD5 Hash', 'b8e2d5a7c4f1b3902e6d8a3c5b7f1e9d'],
      ['Status', 'Partial fragments in slack space'],
      ['Forensic Note', 'History cleared intentionally. Cache fragments remain.'],
    ],
  },
  {
    id: 'usb',
    name: 'usb_connection_log.txt',
    status: 'FOUND — INTACT',
    statusTone: 'safe' as const,
    meta: [
      ['File Path', 'C:\\Windows\\System32\\LogFiles\\'],
      ['Created', '2024-03-10 23:41:02'],
      ['Modified', '2024-03-10 23:43:09'],
      ['Accessed', '2024-03-10 23:43:09'],
      ['MD5 Hash', 'c7f1e3b9d5a8c2f4e0b6d3a1c8f5e7b2'],
      ['Status', 'Intact — Primary evidence'],
      ['Forensic Note', 'Complete USB connection timeline. Key evidence.'],
    ],
  },
  {
    id: 'account',
    name: 'account_activity_log.evtx',
    status: 'MODIFIED — TAMPERING DETECTED',
    statusTone: 'danger' as const,
    meta: [
      ['File Path', 'C:\\Windows\\System32\\winevt\\Logs\\'],
      ['Created', '2023-01-01 00:00:00'],
      ['Modified', '2024-03-10 23:45:22'],
      ['Accessed', '2024-03-10 23:45:22'],
      ['MD5 Hash', 'd4a2f8e1b7c5d3a9f0e8b2c6a4f1d7e3'],
      ['Status', 'Chain broken — Event gaps detected'],
      ['Forensic Note', 'Selective log deletion. Integrity compromised.'],
    ],
  },
  {
    id: 'temp',
    name: '/temp/ folder',
    status: 'WIPED — PARTIAL RECOVERY',
    statusTone: 'warning' as const,
    meta: [
      ['File Path', 'C:\\Users\\jdelacruz\\AppData\\Local\\Temp\\'],
      ['Created', '2023-06-01 08:00:00'],
      ['Modified', '2024-03-10 23:44:18'],
      ['Accessed', '2024-03-10 23:44:18'],
      ['MD5 Hash', 'N/A (Directory)'],
      ['Status', 'Partial recovery from shadow copy'],
      ['Forensic Note', 'Bulk deletion pattern. Some files recovered.'],
    ],
  },
];

export const TIMELINE_EVENTS = [
  { time: 'WEEK -2', label: 'Resignation Letter Submitted', severity: 'amber' as const, desc: 'Employee formally submits resignation letter to HR. Two-week notice period begins. No security deactivation or offboarding process initiated.' },
  { time: 'DAY -1', label: 'Last Official Workday', severity: 'amber' as const, desc: 'Final official workday. All access privileges remain fully active. No account deactivation, badge collection, device return, or offboarding checklist executed.' },
  { time: '11:30 PM', label: 'After-Hours Entry Detected', severity: 'red' as const, desc: 'After-hours building access using still-active access card. Security system logs entry at main entrance — no alert triggered and no security challenge initiated.' },
  { time: '11:37 PM', label: 'Tailgating — Server Room', severity: 'red' as const, desc: 'Suspect tailgates authorized personnel into restricted server room. CCTV blind spot exploited. No anti-passback system triggered and no challenge issued.' },
  { time: '11:41 PM', label: 'USB Device Connected', severity: 'red' as const, desc: 'SanDisk 64GB USB device connected to university workstation AUDIT-07. Windows event log records PnP device arrival and serial number.' },
  { time: '11:41-11:43 PM', label: '3.1 GB Data Copied', severity: 'red' as const, desc: '847 MB student records and 2.3 GB research blueprints copied to USB drive. Total: 3.1 GB of confidential data exfiltrated. File system audit logs capture the transfers.' },
  { time: '11:43 PM', label: 'Evidence Destruction Attempt', severity: 'red' as const, desc: 'Browser history cleared. Windows event logs tampered. Temp files wiped. USB device disconnected. Attempt to cover digital tracks begins.' },
  { time: '11:45 PM', label: 'Exit Building — Unchallenged', severity: 'amber' as const, desc: 'Subject exits building. No security challenge. Access card registers exit — system accepts as normal. Total time inside restricted areas: approximately 15 minutes.' },
  { time: '08:45 AM (Next Day)', label: 'Incident Detected', severity: 'green' as const, desc: 'Security anomalies detected during morning system check. Anomalous after-hours access logs and USB connection records flagged by partial monitoring system.' },
  { time: '08:45 AM', label: 'USIU Investigation Initiated', severity: 'green' as const, desc: 'University Security Investigation Unit (USIU) investigation formally initiated. Case File #02 opened. Threat Level classified as HIGH. Forensic preservation ordered. Five-phase investigation launched.' },
];

export const IMPACT_CARDS = [
  { name: 'Operational Impact', severity: 'CRITICAL' as const, tone: 'critical' as const, text: 'Core university operations disrupted as compromised systems require forensic isolation. Research data exfiltration directly impacts ongoing academic projects and grant-funded research timelines. Emergency incident response consumes significant IT and security team resources, diverting from regular operations.' },
  { name: 'Financial', severity: 'HIGH' as const, tone: 'high' as const, text: 'Costs include forensic investigation fees, external legal counsel, potential regulatory fines under the Data Privacy Act of 2012 (Republic Act No. 10173), and mandatory security infrastructure upgrades. Estimated exposure includes notification costs for all affected data subjects and potential civil liability. Financial impact compounds if stolen research data reaches competitors.' },
  { name: 'Reputational', severity: 'HIGH' as const, tone: 'high' as const, text: "Public trust in the university's data stewardship capability is significantly damaged. Research partners and current/prospective students may question the institution's security maturity. Media exposure risk is elevated given the insider threat angle." },
  { name: 'Legal', severity: 'CRITICAL' as const, tone: 'critical' as const, text: 'Potential violations of the Data Privacy Act of 2012 (Republic Act No. 10173) for failure to protect personal information. Subject faces potential criminal prosecution under the Cybercrime Prevention Act of 2012 (RA 10175) for unauthorized computer access and data theft. Evidence tampering constitutes an additional criminal act. Civil liability to affected individuals is probable.' },
  { name: 'Privacy', severity: 'CRITICAL' as const, tone: 'critical' as const, text: 'Student records, faculty personal data, and confidential research materials were exfiltrated. Individuals whose data was copied have statutory rights to notification and remediation under applicable privacy law. The university is obligated to notify the National Privacy Commission (NPC) and affected data subjects within 72 hours of confirmed breach. Failure to notify compounds legal liability.' },
];

export const IMPROVEMENT_ITEMS = {
  physical: [
    { id: 'p1', text: 'Install mantrap airlocks', points: 8 },
    { id: 'p2', text: 'Full CCTV coverage (no blind spots)', points: 8 },
    { id: 'p3', text: 'Biometric + card dual auth', points: 8 },
    { id: 'p4', text: 'Anti-passback system', points: 8 },
    { id: 'p5', text: '24/7 security personnel', points: 8 },
  ],
  personnel: [
    { id: 'pe1', text: 'Immediate offboarding protocol', points: 8 },
    { id: 'pe2', text: 'Least privilege enforcement', points: 8 },
    { id: 'pe3', text: 'Regular access audits', points: 8 },
    { id: 'pe4', text: 'Background checks', points: 8 },
    { id: 'pe5', text: 'Security awareness training', points: 8 },
  ],
  management: [
    { id: 'm1', text: 'Annual policy review', points: 8 },
    { id: 'm2', text: 'Quarterly vulnerability assessments', points: 8 },
    { id: 'm3', text: 'Monthly security audits', points: 8 },
    { id: 'm4', text: 'Incident response plan', points: 6 },
    { id: 'm5', text: 'Forensic readiness program', points: 6 },
  ],
};

export const RECOMMENDATIONS = [
  { id: 'REC-01', priority: 'IMMEDIATE' as const, title: 'Implement Automated Offboarding', body: 'Integrate HR and IT systems so that account deactivation triggers automatically upon resignation acceptance. Eliminates human error and delay in access revocation, ensuring terminated employees cannot retain system access.', justification: 'The root cause of this incident was a resigned employee retaining full access. Automation removes the dependency on manual processes.' },
  { id: 'REC-02', priority: 'IMMEDIATE' as const, title: 'Deploy Endpoint Data Loss Prevention', body: 'Install DLP software on all university workstations to monitor, block, and alert on unauthorized USB transfers. Configure policies to prevent copying of files from confidential directories to removable media.', justification: '3.1 GB of data was exfiltrated via USB. DLP would have blocked the transfer and alerted security in real time.' },
  { id: 'REC-03', priority: 'SHORT-TERM' as const, title: 'Eliminate CCTV Blind Spots', body: 'Commission a comprehensive physical security survey of all restricted areas. Install additional cameras with overlapping coverage to eliminate blind spots at corridor transitions and entry points.', justification: 'Tailgating occurred in a blind spot. Full coverage provides visual evidence for all access events and deters unauthorized entry attempts.' },
  { id: 'REC-04', priority: 'SHORT-TERM' as const, title: 'Mandatory Security Awareness Training', body: 'Launch an annual security awareness program covering insider threat recognition, proper data handling, physical security protocols, and incident reporting procedures for all faculty and staff.', justification: 'Security training was 3 years outdated. A trained workforce is the first line of defense against both malicious and negligent insider threats.' },
  { id: 'REC-05', priority: 'ONGOING' as const, title: 'Establish Security Audit Cycle', body: 'Schedule quarterly internal security audits and annual third-party penetration tests. Review all security policies at minimum annually. Maintain an audit calendar with executive accountability.', justification: 'No audits were completed. Regular independent assessment identifies gaps before attackers can exploit them and demonstrates due diligence to regulators.' },
];

export const PHASES = [
  {
    id: 'phase1',
    num: '01',
    label: 'Investigation Phase 1',
    title: 'Physical Security Breach',
    scene: 'Scene: Employee tailgated into server room at 11:37 PM',
    border: 'border-t-threat',
    findings: [
      '[FINDING 01] Physical security is the protection of facilities, hardware, personnel, and resources from physical threats such as unauthorized access, theft, sabotage, and environmental hazards.',
      '[FINDING 02] Weaknesses identified: (1) No anti-tailgating controls at entry points, (2) CCTV blind spots in corridor transitions, (3) Incomplete visitor access logs, (4) No after-hours alarm triggers for unauthorized zone entry, (5) Access card not deactivated for resigned employee.',
      '[FINDING 03] Tailgating bypasses card readers by following closely behind authorized personnel. The system authenticates the card swipe, not the person entering behind — creating a silent bypass of access control.',
      '[FINDING 04] Physical security is the first and foundational defense layer. All digital controls — firewalls, encryption, access controls — become irrelevant if an attacker can physically reach hardware and storage devices.',
      '[FINDING 05] Recommended controls: mantrap/airlock entry systems, anti-passback rules preventing piggybacking, dedicated security guards at restricted zones, biometric + card dual authentication, and motion sensors with after-hours alerting.',
      '[FINDING 06] CCTV provides timestamped visual evidence that identifies suspects, reconstructs incident timelines, corroborates witness testimony, and supports both internal disciplinary proceedings and legal prosecution.',
    ],
  },
  {
    id: 'phase2',
    num: '02',
    label: 'Investigation Phase 2',
    title: 'Mobile Device & Data Handling',
    scene: 'Scene: USB drive connected, confidential files transferred',
    border: 'border-t-warning',
    findings: [
      '[FINDING 01] Portable storage devices create critical security risks because they bypass network security controls entirely — data can leave the organization without traversing any monitored network channels.',
      '[FINDING 02] Risks: device theft or loss, malware introduction into the network, unauthorized data exfiltration, lack of encryption by default on most portable devices, and inability to audit data transfers.',
      '[FINDING 03] Data leakage is the unauthorized transmission of sensitive data from within an organization to an external destination. It can be intentional (malicious insider) or unintentional (negligence).',
      '[FINDING 04] Removable media operates at the physical layer, bypassing firewalls, DLP systems, and network monitoring tools. Once plugged in, data transfer occurs directly between the USB controller and the system bus.',
      '[FINDING 05] Policies: mandatory registration of all portable devices, encryption requirements for USB storage, prohibition of personal devices on university systems, DLP software deployment, and physical USB port locks on sensitive workstations.',
      '[FINDING 06] Technical controls: endpoint DLP with real-time blocking, USB port disablement via Group Policy, file activity monitoring on confidential directories, and device whitelisting allowing only approved storage.',
    ],
  },
  {
    id: 'phase3',
    num: '03',
    label: 'Investigation Phase 3',
    title: 'Personnel Security',
    scene: 'Scene: Resigned employee, privileges never removed',
    border: 'border-t-info',
    findings: [
      '[FINDING 01] Personnel security ensures that individuals with access to organizational assets are trustworthy, properly trained, and continuously monitored. Human factors represent the biggest risk vector in information security.',
      '[FINDING 02] The Principle of Least Privilege states that users should be granted only the minimum level of access necessary to perform their job functions — nothing more, nothing less.',
      '[FINDING 03] Security failures during separation: (1) No immediate account deactivation on last day, (2) Administrator rights never removed, (3) Physical access card remained functional, (4) University-issued device not collected.',
      '[FINDING 04] Active accounts post-termination are an open door to the organization\'s systems. Former employees retain credentials for systems they no longer have authorization to access, creating both malicious insider and account compromise risks.',
      '[FINDING 05] Excessive privileges dramatically expand the attack surface. A disgruntled employee with administrator rights can delete critical data, create backdoor accounts, exfiltrate sensitive information, and cover their tracks — causing catastrophic damage.',
      '[FINDING 06] Offboarding checklist: day-of account disablement, physical badge collection, device retrieval and forensic imaging, access revocation audit within 24 hours, exit interview, and formal data transfer protocol for work files.',
    ],
  },
  {
    id: 'phase4',
    num: '04',
    label: 'Investigation Phase 4',
    title: 'Security Management & Maintenance',
    scene: 'Scene: Security policies 3 years stale, no audits conducted',
    border: 'border-t-purple',
    findings: [
      '[FINDING 01] Information security requires continuous maintenance because threats evolve constantly. Static security policies become exploitable gaps over time; continuous maintenance adapts defenses to new attack vectors.',
      '[FINDING 02] Vulnerability assessment is the systematic identification and evaluation of security weaknesses in systems, processes, and infrastructure — both technical and procedural.',
      '[FINDING 03] Security lifecycle: Planning identifies what to protect → Risk Assessment prioritizes threats → Vulnerability Assessment finds specific weaknesses → Remediation fixes them → continuous monitoring validates effectiveness. It is a continuous loop, not a one-time exercise.',
      '[FINDING 04] Organizational failures: no policy review cycle for 3+ years, no mandatory security training schedule, no internal/external audit calendar, and no formal change management process for security controls.',
      '[FINDING 05] Improvements: quarterly policy reviews, annual penetration testing by third parties, mandatory annual security awareness training, monthly automated vulnerability scans, and establishment of an internal audit committee.',
      '[FINDING 06] Continuous monitoring detects security anomalies in real time, reduces attacker dwell time from months to hours, shifts posture from reactive to proactive, and provides data-driven evidence for security investments.',
    ],
  },
  {
    id: 'phase5',
    num: '05',
    label: 'Investigation Phase 5',
    title: 'Digital Forensics',
    scene: 'Scene: Workstation recovered, evidence found and preserved',
    border: 'border-t-safe',
    findings: [
      '[FINDING 01] Digital forensics is the scientific collection, preservation, analysis, and presentation of digital evidence for legal and investigative purposes. It follows strict methodological procedures to ensure evidence integrity.',
      '[FINDING 02] Digital evidence is often the only objective record of what happened during a security incident. It is time-stamped, reproducible, and admissible in court when properly collected and preserved.',
      '[FINDING 03] Five phases: (1) Identification — locate potential evidence sources; (2) Preservation — create forensic image, maintain chain of custody; (3) Collection — gather evidence using validated tools; (4) Analysis — examine artifacts, reconstruct events; (5) Presentation — document findings for legal/disciplinary proceedings.',
      '[FINDING 04] Evidence preservation prevents contamination, alteration, or destruction. Once digital evidence is modified, its legal admissibility is permanently compromised. Write-blocking and forensic imaging are essential.',
      '[FINDING 05] Chain of custody is the documented record of who handled evidence, when, where, and how. It ensures evidence integrity from collection through analysis to court presentation, establishing trustworthiness.',
      '[FINDING 06] Evidence sources: workstation HDD forensic image, USB device connection logs, CCTV footage, access card system logs, network traffic logs, email records, Active Directory audit logs, and browser artifacts.',
      '[FINDING 07] Forensic findings establish a factual timeline of events, connect specific actions to a user account through correlation of multiple evidence sources, and provide documented, defensible evidence for HR disciplinary action or criminal prosecution.',
    ],
  },
];
