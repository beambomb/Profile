import Image from "next/image";

export function CrownDoodle({ className = "w-14 h-12 inline-block ml-3" }: { className?: string }) {
  return (
    <span className={`relative inline-block align-middle select-none pointer-events-none ${className}`} aria-hidden="true">
      <Image
        src="/images/crown_doodle.png"
        alt="Crown graffiti doodle"
        width={72}
        height={65}
        className="w-full h-auto object-contain drop-shadow-[0_0_12px_rgba(37,99,235,0.45)]"
        priority
      />
    </span>
  );
}

