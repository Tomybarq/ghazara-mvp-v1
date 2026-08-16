import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (arText: string, enText: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  t: (ar) => ar,
  dir: "rtl",
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("ghazara_lang") as Language;
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
      document.documentElement.setAttribute("dir", saved === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("ghazara_lang", newLang);
    document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", newLang);
  };

  const t = (arText: string, enText: string) => {
    return lang === "en" ? enText : arText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
