import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Press_Start_2P } from "next/font/google";
import { profile } from "@content";
import { siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Software, Data & ML`,
    template: "%s",
  },
  description: `Portfolio of ${profile.name}, Information Engineering student at Universitas Gadjah Mada. Projects in data engineering, machine learning, mobile, web, and IoT.`,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} | Software, Data & ML`,
    description: profile.tagline,
  },
  twitter: { card: "summary_large_image" },
};

// Inline script to prevent theme flash (FOUC) by syncing dataset.theme before paint
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s?s:(m?"light":"dark");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0f14" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${pixel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <SkipLink />
        <Header name={profile.name} />
        <div className="flex-1">{children}</div>
        <Footer name={profile.name} />
      </body>
    </html>
  );
}
