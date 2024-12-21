import { useLanguage } from "@/hooks/LanguageContext";
import { Language } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface LanguageSwitcherProps {
  languages: Language[];
}

export default function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      {languages.map((language) => (
        <button
          key={language.LangageID}
          className={
            currentLanguage.LangageID === language.LangageID ? "active" : ""
          }
          onClick={() => setLanguage(language)}
        >
          <Image
            src={language.Flag}
            alt={language.Name}
            width={20}
            height={15}
          />
          {language.Name}
        </button>
      ))}
    </div>
  );
}
