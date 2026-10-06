import type { PrepPageType } from "@prisma/client";

/**
 * URL slugs for preparation page types. Keeping the mapping here (rather than in
 * each route) means every exam's pages share one canonical URL shape.
 */
export const PREP_TYPE_SLUG: Record<PrepPageType, string> = {
  OVERVIEW: "overview",
  ELIGIBILITY: "eligibility",
  SYLLABUS: "syllabus",
  PATTERN: "paper-pattern",
  SUBJECTS: "subjects",
  TOPICS: "topics",
  STRATEGY: "strategy",
  NOTES: "notes",
  FAQ: "faq",
  PREPARATION: "preparation-guide",
};

export const PREP_TYPE_LABEL: Record<PrepPageType, string> = {
  OVERVIEW: "Overview",
  ELIGIBILITY: "Eligibility",
  SYLLABUS: "Syllabus",
  PATTERN: "Paper Pattern",
  SUBJECTS: "Subjects",
  TOPICS: "Topics",
  STRATEGY: "Strategy",
  NOTES: "Notes",
  FAQ: "FAQ",
  PREPARATION: "Preparation Guide",
};

const SLUG_TO_TYPE = Object.fromEntries(
  Object.entries(PREP_TYPE_SLUG).map(([type, slug]) => [slug, type as PrepPageType]),
) as Record<string, PrepPageType>;

export function prepTypeFromSlug(slug: string): PrepPageType | null {
  return SLUG_TO_TYPE[slug] ?? null;
}

export function prepTypePath(examSlug: string, type: PrepPageType): string {
  return `/exams/${examSlug}/preparation/${PREP_TYPE_SLUG[type]}`;
}
