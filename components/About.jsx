"use client";

import { motion } from "framer-motion";

const STATS = [
  { n: "01", label: "NYU Tandon", detail: "CS + Mechanical Engineering" },
  { n: "02", label: "6× Hackathon Wins", detail: "Full-stack + AI agents under deadline" },
  { n: "03", label: "Growth-minded", detail: "500K+ views, 15 businesses onboarded (Tarjam)" },
  { n: "04", label: "Founder-track", detail: "Building toward a robotics company" },
];

export default function About({ profile }) {
  return (
    <section id="about" className="border-t border-ink bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cadmium">02 — About</p>
          <h2 className="mt-4 font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[52px]">
            Specs
          </h2>
        </div>
        <div className="md:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl font-sans text-[17px] leading-relaxed text-ink"
          >
            {profile.focus}
          </motion.p>

          <div className="mt-10 divide-y divide-ink border-y border-ink">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4 sm:grid-cols-[4rem_1fr_1.4fr]"
              >
                <span className="font-mono text-[11px] text-cadmium">{s.n}</span>
                <p className="font-display text-[22px] font-bold uppercase leading-none tracking-tight text-ink">
                  {s.label}
                </p>
                <p className="col-span-2 font-sans text-[14px] text-mute sm:col-span-1 sm:text-right">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
