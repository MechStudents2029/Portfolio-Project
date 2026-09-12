"use client";

import { motion } from "framer-motion";

export default function Contact({ profile, socials }) {
  return (
    <section id="contact" className="relative border-t border-ink bg-paper">
      <div className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-cadmium font-display text-[28px] font-extrabold leading-none text-paper">
                04
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cadmium">Sheet 04 · Dispatch</p>
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                  className="mt-1 max-w-3xl font-display text-[52px] font-extrabold uppercase leading-[0.88] tracking-tight text-ink sm:text-[80px]"
                >
                  Send the drawing.
                </motion.h2>
              </div>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">DWG-04 · OPEN CHANNEL</p>
          </div>

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
              className="border-2 border-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-cadmium hover:text-cadmium"
            >
              LinkedIn
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-cadmium hover:text-cadmium"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t-2 border-ink sm:grid-cols-4">
        {[
          ["Drawn", profile.name],
          ["Material", "Steel / cadmium"],
          ["Scale", "1:1"],
          ["Year", String(new Date().getFullYear())],
        ].map(([k, v]) => (
          <div key={k} className="border-ink px-5 py-4 odd:border-r sm:border-r sm:last:border-r-0 sm:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cadmium">{k}</p>
            <p className="mt-1 font-display text-[18px] font-bold uppercase leading-none tracking-tight text-ink">
              {v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
