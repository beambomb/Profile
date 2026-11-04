"use client";

import { projectDomains, projects } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { CrownDoodle } from "@/components/ui/CrownDoodle";
import { ProjectsGrid } from "./ProjectsGrid";

export function Projects() {
  const { lang } = useLanguage();
  const domains = projectDomains.filter((d) => projects.some((p) => p.domain === d));

  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-neutral-900">
      {/* Header Eyebrow */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
        {lang === "EN" ? "PROJECTS" : "PROYEK"}
      </p>

      {/* Cursive Handwriting Annotation */}
      <div className="mb-1">
        <span className="font-handwriting text-2xl sm:text-3xl text-blue-500 font-bold -rotate-1 inline-block">
          {lang === "EN" ? "crafting digital experiences" : "membangun pengalaman digital"}
        </span>
      </div>

      {/* Title & Crown Doodle */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === "EN" ? "Featured Projects" : "Proyek Unggulan"}
        </h2>
        <CrownDoodle className="w-14 h-11 inline-block ml-2 -mt-2" />
      </div>

      {/* Projects List with Accordion */}
      <ProjectsGrid projects={projects} domains={domains} />
    </section>
  );
}
