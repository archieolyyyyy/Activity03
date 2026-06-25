import { create } from 'zustand';
import type { GaugeId, PrivilegeId } from '../types';

const BASELINE_SCORE = 12;

const BOOT_KEY = 'usiu-boot-complete';

interface InvestigationState {
  bootComplete: boolean;
  setBootComplete: (v: boolean) => void;

  offboardingStatus: Record<PrivilegeId, { revoked: boolean; timestamp?: string }>;
  revokePrivilege: (id: PrivilegeId) => void;
  isOffboardingComplete: () => boolean;

  remediationMetrics: Record<GaugeId, { value: number; remediated: boolean }>;
  remediateGauge: (id: GaugeId) => void;

  checkedItems: Set<string>;
  toggleImprovementItem: (id: string, points: number) => void;
  securityPostureScore: number;
  isThreatMitigated: () => boolean;
  getColumnComplete: (col: 'physical' | 'personnel' | 'management') => boolean;
}

export const useInvestigationStore = create<InvestigationState>((set, get) => ({
  bootComplete: typeof sessionStorage !== 'undefined' && sessionStorage.getItem(BOOT_KEY) === '1',
  setBootComplete: (v) => {
    if (typeof sessionStorage !== 'undefined') {
      if (v) sessionStorage.setItem(BOOT_KEY, '1');
      else sessionStorage.removeItem(BOOT_KEY);
    }
    set({ bootComplete: v });
  },

  offboardingStatus: {
    ad: { revoked: false },
    admin: { revoked: false },
    card: { revoked: false },
    device: { revoked: false },
  },
  revokePrivilege: (id) =>
    set((s) => {
      if (s.offboardingStatus[id].revoked) return s;
      const now = new Date();
      const ts = now.toTimeString().slice(0, 8);
      return {
        offboardingStatus: {
          ...s.offboardingStatus,
          [id]: { revoked: true, timestamp: ts },
        },
      };
    }),
  isOffboardingComplete: () =>
    Object.values(get().offboardingStatus).every((v) => v.revoked),

  remediationMetrics: {
    policy: { value: 12, remediated: false },
    vuln: { value: 5, remediated: false },
    training: { value: 20, remediated: false },
    audit: { value: 0, remediated: false },
  },
  remediateGauge: (id) =>
    set((s) => {
      if (s.remediationMetrics[id].remediated) return s;
      return {
        remediationMetrics: {
          ...s.remediationMetrics,
          [id]: { value: 100, remediated: true },
        },
      };
    }),

  checkedItems: new Set<string>(),
  securityPostureScore: BASELINE_SCORE,
  toggleImprovementItem: (id, points) =>
    set((s) => {
      const next = new Set(s.checkedItems);
      let delta = 0;
      if (next.has(id)) {
        next.delete(id);
        delta = -points;
      } else {
        next.add(id);
        delta = points;
      }
      return {
        checkedItems: next,
        securityPostureScore: Math.min(100, Math.max(BASELINE_SCORE, s.securityPostureScore + delta)),
      };
    }),
  isThreatMitigated: () => get().checkedItems.size === 15,
  getColumnComplete: (col) => {
    const prefixes = { physical: 'p', personnel: 'pe', management: 'm' };
    const prefix = prefixes[col];
    const items = [...get().checkedItems].filter((id) => id.startsWith(prefix));
    const counts = { physical: 5, personnel: 5, management: 5 };
    return items.length === counts[col];
  },
}));
