import type { StudyField } from "../types";

// Ideal dimension profiles (0..1) per study field. Values are relative
// weights used by the cosine-similarity matcher, not absolute truths.
export const STUDY_FIELDS: StudyField[] = [
  {
    id: "informatics",
    name: "Informatik",
    emoji: "💻",
    category: "Technik & IT",
    description:
      "Software, Algorithmen, KI und Systeme. Logisches Denken trifft auf kreatives Problemlösen.",
    profile: {
      investigative: 0.9,
      problemSolving: 1,
      realistic: 0.5,
      learnTheory: 0.7,
      independent: 0.7,
      motKnowledge: 0.7,
      envOffice: 0.6,
      envRemote: 0.8,
    },
    relatedJobs: ["software-engineer", "data-scientist", "ai-engineer", "it-consultant"],
  },
  {
    id: "medicine",
    name: "Medizin",
    emoji: "🩺",
    category: "Gesundheit",
    description:
      "Menschen heilen und Gesundheit verstehen. Naturwissenschaft, Empathie und Belastbarkeit.",
    profile: {
      investigative: 0.8,
      social: 0.8,
      empathy: 1,
      resilience: 0.9,
      envClinic: 1,
      motImpact: 0.9,
      learnTheory: 0.6,
    },
    relatedJobs: ["physician", "nurse", "physiotherapist", "psychologist"],
  },
  {
    id: "psychology",
    name: "Psychologie",
    emoji: "🧠",
    category: "Gesundheit",
    description:
      "Das menschliche Erleben und Verhalten verstehen – von Therapie bis Forschung.",
    profile: {
      investigative: 0.7,
      social: 0.9,
      empathy: 1,
      communication: 0.7,
      learnTheory: 0.6,
      motImpact: 0.8,
    },
    relatedJobs: ["psychologist", "hr-manager", "ux-researcher"],
  },
  {
    id: "architecture",
    name: "Architektur",
    emoji: "🏛️",
    category: "Gestaltung & Bau",
    description:
      "Räume gestalten, in denen Menschen leben. Kreativität trifft Technik und Verantwortung.",
    profile: {
      artistic: 0.9,
      realistic: 0.6,
      creativity: 0.9,
      learnVisual: 0.9,
      problemSolving: 0.6,
      envOffice: 0.5,
    },
    relatedJobs: ["architect", "civil-engineer", "ux-designer"],
  },
  {
    id: "mechanical",
    name: "Maschinenbau",
    emoji: "⚙️",
    category: "Technik & IT",
    description:
      "Maschinen, Fahrzeuge und Produktionsanlagen entwickeln. Physik und Technik zum Anfassen.",
    profile: {
      realistic: 1,
      investigative: 0.7,
      problemSolving: 0.8,
      envWorkshop: 0.8,
      learnHands: 0.8,
      structured: 0.6,
    },
    relatedJobs: ["mechanical-engineer", "product-manager", "civil-engineer"],
  },
  {
    id: "industrial-eng",
    name: "Wirtschaftsingenieurwesen",
    emoji: "📐",
    category: "Wirtschaft & Technik",
    description:
      "Brücke zwischen Technik und Management. Ideal für Schnittstellen-Denker.",
    profile: {
      enterprising: 0.8,
      investigative: 0.6,
      organization: 0.8,
      leadership: 0.6,
      problemSolving: 0.7,
      motMoney: 0.6,
      envOffice: 0.7,
    },
    relatedJobs: ["product-manager", "management-consultant", "it-consultant"],
  },
  {
    id: "business",
    name: "Wirtschaft & Management",
    emoji: "📈",
    category: "Wirtschaft & Recht",
    description:
      "Unternehmen führen, Märkte verstehen, Entscheidungen treffen.",
    profile: {
      enterprising: 1,
      leadership: 0.8,
      communication: 0.7,
      organization: 0.7,
      motMoney: 0.7,
      motRecognition: 0.6,
      envOffice: 0.7,
    },
    relatedJobs: ["management-consultant", "marketing-manager", "entrepreneur", "hr-manager"],
  },
  {
    id: "law",
    name: "Rechtswissenschaften",
    emoji: "⚖️",
    category: "Wirtschaft & Recht",
    description:
      "Gesetze, Argumentation und Gerechtigkeit. Präzise Sprache und logische Strenge.",
    profile: {
      conventional: 0.8,
      communication: 0.8,
      investigative: 0.6,
      structured: 0.9,
      learnTheory: 0.8,
      motSecurity: 0.6,
    },
    relatedJobs: ["lawyer", "hr-manager", "management-consultant"],
  },
  {
    id: "design",
    name: "Design & Medien",
    emoji: "🎨",
    category: "Gestaltung & Bau",
    description:
      "Visuelle Kommunikation, Produkte und digitale Erlebnisse gestalten.",
    profile: {
      artistic: 1,
      creativity: 1,
      learnVisual: 0.9,
      flexible: 0.7,
      communication: 0.5,
      envRemote: 0.6,
    },
    relatedJobs: ["ux-designer", "marketing-manager", "product-manager"],
  },
  {
    id: "biotech",
    name: "Biotechnologie",
    emoji: "🧬",
    category: "Naturwissenschaft",
    description:
      "Biologie und Technik kombinieren – von Medikamenten bis nachhaltiger Produktion.",
    profile: {
      investigative: 1,
      realistic: 0.6,
      envLab: 1,
      motKnowledge: 0.8,
      learnTheory: 0.7,
      problemSolving: 0.7,
    },
    relatedJobs: ["biotech-researcher", "data-scientist", "physician"],
  },
  {
    id: "teaching",
    name: "Lehramt",
    emoji: "📚",
    category: "Bildung & Soziales",
    description:
      "Wissen vermitteln und junge Menschen begleiten. Kommunikation und Geduld.",
    profile: {
      social: 1,
      communication: 0.9,
      empathy: 0.8,
      learnSocial: 0.8,
      motImpact: 0.9,
      teamwork: 0.6,
    },
    relatedJobs: ["teacher", "psychologist", "hr-manager"],
  },
  {
    id: "natural-sciences",
    name: "Naturwissenschaften (Physik/Chemie)",
    emoji: "🔬",
    category: "Naturwissenschaft",
    description:
      "Die Grundgesetze der Natur erforschen – von Quanten bis Klima.",
    profile: {
      investigative: 1,
      problemSolving: 0.8,
      envLab: 0.9,
      motKnowledge: 1,
      learnTheory: 0.9,
      independent: 0.7,
    },
    relatedJobs: ["biotech-researcher", "data-scientist", "physician"],
  },
  {
    id: "social-work",
    name: "Soziale Arbeit",
    emoji: "🤲",
    category: "Bildung & Soziales",
    description:
      "Menschen in schwierigen Lebenslagen unterstützen und Gesellschaft mitgestalten.",
    profile: {
      social: 1,
      empathy: 1,
      communication: 0.8,
      resilience: 0.7,
      motImpact: 1,
      teamwork: 0.6,
    },
    relatedJobs: ["psychologist", "nurse", "teacher"],
  },
  {
    id: "environmental",
    name: "Umwelt- & Nachhaltigkeitswissenschaften",
    emoji: "🌱",
    category: "Naturwissenschaft",
    description:
      "Klima, Ökosysteme und nachhaltige Lösungen für die Zukunft.",
    profile: {
      investigative: 0.8,
      realistic: 0.6,
      envOutdoors: 0.9,
      motImpact: 0.9,
      motKnowledge: 0.7,
      problemSolving: 0.7,
    },
    relatedJobs: ["sustainability-manager", "civil-engineer", "biotech-researcher"],
  },
  {
    id: "economics",
    name: "Volkswirtschaft & Data Economics",
    emoji: "💹",
    category: "Wirtschaft & Recht",
    description:
      "Wirtschaftliche Zusammenhänge mit Daten und Modellen verstehen.",
    profile: {
      investigative: 0.8,
      conventional: 0.6,
      problemSolving: 0.8,
      learnTheory: 0.8,
      motMoney: 0.6,
      envOffice: 0.6,
    },
    relatedJobs: ["data-scientist", "management-consultant", "marketing-manager"],
  },
  {
    id: "communication",
    name: "Kommunikation & Journalismus",
    emoji: "📰",
    category: "Medien & Gesellschaft",
    description:
      "Geschichten erzählen, informieren und Öffentlichkeit gestalten.",
    profile: {
      communication: 1,
      artistic: 0.6,
      social: 0.7,
      envStage: 0.7,
      flexible: 0.7,
      motRecognition: 0.6,
    },
    relatedJobs: ["marketing-manager", "ux-designer", "entrepreneur"],
  },
];

export const STUDY_FIELD_BY_ID = Object.fromEntries(
  STUDY_FIELDS.map((f) => [f.id, f]),
) as Record<string, StudyField>;
