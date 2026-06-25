import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DoorOpen, Usb, User, Shield, Fingerprint } from 'lucide-react';
import { EVIDENCE_CARDS } from '../../data/caseData';
import { scrollToSection } from '../../hooks/useActiveSection';

const icons = { door: DoorOpen, usb: Usb, user: User, shield: Shield, fingerprint: Fingerprint };
const ROTATIONS = [-2.2, 1.6, -0.8, 2.2, -1.4];

function Pushpin() {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div className="evidence-pushpin relative w-[18px] h-[18px] rounded-full" />
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-px h-2 bg-black/25" />
    </div>
  );
}

export function EvidenceBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const draw = () => {
      if (!boardRef.current) return;
      const board = boardRef.current.getBoundingClientRect();
      const paths: string[] = [];
      for (let i = 0; i < cardsRef.current.length - 1; i++) {
        const a = cardsRef.current[i]?.getBoundingClientRect();
        const b = cardsRef.current[i + 1]?.getBoundingClientRect();
        if (!a || !b) continue;
        const x1 = a.left + a.width / 2 - board.left;
        const y1 = a.top + 18 - board.top;
        const x2 = b.left + b.width / 2 - board.left;
        const y2 = b.top + 18 - board.top;
        const midY = Math.min(y1, y2) - 24;
        paths.push(`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y2}`);
      }
      setLines(paths);
    };
    draw();
    window.addEventListener('resize', draw);
    const t = setTimeout(draw, 400);
    return () => {
      window.removeEventListener('resize', draw);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="evidenceBoard"
      className="relative mx-3 sm:mx-6 my-8 sm:my-12 min-h-[60vh] sm:min-h-[72vh] rounded-lg overflow-hidden evidence-frame evidence-cork"
    >
      <div ref={boardRef} className="relative p-6 sm:p-10 min-h-[60vh] sm:min-h-[72vh]">
        {/* case stamp */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-[4] hidden sm:block rotate-[-8deg] border-2 border-[#5c4033]/50 px-3 py-1.5 rounded-sm bg-[#f5e6c8]/80">
          <div className="font-mono text-[9px] text-[#5c4033] uppercase tracking-[0.25em] font-bold">
            USIU · Case #02
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[3]" preserveAspectRatio="none">
          {lines.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="7 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.12 }}
            />
          ))}
        </svg>

        <div className="relative z-[4] text-center mb-8 sm:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2d2116] uppercase tracking-[0.2em] drop-shadow-[1px_1px_0_rgba(255,255,255,0.25)]">
            Evidence Board
          </h2>
          <div className="mt-2 mx-auto w-16 h-0.5 bg-[#5c4033]/40 rounded-full" />
        </div>

        <div className="relative z-[4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto px-1">
          {EVIDENCE_CARDS.map((card, i) => {
            const Icon = icons[card.icon as keyof typeof icons];
            return (
              <motion.button
                key={card.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                type="button"
                onClick={() => scrollToSection(card.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  rotate: 0,
                  boxShadow: '6px 14px 32px rgba(0,0,0,0.42), 0 0 24px rgba(220,38,38,0.12)',
                }}
                whileTap={{ scale: 0.98, y: -4 }}
                className="evidence-paper group relative text-left sm:text-center p-5 sm:p-6 pt-9 rounded-sm cursor-pointer min-h-[200px] flex flex-col items-center border border-[#d4c4a0]/80 hover:border-[#b8956a]/90 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-threat/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#8b6f47]"
                style={{ rotate: `${ROTATIONS[i]}deg` }}
              >
                <Pushpin />

                <div className="relative z-10 flex flex-col items-center h-full w-full">
                  <div className="mb-3 p-2.5 rounded-full bg-[#2d2116]/5 group-hover:bg-threat/10 transition-colors duration-300">
                    <Icon
                      className="w-9 h-9 text-[#b91c1c] group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="font-mono text-[11px] sm:text-xs text-[#b91c1c] font-bold tracking-[0.18em] mb-1.5">
                    {card.phase}
                  </div>

                  <div className="font-heading font-bold text-[15px] sm:text-base text-[#1a1410] leading-snug mb-3 px-1">
                    {card.title}
                  </div>

                  <div className="mt-auto w-full pt-3 border-t border-[#d4c4a0]/70">
                    <span className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-semibold text-[#4a3728] uppercase tracking-wider group-hover:text-[#b91c1c] transition-colors duration-300">
                      Open Phase
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
