// Country / region the recommendations are scoped to.
export type CountryCode = "AT" | "DE" | "CH" | "IT-N";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
}

// Every answer maps onto one or more of these dimensions. The full user
// profile is a vector over these keys (0..1 after normalisation).
export type DimensionKey =
  // RIASEC interests
  | "realistic"
  | "investigative"
  | "artistic"
  | "social"
  | "enterprising"
  | "conventional"
  // soft skills
  | "communication"
  | "teamwork"
  | "problemSolving"
  | "creativity"
  | "leadership"
  | "organization"
  | "empathy"
  | "resilience"
  // preferred environment
  | "envOffice"
  | "envLab"
  | "envOutdoors"
  | "envStage"
  | "envWorkshop"
  | "envClinic"
  | "envRemote"
  // work style
  | "structured"
  | "flexible"
  | "independent"
  | "collaborative"
  // learning style
  | "learnVisual"
  | "learnTheory"
  | "learnHands"
  | "learnSocial"
  // motivation
  | "motImpact"
  | "motSecurity"
  | "motMoney"
  | "motAutonomy"
  | "motRecognition"
  | "motKnowledge";

export type DimensionVector = Partial<Record<DimensionKey, number>>;

export type QuestionCategory =
  | "interests"
  | "skills"
  | "personality"
  | "workstyle"
  | "learnstyle"
  | "motivation"
  | "environment";

export type QuestionType =
  | "multiple" // single choice from options
  | "slider" // 0..100 mapped onto a dimension
  | "visual" // pick a scene/image
  | "wouldyourather" // binary either/or
  | "priorities" // rank / order cards
  | "skillmatch"; // self-rate several skills

export interface ChoiceOption {
  id: string;
  label: string;
  emoji?: string;
  // dimension contributions when this option is chosen
  effect: DimensionVector;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  prompt: string;
  subtitle?: string;
  // weight of this question relative to others (default 1)
  weight?: number;
  // multiple / visual / wouldyourather / priorities
  options?: ChoiceOption[];
  // slider: dimension that grows with the value, optional inverse dimension
  sliderDimension?: DimensionKey;
  sliderInverse?: DimensionKey;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
  // skillmatch: each item is a 0..100 self-rating onto a dimension
  skills?: { id: string; label: string; dimension: DimensionKey }[];
}

// What the user submitted for a single question.
export interface Answer {
  questionId: string;
  // resolved dimension contributions, already weighted
  effect: DimensionVector;
}

export type PersonalityType =
  | "analytical"
  | "creative"
  | "social"
  | "practical"
  | "enterprising"
  | "scientific";

export interface StudyField {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  // ideal dimension profile for this field
  profile: DimensionVector;
  // job ids commonly reached through this field
  relatedJobs: string[];
}

export interface University {
  id: string;
  name: string;
  city: string;
  country: CountryCode;
  language: string[];
  website: string;
  description: string;
  fields: string[]; // study field ids offered / strong in
  strengths: string[];
  ranking?: string; // qualitative, e.g. "Top 200 weltweit (THE)"
  admission: string;
  international: string;
  type: "Universität" | "Technische Universität" | "Fachhochschule" | "Privatuniversität";
}

export interface Job {
  id: string;
  title: string;
  emoji: string;
  description: string;
  fields: string[]; // related study field ids
  skills: DimensionKey[];
  // salary ranges per country in local currency (annual gross, EUR/CHF)
  salary: Partial<Record<CountryCode, { min: number; max: number }>>;
  outlook: "wachsend" | "stabil" | "rückläufig";
  demand: Partial<Record<CountryCode, "hoch" | "mittel" | "niedrig">>;
  workLifeBalance: 1 | 2 | 3 | 4 | 5;
  remote: "voll" | "teilweise" | "kaum";
  companies: string[];
}

export interface MatchResult<T> {
  item: T;
  score: number; // 0..100
}

export interface ProfileResult {
  vector: DimensionVector; // normalised 0..1
  personality: { type: PersonalityType; score: number }[];
  topCategories: { category: QuestionCategory; score: number }[];
}

export interface SavedResult {
  id: string;
  createdAt: number;
  country: CountryCode;
  profile: ProfileResult;
  fields: MatchResult<string>[]; // study field id + score
  jobs: MatchResult<string>[];
  universities: MatchResult<string>[];
}
