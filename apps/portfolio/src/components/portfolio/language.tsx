import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Lang } from "@/content/portfolio";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | null>(null);

const STORAGE_KEY = "lesanpi-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") {
      setLangState(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("es")) setLangState("es");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useCopy() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useCopy outside LanguageProvider");
  return { t: copy[ctx.lang], lang: ctx.lang, setLang: ctx.setLang };
}
