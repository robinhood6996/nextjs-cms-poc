"use client"
import { fetchAllPages } from "@/api/api";
import { Language } from "@/lib/types";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const getLanguages = async () => {
    const response = await fetchAllPages();
    return response.data.Languages;
  }

  const [languages, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    getLanguages().then((languages) => setLanguages(languages));
  }, []);
  const switchLanguage = (language: Language) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("lang", language.LangCode);
  
    const baseURL = window.location.origin;
  
    router.push(`${baseURL}${pathname}?${searchParams.toString()}`);
  };
  
  return (
    <div className="language-switcher">
      {languages.map((language) => (
        <button
          key={language.LangageID}
          // className={
          //   currentLanguage.LangageID === language.LangageID ? "active" : ""
          // }
          onClick={() => switchLanguage(language)}
        >
          <Image
            src={language.Flag}
            alt={language.Name}
            width={20}
            height={15}
          />
          {/* {language.Name} */}
        </button>
      ))}
    </div>
  );
}
