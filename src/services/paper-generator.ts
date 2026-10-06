import "@/lib/server-guard";

import type { Difficulty, PaperKind, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { clamp, seededRandom, shuffle } from "@/lib/utils";
import { getQuestions, resolveExamConfig } from "@/services/question-selection";
import type { PublicQuestion } from "@/services/types";

/**
 * PaperGenerator — builds practice, mock and "guess" papers from the same
 * Question Selection Engine that powers browsing and quizzes. Nothing is
 * hard-coded per exam: a paper is just a saved, reproducible set of filters.
 *
 * Every generated paper is explicitly labelled as practice — it is never
 * presented as an authentic official paper.
 */

export interface GeneratePaperInput {
  kind: PaperKind;
  exam?: string;
  subject?: string;
  topic?: string;
  difficulty?: Difficulty;
  count?: number;
  timeLimitMinutes?: number | null;
  userId?: string | null;
  title?: string;
}

export interface GeneratedPaperResult {
  id: string;
  slug: string;
  title: string;
  kind: PaperKind;
  questionCount: number;
  timeLimitMinutes: number | null;
}

export class PaperError extends Error {
  constructor(
    public code: "NO_QUESTIONS" | "NOT_FOUND",
    message: string,
  ) {
    super(message);
    this.name = "PaperError";
  }
}

const DEFAULT_COUNT = 20;
const MAX_COUNT = 100;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

/**
 * Distribute `total` questions across weighted subjects, using the largest
 * remainder method so the allocation always sums exactly to `total`.
 */
export function allocateByWeight(weights: number[], total: number): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) return weights.map(() => 0);
  const raw = weights.map((w) => (w / sum) * total);
  const floors = raw.map(Math.floor);
  let remainder = total - floors.reduce((a, b) => a + b, 0);
  const order = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);
  for (const item of order) {
    if (remainder <= 0) break;
    floors[item.index] += 1;
    remainder -= 1;
  }
  return floors;
}

/**
 * For a full-length mock, select questions across the exam's subjects using the
 * exam blueprint weights, so the paper reflects the real subject distribution.
 */
async function selectMockQuestions(
  examSlug: string,
  count: number,
  difficulty?: Difficulty,
): Promise<PublicQuestion[]> {
  const config = await resolveExamConfig(examSlug);
  if (!config) return [];

  const examSubjects = await db.examSubject.findMany({
    where: { examId: config.examId },
    select: { subjectId: true, weight: true, subject: { select: { slug: true } } },
  });
  if (examSubjects.length === 0) {
    const result = await getQuestions({
      exam: examSlug,
      difficulty,
      mode: "random",
      limit: count,
    });
    return result.questions;
  }

  const allocation = allocateByWeight(
    examSubjects.map((s) => s.weight || 1),
    count,
  );

  const parts = await Promise.all(
    examSubjects.map((subject, index) =>
      allocation[index] > 0
        ? getQuestions({
            exam: examSlug,
            subject: subject.subject.slug,
            difficulty,
            mode: "random",
            limit: allocation[index],
          }).then((r) => r.questions)
        : Promise.resolve([] as PublicQuestion[]),
    ),
  );

  // De-duplicate (a question can appear under more than one subject) and shuffle.
  const seen = new Set<string>();
  const combined: PublicQuestion[] = [];
  for (const question of parts.flat()) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);
    combined.push(question);
  }
  return shuffle(combined, seededRandom(`paper:${examSlug}:${Date.now()}`)).slice(
    0,
    count,
  );
}

/** Create and persist a generated practice paper. */
export async function generatePaper(
  input: GeneratePaperInput,
): Promise<GeneratedPaperResult> {
  const count = clamp(input.count ?? DEFAULT_COUNT, 1, MAX_COUNT);

  const questions =
    input.kind === "MOCK" && input.exam
      ? await selectMockQuestions(input.exam, count, input.difficulty)
      : (
          await getQuestions({
            exam: input.exam,
            subject: input.subject,
            topic: input.topic,
            difficulty: input.difficulty,
            mode: "random",
            limit: count,
            onUnknownExam: "empty",
            onUnknownFilter: "empty",
          })
        ).questions;

  if (questions.length === 0) {
    throw new PaperError(
      "NO_QUESTIONS",
      "No questions match this paper configuration. Try widening the filters.",
    );
  }

  const exam = input.exam
    ? await db.exam.findUnique({
        where: { slug: input.exam },
        select: { id: true, name: true, shortName: true },
      })
    : null;

  const kindLabel: Record<PaperKind, string> = {
    MOCK: "Mock Paper",
    SUBJECT: "Subject Paper",
    TOPIC: "Topic Paper",
    DIFFICULTY: "Difficulty Paper",
    GUESS: "Guess Paper",
    RANDOM: "Random Paper",
  };

  const baseTitle =
    input.title ??
    `${exam?.shortName ?? exam?.name ?? input.subject ?? "Practice"} ${kindLabel[input.kind]}`;
  const slug = `${slugify(baseTitle)}-${Date.now().toString(36)}`;

  const timeLimitMinutes =
    input.timeLimitMinutes === undefined
      ? (await resolveExamConfig(input.exam ?? ""))?.timeLimitMinutes ?? null
      : input.timeLimitMinutes;

  const paper = await db.generatedPaper.create({
    data: {
      slug,
      title: baseTitle,
      kind: input.kind,
      examId: exam?.id ?? null,
      difficulty: input.difficulty ?? null,
      questionCount: questions.length,
      timeLimitMinutes,
      filters: {
        exam: input.exam ?? null,
        subject: input.subject ?? null,
        topic: input.topic ?? null,
        difficulty: input.difficulty ?? null,
      } as Prisma.InputJsonValue,
      createdById: input.userId ?? null,
      questions: {
        create: questions.map((question, index) => ({
          questionId: question.id,
          orderIndex: index,
        })),
      },
    },
  });

  return {
    id: paper.id,
    slug: paper.slug,
    title: paper.title,
    kind: paper.kind,
    questionCount: paper.questionCount,
    timeLimitMinutes: paper.timeLimitMinutes,
  };
}

export interface GeneratedPaperView {
  id: string;
  slug: string;
  title: string;
  kind: PaperKind;
  questionCount: number;
  timeLimitMinutes: number | null;
  createdAt: string;
  exam: { slug: string; name: string } | null;
  questions: PublicQuestion[];
}

/** Load a generated paper with its questions (correct answers stripped). */
export async function getGeneratedPaperBySlug(
  slug: string,
): Promise<GeneratedPaperView | null> {
  const paper = await db.generatedPaper.findUnique({
    where: { slug },
    include: {
      exam: { select: { slug: true, name: true } },
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
    kind: paper.kind,
    questionCount: paper.questionCount,
    timeLimitMinutes: paper.timeLimitMinutes,
    createdAt: paper.createdAt.toISOString(),
    exam: paper.exam,
    questions: paper.questions.map((item) => ({
      id: item.question.id,
      slug: item.question.slug,
      stem: item.question.stem,
      explanation: item.question.explanation,
      source: item.question.source,
      reference: item.question.reference,
      difficulty: item.question.difficulty,
      type: item.question.type,
      language: item.question.language,
      status: item.question.status,
      verification: item.question.verification,
      origin: item.question.origin,
      year: item.question.year,
      province: item.question.province,
      likeCount: item.question.likeCount,
      bookmarkCount: item.question.bookmarkCount,
      viewCount: item.question.viewCount,
      timesAnswered: item.question.timesAnswered,
      timesCorrect: item.question.timesCorrect,
      options: item.question.options.map((o) => ({
        id: o.id,
        label: o.label,
        text: o.text,
      })),
      subject: item.question.subjects[0]?.subject ?? null,
      subSubject: item.question.subSubjects[0]?.subSubject ?? null,
      topic: item.question.topics[0]?.topic ?? null,
      exams: item.question.exams.map((e) => e.exam),
    })),
  };
}

/** Recent generated papers for a listing page. */
export async function listRecentGeneratedPapers(limit = 12) {
  return db.generatedPaper.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { exam: { select: { slug: true, name: true } } },
  });
}
