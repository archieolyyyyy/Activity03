import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ClipboardList,
  Server,
  Users,
  BookOpen,
} from 'lucide-react';
import {
  AFFECTED_ZONES,
  HERO_OVERVIEW,
  HERO_STATS,
} from '../../data/caseData';
import { ClassificationBanner } from '../ui/Primitives';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const zoneIcons = { building: Building2, clipboard: ClipboardList, server: Server, users: Users, books: BookOpen };

const toneClass = {
  danger: 'text-threat',
  warning: 'text-warning',
  info: 'text-cyan',
};

export function HeroSection() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? HERO_OVERVIEW : '');

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const t = setInterval(() => {
      if (i < HERO_OVERVIEW.length) {
        setTyped(HERO_OVERVIEW.slice(0, ++i));
      } else clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section id="overview" className="scroll-section relative py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      <ClassificationBanner
        items={['CLASSIFIED', 'CASE FILE #02', 'THREAT LEVEL: HIGH', 'USIU EYES ONLY']}
      />

      <motion.h1
        className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-slate-100 mb-3 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Operation Insider Whack-A-Mole
      </motion.h1>
      <p className="font-mono text-xs sm:text-sm text-cyan tracking-wider mb-8 sm:mb-10 px-2">
        Physical Security · Personnel Security · Digital Forensics Investigation
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {HERO_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-4"
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
            <div className={`font-heading font-bold text-lg ${toneClass[s.tone]}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        {AFFECTED_ZONES.map((z, i) => {
          const Icon = zoneIcons[z.icon as keyof typeof zoneIcons];
          return (
            <motion.div
              key={z.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass-panel p-5 border-threat/30 hover:border-threat/60 transition-colors duration-200"
            >
              <Icon className="w-8 h-8 text-threat mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-heading font-semibold text-sm mb-2">{z.name}</div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-threat uppercase">
                <span className="w-2 h-2 rounded-full bg-threat animate-pulse" />
                Breach Confirmed
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-left max-w-4xl mx-auto text-sm text-slate-400 leading-relaxed min-h-[8rem] font-mono">
        {typed}
        {!reduced && typed.length < HERO_OVERVIEW.length && (
          <span className="text-safe animate-pulse">▌</span>
        )}
      </p>
    </section>
  );
}
