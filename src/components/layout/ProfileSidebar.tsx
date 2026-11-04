import Image from "next/image";
import { profile, socials } from "@content";
import { CheckBadgeIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";

const techStackGroups = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind"],
  },
  {
    category: "Backend",
    items: ["Python", "Node.js", "Express.js", "FastAPI", "Kotlin"],
  },
  {
    category: "Data & Database",
    items: ["PostgreSQL", "Kafka", "Airflow", "dbt", "Supabase", "MongoDB"],
  },
  {
    category: "Machine Learning",
    items: ["PyTorch", "XGBoost", "Scikit-Learn", "Pandas"],
  },
  {
    category: "IoT & Tools",
    items: ["ESP32", "MQTT", "Docker", "Git", "VS Code"],
  },
];

export function ProfileSidebar() {
  return (
    <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-800/80 bg-neutral-950/80 p-6 sm:p-8 lg:p-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 rounded-full overflow-hidden border-2 border-neutral-800 shadow-md">
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
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
              Dimas Aryobimo
            </h2>
            <span title="Verified Developer" className="text-blue-500 inline-flex items-center">
              <CheckBadgeIcon className="size-5 fill-blue-500" />
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">he/him</p>
        </div>
      </div>

      {/* ABOUT Section */}
      <div className="mt-8">
        <h3 className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">ABOUT</h3>
        <h2 className="sr-only">About me</h2>
        <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-300">
          Indonesia-based software & data engineering student at Universitas Gadjah Mada, currently focused on streaming
          data pipelines, distributed architectures, and real-world web/mobile interfaces.
        </p>
      </div>

      {/* CONTACT Section */}
      <div className="mt-8">
        <h3 className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">CONTACT</h3>
        <ul className="mt-3 space-y-2.5 text-xs sm:text-[13px]">
          <li>
            <a
              href={`mailto:${socials.email}`}
              className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-blue-400 transition-colors"
            >
              <MailIcon className="size-4 text-neutral-400 shrink-0" />
              <span className="truncate">{socials.email}</span>
            </a>
          </li>
          <li>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-blue-400 transition-colors"
            >
              <GithubIcon className="size-4 text-neutral-400 shrink-0" />
              <span className="truncate">{socials.github.replace("https://", "")}</span>
            </a>
          </li>
          <li>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="size-4 text-neutral-400 shrink-0" />
              <span className="truncate">{socials.linkedin.replace("https://www.", "").replace("https://", "")}</span>
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5 text-neutral-300">
            <MapPinIcon className="size-4 text-neutral-400 shrink-0" />
            <span>Yogyakarta, Indonesia</span>
          </li>
        </ul>
      </div>

      {/* TECH STACK Section */}
      <div className="mt-8 pb-4">
        <h3 className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">TECH STACK</h3>
        <div className="mt-3.5 space-y-4">
          {techStackGroups.map((group) => (
            <div key={group.category}>
              <p className="text-[11px] text-neutral-400 font-medium mb-1.5">{group.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-900 border border-neutral-800/90 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
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

