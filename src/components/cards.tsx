import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CountryCode, Job, StudyField, University } from "../types";
import { Card, Chip, ScorePill } from "./ui";
import { useApp } from "../store/AppContext";
import { formatSalary } from "../lib/format";
import { JOB_BY_ID } from "../data/jobs";

function FavButton({
  kind,
  id,
}: {
  kind: "fields" | "jobs" | "universities";
  id: string;
}) {
  const { isFavorite, toggleFavorite } = useApp();
  const active = isFavorite(kind, id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(kind, id);
      }}
      className="shrink-0 text-xl transition active:scale-90"
      aria-label="Favorit"
    >
      <span className={active ? "" : "opacity-30 grayscale"}>⭐</span>
    </button>
  );
}

export function FieldCard({
  field,
  score,
}: {
  field: StudyField;
  score?: number;
}) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{field.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{field.name}</h3>
            <FavButton kind="fields" id={field.id} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Chip>{field.category}</Chip>
            {score != null && <ScorePill value={score} />}
          </div>
          <p className="mt-2 text-sm text-muted">{field.description}</p>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-2 text-sm text-brandtext"
          >
            {open ? t("card.less") : t("card.relatedJobs")}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 flex flex-wrap gap-2">
                  {field.relatedJobs.map((j) => (
                    <Chip key={j} tone="brand">
                      {JOB_BY_ID[j]?.emoji} {JOB_BY_ID[j]?.title}
                    </Chip>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

export function JobCard({
  job,
  country,
  score,
}: {
  job: Job;
  country: CountryCode;
  score?: number;
}) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const outlookTone =
    job.outlook === "wachsend" ? "good" : job.outlook === "stabil" ? "brand" : "warn";
  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{job.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{job.title}</h3>
            <FavButton kind="jobs" id={job.id} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {score != null && <ScorePill value={score} />}
            <Chip tone={outlookTone as never}>{t(`enum.${job.outlook}`)}</Chip>
            <Chip>{formatSalary(country, job.salary[country])}</Chip>
          </div>
          <p className="mt-2 text-sm text-muted">{job.description}</p>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-2 text-sm text-brandtext"
          >
            {open ? t("card.less") : t("card.details")}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <Stat
                    label={t("card.demand")}
                    value={job.demand[country] ? t(`enum.${job.demand[country]}`) : t("enum.k.A.")}
                  />
                  <Stat label={t("card.remote")} value={t(`enum.${job.remote}`)} />
                  <Stat
                    label={t("card.wlb")}
                    value={"●".repeat(job.workLifeBalance) + "○".repeat(5 - job.workLifeBalance)}
                  />
                  <Stat label={t("card.salary")} value={formatSalary(country, job.salary[country])} />
                </div>
                <div className="mt-3">
                  <div className="text-xs uppercase tracking-wide text-faint">
                    {t("card.employers")}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {job.companies.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

export function UniCard({
  uni,
  score,
}: {
  uni: University;
  score?: number;
}) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold">{uni.name}</h3>
          <div className="text-sm text-muted">
            📍 {uni.city} · {uni.type}
          </div>
        </div>
        <FavButton kind="universities" id={uni.id} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {score != null && score > 0 && <ScorePill value={score} />}
        {uni.ranking && <Chip tone="good">{uni.ranking}</Chip>}
        {uni.language.map((l) => (
          <Chip key={l}>{l}</Chip>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted">{uni.description}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-2 text-sm text-brandtext"
      >
        {open ? t("card.less") : t("card.more")}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 text-sm">
              <Detail label={t("card.strengths")} value={uni.strengths.join(", ")} />
              <Detail label={t("card.admission")} value={uni.admission} />
              <Detail label={t("card.international")} value={uni.international} />
            </div>
            <a
              href={uni.website}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-brandtext"
            >
              {t("card.website")} ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface2 p-2">
      <div className="text-xs text-faint">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-wide text-faint">{label}: </span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
