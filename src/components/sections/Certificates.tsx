"use client";

import { certificates } from "@content";
import { CertificatesList } from "./CertificatesList";

/** Renders nothing until at least one certificate exists, so no empty section is shown. */
export function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Certificates
      </h2>

      <CertificatesList certificates={certificates} />
    </section>
  );
}
