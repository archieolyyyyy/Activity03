import { motion, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { IMPROVEMENT_ITEMS } from '../../data/caseData';
import { useInvestigationStore } from '../../store/useInvestigationStore';

function ScoreDisplay() {
  const score = useInvestigationStore((s) => s.securityPostureScore);
  const mitigated = useInvestigationStore((s) => s.isThreatMitigated());
  const spring = useSpring(score, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(`${score}/100`);

  useEffect(() => {
    spring.set(score);
  }, [score, spring]);

  useMotionValueEvent(spring, 'change', (v) => {
    setDisplay(`${Math.round(v)}/100`);
  });

  return (
    <div className="text-center mb-12">
      <div className="text-xs text-warning uppercase tracking-[0.2em] mb-3">Security Posture Score</div>
      <motion.div
        className={`font-heading text-5xl sm:text-6xl font-bold ${mitigated ? 'text-safe' : 'text-threat'}`}
      >
        {display}
      </motion.div>
      {mitigated ? (
        <div className="flex items-center justify-center gap-2 mt-3 text-safe font-bold uppercase tracking-widest text-sm">
          <CheckCircle className="w-5 h-5" />
          Threat Significantly Mitigated
        </div>
      ) : (
        <p className="text-slate-500 text-sm mt-2">Multiple critical failures detected</p>
      )}
    </div>
  );
}

function Column({
  col,
  title,
  items,
}: {
  col: 'physical' | 'personnel' | 'management';
  title: string;
  items: { id: string; text: string; points: number }[];
}) {
  const { checkedItems, toggleImprovementItem, getColumnComplete } = useInvestigationStore();
  const complete = getColumnComplete(col);

  return (
    <div className="glass-panel overflow-visible">
      <div
        className={`p-5 text-center font-heading font-bold uppercase tracking-widest transition-colors duration-300 ${
          complete ? 'bg-safe/15 text-safe' : 'bg-threat/15 text-threat'
        }`}
      >
        {title}
      </div>
      <div className="p-2">
        {items.map((item) => {
          const checked = checkedItems.has(item.id);
          return (
            <label
              key={item.id}
              className={`flex items-center gap-3 px-3 py-3 border-b border-white/5 last:border-0 cursor-pointer transition-colors duration-200 ${
                checked ? 'text-safe' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleImprovementItem(item.id, item.points)}
                className="w-4 h-4 accent-safe"
              />
              <span className={`text-sm flex-1 ${checked ? 'line-through' : ''}`}>{item.text}</span>
              <span
                className={`text-[9px] uppercase px-2 py-0.5 rounded ${
                  checked ? 'bg-safe/15 text-safe' : 'bg-threat/15 text-threat'
                }`}
              >
                {checked ? 'Passed' : 'Failed'}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function ImprovementSection() {
  return (
    <section id="improvementSection" className="scroll-section py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="section-label mb-2">Remediation</div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase mb-6 sm:mb-8">Security Improvement Plan</h2>
      <ScoreDisplay />
      <div className="grid md:grid-cols-3 gap-5">
        <Column col="physical" title="Physical" items={IMPROVEMENT_ITEMS.physical} />
        <Column col="personnel" title="Personnel" items={IMPROVEMENT_ITEMS.personnel} />
        <Column col="management" title="Management" items={IMPROVEMENT_ITEMS.management} />
      </div>
    </section>
  );
}
