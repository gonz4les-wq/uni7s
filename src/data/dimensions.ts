import type {
  DimensionKey,
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

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  interests: "Interessen",
  skills: "Fähigkeiten",
  personality: "Persönlichkeit",
  workstyle: "Arbeitsstil",
  learnstyle: "Lernstil",
  motivation: "Motivation",
  environment: "Umgebung",
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
  { name: string; emoji: string; blurb: string }
> = {
  analytical: {
    name: "Die analytische Denkerin / der analytische Denker",
    emoji: "🧠",
    blurb:
      "Du gehst Probleme logisch an, liebst Daten, Muster und durchdachte Lösungen. Komplexität schreckt dich nicht ab – sie reizt dich.",
  },
  creative: {
    name: "Die kreative Gestalterin / der kreative Gestalter",
    emoji: "🎨",
    blurb:
      "Du denkst in Ideen, Bildern und Möglichkeiten. Ausdruck, Design und originelle Lösungen sind dein Antrieb.",
  },
  social: {
    name: "Der soziale Mensch / die soziale Verbindung",
    emoji: "🤝",
    blurb:
      "Menschen stehen für dich im Mittelpunkt. Du kommunizierst, hilfst und bringst Gruppen zusammen.",
  },
  practical: {
    name: "Die praktische Macherin / der praktische Macher",
    emoji: "🛠️",
    blurb:
      "Du packst an, willst greifbare Ergebnisse und verstehst, wie Dinge funktionieren. Hände und Kopf arbeiten zusammen.",
  },
  enterprising: {
    name: "Die unternehmerische Gestalterin / der unternehmerische Gestalter",
    emoji: "🚀",
    blurb:
      "Du übernimmst Verantwortung, überzeugst andere und treibst Projekte voran. Chancen erkennst du schnell.",
  },
  scientific: {
    name: "Die wissenschaftliche Forscherin / der wissenschaftliche Forscher",
    emoji: "🔬",
    blurb:
      "Du willst verstehen, warum Dinge sind, wie sie sind. Neugier, Genauigkeit und Tiefe treiben dich an.",
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
