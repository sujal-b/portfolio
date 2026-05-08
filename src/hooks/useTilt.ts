import { useRef, useCallback, type RefObject } from 'react';

interface TiltResult {
  rotateX: number;
  rotateY: number;
  specularX: number;
  specularY: number;
}

export function useTilt(
  ref: RefObject<HTMLElement | null>,
  options?: { maxTilt?: number; perspective?: number }
): { onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void } {
  const { maxTilt = 15, perspective = 1000 } = options || {};
  const currentTilt = useRef<TiltResult>({ rotateX: 0, rotateY: 0, specularX: 50, specularY: 50 });
  const targetTilt = useRef<TiltResult>({ rotateX: 0, rotateY: 0, specularX: 50, specularY: 50 });
  const rafId = useRef(0);
  const isHovering = useRef(false);

  const animate = useCallback(() => {
    if (!ref.current) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const speed = isHovering.current ? 0.15 : 0.08;

    currentTilt.current.rotateX = lerp(currentTilt.current.rotateX, targetTilt.current.rotateX, speed);
    currentTilt.current.rotateY = lerp(currentTilt.current.rotateY, targetTilt.current.rotateY, speed);
    currentTilt.current.specularX = lerp(currentTilt.current.specularX, targetTilt.current.specularX, speed);
    currentTilt.current.specularY = lerp(currentTilt.current.specularY, targetTilt.current.specularY, speed);

    const { rotateX, rotateY, specularX, specularY } = currentTilt.current;

    ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const specularEl = ref.current.querySelector('.specular-highlight') as HTMLElement;
    if (specularEl) {
      specularEl.style.background = `radial-gradient(circle at ${specularX}% ${specularY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [ref, perspective]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      isHovering.current = true;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      targetTilt.current = {
        rotateX: (y - 0.5) * -maxTilt * 2,
        rotateY: (x - 0.5) * maxTilt * 2,
        specularX: (1 - x) * 100,
        specularY: y * 100,
      };

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animate);
    },
    [ref, maxTilt, animate]
  );

  const onMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetTilt.current = { rotateX: 0, rotateY: 0, specularX: 50, specularY: 50 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  return { onMouseMove, onMouseLeave };
}
