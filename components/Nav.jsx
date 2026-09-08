"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ name }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300 sm:px-10 ${
        scrolled
          ? "border-b border-black/5 bg-white/70 shadow-[0_1px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <a
        href="#top"
        className={`font-sf text-[15px] font-semibold tracking-tight transition-colors ${
          scrolled ? "text-slate-900" : "text-white"
        }`}
      >
        {name}
      </a>
      <div className="flex items-center gap-7">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`font-sf text-[13px] font-medium transition-colors ${
              scrolled ? "text-slate-600 hover:text-slate-900" : "text-white/75 hover:text-white"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
