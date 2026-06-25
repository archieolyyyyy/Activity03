import { Shield, AlertTriangle, Clock, Activity, Radio } from 'lucide-react';
import { CASE_METADATA } from '../../data/caseData';

function MetaChip({
  icon: Icon,
  label,
  value,
  tone = 'neutral',
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  tone?: 'neutral' | 'threat' | 'safe';
}) {
  const toneClass = {
    neutral: 'border-white/10 text-slate-400',
    threat: 'border-threat/30 text-threat',
    safe: 'border-safe/30 text-safe',
  }[tone];

  return (
    <div
      className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded border bg-black/30 font-mono text-[10px] uppercase tracking-wider ${toneClass}`}
    >
      <Icon className="w-3 h-3 shrink-0 opacity-80" strokeWidth={2} />
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-[9999] bg-terminal/90 backdrop-blur-xl border-b border-threat/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-threat/80 to-transparent" />

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded border border-threat/30 bg-threat/5 shadow-[inset_0_0_20px_rgba(239,68,68,0.06)]">
            <Shield className="w-5 h-5 text-threat shrink-0" strokeWidth={1.75} />
            <div className="leading-[1.05]">
              <div className="font-heading text-xl sm:text-2xl font-bold text-threat tracking-[0.18em]">
                USIU
              </div>
              <div className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-[0.22em] -mt-px">
                Secure Terminal
              </div>
            </div>
          </div>

          <div className="flex sm:hidden flex-col min-w-0 border-l border-white/10 pl-2">
            <span className="text-[9px] text-warning font-mono uppercase tracking-wider">Case #02</span>
          </div>

          <div className="hidden sm:flex flex-col min-w-0 border-l border-white/10 pl-3 leading-tight">
            <span className="text-[9px] text-slate-600 uppercase tracking-[0.25em]">Dossier</span>
            <span className="text-[11px] sm:text-xs text-warning font-mono uppercase tracking-wider truncate -mt-px">
              Case File #02
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-threat/40 bg-threat/10 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-threat opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-threat" />
          </span>
          <AlertTriangle className="w-3.5 h-3.5 text-threat hidden sm:block" strokeWidth={2} />
          <span className="font-mono text-[10px] sm:text-xs text-threat uppercase tracking-widest font-semibold">
            Threat Level: High
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <MetaChip icon={Clock} label="Detected" value={CASE_METADATA.timeDetected} tone="threat" />
          <MetaChip icon={Activity} label="Phases" value={`${CASE_METADATA.activePhases} Active`} />
          <MetaChip icon={Radio} label="Status" value="Ongoing" tone="safe" />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-cyan/0 via-cyan/30 to-cyan/0" />
    </header>
  );
}
