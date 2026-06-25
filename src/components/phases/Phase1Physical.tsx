import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { ROOM_DATA } from '../../data/caseData';
import { FieldNote } from '../ui/Primitives';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { PHASES } from '../../data/caseData';

type Phase = (typeof PHASES)[number];

const ROOMS = {
  reception: { x: 20, y: 200, w: 160, h: 100, label: 'RECEPTION', sub: 'Public Access' },
  server: { x: 200, y: 20, w: 180, h: 140, label: 'SERVER ROOM', sub: 'Restricted Access' },
  restricted: { x: 200, y: 180, w: 180, h: 120, label: 'RESTRICTED FLOOR', sub: 'Authorized Only' },
} as const;

// tailgate path
const ENTRY_PATH = 'M 180 250 L 192 250 L 192 178 Q 240 168 290 162';

export function Phase1Physical({ phase }: { phase: Phase }) {
  const reduced = useReducedMotion();
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const room = activeRoom ? ROOM_DATA[activeRoom] : null;

  return (
    <>
      <div className="glass-panel p-5 overflow-hidden">
        <h4 className="flex items-center gap-2 text-warning text-sm uppercase tracking-wider mb-4 font-heading border-b border-warning/20 pb-3">
          <Building2 className="w-4 h-4" /> Building Floorplan — Click Rooms
        </h4>

        <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto" aria-label="Building floorplan">
          <defs>
            <filter id="room-glow-green" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.55" />
            </filter>
            <filter id="room-glow-red" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ef4444" floodOpacity="0.65" />
            </filter>
            <marker
              id="entry-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
            </marker>
          </defs>

          {/* path under rooms */}
          <motion.path
            d={ENTRY_PATH}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
            markerEnd="url(#entry-arrow)"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />

          {(Object.keys(ROOMS) as (keyof typeof ROOMS)[]).map((id) => {
            const coords = ROOMS[id];
            const isActive = activeRoom === id;
            const isHovered = hoveredRoom === id;
            const isHot = isActive || isHovered;
            const cx = coords.x + coords.w / 2;
            const cy = coords.y + coords.h / 2;

            return (
              <motion.g
                key={id}
                onClick={() => setActiveRoom(id)}
                onMouseEnter={() => setHoveredRoom(id)}
                onMouseLeave={() => setHoveredRoom(null)}
                className="cursor-pointer"
                animate={{ scale: isHot ? 1.02 : 1 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              >
                <rect
                  x={coords.x}
                  y={coords.y}
                  width={coords.w}
                  height={coords.h}
                  rx={4}
                  fill={isActive ? '#3a1818' : isHovered ? '#1a3030' : '#141c22'}
                  stroke={isActive ? '#ef4444' : isHovered ? '#06b6d4' : '#10b981'}
                  strokeWidth={isHot ? 2.5 : 2}
                  filter={isActive ? 'url(#room-glow-red)' : isHovered ? 'url(#room-glow-green)' : undefined}
                  className="transition-[fill,stroke] duration-200"
                />
                {isHovered && !isActive && (
                  <rect
                    x={coords.x + 2}
                    y={coords.y + 2}
                    width={coords.w - 4}
                    height={coords.h - 4}
                    rx={3}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    opacity={0.45}
                  />
                )}
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  fill={isHot ? '#f1f5f9' : '#ccc'}
                  fontSize={11}
                  fontFamily="Share Tech Mono"
                  className="pointer-events-none select-none"
                >
                  {coords.label}
                </text>
                <text
                  x={cx}
                  y={cy + 8}
                  textAnchor="middle"
                  fill={isHot ? '#94a3b8' : '#888'}
                  fontSize={9}
                  fontFamily="Share Tech Mono"
                  className="pointer-events-none select-none"
                >
                  {coords.sub}
                </text>
              </motion.g>
            );
          })}
        </svg>

        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider">
          <span className="text-threat">Tailgate Entry Path</span>
          <ArrowRight className="w-3 h-3 text-slate-600" strokeWidth={2} />
          <span className="text-slate-500">Reception</span>
          <ArrowRight className="w-3 h-3 text-threat/60" strokeWidth={2} />
          <span className="text-slate-500">Server Room</span>
        </div>

        <AnimatePresence>
          {room && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="p-3 border border-warning/50 bg-black/50 rounded text-sm">
                <div className="text-warning text-xs font-bold uppercase mb-1">{room.title}</div>
                <p className="text-slate-300">{room.text}</p>
              </div>
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
