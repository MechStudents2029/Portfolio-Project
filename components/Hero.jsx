"use client";

import { motion } from "framer-motion";
import Hero3D from "./Hero3D";

export default function Hero({ profile, onAskClick }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink pt-24"
    >
      {/* soft gradient glows — accent only, not painted across the whole section */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-sky-start/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-sky-end/20 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-2 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          <p className="font-sf text-[13px] font-medium uppercase tracking-[0.14em] text-sky-mid">
            {profile.name} — Portfolio
          </p>
          <h1 className="mt-4 font-sf text-[40px] font-bold leading-[1.08] tracking-tight text-white sm:text-[52px]">
            Building robots that
            <br />
            see and move.
          </h1>
          <p className="mt-5 max-w-md font-sf text-[15px] leading-relaxed text-white/70">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-2xl bg-gradient-to-br from-sky-start via-sky-mid to-sky-end px-6 py-3 font-sf text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(43,111,255,0.35)] transition-transform hover:scale-[1.03]"
            >
              View Projects
            </a>
            <button
              onClick={onAskClick}
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-sf text-[14px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Ask the AI version of me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="order-1 h-[320px] sm:h-[420px] md:order-2 md:h-[520px]"
        >
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}
