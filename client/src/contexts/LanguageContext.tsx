import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (arText: string, enText: string) => string;
  dir: "rtl" | "ltr";
  isAr: boolean;
  isEn: boolean;
}

const STORAGE_KEY = "ghazara_lang_preference";

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  toggleLanguage: () => {},
  t: (ar) => ar,
  dir: "rtl",
  isAr: true,
  isEn: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === "en" || saved === "ar") {
        return saved;
      }
    }
    return "ar";
  });

  const applyDomAttributes = useCallback((targetLang: Language) => {
    if (typeof document !== "undefined") {
      const dir = targetLang === "ar" ? "rtl" : "ltr";
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", targetLang);
      document.documentElement.style.colorScheme = "dark light";
    }
  }, []);

  useEffect(() => {
    applyDomAttributes(lang);
  }, [lang, applyDomAttributes]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
    applyDomAttributes(newLang);
  }, [applyDomAttributes]);

  const toggleLanguage = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const t = useCallback((arText: string, enText: string) => {
    return lang === "en" ? enText : arText;
  }, [lang]);

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLanguage,
    t,
    dir: lang === "ar" ? "rtl" : "ltr",
    isAr: lang === "ar",
    isEn: lang === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
