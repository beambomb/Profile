import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("never hides content in server-rendered HTML", () => {
    const html = renderToString(
      <Reveal index={2}>
        <p>Server content</p>
      </Reveal>,
    );
    expect(html).toContain("Server content");
    expect(html).not.toMatch(/data-reveal|opacity/);
  });
});

describe("CountUp", () => {
  it("exposes the final value to assistive tech and in server HTML", () => {
    const html = renderToString(<CountUp value={60} suffix="+" />);
    expect(html).toContain("60+");
    render(<CountUp value={60} suffix="+" />);
    expect(screen.getByText("60+", { selector: ".sr-only" })).toBeInTheDocument();
  });
});
