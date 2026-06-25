import { GAUGE_CONFIG } from '../../data/caseData';
import { useInvestigationStore } from '../../store/useInvestigationStore';
import { GaugeChart } from '../ui/GaugeChart';
import { FieldNote } from '../ui/Primitives';
import type { PHASES } from '../../data/caseData';
import type { GaugeId } from '../../types';

type Phase = (typeof PHASES)[number];

export function Phase4Dashboard({ phase }: { phase: Phase }) {
  const { remediationMetrics, remediateGauge } = useInvestigationStore();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 glass-panel p-6">
        {GAUGE_CONFIG.map((g) => (
          <GaugeChart
            key={g.id}
            value={remediationMetrics[g.id].value}
            label={g.label}
            description={g.desc}
            remediated={remediationMetrics[g.id].remediated}
            onRemediate={() => remediateGauge(g.id as GaugeId)}
          />
        ))}
      </div>
      <div>
        {phase.findings.map((f, i) => (
          <FieldNote key={f} label={f.match(/\[FINDING \d+\]/)?.[0] ?? ''} text={f} index={i} />
        ))}
      </div>
    </>
  );
}
