"use client";

import { motion } from "framer-motion";

export default function Contact({ profile, socials }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-sky-mid/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-sf text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-mid"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-sf text-[28px] font-bold leading-snug tracking-tight text-white sm:text-[34px]"
        >
          Let's build something.
        </motion.h2>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${socials.email}`}
            className="rounded-2xl bg-gradient-to-br from-sky-start via-sky-mid to-sky-end px-6 py-3 font-sf text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(43,111,255,0.35)] transition-transform hover:scale-[1.03]"
          >
            {socials.email}
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-sf text-[14px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            LinkedIn
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-sf text-[14px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>

        <p className="mt-16 font-sf text-[12px] text-white/35">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js + React Three Fiber.
        </p>
      </div>
    </section>
  );
}
