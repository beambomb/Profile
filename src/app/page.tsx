"use client";

import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-bg text-text relative selection:bg-accent/30 selection:text-text transition-colors duration-300">
      {/* Centered Expansive Container - Fully utilizes screen width matching Header max-w-7xl */}
      <main id="main" className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-6 sm:py-10">
        <Hero />
        <Projects />
        <EducationSection />
        <ExperienceSection />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}