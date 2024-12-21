// contexts/LanguageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Language {
  LangageID: number;
  Name: string;
  LangCode: string;
  Flag: string;
}

interface LanguageContextProps {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    LangageID: 2,
    Name: "English",
    LangCode: "en",
    Flag: "/default-flag.png",
  });

  const setLanguage = (language: Language) => setCurrentLanguage(language);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
