import type {
  Answer,
  DimensionKey,
  DimensionVector,
  PersonalityType,
  ProfileResult,
  QuestionCategory,
} from "../types";
import {
  CATEGORY_DIMENSIONS,
  PERSONALITY_PROFILE,
} from "../data/dimensions";

const PERSONALITY_TYPES: PersonalityType[] = [
  "analytical",
  "creative",
  "social",
  "practical",
  "enterprising",
  "scientific",
];

const ALL_CATEGORIES: QuestionCategory[] = [
  "interests",
  "skills",
  "personality",
  "workstyle",
  "learnstyle",
  "motivation",
  "environment",
];

function add(into: Record<string, number>, eff: DimensionVector, weight: number) {
  for (const [k, v] of Object.entries(eff)) {
    if (v == null) continue;
    into[k] = (into[k] ?? 0) + v * weight;
  }
}

function mean(vec: DimensionVector, keys: DimensionKey[]): number {
  if (keys.length === 0) return 0;
  let sum = 0;
  for (const k of keys) sum += vec[k] ?? 0;
  return sum / keys.length;
}

// Aggregates all answers into a normalised 0..1 dimension vector, then derives
// personality archetypes and category strengths from it.
export function buildProfile(answers: Answer[]): ProfileResult {
  const raw: Record<string, number> = {};
  for (const a of answers) add(raw, a.effect, 1);

  // Normalise: scale so the strongest dimension becomes 1.
  const max = Math.max(1e-6, ...Object.values(raw));
  const vector: DimensionVector = {};
  for (const [k, v] of Object.entries(raw)) {
    vector[k as DimensionKey] = Math.min(1, v / max);
  }

  const personality = PERSONALITY_TYPES.map((type) => ({
    type,
    score: Math.round(mean(vector, PERSONALITY_PROFILE[type]) * 100),
  })).sort((a, b) => b.score - a.score);

  const topCategories = ALL_CATEGORIES.map((category) => ({
    category,
    score: Math.round(mean(vector, CATEGORY_DIMENSIONS[category]) * 100),
  })).sort((a, b) => b.score - a.score);

  return { vector, personality, topCategories };
}
