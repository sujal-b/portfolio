import { useEffect, useRef, useCallback } from 'react';

interface Orb {
  color: string;
  size: number;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
  initialX: string;
  initialY: string;
}

const orbs: Orb[] = [
  { color: '#3b82f6', size: 700, opacity: 0.15, animationDuration: '10s', animationDelay: '0s', initialX: '10%', initialY: '20%' },
  { color: '#a855f7', size: 800, opacity: 0.14, animationDuration: '12s', animationDelay: '-2s', initialX: '60%', initialY: '10%' },
  { color: '#6366f1', size: 650, opacity: 0.12, animationDuration: '9s', animationDelay: '-4s', initialX: '30%', initialY: '60%' },
  { color: '#14b8a6', size: 600, opacity: 0.13, animationDuration: '11s', animationDelay: '-6s', initialX: '70%', initialY: '50%' },
  { color: '#f43f5e', size: 750, opacity: 0.16, animationDuration: '13s', animationDelay: '-8s', initialX: '20%', initialY: '80%' },
];

export default function AuroraMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let closestIdx = 0;
    let closestDist = Infinity;

    orbRefs.current.forEach((orb, i) => {
      if (!orb) return;
      const orbRect = orb.getBoundingClientRect();
      const orbX = orbRect.left + orbRect.width / 2 - rect.left;
      const orbY = orbRect.top + orbRect.height / 2 - rect.top;
      const dist = Math.hypot(mouseX - orbX, mouseY - orbY);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    const closestOrb = orbRefs.current[closestIdx];
    if (closestOrb) {
      const orbRect = closestOrb.getBoundingClientRect();
      const orbX = orbRect.left + orbRect.width / 2 - rect.left;
      const orbY = orbRect.top + orbRect.height / 2 - rect.top;
      const dx = (mouseX - orbX) * 0.1;
      const dy = (mouseY - orbY) * 0.1;
      closestOrb.style.setProperty('--tx', `${dx}px`);
      closestOrb.style.setProperty('--ty', `${dy}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el; }}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            filter: 'blur(120px)',
            opacity: orb.opacity,
            left: orb.initialX,
            top: orb.initialY,
            transform: 'translate(-50%, -50%)',
            '--tx': '0px',
            '--ty': '0px',
            animation: `float${i} ${orb.animationDuration} ease-in-out ${orb.animationDelay} infinite`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(0); } 50% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(-40px); } }
        @keyframes float1 { 0%, 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateX(0); } 50% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateX(30px) translateY(-20px); } }
        @keyframes float2 { 0%, 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(0); } 50% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(35px) translateX(-20px); } }
        @keyframes float3 { 0%, 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateX(0); } 50% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateX(-25px) translateY(15px); } }
        @keyframes float4 { 0%, 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(0); } 50% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) translateY(-30px) translateX(20px); } }
      `}</style>
    </div>
  );
}
