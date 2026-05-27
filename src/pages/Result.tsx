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

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { results } = useApp();
  const result = results.find((r) => r.id === id) ?? results[0];

  if (!result) {
    return (
      <div className="pt-20 text-center text-slate-400">
        <p>Kein Ergebnis gefunden.</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Zum Start
        </Button>
      </div>
    );
  }

  const top = result.profile.personality[0];
  const persona = PERSONALITY_LABELS[top.type];
  const country = result.country;

  return (
    <div className="flex flex-col gap-6 pt-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-gradient-to-br from-brand-500/20 to-accent-500/15 text-center">
          <div className="text-6xl">{persona.emoji}</div>
          <div className="mt-2 text-xs uppercase tracking-widest text-brand-300">
            Dein Profil · {COUNTRY_BY_CODE[country].flag}{" "}
            {COUNTRY_BY_CODE[country].name}
          </div>
          <h1 className="mt-1 text-2xl font-bold">{persona.name}</h1>
          <p className="mt-2 text-sm text-slate-300">{persona.blurb}</p>
        </Card>
      </motion.div>

      <Section title="Deine Stärken">
        <Card className="space-y-3">
          {result.profile.personality.slice(0, 4).map((p) => (
            <ScoreBar
              key={p.type}
              value={p.score}
              label={PERSONALITY_LABELS[p.type].name.split(" / ")[0]}
              right={`${p.score}%`}
            />
          ))}
          <div className="border-t border-white/10 pt-3">
            {result.profile.topCategories.slice(0, 4).map((c) => (
              <div key={c.category} className="mt-2">
                <ScoreBar
                  value={c.score}
                  label={CATEGORY_LABELS[c.category]}
                  right={`${c.score}%`}
                />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Empfohlene Studienrichtungen" subtitle="Top-Matches für dich">
        <div className="space-y-3">
          {result.fields.slice(0, 5).map((m) => (
            <FieldCard
              key={m.item}
              field={STUDY_FIELD_BY_ID[m.item]}
              score={m.score}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Passende Universitäten"
        subtitle={`In ${COUNTRY_BY_CODE[country].name}`}
      >
        <div className="space-y-3">
          {result.universities.slice(0, 5).map((m) => (
            <UniCard key={m.item} uni={UNIVERSITY_BY_ID[m.item]} score={m.score} />
          ))}
        </div>
        <Link to="/explore" className="mt-3 block text-center text-sm text-brand-300">
          Alle Universitäten ansehen →
        </Link>
      </Section>

      <Section title="Mögliche Karrierewege">
        <div className="space-y-3">
          {result.jobs.slice(0, 5).map((m) => (
            <JobCard
              key={m.item}
              job={JOB_BY_ID[m.item]}
              country={country}
              score={m.score}
            />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="ghost" onClick={() => navigate("/quiz")}>
          Nochmal
        </Button>
        <Button onClick={() => navigate("/dashboard")}>Im Profil speichern</Button>
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
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
