import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_LINES } from '../../data/caseData';
import { useInvestigationStore } from '../../store/useInvestigationStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function BootScreen() {
  const reduced = useReducedMotion();
  const setBootComplete = useInvestigationStore((s) => s.setBootComplete);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setVisible(false);
    setBootComplete(true);
  }, [setBootComplete]);

  useEffect(() => {
    if (reduced) {
      dismiss();
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let current = '';

    const interval = setInterval(() => {
      if (lineIdx >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(dismiss, 1500);
        return;
      }

      const target = BOOT_LINES[lineIdx];
      if (charIdx < target.length) {
        current += target[charIdx++];
        setLines((prev) => {
          const next = [...prev];
          next[lineIdx] = current;
          return next;
        });
      } else {
        lineIdx++;
        charIdx = 0;
        current = '';
        setProgress((lineIdx / BOOT_LINES.length) * 100);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [reduced, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="USIU Secure Terminal boot sequence"
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') dismiss();
          }}
          tabIndex={0}
        >
          <div className="w-full max-w-xl px-6 font-mono text-safe text-lg leading-loose pointer-events-none">
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <span className="inline-block w-2 h-5 bg-safe animate-pulse ml-1" />
          </div>
          <div className="w-full max-w-xl px-6 mt-8 h-1 bg-white/10 rounded overflow-hidden pointer-events-none">
            <motion.div className="h-full bg-safe" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-8 text-[10px] text-slate-600 uppercase tracking-widest pointer-events-none">
            Click or press any key to continue
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
