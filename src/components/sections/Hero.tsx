import Image from "next/image";
import type { CSSProperties } from "react";
import { cv, profile, projects, skills } from "@content";
import { CountUp } from "@/components/motion/CountUp";
import { TypedText } from "@/components/motion/TypedText";
import { Button } from "@/components/ui/Button";
import { FxCard } from "@/components/ui/FxCard";
import { HeroStage } from "@/components/ui/HeroStage";
import { ArrowRightIcon, DownloadIcon, MailIcon } from "@/components/ui/Icons";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const technologies = new Set(skills.flatMap((group) => group.items)).size;
  const domains = Array.from(new Set(projects.map((p) => p.domain)));
  const bestFinish = profile.achievements[0];

  const stats = [
    { value: projects.length, label: "Projects built" },
    { value: profile.achievements.length, label: "Awards won" },
    { value: technologies, label: "Technologies used" },
  ];

  return (
    <HeroStage>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 sm:py-24 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-7">
          <p
            aria-hidden="true"
            className="rise font-pixel text-xs uppercase tracking-widest text-accent"
            style={step(0)}
          >
            Player 1 <span className="text-muted">/ ready</span>
          </p>

          <h1
            id="hero-title"
            className="rise mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
            style={step(1)}
          >
            {profile.name}
          </h1>

          <p className="rise mt-6 font-mono text-xl text-accent sm:text-2xl" style={step(2)}>
            {profile.headline}
          </p>

          <div className="rise" style={step(3)}>
            <TypedText text={profile.tagline} className="mt-5 max-w-2xl text-lg text-muted sm:text-xl" />
          </div>

          <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
            <Button href="/#projects" variant="primary">
              View Projects <ArrowRightIcon />
            </Button>
            {cv.published ? (
              <Button href={cv.path} download={cv.fileName} variant="secondary">
                <DownloadIcon /> Download CV
              </Button>
            ) : null}
            <Button href="/#contact" variant="secondary">
              <MailIcon /> Contact
            </Button>
          </div>

          <dl className="rise mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-8" style={step(5)}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-mono text-4xl font-bold text-text sm:text-5xl">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise lg:col-span-5" style={step(3)}>
          <FxCard tilt={7} className="pixel-frame mx-auto max-w-md bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between font-pixel text-[10px] uppercase tracking-widest" aria-hidden="true">
              <span className="text-accent">Player 1</span>
              <span className="text-muted">Select</span>
            </div>

            <div className="mt-5">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  width={480}
                  height={480}
                  priority
                  className="aspect-square w-full rounded-md border-2 border-border object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={profile.photoAlt}
                  className="bg-grid relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border-2 border-border bg-surface-2"
                >
                  <span className="font-pixel text-6xl text-accent drop-shadow-[0_0_24px_var(--color-accent)] sm:text-7xl">
                    {initials(profile.name)}
                  </span>
                </div>
              )}
            </div>

            <dl className="mt-6 divide-y divide-border text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Class</dt>
                <dd className="text-right font-medium">Software &amp; Data</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Base</dt>
                <dd className="text-right font-medium">{profile.education.school}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Arenas</dt>
                <dd className="text-right font-medium">{domains.join(" · ")}</dd>
              </div>
              {bestFinish ? (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">Best finish</dt>
                  <dd className="text-right font-medium text-cta">{bestFinish.title.split(" (")[0]}</dd>
                </div>
              ) : null}
            </dl>
          </FxCard>
        </div>
      </div>
    </HeroStage>
  );
}
