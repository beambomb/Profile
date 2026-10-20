"use client";

import { useEffect, useRef, useState } from "react";

/** Copies text to the clipboard and confirms politely for screen readers. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (for example on insecure origins): fall back to a selectable prompt.
      window.prompt("Copy this:", text);
      return;
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border px-5 font-mono text-sm transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 ${
          copied
            ? "border-accent bg-accent/10 text-accent"
            : "border-border-strong text-text hover:border-accent hover:text-accent"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          {copied ? <path d="M5 13l4 4L19 7" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}
        </svg>
        {copied ? "Copied" : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
