import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) setReducedMotion(true);
  }, []);

  function toggleMotion() {
    setReducedMotion((prev) => {
      const next = !prev;
      document.body.classList.toggle('reduced-motion', next);
      return next;
    });
  }

  return { reducedMotion, toggleMotion };
}
