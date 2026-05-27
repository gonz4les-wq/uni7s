import { useState } from "react";
import { COUNTRIES } from "../data/countries";
import { STUDY_FIELDS } from "../data/studyFields";
import { UNIVERSITIES } from "../data/universities";
import { JOBS } from "../data/jobs";
import { useApp } from "../store/AppContext";
import { FieldCard, JobCard, UniCard } from "../components/cards";
import type { CountryCode, University } from "../types";

type Tab = "fields" | "unis" | "jobs";

const UNI_TYPES: University["type"][] = [
  "Universität",
  "Technische Universität",
  "Fachhochschule",
  "Privatuniversität",
];
const REMOTE_OPTS = ["voll", "teilweise", "kaum"] as const;

export default function Explore() {
  const { country, setCountry } = useApp();
  const active: CountryCode = country ?? "AT";
  const [tab, setTab] = useState<Tab>("fields");
  const [q, setQ] = useState("");
  const [uniType, setUniType] = useState<University["type"] | null>(null);
  const [remote, setRemote] = useState<(typeof REMOTE_OPTS)[number] | null>(null);

  const term = q.trim().toLowerCase();
  const unis = UNIVERSITIES.filter(
    (u) =>
      u.country === active &&
      (uniType === null || u.type === uniType) &&
      (term === "" ||
        u.name.toLowerCase().includes(term) ||
        u.city.toLowerCase().includes(term)),
  );
  const fields = STUDY_FIELDS.filter(
    (f) => term === "" || f.name.toLowerCase().includes(term),
  );
  const jobs = JOBS.filter(
    (j) =>
      (remote === null || j.remote === remote) &&
      (term === "" || j.title.toLowerCase().includes(term)),
  );

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-2xl font-bold">Entdecken</h1>

      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
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

      {tab === "unis" && (
        <FilterRow
          label="Typ"
          options={UNI_TYPES.map((t) => ({ value: t, label: t }))}
          value={uniType}
          onChange={(v) => setUniType(v as University["type"] | null)}
        />
      )}
      {tab === "jobs" && (
        <FilterRow
          label="Remote"
          options={REMOTE_OPTS.map((r) => ({ value: r, label: r }))}
          value={remote}
          onChange={(v) => setRemote(v as (typeof REMOTE_OPTS)[number] | null)}
        />
      )}

      <div className="space-y-3">
        {tab === "fields" &&
          (fields.length ? (
            fields.map((f) => <FieldCard key={f.id} field={f} />)
          ) : (
            <Empty />
          ))}
        {tab === "unis" &&
          (unis.length ? (
            unis.map((u) => <UniCard key={u.id} uni={u} />)
          ) : (
            <Empty />
          ))}
        {tab === "jobs" &&
          (jobs.length ? (
            jobs.map((j) => <JobCard key={j.id} job={j} country={active} />)
          ) : (
            <Empty />
          ))}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <Pill active={value === null} onClick={() => onChange(null)}>
        Alle
      </Pill>
      {options.map((o) => (
        <Pill
          key={o.value}
          active={value === o.value}
          onClick={() => onChange(value === o.value ? null : o.value)}
        >
          {o.label}
        </Pill>
      ))}
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        active ? "bg-brand-500/25 text-brand-200" : "bg-white/5 text-slate-400"
      }`}
    >
      {children}
    </button>
  );
}

function Empty() {
  return (
    <p className="py-8 text-center text-sm text-slate-500">
      Nichts gefunden – andere Suche, Filter oder Region probieren.
    </p>
  );
}
