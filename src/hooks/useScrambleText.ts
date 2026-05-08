import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrambleText(
  text: string,
  options?: { duration?: number; delay?: number; chars?: string }
): { displayText: string; isComplete: boolean } {
  const {
    duration = 600,
    delay = 0,
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*',
  } = options || {};

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const scramble = useCallback(() => {
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const resolved = Math.floor(progress * text.length);
      let result = '';

      for (let i = 0; i < text.length; i++) {
        if (i < resolved) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [text, duration, chars]);

  useEffect(() => {
    const timeout = setTimeout(scramble, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [scramble, delay]);

  return { displayText, isComplete };
}
