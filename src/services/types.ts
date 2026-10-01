import type {
  Difficulty,
  ExamMode,
  ExamType,
  QuestionLanguage,
  QuestionStatus,
  QuestionType,
} from "@prisma/client";

/** A question as exposed to the public — never includes the correct answer. */
export interface PublicQuestionOption {
  id: string;
  label: string;
  text: string;
}

export interface PublicQuestion {
  id: string;
  slug: string;
  stem: string;
  explanation: string | null;
  source: string | null;
  reference: string | null;
  difficulty: Difficulty;
  type: QuestionType;
  language: QuestionLanguage;
  status: QuestionStatus;
  year: number | null;
  province: string | null;
  likeCount: number;
  bookmarkCount: number;
  viewCount: number;
  timesAnswered: number;
  timesCorrect: number;
  options: PublicQuestionOption[];
  subject: { slug: string; name: string } | null;
  topic: { slug: string; name: string } | null;
  exams: Array<{ slug: string; name: string }>;
}

/** A question including the correct option — only after the user has answered. */
export interface GradedQuestion extends PublicQuestion {
  correctOptionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
}

export interface ExamSummary {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  description: string | null;
  type: ExamType;
  province: string | null;
  isFeatured: boolean;
  sortOrder: number;
  mode: ExamMode;
  defaultQuestionCount: number;
  timeLimitMinutes: number;
  negativeMarking: boolean;
  questionCount?: number;
}

export interface SubjectSummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  topicCount?: number;
  questionCount?: number;
}

export interface TopicSummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  subject: { slug: string; name: string };
  questionCount?: number;
}

export interface EducationLevelSummary {
  id: string;
  slug: string;
  name: string;
  rank: number;
  description: string | null;
}

/** Filters accepted by the Question Selection Engine. */
export interface QuestionFilters {
  exam?: string;
  subject?: string;
  topic?: string;
  educationLevel?: string;
  difficulty?: Difficulty;
  province?: string;
  year?: number;
  tag?: string;
  search?: string;
  /** 1..100 */
  limit?: number;
  mode?: "static" | "random";
  /** Stable page number for STATIC mode. */
  page?: number;
  /** Offset for static pagination. */
  offset?: number;
  excludeIds?: string[];
}

export interface ResolvedExamConfig {
  examId: string;
  examSlug: string;
  examName: string;
  mode: ExamMode;
  defaultQuestionCount: number;
  timeLimitMinutes: number;
  negativeMarking: boolean;
  negativeMarkFactor: number;
  marksPerQuestion: number;
  passingPercentage: number;
  staticOrderSeed: string | null;
  educationLevelIds: string[];
  subjectIds: string[];
}

export interface SelectionResult {
  questions: PublicQuestion[];
  /** Total questions matching the filters (before the limit is applied). */
  total: number;
  mode: ExamMode;
  config: ResolvedExamConfig | null;
  appliedFilters: {
    exam?: string;
    subject?: string;
    topic?: string;
    educationLevel?: string;
    difficulty?: Difficulty;
    province?: string;
    year?: number;
    tag?: string;
    search?: string;
  };
}

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;
