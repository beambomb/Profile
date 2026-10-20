import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { certificates as realCertificates, socials, type Certificate } from "@content";
import { Certificates } from "./Certificates";
import { CertificatesList } from "./CertificatesList";
import { Contact } from "./Contact";
import { navItems } from "@/components/layout/nav";

const sample: Certificate[] = [
  {
    id: "sample-cert",
    name: "Sample Certificate",
    issuer: "Sample Issuer",
    year: 2026,
    verifyUrl: "https://example.com/verify/123",
    image: "/images/certificates/sample.png",
    imageAlt: "Sample certificate scan",
  },
  { id: "no-image", name: "Certificate Without Image", issuer: "Another Issuer", year: 2025 },
];

describe("Certificates", () => {
  beforeEach(() => {
    // jsdom does not implement the native dialog methods.
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    }) as typeof window.requestAnimationFrame;
  });

  it("shows the section and the nav link when certificates exist", () => {
    render(<Certificates />);
    expect(screen.getByRole("heading", { level: 2, name: "Certificates" })).toBeInTheDocument();
    expect(navItems.some((i) => i.href === "/#certificates")).toBe(true);
  });

  it("lists every certificate from content with a verification link", () => {
    render(<Certificates />);
    for (const cert of realCertificates) {
      expect(screen.getByRole("heading", { level: 3, name: cert.name })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: /Verify credential/i })).toHaveLength(
      realCertificates.filter((c) => c.verifyUrl).length,
    );
  });

  it("renders certificate details and a verification link", () => {
    render(<CertificatesList certificates={sample} />);
    expect(screen.getByRole("heading", { name: "Sample Certificate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Verify credential/i })).toHaveAttribute(
      "href",
      "https://example.com/verify/123",
    );
    expect(screen.getByRole("heading", { name: "Certificate Without Image" })).toBeInTheDocument();
  });

  it("opens the image dialog and closes it with the close button", async () => {
    const user = userEvent.setup();
    render(<CertificatesList certificates={sample} />);

    await user.click(screen.getByRole("button", { name: /View certificate image: Sample Certificate/i }));
    const dialog = screen.getByRole("dialog", { name: /Sample Certificate/i });
    expect(dialog).toHaveAttribute("open");

    await user.click(screen.getByRole("button", { name: "Close certificate" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("links to email, LinkedIn, and GitHub", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: socials.email })).toHaveAttribute("href", `mailto:${socials.email}`);
    expect(screen.getByRole("button", { name: /Copy email/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", socials.linkedin);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", socials.github);
  });

  it("has no contact form", () => {
    render(<Contact />);
    expect(document.querySelector("form")).toBeNull();
  });
});
