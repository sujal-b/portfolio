import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticWrapper({
  children,
  className = '',
  strength = 0.3,
  radius = 80,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const { onMouseMove, onMouseLeave } = useMagneticEffect(ref, { strength, radius });

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  if (isTouch) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
