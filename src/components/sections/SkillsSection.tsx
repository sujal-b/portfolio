import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SkillCategory {
  title: string;
  accent: string;
  dotColor: string;
  glowColor: string;
  borderColor: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: 'ML / AI',
    accent: 'text-blue-400',
    dotColor: 'bg-blue-500',
    glowColor: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]',
    borderColor: 'border-blue-500/50',
    skills: ['PyTorch', 'Scikit-learn', 'Vector Quantization', 'RAG', 'MLOps', 'CI/CD'],
  },
  {
    title: 'Data & Analytics',
    accent: 'text-emerald-400',
    dotColor: 'bg-emerald-500',
    glowColor: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
    borderColor: 'border-emerald-500/50',
    skills: ['Pandas', 'NumPy', 'SQL', 'Tableau', 'Forecasting', 'Statistical Analysis'],
  },
  {
    title: 'Infrastructure',
    accent: 'text-amber-400',
    dotColor: 'bg-amber-500',
    glowColor: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
    borderColor: 'border-amber-500/50',
    skills: ['Docker', 'Celery', 'Redis', 'Azure', 'FastAPI', 'Git', 'OCI', 'OpenCV'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SplitHeading
          text="Skills & Technologies"
          className="text-4xl font-bold text-white md:text-5xl mb-16"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((cat) => (
            <SkillColumn key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillColumn({ category }: { category: SkillCategory }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2.5 h-2.5 rounded-full ${category.dotColor}`} />
        <h3 className={`text-lg font-semibold ${category.accent}`}>
          {category.title}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1 }
                : prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 15,
              delay: prefersReducedMotion ? 0 : i * 0.04,
            }}
            data-cursor="pointer"
            className={`px-4 py-2 rounded-full text-sm bg-white/[0.04] backdrop-blur-sm border border-white/[0.09] text-white/80 hover:${category.borderColor} hover:${category.glowColor} transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue`}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
