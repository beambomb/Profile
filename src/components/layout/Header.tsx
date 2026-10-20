"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { useActiveSection } from "@/components/motion/useActiveSection";
import { navItems } from "./nav";

const sectionIds = navItems.map((item) => item.href.replace("/#", ""));

export function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === null;
  const activeId = useActiveSection(onHome ? sectionIds : []);

  // Esc closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (active: boolean) =>
    `relative inline-flex min-h-11 items-center rounded-md px-3 text-base transition-colors duration-200 hover:text-accent after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
      active ? "text-accent after:scale-x-100" : "text-muted after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-mono text-base font-semibold text-text hover:text-accent"
          onClick={(event) => {
            setOpen(false);
            // Already on the home page: Next treats "/" as the same route and will not scroll,
            // so scroll to the top ourselves. "auto" follows the CSS scroll-behavior (and reduced motion).
            if (onHome) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "auto" });
              window.history.replaceState(null, "", "/");
            }
          }}
        >
          <span aria-hidden="true" className="mr-2 text-accent">
            &gt;
          </span>
          {name.split(" ")[0]}
          <span aria-hidden="true" className="caret ml-1 inline-block h-4 w-2 bg-accent" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = onHome && activeId === item.href.replace("/#", "");
              return (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass(active)} aria-current={active ? "location" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-border text-text hover:border-accent hover:text-accent md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <nav id={menuId} aria-label="Mobile" className="border-t border-border bg-surface md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`${linkClass(false)} w-full`} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
