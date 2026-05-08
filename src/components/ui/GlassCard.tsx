import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.09] rounded-2xl ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
              borderColor: 'rgba(139, 92, 246, 0.3)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
