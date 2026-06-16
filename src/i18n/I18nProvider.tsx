import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { en } from "./dictionaries/en";
import { pt, type Dict } from "./dictionaries/pt";

export type Lang = "pt" | "en";

const DICTS: Record<Lang, Dict> = { pt, en };
const STORAGE_KEY = "pardal:lang";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(picker: (d: Dict) => T) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "pt" || stored === "en") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("pt") ? "pt" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — storage may be blocked
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (picker) => picker(DICTS[lang]),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook de tradução — uso via picker tipado:
 *   const t = useT();
 *   const title = t(d => d.hero.title);
 *
 * O picker é tipado contra o dicionário, então erros de chave aparecem
 * em build (sem necessidade de "magic strings").
 */
export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used inside <I18nProvider>");
  return ctx.t;
}

export function useLang() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLang must be used inside <I18nProvider>");
  return { lang: ctx.lang, setLang: ctx.setLang };
}
