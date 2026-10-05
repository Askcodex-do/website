import "@/lib/server-guard";

import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { clamp, seededRandom, shuffle } from "@/lib/utils";
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  type PublicQuestion,
  type QuestionFilters,
  type ResolvedExamConfig,
  type SelectionResult,
} from "@/services/types";

/**
 * QuestionSelectionService — the single source of truth for choosing questions.
 *
 * Every consumer (MCQ browsing, quizzes, search, dashboard, and any future
 * mobile/API client) goes through this service. Exams are resolved to a set of
 * subject/topic/education filters via ExamConfiguration rows; no exam is ever
 * special-cased in application code.
 */

const QUESTION_INCLUDE = {
  options: { orderBy: { sortOrder: "asc" as const } },
  subjects: { include: { subject: { select: { slug: true, name: true } } } },
  subSubjects: { include: { subSubject: { select: { slug: true, name: true } } } },
  topics: { include: { topic: { select: { slug: true, name: true } } } },
  exams: { include: { exam: { select: { slug: true, name: true } } } },
} satisfies Prisma.QuestionInclude;

type QuestionWithRelations = Prisma.QuestionGetPayload<{
  include: typeof QUESTION_INCLUDE;
}>;

/** Strip the correct answer before a question ever reaches the browser. */
export function toPublicQuestion(question: QuestionWithRelations): PublicQuestion {
  return {
    id: question.id,
    slug: question.slug,
    stem: question.stem,
    explanation: question.explanation,
    source: question.source,
    reference: question.reference,
    difficulty: question.difficulty,
    type: question.type,
    language: question.language,
    status: question.status,
    verification: question.verification,
    origin: question.origin,
    year: question.year,
    province: question.province,
    likeCount: question.likeCount,
    bookmarkCount: question.bookmarkCount,
    viewCount: question.viewCount,
    timesAnswered: question.timesAnswered,
    timesCorrect: question.timesCorrect,
    options: question.options.map((o) => ({
      id: o.id,
      label: o.label,
      text: o.text,
    })),
    subject: question.subjects[0]?.subject ?? null,
    subSubject: question.subSubjects[0]?.subSubject ?? null,
    topic: question.topics[0]?.topic ?? null,
    exams: question.exams.map((e) => e.exam),
  };
}

/** Resolve an exam slug to its configuration + linked taxonomy. */
export async function resolveExamConfig(
  examSlug: string,
): Promise<ResolvedExamConfig | null> {
  const exam = await db.exam.findFirst({
    where: { slug: examSlug, isActive: true },
    include: {
      configuration: true,
      educationLevels: { select: { educationLevelId: true } },
      subjects: { select: { subjectId: true } },
    },
  });
  if (!exam) return null;

  const config = exam.configuration;
  return {
    examId: exam.id,
    examSlug: exam.slug,
    examName: exam.name,
    mode: config?.mode ?? "RANDOM",
    defaultQuestionCount: config?.defaultQuestionCount ?? DEFAULT_LIMIT,
    timeLimitMinutes: config?.timeLimitMinutes ?? 30,
    negativeMarking: config?.negativeMarking ?? false,
    negativeMarkFactor: config?.negativeMarkFactor ?? 0,
    marksPerQuestion: config?.marksPerQuestion ?? 1,
    passingPercentage: config?.passingPercentage ?? 50,
    staticOrderSeed: config?.staticOrderSeed ?? null,
    educationLevelIds: exam.educationLevels.map((l) => l.educationLevelId),
    subjectIds: exam.subjects.map((s) => s.subjectId),
  };
}

export interface ResolvedTaxonomy {
  examId?: string;
  categoryId?: string;
  organizationId?: string;
  subjectId?: string;
  subSubjectId?: string;
  topicId?: string;
  subtopicId?: string;
  educationLevelId?: string;
  tagId?: string;
}

export async function resolveTaxonomyIds(
  filters: QuestionFilters,
): Promise<ResolvedTaxonomy> {
  const [
    exam,
    category,
    organization,
    subject,
    subSubject,
    topic,
    subtopic,
    educationLevel,
    tag,
  ] = await Promise.all([
    filters.exam
      ? db.exam.findFirst({
          where: { slug: filters.exam, isActive: true },
          select: { id: true },
        })
      : null,
    filters.category
      ? db.category.findFirst({
          where: { slug: filters.category, isActive: true },
          select: { id: true },
        })
      : null,
    filters.organization
      ? db.organization.findFirst({
          where: { slug: filters.organization, isActive: true },
          select: { id: true },
        })
      : null,
    filters.subject
      ? db.subject.findFirst({
          where: { slug: filters.subject, isActive: true },
          select: { id: true },
        })
      : null,
    filters.subSubject
      ? db.subSubject.findFirst({
          where: { slug: filters.subSubject, isActive: true },
          select: { id: true },
        })
      : null,
    filters.topic
      ? db.topic.findFirst({
          where: { slug: filters.topic, isActive: true },
          select: { id: true },
        })
      : null,
    filters.subtopic
      ? db.subtopic.findFirst({
          where: { slug: filters.subtopic, isActive: true },
          select: { id: true },
        })
      : null,
    filters.educationLevel
      ? db.educationLevel.findFirst({
          where: { slug: filters.educationLevel, isActive: true },
          select: { id: true },
        })
      : null,
    filters.tag
      ? db.tag.findFirst({ where: { slug: filters.tag }, select: { id: true } })
      : null,
  ]);

  return {
    examId: exam?.id,
    categoryId: category?.id,
    organizationId: organization?.id,
    subjectId: subject?.id,
    subSubjectId: subSubject?.id,
    topicId: topic?.id,
    subtopicId: subtopic?.id,
    educationLevelId: educationLevel?.id,
    tagId: tag?.id,
  };
}

/**
 * Build the Prisma `where` clause. This is where the engine enforces that an
 * exam/education selection can never surface an unrelated question:
 *   - an exam narrows results to that exam's linked subjects (unless the caller
 *     explicitly requests a subject, which must itself belong to the exam);
 *   - a category/organization narrows to questions linked to exams in it;
 *   - an education level narrows to questions tagged with that level.
 */
export function buildQuestionWhere(
  filters: QuestionFilters,
  ids: ResolvedTaxonomy,
  config: ResolvedExamConfig | null,
): Prisma.QuestionWhereInput {
  const where: Prisma.QuestionWhereInput = { status: "PUBLISHED" };
  const and: Prisma.QuestionWhereInput[] = [];

  if (filters.difficulty) where.difficulty = filters.difficulty;
  if (filters.year) where.year = filters.year;
  if (filters.province) where.province = filters.province;

  if (filters.search) {
    const term = filters.search.trim();
    if (term) {
      where.OR = [
        { stem: { contains: term, mode: "insensitive" } },
        { explanation: { contains: term, mode: "insensitive" } },
      ];
    }
  }

  // Category / organization scope (via the exams a question belongs to).
  if (ids.categoryId) {
    and.push({ exams: { some: { exam: { categoryId: ids.categoryId } } } });
  }
  if (ids.organizationId) {
    and.push({
      exams: { some: { exam: { organizationId: ids.organizationId } } },
    });
  }

  // Exam scoping: intersect the requested subject/topic with the exam blueprint.
  if (ids.examId) {
    if (ids.subjectId) {
      // A subject explicitly requested under an exam must be part of the exam.
      if (config && config.subjectIds.length > 0) {
        and.push(
          { subjects: { some: { subjectId: ids.subjectId } } },
          { subjects: { some: { subjectId: { in: config.subjectIds } } } },
        );
      } else {
        and.push({ subjects: { some: { subjectId: ids.subjectId } } });
      }
    } else if (config && config.subjectIds.length > 0) {
      and.push({ subjects: { some: { subjectId: { in: config.subjectIds } } } });
    } else {
      and.push({ exams: { some: { examId: ids.examId } } });
    }

    // Qualification gate: a question must share an education level with the
    // exam, so an exam can never surface material pitched at another stage.
    if (config && config.educationLevelIds.length > 0) {
      and.push({
        educationLevels: {
          some: { educationLevelId: { in: config.educationLevelIds } },
        },
      });
    }
  } else if (ids.subjectId) {
    and.push({ subjects: { some: { subjectId: ids.subjectId } } });
  }

  if (ids.subSubjectId) {
    and.push({ subSubjects: { some: { subSubjectId: ids.subSubjectId } } });
  }
  if (ids.topicId) and.push({ topics: { some: { topicId: ids.topicId } } });
  if (ids.subtopicId) {
    and.push({ subtopics: { some: { subtopicId: ids.subtopicId } } });
  }
  if (ids.educationLevelId) {
    and.push({
      educationLevels: { some: { educationLevelId: ids.educationLevelId } },
    });
  }
  if (ids.tagId) and.push({ tags: { some: { tagId: ids.tagId } } });

  if (filters.excludeIds && filters.excludeIds.length > 0) {
    where.id = { notIn: filters.excludeIds };
  }

  if (and.length > 0) where.AND = and;

  return where;
}

/** Ordering used by STATIC mode: explicit staticOrder, then a stable tiebreak. */
const STATIC_ORDER: Prisma.QuestionOrderByWithRelationInput[] = [
  { staticOrder: { sort: "asc", nulls: "last" } },
  { createdAt: "asc" },
  { id: "asc" },
];

export interface SelectOptions extends QuestionFilters {
  /** Called when an exam slug cannot be resolved. */
  onUnknownExam?: "ignore" | "empty";
  /**
   * Called when any other taxonomy slug (subject, topic, level, …) cannot be
   * resolved. Defaults to "ignore" for backward compatibility; pass "empty" to
   * fail closed so an unknown filter can never widen the result set.
   */
  onUnknownFilter?: "ignore" | "empty";
}

/** True when a filter was requested but did not resolve to a taxonomy row. */
export function hasUnresolvedFilter(
  filters: QuestionFilters,
  ids: ResolvedTaxonomy,
): boolean {
  return (
    (Boolean(filters.exam) && !ids.examId) ||
    (Boolean(filters.category) && !ids.categoryId) ||
    (Boolean(filters.organization) && !ids.organizationId) ||
    (Boolean(filters.subject) && !ids.subjectId) ||
    (Boolean(filters.subSubject) && !ids.subSubjectId) ||
    (Boolean(filters.topic) && !ids.topicId) ||
    (Boolean(filters.subtopic) && !ids.subtopicId) ||
    (Boolean(filters.educationLevel) && !ids.educationLevelId) ||
    (Boolean(filters.tag) && !ids.tagId)
  );
}

/**
 * Main entry point. Resolves filters, applies exam configuration, and returns
 * questions in STATIC (deterministic) or RANDOM (shuffled) order.
 */
export async function getQuestions(
  options: SelectOptions = {},
): Promise<SelectionResult> {
  const limit = clamp(options.limit ?? DEFAULT_LIMIT, 1, MAX_LIMIT);
  const page = Math.max(1, options.page ?? 1);

  const config = options.exam ? await resolveExamConfig(options.exam) : null;
  if (options.exam && !config && options.onUnknownExam === "empty") {
    return {
      questions: [],
      total: 0,
      mode: "RANDOM",
      config: null,
      appliedFilters: {},
    };
  }

  const ids = await resolveTaxonomyIds(options);
  if (options.onUnknownFilter === "empty" && hasUnresolvedFilter(options, ids)) {
    return {
      questions: [],
      total: 0,
      mode: "RANDOM",
      config,
      appliedFilters: pickAppliedFilters(options),
    };
  }

  const where = buildQuestionWhere(options, ids, config);

  // Effective mode: explicit request wins, otherwise the exam's configuration,
  // otherwise RANDOM.
  const mode: "STATIC" | "RANDOM" = options.mode
    ? options.mode.toUpperCase() === "STATIC"
      ? "STATIC"
      : "RANDOM"
    : (config?.mode ?? "RANDOM");

  const total = await db.question.count({ where });

  if (mode === "STATIC") {
    const offset = options.offset ?? (page - 1) * limit;
    const rows = await db.question.findMany({
      where,
      orderBy: STATIC_ORDER,
      skip: offset,
      take: limit,
      include: QUESTION_INCLUDE,
    });
    return {
      questions: rows.map(toPublicQuestion),
      total,
      mode: "STATIC",
      config,
      appliedFilters: pickAppliedFilters(options),
    };
  }

  // RANDOM: fetch a candidate window then shuffle in memory. Capping the window
  // keeps the query index-friendly and the payload small for large pools.
  const window = clamp(limit * 5, limit, 1000);
  const candidates = await db.question.findMany({
    where,
    orderBy: { id: "asc" },
    skip: total > window ? Math.floor(Math.random() * (total - window)) : 0,
    take: window,
    include: QUESTION_INCLUDE,
  });

  const seed =
    config?.staticOrderSeed ??
    `${options.exam ?? options.subject ?? options.topic ?? "all"}:${Date.now()}`;
  const rand = seededRandom(seed);
  const picked = shuffle(candidates, rand).slice(0, limit);

  return {
    questions: picked.map(toPublicQuestion),
    total,
    mode: "RANDOM",
    config,
    appliedFilters: pickAppliedFilters(options),
  };
}

/** Fetch a single public question by slug (without the correct answer). */
export async function getQuestionBySlug(
  slug: string,
): Promise<PublicQuestion | null> {
  const question = await db.question.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: QUESTION_INCLUDE,
  });
  return question ? toPublicQuestion(question) : null;
}

/**
 * Statically order questions for an exam's "PST MCQ 1..N" style listing.
 * Returns the full ordered slug list — callers paginate over it.
 */
export async function getStaticExamOrder(
  examSlug: string,
): Promise<string[]> {
  const config = await resolveExamConfig(examSlug);
  if (!config) return [];
  const ids = await resolveTaxonomyIds({ exam: examSlug });
  const where = buildQuestionWhere({ exam: examSlug }, ids, config);
  const rows = await db.question.findMany({
    where,
    orderBy: STATIC_ORDER,
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

function pickAppliedFilters(filters: QuestionFilters) {
  return {
    exam: filters.exam,
    category: filters.category,
    organization: filters.organization,
    subject: filters.subject,
    subSubject: filters.subSubject,
    topic: filters.topic,
    subtopic: filters.subtopic,
    educationLevel: filters.educationLevel,
    difficulty: filters.difficulty,
    province: filters.province,
    year: filters.year,
    tag: filters.tag,
    search: filters.search,
  };
}
