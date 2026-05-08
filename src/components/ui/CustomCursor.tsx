import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'glow'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursor = target.closest('[data-cursor]');
      if (cursor) {
        setCursorType(cursor.getAttribute('data-cursor') as 'default' | 'pointer' | 'glow');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Inner Dot - Fast and Responsive */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[999] pointer-events-none mix-blend-difference"
        style={{ 
          x: dotX, 
          y: dotY, 
          translateX: '-50%', 
          translateY: '-50%',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Outer Ring - Fluid but Snappy */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[998] pointer-events-none border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform, width, height',
          backfaceVisibility: 'hidden'
        }}
        animate={{
          width: cursorType === 'pointer' ? 64 : 32,
          height: cursorType === 'pointer' ? 64 : 32,
          opacity: cursorType === 'pointer' ? 1 : 0.5,
          borderWidth: cursorType === 'pointer' ? '1px' : '1.5px',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 250, 
          damping: 25,
          mass: 0.5 // Makes it feel lighter
        }}
      />
    </>
  );
}
