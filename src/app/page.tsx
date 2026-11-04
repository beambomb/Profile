"use client";

import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col lg:flex-row relative selection:bg-accent/30 selection:text-text transition-colors duration-300">
      {/* Left Sidebar (Desktop Fixed / Sticky, Mobile Top) */}
      <ProfileSidebar />

      {/* Right Main Scrollable Content */}
      <main id="main" className="flex-1 max-w-4xl px-6 sm:px-10 lg:px-12 py-4 sm:py-6 lg:py-7 min-w-0">
        {/* Page Sections */}
        <Hero />
        <Projects />
        <EducationSection />
        <ExperienceSection />
        <Certificates />
        <Contact />
      </main>

      {/* Floating Bottom Navigation Dock */}
      <FloatingDock />
    </div>
  );
}
