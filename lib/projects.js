// Edit this file to update what the chatbot knows about you.
// Add real repo/demo links as you get them.

export const PROFILE = {
  name: "Adam",
  tagline: "CUNY TO NYU. Growth @ CLUELY, INTERNINSIDER, KNOWUNITY. 10+ MILLION VIEWS. +20,000 USERS BROUGHT IN.",
  focus:
    "The engineer who understands Growth — a founder-track builder aiming toward a robotics company, who thinks as much about getting a product in front of real users as about the code underneath it.",
};

export const SOCIALS = {
  email: "arouzaqui3@gmail.com",
  github: "https://github.com/MechStudents2029",
  linkedin: "https://www.linkedin.com/in/adam-rouzaqui-3bba63391/",
};

export const PROJECTS = [
  {
    name: "Tarjam AI",
    oneLiner: "Real-time captioning & translation platform (interned as fullstack dev).",
    details:
      "Worked across three repos (app, API, agent). Shipped an OBS-compatible live caption overlay under deadline, fixed a dual-language caption gating bug and a QR contrast issue, and evaluated Google's gemini-live-translate-livekit architecture for bot-as-subscriber / per-room dispatch patterns.",
    stack: ["React", "FastAPI", "LiveKit", "OBS", "Git branch/PR workflow"],
    link: "",
    icon: "caption",
  },
  {
    name: "Gesture-Controlled Robotic Arm",
    oneLiner: "Webcam hand-tracking that drives a physical robotic arm in real time.",
    details:
      "Uses MediaPipe + OpenCV to track hand landmarks from a webcam, computes per-finger joint angles, and streams them over serial to an Arduino Mega 2560 driving servos on a Lego-style arm rig. Split into Backend (vision/serial) and Frontend, no Raspberry Pi in the loop — just laptop-to-Arduino over serial.",
    stack: ["Python", "OpenCV", "MediaPipe", "Arduino Mega 2560", "Serial comms"],
    link: "https://github.com/MechStudents2029/Hardware-project",
    icon: "hand",
  },
  {
    name: "Face Clock",
    oneLiner: "Always-on room camera that recognizes faces and logs attendance automatically.",
    details:
      "Walk in, get recognized, show up on a live \"who's in the room\" board, session logged — no punch button. FastAPI + OpenCV (YuNet detection, SFace recognition) backend with a React + Vite + TypeScript frontend, Postgres for storage, shipped via Docker Compose with CI. Stores face embeddings and event metadata only, no raw video, and includes a doorway ROI filter plus an admin enroll flow.",
    stack: ["React", "Vite", "TypeScript", "FastAPI", "OpenCV", "Postgres", "Docker"],
    link: "https://github.com/MechStudents2029/FaceClock",
    icon: "face",
  },
  {
    name: "Northstar",
    oneLiner: "A full-stack AI agent that acts as a personalized mentor.",
    details:
      "Multiple conversation modes, persistent memory via Supabase, FastAPI backend, React frontend. Includes a custom system-prompt design so the agent behaves like a consistent personal mentor across sessions.",
    stack: ["React", "FastAPI", "Supabase"],
    link: "",
    icon: "agent",
  },
  {
    name: "Roast My Code",
    oneLiner: "A Claude-API app that roasts your code (and tells you what's actually wrong with it).",
    details: "Built directly on the Claude API as a fun, shareable dev tool.",
    stack: ["Claude API", "Full-stack"],
    link: "",
    icon: "code",
  },
  {
    name: "Prompt Fighters",
    oneLiner: "Write a fight prompt, watch it battle in a live 3D arena — built for a SpacetimeDB hackathon.",
    details:
      "Players describe a fighter and combat strategy in plain language; the app converts that into a structured fighter policy (validated with Zod), then a deterministic reducer-style simulation runs the match in real-time 250ms ticks inside a React Three Fiber arena — rigged 3D fighters, weapons, blocks, and special effects included. A default \"Stone Ogre\" opponent runs an aggressive, high-risk policy. Built for the SpacetimeDB Launchpad Hackathon at NYC Tech Week, with a SpacetimeDB module blueprint for the authoritative multiplayer backend.",
    stack: ["React Three Fiber", "TypeScript", "Vite", "Zod", "SpacetimeDB"],
    link: "https://github.com/MechStudents2029/StickArena",
    icon: "game",
  },
  {
    name: "Adaptive Agent",
    oneLiner: "An AI agent that shifts modes and gets smarter the more you talk to it.",
    details:
      "Instead of starting fresh every session, it builds on past conversations and switches between Study Mode (breaks down concepts, quizzes you), Code Mode (focused pair programmer), and Late Night Talk Mode (casual, reflective sounding board). React frontend, FastAPI backend, powered by Claude.",
    stack: ["React", "FastAPI", "Claude API"],
    link: "https://github.com/MechStudents2029/Manually-coding",
    icon: "agent",
  },
  {
    name: "PyQuest",
    oneLiner: "A gamified, browser-only Python course — 30 days of quests, boss battles, and XP.",
    details:
      "Built on the '30 Days of Python' curriculum. Learners write real Python in an in-browser CodeMirror editor, run it against hidden tests through a Pyodide runtime in a Web Worker (so learner code can't block the UI), and unlock the next quest on a pass. Tracks XP, levels, and streaks with local persistence, no server, and a boss battle every fifth day. Failures show actual-vs-expected values and real Python tracebacks as teaching material, not just pass/fail.",
    stack: ["React", "TypeScript", "Vite", "Pyodide (WASM)", "CodeMirror 6", "Vitest"],
    link: "https://github.com/MechStudents2029/pyquest",
    icon: "python",
  },
];

export const HACKATHONS = [
  {
    name: "Agent Zero — GIDE Hackathon (Winner)",
    detail: "An encrypted secrets vault built in a single hackathon.",
  },
  {
    name: "LLM Fighter — SpacetimeDB Launchpad Hackathon (NYC Tech Week)",
    detail: "A real-time fighting game where Claude and ChatGPT battle it out.",
    link: "https://github.com/MechStudents2029/StickArena",
  },
  {
    name: "Excuse Court — bash.tv Hackathon",
    detail: "A multiplayer AI-judge web app.",
  },
  { name: "+3 more hackathon wins", detail: "Six total hackathon wins to date." },
];

export function buildSystemPrompt() {
  return `You are an AI version of ${PROFILE.name}, giving visitors a fun, punchy tour of his portfolio.
Tone: confident, casual, a little witty — like a smart builder talking about their own work, not a corporate bio. Keep answers SHORT (2-5 sentences) unless asked to go deep. Never invent projects, numbers, or facts that aren't listed below. If asked something you don't know, say so honestly and redirect to what you do know.

ABOUT: ${PROFILE.tagline} ${PROFILE.focus}
GROWTH (not a project list): Growth @ CLUELY, INTERNINSIDER, KNOWUNITY. 10+ MILLION VIEWS. +20,000 USERS BROUGHT IN. Academic path: CUNY TO NYU. Do not say NYU Tandon. Do not claim 500K views or 15 businesses onboarded.

PROJECTS:
${PROJECTS.map(
  (p) =>
    `- ${p.name}: ${p.oneLiner} Details: ${p.details} Stack: ${p.stack.join(", ")}.`
).join("\n")}

HACKATHONS:
${HACKATHONS.map((h) => `- ${h.name}: ${h.detail}`).join("\n")}

If asked "what should I look at first" or similar, recommend Tarjam (real traction, real users) and the Gesture-Controlled Robotic Arm (most visually impressive, hardware + software).
If asked about contact/hiring, say to use the contact link/email on the site (you don't have live contact info yourself).`;
}
