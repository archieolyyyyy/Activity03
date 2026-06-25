import { motion } from 'framer-motion';
import { Zap, DollarSign, Landmark, Scale, Lock } from 'lucide-react';
import { IMPACT_CARDS } from '../../data/caseData';

const icons = [Zap, DollarSign, Landmark, Scale, Lock];
const badgeClass = {
  CRITICAL: 'bg-threat text-white',
  HIGH: 'bg-warning text-black',
};

export function ImpactSection() {
  return (
    <section id="impactSection" className="scroll-section py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="section-label mb-2">Impact Assessment</div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase mb-8 sm:mb-10">Impact Analysis</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {IMPACT_CARDS.map((card, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ delay: i * 0.08 }}
              className={`glass-panel p-6 border-l-4 ${
                card.tone === 'critical' ? 'border-l-threat' : 'border-l-warning'
              } hover:-translate-y-1 transition-transform duration-200`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-7 h-7 ${card.tone === 'critical' ? 'text-threat' : 'text-warning'}`} />
                <span className="font-heading font-bold text-lg flex-1">{card.name}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${badgeClass[card.severity]}`}>
                  {card.severity}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{card.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
