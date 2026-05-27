import type {
  DimensionKey,
  Localized,
  PersonalityType,
  QuestionCategory,
} from "../types";

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  realistic: "Praktisch-technisch",
  investigative: "Forschend-analytisch",
  artistic: "Kreativ-künstlerisch",
  social: "Sozial",
  enterprising: "Unternehmerisch",
  conventional: "Strukturiert-organisierend",
  communication: "Kommunikation",
  teamwork: "Teamfähigkeit",
  problemSolving: "Problemlösung",
  creativity: "Kreativität",
  leadership: "Führung",
  organization: "Organisation",
  empathy: "Empathie",
  resilience: "Belastbarkeit",
  envOffice: "Büro",
  envLab: "Labor",
  envOutdoors: "Natur / Draußen",
  envStage: "Bühne / Öffentlichkeit",
  envWorkshop: "Werkstatt",
  envClinic: "Klinik / Pflege",
  envRemote: "Remote",
  structured: "Struktur",
  flexible: "Flexibilität",
  independent: "Eigenständigkeit",
  collaborative: "Zusammenarbeit",
  learnVisual: "Visuelles Lernen",
  learnTheory: "Theoretisches Lernen",
  learnHands: "Praktisches Lernen",
  learnSocial: "Soziales Lernen",
  motImpact: "Etwas bewirken",
  motSecurity: "Sicherheit",
  motMoney: "Einkommen",
  motAutonomy: "Autonomie",
  motRecognition: "Anerkennung",
  motKnowledge: "Wissensdurst",
};

export const CATEGORY_LABELS: Record<QuestionCategory, Localized> = {
  interests: { de: "Interessen", en: "Interests" },
  skills: { de: "Fähigkeiten", en: "Skills" },
  personality: { de: "Persönlichkeit", en: "Personality" },
  workstyle: { de: "Arbeitsstil", en: "Work style" },
  learnstyle: { de: "Lernstil", en: "Learning style" },
  motivation: { de: "Motivation", en: "Motivation" },
  environment: { de: "Umgebung", en: "Environment" },
};

// Which dimensions roll up into each top-level category (for the radar/summary).
export const CATEGORY_DIMENSIONS: Record<QuestionCategory, DimensionKey[]> = {
  interests: [
    "realistic",
    "investigative",
    "artistic",
    "social",
    "enterprising",
    "conventional",
  ],
  skills: [
    "communication",
    "teamwork",
    "problemSolving",
    "creativity",
    "leadership",
    "organization",
    "empathy",
    "resilience",
  ],
  personality: ["investigative", "artistic", "social", "enterprising"],
  workstyle: ["structured", "flexible", "independent", "collaborative"],
  learnstyle: ["learnVisual", "learnTheory", "learnHands", "learnSocial"],
  motivation: [
    "motImpact",
    "motSecurity",
    "motMoney",
    "motAutonomy",
    "motRecognition",
    "motKnowledge",
  ],
  environment: [
    "envOffice",
    "envLab",
    "envOutdoors",
    "envStage",
    "envWorkshop",
    "envClinic",
    "envRemote",
  ],
};

export const PERSONALITY_LABELS: Record<
  PersonalityType,
  { name: Localized; emoji: string; blurb: Localized }
> = {
  analytical: {
    name: { de: "Die/der analytische Denker:in", en: "The analytical thinker" },
    emoji: "🧠",
    blurb: {
      de: "Du gehst Probleme logisch an, liebst Daten, Muster und durchdachte Lösungen. Komplexität schreckt dich nicht ab – sie reizt dich.",
      en: "You approach problems logically and love data, patterns and well-thought-out solutions. Complexity doesn't scare you – it intrigues you.",
    },
  },
  creative: {
    name: { de: "Die/der kreative Gestalter:in", en: "The creative maker" },
    emoji: "🎨",
    blurb: {
      de: "Du denkst in Ideen, Bildern und Möglichkeiten. Ausdruck, Design und originelle Lösungen sind dein Antrieb.",
      en: "You think in ideas, images and possibilities. Expression, design and original solutions drive you.",
    },
  },
  social: {
    name: { de: "Der/die soziale Verbinder:in", en: "The social connector" },
    emoji: "🤝",
    blurb: {
      de: "Menschen stehen für dich im Mittelpunkt. Du kommunizierst, hilfst und bringst Gruppen zusammen.",
      en: "People are at the centre for you. You communicate, help and bring groups together.",
    },
  },
  practical: {
    name: { de: "Die/der praktische Macher:in", en: "The practical doer" },
    emoji: "🛠️",
    blurb: {
      de: "Du packst an, willst greifbare Ergebnisse und verstehst, wie Dinge funktionieren. Hände und Kopf arbeiten zusammen.",
      en: "You get stuck in, want tangible results and understand how things work. Hands and mind work together.",
    },
  },
  enterprising: {
    name: { de: "Die/der unternehmerische Gestalter:in", en: "The enterprising driver" },
    emoji: "🚀",
    blurb: {
      de: "Du übernimmst Verantwortung, überzeugst andere und treibst Projekte voran. Chancen erkennst du schnell.",
      en: "You take responsibility, persuade others and push projects forward. You spot opportunities quickly.",
    },
  },
  scientific: {
    name: { de: "Die/der wissenschaftliche Forscher:in", en: "The scientific researcher" },
    emoji: "🔬",
    blurb: {
      de: "Du willst verstehen, warum Dinge sind, wie sie sind. Neugier, Genauigkeit und Tiefe treiben dich an.",
      en: "You want to understand why things are the way they are. Curiosity, precision and depth drive you.",
    },
  },
};

// Each personality archetype is defined by the dimensions that characterise it.
export const PERSONALITY_PROFILE: Record<PersonalityType, DimensionKey[]> = {
  analytical: ["investigative", "problemSolving", "learnTheory", "conventional"],
  creative: ["artistic", "creativity", "learnVisual", "flexible"],
  social: ["social", "empathy", "communication", "teamwork", "learnSocial"],
  practical: ["realistic", "learnHands", "envWorkshop", "organization"],
  enterprising: ["enterprising", "leadership", "communication", "motRecognition"],
  scientific: ["investigative", "motKnowledge", "envLab", "learnTheory"],
};
