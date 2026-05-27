import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { Answer, DimensionVector, SavedResult } from "../types";
import { selectQuestions } from "../engine/selection";
import { buildProfile } from "../engine/scoring";
import {
  fieldScoreMap,
  matchJobs,
  matchStudyFields,
  matchUniversities,
} from "../engine/matching";
import { useApp } from "../store/AppContext";
import QuestionCard from "../components/QuestionCard";
import { Button } from "../components/ui";

export default function Quiz() {
  const navigate = useNavigate();
  const { country, saveResult, t } = useApp();
  const questions = useMemo(() => selectQuestions(40), []);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  if (!country) {
    return <Navigate to="/" replace />;
  }

  const total = questions.length;
  const current = questions[step];
  const progress = Math.round((step / total) * 100);

  const handleAnswer = (effect: DimensionVector) => {
    const next = [...answers, { questionId: current.id, effect }];
    setAnswers(next);

    if (step + 1 >= total) {
      finish(next);
    } else {
      setStep(step + 1);
    }
  };

  const finish = (all: Answer[]) => {
    const profile = buildProfile(all);
    const fieldMatches = matchStudyFields(profile);
    const scores = fieldScoreMap(fieldMatches);
    const jobMatches = matchJobs(profile, scores);
    const uniMatches = matchUniversities(country, scores);

    const result: SavedResult = {
      id: `r_${Date.now()}`,
      createdAt: Date.now(),
      country,
      profile,
      fields: fieldMatches.map((m) => ({ item: m.item.id, score: m.score })),
      jobs: jobMatches.map((m) => ({ item: m.item.id, score: m.score })),
      universities: uniMatches.map((m) => ({ item: m.item.id, score: m.score })),
    };
    saveResult(result);
    navigate(`/result/${result.id}`);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col pb-4">
      <div className="safe-top flex items-center gap-3 pt-2">
        <button
          onClick={() => (step === 0 ? navigate("/") : setStep(step - 1))}
          className="text-2xl text-muted"
          aria-label="back"
        >
          ←
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-muted">
          {step + 1}/{total}
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={current.id}
            question={current}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </div>

      {step === 0 && (
        <p className="mt-4 text-center text-xs text-faint">{t("quiz.hint")}</p>
      )}
      {answers.length >= total && (
        <Button className="mt-4 w-full" onClick={() => finish(answers)}>
          {t("quiz.seeResult")}
        </Button>
      )}
    </div>
  );
}
