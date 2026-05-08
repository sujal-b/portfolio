import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import TiltCard from '../ui/TiltCard';

interface Project {
  title: string;
  description: string;
  tags: string[];
  metrics: { label: string; color: string }[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'Scalable Dense Passage Retrieval System',
    description:
      'Achieved 50x memory compression (4.6MB vs 230.7MB) while maintaining 15ms query latency. High-performance RAG on commodity hardware.',
    tags: ['PyTorch', 'Vector Quantization', 'RAG', 'Python'],
    metrics: [
      { label: '50x Compression', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
      { label: '15ms Latency', color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
      { label: '61.5% Recall@10', color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
    ],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'AI-Powered Data Quality Platform',
    description:
      'AI diagnostic engine with LLM-generated treatment plans. Non-blocking data processing with Celery and Redis.',
    tags: ['Celery', 'Redis', 'AG Grid', 'React'],
    metrics: [
      { label: 'LLM-Powered', color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' },
      { label: 'Non-Blocking', color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
      { label: 'Real-Time', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    ],
    gradient: 'from-purple-500/20 to-rose-500/20',
  },
  {
    title: 'BioVisuals — Molecular Structure',
    description:
      'Interactive 3D molecular visualization with LLM-generated biological annotations for protein-ligand structures.',
    tags: ['py3Dmol', 'RDKit', 'Plotly', 'LLM'],
    metrics: [
      { label: '3D Visualization', color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
      { label: 'LLM Annotations', color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
      { label: 'Real-Time', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    ],
    gradient: 'from-emerald-500/20 to-blue-500/20',
  },
];

const tagColorMap: Record<string, string> = {
  PyTorch: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Vector Quantization': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  RAG: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Python: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Celery: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Redis: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'AG Grid': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  React: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  py3Dmol: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  RDKit: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Plotly: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  LLM: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

function getTagColor(tag: string) {
  return tagColorMap[tag] ?? 'bg-white/10 text-white/70 border-white/20';
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SplitHeading
          text="Featured Work"
          className="text-4xl font-bold text-white md:text-5xl mb-16"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      data-cursor="pointer"
    >
      <TiltCard>
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.09] rounded-2xl overflow-hidden hover:border-blue-500/20 transition-colors h-full flex flex-col">
          {/* Gradient area */}
          <div
            className={`relative aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
          >
            <h3 className="text-lg font-bold text-white text-center px-6">
              {project.title}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.metrics.map((m) => (
                <span
                  key={m.label}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${m.color}`}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-full border ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
