import type { Spring } from 'framer-motion';

export const springPresets: Record<string, Spring> = {
  smooth: { damping: 25, stiffness: 300 },
  snappy: { damping: 15, stiffness: 500 },
  bouncy: { damping: 12, stiffness: 400, mass: 0.5 },
  molasses: { damping: 40, stiffness: 200 },
  hero: { damping: 20, stiffness: 300 },
  card: { damping: 15, stiffness: 200, mass: 0.5 },
};

export const easingFunctions = {
  smooth: [0.4, 0.0, 0.2, 1.0],
  snappy: [0.34, 1.56, 0.64, 1.0],
  ease: [0.25, 0.46, 0.45, 0.94],
} as const;
