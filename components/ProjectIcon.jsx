"use client";

import { motion } from "framer-motion";

const STROKE = "#e24a12";

const ICONS = {
  caption: (
    <>
      <rect x="4" y="8" width="24" height="16" stroke={STROKE} strokeWidth="1.8" />
      <motion.path
        d="M9 16h6M9 20h10"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </>
  ),
  hand: (
    <>
      <motion.g
        style={{ transformOrigin: "10px 24px" }}
        animate={{ rotate: [0, -14, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="10" y1="24" x2="10" y2="14" stroke={STROKE} strokeWidth="1.8" strokeLinecap="square" />
        <line x1="10" y1="14" x2="20" y2="10" stroke={STROKE} strokeWidth="1.8" strokeLinecap="square" />
        <rect x="18" y="8" width="4" height="4" stroke={STROKE} strokeWidth="1.6" />
      </motion.g>
      <rect x="8" y="22" width="4" height="4" stroke={STROKE} strokeWidth="1.6" />
    </>
  ),
  face: (
    <>
      <rect x="7" y="7" width="18" height="18" stroke={STROKE} strokeWidth="1.8" />
      <rect x="12" y="14" width="2" height="2" fill={STROKE} />
      <rect x="18" y="14" width="2" height="2" fill={STROKE} />
      <path d="M12.5 19.5h7" stroke={STROKE} strokeWidth="1.6" />
      <motion.line
        x1="7"
        x2="25"
        stroke={STROKE}
        strokeWidth="1.4"
        initial={{ y1: 8, y2: 8, opacity: 0 }}
        animate={{ y1: [8, 24, 8], y2: [8, 24, 8], opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  ),
  agent: (
    <>
      <path d="M6 9h20v10H14l-5 4v-4H6V9Z" stroke={STROKE} strokeWidth="1.8" strokeLinejoin="miter" />
      <motion.rect x="12" y="13" width="2" height="2" fill={STROKE} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }} />
      <motion.rect x="16.5" y="13" width="2" height="2" fill={STROKE} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }} />
      <motion.rect x="21" y="13" width="2" height="2" fill={STROKE} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} />
    </>
  ),
  code: (
    <>
      <rect x="5" y="6" width="22" height="20" stroke={STROKE} strokeWidth="1.8" />
      <motion.path
        d="M10 13l4 3-4 3"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        animate={{ x: [0, 1.5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <line x1="17" y1="19" x2="22" y2="19" stroke={STROKE} strokeWidth="1.8" />
    </>
  ),
  game: (
    <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M9 13h5m-2.5-2.5v5M20 13.5h.01M23 16.5h.01" stroke={STROKE} strokeWidth="1.8" strokeLinecap="square" />
      <path
        d="M8 13h16v8H22l-1.4-2.5H11.4L10 21H8V13Z"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinejoin="miter"
      />
    </motion.g>
  ),
  python: (
    <>
      <motion.path
        d="M6 22c3 0 3-4 6-4s3 4 6 4 3-8 6-8 3 4 6 4"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="square"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <rect x="22.5" y="8.5" width="3" height="3" fill={STROKE} />
    </>
  ),
};

export default function ProjectIcon({ kind = "agent" }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center border border-ink bg-paper">
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        {ICONS[kind] ?? ICONS.agent}
      </svg>
    </div>
  );
}
