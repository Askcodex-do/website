/**
 * Database seed.
 *
 * Produces a complete, working platform from a clean database:
 *   - roles and their permissions
 *   - an administrator and a demo user
 *   - education levels, subjects and topics
 *   - exam blueprints with their Question Selection Engine configuration
 *   - 10,000+ questions with full metadata (generated deterministically)
 *   - default site settings and social links
 *
 * Run with: npm run db:seed
 */

import { randomUUID } from "node:crypto";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { contentHash } from "../src/lib/utils";
import { EDUCATION_LEVELS, EXAMS, SUBJECTS, SITE_SETTINGS_DEFAULT } from "./seed/taxonomy";
import { buildAllQuestions } from "./seed/generators";
import type { SeedQuestion } from "./seed/types";

const db = new PrismaClient();

const CHUNK = 1000;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function seedRoles() {
  const roles = [
    {
      key: "guest",
      name: "Guest",
      description: "Anonymous visitor with access to public content only.",
      permissions: [] as string[],
      isSystem: true,
      sortOrder: 0,
    },
    {
      key: "user",
      name: "Registered User",
      description: "Signed-in learner with quiz history, bookmarks and likes.",
      permissions: [] as string[],
      isSystem: true,
      sortOrder: 1,
    },
    {
      key: "admin",
      name: "Administrator",
      description: "Full access to content, users, reports, SEO and settings.",
      permissions: [
        "question:read",
        "question:write",
        "question:delete",
        "question:publish",
        "taxonomy:write",
        "exam:configure",
        "user:manage",
        "report:manage",
        "contact:manage",
        "seo:manage",
        "settings:manage",
        "analytics:view",
      ],
      isSystem: true,
      sortOrder: 2,
    },
  ];

  for (const role of roles) {
    await db.role.upsert({
      where: { key: role.key },
      update: {
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      },
      create: role,
    });
  }

  return db.role.findMany();
}

async function seedUsers() {
  const adminRole = await db.role.findUniqueOrThrow({ where: { key: "admin" } });
  const userRole = await db.role.findUniqueOrThrow({ where: { key: "user" } });

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";
  const userEmail = process.env.SEED_USER_EMAIL ?? "user@example.com";
  const userPassword = process.env.SEED_USER_PASSWORD ?? "User@12345";

  await db.user.upsert({
    where: { email: adminEmail },
    update: { roleId: adminRole.id },
    create: {
      email: adminEmail,
      name: "Site Administrator",
      passwordHash: await bcrypt.hash(adminPassword, 12),
      roleId: adminRole.id,
      emailVerifiedAt: new Date(),
    },
  });

  await db.user.upsert({
    where: { email: userEmail },
    update: { roleId: userRole.id },
    create: {
      email: userEmail,
      name: "Demo User",
      passwordHash: await bcrypt.hash(userPassword, 12),
      roleId: userRole.id,
      emailVerifiedAt: new Date(),
    },
  });

  console.info(
    `[seed] users ready — admin: ${adminEmail}, user: ${userEmail}`,
  );
}

async function seedTaxonomy() {
  for (const level of EDUCATION_LEVELS) {
    await db.educationLevel.upsert({
      where: { slug: level.slug },
      update: { name: level.name, rank: level.rank, description: level.description },
      create: level,
    });
  }

  for (const [subjectIndex, subject] of SUBJECTS.entries()) {
    const created = await db.subject.upsert({
      where: { slug: subject.slug },
      update: {
        name: subject.name,
        description: subject.description,
        sortOrder: subjectIndex,
      },
      create: {
        slug: subject.slug,
        name: subject.name,
        description: subject.description,
        sortOrder: subjectIndex,
      },
    });

    for (const [topicIndex, topic] of subject.topics.entries()) {
      await db.topic.upsert({
        where: { slug: topic.slug },
        update: {
          name: topic.name,
          description: topic.description ?? null,
          subjectId: created.id,
          sortOrder: topicIndex,
        },
        create: {
          slug: topic.slug,
          name: topic.name,
          description: topic.description ?? null,
          subjectId: created.id,
          sortOrder: topicIndex,
        },
      });
    }
  }
}

async function seedExams() {
  for (const exam of EXAMS) {
    const created = await db.exam.upsert({
      where: { slug: exam.slug },
      update: {
        name: exam.name,
        shortName: exam.shortName,
        description: exam.description,
        type: exam.type,
        province: exam.province ?? null,
        isFeatured: exam.isFeatured ?? false,
        sortOrder: exam.sortOrder,
      },
      create: {
        slug: exam.slug,
        name: exam.name,
        shortName: exam.shortName,
        description: exam.description,
        type: exam.type,
        province: exam.province ?? null,
        isFeatured: exam.isFeatured ?? false,
        sortOrder: exam.sortOrder,
      },
    });

    await db.examConfiguration.upsert({
      where: { examId: created.id },
      update: {
        mode: exam.configuration.mode,
        defaultQuestionCount: exam.configuration.defaultQuestionCount,
        timeLimitMinutes: exam.configuration.timeLimitMinutes,
        negativeMarking: exam.configuration.negativeMarking,
        negativeMarkFactor: exam.configuration.negativeMarkFactor ?? 0,
        marksPerQuestion: exam.configuration.marksPerQuestion ?? 1,
        passingPercentage: exam.configuration.passingPercentage ?? 50,
        staticOrderSeed: exam.configuration.staticOrderSeed ?? null,
      },
      create: {
        examId: created.id,
        mode: exam.configuration.mode,
        defaultQuestionCount: exam.configuration.defaultQuestionCount,
        timeLimitMinutes: exam.configuration.timeLimitMinutes,
        negativeMarking: exam.configuration.negativeMarking,
        negativeMarkFactor: exam.configuration.negativeMarkFactor ?? 0,
        marksPerQuestion: exam.configuration.marksPerQuestion ?? 1,
        passingPercentage: exam.configuration.passingPercentage ?? 50,
        staticOrderSeed: exam.configuration.staticOrderSeed ?? null,
      },
    });

    // Exam → education levels.
    const levels = await db.educationLevel.findMany({
      where: { slug: { in: exam.educationLevels } },
      select: { id: true },
    });
    await db.examEducationLevel.deleteMany({ where: { examId: created.id } });
    await db.examEducationLevel.createMany({
      data: levels.map((l) => ({ examId: created.id, educationLevelId: l.id })),
      skipDuplicates: true,
    });

    // Exam → subjects.
    const subjects = await db.subject.findMany({
      where: { slug: { in: exam.subjects } },
      select: { id: true },
    });
    await db.examSubject.deleteMany({ where: { examId: created.id } });
    await db.examSubject.createMany({
      data: subjects.map((s) => ({ examId: created.id, subjectId: s.id })),
      skipDuplicates: true,
    });
  }
}

async function seedSettings() {
  for (const setting of SITE_SETTINGS_DEFAULT) {
    await db.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value as Prisma.InputJsonValue, group: setting.group },
      create: {
        key: setting.key,
        value: setting.value as Prisma.InputJsonValue,
        group: setting.group,
      },
    });
  }
}

async function seedQuestions() {
  const existing = await db.question.count();
  if (existing > 0 && process.env.SEED_FORCE !== "1") {
    console.info(
      `[seed] ${existing} questions already present — skipping question seed. ` +
        `Set SEED_FORCE=1 to reseed.`,
    );
    return;
  }

  if (existing > 0) {
    // Reseeding replaces the bank wholesale. Options, exam/subject/topic/level
    // links and tags all cascade from Question, so one delete clears them.
    console.info(`[seed] SEED_FORCE=1 — clearing ${existing} existing questions`);
    await db.question.deleteMany({});
  }

  const subjects = await db.subject.findMany({ select: { id: true, slug: true } });
  const topics = await db.topic.findMany({ select: { id: true, slug: true } });
  const exams = await db.exam.findMany({ select: { id: true, slug: true } });
  const levels = await db.educationLevel.findMany({ select: { id: true, slug: true } });

  const subjectBySlug = new Map(subjects.map((s) => [s.slug, s.id]));
  const topicBySlug = new Map(topics.map((t) => [t.slug, t.id]));
  const examBySlug = new Map(exams.map((e) => [e.slug, e.id]));
  const levelBySlug = new Map(levels.map((l) => [l.slug, l.id]));

  // Which exams should each subject's questions link to? Prefer the exam whose
  // subject list contains it; fall back to all exams when none match.
  const examSlugsForSubject: Record<string, string[]> = {};
  for (const subject of SUBJECTS) {
    const matching = EXAMS.filter((e) => e.subjects.includes(subject.slug)).map(
      (e) => e.slug,
    );
    examSlugsForSubject[subject.slug] = matching.length
      ? matching
      : EXAMS.map((e) => e.slug);
  }

  // Only link questions to exams that actually exist in the database.
  for (const key of Object.keys(examSlugsForSubject)) {
    examSlugsForSubject[key] = examSlugsForSubject[key].filter((slug) =>
      examBySlug.has(slug),
    );
  }

  const allEducationSlugs = EDUCATION_LEVELS.map((l) => l.slug);
  const generatedRaw = buildAllQuestions(
    { educationLevels: allEducationSlugs, exams: [] },
    examSlugsForSubject,
  );

  // Content de-duplication: the database enforces a unique contentHash, so drop
  // any repeated (stem + options + answer) combinations before inserting.
  const seenHashes = new Set<string>();
  const generated = generatedRaw.filter((q) => {
    const hash = contentHash({
      stem: q.stem,
      options: q.options,
      correct: q.options[q.correct] ?? "",
    });
    if (seenHashes.has(hash)) return false;
    seenHashes.add(hash);
    return true;
  });

  console.info(
    `[seed] generated ${generatedRaw.length} questions (${generated.length} unique after de-duplication)`,
  );

  // Derive meaningful education-level tags. A question is tagged with the
  // intersection of (a) the education levels implied by its difficulty and
  // (b) the education levels of the exams it belongs to. This is what makes
  // education-level filtering actually narrow the result set.
  const DIFFICULTY_LEVELS: Record<string, string[]> = {
    EASY: ["primary", "middle", "matric"],
    MEDIUM: ["matric", "intermediate", "graduation"],
    HARD: ["intermediate", "graduation", "post-graduation"],
  };
  const examLevelsBySlug = new Map(EXAMS.map((e) => [e.slug, e.educationLevels]));

  for (const question of generated) {
    const examLevels = new Set<string>();
    for (const examSlug of question.exams) {
      for (const level of examLevelsBySlug.get(examSlug) ?? []) {
        examLevels.add(level);
      }
    }
    const difficultyLevels = new Set(
      DIFFICULTY_LEVELS[question.difficulty ?? "MEDIUM"] ?? [],
    );

    let resolved = [...examLevels].filter((l) => difficultyLevels.has(l));
    if (resolved.length === 0) {
      resolved = examLevels.size > 0 ? [...examLevels] : allEducationSlugs;
    }
    question.educationLevels = resolved;
  }

  // Ensure all tags exist.
  const tagSlugs = new Set<string>();
  for (const q of generated) {
    for (const tag of q.tags ?? []) tagSlugs.add(tag);
  }
  const tagIdBySlug = new Map<string, string>();
  for (const slug of tagSlugs) {
    const tag = await db.tag.upsert({
      where: { slug },
      update: {},
      create: { slug, name: slug.replace(/-/g, " ") },
    });
    tagIdBySlug.set(slug, tag.id);
  }

  // Prepare rows. Ids are generated client-side so relation rows can be built
  // without a second read-back of 10,000 rows.
  type QuestionRow = Prisma.QuestionCreateManyInput;
  type OptionRow = Prisma.QuestionOptionCreateManyInput;
  const questionRows: QuestionRow[] = [];
  const optionRows: OptionRow[] = [];
  const examLinks: Prisma.QuestionExamCreateManyInput[] = [];
  const subjectLinks: Prisma.QuestionSubjectCreateManyInput[] = [];
  const topicLinks: Prisma.QuestionTopicCreateManyInput[] = [];
  const levelLinks: Prisma.QuestionEducationLevelCreateManyInput[] = [];
  const tagLinks: Prisma.QuestionTagCreateManyInput[] = [];

  const now = new Date();

  const prepare = (q: SeedQuestion) => {
    const subjectId = subjectBySlug.get(q.subject);
    const topicId = topicBySlug.get(q.topic);
    if (!subjectId || !topicId) return; // skip malformed seed data
    const id = randomUUID();
    const labels = ["A", "B", "C", "D"];

    questionRows.push({
      id,
      slug: q.slug,
      stem: q.stem,
      explanation: q.explanation ?? null,
      source: q.source ?? null,
      reference: q.reference ?? null,
      difficulty: q.difficulty ?? "MEDIUM",
      status: q.status ?? "PUBLISHED",
      type: "SINGLE_CHOICE",
      language: "ENGLISH",
      year: q.year ?? null,
      province: q.province ?? null,
      staticOrder: q.staticOrder ?? null,
      contentHash: contentHash({
        stem: q.stem,
        options: q.options,
        correct: q.options[q.correct] ?? "",
      }),
      publishedAt: (q.status ?? "PUBLISHED") === "PUBLISHED" ? now : null,
    });

    q.options.forEach((text, index) => {
      optionRows.push({
        id: randomUUID(),
        questionId: id,
        label: labels[index] ?? String(index + 1),
        text,
        isCorrect: index === q.correct,
        sortOrder: index,
      });
    });

    for (const examSlug of q.exams) {
      const examId = examBySlug.get(examSlug);
      if (examId) examLinks.push({ questionId: id, examId });
    }
    subjectLinks.push({ questionId: id, subjectId });
    topicLinks.push({ questionId: id, topicId });
    for (const levelSlug of q.educationLevels) {
      const levelId = levelBySlug.get(levelSlug);
      if (levelId) levelLinks.push({ questionId: id, educationLevelId: levelId });
    }
    for (const tag of q.tags ?? []) {
      const tagId = tagIdBySlug.get(tag);
      if (tagId) tagLinks.push({ questionId: id, tagId });
    }
  };

  for (const q of generated) prepare(q);

  console.info(
    `[seed] inserting ${questionRows.length} questions, ` +
      `${optionRows.length} options, ${examLinks.length} exam links...`,
  );

  // Questions first (options/links reference them).
  for (const batch of chunk(questionRows, CHUNK)) {
    await db.question.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(optionRows, CHUNK * 4)) {
    await db.questionOption.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(subjectLinks, CHUNK * 4)) {
    await db.questionSubject.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(topicLinks, CHUNK * 4)) {
    await db.questionTopic.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(examLinks, CHUNK * 4)) {
    await db.questionExam.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(levelLinks, CHUNK * 4)) {
    await db.questionEducationLevel.createMany({ data: batch, skipDuplicates: true });
  }
  for (const batch of chunk(tagLinks, CHUNK * 4)) {
    await db.questionTag.createMany({ data: batch, skipDuplicates: true });
  }

  console.info("[seed] questions inserted");
}

async function main() {
  console.info("[seed] starting");
  await seedRoles();
  await seedUsers();
  await seedTaxonomy();
  await seedExams();
  await seedSettings();
  await seedQuestions();

  const counts = {
    exams: await db.exam.count(),
    subjects: await db.subject.count(),
    topics: await db.topic.count(),
    questions: await db.question.count(),
    options: await db.questionOption.count(),
  };
  console.info("[seed] complete", counts);
}

main()
  .catch((error) => {
    console.error("[seed] failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
