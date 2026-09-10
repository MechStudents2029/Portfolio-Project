"use client";

import { motion } from "framer-motion";

export default function Hackathons({ hackathons }) {
  return (
    <section id="hackathons" className="border-t border-ink bg-ink px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cadmium">03 — Hackathons</p>
        <h2 className="mt-3 max-w-xl font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-paper sm:text-[52px]">
          Six wins, built under deadline.
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-px bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
          {hackathons.map((h, i) => (
            <motion.li
              key={h.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col justify-between bg-ink p-5"
            >
              <div>
                <p className="font-mono text-[11px] text-cadmium">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-[22px] font-bold uppercase leading-[0.95] tracking-tight text-paper">
                  {h.name}
                </p>
                <p className="mt-3 font-sans text-[13px] leading-relaxed text-paper/55">{h.detail}</p>
              </div>
              {h.link && (
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-cadmium underline underline-offset-4"
                >
                  Open repo
                </a>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
