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

  it("filters by area and reports the count", async () => {
    const user = userEvent.setup();
    render(<ProjectsGrid projects={projects} domains={domains} />);

    await user.click(screen.getByRole("button", { name: "Data" }));
    const expected = projects.filter((p) => p.domain === "Data");
    expect(screen.getByRole("button", { name: "Data" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(expected.length);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${expected.length} of ${projects.length}`);

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  it("labels each technology list for assistive tech", () => {
    render(<ProjectsGrid projects={projects} domains={domains} />);
    const first = screen.getAllByRole("article")[0];
    expect(within(first).getByRole("list", { name: /technologies/i })).toBeInTheDocument();
  });
});
