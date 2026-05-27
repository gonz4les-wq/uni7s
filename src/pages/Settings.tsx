import { useState } from "react";
import { useApp } from "../store/AppContext";
import { Card } from "../components/ui";
import type { Lang, ThemeMode } from "../store/storage";

export default function Settings() {
  const { theme, setTheme, lang, setLang, resetAll, t } = useApp();
  const [cleared, setCleared] = useState(false);

  const themeOpts: { value: ThemeMode; label: string; icon: string }[] = [
    { value: "dark", label: t("settings.dark"), icon: "🌙" },
    { value: "light", label: t("settings.light"), icon: "☀️" },
  ];
  const langOpts: { value: Lang; label: string; flag: string }[] = [
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "en", label: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-2xl font-bold">{t("settings.title")}</h1>

      <section>
        <h2 className="mb-3 font-semibold">{t("settings.appearance")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {themeOpts.map((o) => (
            <button
              key={o.value}
              onClick={() => setTheme(o.value)}
              className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                theme === o.value
                  ? "border-brand-400 bg-brand-500/10"
                  : "border-line hover:border-brand-400/40"
              }`}
            >
              <span className="text-2xl">{o.icon}</span>
              <span className="font-medium">{o.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold">{t("settings.language")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {langOpts.map((o) => (
            <button
              key={o.value}
              onClick={() => setLang(o.value)}
              className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                lang === o.value
                  ? "border-brand-400 bg-brand-500/10"
                  : "border-line hover:border-brand-400/40"
              }`}
            >
              <span className="text-2xl">{o.flag}</span>
              <span className="font-medium">{o.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold">{t("settings.data")}</h2>
        <Card>
          <button
            onClick={() => {
              resetAll();
              setCleared(true);
            }}
            className="font-medium text-rose-500"
          >
            {t("settings.reset")}
          </button>
          {cleared && <p className="mt-2 text-sm text-muted">{t("settings.resetDone")}</p>}
        </Card>
      </section>

      <p className="text-center text-xs text-faint">{t("settings.about")}</p>
    </div>
  );
}
