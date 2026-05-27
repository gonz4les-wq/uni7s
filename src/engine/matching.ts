import type {
  CountryCode,
  DimensionKey,
  DimensionVector,
  Job,
  MatchResult,
  ProfileResult,
  StudyField,
  University,
} from "../types";
import { STUDY_FIELDS, STUDY_FIELD_BY_ID } from "../data/studyFields";
import { JOBS } from "../data/jobs";
import { UNIVERSITIES } from "../data/universities";

// Cosine similarity over the union of dimension keys → 0..1.
function cosine(a: DimensionVector, b: DimensionVector): number {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const k of keys) {
    const va = a[k as DimensionKey] ?? 0;
    const vb = b[k as DimensionKey] ?? 0;
    dot += va * vb;
    na += va * va;
    nb += vb * vb;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

const pct = (x: number) => Math.round(Math.max(0, Math.min(1, x)) * 100);

export function matchStudyFields(profile: ProfileResult): MatchResult<StudyField>[] {
  return STUDY_FIELDS.map((field) => ({
    item: field,
    score: pct(cosine(profile.vector, field.profile)),
  })).sort((a, b) => b.score - a.score);
}

// A job inherits the profiles of its related fields (best match) and gets a
// bonus for direct overlap between its key skills and the user's strengths.
export function matchJobs(
  profile: ProfileResult,
  fieldScores: Map<string, number>,
): MatchResult<Job>[] {
  return JOBS.map((job) => {
    const fieldComponent =
      Math.max(0, ...job.fields.map((f) => fieldScores.get(f) ?? 0)) / 100;
    const skillComponent =
      job.skills.reduce((s, dim) => s + (profile.vector[dim] ?? 0), 0) /
      Math.max(1, job.skills.length);
    const score = pct(0.6 * fieldComponent + 0.4 * skillComponent);
    return { item: job, score };
  }).sort((a, b) => b.score - a.score);
}

// Universities are scored by how well their offered fields match the user,
// filtered to the chosen country.
export function matchUniversities(
  country: CountryCode,
  fieldScores: Map<string, number>,
): MatchResult<University>[] {
  return UNIVERSITIES.filter((u) => u.country === country)
    .map((uni) => {
      const scores = uni.fields
        .map((f) => fieldScores.get(f) ?? 0)
        .sort((a, b) => b - a);
      // Weight the top 3 matching fields, best counts most.
      const top = scores.slice(0, 3);
      const weighted =
        top.reduce((s, v, i) => s + v * [0.5, 0.3, 0.2][i], 0) /
        (top.length ? [0.5, 0.3, 0.2].slice(0, top.length).reduce((a, b) => a + b) : 1);
      return { item: uni, score: Math.round(weighted) };
    })
    .sort((a, b) => b.score - a.score);
}

export function fieldScoreMap(
  fieldMatches: MatchResult<StudyField>[],
): Map<string, number> {
  return new Map(fieldMatches.map((m) => [m.item.id, m.score]));
}

export { STUDY_FIELD_BY_ID };
