import type { CountryCode, SavedResult } from "../types";

const KEY = "fyouture.state.v1";

export type ThemeMode = "dark" | "light";
export type Lang = "de" | "en";

export interface Favorites {
  fields: string[];
  jobs: string[];
  universities: string[];
}

export interface PersistedState {
  country: CountryCode | null;
  results: SavedResult[];
  favorites: Favorites;
  theme: ThemeMode;
  lang: Lang;
}

export const EMPTY_STATE: PersistedState = {
  country: null,
  results: [],
  favorites: { fields: [], jobs: [], universities: [] },
  theme: "dark",
  lang: "de",
};

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      country: parsed.country ?? null,
      results: parsed.results ?? [],
      favorites: {
        fields: parsed.favorites?.fields ?? [],
        jobs: parsed.favorites?.jobs ?? [],
        universities: parsed.favorites?.universities ?? [],
      },
      theme: parsed.theme === "light" ? "light" : "dark",
      lang: parsed.lang === "en" ? "en" : "de",
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function saveState(state: PersistedState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private-mode errors
  }
}
