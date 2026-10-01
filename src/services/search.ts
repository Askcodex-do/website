import "@/lib/server-guard";

import { db } from "@/lib/db";
import { toPublicQuestion } from "@/services/question-selection";
import type { PublicQuestion } from "@/services/types";

export interface SearchResults {
  query: string;
  questions: PublicQuestion[];
  exams: Array<{ slug: string; name: string; description: string | null }>;
  subjects: Array<{ slug: string; name: string; description: string | null }>;
  topics: Array<{
    slug: string;
    name: string;
    subjectSlug: string;
    subjectName: string;
  }>;
  total: { questions: number; exams: number; subjects: number; topics: number };
}

/**
 * Search across questions, exams, subjects and topics.
 *
 * Uses indexed `contains` matches today. The interface is intentionally narrow
 * so a Postgres full-text/trigram implementation can replace the body without
 * changing any caller.
 */
export async function search(
  rawQuery: string,
  options: { limit?: number } = {},
): Promise<SearchResults> {
  const query = rawQuery.trim().slice(0, 120);
  const limit = Math.min(Math.max(options.limit ?? 10, 1), 50);

  if (query.length < 2) {
    return {
      query,
      questions: [],
      exams: [],
      subjects: [],
      topics: [],
      total: { questions: 0, exams: 0, subjects: 0, topics: 0 },
    };
  }

  const insensitive = { contains: query, mode: "insensitive" as const };

  const [questionRows, questionCount, exams, subjects, topics] = await Promise.all([
    db.question.findMany({
      where: {
        status: "PUBLISHED",
        OR: [{ stem: insensitive }, { explanation: insensitive }],
      },
      take: limit,
      orderBy: [{ timesAnswered: "desc" }, { createdAt: "desc" }],
      include: {
        options: { orderBy: { sortOrder: "asc" } },
        subjects: { include: { subject: { select: { slug: true, name: true } } } },
        topics: { include: { topic: { select: { slug: true, name: true } } } },
        exams: { include: { exam: { select: { slug: true, name: true } } } },
      },
    }),
    db.question.count({
      where: {
        status: "PUBLISHED",
        OR: [{ stem: insensitive }, { explanation: insensitive }],
      },
    }),
    db.exam.findMany({
      where: { isActive: true, OR: [{ name: insensitive }, { description: insensitive }] },
      take: 5,
      select: { slug: true, name: true, description: true },
    }),
    db.subject.findMany({
      where: {
        isActive: true,
        OR: [{ name: insensitive }, { description: insensitive }],
      },
      take: 5,
      select: { slug: true, name: true, description: true },
    }),
    db.topic.findMany({
      where: {
        isActive: true,
        OR: [{ name: insensitive }, { description: insensitive }],
      },
      take: 5,
      include: { subject: { select: { slug: true, name: true } } },
    }),
  ]);

  return {
    query,
    questions: questionRows.map(toPublicQuestion),
    exams,
    subjects,
    topics: topics.map((t) => ({
      slug: t.slug,
      name: t.name,
      subjectSlug: t.subject.slug,
      subjectName: t.subject.name,
    })),
    total: {
      questions: questionCount,
      exams: exams.length,
      subjects: subjects.length,
      topics: topics.length,
    },
  };
}
