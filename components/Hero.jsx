"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const RoboticHandScene = dynamic(() => import("./RoboticHandScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 border border-cadmium/60" />
    </div>
  ),
});

export default function Hero({ profile, onAskClick }) {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-mill pt-16">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-cadmium" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-stretch gap-6 px-5 py-10 sm:px-8 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col justify-center md:col-span-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cadmium">
            CUNY TO NYU
          </p>
          <h1 className="mt-5 font-display text-[56px] font-extrabold uppercase leading-[0.86] tracking-tight text-paper sm:text-[84px]">
            the engineer who
            <br />
            understands
            <br />
            <span className="text-cadmium">Growth</span>
          </h1>
          <p className="mt-6 max-w-md border-l-2 border-cadmium pl-4 font-sans text-[15px] leading-relaxed text-paper/75">
            {profile.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="bg-cadmium px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              View Projects
            </a>
            <button
              onClick={onAskClick}
              className="border border-paper/30 px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:border-cadmium hover:text-cadmium"
            >
              Ask the AI version of me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative isolate h-[280px] overflow-hidden sm:h-[360px] md:col-span-6 md:h-auto md:min-h-[520px]"
        >
          <p className="pointer-events-none absolute right-0 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
            FIG. 01 — SERVO ARM · REV A
          </p>
          <RoboticHandScene />
        </motion.div>
      </div>
    </section>
  );
}
