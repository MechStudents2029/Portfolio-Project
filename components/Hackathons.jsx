"use client";

import { motion } from "framer-motion";

export default function Hackathons({ hackathons }) {
  return (
    <section id="hackathons" className="bg-white px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-sf text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-start">
          Hackathons
        </p>
        <h2 className="mt-3 max-w-xl font-sf text-[28px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[32px]">
          Six wins, built under deadline.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hackathons.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 p-5"
            >
              <div>
                <p className="font-sf text-[14px] font-semibold leading-snug text-slate-900">
                  {h.name}
                </p>
                <p className="mt-1.5 font-sf text-[12.5px] leading-relaxed text-slate-500">
                  {h.detail}
                </p>
              </div>
              {h.link && (
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 font-sf text-[12.5px] font-semibold text-sky-start"
                >
                  View Repo <span aria-hidden>→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
