import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectDomains, projects } from "@content";
import { ProjectsGrid } from "./ProjectsGrid";

const domains = projectDomains.filter((d) => projects.some((p) => p.domain === d));

describe("ProjectsGrid", () => {
  it("lists every project with a link to its case study", () => {
    render(<ProjectsGrid projects={projects} domains={domains} />);
    for (const p of projects) {
      expect(screen.getByRole("link", { name: p.title })).toHaveAttribute("href", `/projects/${p.slug}`);
    }
  });

  it("navigates slides using pagination dots", async () => {
    const user = userEvent.setup();
    render(<ProjectsGrid projects={projects} domains={domains} />);

    const totalStr = String(projects.length).padStart(2, "0");
    expect(screen.getByText(`01 / ${totalStr}`)).toBeInTheDocument();
    const secondDot = screen.getAllByRole("button", { name: new RegExp(projects[1].title, "i") })[0];
    await user.click(secondDot);
    expect(screen.getByText(`02 / ${totalStr}`)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(`Showing project 2 of ${projects.length}: ${projects[1].title}`);
  });

  it("labels each technology list for assistive tech", () => {
    render(<ProjectsGrid projects={projects} domains={domains} />);
    const first = screen.getAllByRole("article")[0];
    expect(within(first).getByRole("list", { name: /technologies/i })).toBeInTheDocument();
  });

  it("navigates slides using next and previous buttons", async () => {
    const user = userEvent.setup();
    render(<ProjectsGrid projects={projects} domains={domains} />);

    const totalStr = String(projects.length).padStart(2, "0");
    // Initially at slide 01 / total
    expect(screen.getByText(`01 / ${totalStr}`)).toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /Next project/i });
    const prevBtn = screen.getByRole("button", { name: /Previous project/i });

    // Click next -> 02 / total
    await user.click(nextBtn);
    expect(screen.getByText(`02 / ${totalStr}`)).toBeInTheDocument();

    // Click prev -> 01 / total
    await user.click(prevBtn);
    expect(screen.getByText(`01 / ${totalStr}`)).toBeInTheDocument();
  });
});
