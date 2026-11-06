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
    <div id="top" className="min-h-screen bg-bg text-text relative overflow-x-clip selection:bg-accent/30 selection:text-text transition-colors duration-300">
      {/* Centered Expansive Container: pt-0 ensures Lanyard anchors flush to the top header border */}
      <main id="main" className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pt-0 pb-10 sm:pb-14">
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