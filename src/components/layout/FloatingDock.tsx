"use client";

import { useEffect, useState } from "react";
import {
  AwardIcon,
  BriefcaseIcon,
  FolderIcon,
  GraduationCapIcon,
  MailIcon,
  UserIcon,
} from "@/components/ui/Icons";

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const items: DockItem[] = [
  { id: "intro", label: "Intro", icon: UserIcon },
  { id: "projects", label: "Projects", icon: FolderIcon },
  { id: "education", label: "Education", icon: GraduationCapIcon },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "certificates", label: "Certificates", icon: AwardIcon },
  { id: "contact", label: "Contact", icon: MailIcon },
];

export function FloatingDock() {
  const [active, setActive] = useState("intro");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of [...items].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActive(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Quick Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full backdrop-blur-2xl bg-surface/90 border border-border-strong shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHovered = hovered === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              {(isHovered || (isActive && hovered === null)) && (
                <div
                  role="tooltip"
                  className="absolute -top-10 px-2.5 py-1 rounded-md bg-surface-2 border border-border-strong text-[11px] font-medium text-text shadow-xl pointer-events-none select-none transition-all duration-150 animate-in fade-in zoom-in-95"
                >
                  {item.label}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 size-2 rotate-45 bg-surface-2 border-r border-b border-border-strong" />
                </div>
              )}

              {/* Dock button */}
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`Jump to ${item.label}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex items-center justify-center size-10 sm:size-11 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-surface-2 text-accent border border-accent/40 shadow-sm scale-105"
                    : "text-muted hover:text-text hover:bg-surface-2/60"
                }`}
              >
                <Icon className="size-5 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
