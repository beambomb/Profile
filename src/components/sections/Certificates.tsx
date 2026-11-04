"use client";

import { certificates } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { CertificatesList } from "./CertificatesList";

/** Renders nothing until at least one certificate exists, so no empty section is shown. */
export function Certificates() {
  const { lang } = useLanguage();
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-12 sm:py-16 border-b border-neutral-900">
      {/* Header Eyebrow */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
        {lang === "EN" ? "CREDENTIALS" : "SERTIFIKASI"}
      </p>

      {/* Cursive Handwriting Annotation */}
      <div className="mb-1">
        <span className="font-handwriting text-2xl sm:text-3xl text-blue-500 font-bold -rotate-1 inline-block">
          {lang === "EN" ? "verified expertise" : "keahlian terverifikasi"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        Certificates
      </h2>

      <CertificatesList certificates={certificates} />
    </section>
  );
}
