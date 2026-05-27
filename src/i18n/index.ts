import type { Lang } from "../store/storage";
import type { Localized } from "../types";

export type { Localized };

export function L(value: Localized, lang: Lang): string {
  return lang === "en" ? (value.en ?? value.de) : value.de;
}

type Dict = Record<string, { de: string; en: string }>;

// UI strings. Use {var} placeholders, filled via t("key", { var: x }).
export const UI: Dict = {
  "nav.start": { de: "Start", en: "Home" },
  "nav.explore": { de: "Entdecken", en: "Explore" },
  "nav.compare": { de: "Vergleich", en: "Compare" },
  "nav.profile": { de: "Profil", en: "Profile" },
  "nav.settings": { de: "Einst.", en: "Settings" },

  "home.badge": { de: "Maturaprojekt 2026", en: "Final-year project 2026" },
  "home.tagline": {
    de: "Entdecke in wenigen Minuten, was zu dir passt – Studienrichtungen, Universitäten und Karrierewege, abgestimmt auf dein Profil.",
    en: "Discover in minutes what suits you – study fields, universities and career paths matched to your profile.",
  },
  "home.region": { de: "In welcher Region suchst du?", en: "Which region are you looking in?" },
  "home.start": { de: "Quiz starten", en: "Start quiz" },
  "home.pickRegion": { de: "Zuerst Region wählen", en: "Choose a region first" },
  "home.stat.questions": { de: "Fragen für dich", en: "questions for you" },
  "home.stat.types": { de: "Fragetypen", en: "question types" },
  "home.stat.duration": { de: "Dauer", en: "duration" },
  "home.stat.min": { de: "5 Min", en: "5 min" },
  "home.lastResult": { de: "Dein letztes Ergebnis", en: "Your latest result" },
  "home.savedCount": { de: "{n} gespeicherte Auswertung(en)", en: "{n} saved result(s)" },

  "quiz.hint": { de: "Tippe einfach auf die Antwort, die am ehesten passt.", en: "Just tap the answer that fits best." },
  "quiz.next": { de: "Weiter", en: "Next" },
  "quiz.seeResult": { de: "Auswertung ansehen", en: "See results" },

  "result.profile": { de: "Dein Profil", en: "Your profile" },
  "result.strengths": { de: "Deine Stärken", en: "Your strengths" },
  "result.fields": { de: "Empfohlene Studienrichtungen", en: "Recommended study fields" },
  "result.fieldsSub": { de: "Top-Matches für dich", en: "Top matches for you" },
  "result.unis": { de: "Passende Universitäten", en: "Matching universities" },
  "result.unisSub": { de: "In {country}", en: "In {country}" },
  "result.jobs": { de: "Mögliche Karrierewege", en: "Possible career paths" },
  "result.allUnis": { de: "Alle Universitäten ansehen", en: "See all universities" },
  "result.again": { de: "Nochmal", en: "Retake" },
  "result.save": { de: "Im Profil speichern", en: "Save to profile" },
  "result.none": { de: "Kein Ergebnis gefunden.", en: "No result found." },
  "result.toStart": { de: "Zum Start", en: "To home" },

  "explore.title": { de: "Entdecken", en: "Explore" },
  "explore.search": { de: "Suchen…", en: "Search…" },
  "explore.study": { de: "Studium", en: "Study" },
  "explore.unis": { de: "Unis", en: "Unis" },
  "explore.jobs": { de: "Berufe", en: "Jobs" },
  "explore.type": { de: "Typ", en: "Type" },
  "explore.remote": { de: "Remote", en: "Remote" },
  "explore.all": { de: "Alle", en: "All" },
  "explore.empty": { de: "Nichts gefunden – andere Suche, Filter oder Region probieren.", en: "Nothing found – try another search, filter or region." },

  "compare.title": { de: "Vergleich", en: "Compare" },
  "compare.sub": { de: "Vergleicht deine mit ⭐ markierten Favoriten nebeneinander.", en: "Compares your ⭐ favorites side by side." },
  "compare.need": { de: "Markiere mindestens zwei {kind} mit ⭐, um sie zu vergleichen.", en: "Mark at least two {kind} with ⭐ to compare them." },
  "compare.toExplore": { de: "Zum Entdecken", en: "Go to Explore" },
  "compare.salary": { de: "Gehalt", en: "Salary" },
  "compare.outlook": { de: "Aussicht", en: "Outlook" },
  "compare.demand": { de: "Nachfrage", en: "Demand" },
  "compare.wlb": { de: "Work-Life", en: "Work-Life" },
  "compare.city": { de: "Stadt", en: "City" },
  "compare.ranking": { de: "Ranking", en: "Ranking" },
  "compare.language": { de: "Sprache", en: "Language" },
  "compare.strengths": { de: "Stärken", en: "Strengths" },
  "compare.area": { de: "Bereich", en: "Area" },

  "dash.title": { de: "Dein Profil", en: "Your profile" },
  "dash.saved": { de: "Gespeicherte Auswertungen", en: "Saved results" },
  "dash.noResult": { de: "Noch keine Auswertung.", en: "No results yet." },
  "dash.startQuiz": { de: "Quiz starten", en: "Start quiz" },
  "dash.favorites": { de: "Favoriten", en: "Favorites" },
  "dash.compare": { de: "vergleichen", en: "compare" },
  "dash.favEmpty": { de: "Markiere Studienrichtungen, Unis oder Berufe mit ⭐, um sie hier zu sammeln.", en: "Mark study fields, unis or jobs with ⭐ to collect them here." },
  "dash.view": { de: "ansehen", en: "view" },
  "dash.local": { de: "Lokal gespeichert", en: "Stored locally" },
  "dash.localNote": { de: "Alle Daten bleiben nur auf diesem Gerät. Kein Konto, kein Server.", en: "All data stays on this device. No account, no server." },

  "kind.fields": { de: "Studienrichtungen", en: "study fields" },
  "kind.universities": { de: "Universitäten", en: "universities" },
  "kind.jobs": { de: "Berufe", en: "jobs" },

  "card.relatedJobs": { de: "verwandte Berufe", en: "related jobs" },
  "card.less": { de: "weniger", en: "less" },
  "card.more": { de: "mehr", en: "more" },
  "card.details": { de: "Details", en: "details" },
  "card.demand": { de: "Nachfrage", en: "Demand" },
  "card.remote": { de: "Remote", en: "Remote" },
  "card.wlb": { de: "Work-Life", en: "Work-Life" },
  "card.salary": { de: "Gehalt", en: "Salary" },
  "card.employers": { de: "Typische Arbeitgeber", en: "Typical employers" },
  "card.strengths": { de: "Stärken", en: "Strengths" },
  "card.admission": { de: "Zulassung", en: "Admission" },
  "card.international": { de: "International", en: "International" },
  "card.website": { de: "Website öffnen", en: "Open website" },
  "card.match": { de: "Match", en: "match" },

  "settings.title": { de: "Einstellungen", en: "Settings" },
  "settings.appearance": { de: "Erscheinungsbild", en: "Appearance" },
  "settings.dark": { de: "Dunkel", en: "Dark" },
  "settings.light": { de: "Hell", en: "Light" },
  "settings.language": { de: "Sprache", en: "Language" },
  "settings.data": { de: "Daten", en: "Data" },
  "settings.reset": { de: "Alle lokalen Daten löschen", en: "Delete all local data" },
  "settings.resetDone": { de: "Daten gelöscht.", en: "Data cleared." },
  "settings.about": { de: "f(you)ture · Maturaprojekt 2026 · läuft offline als PWA", en: "f(you)ture · final-year project 2026 · runs offline as a PWA" },

  "country.AT": { de: "Österreich", en: "Austria" },
  "country.DE": { de: "Deutschland", en: "Germany" },
  "country.CH": { de: "Schweiz", en: "Switzerland" },
  "country.IT-N": { de: "Norditalien", en: "Northern Italy" },

  // data enum translations
  "enum.wachsend": { de: "wachsend", en: "growing" },
  "enum.stabil": { de: "stabil", en: "stable" },
  "enum.rückläufig": { de: "rückläufig", en: "declining" },
  "enum.hoch": { de: "hoch", en: "high" },
  "enum.mittel": { de: "mittel", en: "medium" },
  "enum.niedrig": { de: "niedrig", en: "low" },
  "enum.voll": { de: "voll", en: "full" },
  "enum.teilweise": { de: "teilweise", en: "partial" },
  "enum.kaum": { de: "kaum", en: "rare" },
  "enum.k.A.": { de: "k. A.", en: "n/a" },
};

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const entry = UI[key];
  let str = entry ? entry[lang] : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, String(v));
  }
  return str;
}
