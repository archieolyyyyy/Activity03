import { useEffect, useRef, useState, useCallback } from 'react';
import { TERMINAL_LOG } from '../../data/caseData';
import { FieldNote } from '../ui/Primitives';
import type { PHASES } from '../../data/caseData';

type Phase = (typeof PHASES)[number];
type LogEntry = (typeof TERMINAL_LOG)[number];

export function Phase2Terminal({ phase }: { phase: Phase }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LogEntry[]>([]);
  const hasAutoPlayedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const sessionRef = useRef(0);

  const stopPlayback = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    sessionRef.current += 1;
  }, []);

  const play = useCallback(() => {
    stopPlayback();
    const session = sessionRef.current;
    setLines([]);

    let idx = 0;
    const add = () => {
      if (session !== sessionRef.current) return;
      const entry = TERMINAL_LOG[idx];
      if (!entry) return;

      setLines((prev) => [...prev, entry]);
      idx += 1;

      if (idx < TERMINAL_LOG.length) {
        timeoutRef.current = setTimeout(add, 500);
      }
    };

    add();
  }, [stopPlayback]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && !hasAutoPlayedRef.current) {
          hasAutoPlayedRef.current = true;
          play();
        }
      },
      { threshold: 0.35 },
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => {
      obs.disconnect();
      stopPlayback();
    };
  }, [play, stopPlayback]);

  return (
    <>
      <div ref={ref} className="bg-[#050505] border border-white/10 rounded-lg p-5 font-mono text-sm min-h-[280px]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-threat" />
          <span className="w-3 h-3 rounded-full bg-warning" />
          <span className="w-3 h-3 rounded-full bg-safe" />
          <span className="text-[11px] text-slate-500 uppercase ml-2 flex-1">
            Connection Log — Workstation AUDIT-07
          </span>
          <button
            type="button"
            onClick={play}
            className="text-[10px] uppercase tracking-wider text-cyan border border-cyan/40 px-2 py-1 rounded hover:bg-cyan/10 transition-colors duration-200"
          >
            Replay
          </button>
        </div>
        <div className="text-safe space-y-1">
          {lines.length === 0 && (
            <p className="text-slate-600">// Connection log will auto-play on scroll, or click Replay_</p>
          )}
          {lines.map((entry) => (
            <div
              key={`${entry.time}-${entry.text}`}
              className={`opacity-0 animate-[fadeInLeft_0.25s_ease_forwards] ${entry.highlight ? 'text-threat font-bold' : ''}`}
            >
              <span className="text-slate-600">[{entry.time}]</span> {entry.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        {phase.findings.map((f, i) => (
          <FieldNote key={f} label={f.match(/\[FINDING \d+\]/)?.[0] ?? ''} text={f} index={i} />
        ))}
      </div>
    </>
  );
}
