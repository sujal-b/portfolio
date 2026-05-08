import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color?: string;
  duration?: number;
}

export default function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  color = '#10b981',
  duration = 1.8,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();
    const durationMs = duration * 1000;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setHasCompleted(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const isDecimal = value % 1 !== 0;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        className="text-2xl md:text-3xl font-bold font-mono"
        style={{ color }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        {prefix}
        {isDecimal ? displayValue.toFixed(1) : displayValue}
        {suffix}
      </motion.div>
      <motion.span
        className="text-xs text-text-secondary mt-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        {label}
      </motion.span>
      {hasCompleted && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ boxShadow: `0 0 20px ${color}30` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  );
}
