import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { WeeklyContributions } from '../../lib/githubApi';

interface WeeklyChartProps {
  weeks: WeeklyContributions[];
}

export default function WeeklyChart({ weeks }: WeeklyChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxCount = Math.max(...weeks.map((w) => w.count), 1);

  const formatWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div ref={ref} className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-secondary">Weekly activity</span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {weeks.map((week, i) => {
          const height = maxCount > 0 ? (week.count / maxCount) * 100 : 0;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              className="relative flex-1 h-full flex flex-col justify-end group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="w-full min-w-[4px] rounded-t-[2px] cursor-pointer transition-colors duration-200"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to top, #3b82f6, #8b5cf6)'
                    : 'rgba(59, 130, 246, 0.4)',
                }}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${Math.max(height, 4)}%` } : { height: 0 }}
                transition={{
                  delay: i * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              />

              {isHovered && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface border border-white/10 text-xs text-white whitespace-nowrap z-10">
                  {week.count} contributions
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-text-secondary/50">
          {weeks.length > 0 ? formatWeek(weeks[0].week) : ''}
        </span>
        <span className="text-[10px] text-text-secondary/50">
          {weeks.length > 0 ? formatWeek(weeks[weeks.length - 1].week) : ''}
        </span>
      </div>
    </div>
  );
}
