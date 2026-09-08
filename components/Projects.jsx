"use client";

import { motion } from "framer-motion";
import ProjectIcon from "./ProjectIcon";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6, rotateX: -4, rotateY: 4, scale: 1.02 }}
      style={{ transformPerspective: 900 }}
      className="group flex flex-col justify-between rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]"
    >
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-sf text-[17px] font-semibold tracking-tight text-slate-900">
            {project.name}
          </h3>
          <ProjectIcon kind={project.icon} />
        </div>
        <p className="mt-1.5 font-sf text-[13.5px] leading-relaxed text-slate-500">
          {project.oneLiner}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-slate-50 px-2.5 py-1 font-sf text-[11px] font-medium text-slate-500"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sf text-[13px] font-semibold text-sky-start transition-transform group-hover:translate-x-0.5"
          >
            View Repo <span aria-hidden>→</span>
          </a>
        ) : (
          <span className="font-sf text-[12.5px] font-medium text-slate-300">
            Private / internal repo
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="bg-slate-50/60 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-sf text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-start">
          Projects
        </p>
        <h2 className="mt-3 max-w-xl font-sf text-[28px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[32px]">
          Real things I've built — hardware, agents, and everything between.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
