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

export default function Dashboard() {
  const { results, favorites, deleteResult, country } = useApp();
  const navigate = useNavigate();
  const activeCountry = country ?? "AT";

  const hasFavorites =
    favorites.fields.length + favorites.jobs.length + favorites.universities.length >
    0;

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-2xl font-bold">Dein Profil</h1>

      <section>
        <h2 className="mb-3 font-semibold">Gespeicherte Auswertungen</h2>
        {results.length === 0 ? (
          <Card className="text-center">
            <p className="text-slate-400">Noch keine Auswertung.</p>
            <Button className="mt-3" onClick={() => navigate("/")}>
              Quiz starten
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
                    <div className="flex-1">
                      <Link to={`/result/${r.id}`} className="font-semibold">
                        {persona.name.split(" / ")[0]}
                      </Link>
                      <div className="text-xs text-slate-400">
                        {relativeDate(r.createdAt)} ·{" "}
                        {COUNTRY_BY_CODE[r.country].flag}{" "}
                        {COUNTRY_BY_CODE[r.country].name}
                      </div>
                    </div>
                    <Link
                      to={`/result/${r.id}`}
                      className="text-sm text-brand-300"
                    >
                      ansehen
                    </Link>
                    <button
                      onClick={() => deleteResult(r.id)}
                      className="text-slate-500 hover:text-rose-400"
                      aria-label="löschen"
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
          <h2 className="font-semibold">Favoriten</h2>
          {hasFavorites && (
            <Link to="/compare" className="text-sm text-brand-300">
              vergleichen →
            </Link>
          )}
        </div>
        {!hasFavorites ? (
          <Card className="text-center text-slate-400">
            Markiere Studienrichtungen, Unis oder Berufe mit ⭐, um sie hier zu
            sammeln.
          </Card>
        ) : (
          <div className="space-y-5">
            {favorites.fields.length > 0 && (
              <FavGroup title="Studienrichtungen">
                {favorites.fields.map((id) => (
                  <FieldCard key={id} field={STUDY_FIELD_BY_ID[id]} />
                ))}
              </FavGroup>
            )}
            {favorites.universities.length > 0 && (
              <FavGroup title="Universitäten">
                {favorites.universities.map((id) => (
                  <UniCard key={id} uni={UNIVERSITY_BY_ID[id]} />
                ))}
              </FavGroup>
            )}
            {favorites.jobs.length > 0 && (
              <FavGroup title="Berufe">
                {favorites.jobs.map((id) => (
                  <JobCard
                    key={id}
                    job={JOB_BY_ID[id]}
                    country={activeCountry}
                  />
                ))}
              </FavGroup>
            )}
          </div>
        )}
      </section>

      <Card className="text-center text-xs text-slate-500">
        <Chip>🔒 Lokal gespeichert</Chip>
        <p className="mt-2">
          Alle Daten bleiben nur auf diesem Gerät. Kein Konto, kein Server.
        </p>
      </Card>
    </div>
  );
}

function FavGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
