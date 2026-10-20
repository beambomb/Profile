import { certificates } from "@content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { CertificatesList } from "./CertificatesList";

/** Renders nothing until at least one certificate exists, so no empty section is shown. */
export function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <Section id="certificates" eyebrow="Achievements" title="Certificates" intro="Courses and credentials I have completed.">
      <Reveal>
        <CertificatesList certificates={certificates} />
      </Reveal>
    </Section>
  );
}
