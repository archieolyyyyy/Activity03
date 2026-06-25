import { useEffect, useRef, useState } from 'react';
import { NAV_SECTIONS, type NavSection } from '../data/caseData';

const SECTION_IDS: NavSection[] = NAV_SECTIONS.map((s) => s.id);

export function useActiveSection() {
  const [active, setActive] = useState<NavSection>(SECTION_IDS[0]);
  const activeRef = useRef(active);
  const ratiosRef = useRef(new Map<string, number>());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const pickBest = () => {
      let bestId: NavSection | null = null;
      let bestRatio = 0;
      ratiosRef.current.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id as NavSection;
        }
      });
      if (bestId && bestRatio > 0.08 && bestId !== activeRef.current) {
        activeRef.current = bestId;
        setActive(bestId);
      }
    };

    const schedulePick = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        pickBest();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });
        schedulePick();
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: '-10% 0px -52% 0px' },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return active;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
