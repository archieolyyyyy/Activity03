import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const ARC = 188.5;

export function GaugeChart({
  value,
  label,
  description,
  onRemediate,
  remediated,
}: {
  value: number;
  label: string;
  description: string;
  onRemediate: () => void;
  remediated: boolean;
}) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const offset = useTransform(spring, (v) => ARC - (ARC * v) / 100);
  const color = value < 30 ? '#ef4444' : value < 60 ? '#f59e0b' : '#10b981';

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="text-center">
      <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-3 min-h-[36px]">{label}</h4>
      <svg viewBox="0 0 160 100" className="w-full max-w-[160px] mx-auto">
        <path d="M 20 90 A 60 60 0 0 1 140 90" fill="none" stroke="#333" strokeWidth="10" />
        <motion.path
          d="M 20 90 A 60 60 0 0 1 140 90"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={ARC}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <motion.div className="font-mono text-2xl font-bold mt-2" style={{ color }}>
        {Math.round(value)}%
      </motion.div>
      <p className="text-[11px] text-slate-500 mt-1">{description}</p>
      <button
        type="button"
        onClick={onRemediate}
        disabled={remediated}
        className="mt-3 px-5 py-2 text-[11px] font-mono uppercase tracking-wider border border-safe/50 text-safe rounded hover:bg-safe/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {remediated ? 'Remediated' : 'Remediate'}
      </button>
    </div>
  );
}
