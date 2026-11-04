"use client";

import { projectDomains, projects } from "@content";
import { ProjectsGrid } from "./ProjectsGrid";

export function Projects() {
  const domains = projectDomains.filter((d) => projects.some((p) => p.domain === d));

  return (
    <section id="projects" className="scroll-mt-20 py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Featured Projects
      </h2>

      {/* Projects List with Accordion */}
      <ProjectsGrid projects={projects} domains={domains} />
    </section>
  );
}
