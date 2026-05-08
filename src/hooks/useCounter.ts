import { useMotionValue, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { useEffect } from 'react';

export function useCounter(target: number): MotionValue<number> {
  const progress = useMotionValue(0);
  const springValue = useSpring(progress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      progress.set(1);
    }, 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  return useTransform(springValue, (v) => v * target);
}
