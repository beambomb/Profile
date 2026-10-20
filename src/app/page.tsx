import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
