"use client";

import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CompetitionsSection } from "@/components/sections/CompetitionsSection";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-bg text-text relative selection:bg-accent/30 selection:text-text transition-colors duration-300">
      {/* Centered Single-Column Container */}
      <main id="main" className="mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 py-6 sm:py-10">
        <Hero />
        <Projects />
        <EducationSection />
        <ExperienceSection />
        <CompetitionsSection />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}