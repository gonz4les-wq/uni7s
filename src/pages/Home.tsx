import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COUNTRIES } from "../data/countries";
import { useApp } from "../store/AppContext";
import { Button, Card } from "../components/ui";

export default function Home() {
  const { country, setCountry, results, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 text-center"
      >
        <div className="text-sm font-semibold uppercase tracking-widest text-brandtext">
          {t("home.badge")}
        </div>
        <h1 className="mt-2 text-5xl font-black tracking-tight">
          f<span className="text-brand-400">(you)</span>ture
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">{t("home.tagline")}</p>
      </motion.div>

      <Card>
        <h2 className="mb-3 font-semibold">{t("home.region")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                country === c.code
                  ? "border-brand-400 bg-brand-500/10"
                  : "border-line hover:border-brand-400/40"
              }`}
            >
              <span className="text-3xl">{c.flag}</span>
              <span className="font-medium">{t(`country.${c.code}`)}</span>
            </button>
          ))}
        </div>
      </Card>

      <Button
        disabled={!country}
        onClick={() => navigate("/quiz")}
        className="w-full py-4 text-lg"
      >
        {country ? `${t("home.start")} →` : t("home.pickRegion")}
      </Button>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[
          { n: "40", l: t("home.stat.questions") },
          { n: "6", l: t("home.stat.types") },
          { n: t("home.stat.min"), l: t("home.stat.duration") },
        ].map((s, i) => (
          <Card key={i} className="!p-3">
            <div className="text-xl font-bold text-brandtext">{s.n}</div>
            <div className="text-xs text-muted">{s.l}</div>
          </Card>
        ))}
      </div>

      {results.length > 0 && (
        <Card onClick={() => navigate("/dashboard")}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{t("home.lastResult")}</div>
              <div className="text-sm text-muted">
                {t("home.savedCount", { n: results.length })}
              </div>
            </div>
            <span className="text-brandtext">→</span>
          </div>
        </Card>
      )}
    </div>
  );
}
