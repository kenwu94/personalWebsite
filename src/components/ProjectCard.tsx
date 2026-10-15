"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/content";
import { FadeUp } from "./Reveal";
import ProjectArt from "./ProjectArt";

/** Large image-led card. The artwork is generative (no assets needed) and reacts to hover. */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [a, b] = project.hue;
  return (
    <FadeUp>
      <motion.article whileHover="hover" initial="rest" animate="rest" data-cursor={project.href ? "GitHub" : undefined} className="group relative">
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`} className="absolute inset-0 z-10" />
        )}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ background: b }}>
          <motion.div
            className="absolute -inset-[20%]"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${a} 0%, transparent 45%), radial-gradient(circle at 75% 70%, ${a}66 0%, transparent 40%)`,
            }}
            variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.15, rotate: 6 } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute right-4 top-4 aspect-[10/7] w-[48%] rounded-xl border border-white/10 bg-black/55 p-3 backdrop-blur-md md:right-6 md:top-6 md:p-5"
            variants={{ rest: { y: 0 }, hover: { y: -8 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectArt slug={project.slug} color={a} />
          </motion.div>
          <span className="display absolute left-6 top-4 text-[10rem] leading-none text-black/20 md:text-[14rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="meta rounded-full bg-black/55 px-3 py-1.5 text-white backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="display text-4xl md:text-5xl">
              {project.title}
              {project.href && <span className="serif-accent ml-3 text-accent">↗</span>}
            </h3>
            <p className="mt-3 max-w-xl text-muted">{project.summary}</p>
          </div>
          <span className="meta mt-2 shrink-0 text-muted">{project.period}</span>
        </div>
      </motion.article>
    </FadeUp>
  );
}
