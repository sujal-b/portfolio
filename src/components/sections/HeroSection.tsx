import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AuroraMesh from '../ui/AuroraMesh';
import GlitchText from '../ui/GlitchText';
import { useCounter } from '../../hooks/useCounter';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const stats = [
  { value: 9.26, label: 'CGPA', className: 'text-gradient' },
  { value: 9, label: 'Projects', className: 'text-emerald-400' },
  { value: 2, label: 'Roles', className: 'text-purple-400' },
] as const;

function StatCounter({ target, label, className }: { target: number; label: string; className: string }) {
  const count = useCounter(target);
  const isDecimal = target % 1 !== 0;
  const displayRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(count, 'change', (latest) => {
    if (displayRef.current) {
      displayRef.current.textContent = isDecimal ? Number(latest).toFixed(2) : String(latest);
    }
  });

  return (
    <div className="flex flex-col items-center">
      <span ref={displayRef} className={`text-3xl font-bold ${className}`}>
        {isDecimal ? '0.00' : '0'}
      </span>
      <span className="text-sm text-text-secondary mt-1">{label}</span>
    </div>
  );
}

export default function HeroSection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AuroraMesh />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center"
      >
        <h1 data-cursor="glow">
          <GlitchText 
            text="Sujal Barwad" 
            className="text-5xl font-extrabold md:text-7xl lg:text-8xl text-gradient"
          />
        </h1>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1.2, ease: 'easeOut' }}
          className="text-xl text-text-secondary md:text-2xl mt-4"
        >
          AI/ML Lead &amp; Data Analyst
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1.6, ease: 'easeOut' }}
          className="text-base text-text-secondary mt-3 max-w-lg"
        >
          Turning complex problems into elegant, scalable solutions
        </motion.p>

        <div className="mt-12 flex items-center gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 1.4 + i * 0.2, ease: 'easeOut' }}
            >
              <StatCounter
                target={stat.value}
                label={stat.label}
                className={stat.className}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {!isTouchDevice && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-70 text-text-secondary"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.div>
      )}
    </section>
  );
}
