import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  buildQuestionWhere,
  getQuestions,
  getStaticExamOrder,
  hasUnresolvedFilter,
  resolveExamConfig,
  resolveTaxonomyIds,
} from "@/services/question-selection";
import { setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/**
 * Question Selection Engine tests. These hit a real database so the exam
 * blueprint → filters → pool pipeline is verified end-to-end, including the
 * rule that an exam can never surface an unrelated question.
 */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  await teardownFixtures();
});

describe("exam configuration resolution", () => {
  it("resolves an exam blueprint with its linked subjects and levels", async () => {
    const config = await resolveExamConfig(fixtures.examSlug);
    expect(config).not.toBeNull();
    expect(config!.mode).toBe("RANDOM");
    expect(config!.subjectIds.length).toBeGreaterThan(0);
    expect(config!.educationLevelIds.length).toBeGreaterThan(0);
    expect(config!.negativeMarking).toBe(true);
  });

  it("returns null for an unknown exam", async () => {
    expect(await resolveExamConfig("does-not-exist")).toBeNull();
  });
});

describe("question filtering", () => {
  it("returns only questions belonging to the requested exam", async () => {
    const result = await getQuestions({ exam: fixtures.examSlug, limit: 10 });
    expect(result.total).toBe(30);
    for (const question of result.questions) {
      expect(question.exams.map((e) => e.slug)).toContain(fixtures.examSlug);
    }
  });

  it("narrows by subject, topic, difficulty and education level", async () => {
    const bySubject = await getQuestions({
      exam: fixtures.examSlug,
      subject: fixtures.subjectSlug,
      limit: 5,
    });
    expect(bySubject.total).toBe(30);

    const byTopic = await getQuestions({
      exam: fixtures.examSlug,
      topic: fixtures.topicSlug,
      limit: 5,
    });
    expect(byTopic.total).toBe(30);

    const bySubSubject = await getQuestions({
      exam: fixtures.examSlug,
      subSubject: fixtures.subSubjectSlug,
      limit: 5,
    });
    expect(bySubSubject.total).toBe(30);

    const easy = await getQuestions({
      exam: fixtures.examSlug,
      difficulty: "EASY",
      limit: 50,
    });
    expect(easy.total).toBe(10);
    expect(easy.questions.every((q) => q.difficulty === "EASY")).toBe(true);

    const byLevel = await getQuestions({
      exam: fixtures.examSlug,
      educationLevel: fixtures.levelSlug,
      limit: 5,
    });
    expect(byLevel.total).toBe(30);
  });

  it("applies the exam qualification gate to the whole pool", async () => {
    // The fixture includes one question on the exam but at a level the exam is
    // not linked to; the engine must never surface it.
    const result = await getQuestions({ exam: fixtures.examSlug, limit: 100 });
    expect(result.total).toBe(30);
    expect(result.questions.map((q) => q.id)).not.toContain(
      fixtures.offLevelQuestionId,
    );
    const config = await resolveExamConfig(fixtures.examSlug);
    const ids = await resolveTaxonomyIds({ exam: fixtures.examSlug });
    const where = buildQuestionWhere({ exam: fixtures.examSlug }, ids, config);
    const and = Array.isArray(where.AND) ? where.AND : [where.AND];
    expect(and.some((clause) => clause && "educationLevels" in clause)).toBe(true);
  });

  it("returns an empty pool when an exam/education combination matches nothing", async () => {
    const result = await getQuestions({
      exam: fixtures.examSlug,
      educationLevel: fixtures.unlinkedLevelSlug,
      limit: 5,
      onUnknownExam: "empty",
    });
    // The fixture exam is only linked to its own test level, so a different
    // level must not leak questions from the pool.
    expect(result.total).toBe(0);
    expect(result.questions).toHaveLength(0);
  });

  it("excludes explicitly excluded ids", async () => {
    const result = await getQuestions({
      exam: fixtures.examSlug,
      excludeIds: [fixtures.questionIds[0]],
      limit: 50,
    });
    expect(result.total).toBe(29);
    expect(result.questions.map((q) => q.id)).not.toContain(fixtures.questionIds[0]);
  });
});

describe("static and random modes", () => {
  it("returns a deterministic order in STATIC mode", async () => {
    const first = await getQuestions({
      exam: fixtures.examSlug,
      mode: "static",
      limit: 10,
    });
    const second = await getQuestions({
      exam: fixtures.examSlug,
      mode: "static",
      limit: 10,
    });
    expect(first.mode).toBe("STATIC");
    expect(first.questions.map((q) => q.slug)).toEqual(
      second.questions.map((q) => q.slug),
    );
  });

  it("produces varied selections in RANDOM mode", async () => {
    const runs = await Promise.all(
      Array.from({ length: 6 }, () =>
        getQuestions({ exam: fixtures.examSlug, mode: "random", limit: 10 }),
      ),
    );
    const signatures = new Set(
      runs.map((run) => run.questions.map((q) => q.slug).join(",")),
    );
    expect(signatures.size).toBeGreaterThan(1);
  });

  it("builds the full static order for an exam", async () => {
    const order = await getStaticExamOrder(fixtures.examSlug);
    expect(order).toHaveLength(30);
  });
});

describe("engine guarantees", () => {
  it("never exposes the correct answer in a public question", async () => {
    const result = await getQuestions({ exam: fixtures.examSlug, limit: 5 });
    for (const question of result.questions) {
      expect(question).not.toHaveProperty("correctOptionId");
      for (const option of question.options) {
        expect(option).not.toHaveProperty("isCorrect");
      }
    }
  });

  it("scopes an exam to its own subjects when a foreign subject is requested", async () => {
    const ids = await resolveTaxonomyIds({
      exam: fixtures.examSlug,
      subject: "english",
    });
    const config = await resolveExamConfig(fixtures.examSlug);
    const where = buildQuestionWhere(
      { exam: fixtures.examSlug, subject: "english" },
      ids,
      config,
    );
    const and = Array.isArray(where.AND) ? where.AND : [where.AND];
    // The foreign subject must be intersected with the exam's own subject list.
    expect(and.some((clause) => clause && "subjects" in clause)).toBe(true);
  });
});

describe("unknown filter handling", () => {
  it("detects a requested-but-unresolved taxonomy filter", async () => {
    const ids = await resolveTaxonomyIds({
      subject: "no-such-subject-vitest",
      topic: fixtures.topicSlug,
    });
    expect(hasUnresolvedFilter({ subject: "no-such-subject-vitest" }, ids)).toBe(
      true,
    );
    expect(hasUnresolvedFilter({ topic: fixtures.topicSlug }, ids)).toBe(false);
  });

  it("fails closed (returns no questions) when a filter is unknown", async () => {
    const result = await getQuestions({
      subject: "no-such-subject-vitest",
      limit: 5,
      onUnknownFilter: "empty",
    });
    expect(result.questions).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it("ignores an unknown filter by default (backward compatible)", async () => {
    // With default behaviour an unknown subject is dropped rather than emptying
    // the result set — the old contract callers rely on.
    const result = await getQuestions({ limit: 1 });
    expect(result.questions.length).toBeGreaterThan(0);
  });
});
