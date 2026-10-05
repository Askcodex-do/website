import "@/lib/server-guard";

import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { audit } from "@/lib/audit";

/**
 * AdminContentService — privileged management of the taxonomy hierarchy,
 * verification workflow, previous papers and reusable preparation pages.
 *
 * Kept separate from AdminService (which owns questions/users/reports) so the
 * content-management surface can grow without one giant module.
 */

// --- Verification workflow -------------------------------------------------

export const verificationSchema = z.object({
  status: z.enum([
    "UNVERIFIED",
    "PENDING_REVIEW",
    "VERIFIED",
    "REJECTED",
    "FLAGGED",
  ]),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type VerificationInput = z.infer<typeof verificationSchema>;

/**
 * Move a question through the verification workflow and record the reviewer.
 * A question can only be marked VERIFIED once it has a source or reference, so
 * "verified" always means something checkable.
 */
export async function setQuestionVerification(
  id: string,
  input: VerificationInput,
  reviewerId: string,
): Promise<{ id: string; verification: string }> {
  const question = await db.question.findUnique({
    where: { id },
    select: { source: true, reference: true, verification: true },
  });
  if (!question) throw new Error("Question not found");

  if (
    input.status === "VERIFIED" &&
    !question.source?.trim() &&
    !question.reference?.trim()
  ) {
    throw new Error(
      "Add a source or reference before marking a question verified.",
    );
  }

  await db.$transaction([
    db.question.update({
      where: { id },
      data: {
        verification: input.status,
        verifiedAt: input.status === "VERIFIED" ? new Date() : null,
        verifiedById: input.status === "VERIFIED" ? reviewerId : null,
      },
    }),
    db.questionReview.create({
      data: {
        questionId: id,
        reviewerId,
        fromStatus: question.verification,
        toStatus: input.status,
        note: input.note?.trim() ? input.note.trim() : null,
      },
    }),
  ]);

  await audit({
    actorId: reviewerId,
    action: "question.verify",
    entityType: "question",
    entityId: id,
    metadata: { status: input.status, previous: question.verification },
  });

  return { id, verification: input.status };
}

export interface VerificationQueueFilters {
  status?: VerificationStatusFilter;
  page?: number;
  pageSize?: number;
}

type VerificationStatusFilter = Prisma.QuestionWhereInput["verification"];

export async function listVerificationQueue(
  filters: VerificationQueueFilters = {},
) {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(Math.max(filters.pageSize ?? 25, 5), 100);

  const where: Prisma.QuestionWhereInput = {
    verification: filters.status ?? { in: ["UNVERIFIED", "PENDING_REVIEW", "FLAGGED"] },
  };

  const [rows, total, counts] = await Promise.all([
    db.question.findMany({
      where,
      orderBy: [{ updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        stem: true,
        slug: true,
        source: true,
        reference: true,
        origin: true,
        verification: true,
        difficulty: true,
        status: true,
        subjects: { take: 1, select: { subject: { select: { name: true } } } },
      },
    }),
    db.question.count({ where }),
    db.question.groupBy({
      by: ["verification"],
      _count: { _all: true },
    }),
  ]);

  return {
    rows,
    total,
    page,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
    counts: Object.fromEntries(
      counts.map((c) => [c.verification, c._count._all]),
    ) as Record<string, number>,
  };
}

// --- Previous papers -------------------------------------------------------

export const previousPaperSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
    .optional()
    .or(z.literal("")),
  title: z.string().trim().min(5).max(200),
  year: z.coerce.number().int().min(1900).max(2100),
  paperName: z.string().trim().max(200).optional().or(z.literal("")),
  session: z.string().trim().max(80).optional().or(z.literal("")),
  source: z.string().trim().max(300).optional().or(z.literal("")),
  reference: z.string().trim().max(300).optional().or(z.literal("")),
  examId: z.string().optional().or(z.literal("")),
  subjectId: z.string().optional().or(z.literal("")),
  isPublished: z.boolean().default(true),
});

export type PreviousPaperInput = z.infer<typeof previousPaperSchema>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function uniquePaperSlug(base: string, ignoreId?: string): Promise<string> {
  const root = base || "paper";
  let candidate = root;
  let counter = 1;
  for (;;) {
    const existing = await db.previousPaper.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    candidate = `${root}-${++counter}`;
  }
}

export async function createPreviousPaper(
  input: PreviousPaperInput,
  actorId: string,
): Promise<{ id: string; slug: string }> {
  const slug = await uniquePaperSlug(
    input.slug || slugify(`${input.title}-${input.year}`),
  );
  const paper = await db.previousPaper.create({
    data: {
      slug,
      title: input.title,
      year: input.year,
      paperName: input.paperName || null,
      session: input.session || null,
      source: input.source || null,
      reference: input.reference || null,
      examId: input.examId || null,
      subjectId: input.subjectId || null,
      isPublished: input.isPublished,
      // A paper is verified only when a source is supplied.
      verified: Boolean(input.source?.trim() || input.reference?.trim()),
    },
  });
  await audit({
    actorId,
    action: "previousPaper.create",
    entityType: "previousPaper",
    entityId: paper.id,
    metadata: { slug },
  });
  return { id: paper.id, slug };
}

export async function updatePreviousPaper(
  id: string,
  input: PreviousPaperInput,
  actorId: string,
): Promise<{ id: string; slug: string }> {
  const existing = await db.previousPaper.findUnique({ where: { id } });
  if (!existing) throw new Error("Paper not found");

  const slug = input.slug
    ? await uniquePaperSlug(input.slug, id)
    : existing.slug;

  await db.previousPaper.update({
    where: { id },
    data: {
      slug,
      title: input.title,
      year: input.year,
      paperName: input.paperName || null,
      session: input.session || null,
      source: input.source || null,
      reference: input.reference || null,
      examId: input.examId || null,
      subjectId: input.subjectId || null,
      isPublished: input.isPublished,
      verified: Boolean(input.source?.trim() || input.reference?.trim()),
    },
  });
  await audit({
    actorId,
    action: "previousPaper.update",
    entityType: "previousPaper",
    entityId: id,
    metadata: { slug },
  });
  return { id, slug };
}

export async function listPreviousPapersForAdmin() {
  return db.previousPaper.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    include: {
      exam: { select: { name: true } },
      subject: { select: { name: true } },
      _count: { select: { questions: true } },
    },
  });
}

// --- Preparation pages -----------------------------------------------------

const prepSectionSchema = z.object({
  heading: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(8000),
  bullets: z.array(z.string().trim().min(1).max(500)).optional(),
});

const prepFaqSchema = z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(4000),
});

export const prepPageSchema = z.object({
  examId: z.string().min(1, "Exam is required"),
  type: z.enum([
    "OVERVIEW",
    "ELIGIBILITY",
    "SYLLABUS",
    "PATTERN",
    "SUBJECTS",
    "TOPICS",
    "STRATEGY",
    "NOTES",
    "FAQ",
    "PREPARATION",
  ]),
  title: z.string().trim().min(3).max(200),
  summary: z.string().trim().max(400).optional().or(z.literal("")),
  sections: z.array(prepSectionSchema).default([]),
  faqs: z.array(prepFaqSchema).default([]),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  isPublished: z.boolean().default(true),
});

export type PrepPageInput = z.infer<typeof prepPageSchema>;

/**
 * Upsert a preparation page. One row per (exam, type) keeps the public URL
 * stable — /exams/{exam}/preparation/{type} — so new exams never need new code.
 */
export async function savePrepPage(
  input: PrepPageInput,
  actorId: string,
  id?: string,
): Promise<{ id: string }> {
  const data = {
    examId: input.examId,
    type: input.type,
    title: input.title,
    summary: input.summary || null,
    sections: (input.sections ?? []) as Prisma.InputJsonValue,
    faqs: (input.faqs ?? []) as Prisma.InputJsonValue,
    sortOrder: input.sortOrder,
    isPublished: input.isPublished,
  };

  const existing = id
    ? { id }
    : await db.prepPage.findFirst({
        where: { examId: input.examId, type: input.type },
        select: { id: true },
      });

  const page = existing
    ? await db.prepPage.update({ where: { id: existing.id }, data })
    : await db.prepPage.create({
        data: {
          ...data,
          slug: `${input.examId}-${input.type.toLowerCase()}`,
        },
      });

  await audit({
    actorId,
    action: "prepPage.save",
    entityType: "prepPage",
    entityId: page.id,
    metadata: { examId: input.examId, type: input.type },
  });
  return { id: page.id };
}

export async function listPrepPagesForAdmin(examId?: string) {
  return db.prepPage.findMany({
    where: examId ? { examId } : undefined,
    orderBy: [{ examId: "asc" }, { sortOrder: "asc" }],
    include: { exam: { select: { name: true, slug: true } } },
  });
}

// --- Taxonomy hierarchy ----------------------------------------------------

export const subSubjectSchema = z.object({
  subjectId: z.string().min(1),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional()
    .or(z.literal("")),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(400).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const subtopicSchema = z.object({
  topicId: z.string().min(1),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional()
    .or(z.literal("")),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(400).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export async function createSubSubject(
  input: z.infer<typeof subSubjectSchema>,
  actorId: string,
): Promise<{ id: string }> {
  const slug = input.slug || slugify(input.name);
  const row = await db.subSubject.upsert({
    where: { slug },
    update: {
      name: input.name,
      description: input.description || null,
      subjectId: input.subjectId,
      sortOrder: input.sortOrder,
    },
    create: {
      slug,
      name: input.name,
      description: input.description || null,
      subjectId: input.subjectId,
      sortOrder: input.sortOrder,
    },
  });
  await audit({
    actorId,
    action: "subSubject.save",
    entityType: "subSubject",
    entityId: row.id,
    metadata: { slug },
  });
  return { id: row.id };
}

export async function createSubtopic(
  input: z.infer<typeof subtopicSchema>,
  actorId: string,
): Promise<{ id: string }> {
  const slug = input.slug || slugify(input.name);
  const row = await db.subtopic.upsert({
    where: { slug },
    update: {
      name: input.name,
      description: input.description || null,
      topicId: input.topicId,
      sortOrder: input.sortOrder,
    },
    create: {
      slug,
      name: input.name,
      description: input.description || null,
      topicId: input.topicId,
      sortOrder: input.sortOrder,
    },
  });
  await audit({
    actorId,
    action: "subtopic.save",
    entityType: "subtopic",
    entityId: row.id,
    metadata: { slug },
  });
  return { id: row.id };
}

// --- Duplicate detection ---------------------------------------------------

export interface DuplicateGroup {
  key: string;
  count: number;
  sample: string;
  ids: string[];
}

/**
 * Find exact duplicates: questions whose stems match after normalising case and
 * whitespace. `contentHash` is unique by design, so this is the meaningful
 * "same question entered twice" signal that survives minor formatting drift.
 */
export async function findDuplicateQuestions(
  limit = 50,
): Promise<{ groups: DuplicateGroup[]; totalGroups: number }> {
  const rows = await db.question.findMany({
    where: { status: { not: "ARCHIVED" } },
    select: { id: true, stem: true },
    orderBy: { createdAt: "asc" },
    take: 20000,
  });

  const buckets = new Map<string, Array<{ id: string; stem: string }>>();
  for (const row of rows) {
    const key = row.stem.trim().toLowerCase().replace(/\s+/g, " ");
    const bucket = buckets.get(key) ?? [];
    bucket.push(row);
    buckets.set(key, bucket);
  }

  const all = [...buckets.entries()]
    .filter(([, bucket]) => bucket.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

  const groups: DuplicateGroup[] = all.slice(0, limit).map(([key, bucket]) => ({
    key,
    count: bucket.length,
    sample: bucket[0].stem,
    ids: bucket.map((b) => b.id),
  }));

  return { groups, totalGroups: all.length };
}

/** Approximate duplicates: same stem prefix, different full stem. */
export async function findNearDuplicates(limit = 25) {
  const rows = await db.question.findMany({
    where: { status: { not: "ARCHIVED" } },
    select: { id: true, stem: true, slug: true, contentHash: true },
    orderBy: { createdAt: "desc" },
    take: 2000,
  });

  const buckets = new Map<string, Array<{ id: string; stem: string; slug: string; contentHash: string | null }>>();
  for (const row of rows) {
    const key = row.stem.trim().toLowerCase().slice(0, 60);
    const bucket = buckets.get(key) ?? [];
    bucket.push(row);
    buckets.set(key, bucket);
  }

  const near: Array<{
    key: string;
    items: Array<{ id: string; slug: string; contentHash: string | null }>;
  }> = [];
  for (const [key, bucket] of buckets) {
    const distinctStems = new Set(
      bucket.map((b) => b.stem.trim().toLowerCase().replace(/\s+/g, " ")),
    );
    if (bucket.length > 1 && distinctStems.size > 1) {
      near.push({
        key,
        items: bucket.map((b) => ({
          id: b.id,
          slug: b.slug,
          contentHash: b.contentHash,
        })),
      });
    }
  }
  return near.slice(0, limit);
}
