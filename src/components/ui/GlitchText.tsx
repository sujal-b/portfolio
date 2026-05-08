import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  interval?: number;
  glitchSpeed?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export default function GlitchText({ 
  text, 
  className = '', 
  interval = 3000, 
  glitchSpeed = 100 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const originalText = useRef(text);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const mainInterval = setInterval(() => {
      startGlitch();
    }, interval + Math.random() * 2000);

    return () => {
      isMounted.current = false;
      clearInterval(mainInterval);
    };
  }, [interval]);

  const startGlitch = async () => {
    if (isGlitching || !isMounted.current) return;
    setIsGlitching(true);

    const glitchDuration = 300 + Math.random() * 400;
    const startTime = Date.now();
    
    // Choose 1-3 random indices to glitch
    const indicesToGlitch = Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      () => Math.floor(Math.random() * text.length)
    );

    const animate = () => {
      if (!isMounted.current) return;
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < glitchDuration) {
        let result = originalText.current.split('');
        indicesToGlitch.forEach(idx => {
          if (result[idx] !== ' ') {
            result[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        });
        setDisplayText(result.join(''));
        setTimeout(animate, glitchSpeed);
      } else {
        setDisplayText(originalText.current);
        setIsGlitching(false);
      }
    };

    animate();
  };

  return (
    <div className="relative inline-block">
      <motion.span
        animate={isGlitching ? {
          x: [-1, 1, -1, 0],
          y: [0, -1, 1, 0],
          filter: [
            'none',
            'drop-shadow(-2px 0 #3b82f6) drop-shadow(2px 0 #f43f5e)',
            'none'
          ]
        } : {}}
        transition={{ duration: 0.2, repeat: isGlitching ? 2 : 0 }}
        className={`block leading-tight ${className}`}
      >
        {displayText}
      </motion.span>
      
      {/* Glitch overlays */}
      {isGlitching && (
        <>
          <motion.span
            className={`absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none select-none ${className}`}
            style={{ color: '#3b82f6', WebkitTextFillColor: '#3b82f6', background: 'none' }}
            initial={{ clipPath: 'inset(10% 0 30% 0)', x: -2 }}
            animate={{ clipPath: ['inset(40% 0 45% 0)', 'inset(10% 0 80% 0)', 'inset(50% 0 10% 0)'] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {displayText}
          </motion.span>
          <motion.span
            className={`absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none select-none ${className}`}
            style={{ color: '#f43f5e', WebkitTextFillColor: '#f43f5e', background: 'none' }}
            initial={{ clipPath: 'inset(80% 0 5% 0)', x: 2 }}
            animate={{ clipPath: ['inset(10% 0 60% 0)', 'inset(70% 0 20% 0)', 'inset(30% 0 50% 0)'] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {displayText}
          </motion.span>
        </>
      )}
    </div>
  );
}
