import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CountryCode, SavedResult } from "../types";
import {
  EMPTY_STATE,
  loadState,
  saveState,
  type Favorites,
  type Lang,
  type PersistedState,
  type ThemeMode,
} from "./storage";
import { translate } from "../i18n";

type FavKind = keyof Favorites;

interface AppContextValue extends PersistedState {
  setCountry: (c: CountryCode) => void;
  saveResult: (r: SavedResult) => void;
  deleteResult: (id: string) => void;
  toggleFavorite: (kind: FavKind, id: string) => void;
  isFavorite: (kind: FavKind, id: string) => boolean;
  setTheme: (t: ThemeMode) => void;
  setLang: (l: Lang) => void;
  resetAll: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(EMPTY_STATE);
  // Only persist once we've loaded, otherwise the initial empty state would
  // overwrite saved data before hydration completes.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  // Reflect theme on <html> so CSS variables switch, and update the PWA
  // status-bar colour.
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "light" ? "#f1f5f9" : "#0b1120");
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.lang = state.lang;
  }, [state.lang]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setCountry: (country) => setState((s) => ({ ...s, country })),
      saveResult: (r) =>
        setState((s) => ({ ...s, results: [r, ...s.results].slice(0, 20) })),
      deleteResult: (id) =>
        setState((s) => ({ ...s, results: s.results.filter((r) => r.id !== id) })),
      toggleFavorite: (kind, id) =>
        setState((s) => {
          const list = s.favorites[kind];
          const next = list.includes(id)
            ? list.filter((x) => x !== id)
            : [...list, id];
          return { ...s, favorites: { ...s.favorites, [kind]: next } };
        }),
      isFavorite: (kind, id) => state.favorites[kind].includes(id),
      setTheme: (theme) => setState((s) => ({ ...s, theme })),
      setLang: (lang) => setState((s) => ({ ...s, lang })),
      resetAll: () =>
        setState((s) => ({
          ...EMPTY_STATE,
          theme: s.theme,
          lang: s.lang,
        })),
      t: (key, vars) => translate(state.lang, key, vars),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
