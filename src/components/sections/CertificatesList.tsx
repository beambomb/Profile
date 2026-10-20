"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Certificate } from "@content";
import { CloseIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Certificate | null>(null);

  const open = (cert: Certificate) => {
    setActive(cert);
    // Wait for the image to mount, then show the native modal (focus trap + Esc come with it).
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const close = () => {
    dialogRef.current?.close();
    setActive(null);
  };

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <li key={cert.id} className="flex flex-col overflow-hidden rounded-md border border-border bg-surface">
            {cert.image ? (
              <button
                type="button"
                onClick={() => open(cert)}
                className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-surface-2"
                aria-label={`View certificate image: ${cert.name}`}
                aria-haspopup="dialog"
              >
                <Image
                  src={cert.image}
                  alt={cert.imageAlt ?? `Certificate: ${cert.name}`}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold">{cert.name}</h3>
              <p className="mt-1 text-muted">{cert.issuer}</p>
              <p className="mt-1 font-mono text-sm text-muted">{cert.year}</p>
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 font-mono text-sm text-accent hover:underline"
                >
                  Verify credential <ExternalLinkIcon className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={active ? `Certificate: ${active.name}` : "Certificate"}
        onClose={() => setActive(null)}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[90dvh] w-[min(92vw,56rem)] rounded-md border border-border bg-surface p-0 text-text backdrop:bg-black/80"
      >
        {active?.image ? (
          <div className="relative">
            <button
              type="button"
              onClick={close}
              aria-label="Close certificate"
              className="absolute right-2 top-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-border bg-bg/90 text-text hover:border-accent hover:text-accent"
            >
              <CloseIcon />
            </button>
            <Image
              src={active.image}
              alt={active.imageAlt ?? `Certificate: ${active.name}`}
              width={1600}
              height={1131}
              sizes="(min-width: 896px) 896px, 92vw"
              className="h-auto max-h-[85dvh] w-full object-contain"
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
