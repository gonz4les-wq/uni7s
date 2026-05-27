import type { CountryCode, SavedResult } from "../types";

const KEY = "fyouture.state.v1";

export interface Favorites {
  fields: string[];
  jobs: string[];
  universities: string[];
}

export interface PersistedState {
  country: CountryCode | null;
  results: SavedResult[];
  favorites: Favorites;
}

export const EMPTY_STATE: PersistedState = {
  country: null,
  results: [],
  favorites: { fields: [], jobs: [], universities: [] },
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
