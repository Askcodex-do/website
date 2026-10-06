import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  answerQuestion,
  createQuizAttempt,
  finalizeAttempt,
  getAttemptForReview,
  getAttemptResults,
  getUserStats,
  listUserAttempts,
  QuizError,
} from "@/services/quiz";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/**
 * Quiz engine tests. Scoring is computed server-side from a snapshotted correct
 * option, so these tests also prove a client cannot influence its own score.
 */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  await teardownFixtures();
});

async function startAttempt(count = 5) {
  return createQuizAttempt({
    exam: fixtures.examSlug,
    count,
    mode: "static",
    userId: fixtures.userId,
  });
}

describe("quiz creation", () => {
  it("creates an attempt with questions drawn from the exam pool", async () => {
    const attempt = await startAttempt(5);
    expect(attempt.totalQuestions).toBe(5);
    expect(attempt.mode).toBe("STATIC");
    expect(attempt.negativeMarking).toBe(true);

    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
    });
    expect(rows).toHaveLength(5);
    // A snapshot of the correct option must exist server-side...
    expect(rows.every((row) => row.correctOptionId !== null)).toBe(true);
  });

  it("caps the number of questions at the available pool", async () => {
    const attempt = await createQuizAttempt({
      exam: fixtures.examSlug,
      count: 500,
      userId: fixtures.userId,
    });
    expect(attempt.totalQuestions).toBe(30);
  });

  it("throws when no questions match", async () => {
    await expect(
      createQuizAttempt({ exam: "no-such-exam", count: 5, userId: fixtures.userId }),
    ).rejects.toBeInstanceOf(QuizError);
  });
});

describe("server-side scoring", () => {
  it("grades correct and incorrect answers and applies negative marking", async () => {
    const attempt = await startAttempt(4);
    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
      orderBy: { orderIndex: "asc" },
      include: { question: { include: { options: true } } },
    });

    // Answer the first correctly, the second incorrectly, leave the rest blank.
    const firstCorrect = rows[0].question.options.find((o) => o.isCorrect)!;
    const secondWrong = rows[1].question.options.find((o) => !o.isCorrect)!;

    const correctResult = await answerQuestion(
      attempt.attemptId,
      rows[0].questionId,
      firstCorrect.id,
      { userId: fixtures.userId },
    );
    expect(correctResult.isCorrect).toBe(true);
    expect(correctResult.marksAwarded).toBe(1);

    const wrongResult = await answerQuestion(
      attempt.attemptId,
      rows[1].questionId,
      secondWrong.id,
      { userId: fixtures.userId },
    );
    expect(wrongResult.isCorrect).toBe(false);
    // 0.25 negative marking factor on 1 mark.
    expect(wrongResult.marksAwarded).toBeCloseTo(-0.25);

    const summary = await finalizeAttempt(attempt.attemptId, {
      userId: fixtures.userId,
    });
    expect(summary.correct).toBe(1);
    expect(summary.incorrect).toBe(1);
    expect(summary.skipped).toBe(2);
    expect(summary.score).toBeCloseTo(0.75);
    expect(summary.percentage).toBeCloseTo(18.8, 1);
  });

  it("rejects an option that does not belong to the question", async () => {
    const attempt = await startAttempt(2);
    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
      include: { question: { include: { options: true } } },
    });
    const foreignOption = await db.questionOption.findFirst({
      where: { questionId: { not: rows[0].questionId } },
    });

    await expect(
      answerQuestion(
        attempt.attemptId,
        rows[0].questionId,
        foreignOption!.id,
        { userId: fixtures.userId },
      ),
    ).rejects.toMatchObject({ code: "INVALID_OPTION" });
  });

  it("forbids a different user from answering an attempt", async () => {
    const attempt = await startAttempt(2);
    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
    });
    await expect(
      answerQuestion(attempt.attemptId, rows[0].questionId, null, {
        userId: fixtures.adminId,
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("blocks answering after completion", async () => {
    const attempt = await startAttempt(2);
    await finalizeAttempt(attempt.attemptId, { userId: fixtures.userId });
    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
    });
    await expect(
      answerQuestion(attempt.attemptId, rows[0].questionId, null, {
        userId: fixtures.userId,
      }),
    ).rejects.toMatchObject({ code: "ALREADY_COMPLETED" });
  });
});

describe("guest attempts", () => {
  it("isolates a guest attempt by session id", async () => {
    const sessionId = "vitest-guest-session";
    const attempt = await createQuizAttempt({
      exam: fixtures.examSlug,
      count: 3,
      guestSessionId: sessionId,
    });
    expect(attempt.totalQuestions).toBe(3);

    const summary = await finalizeAttempt(attempt.attemptId, {
      guestSessionId: sessionId,
    });
    expect(summary.skipped).toBe(3);

    await expect(
      finalizeAttempt(attempt.attemptId, { guestSessionId: "someone-else" }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("quiz history and review", () => {
  it("lists a user's attempts and exposes detailed review data", async () => {
    const attempt = await startAttempt(3);
    const rows = await db.quizAttemptQuestion.findMany({
      where: { attemptId: attempt.attemptId },
      orderBy: { orderIndex: "asc" },
      include: { question: { include: { options: true } } },
    });
    const correct = rows[0].question.options.find((o) => o.isCorrect)!;
    await answerQuestion(attempt.attemptId, rows[0].questionId, correct.id, {
      userId: fixtures.userId,
    });
    await finalizeAttempt(attempt.attemptId, { userId: fixtures.userId });

    const attempts = await listUserAttempts(fixtures.userId, 50);
    expect(attempts.some((a) => a.id === attempt.attemptId)).toBe(true);

    const results = await getAttemptResults(attempt.attemptId, {
      userId: fixtures.userId,
    });
    expect(results).not.toBeNull();

    const review = await getAttemptForReview(attempt.attemptId, {
      userId: fixtures.userId,
    });
    expect(review).not.toBeNull();
  });

  it("aggregates dashboard statistics", async () => {
    const stats = await getUserStats(fixtures.userId);
    expect(stats.totalQuizzes).toBeGreaterThan(0);
    expect(stats.questionsAttempted).toBeGreaterThanOrEqual(0);
    expect(stats.accuracy).toBeGreaterThanOrEqual(0);
    expect(stats.accuracy).toBeLessThanOrEqual(100);
  });
});
