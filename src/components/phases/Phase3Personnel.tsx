import { motion, AnimatePresence } from 'framer-motion';
import { Key, Zap, CreditCard, Laptop, User, CheckCircle } from 'lucide-react';
import { PRIVILEGE_VECTORS } from '../../data/caseData';
import { useInvestigationStore } from '../../store/useInvestigationStore';
import { FieldNote } from '../ui/Primitives';
import type { PHASES } from '../../data/caseData';
import type { PrivilegeId } from '../../types';

type Phase = (typeof PHASES)[number];
const icons = { ad: Key, admin: Zap, card: CreditCard, device: Laptop };

export function Phase3Personnel({ phase }: { phase: Phase }) {
  const { offboardingStatus, revokePrivilege, isOffboardingComplete } = useInvestigationStore();
  const complete = isOffboardingComplete();

  return (
    <>
      <div className="glass-panel p-6">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="w-14 h-14 rounded-full border-2 border-threat flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <User className="w-7 h-7 text-threat" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold">
              J. DELA CRUZ{' '}
              <span className="text-[11px] text-threat bg-threat/15 px-2 py-0.5 rounded uppercase ml-2">
                Resigned
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Former IT Administrator | Last Day: 2 Weeks Ago</p>
          </div>
        </div>

        <ul className="space-y-0">
          {PRIVILEGE_VECTORS.map(({ id, label, initial }) => {
            const status = offboardingStatus[id as PrivilegeId];
            const Icon = icons[id as PrivilegeId];
            return (
              <li
                key={id}
                className="flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_120px_80px] sm:items-center sm:gap-3 py-3.5 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-5 h-5 text-warning shrink-0" />
                  <span className="text-sm">{label}</span>
                </div>
                <div className="flex items-center gap-2 sm:contents">
                <span
                  className={`text-[10px] font-bold uppercase text-center px-2 py-1 rounded sm:order-none ${
                    status.revoked
                      ? 'text-safe bg-safe/15'
                      : 'text-threat bg-threat/15'
                  }`}
                >
                  {status.revoked ? `Revoked @ ${status.timestamp}` : initial}
                </span>
                <button
                  type="button"
                  disabled={status.revoked}
                  onClick={() => revokePrivilege(id as PrivilegeId)}
                  className="text-[10px] uppercase tracking-wider border border-slate-600 text-slate-400 px-2 py-1.5 rounded hover:border-threat hover:text-threat disabled:border-safe disabled:text-safe transition-colors duration-200 sm:w-auto w-full sm:justify-self-end"
                >
                  {status.revoked ? 'Revoked' : 'Revoke'}
                </button>
                </div>
              </li>
            );
          })}
        </ul>

        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center justify-center gap-2 p-4 border border-safe bg-safe/15 text-safe text-sm font-bold uppercase tracking-widest rounded"
            >
              <CheckCircle className="w-5 h-5" />
              Offboarding Complete — Threat Neutralized
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        {phase.findings.map((f, i) => (
          <FieldNote key={f} label={f.match(/\[FINDING \d+\]/)?.[0] ?? ''} text={f} index={i} />
        ))}
      </div>
    </>
  );
}
