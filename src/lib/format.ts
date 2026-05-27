import type { CountryCode } from "../types";
import { COUNTRY_BY_CODE } from "../data/countries";

export function formatSalary(
  country: CountryCode,
  range?: { min: number; max: number },
): string {
  if (!range) return "k. A.";
  const cur = COUNTRY_BY_CODE[country].currency;
  const fmt = (n: number) => `${Math.round(n / 1000)}k`;
  const lo = range.min === 0 ? "variabel" : fmt(range.min);
  return `${lo}–${fmt(range.max)} ${cur}`;
}

export function relativeDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
