import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SplitHeading from '../ui/SplitHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Detail {
  text: string;
}

interface Experience {
  role: string;
  company: string;
  date: string;
  dateColor: string;
  tags: string[];
  short: string;
  details: Detail[];
}

const experiences: Experience[] = [
  {
    role: 'AI/ML Lead',
    company: 'Google Developer Groups (GDG) — Amity University Mumbai',
    date: 'Oct 2025 – Present',
    dateColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    tags: ['AI/ML', 'Leadership', 'Curriculum', 'Mentoring'],
    short:
      'Leading AI/ML vertical for GDG chapter, managing 250+ students across 3 offline events.',
    details: [
      {
        text: 'Designed and delivered curriculum covering ML, GenAI, Data Science, and industrial techniques',
      },
      {
        text: 'Managed 250+ students across 3 offline on-campus events — workshops on ML algorithms, data manipulation, and GenAI tool usage',
      },
      {
        text: 'Mentored project teams building ML-powered applications; reviewed models for accuracy, fairness, and deployment readiness',
      },
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Arista Systems Pvt. Ltd.',
    date: 'Jun 2025 – Aug 2025',
    dateColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    tags: ['Python', 'SQL', 'Tableau', 'Prophet'],
    short:
      'Built filter-based analytics platform and time-series forecasting model achieving 82.6% accuracy.',
    details: [
      {
        text: 'Built a filter-based analytics platform for real-time insight generation across multi-source data pipelines using Python & SQL',
      },
      {
        text: 'Engineered a time-series forecasting model with Facebook Prophet for e-commerce sales prediction, achieving 82.6% accuracy',
      },
      {
        text: 'Automated routine data pulls & reporting workflows, reducing manual report preparation time by ~30%',
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  AI: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  ML: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Leadership: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Curriculum: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Mentoring: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Python: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  SQL: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Tableau: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  Prophet: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

function getTagColor(tag: string) {
  return tagColors[tag] ?? 'bg-white/10 text-white/70 border-white/20';
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-4 md:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SplitHeading
          text="Where I've Worked"
          className="text-4xl font-bold text-white md:text-5xl mb-16"
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, #3b82f6, #a855f7, transparent)',
                scaleY: prefersReducedMotion ? 1 : scaleY,
              }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.role} experience={exp} index={i} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ experience, index, prefersReducedMotion }: { experience: Experience; index: number; prefersReducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <motion.div
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
        animate={isInView ? { scale: 1 } : prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: prefersReducedMotion ? 0 : 0.2 }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-10 w-4 h-4 rounded-full bg-blue-500 border-2 border-base"
      />

      {/* Card */}
      <motion.div
        initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: isLeft ? -60 : 60, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : prefersReducedMotion ? { x: 0, opacity: 1 } : { x: isLeft ? -60 : 60, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.1 }}
        className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? 'md:pr-8' : 'md:pl-8'
        }`}
      >
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.09] rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-colors">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white">{experience.role}</h3>
              <p className="text-sm text-text-secondary mt-1">{experience.company}</p>
            </div>
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full border whitespace-nowrap ${experience.dateColor}`}
            >
              {experience.date}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-3 py-1 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Short description */}
          <p className="text-sm text-text-secondary mt-4 leading-relaxed">
            {experience.short}
          </p>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-4 space-y-2 overflow-hidden"
              >
                {experience.details.map((d, j) => (
                  <li
                    key={j}
                    className="text-sm text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500/50"
                  >
                    {d.text}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Show more */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
