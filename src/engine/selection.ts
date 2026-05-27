import type { Question, QuestionCategory } from "../types";
import { QUESTIONS } from "../data/questions";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Picks `count` questions, balanced across categories, no duplicates.
// Round-robin over shuffled per-category buckets keeps the mix even even when
// the pool grows unevenly.
export function selectQuestions(count = 40, pool: Question[] = QUESTIONS): Question[] {
  const buckets = new Map<QuestionCategory, Question[]>();
  for (const q of pool) {
    const list = buckets.get(q.category) ?? [];
    list.push(q);
    buckets.set(q.category, list);
  }

  const shuffledBuckets = shuffle(
    [...buckets.values()].map((list) => shuffle(list)),
  );

  const picked: Question[] = [];
  let exhausted = false;
  while (picked.length < count && !exhausted) {
    exhausted = true;
    for (const bucket of shuffledBuckets) {
      if (bucket.length === 0) continue;
      exhausted = false;
      picked.push(bucket.pop()!);
      if (picked.length >= count) break;
    }
  }

  return picked;
}
