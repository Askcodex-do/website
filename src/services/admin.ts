import "@/lib/server-guard";

import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { audit } from "@/lib/audit";
import { contentHash } from "@/lib/utils";

/**
 * AdminService — all privileged mutations live here so the admin UI stays a thin
 * presentation layer and the same operations can be reused by the bulk importer
 * or a future API.
 */

export const questionInputSchema = z.object({
  stem: z.string().trim().min(5, "Question text is required").max(2000),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
    .optional()
    .or(z.literal("")),
  options: z
    .array(z.string().trim().min(1, "Every option needs text").max(500))
    .length(4, "Exactly four options are required"),
  correctIndex: z.coerce.number().int().min(0).max(3),
  explanation: z.string().trim().max(4000).optional().or(z.literal("")),
  source: z.string().trim().max(300).optional().or(z.literal("")),
  reference: z.string().trim().max(300).optional().or(z.literal("")),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  subjectId: z.string().min(1, "Subject is required"),
  topicId: z.string().min(1, "Topic is required"),
  examIds: z.array(z.string()).default([]),
  educationLevelIds: z.array(z.string()).default([]),
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  province: z.string().trim().max(80).optional().or(z.literal("")),
  tags: z.string().trim().max(300).optional().or(z.literal("")),
});

export type QuestionInput = z.infer<typeof questionInputSchema>;

const LABELS = ["A", "B", "C", "D"];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = base || "question";
  let candidate = root;
  let counter = 1;
  // Loop rather than append a random suffix so slugs stay clean and readable.
  for (;;) {
    const existing = await db.question.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    candidate = `${root}-${++counter}`;
  }
}

async function resolveTagIds(tags: string): Promise<string[]> {
  const slugs = Array.from(
    new Set(
      tags
        .split(",")
        .map((tag) => slugify(tag))
        .filter(Boolean),
    ),
  );
  const ids: string[] = [];
  for (const slug of slugs) {
    const tag = await db.tag.upsert({
      where: { slug },
      update: {},
      create: { slug, name: slug.replace(/-/g, " ") },
      select: { id: true },
    });
    ids.push(tag.id);
  }
  return ids;
}

function hashFor(input: { stem: string; options: string[]; correct: string }) {
  return contentHash(input);
}

export async function createQuestion(
  input: QuestionInput,
  actorId: string,
): Promise<{ id: string; slug: string }> {
  const slug = await uniqueSlug(input.slug || slugify(input.stem));
  const tagIds = await resolveTagIds(input.tags ?? "");
  const hash = hashFor({
    stem: input.stem,
    options: input.options,
    correct: input.options[input.correctIndex] ?? "",
  });

  const question = await db.question.create({
    data: {
      slug,
      stem: input.stem,
      explanation: input.explanation || null,
      source: input.source || null,
      reference: input.reference || null,
      difficulty: input.difficulty,
      status: input.status,
      year: input.year ?? null,
      province: input.province || null,
      contentHash: hash,
      createdById: actorId,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      options: {
        create: input.options.map((text, index) => ({
          label: LABELS[index],
          text,
          isCorrect: index === input.correctIndex,
          sortOrder: index,
        })),
      },
      subjects: { create: { subjectId: input.subjectId } },
      topics: { create: { topicId: input.topicId } },
      exams: { create: input.examIds.map((examId) => ({ examId })) },
      educationLevels: {
        create: input.educationLevelIds.map((educationLevelId) => ({
          educationLevelId,
        })),
      },
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
    select: { id: true, slug: true },
  });

  await audit({
    actorId,
    action: "question.create",
    entityType: "question",
    entityId: question.id,
    metadata: { slug: question.slug },
  });
  return question;
}

export async function updateQuestion(
  id: string,
  input: QuestionInput,
  actorId: string,
): Promise<{ id: string; slug: string }> {
  const existing = await db.question.findUniqueOrThrow({ where: { id } });
  const slug =
    input.slug && input.slug !== existing.slug
      ? await uniqueSlug(input.slug, id)
      : existing.slug;
  const tagIds = await resolveTagIds(input.tags ?? "");
  const hash = hashFor({
    stem: input.stem,
    options: input.options,
    correct: input.options[input.correctIndex] ?? "",
  });

  // Relations are replaced wholesale inside one transaction so a question never
  // ends up with stale exam/subject links.
  await db.$transaction([
    db.question.update({
      where: { id },
      data: {
        slug,
        stem: input.stem,
        explanation: input.explanation || null,
        source: input.source || null,
        reference: input.reference || null,
        difficulty: input.difficulty,
        status: input.status,
        year: input.year ?? null,
        province: input.province || null,
        contentHash: hash,
        publishedAt:
          input.status === "PUBLISHED"
            ? (existing.publishedAt ?? new Date())
            : existing.publishedAt,
      },
    }),
    db.questionOption.deleteMany({ where: { questionId: id } }),
    db.questionOption.createMany({
      data: input.options.map((text, index) => ({
        questionId: id,
        label: LABELS[index],
        text,
        isCorrect: index === input.correctIndex,
        sortOrder: index,
      })),
    }),
    db.questionSubject.deleteMany({ where: { questionId: id } }),
    db.questionSubject.create({ data: { questionId: id, subjectId: input.subjectId } }),
    db.questionTopic.deleteMany({ where: { questionId: id } }),
    db.questionTopic.create({ data: { questionId: id, topicId: input.topicId } }),
    db.questionExam.deleteMany({ where: { questionId: id } }),
    db.questionExam.createMany({
      data: input.examIds.map((examId) => ({ questionId: id, examId })),
      skipDuplicates: true,
    }),
    db.questionEducationLevel.deleteMany({ where: { questionId: id } }),
    db.questionEducationLevel.createMany({
      data: input.educationLevelIds.map((educationLevelId) => ({
        questionId: id,
        educationLevelId,
      })),
      skipDuplicates: true,
    }),
    db.questionTag.deleteMany({ where: { questionId: id } }),
    db.questionTag.createMany({
      data: tagIds.map((tagId) => ({ questionId: id, tagId })),
      skipDuplicates: true,
    }),
  ]);

  await audit({
    actorId,
    action: "question.update",
    entityType: "question",
    entityId: id,
    metadata: { slug },
  });
  return { id, slug };
}

export async function setQuestionStatus(
  id: string,
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  actorId: string,
): Promise<void> {
  await db.question.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : undefined,
    },
  });
  await audit({
    actorId,
    action: "question.status",
    entityType: "question",
    entityId: id,
    metadata: { status },
  });
}

/** Archive rather than hard-delete — attempts reference questions historically. */
export async function archiveQuestion(id: string, actorId: string): Promise<void> {
  await setQuestionStatus(id, "ARCHIVED", actorId);
}

export interface AdminQuestionFilters {
  search?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  subjectId?: string;
  examId?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  page?: number;
  pageSize?: number;
}

export async function listAdminQuestions(filters: AdminQuestionFilters = {}) {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(Math.max(filters.pageSize ?? 25, 5), 100);

  const where: Prisma.QuestionWhereInput = {};
  if (filters.status) where.status = filters.status;
  if (filters.difficulty) where.difficulty = filters.difficulty;
  if (filters.subjectId) where.subjects = { some: { subjectId: filters.subjectId } };
  if (filters.examId) where.exams = { some: { examId: filters.examId } };
  if (filters.search?.trim()) {
    const term = filters.search.trim();
    where.OR = [
      { stem: { contains: term, mode: "insensitive" } },
      { slug: { contains: term, mode: "insensitive" } },
    ];
  }

  const [rows, total] = await Promise.all([
    db.question.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        subjects: { select: { subject: { select: { name: true, slug: true } } } },
        exams: { select: { exam: { select: { name: true } } } },
        options: { orderBy: { sortOrder: "asc" } },
      },
    }),
    db.question.count({ where }),
  ]);

  return { rows, total, page, pageSize, pageCount: Math.ceil(total / pageSize) };
}

export async function getAdminQuestion(id: string) {
  return db.question.findUnique({
    where: { id },
    include: {
      options: { orderBy: { sortOrder: "asc" } },
      subjects: true,
      topics: true,
      exams: true,
      educationLevels: true,
      tags: { include: { tag: true } },
    },
  });
}

export async function listTaxonomyForAdmin() {
  const [exams, subjects, topics, levels, categories, organizations, subSubjects, subtopics] =
    await Promise.all([
      db.exam.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { configuration: true },
      }),
      db.subject.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
      db.topic.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { subject: { select: { name: true } } },
      }),
      db.educationLevel.findMany({ orderBy: { rank: "asc" } }),
      db.category.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
      db.organization.findMany({ orderBy: { name: "asc" } }),
      db.subSubject.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { subject: { select: { name: true } } },
      }),
      db.subtopic.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { topic: { select: { name: true } } },
      }),
    ]);

  // One grouped query per relation keeps the taxonomy page O(1) queries.
  const [examCounts, subjectCounts] = await Promise.all([
    db.questionExam.groupBy({ by: ["examId"], _count: { questionId: true } }),
    db.questionSubject.groupBy({ by: ["subjectId"], _count: { questionId: true } }),
  ]);
  const examCount = new Map(examCounts.map((c) => [c.examId, c._count.questionId]));
  const subjectCount = new Map(
    subjectCounts.map((c) => [c.subjectId, c._count.questionId]),
  );

  return {
    exams: exams.map((exam) => ({
      ...exam,
      questionCount: examCount.get(exam.id) ?? 0,
    })),
    subjects: subjects.map((subject) => ({
      ...subject,
      questionCount: subjectCount.get(subject.id) ?? 0,
    })),
    topics,
    levels,
    categories,
    organizations,
    subSubjects,
    subtopics,
  };
}

export async function listUsersForAdmin(search?: string) {
  return db.user.findMany({
    where: search?.trim()
      ? { email: { contains: search.trim(), mode: "insensitive" } }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { role: { select: { key: true, name: true } } },
  });
}

export async function setUserRole(
  userId: string,
  roleKey: string,
  actorId: string,
): Promise<void> {
  const role = await db.role.findUniqueOrThrow({ where: { key: roleKey } });
  await db.user.update({ where: { id: userId }, data: { roleId: role.id } });
  await audit({
    actorId,
    action: "user.role",
    entityType: "user",
    entityId: userId,
    metadata: { roleKey },
  });
}

export async function setUserStatus(
  userId: string,
  status: "ACTIVE" | "SUSPENDED" | "DELETED",
  actorId: string,
): Promise<void> {
  await db.user.update({ where: { id: userId }, data: { status } });
  await audit({
    actorId,
    action: "user.status",
    entityType: "user",
    entityId: userId,
    metadata: { status },
  });
}

export async function listReports(status?: "OPEN" | "REVIEWING" | "RESOLVED" | "DISMISSED") {
  return db.report.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      question: { select: { id: true, slug: true, stem: true } },
      user: { select: { email: true } },
    },
  });
}

export async function resolveReport(
  reportId: string,
  status: "REVIEWING" | "RESOLVED" | "DISMISSED",
  actorId: string,
  note?: string,
): Promise<void> {
  await db.report.update({
    where: { id: reportId },
    data: {
      status,
      resolutionNote: note?.trim() || null,
      resolvedById: actorId,
      resolvedAt: status === "RESOLVED" || status === "DISMISSED" ? new Date() : null,
    },
  });
  await audit({
    actorId,
    action: "report.resolve",
    entityType: "report",
    entityId: reportId,
    metadata: { status },
  });
}

export async function listContactMessages(
  status?: "NEW" | "READ" | "REPLIED" | "SPAM",
) {
  return db.contactMessage.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function setContactStatus(
  messageId: string,
  status: "NEW" | "READ" | "REPLIED" | "SPAM",
  actorId: string,
): Promise<void> {
  await db.contactMessage.update({ where: { id: messageId }, data: { status } });
  await audit({
    actorId,
    action: "contact.status",
    entityType: "contact_message",
    entityId: messageId,
    metadata: { status },
  });
}
