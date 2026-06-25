import { motion } from 'framer-motion';
import { PHASES } from '../../data/caseData';
import { Phase1Physical } from '../phases/Phase1Physical';
import { Phase2Terminal } from '../phases/Phase2Terminal';
import { Phase3Personnel } from '../phases/Phase3Personnel';
import { Phase4Dashboard } from '../phases/Phase4Dashboard';
import { Phase5Forensics } from '../phases/Phase5Forensics';
import { ErrorBoundary } from '../ui/ErrorBoundary';

const borderMap: Record<string, string> = {
  'border-t-threat': 'border-t-threat',
  'border-t-warning': 'border-t-warning',
  'border-t-info': 'border-t-info',
  'border-t-purple': 'border-t-purple',
  'border-t-safe': 'border-t-safe',
};

const phaseContent: Record<string, React.ComponentType<{ phase: (typeof PHASES)[number] }>> = {
  phase1: Phase1Physical,
  phase2: Phase2Terminal,
  phase3: Phase3Personnel,
  phase4: Phase4Dashboard,
  phase5: Phase5Forensics,
};

export function PhasesSection() {
  return (
    <section className="px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-6xl mx-auto">
      {PHASES.map((phase) => {
        const Content = phaseContent[phase.id];
        return (
          <motion.article
            key={phase.id}
            id={phase.id}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className={`relative glass-panel overflow-hidden border-t-4 ${borderMap[phase.border] ?? 'border-t-threat'}`}
          >
            <span className="absolute top-4 right-6 text-6xl font-heading font-bold text-white/[0.03] pointer-events-none">
              {phase.num}
            </span>
            <div className="absolute top-5 right-8 classification-stamp text-2xl pointer-events-none opacity-20">
              Classified
            </div>
            <header className="p-5 sm:p-8 pb-0">
              <div className="section-label mb-2">{phase.label}</div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase">{phase.title}</h2>
              <p className="text-warning text-xs sm:text-sm italic mt-2">{phase.scene}</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 p-5 sm:p-8">
              <ErrorBoundary label={phase.title}>
                <Content phase={phase} />
              </ErrorBoundary>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
