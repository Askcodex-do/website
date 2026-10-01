import "@/lib/server-guard";

import { db } from "@/lib/db";
import { toPublicQuestion } from "@/services/question-selection";
import type { PublicQuestion } from "@/services/types";

/** Read helpers for user engagement: bookmarks, likes and saved question lists. */

export async function getUserQuestionFlags(
  userId: string | null,
  questionId: string,
): Promise<{ liked: boolean; bookmarked: boolean }> {
  if (!userId) return { liked: false, bookmarked: false };
  const [like, bookmark] = await Promise.all([
    db.like.findUnique({
      where: { userId_questionId: { userId, questionId } },
      select: { id: true },
    }),
    db.bookmark.findUnique({
      where: { userId_questionId: { userId, questionId } },
      select: { id: true },
    }),
  ]);
  return { liked: Boolean(like), bookmarked: Boolean(bookmark) };
}

const QUESTION_INCLUDE = {
  options: { orderBy: { sortOrder: "asc" as const } },
  subjects: { include: { subject: { select: { slug: true, name: true } } } },
  topics: { include: { topic: { select: { slug: true, name: true } } } },
  exams: { include: { exam: { select: { slug: true, name: true } } } },
};

export async function listBookmarkedQuestions(
  userId: string,
  limit = 50,
): Promise<PublicQuestion[]> {
  const rows = await db.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { question: { include: QUESTION_INCLUDE } },
  });
  return rows
    .filter((row) => row.question.status === "PUBLISHED")
    .map((row) => toPublicQuestion(row.question));
}

export async function listLikedQuestions(
  userId: string,
  limit = 50,
): Promise<PublicQuestion[]> {
  const rows = await db.like.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { question: { include: QUESTION_INCLUDE } },
  });
  return rows
    .filter((row) => row.question.status === "PUBLISHED")
    .map((row) => toPublicQuestion(row.question));
}

/** Adjacent questions in STATIC order, used for the "next question" link. */
export async function getAdjacentQuestion(
  currentStaticOrder: number | null,
  currentId: string,
): Promise<{ slug: string; subjectSlug: string } | null> {
  const row = await db.question.findFirst({
    where: {
      status: "PUBLISHED",
      ...(currentStaticOrder !== null
        ? {
            OR: [
              { staticOrder: { gt: currentStaticOrder } },
              { staticOrder: currentStaticOrder, id: { gt: currentId } },
            ],
          }
        : { id: { gt: currentId } }),
    },
    orderBy: [
      { staticOrder: { sort: "asc", nulls: "last" } },
      { id: "asc" },
    ],
    select: {
      slug: true,
      subjects: { select: { subject: { select: { slug: true } } } },
    },
  });
  if (!row) return null;
  return {
    slug: row.slug,
    subjectSlug: row.subjects[0]?.subject.slug ?? "general",
  };
}
