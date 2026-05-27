import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../store/AppContext";
import { PERSONALITY_LABELS, CATEGORY_LABELS } from "../data/dimensions";
import { STUDY_FIELD_BY_ID } from "../data/studyFields";
import { JOB_BY_ID } from "../data/jobs";
import { UNIVERSITY_BY_ID } from "../data/universities";
import { COUNTRY_BY_CODE } from "../data/countries";
import { Button, Card, ScoreBar } from "../components/ui";
import { FieldCard, JobCard, UniCard } from "../components/cards";
import { L } from "../i18n";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { results, lang, t } = useApp();
  const result = results.find((r) => r.id === id) ?? results[0];

  if (!result) {
    return (
      <div className="pt-20 text-center text-muted">
        <p>{t("result.none")}</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          {t("result.toStart")}
        </Button>
      </div>
    );
  }

  const top = result.profile.personality[0];
  const persona = PERSONALITY_LABELS[top.type];
  const country = result.country;
  const countryName = t(`country.${country}`);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-gradient-to-br from-brand-500/20 to-accent-500/15 text-center">
          <div className="text-6xl">{persona.emoji}</div>
          <div className="mt-2 text-xs uppercase tracking-widest text-brandtext">
            {t("result.profile")} · {COUNTRY_BY_CODE[country].flag} {countryName}
          </div>
          <h1 className="mt-1 text-2xl font-bold">{L(persona.name, lang)}</h1>
          <p className="mt-2 text-sm text-muted">{L(persona.blurb, lang)}</p>
        </Card>
      </motion.div>

      <Section title={t("result.strengths")}>
        <Card className="space-y-3">
          {result.profile.personality.slice(0, 4).map((p) => (
            <ScoreBar
              key={p.type}
              value={p.score}
              label={L(PERSONALITY_LABELS[p.type].name, lang)}
              right={`${p.score}%`}
            />
          ))}
          <div className="border-t border-line pt-3">
            {result.profile.topCategories.slice(0, 4).map((c) => (
              <div key={c.category} className="mt-2">
                <ScoreBar
                  value={c.score}
                  label={L(CATEGORY_LABELS[c.category], lang)}
                  right={`${c.score}%`}
                />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title={t("result.fields")} subtitle={t("result.fieldsSub")}>
        <div className="space-y-3">
          {result.fields.slice(0, 5).map((m) => (
            <FieldCard key={m.item} field={STUDY_FIELD_BY_ID[m.item]} score={m.score} />
          ))}
        </div>
      </Section>

      <Section title={t("result.unis")} subtitle={t("result.unisSub", { country: countryName })}>
        <div className="space-y-3">
          {result.universities.slice(0, 5).map((m) => (
            <UniCard key={m.item} uni={UNIVERSITY_BY_ID[m.item]} score={m.score} />
          ))}
        </div>
        <Link to="/explore" className="mt-3 block text-center text-sm text-brandtext">
          {t("result.allUnis")} →
        </Link>
      </Section>

      <Section title={t("result.jobs")}>
        <div className="space-y-3">
          {result.jobs.slice(0, 5).map((m) => (
            <JobCard key={m.item} job={JOB_BY_ID[m.item]} country={country} score={m.score} />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="ghost" onClick={() => navigate("/quiz")}>
          {t("result.again")}
        </Button>
        <Button onClick={() => navigate("/dashboard")}>{t("result.save")}</Button>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
