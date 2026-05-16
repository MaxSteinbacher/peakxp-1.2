import { createContext, useContext, useState, useEffect } from "react";

const VALID_LANGS = ["en", "de", "fr", "it"];
const STORAGE_KEY = "peakxp_language";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && VALID_LANGS.includes(stored) ? stored : "en";
  });

  function setLang(newLang) {
    if (!VALID_LANGS.includes(newLang)) return;
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}