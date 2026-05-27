import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { PERSONALITY_LABELS } from "../data/dimensions";
import { STUDY_FIELD_BY_ID } from "../data/studyFields";
import { JOB_BY_ID } from "../data/jobs";
import { UNIVERSITY_BY_ID } from "../data/universities";
import { COUNTRY_BY_CODE } from "../data/countries";
import { Button, Card, Chip } from "../components/ui";
import { FieldCard, JobCard, UniCard } from "../components/cards";
import { relativeDate } from "../lib/format";
import { L } from "../i18n";

export default function Dashboard() {
  const { results, favorites, deleteResult, country, lang, t } = useApp();
  const navigate = useNavigate();
  const activeCountry = country ?? "AT";

  const hasFavorites =
    favorites.fields.length + favorites.jobs.length + favorites.universities.length > 0;

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-2xl font-bold">{t("dash.title")}</h1>

      <section>
        <h2 className="mb-3 font-semibold">{t("dash.saved")}</h2>
        {results.length === 0 ? (
          <Card className="text-center">
            <p className="text-muted">{t("dash.noResult")}</p>
            <Button className="mt-3" onClick={() => navigate("/")}>
              {t("dash.startQuiz")}
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {results.map((r) => {
              const persona = PERSONALITY_LABELS[r.profile.personality[0].type];
              return (
                <Card key={r.id}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{persona.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <Link to={`/result/${r.id}`} className="font-semibold">
                        {L(persona.name, lang)}
                      </Link>
                      <div className="text-xs text-muted">
                        {relativeDate(r.createdAt, lang)} · {COUNTRY_BY_CODE[r.country].flag}{" "}
                        {t(`country.${r.country}`)}
                      </div>
                    </div>
                    <Link to={`/result/${r.id}`} className="text-sm text-brandtext">
                      {t("dash.view")}
                    </Link>
                    <button
                      onClick={() => deleteResult(r.id)}
                      className="text-faint hover:text-rose-400"
                      aria-label="delete"
                    >
                      ✕
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">{t("dash.favorites")}</h2>
          {hasFavorites && (
            <Link to="/compare" className="text-sm text-brandtext">
              {t("dash.compare")} →
            </Link>
          )}
        </div>
        {!hasFavorites ? (
          <Card className="text-center text-muted">{t("dash.favEmpty")}</Card>
        ) : (
          <div className="space-y-5">
            {favorites.fields.length > 0 && (
              <FavGroup title={t("kind.fields")}>
                {favorites.fields.map((id) => (
                  <FieldCard key={id} field={STUDY_FIELD_BY_ID[id]} />
                ))}
              </FavGroup>
            )}
            {favorites.universities.length > 0 && (
              <FavGroup title={t("kind.universities")}>
                {favorites.universities.map((id) => (
                  <UniCard key={id} uni={UNIVERSITY_BY_ID[id]} />
                ))}
              </FavGroup>
            )}
            {favorites.jobs.length > 0 && (
              <FavGroup title={t("kind.jobs")}>
                {favorites.jobs.map((id) => (
                  <JobCard key={id} job={JOB_BY_ID[id]} country={activeCountry} />
                ))}
              </FavGroup>
            )}
          </div>
        )}
      </section>

      <Card className="text-center text-xs text-faint">
        <Chip>🔒 {t("dash.local")}</Chip>
        <p className="mt-2">{t("dash.localNote")}</p>
      </Card>
    </div>
  );
}

function FavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-wide text-faint">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
