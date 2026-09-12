"use client";

import { motion } from "framer-motion";

const STATS = [
  { n: "01", label: "CUNY TO NYU", detail: "CS + Mechanical Engineering" },
  { n: "02", label: "6× Hackathon Wins", detail: "Full-stack + AI agents under deadline" },
  { n: "03", label: "Growth", detail: "Growth @ CLUELY, INTERNINSIDER, KNOWUNITY. 10+ MILLION VIEWS. +20,000 USERS BROUGHT IN" },
  { n: "04", label: "Founder-track", detail: "Building toward a robotics company" },
];

export default function About({ profile }) {
  return (
    <section id="about" className="border-t border-ink bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-cadmium font-display text-[28px] font-extrabold leading-none text-paper">
              02
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cadmium">Sheet 02 · Spec</p>
              <h2 className="mt-1 font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[52px]">
                Specs
              </h2>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            DWG-02 · REV A · SCALE 1:1
          </p>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="border border-ink p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cadmium">Unit note</p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="mt-3 font-sans text-[16px] leading-relaxed text-ink"
              >
                {profile.focus}
              </motion.p>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="border-y-2 border-ink">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="grid grid-cols-[auto_3rem_1fr] items-baseline gap-3 border-b border-ink py-4 last:border-b-0 sm:grid-cols-[auto_4rem_1fr_1.5fr]"
                >
                  <span className="h-6 w-1.5 bg-cadmium" aria-hidden />
                  <span className="font-mono text-[11px] text-cadmium">{s.n}</span>
                  <p className="font-display text-[22px] font-bold uppercase leading-none tracking-tight text-ink">
                    {s.label}
                  </p>
                  <p className="col-span-3 font-sans text-[14px] text-mute sm:col-span-1 sm:text-right">
                    {s.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
