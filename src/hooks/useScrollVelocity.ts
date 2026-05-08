import { useRef, useCallback } from 'react';

export function useScrollVelocity(): {
  updateSkew: () => void;
} {
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const currentSkew = useRef(0);
  const targetSkew = useRef(0);
  const rafId = useRef(0);

  const updateSkew = useCallback(() => {
    const now = performance.now();
    const dt = now - lastTime.current;

    if (dt > 16) {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      targetSkew.current = Math.max(-8, Math.min(8, delta * 0.04));
      lastScrollY.current = scrollY;
      lastTime.current = now;
    }

    currentSkew.current += (targetSkew.current - currentSkew.current) * 0.15;

    if (Math.abs(currentSkew.current) < 0.01) {
      currentSkew.current = 0;
    }

    document.documentElement.style.setProperty('--skew', `${currentSkew.current}deg`);

    targetSkew.current *= 0.92;

    rafId.current = requestAnimationFrame(updateSkew);
  }, []);

  return { updateSkew };
}
