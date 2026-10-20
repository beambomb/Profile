import { cv, socials } from "@content";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { FxCard } from "@/components/ui/FxCard";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";

function handle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const cardClass = "pixel-frame flex h-full min-h-11 items-start gap-4 bg-surface p-6";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Press start"
      title="Get in touch"
      intro="Email is the quickest way to reach me. You can also find me on LinkedIn and GitHub."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <FxCard tilt={0} className="pixel-frame flex flex-col gap-6 bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex min-w-0 items-start gap-4">
              <MailIcon className="mt-1.5 size-6 shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="text-muted">Email</p>
                <a
                  href={`mailto:${socials.email}`}
                  className="mt-1 block break-all text-xl font-semibold text-text hover:text-accent sm:text-3xl"
                >
                  {socials.email}
                </a>
              </div>
            </div>
            <CopyButton text={socials.email} label="Copy email" />
          </FxCard>
        </Reveal>

        <Reveal index={1} className="h-full">
          <FxCard tilt={3} className={cardClass}>
            <LinkedinIcon className="mt-1 size-6 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="text-lg font-semibold">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  LinkedIn <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
              <p className="break-all text-muted">{handle(socials.linkedin)}</p>
            </div>
          </FxCard>
        </Reveal>

        <Reveal index={2} className="h-full">
          <FxCard tilt={3} className={cardClass}>
            <GithubIcon className="mt-1 size-6 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="text-lg font-semibold">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  GitHub <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
              <p className="break-all text-muted">{handle(socials.github)}</p>
            </div>
          </FxCard>
        </Reveal>
      </div>

      {cv.published ? (
        <div className="mt-8">
          <Button href={cv.path} download={cv.fileName} variant="primary">
            <DownloadIcon /> Download CV
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
