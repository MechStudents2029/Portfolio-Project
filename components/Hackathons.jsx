"use client";

import { motion } from "framer-motion";

export default function Hackathons({ hackathons }) {
  return (
    <section id="hackathons" className="border-t border-ink bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-cadmium font-display text-[28px] font-extrabold leading-none text-paper">
              03
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cadmium">Sheet 03 · Field wins</p>
              <h2 className="mt-1 max-w-xl font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[52px]">
                Six wins, built under deadline.
              </h2>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">DWG-03 · INSPECTED</p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hackathons.map((h, i) => (
            <motion.li
              key={h.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative flex flex-col justify-between border-2 border-ink p-5"
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-b border-r border-cadmium" aria-hidden />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-l border-t border-cadmium" aria-hidden />
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[11px] text-cadmium">{String(i + 1).padStart(2, "0")}</p>
                  <span className="bg-ink px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper">
                    Win
                  </span>
                </div>
                <p className="mt-3 font-display text-[22px] font-bold uppercase leading-[0.95] tracking-tight text-ink">
                  {h.name}
                </p>
                <p className="mt-3 font-sans text-[13px] leading-relaxed text-mute">{h.detail}</p>
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
