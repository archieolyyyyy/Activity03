import { useEffect, useRef, useState } from 'react';
import { NAV_SECTIONS, type NavSection } from '../data/caseData';

const SECTION_IDS: NavSection[] = NAV_SECTIONS.map((s) => s.id);

export function useActiveSection() {
  const [active, setActive] = useState<NavSection>(SECTION_IDS[0]);
  const activeRef = useRef(active);
  const ratiosRef = useRef(new Map<string, number>());

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
      if (bestId && bestRatio > 0 && bestId !== activeRef.current) {
        activeRef.current = bestId;
        setActive(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });
        pickBest();
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75], rootMargin: '-12% 0px -55% 0px' },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
