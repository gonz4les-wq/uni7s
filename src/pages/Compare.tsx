import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { STUDY_FIELD_BY_ID } from "../data/studyFields";
import { JOB_BY_ID } from "../data/jobs";
import { UNIVERSITY_BY_ID } from "../data/universities";
import { Card } from "../components/ui";
import { formatSalary } from "../lib/format";

type Kind = "fields" | "universities" | "jobs";

export default function Compare() {
  const { favorites, country } = useApp();
  const [kind, setKind] = useState<Kind>("jobs");
  const activeCountry = country ?? "AT";

  const tabs: [Kind, string][] = [
    ["fields", "Studium"],
    ["universities", "Unis"],
    ["jobs", "Berufe"],
  ];

  const ids = favorites[kind];

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-2xl font-bold">Vergleich</h1>
      <p className="text-sm text-slate-400">
        Vergleicht deine mit ⭐ markierten Favoriten nebeneinander.
      </p>

      <div className="glass flex rounded-2xl p-1">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              kind === k ? "bg-white/10 text-brand-200" : "text-slate-400"
            }`}
          >
            {label} ({favorites[k].length})
          </button>
        ))}
      </div>

      {ids.length < 2 ? (
        <Card className="text-center text-slate-400">
          Markiere mindestens zwei {label(kind)} mit ⭐, um sie zu vergleichen.
          <div className="mt-3">
            <Link to="/explore" className="text-sm text-brand-300">
              Zum Entdecken →
            </Link>
          </div>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          {kind === "jobs" && <JobTable ids={ids} country={activeCountry} />}
          {kind === "universities" && <UniTable ids={ids} />}
          {kind === "fields" && <FieldTable ids={ids} />}
        </div>
      )}
    </div>
  );
}

function label(k: Kind) {
  return k === "fields"
    ? "Studienrichtungen"
    : k === "universities"
      ? "Universitäten"
      : "Berufe";
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: { label: string; values: string[] }[];
}) {
  return (
    <table className="w-full border-separate border-spacing-y-2 text-sm">
      <thead>
        <tr>
          <th className="w-24" />
          {headers.map((h) => (
            <th
              key={h}
              className="rounded-t-xl bg-white/5 p-2 text-left align-bottom font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="pr-2 text-xs uppercase tracking-wide text-slate-500">
              {r.label}
            </td>
            {r.values.map((v, i) => (
              <td key={i} className="rounded-xl bg-white/5 p-2 align-top">
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function JobTable({ ids, country }: { ids: string[]; country: "AT" | "DE" | "CH" | "IT-N" }) {
  const jobs = ids.map((id) => JOB_BY_ID[id]);
  return (
    <Table
      headers={jobs.map((j) => `${j.emoji} ${j.title}`)}
      rows={[
        { label: "Gehalt", values: jobs.map((j) => formatSalary(country, j.salary[country])) },
        { label: "Aussicht", values: jobs.map((j) => j.outlook) },
        { label: "Nachfrage", values: jobs.map((j) => j.demand[country] ?? "k. A.") },
        {
          label: "Work-Life",
          values: jobs.map((j) => "★".repeat(j.workLifeBalance)),
        },
        { label: "Remote", values: jobs.map((j) => j.remote) },
      ]}
    />
  );
}

function UniTable({ ids }: { ids: string[] }) {
  const unis = ids.map((id) => UNIVERSITY_BY_ID[id]);
  return (
    <Table
      headers={unis.map((u) => u.name)}
      rows={[
        { label: "Stadt", values: unis.map((u) => u.city) },
        { label: "Typ", values: unis.map((u) => u.type) },
        { label: "Ranking", values: unis.map((u) => u.ranking ?? "—") },
        { label: "Sprache", values: unis.map((u) => u.language.join(", ")) },
        { label: "Stärken", values: unis.map((u) => u.strengths.join(", ")) },
      ]}
    />
  );
}

function FieldTable({ ids }: { ids: string[] }) {
  const fields = ids.map((id) => STUDY_FIELD_BY_ID[id]);
  return (
    <Table
      headers={fields.map((f) => `${f.emoji} ${f.name}`)}
      rows={[
        { label: "Bereich", values: fields.map((f) => f.category) },
        {
          label: "Berufe",
          values: fields.map((f) =>
            f.relatedJobs.map((j) => JOB_BY_ID[j]?.title).join(", "),
          ),
        },
      ]}
    />
  );
}
