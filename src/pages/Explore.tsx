import { useState } from "react";
import { COUNTRIES } from "../data/countries";
import { STUDY_FIELDS } from "../data/studyFields";
import { UNIVERSITIES } from "../data/universities";
import { JOBS } from "../data/jobs";
import { useApp } from "../store/AppContext";
import { FieldCard, JobCard, UniCard } from "../components/cards";
import type { CountryCode } from "../types";

type Tab = "fields" | "unis" | "jobs";

export default function Explore() {
  const { country, setCountry } = useApp();
  const active: CountryCode = country ?? "AT";
  const [tab, setTab] = useState<Tab>("fields");
  const [q, setQ] = useState("");

  const term = q.trim().toLowerCase();
  const unis = UNIVERSITIES.filter(
    (u) =>
      u.country === active &&
      (term === "" ||
        u.name.toLowerCase().includes(term) ||
        u.city.toLowerCase().includes(term)),
  );
  const fields = STUDY_FIELDS.filter(
    (f) => term === "" || f.name.toLowerCase().includes(term),
  );
  const jobs = JOBS.filter(
    (j) => term === "" || j.title.toLowerCase().includes(term),
  );

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-2xl font-bold">Entdecken</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
              active === c.code
                ? "bg-brand-500/20 text-brand-200"
                : "bg-white/5 text-slate-400"
            }`}
          >
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      <div className="glass flex rounded-2xl p-1">
        {(
          [
            ["fields", "Studium"],
            ["unis", "Unis"],
            ["jobs", "Berufe"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              tab === key ? "bg-white/10 text-brand-200" : "text-slate-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Suchen…"
        className="glass w-full rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-slate-500"
      />

      <div className="space-y-3">
        {tab === "fields" &&
          fields.map((f) => <FieldCard key={f.id} field={f} />)}
        {tab === "unis" &&
          (unis.length ? (
            unis.map((u) => <UniCard key={u.id} uni={u} />)
          ) : (
            <Empty />
          ))}
        {tab === "jobs" &&
          jobs.map((j) => <JobCard key={j.id} job={j} country={active} />)}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="py-8 text-center text-sm text-slate-500">
      Nichts gefunden – andere Suche oder Region probieren.
    </p>
  );
}
