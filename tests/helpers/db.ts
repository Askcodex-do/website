import { beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Shared test harness.
 *
 * Integration tests run against a real PostgreSQL database (the same engine used
 * in production) rather than mocks, so the Question Selection Engine, quiz
 * grading and admin services are exercised end-to-end. Set TEST_DATABASE_URL to
 * point at a disposable database; it falls back to DATABASE_URL.
 */

export const db = new PrismaClient({
  datasources: {
    db: { url: process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL },
  },
});

export interface TestFixtures {
  adminId: string;
  userId: string;
  userRoleId: string;
  adminRoleId: string;
  examSlug: string;
  subjectSlug: string;
  topicSlug: string;
  subSubjectSlug: string;
  levelSlug: string;
  unlinkedLevelSlug: string;
  offLevelQuestionId: string;
  questionIds: string[];
}

const PREFIX = "vitest-";
const TEST_EXAM_SLUG = `${PREFIX}exam`;
const TEST_SUBJECT_SLUG = `${PREFIX}subject`;
const TEST_TOPIC_SLUG = `${PREFIX}topic`;
const TEST_SUB_SUBJECT_SLUG = `${PREFIX}sub-subject`;
const TEST_LEVEL_SLUG = `${PREFIX}level`;
const TEST_UNLINKED_LEVEL_SLUG = `${PREFIX}other-level`;

/**
 * Create a self-contained fixture graph. Every row is namespaced with the
 * `vitest-` prefix so cleanup can remove exactly what it created and never
 * touch seeded production content.
 */
export async function setupFixtures(): Promise<TestFixtures> {
  const adminRole = await db.role.upsert({
    where: { key: "admin" },
    update: {},
    create: { key: "admin", name: "Administrator", permissions: [], isSystem: true },
  });
  const userRole = await db.role.upsert({
    where: { key: "user" },
    update: {},
    create: { key: "user", name: "User", permissions: [], isSystem: true },
  });

  const passwordHash = await bcrypt.hash("Test@12345", 4);

  const admin = await db.user.upsert({
    where: { email: `${PREFIX}admin@example.test` },
    update: { roleId: adminRole.id },
    create: {
      email: `${PREFIX}admin@example.test`,
      name: "Test Admin",
      passwordHash,
      roleId: adminRole.id,
      emailVerifiedAt: new Date(),
    },
  });
  const user = await db.user.upsert({
    where: { email: `${PREFIX}user@example.test` },
    update: { roleId: userRole.id },
    create: {
      email: `${PREFIX}user@example.test`,
      name: "Test User",
      passwordHash,
      roleId: userRole.id,
      emailVerifiedAt: new Date(),
    },
  });

  const level = await db.educationLevel.upsert({
    where: { slug: TEST_LEVEL_SLUG },
    update: {},
    create: { slug: TEST_LEVEL_SLUG, name: "Test Level", rank: 99 },
  });
  // A second level the fixture exam is deliberately NOT linked to, so the
  // "exam/education combination matches nothing" rule can be tested without
  // depending on any seeded taxonomy.
  const unlinkedLevel = await db.educationLevel.upsert({
    where: { slug: TEST_UNLINKED_LEVEL_SLUG },
    update: {},
    create: { slug: TEST_UNLINKED_LEVEL_SLUG, name: "Unlinked Level", rank: 98 },
  });
  const subject = await db.subject.upsert({
    where: { slug: TEST_SUBJECT_SLUG },
    update: {},
    create: { slug: TEST_SUBJECT_SLUG, name: "Test Subject" },
  });
  const topic = await db.topic.upsert({
    where: { slug: TEST_TOPIC_SLUG },
    update: {},
    create: { slug: TEST_TOPIC_SLUG, name: "Test Topic", subjectId: subject.id },
  });
  const subSubject = await db.subSubject.upsert({
    where: { slug: TEST_SUB_SUBJECT_SLUG },
    update: { subjectId: subject.id },
    create: {
      slug: TEST_SUB_SUBJECT_SLUG,
      name: "Test Sub-Subject",
      subjectId: subject.id,
    },
  });
  const exam = await db.exam.upsert({
    where: { slug: TEST_EXAM_SLUG },
    update: {},
    create: {
      slug: TEST_EXAM_SLUG,
      name: "Test Exam",
      shortName: "TEST",
      type: "GENERAL",
    },
  });
  await db.examConfiguration.upsert({
    where: { examId: exam.id },
    update: { mode: "RANDOM" },
    create: {
      examId: exam.id,
      mode: "RANDOM",
      defaultQuestionCount: 5,
      timeLimitMinutes: 10,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
    },
  });
  await db.examSubject.createMany({
    data: [{ examId: exam.id, subjectId: subject.id }],
    skipDuplicates: true,
  });
  await db.examEducationLevel.createMany({
    data: [{ examId: exam.id, educationLevelId: level.id }],
    skipDuplicates: true,
  });

  // A deterministic pool of questions for selection/quiz tests.
  const questionIds: string[] = [];
  for (let i = 0; i < 30; i++) {
    const slug = `${PREFIX}q-${i}`;
    const correct = `Correct ${i}`;
    const options = [correct, `Wrong A ${i}`, `Wrong B ${i}`, `Wrong C ${i}`];
    const question = await db.question.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        stem: `Test question number ${i}?`,
        difficulty: i % 3 === 0 ? "EASY" : i % 3 === 1 ? "MEDIUM" : "HARD",
        status: "PUBLISHED",
        publishedAt: new Date(),
        options: {
          create: options.map((text, index) => ({
            label: ["A", "B", "C", "D"][index],
            text,
            isCorrect: index === 0,
            sortOrder: index,
          })),
        },
        subjects: { create: { subjectId: subject.id } },
        subSubjects: { create: { subSubjectId: subSubject.id } },
        topics: { create: { topicId: topic.id } },
        exams: { create: { examId: exam.id } },
        educationLevels: { create: { educationLevelId: level.id } },
      },
    });
    questionIds.push(question.id);
  }

  // A question on the exam but at a level the exam is NOT linked to. The
  // qualification gate must keep it out of the exam's pool.
  const offLevel = await db.question.upsert({
    where: { slug: `${PREFIX}off-level-q` },
    update: {},
    create: {
      slug: `${PREFIX}off-level-q`,
      stem: "Test question at an unrelated education level?",
      difficulty: "MEDIUM",
      status: "PUBLISHED",
      publishedAt: new Date(),
      options: {
        create: ["Correct", "Wrong A", "Wrong B", "Wrong C"].map((text, index) => ({
          label: ["A", "B", "C", "D"][index],
          text,
          isCorrect: index === 0,
          sortOrder: index,
        })),
      },
      subjects: { create: { subjectId: subject.id } },
      topics: { create: { topicId: topic.id } },
      exams: { create: { examId: exam.id } },
      educationLevels: { create: { educationLevelId: unlinkedLevel.id } },
    },
  });

  return {
    adminId: admin.id,
    userId: user.id,
    userRoleId: userRole.id,
    adminRoleId: adminRole.id,
    examSlug: TEST_EXAM_SLUG,
    subjectSlug: TEST_SUBJECT_SLUG,
    topicSlug: TEST_TOPIC_SLUG,
    subSubjectSlug: TEST_SUB_SUBJECT_SLUG,
    levelSlug: TEST_LEVEL_SLUG,
    unlinkedLevelSlug: TEST_UNLINKED_LEVEL_SLUG,
    offLevelQuestionId: offLevel.id,
    questionIds,
  };
}

/** Remove everything the fixtures created, in dependency-safe order. */
export async function teardownFixtures(): Promise<void> {
  const questions = await db.question.findMany({
    where: { slug: { startsWith: PREFIX } },
    select: { id: true },
  });
  const questionIds = questions.map((q) => q.id);

  await db.userAnswer.deleteMany({ where: { questionId: { in: questionIds } } });
  await db.quizAttemptQuestion.deleteMany({
    where: { questionId: { in: questionIds } },
  });
  await db.quizAttempt.deleteMany({
    where: { guestSessionId: { startsWith: PREFIX } },
  });
  await db.bookmark.deleteMany({ where: { questionId: { in: questionIds } } });
  await db.like.deleteMany({ where: { questionId: { in: questionIds } } });
  await db.report.deleteMany({ where: { questionId: { in: questionIds } } });
  await db.question.deleteMany({ where: { slug: { startsWith: PREFIX } } });

  const users = await db.user.findMany({
    where: { email: { startsWith: PREFIX } },
    select: { id: true },
  });
  const userIds = users.map((u) => u.id);
  await db.quizAttempt.deleteMany({ where: { userId: { in: userIds } } });
  await db.user.deleteMany({ where: { id: { in: userIds } } });

  await db.topic.deleteMany({ where: { slug: TEST_TOPIC_SLUG } });
  await db.subSubject.deleteMany({ where: { slug: TEST_SUB_SUBJECT_SLUG } });
  await db.subject.deleteMany({ where: { slug: TEST_SUBJECT_SLUG } });
  await db.exam.deleteMany({ where: { slug: TEST_EXAM_SLUG } });
  await db.educationLevel.deleteMany({ where: { slug: TEST_LEVEL_SLUG } });
  await db.educationLevel.deleteMany({ where: { slug: TEST_UNLINKED_LEVEL_SLUG } });
  await db.contactMessage.deleteMany({ where: { email: { startsWith: PREFIX } } });
}

export function registerFixtureLifecycle() {
  let fixtures: TestFixtures;
  beforeAll(async () => {
    await teardownFixtures();
    fixtures = await setupFixtures();
  });
  afterAll(async () => {
    await teardownFixtures();
    await db.$disconnect();
  });
  return () => fixtures;
}
