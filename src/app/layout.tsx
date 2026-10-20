import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { profile } from "@content";
import { siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
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

// Runs before first paint so there is no flash of the wrong theme. A saved choice wins,
// otherwise the system setting. Static string: no user input is interpolated.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
    { media: "(prefers-color-scheme: light)", color: "#F7F1E3" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${pixel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <ScrollProgress />
        <Header name={profile.name} />
        <div className="flex-1">{children}</div>
        <Footer name={profile.name} />
      </body>
    </html>
  );
}
