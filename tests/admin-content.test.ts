import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  createPreviousPaper,
  findDuplicateQuestions,
  findNearDuplicates,
  listPrepPagesForAdmin,
  listPreviousPapersForAdmin,
  listVerificationQueue,
  prepPageSchema,
  previousPaperSchema,
  savePrepPage,
  setQuestionVerification,
  verificationSchema,
} from "@/services/admin-content";
import { createQuestion, questionInputSchema } from "@/services/admin";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/**
 * Content-management tests: verification workflow, previous papers, preparation
 * pages and duplicate detection — all against the real database.
 */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  await db.prepPage.deleteMany({ where: { examId: null } });
  await db.previousPaper.deleteMany({ where: { slug: { startsWith: "vitest-" } } });
  await db.prepPage.deleteMany({ where: { slug: { startsWith: "vitest-" } } });
  await teardownFixtures();
});

async function examId() {
  return (await db.exam.findUniqueOrThrow({ where: { slug: fixtures.examSlug } })).id;
}

async function subjectId() {
  return (await db.subject.findUniqueOrThrow({ where: { slug: fixtures.subjectSlug } })).id;
}

async function topicId() {
  return (await db.topic.findUniqueOrThrow({ where: { slug: fixtures.topicSlug } })).id;
}

describe("verification workflow", () => {
  it("requires a source or reference before marking a question verified", async () => {
    const ids = { subjectId: await subjectId(), topicId: await topicId() };
    const created = await createQuestion(
      questionInputSchema.parse({
        stem: "Vitest verification question without source?",
        slug: "vitest-verify-nosource",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "",
        source: "",
        reference: "",
        difficulty: "MEDIUM",
        status: "DRAFT",
        subjectId: ids.subjectId,
        topicId: ids.topicId,
        examIds: [],
        educationLevelIds: [],
        province: "",
        tags: "",
      }),
      fixtures.adminId,
    );

    await expect(
      setQuestionVerification(
        created.id,
        { status: "VERIFIED" },
        fixtures.adminId,
      ),
    ).rejects.toThrow(/source or reference/i);
  });

  it("records a review and sets verifiedAt when a source exists", async () => {
    const ids = { subjectId: await subjectId(), topicId: await topicId() };
    const created = await createQuestion(
      questionInputSchema.parse({
        stem: "Vitest verification question with source?",
        slug: "vitest-verify-sourced",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "",
        source: "Vitest source",
        reference: "",
        difficulty: "MEDIUM",
        status: "DRAFT",
        subjectId: ids.subjectId,
        topicId: ids.topicId,
        examIds: [],
        educationLevelIds: [],
        province: "",
        tags: "",
      }),
      fixtures.adminId,
    );

    const result = await setQuestionVerification(
      created.id,
      { status: "VERIFIED", note: "Checked against source" },
      fixtures.adminId,
    );
    expect(result.verification).toBe("VERIFIED");

    const stored = await db.question.findUniqueOrThrow({
      where: { id: created.id },
      include: { reviews: true },
    });
    expect(stored.verification).toBe("VERIFIED");
    expect(stored.verifiedAt).not.toBeNull();
    expect(stored.verifiedById).toBe(fixtures.adminId);
    expect(stored.reviews.at(-1)?.toStatus).toBe("VERIFIED");

    await db.question.deleteMany({ where: { slug: { startsWith: "vitest-verify-" } } });
  });

  it("validates the verification payload", () => {
    expect(verificationSchema.safeParse({ status: "NOPE" }).success).toBe(false);
    expect(verificationSchema.safeParse({ status: "FLAGGED" }).success).toBe(true);
  });

  it("lists the review queue with per-status counts", async () => {
    const queue = await listVerificationQueue({ pageSize: 5 });
    expect(Array.isArray(queue.rows)).toBe(true);
    expect(typeof queue.counts).toBe("object");
    expect(queue.total).toBeGreaterThanOrEqual(0);
  });
});

describe("previous papers", () => {
  it("marks a paper verified only when a source is supplied", async () => {
    const withSource = await createPreviousPaper(
      previousPaperSchema.parse({
        title: "Vitest Sourced Paper",
        year: 2024,
        paperName: "",
        session: "",
        source: "Official gazette",
        reference: "",
        examId: await examId(),
        subjectId: "",
        isPublished: true,
      }),
      fixtures.adminId,
    );

    const withoutSource = await createPreviousPaper(
      previousPaperSchema.parse({
        title: "Vitest Reconstructed Paper",
        year: 2023,
        paperName: "",
        session: "",
        source: "",
        reference: "",
        examId: "",
        subjectId: "",
        isPublished: true,
      }),
      fixtures.adminId,
    );

    const papers = await listPreviousPapersForAdmin();
    const sourced = papers.find((p) => p.id === withSource.id);
    const reconstructed = papers.find((p) => p.id === withoutSource.id);
    expect(sourced?.verified).toBe(true);
    expect(reconstructed?.verified).toBe(false);
  });

  it("rejects an invalid year", () => {
    const result = previousPaperSchema.safeParse({
      title: "Bad year paper",
      year: 1800,
    });
    expect(result.success).toBe(false);
  });
});

describe("preparation pages", () => {
  it("upserts one page per (exam, type) and lists it for admin", async () => {
    const exam = await examId();
    const saved = await savePrepPage(
      prepPageSchema.parse({
        examId: exam,
        type: "ELIGIBILITY",
        title: "Vitest Eligibility",
        summary: "Summary text",
        sections: [
          { heading: "Criteria", body: "Must hold a degree.", bullets: ["Age 20+"] },
        ],
        faqs: [{ question: "Who can apply?", answer: "Graduates." }],
        sortOrder: 1,
        isPublished: true,
      }),
      fixtures.adminId,
    );

    const again = await savePrepPage(
      prepPageSchema.parse({
        examId: exam,
        type: "ELIGIBILITY",
        title: "Vitest Eligibility Updated",
        summary: "Updated",
        sections: [{ heading: "Criteria", body: "Updated body." }],
        faqs: [],
        sortOrder: 1,
        isPublished: true,
      }),
      fixtures.adminId,
    );
    expect(again.id).toBe(saved.id);

    const pages = await listPrepPagesForAdmin(exam);
    expect(pages.filter((p) => p.type === "ELIGIBILITY")).toHaveLength(1);

    await db.prepPage.deleteMany({ where: { id: saved.id } });
  });
});

describe("duplicate detection", () => {
  it("groups questions that share a normalised stem", async () => {
    const ids = { subjectId: await subjectId(), topicId: await topicId() };
    const base = {
      stem: "Vitest duplicate question?",
      correctIndex: 0,
      explanation: "",
      source: "",
      reference: "",
      difficulty: "MEDIUM" as const,
      status: "DRAFT" as const,
      subjectId: ids.subjectId,
      topicId: ids.topicId,
      examIds: [] as string[],
      educationLevelIds: [] as string[],
      province: "",
      tags: "",
    };

    const first = await createQuestion(
      questionInputSchema.parse({
        ...base,
        slug: "vitest-dup-1",
        options: ["A", "B", "C", "D"],
      }),
      fixtures.adminId,
    );
    // Same stem, different options → different content hash but a real duplicate.
    await createQuestion(
      questionInputSchema.parse({
        ...base,
        slug: "vitest-dup-2",
        options: ["A", "B", "C", "E"],
      }),
      fixtures.adminId,
    );

    const { groups } = await findDuplicateQuestions();
    const group = groups.find((g) => g.ids.includes(first.id));
    expect(group).toBeDefined();
    expect(group!.count).toBeGreaterThanOrEqual(2);

    const near = await findNearDuplicates();
    expect(Array.isArray(near)).toBe(true);

    await db.question.deleteMany({ where: { slug: { startsWith: "vitest-dup-" } } });
  });
});
