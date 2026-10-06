import "@/lib/server-guard";

import { db } from "@/lib/db";
import { toPublicQuestion } from "@/services/question-selection";
import type { PublicQuestion } from "@/services/types";

/**
 * PreviousPapers — reads real, sourced past papers. The `verified` flag is what
 * the UI uses to distinguish an authentic sourced paper from a practice
 * reconstruction; nothing here is fabricated as an official paper.
 */

export interface PreviousPaperSummary {
  id: string;
  slug: string;
  title: string;
  year: number;
  paperName: string | null;
  session: string | null;
  source: string | null;
  verified: boolean;
  exam: { slug: string; name: string } | null;
  subject: { slug: string; name: string } | null;
  questionCount: number;
}

export interface PreviousPaperView extends PreviousPaperSummary {
  questions: PublicQuestion[];
}

export interface PaperFilters {
  exam?: string;
  subject?: string;
  year?: number;
}

export async function listPreviousPapers(
  filters: PaperFilters = {},
): Promise<PreviousPaperSummary[]> {
  const papers = await db.previousPaper.findMany({
    where: {
      isPublished: true,
      ...(filters.exam ? { exam: { slug: filters.exam, isActive: true } } : {}),
      ...(filters.subject ? { subject: { slug: filters.subject } } : {}),
      ...(filters.year ? { year: filters.year } : {}),
    },
    orderBy: [{ year: "desc" }, { title: "asc" }],
    include: {
      exam: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } },
      _count: { select: { questions: true } },
    },
  });

  return papers.map((paper) => ({
    id: paper.id,
    slug: paper.slug,
    title: paper.title,
    year: paper.year,
    paperName: paper.paperName,
    session: paper.session,
    source: paper.source,
    verified: paper.verified,
    exam: paper.exam,
    subject: paper.subject,
    questionCount: paper._count.questions,
  }));
}

export async function getPreviousPaperBySlug(
  slug: string,
): Promise<PreviousPaperView | null> {
  const paper = await db.previousPaper.findFirst({
    where: { slug, isPublished: true },
    include: {
      exam: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } },
      questions: {
        orderBy: { orderIndex: "asc" },
        include: {
          question: {
            include: {
              options: { orderBy: { sortOrder: "asc" } },
              subjects: { include: { subject: { select: { slug: true, name: true } } } },
              subSubjects: {
                include: { subSubject: { select: { slug: true, name: true } } },
              },
              topics: { include: { topic: { select: { slug: true, name: true } } } },
              exams: { include: { exam: { select: { slug: true, name: true } } } },
            },
          },
        },
      },
    },
  });
  if (!paper) return null;

  return {
    id: paper.id,
    slug: paper.slug,
    title: paper.title,
    year: paper.year,
    paperName: paper.paperName,
    session: paper.session,
    source: paper.source,
    verified: paper.verified,
    exam: paper.exam,
    subject: paper.subject,
    questionCount: paper.questions.length,
    questions: paper.questions.map((item) => toPublicQuestion(item.question)),
  };
}

/** Distinct years that have papers, for filter UIs. */
export async function listPreviousPaperYears(): Promise<number[]> {
  const rows = await db.previousPaper.findMany({
    where: { isPublished: true },
    distinct: ["year"],
    select: { year: true },
    orderBy: { year: "desc" },
  });
  return rows.map((r) => r.year);
}
