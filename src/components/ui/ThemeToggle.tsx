"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
// The server cannot know the visitor's theme, so the label is neutral until hydration.
const getServerSnapshot = (): Theme | null => null;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Sun/moon button. Remembers an explicit choice; otherwise follows the system setting. */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getSnapshot, getServerSnapshot);

  // Without a saved choice, keep following the operating system when it changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      applyTheme(query.matches ? "light" : "dark");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = getSnapshot() === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice still applies for this visit.
    }
  };

  const label = theme === null ? "Toggle color theme" : `Switch to ${theme === "light" ? "dark" : "light"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-border-strong text-text transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
    >
      <SunIcon className="theme-sun" />
      <MoonIcon className="theme-moon" />
    </button>
  );
}
