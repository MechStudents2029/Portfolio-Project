# 3D Portfolio Redesign — Design

## Goal

Replace the current single-page terminal-chatbot UI with a full iOS-clean portfolio
site (hero, about, projects, hackathons, contact) featuring a WebGL 3D hero
centerpiece, with the existing chatbot demoted to a floating widget. Remove the
generic "AI app" look (monospace terminal theme) and connect real GitHub project
links pulled from github.com/MechStudents2029.

## Stack additions

- `@react-three/fiber` + `@react-three/drei` — WebGL hero scene
- `framer-motion` — scroll reveals, widget expand/collapse, hover interactions
- `tailwindcss` — layout system for the new design
- No new backend dependencies; `app/api/chat/route.js` is unchanged

## Visual system

- **Font**: system SF Pro stack — `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif`
- **Color**: "Sky" gradient `#2b6fff → #46c2ff → #8ee8ff`, used as an accent
  (hero backdrop, CTAs, chatbot widget), not painted across every section.
  Rest of the page: white/near-white surfaces in light sections, deep navy
  (`#05070d`) behind the 3D hero.
- **Depth**: frosted-glass panels (`backdrop-filter: blur`) and soft layered
  shadows instead of uniform 1px-bordered boxes.
- **Corners**: 14–20px rounding, not pill-everything.
- **Spacing**: generous section padding, marketing-page pacing.

## 3D hero

Procedural geometry (capsule/cylinder finger-joint segments), not an imported
model file — avoids licensing entirely, stays lightweight, fully controllable.
`MeshPhysicalMaterial`/`MeshTransmissionMaterial` (drei) for a frosted-glass
look; `Environment` for reflections. Idle animation: slow rotation + subtle
finger-curl loop; reacts to mouse position (parallax rotation). Canvas is
dynamically imported with `ssr: false` and a lightweight fallback/loading
state; reduced detail on small viewports for performance.

## Page structure (single-page scroll)

1. **Nav** — fixed, transparent → frosted-glass on scroll; name + anchor links
   (Projects, About, Hackathons, Contact)
2. **Hero** — full viewport; 3D hand centerpiece, headline, tagline (from
   `PROFILE`), CTA buttons ("View Projects", "Ask the AI version of me" →
   opens chat widget)
3. **About** — bio from `PROFILE.tagline` / `PROFILE.focus`, stat chips
4. **Projects** — grid of glass cards: name, one-liner, stack tags, "View
   Repo →" link (only rendered when a real link exists)
5. **Hackathons** — compact row/list of achievement cards
6. **Contact/Footer** — email (`arouzaqui3@gmail.com`, mailto) + LinkedIn
   (`https://www.linkedin.com/in/adam-rouzaqui-3bba63391/` — dropped a stray
   `/55` suffix from the provided URL as a likely paste artifact; flagging
   for the user to double check)
7. **Chatbot widget** — floating glass bubble, bottom-right, persists across
   all sections; expands into the existing chat panel (reuses
   `app/api/chat/route.js` and message logic from current `app/page.js`
   unchanged, just restyled)

## Project data (final mapping)

Sourced from `https://github.com/MechStudents2029` (8 public repos audited).

| Project card | Link | Notes |
|---|---|---|
| Tarjam AI | *(none)* | Internship, repos are private |
| Gesture-Controlled Robotic Arm | `Hardware-project` | Merged the old "Hand" + "Arm" entries — one real repo (MediaPipe + OpenCV + Arduino Mega 2560, Backend/Frontend dirs) |
| Face Clock | `FaceClock` | Description rewritten from actual README — "FaceClock Room HQ": always-on presence/attendance system, React+Vite+TS frontend, FastAPI+OpenCV (YuNet+SFace) backend, Postgres, Docker Compose. Replaces outdated AWS EC2 description. |
| Northstar | *(none)* | Repo exists but is empty on GitHub — kept as text-only entry with existing description |
| Roast My Code | *(none)* | No matching public repo |
| Prompt Fighters (StickArena) | `StickArena` | New card. React Three Fiber 3D arena; natural-language prompt → structured fighter policy via LLM; deterministic reducer-based combat sim; SpacetimeDB multiplayer backend (planned/partial). Built for the SpacetimeDB Launchpad Hackathon (NYC Tech Week) — same event as the existing "LLM Fighter" hackathon entry. |
| Adaptive Agent (Manually-coding) | `Manually-coding` | New card. Claude-powered agent with Study Mode / Code Mode / Late Night Talk Mode, React + FastAPI, persists conversation history. |

Dropped from consideration: `adam-rouzaqui-website` (earlier unrelated
portfolio attempt, not reused per decision), `Project-practice` (trivial
practice repo), `Agent-Track` (empty repo, no code to describe).

## Testing / verification

- `npm run build` must succeed
- Manually exercise: hero 3D renders and responds to mouse, all project
  "View Repo" links resolve to the correct GitHub URLs, chatbot widget opens
  and still round-trips through `/api/chat`, responsive check at mobile width
  (3D degrades gracefully, nav collapses)
