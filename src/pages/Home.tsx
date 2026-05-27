import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COUNTRIES } from "../data/countries";
import { useApp } from "../store/AppContext";
import { Button, Card } from "../components/ui";

export default function Home() {
  const { country, setCountry, results } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 text-center"
      >
        <div className="text-sm font-semibold uppercase tracking-widest text-brand-300">
          Maturaprojekt 2026
        </div>
        <h1 className="mt-2 text-5xl font-black tracking-tight">
          f<span className="text-brand-400">(you)</span>ture
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-slate-400">
          Entdecke in wenigen Minuten, was zu dir passt – Studienrichtungen,
          Universitäten und Karrierewege, abgestimmt auf dein Profil.
        </p>
      </motion.div>

      <Card>
        <h2 className="mb-3 font-semibold">In welcher Region suchst du?</h2>
        <div className="grid grid-cols-2 gap-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                country === c.code
                  ? "border-brand-400 bg-brand-500/10"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <span className="text-3xl">{c.flag}</span>
              <span className="font-medium">{c.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Button
        disabled={!country}
        onClick={() => navigate("/quiz")}
        className="w-full py-4 text-lg"
      >
        {country ? "Quiz starten →" : "Zuerst Region wählen"}
      </Button>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[
          { n: "40", l: "Fragen für dich" },
          { n: "6", l: "Fragetypen" },
          { n: "5 Min", l: "Dauer" },
        ].map((s) => (
          <Card key={s.l} className="!p-3">
            <div className="text-xl font-bold text-brand-300">{s.n}</div>
            <div className="text-xs text-slate-400">{s.l}</div>
          </Card>
        ))}
      </div>

      {results.length > 0 && (
        <Card onClick={() => navigate("/dashboard")}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Dein letztes Ergebnis</div>
              <div className="text-sm text-slate-400">
                {results.length} gespeicherte Auswertung
                {results.length > 1 ? "en" : ""}
              </div>
            </div>
            <span className="text-brand-300">→</span>
          </div>
        </Card>
      )}
    </div>
  );
}
