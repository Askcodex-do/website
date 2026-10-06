import "@/lib/server-guard";

import type { Difficulty, ExamMode, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { clamp, percent } from "@/lib/utils";
import {
  buildQuestionWhere,
  resolveExamConfig,
  resolveTaxonomyIds,
} from "@/services/question-selection";
import { DEFAULT_LIMIT, MAX_LIMIT } from "@/services/types";

/**
 * QuizEngine — creates attempts from engine-selected questions and grades them
 * entirely on the server. The correct option id is snapshotted into
 * QuizAttemptQuestion at creation time and is never sent to the browser.
 */

export interface CreateQuizInput {
  exam?: string;
  subject?: string;
  topic?: string;
  educationLevel?: string;
  difficulty?: Difficulty;
  count?: number;
  mode?: "static" | "random";
  timeLimitSeconds?: number | null;
  userId?: string | null;
  guestSessionId?: string | null;
}

export interface QuizAttemptOwner {
  userId?: string | null;
  guestSessionId?: string | null;
}

export interface CreatedQuiz {
  attemptId: string;
  totalQuestions: number;
  mode: ExamMode;
  timeLimitSeconds: number | null;
  negativeMarking: boolean;
  marksPerQuestion: number;
}

export class QuizError extends Error {
  constructor(
    public code:
      | "NO_QUESTIONS"
      | "NOT_FOUND"
      | "FORBIDDEN"
      | "ALREADY_COMPLETED"
      | "INVALID_OPTION",
    message: string,
  ) {
    super(message);
    this.name = "QuizError";
  }
}

/**
 * Create an attempt. Questions come exclusively from the selection engine, so
 * the same exam configuration that powers browsing also powers quizzes.
 */
export async function createQuizAttempt(
  input: CreateQuizInput,
): Promise<CreatedQuiz> {
  const config = input.exam ? await resolveExamConfig(input.exam) : null;
  // An explicitly requested exam that cannot be resolved must not silently fall
  // back to the whole bank — that would surface unrelated questions.
  if (input.exam && !config) {
    throw new QuizError("NO_QUESTIONS", "That exam could not be found.");
  }
  const requested = clamp(input.count ?? DEFAULT_LIMIT, 1, MAX_LIMIT);

  const mode: "STATIC" | "RANDOM" = input.mode
    ? input.mode.toUpperCase() === "STATIC"
      ? "STATIC"
      : "RANDOM"
    : (config?.mode ?? "RANDOM");

  const ids = await resolveTaxonomyIds(input);
  const where = buildQuestionWhere(input, ids, config);

  const total = await db.question.count({ where });
  if (total === 0) {
    throw new QuizError(
      "NO_QUESTIONS",
      "No questions match the selected filters. Try widening your selection.",
    );
  }

  const take = Math.min(requested, total);

  // RANDOM: sample via a random offset window, then shuffle. STATIC: stable order.
  const rows =
    mode === "STATIC"
      ? await db.question.findMany({
          where,
          orderBy: [
            { staticOrder: { sort: "asc", nulls: "last" } },
            { createdAt: "asc" },
            { id: "asc" },
          ],
          take,
          include: { options: { orderBy: { sortOrder: "asc" } } },
        })
      : await db.question.findMany({
          where,
          orderBy: { id: "asc" },
          skip: total > take ? Math.floor(Math.random() * (total - take)) : 0,
          take,
          include: { options: { orderBy: { sortOrder: "asc" } } },
        });

  const ordered =
    mode === "RANDOM" ? [...rows].sort(() => Math.random() - 0.5) : rows;

  const timeLimitSeconds =
    input.timeLimitSeconds === null
      ? null
      : (input.timeLimitSeconds ??
        (config ? config.timeLimitMinutes * 60 : null));

  const negativeMarking = config?.negativeMarking ?? false;
  const negativeMarkFactor = config?.negativeMarkFactor ?? 0;
  const marksPerQuestion = config?.marksPerQuestion ?? 1;

  const attempt = await db.quizAttempt.create({
    data: {
      userId: input.userId ?? null,
      guestSessionId: input.userId ? null : (input.guestSessionId ?? null),
      examId: ids.examId ?? null,
      subjectId: ids.subjectId ?? null,
      topicId: ids.topicId ?? null,
      educationLevelId: ids.educationLevelId ?? null,
      mode,
      difficulty: input.difficulty ?? null,
      requestedCount: requested,
      timeLimitSeconds,
      negativeMarking,
      negativeMarkFactor,
      marksPerQuestion,
      filters: {
        exam: input.exam ?? null,
        subject: input.subject ?? null,
        topic: input.topic ?? null,
        educationLevel: input.educationLevel ?? null,
        difficulty: input.difficulty ?? null,
      } as Prisma.InputJsonValue,
      totalQuestions: ordered.length,
      maxScore: ordered.length * marksPerQuestion,
    },
  });

  await db.quizAttemptQuestion.createMany({
    data: ordered.map((question, index) => {
      const correct = question.options.find((o) => o.isCorrect);
      return {
        attemptId: attempt.id,
        questionId: question.id,
        orderIndex: index,
        optionOrder: question.options.map((o) => o.id),
        correctOptionId: correct?.id ?? null,
      };
    }),
  });

  return {
    attemptId: attempt.id,
    totalQuestions: ordered.length,
    mode,
    timeLimitSeconds,
    negativeMarking,
    marksPerQuestion,
  };
}

async function loadAttemptOwned(
  attemptId: string,
  owner: QuizAttemptOwner,
) {
  const attempt = await db.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: {
          question: {
            include: {
              options: { orderBy: { sortOrder: "asc" } },
              subjects: {
                take: 1,
                select: { subject: { select: { slug: true } } },
              },
            },
          },
        },
      },
      exam: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } },
      topic: { select: { slug: true, name: true } },
    },
  });
  if (!attempt) throw new QuizError("NOT_FOUND", "Quiz attempt not found");

  const isOwner = owner.userId
    ? attempt.userId === owner.userId
    : attempt.userId === null &&
      !!owner.guestSessionId &&
      attempt.guestSessionId === owner.guestSessionId;

  if (!isOwner) throw new QuizError("FORBIDDEN", "You cannot access this attempt");
  return attempt;
}

/**
 * Record (or change) an answer. Grading is computed here, server-side, from the
 * snapshotted correct option — a client can never influence its own score.
 */
export async function answerQuestion(
  attemptId: string,
  questionId: string,
  optionId: string | null,
  owner: QuizAttemptOwner,
  timeSpentSeconds = 0,
): Promise<{ isCorrect: boolean | null; marksAwarded: number }> {
  const attempt = await loadAttemptOwned(attemptId, owner);
  if (attempt.status === "COMPLETED") {
    throw new QuizError("ALREADY_COMPLETED", "This attempt is already completed");
  }

  const item = attempt.questions.find((q) => q.questionId === questionId);
  if (!item) throw new QuizError("NOT_FOUND", "Question is not part of this attempt");

  // Validate the selected option actually belongs to the question.
  let isCorrect: boolean | null = null;
  if (optionId !== null) {
    const option = item.question.options.find((o) => o.id === optionId);
    if (!option) {
      throw new QuizError("INVALID_OPTION", "Selected option is not valid");
    }
    isCorrect = option.isCorrect;
  }

  const marksAwarded =
    isCorrect === true
      ? attempt.marksPerQuestion
      : isCorrect === false && attempt.negativeMarking
        ? -(attempt.marksPerQuestion * attempt.negativeMarkFactor)
        : 0;

  await db.$transaction([
    db.quizAttemptQuestion.update({
      where: { id: item.id },
      data: {
        selectedOptionId: optionId,
        isCorrect,
        marksAwarded,
        answeredAt: new Date(),
        timeSpentSeconds: Math.max(0, Math.floor(timeSpentSeconds)),
      },
    }),
    db.userAnswer.create({
      data: {
        attemptId,
        questionId,
        selectedOptionId: optionId,
        isCorrect,
        marksAwarded,
      },
    }),
  ]);

  return { isCorrect, marksAwarded };
}

/** Recompute aggregates from stored answers. Called on finalize. */
export async function finalizeAttempt(
  attemptId: string,
  owner: QuizAttemptOwner,
): Promise<{
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  percentage: number;
}> {
  const attempt = await loadAttemptOwned(attemptId, owner);

  const items = await db.quizAttemptQuestion.findMany({
    where: { attemptId },
  });

  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  let score = 0;

  for (const item of items) {
    if (item.selectedOptionId === null) {
      skipped++;
    } else if (item.isCorrect) {
      correct++;
    } else {
      incorrect++;
    }
    score += item.marksAwarded;
  }

  const maxScore = items.length * attempt.marksPerQuestion;
  // Percentage is computed on raw marks; a negative-marking penalty can pull it
  // below zero, which is clamped so the reported figure stays meaningful.
  const percentage = maxScore > 0 ? Math.max(0, percent(score, maxScore)) : 0;

  const timeTakenSeconds = Math.max(
    0,
    Math.round((Date.now() - attempt.startedAt.getTime()) / 1000),
  );

  const finalTime =
    attempt.timeLimitSeconds !== null
      ? Math.min(timeTakenSeconds, attempt.timeLimitSeconds)
      : timeTakenSeconds;

  await db.quizAttempt.update({
    where: { id: attemptId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      timeTakenSeconds: finalTime,
      attempted: correct + incorrect,
      correct,
      incorrect,
      skipped,
      score,
      maxScore,
      percentage,
    },
  });

  return { correct, incorrect, skipped, score, percentage };
}

/** Full attempt detail including correct answers — only for the owner. */
export async function getAttemptForReview(
  attemptId: string,
  owner: QuizAttemptOwner,
) {
  const attempt = await loadAttemptOwned(attemptId, owner);
  return attempt;
}

export interface AttemptResults {
  id: string;
  status: string;
  mode: ExamMode;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  maxScore: number;
  percentage: number;
  timeTakenSeconds: number;
  negativeMarking: boolean;
  marksPerQuestion: number;
  completedAt: string | null;
  exam: { slug: string; name: string } | null;
  subject: { slug: string; name: string } | null;
  topic: { slug: string; name: string } | null;
  questions: Array<{
    id: string;
    slug: string;
    subjectSlug: string | null;
    stem: string;
    explanation: string | null;
    reference: string | null;
    source: string | null;
    options: Array<{ id: string; label: string; text: string; isCorrect: boolean }>;
    selectedOptionId: string | null;
    correctOptionId: string | null;
    isCorrect: boolean | null;
    marksAwarded: number;
  }>;
}

/** Results and full answer review for a completed (or in-progress) attempt. */
export async function getAttemptResults(
  attemptId: string,
  owner: QuizAttemptOwner,
): Promise<AttemptResults> {
  const attempt = await loadAttemptOwned(attemptId, owner);

  const questions = attempt.questions.map((item) => ({
    id: item.question.id,
    slug: item.question.slug,
    subjectSlug: item.question.subjects[0]?.subject.slug ?? null,
    stem: item.question.stem,
    explanation: item.question.explanation,
    reference: item.question.reference,
    source: item.question.source,
    options: item.question.options.map((o) => ({
      id: o.id,
      label: o.label,
      text: o.text,
      isCorrect: o.isCorrect,
    })),
    selectedOptionId: item.selectedOptionId,
    correctOptionId: item.correctOptionId,
    isCorrect: item.isCorrect,
    marksAwarded: item.marksAwarded,
  }));

  return {
    id: attempt.id,
    status: attempt.status,
    mode: attempt.mode,
    totalQuestions: attempt.totalQuestions,
    attempted: attempt.attempted,
    correct: attempt.correct,
    incorrect: attempt.incorrect,
    skipped: attempt.skipped,
    score: attempt.score,
    maxScore: attempt.maxScore,
    percentage: attempt.percentage,
    timeTakenSeconds: attempt.timeTakenSeconds ?? 0,
    negativeMarking: attempt.negativeMarking,
    marksPerQuestion: attempt.marksPerQuestion,
    completedAt: attempt.completedAt?.toISOString() ?? null,
    exam: attempt.exam,
    subject: attempt.subject,
    topic: attempt.topic,
    questions,
  };
}

export interface TakingQuestion {
  id: string;
  slug: string;
  stem: string;
  difficulty: Difficulty;
  subjectSlug: string | null;
  options: Array<{ id: string; label: string; text: string }>;
  selectedOptionId: string | null;
}

export interface AttemptForTaking {
  id: string;
  status: string;
  mode: ExamMode;
  totalQuestions: number;
  timeLimitSeconds: number | null;
  negativeMarking: boolean;
  marksPerQuestion: number;
  startedAt: string;
  exam: { slug: string; name: string } | null;
  subject: { slug: string; name: string } | null;
  topic: { slug: string; name: string } | null;
  questions: TakingQuestion[];
}

/**
 * Load an attempt for the quiz-taking UI. Correct option ids are deliberately
 * stripped so the answer key is never present in the client payload.
 */
export async function getAttemptForTaking(
  attemptId: string,
  owner: QuizAttemptOwner,
): Promise<AttemptForTaking> {
  const attempt = await loadAttemptOwned(attemptId, owner);

  // Respect the option order snapshotted at creation time.
  const questions = attempt.questions.map((item) => {
    const orderIndex = new Map(
      item.optionOrder.map((id, index) => [id, index]),
    );
    const options = [...item.question.options]
      .sort(
        (a, b) =>
          (orderIndex.get(a.id) ?? a.sortOrder) -
          (orderIndex.get(b.id) ?? b.sortOrder),
      )
      .map((o) => ({ id: o.id, label: o.label, text: o.text }));

    return {
      id: item.question.id,
      slug: item.question.slug,
      stem: item.question.stem,
      difficulty: item.question.difficulty,
      subjectSlug: null,
      options,
      selectedOptionId: item.selectedOptionId,
    };
  });

  return {
    id: attempt.id,
    status: attempt.status,
    mode: attempt.mode,
    totalQuestions: attempt.totalQuestions,
    timeLimitSeconds: attempt.timeLimitSeconds,
    negativeMarking: attempt.negativeMarking,
    marksPerQuestion: attempt.marksPerQuestion,
    startedAt: attempt.startedAt.toISOString(),
    exam: attempt.exam,
    subject: attempt.subject,
    topic: attempt.topic,
    questions,
  };
}

/** Attempt history for a signed-in user. */
export async function listUserAttempts(userId: string, limit = 50) {
  return db.quizAttempt.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    take: limit,
    include: {
      exam: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } },
      topic: { select: { slug: true, name: true } },
    },
  });
}

/** Aggregate performance statistics for the dashboard. */
export async function getUserStats(userId: string) {
  const [aggregate, bySubject, byExam] = await Promise.all([
    db.quizAttempt.aggregate({
      where: { userId, status: "COMPLETED" },
      _count: { id: true },
      _sum: {
        correct: true,
        incorrect: true,
        skipped: true,
        attempted: true,
        score: true,
        timeTakenSeconds: true,
      },
      _avg: { percentage: true },
    }),
    db.quizAttempt.groupBy({
      by: ["subjectId"],
      where: { userId, status: "COMPLETED", subjectId: { not: null } },
      _sum: { correct: true, attempted: true },
      _avg: { percentage: true },
    }),
    db.quizAttempt.groupBy({
      by: ["examId"],
      where: { userId, status: "COMPLETED", examId: { not: null } },
      _sum: { correct: true, attempted: true },
      _avg: { percentage: true },
    }),
  ]);

  const subjectIds = bySubject
    .map((s) => s.subjectId)
    .filter((id): id is string => Boolean(id));
  const examIds = byExam.map((e) => e.examId).filter((id): id is string => Boolean(id));

  const [subjects, exams] = await Promise.all([
    db.subject.findMany({
      where: { id: { in: subjectIds } },
      select: { id: true, slug: true, name: true },
    }),
    db.exam.findMany({
      where: { id: { in: examIds } },
      select: { id: true, slug: true, name: true },
    }),
  ]);

  const subjectById = new Map(subjects.map((s) => [s.id, s]));
  const examById = new Map(exams.map((e) => [e.id, e]));

  const correct = aggregate._sum.correct ?? 0;
  const attempted = aggregate._sum.attempted ?? 0;

  return {
    totalQuizzes: aggregate._count.id,
    questionsAttempted: attempted,
    correct,
    incorrect: aggregate._sum.incorrect ?? 0,
    skipped: aggregate._sum.skipped ?? 0,
    accuracy: percent(correct, attempted),
    averagePercentage: Math.round((aggregate._avg.percentage ?? 0) * 10) / 10,
    totalTimeSeconds: aggregate._sum.timeTakenSeconds ?? 0,
    bySubject: bySubject
      .map((row) => {
        const subject = row.subjectId ? subjectById.get(row.subjectId) : undefined;
        const rowCorrect = row._sum.correct ?? 0;
        const rowAttempted = row._sum.attempted ?? 0;
        return {
          slug: subject?.slug ?? "unknown",
          name: subject?.name ?? "Unknown",
          correct: rowCorrect,
          attempted: rowAttempted,
          accuracy: percent(rowCorrect, rowAttempted),
          averagePercentage: Math.round((row._avg.percentage ?? 0) * 10) / 10,
        };
      })
      .sort((a, b) => b.attempted - a.attempted),
    byExam: byExam
      .map((row) => {
        const exam = row.examId ? examById.get(row.examId) : undefined;
        const rowCorrect = row._sum.correct ?? 0;
        const rowAttempted = row._sum.attempted ?? 0;
        return {
          slug: exam?.slug ?? "unknown",
          name: exam?.name ?? "Unknown",
          correct: rowCorrect,
          attempted: rowAttempted,
          accuracy: percent(rowCorrect, rowAttempted),
          averagePercentage: Math.round((row._avg.percentage ?? 0) * 10) / 10,
        };
      })
      .sort((a, b) => b.attempted - a.attempted),
  };
}

/** Recent activity feed for the dashboard. */
export async function getRecentActivity(userId: string, limit = 8) {
  return db.quizAttempt.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    take: limit,
    select: {
      id: true,
      percentage: true,
      score: true,
      maxScore: true,
      totalQuestions: true,
      correct: true,
      completedAt: true,
      exam: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } },
    },
  });
}
