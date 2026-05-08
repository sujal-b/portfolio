import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  total: number;
  color: string;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({
  value,
  total,
  color,
  label,
  size = 80,
  strokeWidth = 6,
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-lg font-bold font-mono"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {value}
          </motion.span>
        </div>
      </div>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}
