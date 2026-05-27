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
  type PersistedState,
} from "./storage";

type FavKind = keyof Favorites;

interface AppContextValue extends PersistedState {
  setCountry: (c: CountryCode) => void;
  saveResult: (r: SavedResult) => void;
  deleteResult: (id: string) => void;
  toggleFavorite: (kind: FavKind, id: string) => void;
  isFavorite: (kind: FavKind, id: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(EMPTY_STATE);

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

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
