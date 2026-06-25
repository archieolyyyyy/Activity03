import { motion } from 'framer-motion';
import { RECOMMENDATIONS } from '../../data/caseData';

const priorityClass = {
  IMMEDIATE: 'bg-threat text-white border-threat shadow-[0_0_12px_rgba(239,68,68,0.35)]',
  'SHORT-TERM': 'bg-warning text-black border-warning shadow-[0_0_12px_rgba(245,158,11,0.3)]',
  ONGOING: 'bg-cyan text-black border-cyan shadow-[0_0_12px_rgba(6,182,212,0.3)]',
};

export function RecommendationsSection() {
  return (
    <section id="recommendationsSection" className="py-10 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="section-label mb-2">Strategic Recommendations</div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase mb-8 sm:mb-10">Recommendations</h2>
      <div className="space-y-5">
        {RECOMMENDATIONS.map((rec, i) => {
          const justification = rec.justification.replace(/^Justification:\s*/i, '');
          return (
            <motion.article
              key={rec.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative glass-panel p-5 sm:p-8 sm:hover:translate-x-1 transition-transform duration-200"
            >
              <span className="absolute top-3 right-4 sm:top-4 sm:right-6 font-mono text-lg sm:text-xl font-bold text-white/10">
                {rec.id}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 pr-10">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase w-fit tracking-wider ${priorityClass[rec.priority]}`}
                >
                  {rec.priority}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100">{rec.title}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{rec.body}</p>
              <div className="rounded border border-white/10 bg-[#0a0a0c] p-4 border-l-[3px] border-l-warning">
                <div className="text-[10px] text-warning uppercase tracking-[0.2em] font-bold mb-2">
                  Justification
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">{justification}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
