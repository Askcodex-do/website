import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  allocateByWeight,
  generatePaper,
  getGeneratedPaperBySlug,
  listRecentGeneratedPapers,
  PaperError,
} from "@/services/paper-generator";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/** Paper generator — deterministic allocation and real question selection. */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  const papers = await db.generatedPaper.findMany({
    where: { title: { contains: "Vitest" } },
    select: { id: true },
  });
  const ids = papers.map((p) => p.id);
  if (ids.length > 0) {
    await db.generatedPaperQuestion.deleteMany({ where: { paperId: { in: ids } } });
    await db.generatedPaper.deleteMany({ where: { id: { in: ids } } });
  }
  await teardownFixtures();
});

describe("allocateByWeight", () => {
  it("sums exactly to the requested total", () => {
    expect(allocateByWeight([1, 1, 1], 10).reduce((a, b) => a + b, 0)).toBe(10);
    expect(allocateByWeight([3, 2, 1], 20).reduce((a, b) => a + b, 0)).toBe(20);
  });

  it("uses the largest remainder method", () => {
    // 1:1:1 of 10 → 3.33 each → 4,3,3 in some order, summing to 10.
    const result = allocateByWeight([1, 1, 1], 10).sort((a, b) => b - a);
    expect(result).toEqual([4, 3, 3]);
  });

  it("returns zeros when weights sum to zero", () => {
    expect(allocateByWeight([0, 0], 5)).toEqual([0, 0]);
  });
});

describe("generatePaper", () => {
  it("builds and persists a subject paper from the selection engine", async () => {
    const paper = await generatePaper({
      kind: "SUBJECT",
      subject: fixtures.subjectSlug,
      count: 8,
      title: "Vitest Subject Paper",
      userId: fixtures.userId,
    });

    expect(paper.questionCount).toBeGreaterThan(0);
    expect(paper.questionCount).toBeLessThanOrEqual(8);

    const view = await getGeneratedPaperBySlug(paper.slug);
    expect(view).not.toBeNull();
    expect(view!.questions.length).toBe(paper.questionCount);
    // Correct answers must never leak into a paper view.
    for (const question of view!.questions) {
      for (const option of question.options) {
        expect(option).not.toHaveProperty("isCorrect");
      }
    }
  });

  it("throws a typed error when nothing matches", async () => {
    await expect(
      generatePaper({
        kind: "SUBJECT",
        subject: "no-such-subject-vitest",
        count: 5,
        title: "Vitest Empty Paper",
      }),
    ).rejects.toBeInstanceOf(PaperError);
  });

  it("lists recent papers", async () => {
    const recent = await listRecentGeneratedPapers(5);
    expect(Array.isArray(recent)).toBe(true);
  });
});
