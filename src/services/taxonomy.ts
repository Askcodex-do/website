import "@/lib/server-guard";

import { db } from "@/lib/db";
import type {
  EducationLevelSummary,
  ExamSummary,
  SubjectSummary,
  TopicSummary,
} from "@/services/types";

/** Public, cached-friendly reads of the exam/subject/topic taxonomy. */

export interface CategorySummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  examCount?: number;
}

export interface OrganizationSummary {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  website: string | null;
  description: string | null;
  examCount?: number;
}

export async function listCategories(): Promise<CategorySummary[]> {
  const categories = await db.category.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { exams: true } } },
  });
  return categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    icon: c.icon,
    examCount: c._count.exams,
  }));
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategorySummary | null> {
  const category = await db.category.findFirst({
    where: { slug, isActive: true },
    include: { _count: { select: { exams: true } } },
  });
  if (!category) return null;
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    icon: category.icon,
    examCount: category._count.exams,
  };
}

export async function listOrganizations(): Promise<OrganizationSummary[]> {
  const orgs = await db.organization.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: { _count: { select: { exams: true } } },
  });
  return orgs.map((o) => ({
    id: o.id,
    slug: o.slug,
    name: o.name,
    shortName: o.shortName,
    website: o.website,
    description: o.description,
    examCount: o._count.exams,
  }));
}

export async function getOrganizationBySlug(
  slug: string,
): Promise<OrganizationSummary | null> {
  const org = await db.organization.findFirst({
    where: { slug, isActive: true },
    include: { _count: { select: { exams: true } } },
  });
  if (!org) return null;
  return {
    id: org.id,
    slug: org.slug,
    name: org.name,
    shortName: org.shortName,
    website: org.website,
    description: org.description,
    examCount: org._count.exams,
  };
}

/** Sub-subjects belonging to a subject. */
export async function listSubSubjects(subjectSlug?: string) {
  const rows = await db.subSubject.findMany({
    where: {
      isActive: true,
      ...(subjectSlug ? { subject: { slug: subjectSlug, isActive: true } } : {}),
    },
    orderBy: [{ subjectId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: {
      subject: { select: { slug: true, name: true } },
      _count: { select: { topics: true } },
    },
  });
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    subject: r.subject,
    topicCount: r._count.topics,
  }));
}

/** Subtopics belonging to a topic. */
export async function listSubtopics(topicSlug?: string) {
  const rows = await db.subtopic.findMany({
    where: {
      isActive: true,
      ...(topicSlug ? { topic: { slug: topicSlug, isActive: true } } : {}),
    },
    orderBy: [{ topicId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: { topic: { select: { slug: true, name: true } } },
  });
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    topic: r.topic,
  }));
}

export async function listExams(options?: {
  featuredOnly?: boolean;
  categorySlug?: string;
  organizationSlug?: string;
}): Promise<ExamSummary[]> {
  const exams = await db.exam.findMany({
    where: {
      isActive: true,
      ...(options?.featuredOnly ? { isFeatured: true } : {}),
      ...(options?.categorySlug
        ? { category: { slug: options.categorySlug, isActive: true } }
        : {}),
      ...(options?.organizationSlug
        ? { organization: { slug: options.organizationSlug, isActive: true } }
        : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { configuration: true },
  });

  // Question counts per exam in a single grouped query.
  const counts = await db.questionExam.groupBy({
    by: ["examId"],
    _count: { questionId: true },
  });
  const countByExam = new Map(counts.map((c) => [c.examId, c._count.questionId]));

  return exams.map((exam) => ({
    id: exam.id,
    slug: exam.slug,
    name: exam.name,
    shortName: exam.shortName,
    description: exam.description,
    type: exam.type,
    province: exam.province,
    isFeatured: exam.isFeatured,
    sortOrder: exam.sortOrder,
    mode: exam.configuration?.mode ?? "RANDOM",
    defaultQuestionCount: exam.configuration?.defaultQuestionCount ?? 20,
    timeLimitMinutes: exam.configuration?.timeLimitMinutes ?? 30,
    negativeMarking: exam.configuration?.negativeMarking ?? false,
    questionCount: countByExam.get(exam.id) ?? 0,
  }));
}

export async function getExamBySlug(slug: string): Promise<ExamSummary | null> {
  const exam = await db.exam.findFirst({
    where: { slug, isActive: true },
    include: { configuration: true },
  });
  if (!exam) return null;
  const count = await db.questionExam.count({ where: { examId: exam.id } });
  return {
    id: exam.id,
    slug: exam.slug,
    name: exam.name,
    shortName: exam.shortName,
    description: exam.description,
    type: exam.type,
    province: exam.province,
    isFeatured: exam.isFeatured,
    sortOrder: exam.sortOrder,
    mode: exam.configuration?.mode ?? "RANDOM",
    defaultQuestionCount: exam.configuration?.defaultQuestionCount ?? 20,
    timeLimitMinutes: exam.configuration?.timeLimitMinutes ?? 30,
    negativeMarking: exam.configuration?.negativeMarking ?? false,
    questionCount: count,
  };
}

/** Subjects belonging to an exam (via its blueprint) or all subjects. */
export async function listSubjects(options?: {
  examSlug?: string;
}): Promise<SubjectSummary[]> {
  const subjects = await db.subject.findMany({
    where: {
      isActive: true,
      ...(options?.examSlug
        ? { exams: { some: { exam: { slug: options.examSlug, isActive: true } } } }
        : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { topics: true } } },
  });

  const counts = await db.questionSubject.groupBy({
    by: ["subjectId"],
    _count: { questionId: true },
  });
  const countBySubject = new Map(
    counts.map((c) => [c.subjectId, c._count.questionId]),
  );

  return subjects.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    icon: s.icon,
    topicCount: s._count.topics,
    questionCount: countBySubject.get(s.id) ?? 0,
  }));
}

export async function getSubjectBySlug(
  slug: string,
): Promise<SubjectSummary | null> {
  const subject = await db.subject.findFirst({
    where: { slug, isActive: true },
    include: { _count: { select: { topics: true } } },
  });
  if (!subject) return null;
  const count = await db.questionSubject.count({
    where: { subjectId: subject.id, question: { status: "PUBLISHED" } },
  });
  return {
    id: subject.id,
    slug: subject.slug,
    name: subject.name,
    description: subject.description,
    icon: subject.icon,
    topicCount: subject._count.topics,
    questionCount: count,
  };
}

export async function listTopics(options?: {
  subjectSlug?: string;
}): Promise<TopicSummary[]> {
  const topics = await db.topic.findMany({
    where: {
      isActive: true,
      ...(options?.subjectSlug
        ? { subject: { slug: options.subjectSlug, isActive: true } }
        : {}),
    },
    orderBy: [{ subjectId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: { subject: { select: { slug: true, name: true } } },
  });

  const counts = await db.questionTopic.groupBy({
    by: ["topicId"],
    _count: { questionId: true },
  });
  const countByTopic = new Map(counts.map((c) => [c.topicId, c._count.questionId]));

  return topics.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    description: t.description,
    subject: t.subject,
    questionCount: countByTopic.get(t.id) ?? 0,
  }));
}

export async function getTopicBySlug(slug: string): Promise<TopicSummary | null> {
  const topic = await db.topic.findFirst({
    where: { slug, isActive: true },
    include: { subject: { select: { slug: true, name: true } } },
  });
  if (!topic) return null;
  const count = await db.questionTopic.count({
    where: { topicId: topic.id, question: { status: "PUBLISHED" } },
  });
  return {
    id: topic.id,
    slug: topic.slug,
    name: topic.name,
    description: topic.description,
    subject: topic.subject,
    questionCount: count,
  };
}

export async function listEducationLevels(): Promise<EducationLevelSummary[]> {
  const levels = await db.educationLevel.findMany({
    where: { isActive: true },
    orderBy: { rank: "asc" },
  });
  return levels.map((l) => ({
    id: l.id,
    slug: l.slug,
    name: l.name,
    rank: l.rank,
    description: l.description,
  }));
}

/** Lightweight counts for the home page and dashboards. */
export async function getPlatformStats(): Promise<{
  questions: number;
  exams: number;
  subjects: number;
  topics: number;
}> {
  const [questions, exams, subjects, topics] = await Promise.all([
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.exam.count({ where: { isActive: true } }),
    db.subject.count({ where: { isActive: true } }),
    db.topic.count({ where: { isActive: true } }),
  ]);
  return { questions, exams, subjects, topics };
}
