import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@content";
import { CaseStudy } from "@/components/sections/CaseStudy";

type Params = { slug: string };

// Unknown slugs return 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Johannes De Deo Dimas Aryobimo`,
    description: project.oneLiner,
    openGraph: { title: project.title, description: project.oneLiner, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main">
      <CaseStudy
        project={project}
        prev={{ slug: prev.slug, title: prev.title }}
        next={{ slug: next.slug, title: next.title }}
      />
    </main>
  );
}
