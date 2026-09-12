"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#projects", label: "01 Projects" },
  { href: "#about", label: "02 About" },
  { href: "#hackathons", label: "03 Hackathons" },
  { href: "#contact", label: "04 Contact" },
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
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-3 transition-colors duration-200 sm:px-8 ${
        scrolled ? "border-b border-ink bg-paper" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#top"
        className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] ${
          scrolled ? "text-ink" : "text-paper"
        }`}
      >
        <span className="h-3 w-1.5 bg-cadmium" aria-hidden />
        {name} / DWG-01
      </a>
      <div className="hidden items-center gap-6 sm:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              scrolled ? "text-ink/70 hover:text-cadmium" : "text-paper/70 hover:text-cadmium"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className={`font-mono text-[11px] uppercase tracking-[0.14em] sm:hidden ${
          scrolled ? "text-ink" : "text-paper"
        }`}
      >
        04 Contact
      </a>
    </nav>
  );
}
