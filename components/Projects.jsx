"use client";

import { motion } from "framer-motion";
import ProjectIcon from "./ProjectIcon";

function ProjectRow({ project, index }) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.04 }}
      className="group grid grid-cols-[auto_1fr] gap-4 border-b border-ink py-6 sm:grid-cols-[3.5rem_auto_1fr_auto] sm:items-start sm:gap-6"
    >
      <span className="font-mono text-[11px] text-cadmium">{n}</span>
      <div className="hidden sm:block">
        <ProjectIcon kind={project.icon} />
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[26px] font-bold uppercase leading-none tracking-tight text-ink">
            {project.name}
          </h3>
          <div className="sm:hidden">
            <ProjectIcon kind={project.icon} />
          </div>
        </div>
        <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-mute">{project.oneLiner}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">
          {project.stack.join("  ·  ")}
        </p>
      </div>
      <div className="col-span-2 self-center sm:col-span-1 sm:pt-1">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink underline decoration-cadmium decoration-2 underline-offset-4 transition-colors group-hover:text-cadmium"
          >
            Open repo
          </a>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/30">Private</span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="border-t border-ink bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cadmium">01 — Projects</p>
            <h2 className="mt-3 max-w-lg font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[52px]">
              Hardware, agents, and the bits between.
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {String(projects.length).padStart(2, "0")} entries
          </p>
        </div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
