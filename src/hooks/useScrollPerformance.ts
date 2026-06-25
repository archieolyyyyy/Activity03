import { useEffect } from 'react';

export function useScrollPerformance() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const root = document.documentElement;

    const onScroll = () => {
      root.classList.add('is-scrolling');
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => {
        root.classList.remove('is-scrolling');
        timer = undefined;
      }, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer !== undefined) clearTimeout(timer);
      root.classList.remove('is-scrolling');
    };
  }, []);
}
