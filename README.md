# Operation Insider Whack-A-Mole — React SPA

Interactive USIU cybersecurity forensic investigation dossier for WMSU Information Assurance & Security II (Activity 03).

## Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **Zustand** — global investigation state
- **Lucide React** — SVG icons (no emojis)
- **@react-pdf/renderer** — PDF export (fixes blank html2pdf issue)

## Quick Start

```powershell
# Use -LiteralPath if your folder contains brackets (e.g. [Sir Vince])
Push-Location -LiteralPath 'c:\Users\Asus\Desktop\IAS\LEC [Sir Vince]\Activity 03\usiu-dossier'
npm install
npm run dev
```

Open `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Root shell & section orchestration
├── main.tsx
├── index.css               # Tailwind + terminal effects
├── data/
│   └── caseData.ts         # All case content (single source of truth)
├── store/
│   └── useInvestigationStore.ts  # Zustand: offboarding, gauges, score
├── hooks/
│   ├── useActiveSection.ts # IntersectionObserver nav tracking
│   └── useReducedMotion.ts
├── types/
│   └── index.ts
├── components/
│   ├── layout/             # BootScreen, TopBar, ProgressNav, Footer
│   ├── sections/           # Hero, Evidence, Phases wrapper, Timeline, etc.
│   ├── phases/             # Phase 1–5 interactive panels
│   └── ui/                 # GaugeChart, Primitives
└── pdf/
    └── downloadCaseFile.tsx  # @react-pdf/renderer export
```

## State (Zustand)

| State | Purpose |
|-------|---------|
| `offboardingStatus` | 4 privilege vectors (AD, admin, card, device) |
| `remediationMetrics` | Gauge values (policy 12%, vuln 5%, training 20%, audit 0%) |
| `checkedItems` + `securityPostureScore` | Improvement plan (baseline 12/100) |

## PDF Export

Uses `@react-pdf/renderer` with **Rajdhani** + **Share Tech Mono** fonts — generates a complete multi-section forensic report without html2canvas blank-page bugs.

## Legacy

Original vanilla version: `../index.html`
