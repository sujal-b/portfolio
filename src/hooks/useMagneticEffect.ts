import { useRef, useCallback, type RefObject } from 'react';

interface MagneticResult {
  x: number;
  y: number;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  options?: { strength?: number; radius?: number }
): { onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void } {
  const { strength = 0.3, radius = 80 } = options || {};
  const currentPos = useRef<MagneticResult>({ x: 0, y: 0 });
  const rafId = useRef(0);

  const animate = useCallback(() => {
    if (!ref.current) return;
    const { x, y } = currentPos.current;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
    rafId.current = requestAnimationFrame(animate);
  }, [ref]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        currentPos.current = {
          x: deltaX * strength,
          y: deltaY * strength,
        };
      } else {
        currentPos.current = { x: 0, y: 0 };
      }

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animate);
    },
    [ref, strength, radius, animate]
  );

  const onMouseLeave = useCallback(() => {
    currentPos.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  return { onMouseMove, onMouseLeave };
}
