import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { STUDY_FIELD_BY_ID } from "../data/studyFields";
import { JOB_BY_ID } from "../data/jobs";
import { UNIVERSITY_BY_ID } from "../data/universities";
import { Card } from "../components/ui";
import { formatSalary } from "../lib/format";
import type { CountryCode } from "../types";

type Kind = "fields" | "universities" | "jobs";

export default function Compare() {
  const { favorites, country, t } = useApp();
  const [kind, setKind] = useState<Kind>("jobs");
  const activeCountry: CountryCode = country ?? "AT";

  const tabs: [Kind, string][] = [
    ["fields", t("explore.study")],
    ["universities", t("explore.unis")],
    ["jobs", t("explore.jobs")],
  ];
  const ids = favorites[kind];

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-2xl font-bold">{t("compare.title")}</h1>
      <p className="text-sm text-muted">{t("compare.sub")}</p>

      <div className="glass flex rounded-2xl p-1">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              kind === k ? "bg-surface2 text-brandtext" : "text-muted"
            }`}
          >
            {label} ({favorites[k].length})
          </button>
        ))}
      </div>

      {ids.length < 2 ? (
        <Card className="text-center text-muted">
          {t("compare.need", { kind: t(`kind.${kind}`) })}
          <div className="mt-3">
            <Link to="/explore" className="text-sm text-brandtext">
              {t("compare.toExplore")} →
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
          {headers.map((h, i) => (
            <th key={i} className="rounded-t-xl bg-surface2 p-2 text-left align-bottom font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="pr-2 text-xs uppercase tracking-wide text-faint">{r.label}</td>
            {r.values.map((v, i) => (
              <td key={i} className="rounded-xl bg-surface2 p-2 align-top">
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function JobTable({ ids, country }: { ids: string[]; country: CountryCode }) {
  const { t } = useApp();
  const jobs = ids.map((id) => JOB_BY_ID[id]);
  return (
    <Table
      headers={jobs.map((j) => `${j.emoji} ${j.title}`)}
      rows={[
        { label: t("compare.salary"), values: jobs.map((j) => formatSalary(country, j.salary[country])) },
        { label: t("compare.outlook"), values: jobs.map((j) => t(`enum.${j.outlook}`)) },
        { label: t("compare.demand"), values: jobs.map((j) => (j.demand[country] ? t(`enum.${j.demand[country]}`) : t("enum.k.A."))) },
        { label: t("compare.wlb"), values: jobs.map((j) => "★".repeat(j.workLifeBalance)) },
        { label: t("explore.remote"), values: jobs.map((j) => t(`enum.${j.remote}`)) },
      ]}
    />
  );
}

function UniTable({ ids }: { ids: string[] }) {
  const { t } = useApp();
  const unis = ids.map((id) => UNIVERSITY_BY_ID[id]);
  return (
    <Table
      headers={unis.map((u) => u.name)}
      rows={[
        { label: t("compare.city"), values: unis.map((u) => u.city) },
        { label: t("explore.type"), values: unis.map((u) => u.type) },
        { label: t("compare.ranking"), values: unis.map((u) => u.ranking ?? "—") },
        { label: t("compare.language"), values: unis.map((u) => u.language.join(", ")) },
        { label: t("compare.strengths"), values: unis.map((u) => u.strengths.join(", ")) },
      ]}
    />
  );
}

function FieldTable({ ids }: { ids: string[] }) {
  const { t } = useApp();
  const fields = ids.map((id) => STUDY_FIELD_BY_ID[id]);
  return (
    <Table
      headers={fields.map((f) => `${f.emoji} ${f.name}`)}
      rows={[
        { label: t("compare.area"), values: fields.map((f) => f.category) },
        { label: t("explore.jobs"), values: fields.map((f) => f.relatedJobs.map((j) => JOB_BY_ID[j]?.title).join(", ")) },
      ]}
    />
  );
}
