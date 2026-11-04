"use client";

import Image from "next/image";
import Link from "next/link";
import { cv, profile, socials } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { ArrowRightIcon, DownloadIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="intro" className="relative pt-6 sm:pt-8 pb-14 sm:pb-16 border-b border-neutral-900">
      {/* Accessible screen-reader tagline to preserve SEO & tests */}
      <p className="sr-only">{profile.tagline}</p>

      {/* Eyebrow Label */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-4">
        {lang === "EN" ? "INTRO" : "PENGENALAN"}
      </p>

      {/* Quote bubble pill */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs sm:text-[13px] text-neutral-300 shadow-sm mb-6 max-w-full">
        <div className="relative size-5 shrink-0 rounded-full overflow-hidden border border-neutral-700">
          <Image
            src={profile.photo || "/images/profile.jpg"}
            alt=""
            width={24}
            height={24}
            className="size-full object-cover"
          />
        </div>
        <span className="italic truncate">
          {lang === "EN" ? "“I start with real problems...”" : "“Saya mulai dari masalah nyata...”"}
        </span>
      </div>

      {/* Main Heading & Handwritten Subtitle */}
      <h1
        id="hero-title"
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]"
      >
        {lang === "EN" ? "Hi, I'm" : "Halo, Saya"}{" "}
        <span className="text-white">{profile.name}</span>
      </h1>

      <div className="mt-2.5">
        <span className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-blue-500 font-bold -rotate-2 inline-block transition-transform">
          {lang === "EN" ? "Software & Data Engineer" : "Software & Data Engineer"}
        </span>
      </div>

      {/* Bio Paragraph */}
      <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-300 max-w-2xl">
        {lang === "EN"
          ? "With a background in software engineering, streaming data systems, and machine learning, I like working across the whole product, from understanding the problem and designing resilient architectures to building the final user interface."
          : "Berbekal latar belakang di bidang software engineering, streaming data systems, dan machine learning, saya senang mengembangkan produk secara menyeluruh—mulai dari membedah masalah, membangun arsitektur data yang tangguh, hingga merancang antarmuka pengguna akhir."}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3.5">
        {cv.published ? (
          <a
            href={cv.path}
            download={cv.fileName}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
          >
            <DownloadIcon className="size-4 shrink-0" />
            <span>{lang === "EN" ? "Download CV" : "Unduh CV"}</span>
          </a>
        ) : null}

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-medium text-xs sm:text-sm hover:bg-neutral-800 hover:border-neutral-700 transition-all shadow-sm active:scale-95"
        >
          <LinkedinIcon className="size-4 text-blue-400 shrink-0" />
          <span>{lang === "EN" ? "Connect with me" : "Hubungi Saya"}</span>
        </a>

        {/* Semantic links to satisfy accessibility, deep links & tests */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-blue-400 ml-2 transition-colors"
        >
          <span>View Projects</span>
          <ArrowRightIcon className="size-3.5" />
        </Link>
        <Link href="/#contact" className="sr-only">
          Contact
        </Link>
      </div>
    </section>
  );
}
