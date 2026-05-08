import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Scalable Dense Passage Retrieval System',
    description:
      'Achieved 50x memory compression (4.6MB vs 230.7MB) while maintaining 15ms query latency. High-performance RAG on commodity hardware.',
    imageSrc: '/projects/project-1.jpg',
    imageAlt: 'Dense passage retrieval system architecture',
    tags: ['PyTorch', 'Vector Quantization', 'RAG', 'Python'],
    dominantColor: '#3b82f6',
    cta: { text: 'View Project', href: '#' },
  },
  {
    id: 'project-2',
    title: 'AI-Powered Data Quality Platform',
    description:
      'AI diagnostic engine with LLM-generated treatment plans. Non-blocking data processing with Celery and Redis for instantaneous analytics.',
    imageSrc: '/projects/project-2.jpg',
    imageAlt: 'AI data quality platform dashboard',
    tags: ['Celery', 'Redis', 'AG Grid', 'React'],
    dominantColor: '#8b5cf6',
    cta: { text: 'View Project', href: '#' },
  },
  {
    id: 'project-3',
    title: 'BioVisuals — Molecular Structure',
    description:
      'Interactive 3D molecular visualization with LLM-generated biological annotations for protein-ligand structures.',
    imageSrc: '/projects/project-3.jpg',
    imageAlt: '3D molecular visualization tool',
    tags: ['py3Dmol', 'RDKit', 'Plotly', 'LLM'],
    dominantColor: '#10b981',
    cta: { text: 'View Project', href: '#' },
  },
];
