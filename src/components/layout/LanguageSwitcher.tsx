"use client"
import { fetchAllPages } from "@/api/api";
import { useLanguage } from "@/hooks/LanguageContext";
import { Language } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage();
  const getLanguages = async () => {
    const response = await fetchAllPages();
    return response.data.Languages;
  }

  const [languages, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    getLanguages().then((languages) => setLanguages(languages));
  }, []);
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
