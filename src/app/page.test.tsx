import { render, screen } from "@testing-library/react";
import { cv, profile } from "@content";
import Home from "./page";

describe("Home page", () => {
  it("renders the owner's name as the single main heading", () => {
    render(<Home />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(/Johannes De Deo Dimas Aryobimo/i);
  });

  it("has CTAs that point to the right sections", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /View Projects/i })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: /Contact/i })).toHaveAttribute("href", "/#contact");
  });

  it("only shows Download CV when the CV is published", () => {
    render(<Home />);
    const link = screen.queryByRole("link", { name: /Download CV/i });
    expect(Boolean(link)).toBe(cv.published);
  });

  it("keeps the full tagline available without the typing animation", () => {
    render(<Home />);
    expect(screen.getByText(profile.tagline, { selector: ".sr-only" })).toBeInTheDocument();
  });

  it("renders the about content from data", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 2, name: /About me/i })).toBeInTheDocument();
    expect(screen.getAllByText(profile.education.school).length).toBeGreaterThan(0);
  });
});
