"use client";

import { useRef } from "react";
import { PROFILE, PROJECTS, HACKATHONS, SOCIALS } from "@/lib/projects";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const chatRef = useRef(null);

  return (
    <>
      <Nav name={PROFILE.name} />
      <main>
        <Hero profile={PROFILE} onAskClick={() => chatRef.current?.openWidget()} />
        <About profile={PROFILE} />
        <Projects projects={PROJECTS} />
        <Hackathons hackathons={HACKATHONS} />
        <Contact profile={PROFILE} socials={SOCIALS} />
      </main>
      <ChatWidget ref={chatRef} name={PROFILE.name} />
    </>
  );
}
