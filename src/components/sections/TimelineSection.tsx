import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/caseData';

const severityColor = {
  red: 'border-threat text-threat shadow-[0_0_8px_rgba(239,68,68,0.4)]',
  amber: 'border-warning text-warning shadow-[0_0_8px_rgba(245,158,11,0.4)]',
  green: 'border-safe text-safe shadow-[0_0_8px_rgba(16,185,129,0.4)]',
};

export function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(TIMELINE_EVENTS.length - 1);
  const [progress, setProgress] = useState(0);
  const selected = TIMELINE_EVENTS[active];

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  const scrollBy = (dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' });
  };

  const seekTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: ratio * max, behavior: 'smooth' });
  };

  return (
    <section id="timelineSection" className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <div className="section-label">Incident Reconstruction</div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase">Incident Timeline</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          className="forensic-scroll overflow-x-auto pb-2 -mx-1 px-1"
        >
          <div className="relative flex gap-6 sm:gap-10 md:gap-12 w-max min-w-full px-2 sm:px-6 py-8 sm:py-10">
            <div className="absolute top-[calc(50%-18px)] left-6 right-6 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-threat/60 to-transparent" />
            {TIMELINE_EVENTS.map((ev, i) => (
              <button
                key={ev.time + ev.label}
                type="button"
                onClick={() => setActive(i)}
                className="relative flex flex-col items-center w-[88px] sm:w-[110px] md:w-[120px] shrink-0 group"
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] bg-terminal z-10 transition-transform duration-200 ${
                    severityColor[ev.severity]
                  } ${active === i ? 'scale-125 shadow-lg ring-2 ring-cyan/40' : 'group-hover:scale-110'}`}
                />
                <span className="mt-2 text-[9px] sm:text-[10px] text-slate-400 text-center leading-tight max-w-[88px] sm:max-w-[110px]">
                  {ev.label}
                </span>
                <span className="mt-1.5 text-[9px] sm:text-[10px] text-threat font-bold">{ev.time}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel border border-cyan/20 p-3 sm:p-4 mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] sm:text-[10px] font-mono text-cyan uppercase tracking-[0.2em]">
              Timeline Axis Control
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500">
              EVT {String(active + 1).padStart(2, '0')}/{String(TIMELINE_EVENTS.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Scroll timeline left"
              onClick={() => scrollBy(-260)}
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-threat/50 text-threat rounded bg-black/40 hover:bg-threat/15 hover:border-threat transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div
              role="slider"
              aria-label="Timeline scroll position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              tabIndex={0}
              onClick={seekTrack}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') scrollBy(-120);
                if (e.key === 'ArrowRight') scrollBy(120);
              }}
              className="flex-1 relative h-2 sm:h-2.5 bg-[#050508] border border-white/10 rounded-sm cursor-pointer overflow-hidden group"
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan/20 via-cyan/40 to-threat/50 transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
              {[0.25, 0.5, 0.75].map((t) => (
                <span
                  key={t}
                  className="absolute top-0 bottom-0 w-px bg-white/10"
                  style={{ left: `${t * 100}%` }}
                />
              ))}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 sm:h-5 bg-cyan shadow-[0_0_12px_#06b6d4] transition-[left] duration-150"
                style={{ left: `calc(${progress * 100}% - 1px)` }}
              />
            </div>
            <span className="text-[10px] font-mono text-warning w-9 sm:w-10 text-right shrink-0 tabular-nums">
              {String(Math.round(progress * 100)).padStart(3, '0')}%
            </span>
            <button
              type="button"
              aria-label="Scroll timeline right"
              onClick={() => scrollBy(260)}
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-threat/50 text-threat rounded bg-black/40 hover:bg-threat/15 hover:border-threat transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 sm:p-6 border-l-4 border-l-threat"
        >
          <div className="text-[10px] text-warning uppercase tracking-widest mb-2">Event Details</div>
          <div className="font-heading text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{selected.time}</div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{selected.desc}</p>
        </motion.div>
      </div>
    </section>
  );
}
