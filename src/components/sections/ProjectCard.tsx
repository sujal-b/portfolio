import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.5,
        delay: index * 0.05,
      }}
      className="group relative"
    >
      <div className="aspect-video relative overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${project.dominantColor || "#FF3333"}, #1A0000)`,
          }}
        >
          <span className="text-xl font-bold text-white/90 px-4 text-center">
            {project.title}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/0 transition-opacity duration-300 group-hover:opacity-40 group-hover:bg-black" />

        {!isTouchDevice && project.cta && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
            <a
              href={project.cta.href}
              className="rounded-lg bg-accent-red px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-red/80"
            >
              {project.cta.text}
            </a>
          </div>
        )}

        {isTouchDevice && project.cta && (
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={project.cta.href}
              className="rounded-lg bg-accent-red px-6 py-2 text-sm font-semibold text-white"
            >
              {project.cta.text}
            </a>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-[20px] font-bold text-white/90">{project.title}</h3>
        <p className="mt-1 text-[14px] text-white/60 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-red/10 border border-accent-red/20 px-3 py-1 text-[12px] text-accent-red/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
