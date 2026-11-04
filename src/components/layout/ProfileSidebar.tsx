"use client";

import Image from "next/image";
import { profile, socials } from "@content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CheckBadgeIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";

const techStackGroups = [
  {
    category: "Languages",
    items: ["Python", "Kotlin", "SQL", "TypeScript", "JavaScript", "C++"],
  },
  {
    category: "Web & Mobile",
    items: ["Next.js", "React", "Tailwind", "Express.js", "FastAPI"],
  },
  {
    category: "Data Engineering",
    items: ["PostgreSQL", "Kafka", "Airflow", "dbt", "Supabase", "MongoDB"],
  },
  {
    category: "ML & Analytics",
    items: ["PyTorch", "XGBoost", "Scikit-Learn", "Pandas"],
  },
  {
    category: "IoT & Tools",
    items: ["ESP32", "MQTT", "Docker", "Git", "VS Code"],
  },
];

export function ProfileSidebar() {
  return (
    <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-surface p-6 sm:p-7 lg:p-7 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      {/* Top utility row: Theme switch */}
      <div className="flex items-center justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 rounded-full overflow-hidden border-2 border-border-strong shadow-md">
          <Image
            src={profile.photo || "/images/profile.jpg"}
            alt={profile.photoAlt}
            width={72}
            height={72}
            className="size-full object-cover"
            priority
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-pixel text-xs sm:text-sm font-bold tracking-wide text-text leading-snug">
              Dimas Aryobimo
            </h2>
            <span title="Verified Developer" className="text-accent inline-flex items-center">
              <CheckBadgeIcon className="size-5 fill-accent" />
            </span>
          </div>
          <p className="text-xs text-muted mt-1">he/him</p>
        </div>
      </div>

      {/* ABOUT Section */}
      <div className="mt-6">
        <h3 className="font-pixel text-[10px] tracking-wider text-muted uppercase">ABOUT</h3>
        <h2 className="sr-only">About me</h2>
        <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-text">
          Indonesia-based software & data engineering student at Universitas Gadjah Mada, currently focused on streaming
          data pipelines, distributed architectures, and real-world web/mobile interfaces.
        </p>
      </div>

      {/* CONTACT Section */}
      <div className="mt-6">
        <h3 className="font-pixel text-[10px] tracking-wider text-muted uppercase">CONTACT</h3>
        <ul className="mt-2.5 space-y-2 text-xs sm:text-[13px]">
          <li>
            <a
              href={`mailto:${socials.email}`}
              className="inline-flex items-center gap-2.5 text-text hover:text-accent transition-colors"
            >
              <MailIcon className="size-4 text-muted shrink-0" />
              <span className="truncate">{socials.email}</span>
            </a>
          </li>
          <li>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-text hover:text-accent transition-colors"
            >
              <GithubIcon className="size-4 text-muted shrink-0" />
              <span className="truncate">{socials.github.replace("https://", "")}</span>
            </a>
          </li>
          <li>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-text hover:text-accent transition-colors"
            >
              <LinkedinIcon className="size-4 text-muted shrink-0" />
              <span className="truncate">{socials.linkedin.replace("https://www.", "").replace("https://", "")}</span>
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5 text-text">
            <MapPinIcon className="size-4 text-muted shrink-0" />
            <span>Yogyakarta, Indonesia</span>
          </li>
        </ul>
      </div>

      {/* TECH STACK Section */}
      <div className="mt-6 pb-4">
        <h3 className="font-pixel text-[10px] tracking-wider text-muted uppercase">TECH STACK</h3>
        <div className="mt-3 space-y-3">
          {techStackGroups.map((group) => (
            <div key={group.category}>
              <p className="text-[11px] text-muted font-semibold mb-1.5">{group.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-medium bg-surface-2 border border-border-strong text-text hover:border-accent hover:text-accent transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
