/**
 * Taxonomy + exam blueprint seed data.
 *
 * This is the ONLY place exam behaviour is defined. The public site never
 * special-cases "PST" or "CSS" — it reads these rows through the Question
 * Selection Engine.
 */

export interface SeedEducationLevel {
  slug: string;
  name: string;
  rank: number;
  description: string;
}

export interface SeedSubject {
  slug: string;
  name: string;
  description: string;
  /** Education levels at which the subject is taught (qualification matching). */
  levels: string[];
  subSubjects?: { slug: string; name: string; description?: string }[];
  topics: {
    slug: string;
    name: string;
    description?: string;
    /** Optional parent sub-subject slug. */
    subSubject?: string;
    subtopics?: { slug: string; name: string; description?: string }[];
  }[];
}

export interface SeedExam {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  type: "JOB" | "ADMISSION" | "COMPETITIVE" | "EDUCATIONAL" | "GENERAL" | "PROFESSIONAL";
  province?: string;
  isFeatured?: boolean;
  sortOrder: number;
  educationLevels: string[];
  subjects: string[];
  /** Category slug (hierarchy top level). */
  category?: string;
  /** Conducting authority slug. */
  organization?: string;
  /** Structured metadata surfaced on preparation pages. */
  eligibility?: string;
  testPattern?: string;
  syllabus?: string;
  duration?: string;
  totalMarks?: string;
  website?: string;
  configuration: {
    mode: "STATIC" | "RANDOM";
    defaultQuestionCount: number;
    timeLimitMinutes: number;
    negativeMarking: boolean;
    negativeMarkFactor?: number;
    marksPerQuestion?: number;
    passingPercentage?: number;
    staticOrderSeed?: string;
  };
}

export const EDUCATION_LEVELS: SeedEducationLevel[] = [
  {
    slug: "primary",
    name: "Primary (Class 1–5)",
    rank: 1,
    description: "Foundational schooling level.",
  },
  {
    slug: "middle",
    name: "Middle (Class 6–8)",
    rank: 2,
    description: "Middle school level.",
  },
  {
    slug: "matric",
    name: "Matric / SSC (Class 9–10)",
    rank: 3,
    description: "Secondary school certificate level.",
  },
  {
    slug: "intermediate",
    name: "Intermediate / HSSC (Class 11–12)",
    rank: 4,
    description: "Higher secondary certificate level.",
  },
  {
    slug: "graduation",
    name: "Graduation (Bachelor)",
    rank: 5,
    description: "Bachelor's degree level.",
  },
  {
    slug: "post-graduation",
    name: "Post-Graduation (Master/MPhil)",
    rank: 6,
    description: "Master's and MPhil level.",
  },
  {
    slug: "doctorate",
    name: "Doctorate (PhD)",
    rank: 7,
    description: "Doctoral research level.",
  },
];

export { SUBJECTS } from "./taxonomy/subjects";

export const SOCIAL_LINKS_DEFAULT = {
  facebook: "",
  youtube: "",
  instagram: "",
  x: "",
  linkedin: "",
  whatsapp: "",
};

export const SITE_SETTINGS_DEFAULT = [
  {
    key: "site.identity",
    group: "general",
    value: {
      name: "MCQ Prep",
      tagline: "Practice MCQs for jobs, admissions and competitive exams",
      contactEmail: "support@example.com",
      contactPhone: "",
      address: "",
    },
  },
  { key: "site.social", group: "social", value: SOCIAL_LINKS_DEFAULT },
  {
    key: "site.features",
    group: "features",
    value: {
      allowGuestQuizzes: true,
      allowGuestReports: true,
      showQuestionStats: true,
      requireEmailVerification: false,
    },
  },
  {
    key: "site.seo",
    group: "seo",
    value: {
      defaultTitleSuffix: "MCQ Prep",
      twitterHandle: "",
      googleSiteVerification: "",
      bingSiteVerification: "",
    },
  },
];
