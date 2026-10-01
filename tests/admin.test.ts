import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  archiveQuestion,
  createQuestion,
  listAdminQuestions,
  listContactMessages,
  listReports,
  listTaxonomyForAdmin,
  listUsersForAdmin,
  questionInputSchema,
  resolveReport,
  setContactStatus,
  setQuestionStatus,
  setUserRole,
  setUserStatus,
  slugify,
  updateQuestion,
} from "@/services/admin";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/** Admin service tests — CRUD, taxonomy, moderation and audit logging. */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  await db.question.deleteMany({ where: { slug: { startsWith: "vitest-admin-" } } });
  await teardownFixtures();
});

function validInput(overrides: Record<string, unknown> = {}) {
  return {
    stem: "Admin-created question about gravity?",
    slug: "vitest-admin-gravity",
    options: ["9.8 m/s²", "10 m/s²", "9 m/s²", "8 m/s²"],
    correctIndex: 0,
    explanation: "Acceleration due to gravity is about 9.8 m/s².",
    source: "",
    reference: "",
    difficulty: "EASY" as const,
    status: "DRAFT" as const,
    subjectId: fixtures.subjectSlug,
    topicId: fixtures.topicSlug,
    examIds: [] as string[],
    educationLevelIds: [] as string[],
    year: undefined,
    province: "",
    tags: "physics, gravity",
    ...overrides,
  };
}

/** Resolve a taxonomy slug to its id, for building the actual DB row inputs. */
async function slugToId(kind: "subject" | "topic" | "exam" | "level", slug: string) {
  switch (kind) {
    case "subject":
      return (await db.subject.findUniqueOrThrow({ where: { slug } })).id;
    case "topic":
      return (await db.topic.findUniqueOrThrow({ where: { slug } })).id;
    case "exam":
      return (await db.exam.findUniqueOrThrow({ where: { slug } })).id;
    case "level":
      return (await db.educationLevel.findUniqueOrThrow({ where: { slug } })).id;
  }
}

async function taxonomyIds() {
  const [subjectId, topicId, examId, levelId] = await Promise.all([
    slugToId("subject", fixtures.subjectSlug),
    slugToId("topic", fixtures.topicSlug),
    slugToId("exam", fixtures.examSlug),
    slugToId("level", fixtures.levelSlug),
  ]);
  return { subjectId, topicId, examId, levelId };
}

describe("question validation schema", () => {
  it("rejects fewer than four options", () => {
    const result = questionInputSchema.safeParse(
      validInput({ options: ["A", "B", "C"] }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a malformed slug", () => {
    const result = questionInputSchema.safeParse(validInput({ slug: "Not A Slug!" }));
    expect(result.success).toBe(false);
  });

  it("accepts a well-formed question", async () => {
    const ids = await taxonomyIds();
    const result = questionInputSchema.safeParse(
      validInput({ subjectId: ids.subjectId, topicId: ids.topicId }),
    );
    expect(result.success).toBe(true);
  });
});

describe("question CRUD", () => {
  it("creates a question with options, links and tags", async () => {
    const ids = await taxonomyIds();
    const created = await createQuestion(
      questionInputSchema.parse(
        validInput({
          subjectId: ids.subjectId,
          topicId: ids.topicId,
          examIds: [ids.examId],
          educationLevelIds: [ids.levelId],
          status: "PUBLISHED",
        }),
      ),
      fixtures.adminId,
    );

    const stored = await db.question.findUniqueOrThrow({
      where: { id: created.id },
      include: {
        options: true,
        exams: true,
        subjects: true,
        topics: true,
        educationLevels: true,
        tags: true,
      },
    });
    expect(stored.options).toHaveLength(4);
    expect(stored.options.find((o) => o.isCorrect)?.text).toBe("9.8 m/s²");
    expect(stored.exams).toHaveLength(1);
    expect(stored.educationLevels).toHaveLength(1);
    expect(stored.tags.length).toBeGreaterThan(0);
    expect(stored.publishedAt).not.toBeNull();

    const auditEntry = await db.auditLog.findFirst({
      where: { action: "question.create", entityId: created.id },
    });
    expect(auditEntry).not.toBeNull();
  });

  it("auto-generates a unique slug when none is provided", async () => {
    const ids = await taxonomyIds();
    const first = await createQuestion(
      questionInputSchema.parse(
        validInput({
          slug: "",
          stem: "vitest-admin unique slug question one?",
          options: ["One", "Two", "Three", "Four"],
          subjectId: ids.subjectId,
          topicId: ids.topicId,
        }),
      ),
      fixtures.adminId,
    );
    const second = await createQuestion(
      questionInputSchema.parse(
        validInput({
          slug: "",
          stem: "vitest-admin unique slug question two?",
          options: ["Alpha", "Beta", "Gamma", "Delta"],
          subjectId: ids.subjectId,
          topicId: ids.topicId,
        }),
      ),
      fixtures.adminId,
    );
    expect(first.slug).not.toBe(second.slug);
  });

  it("updates a question and replaces its relations", async () => {
    const ids = await taxonomyIds();
    const created = await createQuestion(
      questionInputSchema.parse(
        validInput({
          slug: "vitest-admin-update",
          stem: "vitest-admin question to update?",
          options: ["Red", "Green", "Blue", "Yellow"],
          subjectId: ids.subjectId,
          topicId: ids.topicId,
        }),
      ),
      fixtures.adminId,
    );

    await updateQuestion(
      created.id,
      questionInputSchema.parse(
        validInput({
          slug: "vitest-admin-update",
          stem: "Updated admin question text?",
          options: ["One", "Two", "Three", "Four"],
          correctIndex: 2,
          subjectId: ids.subjectId,
          topicId: ids.topicId,
          examIds: [ids.examId],
          status: "PUBLISHED",
        }),
      ),
      fixtures.adminId,
    );

    const stored = await db.question.findUniqueOrThrow({
      where: { id: created.id },
      include: { options: true, exams: true },
    });
    expect(stored.stem).toBe("Updated admin question text?");
    expect(stored.options.find((o) => o.isCorrect)?.text).toBe("Three");
    expect(stored.exams).toHaveLength(1);
  });

  it("publishes, unpublishes and archives a question", async () => {
    const ids = await taxonomyIds();
    const created = await createQuestion(
      questionInputSchema.parse(
        validInput({
          slug: "vitest-admin-status",
          stem: "vitest-admin status lifecycle question?",
          options: ["Mercury", "Venus", "Earth", "Mars"],
          subjectId: ids.subjectId,
          topicId: ids.topicId,
          status: "DRAFT",
        }),
      ),
      fixtures.adminId,
    );

    await setQuestionStatus(created.id, "PUBLISHED", fixtures.adminId);
    let stored = await db.question.findUniqueOrThrow({ where: { id: created.id } });
    expect(stored.status).toBe("PUBLISHED");
    expect(stored.publishedAt).not.toBeNull();

    await archiveQuestion(created.id, fixtures.adminId);
    stored = await db.question.findUniqueOrThrow({ where: { id: created.id } });
    expect(stored.status).toBe("ARCHIVED");
  });
});

describe("admin listings", () => {
  it("filters questions and paginates", async () => {
    const result = await listAdminQuestions({ search: "vitest-admin", pageSize: 5 });
    expect(result.rows.length).toBeLessThanOrEqual(5);
    expect(result.page).toBe(1);
    expect(result.total).toBeGreaterThan(0);
  });

  it("returns taxonomy with question counts", async () => {
    const taxonomy = await listTaxonomyForAdmin();
    expect(taxonomy.exams.length).toBeGreaterThan(0);
    expect(taxonomy.subjects.length).toBeGreaterThan(0);
    expect(taxonomy.levels.length).toBeGreaterThan(0);
    expect(typeof taxonomy.exams[0].questionCount).toBe("number");
  });

  it("lists users with their roles", async () => {
    const users = await listUsersForAdmin("vitest-");
    expect(users.length).toBeGreaterThanOrEqual(2);
    expect(users[0].role).toBeDefined();
  });
});

describe("user moderation", () => {
  it("changes a user's role and status", async () => {
    await setUserRole(fixtures.userId, "admin", fixtures.adminId);
    let user = await db.user.findUniqueOrThrow({
      where: { id: fixtures.userId },
      include: { role: true },
    });
    expect(user.role.key).toBe("admin");

    await setUserRole(fixtures.userId, "user", fixtures.adminId);
    await setUserStatus(fixtures.userId, "SUSPENDED", fixtures.adminId);
    user = await db.user.findUniqueOrThrow({
      where: { id: fixtures.userId },
      include: { role: true },
    });
    expect(user.status).toBe("SUSPENDED");
    expect(user.role.key).toBe("user");

    await setUserStatus(fixtures.userId, "ACTIVE", fixtures.adminId);
  });
});

describe("moderation queues", () => {
  it("resolves a report and records the resolver", async () => {
    const report = await db.report.create({
      data: {
        questionId: fixtures.questionIds[0],
        userId: fixtures.userId,
        reason: "TYPO",
        message: "Small typo in option B.",
      },
    });

    const open = await listReports("OPEN");
    expect(open.some((r) => r.id === report.id)).toBe(true);

    await resolveReport(report.id, "RESOLVED", fixtures.adminId, "Fixed.");
    const resolved = await db.report.findUniqueOrThrow({ where: { id: report.id } });
    expect(resolved.status).toBe("RESOLVED");
    expect(resolved.resolvedById).toBe(fixtures.adminId);
    expect(resolved.resolvedAt).not.toBeNull();
  });

  it("updates a contact message status", async () => {
    const message = await db.contactMessage.create({
      data: {
        name: "Test Sender",
        email: "vitest-sender@example.test",
        subject: "Hello",
        message: "Testing the contact queue.",
      },
    });

    const list = await listContactMessages("NEW");
    expect(list.some((m) => m.id === message.id)).toBe(true);

    await setContactStatus(message.id, "READ", fixtures.adminId);
    const stored = await db.contactMessage.findUniqueOrThrow({
      where: { id: message.id },
    });
    expect(stored.status).toBe("READ");
  });
});

describe("slugify", () => {
  it("produces clean, URL-safe slugs", () => {
    expect(slugify("What is the Capital of Pakistan?")).toBe(
      "what-is-the-capital-of-pakistan",
    );
    expect(slugify("   Trim   Me   ")).toBe("trim-me");
  });
});
