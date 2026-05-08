import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({
  children,
  className = '',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const { onMouseMove, onMouseLeave } = useTilt(ref, { maxTilt: 15, perspective: 1000 });

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  if (isTouch) {
    return (
      <div className={`relative ${className}`}>
        <div>{children}</div>
        <div
          className="specular-highlight absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      <div
        className="specular-highlight absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  );
}
