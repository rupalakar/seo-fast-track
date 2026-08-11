// Static content types — seeded in /content, read-only at runtime.

export type SkillId =
  | "fundamentals"
  | "keyword-research"
  | "search-intent"
  | "on-page-seo"
  | "technical-seo"
  | "content-seo"
  | "analytics"
  | "seo-strategy"
  | "networking"
  | "job-search";

export interface Skill {
  id: SkillId;
  name: string;
  description: string;
}

export type LevelId =
  | "level-0-fundamentals"
  | "level-1-keyword"
  | "level-2-onpage"
  | "level-3-technical"
  | "level-5-measurement"
  | "capstone";

export interface Level {
  id: LevelId;
  order: number;
  title: string;
  description: string;
  skillIds: SkillId[];
  projectTitle?: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warning" | "tip"; text: string }
  | { type: "source"; label: string; url: string };

export interface Lesson {
  id: string;
  levelId: LevelId;
  skillId: SkillId;
  order: number;
  title: string;
  summary: string;
  estMinutes: number;
  blocks: ContentBlock[];
  sources: { label: string; url: string }[];
  /** Indonesian search phrase used to link to relevant YouTube videos — no specific video URLs are hardcoded since they can't be verified to still exist. */
  videoSearchQuery?: string;
}

export type QuizSection = "A" | "B" | "C" | "D" | "E";

export interface QuizQuestion {
  id: string;
  section: QuizSection;
  skillId: SkillId;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export type EvidenceType = "link" | "text" | "both";

export interface TaskTemplate {
  id: string;
  levelId: LevelId;
  skillId: SkillId;
  title: string;
  objective: string;
  why: string;
  instructions: string[];
  estMinutes: number;
  tools: string[];
  expectedOutput: string;
  evidenceType: EvidenceType;
  rubric: string[];
  portfolioEligible: boolean;
}

export interface NetworkingTaskTemplate {
  id: string;
  title: string;
  category: "profile" | "outreach" | "community" | "learning";
  objective: string;
  instructions: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  relatedSkillId: SkillId;
  tips: string[];
}
