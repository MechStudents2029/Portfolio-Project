"use client";

import { motion } from "framer-motion";

const GRADIENT_ID = "project-icon-gradient";

function Gradient() {
  return (
    <defs>
      <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2b6fff" />
        <stop offset="55%" stopColor="#46c2ff" />
        <stop offset="100%" stopColor="#8ee8ff" />
      </linearGradient>
    </defs>
  );
}

const STROKE = `url(#${GRADIENT_ID})`;

const ICONS = {
  // Tarjam AI — live captions / translation
  caption: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <rect x="4" y="8" width="24" height="16" rx="4" stroke={STROKE} strokeWidth="1.8" />
      <motion.path
        d="M9 16h6M9 20h10"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  ),
  // Robotic arm
  hand: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <motion.g
        style={{ transformOrigin: "10px 24px" }}
        animate={{ rotate: [0, -14, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="10" y1="24" x2="10" y2="14" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="10" y1="14" x2="20" y2="10" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="10" r="2.2" stroke={STROKE} strokeWidth="1.6" />
      </motion.g>
      <circle cx="10" cy="24" r="2.4" stroke={STROKE} strokeWidth="1.6" />
    </svg>
  ),
  // Face Clock — scanning face
  face: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <rect x="7" y="7" width="18" height="18" rx="5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="13" cy="15" r="1.4" fill="#46c2ff" />
      <circle cx="19" cy="15" r="1.4" fill="#46c2ff" />
      <path d="M12.5 19.5c1 1 6 1 7 0" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <motion.line
        x1="7"
        x2="25"
        stroke="#8ee8ff"
        strokeWidth="1.6"
        initial={{ y1: 8, y2: 8, opacity: 0 }}
        animate={{ y1: [8, 24, 8], y2: [8, 24, 8], opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  ),
  // Personal agent / mentor — pulsing chat
  agent: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <path
        d="M6 10a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H14l-5 4v-4h-0a3 3 0 0 1-3-3v-8Z"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <motion.circle
        cx="13"
        cy="14"
        r="1.3"
        fill="#46c2ff"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="17.5"
        cy="14"
        r="1.3"
        fill="#46c2ff"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="22"
        cy="14"
        r="1.3"
        fill="#46c2ff"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
      />
    </svg>
  ),
  // Roast My Code — terminal spark
  code: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <rect x="5" y="6" width="22" height="20" rx="4" stroke={STROKE} strokeWidth="1.8" />
      <motion.path
        d="M10 13l4 3-4 3"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ x: 0 }}
        animate={{ x: [0, 1.5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <line x1="17" y1="19" x2="22" y2="19" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  // Prompt Fighters / game controller
  game: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <motion.g
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M9 13h5m-2.5-2.5v5M20 13.5h.01M23 16.5h.01"
          stroke={STROKE}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 13a4 4 0 0 0-4 4v3a3 3 0 0 0 3 3 3 3 0 0 0 2.6-1.5L11 19h10l1.4 2.5A3 3 0 0 0 25 23a3 3 0 0 0 3-3v-3a4 4 0 0 0-4-4H8Z"
          stroke={STROKE}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  ),
  // Python game — snake trail
  python: (
    <svg viewBox="0 0 32 32" fill="none">
      <Gradient />
      <motion.path
        d="M6 22c3 0 3-4 6-4s3 4 6 4 3-8 6-8 3 4 6 4"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <circle cx="24" cy="10" r="1.6" fill="#46c2ff" />
    </svg>
  ),
};

export default function ProjectIcon({ kind = "agent" }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-start/10 via-sky-mid/10 to-sky-end/10">
      <div className="h-6 w-6">{ICONS[kind] ?? ICONS.agent}</div>
    </div>
  );
}
