"use client";

import { useLanguage } from "@/lib/languageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm select-none" aria-label="Language selection">
      <button
        type="button"
        onClick={() => setLang("EN")}
        aria-pressed={lang === "EN"}
        className={`cursor-pointer transition-all ${lang === "EN"
            ? "font-handwriting text-xl sm:text-2xl font-bold text-blue-500 -rotate-3"
            : "text-neutral-400 hover:text-white"
          }`}
      >
        EN
      </button>
      <span className="text-neutral-600 text-xs" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("ID")}
        aria-pressed={lang === "ID"}
        className={`cursor-pointer transition-all ${lang === "ID"
            ? "font-handwriting text-xl sm:text-2xl font-bold text-blue-500 -rotate-3"
            : "text-neutral-400 hover:text-white"
          }`}
      >
        ID
      </button>
    </div>
  );
}

