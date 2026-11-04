"use client";

import { LanguageProvider } from "@/lib/languageContext";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col lg:flex-row relative selection:bg-blue-600/30 selection:text-white">
        {/* Left Sidebar (Desktop Fixed / Sticky, Mobile Top) */}
        <ProfileSidebar />

        {/* Right Main Scrollable Content */}
        <main id="main" className="flex-1 max-w-4xl px-6 py-8 sm:px-10 lg:px-14 lg:py-10 min-w-0">
          {/* Top Bar with Language Switcher */}
          <div className="flex justify-end items-center mb-4 sm:mb-6">
            <LanguageToggle />
          </div>

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
    </LanguageProvider>
  );
}
