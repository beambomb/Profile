import { projectDomains, projects } from "@content";
import { Section } from "@/components/ui/Section";
import { ProjectsGrid } from "./ProjectsGrid";

export function Projects() {
  // Only offer filters for areas that actually have projects.
  const domains = projectDomains.filter((d) => projects.some((p) => p.domain === d));

  return (
    <Section
      id="projects"
      eyebrow="Select your project"
      title="Projects"
      intro="Pick a project to read what problem it solves, how it works, and what I built."
    >
      <ProjectsGrid projects={projects} domains={domains} />
    </Section>
  );
}
