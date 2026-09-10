"use client";

import { motion } from "framer-motion";

export default function Contact({ profile, socials }) {
  return (
    <section id="contact" className="relative border-t border-ink bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cadmium">04 — Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mt-4 max-w-3xl font-display text-[52px] font-extrabold uppercase leading-[0.88] tracking-tight text-ink sm:text-[80px]"
        >
          Send the drawing.
        </motion.h2>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${socials.email}`}
            className="bg-cadmium px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink"
          >
            {socials.email}
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-cadmium hover:text-cadmium"
          >
            LinkedIn
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-cadmium hover:text-cadmium"
          >
            GitHub
          </a>
        </div>

        <p className="mt-20 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          © {new Date().getFullYear()} {profile.name} · Next.js + React Three Fiber
        </p>
      </div>
    </section>
  );
}
