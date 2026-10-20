import { render, screen, within } from "@testing-library/react";
import { projects } from "@content";
import { CaseStudy } from "./CaseStudy";
import { generateStaticParams } from "@/app/projects/[slug]/page";

describe("CaseStudy", () => {
  const project = projects[2];
  const prev = projects[1];
  const next = projects[3];

  it("opens with the plain-language summary before technical details", () => {
    render(<CaseStudy project={project} prev={prev} next={next} />);
    const h1 = screen.getByRole("heading", { level: 1, name: project.title });
    expect(h1).toBeInTheDocument();
    expect(screen.getByText(project.oneLiner)).toBeInTheDocument();

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual(["The problem", "What I built", "The result", "My role", "Technical details"]);
  });

  it("renders the architecture as an ordered list of every step", () => {
    render(<CaseStudy project={project} prev={prev} next={next} />);
    const list = screen.getByRole("list", { name: /architecture/i });
    expect(within(list).getAllByRole("listitem")).toHaveLength(project.architecture.steps.length);
  });

  it("links to previous and next projects and back to the grid", () => {
    render(<CaseStudy project={project} prev={prev} next={next} />);
    expect(screen.getByRole("link", { name: /All projects/i })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: new RegExp(prev.title) })).toHaveAttribute("href", `/projects/${prev.slug}`);
    expect(screen.getByRole("link", { name: new RegExp(next.title) })).toHaveAttribute("href", `/projects/${next.slug}`);
  });

  it("links to the source repository", () => {
    render(<CaseStudy project={project} prev={prev} next={next} />);
    expect(screen.getByRole("link", { name: /View source on GitHub/i })).toHaveAttribute("href", project.repoUrl);
  });
});

describe("project routes", () => {
  it("generates one static page per project", () => {
    expect(generateStaticParams().map((p) => p.slug)).toEqual(projects.map((p) => p.slug));
  });
});
