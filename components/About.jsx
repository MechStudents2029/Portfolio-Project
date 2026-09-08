"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "NYU Tandon", detail: "CS + Mechanical Engineering" },
  { label: "6× Hackathon Wins", detail: "Full-stack + AI agents under deadline" },
  { label: "Growth-Minded", detail: "500K+ views, 15 businesses onboarded (Tarjam)" },
  { label: "Founder-track", detail: "Building toward a robotics company" },
];

export default function About({ profile }) {
  return (
    <section id="about" className="bg-white px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-sf text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-start"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 max-w-2xl font-sf text-[28px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[32px]"
        >
          {profile.focus}
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <p className="font-sf text-[15px] font-semibold text-slate-900">{s.label}</p>
              <p className="mt-1 font-sf text-[13px] text-slate-500">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
