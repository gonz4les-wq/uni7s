import type { Country } from "../types";

export const COUNTRIES: Country[] = [
  { code: "AT", name: "Österreich", flag: "🇦🇹", currency: "EUR" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪", currency: "EUR" },
  { code: "CH", name: "Schweiz", flag: "🇨🇭", currency: "CHF" },
  { code: "IT-N", name: "Norditalien", flag: "🇮🇹", currency: "EUR" },
];

export const COUNTRY_BY_CODE = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
) as Record<Country["code"], Country>;
