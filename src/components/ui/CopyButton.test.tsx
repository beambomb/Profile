import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  it("copies the text and announces it", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CopyButton text="hello@example.com" label="Copy email" />);

    await user.click(screen.getByRole("button", { name: "Copy email" }));

    expect(writeText).toHaveBeenCalledWith("hello@example.com");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Email address copied to clipboard");
  });
});
