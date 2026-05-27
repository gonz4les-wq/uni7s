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
  const { country, setCountry, t } = useApp();
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
      <h1 className="text-2xl font-bold">{t("explore.title")}</h1>

      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
              active === c.code ? "bg-brand-500/20 text-brandtext" : "bg-surface2 text-muted"
            }`}
          >
            {c.flag} {t(`country.${c.code}`)}
          </button>
        ))}
      </div>

      <div className="glass flex rounded-2xl p-1">
        {(
          [
            ["fields", t("explore.study")],
            ["unis", t("explore.unis")],
            ["jobs", t("explore.jobs")],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              tab === key ? "bg-surface2 text-brandtext" : "text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("explore.search")}
        className="glass w-full rounded-2xl px-4 py-3 text-sm text-fg outline-none placeholder:text-faint"
      />

      {tab === "unis" && (
        <FilterRow
          label={t("explore.type")}
          allLabel={t("explore.all")}
          options={UNI_TYPES.map((ut) => ({ value: ut, label: ut }))}
          value={uniType}
          onChange={(v) => setUniType(v as University["type"] | null)}
        />
      )}
      {tab === "jobs" && (
        <FilterRow
          label={t("explore.remote")}
          allLabel={t("explore.all")}
          options={REMOTE_OPTS.map((r) => ({ value: r, label: t(`enum.${r}`) }))}
          value={remote}
          onChange={(v) => setRemote(v as (typeof REMOTE_OPTS)[number] | null)}
        />
      )}

      <div className="space-y-3">
        {tab === "fields" &&
          (fields.length ? fields.map((f) => <FieldCard key={f.id} field={f} />) : <Empty />)}
        {tab === "unis" &&
          (unis.length ? unis.map((u) => <UniCard key={u.id} uni={u} />) : <Empty />)}
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
  allLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-faint">{label}</span>
      <Pill active={value === null} onClick={() => onChange(null)}>
        {allLabel}
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
        active ? "bg-brand-500/25 text-brandtext" : "bg-surface2 text-muted"
      }`}
    >
      {children}
    </button>
  );
}

function Empty() {
  const { t } = useApp();
  return <p className="py-8 text-center text-sm text-faint">{t("explore.empty")}</p>;
}
