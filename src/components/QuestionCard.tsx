import { useState } from "react";
import { motion } from "framer-motion";
import type { ChoiceOption, DimensionVector, Question } from "../types";
import { Button } from "./ui";
import { useApp } from "../store/AppContext";
import { L } from "../i18n";
import type { Lang } from "../store/storage";

function scale(eff: DimensionVector, factor: number): DimensionVector {
  const out: DimensionVector = {};
  for (const [k, v] of Object.entries(eff)) {
    if (v != null) out[k as keyof DimensionVector] = v * factor;
  }
  return out;
}

function merge(...vecs: DimensionVector[]): DimensionVector {
  const out: DimensionVector = {};
  for (const v of vecs) {
    for (const [k, val] of Object.entries(v)) {
      if (val == null) continue;
      const key = k as keyof DimensionVector;
      out[key] = (out[key] ?? 0) + val;
    }
  }
  return out;
}

export default function QuestionCard({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (effect: DimensionVector) => void;
}) {
  const { lang } = useApp();
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      <h2 className="text-2xl font-bold leading-tight">{L(question.prompt, lang)}</h2>
      {question.subtitle && (
        <p className="mt-2 text-muted">{L(question.subtitle, lang)}</p>
      )}

      <div className="mt-6 flex-1">
        {(question.type === "multiple" || question.type === "wouldyourather") && (
          <ChoiceList
            options={question.options ?? []}
            lang={lang}
            big={question.type === "wouldyourather"}
            onPick={(o) => onAnswer(o.effect)}
          />
        )}

        {question.type === "visual" && (
          <VisualGrid
            options={question.options ?? []}
            lang={lang}
            onPick={(o) => onAnswer(o.effect)}
          />
        )}

        {question.type === "slider" && (
          <SliderQuestion question={question} lang={lang} onAnswer={onAnswer} />
        )}

        {question.type === "skillmatch" && (
          <SkillMatch question={question} lang={lang} onAnswer={onAnswer} />
        )}

        {question.type === "priorities" && (
          <Priorities options={question.options ?? []} lang={lang} onAnswer={onAnswer} />
        )}
      </div>
    </motion.div>
  );
}

function ChoiceList({
  options,
  lang,
  big,
  onPick,
}: {
  options: ChoiceOption[];
  lang: Lang;
  big?: boolean;
  onPick: (o: ChoiceOption) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="grid gap-3">
      {options.map((o) => (
        <motion.button
          key={o.id}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setPicked(o.id);
            setTimeout(() => onPick(o), 180);
          }}
          className={`glass flex items-center gap-4 rounded-2xl p-4 text-left transition ${
            picked === o.id
              ? "border-brand-400 ring-2 ring-brand-400/50"
              : "hover:border-brand-400/30"
          } ${big ? "py-6" : ""}`}
        >
          {o.emoji && <span className="text-3xl">{o.emoji}</span>}
          <span className="text-lg font-medium">{L(o.label, lang)}</span>
        </motion.button>
      ))}
    </div>
  );
}

function VisualGrid({
  options,
  lang,
  onPick,
}: {
  options: ChoiceOption[];
  lang: Lang;
  onPick: (o: ChoiceOption) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => (
        <motion.button
          key={o.id}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setPicked(o.id);
            setTimeout(() => onPick(o), 180);
          }}
          className={`glass flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl p-4 transition ${
            picked === o.id
              ? "border-brand-400 ring-2 ring-brand-400/50"
              : "hover:border-brand-400/30"
          }`}
        >
          <span className="text-5xl">{o.emoji}</span>
          <span className="font-semibold">{L(o.label, lang)}</span>
        </motion.button>
      ))}
    </div>
  );
}

function SliderQuestion({
  question,
  lang,
  onAnswer,
}: {
  question: Question;
  lang: Lang;
  onAnswer: (effect: DimensionVector) => void;
}) {
  const { t } = useApp();
  const [value, setValue] = useState(50);
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 text-center text-5xl font-bold tabular-nums text-brandtext">
        {value}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-brand-500"
      />
      <div className="mt-2 flex justify-between text-sm text-muted">
        <span>{question.sliderMinLabel ? L(question.sliderMinLabel, lang) : "0"}</span>
        <span>{question.sliderMaxLabel ? L(question.sliderMaxLabel, lang) : "100"}</span>
      </div>
      <div className="mt-auto pt-8">
        <Button
          className="w-full"
          onClick={() => {
            const f = value / 100;
            const eff: DimensionVector = {};
            if (question.sliderDimension) eff[question.sliderDimension] = f;
            if (question.sliderInverse) eff[question.sliderInverse] = 1 - f;
            onAnswer(eff);
          }}
        >
          {t("quiz.next")}
        </Button>
      </div>
    </div>
  );
}

function SkillMatch({
  question,
  lang,
  onAnswer,
}: {
  question: Question;
  lang: Lang;
  onAnswer: (effect: DimensionVector) => void;
}) {
  const { t } = useApp();
  const skills = question.skills ?? [];
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(skills.map((s) => [s.id, 50])),
  );
  return (
    <div className="flex h-full flex-col gap-5">
      {skills.map((s) => (
        <div key={s.id}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium">{L(s.label, lang)}</span>
            <span className="tabular-nums text-brandtext">{values[s.id]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={values[s.id]}
            onChange={(e) =>
              setValues((v) => ({ ...v, [s.id]: Number(e.target.value) }))
            }
            className="w-full accent-brand-500"
          />
        </div>
      ))}
      <div className="mt-auto pt-6">
        <Button
          className="w-full"
          onClick={() => {
            const eff: DimensionVector = {};
            for (const s of skills) eff[s.dimension] = values[s.id] / 100;
            onAnswer(eff);
          }}
        >
          {t("quiz.next")}
        </Button>
      </div>
    </div>
  );
}

function Priorities({
  options,
  lang,
  onAnswer,
}: {
  options: ChoiceOption[];
  lang: Lang;
  onAnswer: (effect: DimensionVector) => void;
}) {
  const { t } = useApp();
  const [order, setOrder] = useState<ChoiceOption[]>(options);

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {order.map((o, i) => (
        <motion.div
          layout
          key={o.id}
          className="glass flex items-center gap-3 rounded-2xl p-3"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500/20 text-sm font-bold text-brandtext">
            {i + 1}
          </span>
          {o.emoji && <span className="text-2xl">{o.emoji}</span>}
          <span className="min-w-0 flex-1 font-medium">{L(o.label, lang)}</span>
          <div className="flex flex-col">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="px-2 text-muted disabled:opacity-20"
              aria-label="up"
            >
              ▲
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === order.length - 1}
              className="px-2 text-muted disabled:opacity-20"
              aria-label="down"
            >
              ▼
            </button>
          </div>
        </motion.div>
      ))}
      <div className="mt-auto pt-4">
        <Button
          className="w-full"
          onClick={() => {
            const n = order.length;
            const vecs = order.map((o, i) => scale(o.effect, (n - i) / n));
            onAnswer(merge(...vecs));
          }}
        >
          {t("quiz.next")}
        </Button>
      </div>
    </div>
  );
}
