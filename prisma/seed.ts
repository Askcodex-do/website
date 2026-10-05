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
import { EDUCATION_LEVELS, SUBJECTS, SITE_SETTINGS_DEFAULT } from "./seed/taxonomy";
import {
  CATEGORIES,
  ORGANIZATIONS,
  PAKISTAN_EXAMS,
} from "./seed/taxonomy-pakistan";
import { buildPrepPages, PREVIOUS_PAPERS } from "./seed/content";
import { buildAllQuestions } from "./seed/generators";
import type { SeedQuestion } from "./seed/types";

const db = new PrismaClient();

// Exam blueprints come from the Pakistan catalogue. Kept in one constant so the
// generators, link-resolution and exam seeding all agree.
const EXAMS = PAKISTAN_EXAMS;

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

    // Sub-subjects (optional middle layer).
    const subSubjectIdBySlug = new Map<string, string>();
    for (const [subIndex, sub] of (subject.subSubjects ?? []).entries()) {
      const row = await db.subSubject.upsert({
        where: { slug: sub.slug },
        update: {
          name: sub.name,
          description: sub.description ?? null,
          subjectId: created.id,
          sortOrder: subIndex,
        },
        create: {
          slug: sub.slug,
          name: sub.name,
          description: sub.description ?? null,
          subjectId: created.id,
          sortOrder: subIndex,
        },
      });
      subSubjectIdBySlug.set(sub.slug, row.id);
    }

    for (const [topicIndex, topic] of subject.topics.entries()) {
      const subSubjectId = topic.subSubject
        ? (subSubjectIdBySlug.get(topic.subSubject) ?? null)
        : null;
      const createdTopic = await db.topic.upsert({
        where: { slug: topic.slug },
        update: {
          name: topic.name,
          description: topic.description ?? null,
          subjectId: created.id,
          subSubjectId,
          sortOrder: topicIndex,
        },
        create: {
          slug: topic.slug,
          name: topic.name,
          description: topic.description ?? null,
          subjectId: created.id,
          subSubjectId,
          sortOrder: topicIndex,
        },
      });

      for (const [subIndex, subtopic] of (topic.subtopics ?? []).entries()) {
        await db.subtopic.upsert({
          where: { slug: subtopic.slug },
          update: {
            name: subtopic.name,
            description: subtopic.description ?? null,
            topicId: createdTopic.id,
            sortOrder: subIndex,
          },
          create: {
            slug: subtopic.slug,
            name: subtopic.name,
            description: subtopic.description ?? null,
            topicId: createdTopic.id,
            sortOrder: subIndex,
          },
        });
      }
    }
  }
}

async function seedCategoriesAndOrganizations() {
  for (const category of CATEGORIES) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon ?? null,
        sortOrder: category.sortOrder,
      },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        icon: category.icon ?? null,
        sortOrder: category.sortOrder,
      },
    });
  }

  for (const org of ORGANIZATIONS) {
    await db.organization.upsert({
      where: { slug: org.slug },
      update: {
        name: org.name,
        shortName: org.shortName ?? null,
        website: org.website ?? null,
        description: org.description ?? null,
      },
      create: {
        slug: org.slug,
        name: org.name,
        shortName: org.shortName ?? null,
        website: org.website ?? null,
        description: org.description ?? null,
      },
    });
  }
}

async function seedExams() {
  const categoryBySlug = new Map(
    (await db.category.findMany({ select: { id: true, slug: true } })).map((c) => [
      c.slug,
      c.id,
    ]),
  );
  const orgBySlug = new Map(
    (await db.organization.findMany({ select: { id: true, slug: true } })).map((o) => [
      o.slug,
      o.id,
    ]),
  );

  for (const exam of EXAMS) {
    const meta = {
      name: exam.name,
      shortName: exam.shortName,
      description: exam.description,
      type: exam.type,
      province: exam.province ?? null,
      isFeatured: exam.isFeatured ?? false,
      sortOrder: exam.sortOrder,
      categoryId: exam.category ? (categoryBySlug.get(exam.category) ?? null) : null,
      organizationId: exam.organization
        ? (orgBySlug.get(exam.organization) ?? null)
        : null,
      eligibility: exam.eligibility ?? null,
      testPattern: exam.testPattern ?? null,
      syllabus: exam.syllabus ?? null,
      duration: exam.duration ?? null,
      totalMarks: exam.totalMarks ?? null,
      website: exam.website ?? null,
    };

    const created = await db.exam.upsert({
      where: { slug: exam.slug },
      update: meta,
      create: { slug: exam.slug, ...meta },
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
  const subSubjects = await db.subSubject.findMany({
    select: { id: true, slug: true },
  });
  const subSubjectBySlug = new Map(subSubjects.map((s) => [s.slug, s.id]));

  // Exact taxonomy mapping: a topic belongs to a sub-subject by definition, so
  // linking a question to that sub-subject is not a guess. Subtopics are left
  // unmapped (they require per-question judgement) rather than fabricated.
  const topicSubSubject: Record<string, string> = {};
  for (const subject of SUBJECTS) {
    for (const topic of subject.topics) {
      if (topic.subSubject) topicSubSubject[topic.slug] = topic.subSubject;
    }
  }

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
  const subSubjectLinks: Prisma.QuestionSubSubjectCreateManyInput[] = [];

  const now = new Date();

  const prepare = (q: SeedQuestion) => {
    const subjectId = subjectBySlug.get(q.subject);
    const topicId = topicBySlug.get(q.topic);
    if (!subjectId || !topicId) return; // skip malformed seed data
    const id = randomUUID();
    const labels = ["A", "B", "C", "D"];

    // Verification semantics: a question is only "verified" when it carries a
    // source/reference. Generated questions stay UNVERIFIED with origin
    // GENERATED; the admin review workflow promotes them once checked.
    const hasSource = Boolean(q.source || q.reference);
    const verification = hasSource ? "VERIFIED" : "UNVERIFIED";
    const origin = q.origin ?? (hasSource ? "VERIFIED_PRACTICE" : "GENERATED");

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
      verification,
      origin,
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
    const subSubjectSlug = topicSubSubject[q.topic];
    if (subSubjectSlug) {
      const subSubjectId = subSubjectBySlug.get(subSubjectSlug);
      if (subSubjectId) subSubjectLinks.push({ questionId: id, subSubjectId });
    }
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
  for (const batch of chunk(subSubjectLinks, CHUNK * 4)) {
    await db.questionSubSubject.createMany({ data: batch, skipDuplicates: true });
  }

  console.info("[seed] questions inserted");
}

/**
 * Seed preparation pages for every exam from the shared template, and a small
 * set of clearly-labelled practice-reconstruction "previous papers". Real past
 * papers are added by admins with sources; nothing here is fabricated as
 * authentic.
 */
async function seedPrepPages() {
  const examBySlug = new Map(
    (await db.exam.findMany({ select: { id: true, slug: true } })).map((e) => [
      e.slug,
      e.id,
    ]),
  );

  for (const exam of EXAMS) {
    const examId = examBySlug.get(exam.slug);
    if (!examId) continue;
    for (const page of buildPrepPages(exam)) {
      const data = {
        examId,
        type: page.type,
        title: page.title,
        summary: page.summary,
        sections: page.sections as unknown as Prisma.InputJsonValue,
        faqs: (page.faqs ?? []) as unknown as Prisma.InputJsonValue,
        sortOrder: page.sortOrder,
        isPublished: true,
      };
      await db.prepPage.upsert({
        where: { slug: page.slug },
        update: data,
        create: { slug: page.slug, ...data },
      });
    }
  }
  console.info(`[seed] preparation pages seeded`);
}

async function seedPreviousPapers() {
  const examBySlug = new Map(
    (await db.exam.findMany({ select: { id: true, slug: true } })).map((e) => [
      e.slug,
      e.id,
    ]),
  );
  const subjectBySlug = new Map(
    (await db.subject.findMany({ select: { id: true, slug: true } })).map((s) => [
      s.slug,
      s.id,
    ]),
  );

  for (const paper of PREVIOUS_PAPERS) {
    const examId = examBySlug.get(paper.examSlug) ?? null;
    const subjectId = subjectBySlug.get(paper.subjectSlug) ?? null;

    const created = await db.previousPaper.upsert({
      where: { slug: paper.slug },
      update: {
        title: paper.title,
        year: paper.year,
        paperName: paper.paperName,
        session: paper.session ?? null,
        source: paper.source,
        verified: paper.verified,
        examId,
        subjectId,
      },
      create: {
        slug: paper.slug,
        title: paper.title,
        year: paper.year,
        paperName: paper.paperName,
        session: paper.session ?? null,
        source: paper.source,
        verified: paper.verified,
        examId,
        subjectId,
      },
    });

    // Attach a deterministic slice of the matching pool as the paper's questions.
    const where: Prisma.QuestionWhereInput = {
      status: "PUBLISHED",
      ...(subjectId ? { subjects: { some: { subjectId } } } : {}),
    };
    const questions = await db.question.findMany({
      where,
      orderBy: [{ staticOrder: { sort: "asc", nulls: "last" } }, { id: "asc" }],
      take: paper.questionCount,
      select: { id: true },
    });
    await db.previousPaperQuestion.deleteMany({ where: { paperId: created.id } });
    await db.previousPaperQuestion.createMany({
      data: questions.map((q, index) => ({
        paperId: created.id,
        questionId: q.id,
        orderIndex: index,
      })),
      skipDuplicates: true,
    });
  }
  console.info(`[seed] previous papers seeded (${PREVIOUS_PAPERS.length})`);
}

async function main() {
  console.info("[seed] starting");
  await seedRoles();
  await seedUsers();
  await seedCategoriesAndOrganizations();
  await seedTaxonomy();
  await seedExams();
  await seedSettings();
  await seedQuestions();
  await seedPrepPages();
  await seedPreviousPapers();

  const counts = {
    categories: await db.category.count(),
    organizations: await db.organization.count(),
    exams: await db.exam.count(),
    subjects: await db.subject.count(),
    subSubjects: await db.subSubject.count(),
    topics: await db.topic.count(),
    subtopics: await db.subtopic.count(),
    questions: await db.question.count(),
    options: await db.questionOption.count(),
    prepPages: await db.prepPage.count(),
    previousPapers: await db.previousPaper.count(),
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
