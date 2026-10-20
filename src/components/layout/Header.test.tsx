import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

describe("Header", () => {
  it("shows the primary links, including Certificates now that some exist", () => {
    render(<Header name="Johannes De Deo" />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Profile", "Skills", "Projects", "Certificates", "Contact"]) {
      expect(nav).toHaveTextContent(label);
    }
  });

  it("opens the mobile menu, and Esc closes it and restores focus", async () => {
    const user = userEvent.setup();
    render(<Header name="Johannes De Deo" />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});
