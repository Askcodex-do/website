/**
 * Database seed.
 *
 * Produces the platform's base configuration from a clean database:
 *   - roles and their permissions
 *   - an administrator and a demo user
 *   - education levels, subjects and topics
 *   - exam blueprints with their Question Selection Engine configuration
 *   - default site settings and social links
 *
 * IMPORTANT:
 *   Question generation/seeding has been intentionally disabled.
 *   Real questions will be added separately from verified exam/paper sources.
 *
 * Run with: npm run db:seed
 */

import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  EDUCATION_LEVELS,
  EXAMS,
  SUBJECTS,
  SITE_SETTINGS_DEFAULT,
} from "./seed/taxonomy";

const db = new PrismaClient();

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
      description:
        "Signed-in learner with quiz history, bookmarks and likes.",
      permissions: [] as string[],
      isSystem: true,
      sortOrder: 1,
    },
    {
      key: "admin",
      name: "Administrator",
      description:
        "Full access to content, users, reports, SEO and settings.",
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
  const adminRole = await db.role.findUniqueOrThrow({
    where: { key: "admin" },
  });

  const userRole = await db.role.findUniqueOrThrow({
    where: { key: "user" },
  });

  const adminEmail =
    process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";

  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";

  const userEmail =
    process.env.SEED_USER_EMAIL ?? "user@example.com";

  const userPassword =
    process.env.SEED_USER_PASSWORD ?? "User@12345";

  await db.user.upsert({
    where: { email: adminEmail },
    update: {
      roleId: adminRole.id,
    },
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
    update: {
      roleId: userRole.id,
    },
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
      update: {
        name: level.name,
        rank: level.rank,
        description: level.description,
      },
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

  console.info("[seed] education levels, subjects and topics ready");
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
        defaultQuestionCount:
          exam.configuration.defaultQuestionCount,
        timeLimitMinutes:
          exam.configuration.timeLimitMinutes,
        negativeMarking:
          exam.configuration.negativeMarking,
        negativeMarkFactor:
          exam.configuration.negativeMarkFactor ?? 0,
        marksPerQuestion:
          exam.configuration.marksPerQuestion ?? 1,
        passingPercentage:
          exam.configuration.passingPercentage ?? 50,
        staticOrderSeed:
          exam.configuration.staticOrderSeed ?? null,
      },
      create: {
        examId: created.id,
        mode: exam.configuration.mode,
        defaultQuestionCount:
          exam.configuration.defaultQuestionCount,
        timeLimitMinutes:
          exam.configuration.timeLimitMinutes,
        negativeMarking:
          exam.configuration.negativeMarking,
        negativeMarkFactor:
          exam.configuration.negativeMarkFactor ?? 0,
        marksPerQuestion:
          exam.configuration.marksPerQuestion ?? 1,
        passingPercentage:
          exam.configuration.passingPercentage ?? 50,
        staticOrderSeed:
          exam.configuration.staticOrderSeed ?? null,
      },
    });

    // Exam → education levels.
    const levels = await db.educationLevel.findMany({
      where: {
        slug: {
          in: exam.educationLevels,
        },
      },
      select: {
        id: true,
      },
    });

    await db.examEducationLevel.deleteMany({
      where: {
        examId: created.id,
      },
    });

    await db.examEducationLevel.createMany({
      data: levels.map((level) => ({
        examId: created.id,
        educationLevelId: level.id,
      })),
      skipDuplicates: true,
    });

    // Exam → subjects.
    const subjects = await db.subject.findMany({
      where: {
        slug: {
          in: exam.subjects,
        },
      },
      select: {
        id: true,
      },
    });

    await db.examSubject.deleteMany({
      where: {
        examId: created.id,
      },
    });

    await db.examSubject.createMany({
      data: subjects.map((subject) => ({
        examId: created.id,
        subjectId: subject.id,
      })),
      skipDuplicates: true,
    });
  }

  console.info("[seed] exams and exam configurations ready");
}

async function seedSettings() {
  for (const setting of SITE_SETTINGS_DEFAULT) {
    await db.siteSetting.upsert({
      where: {
        key: setting.key,
      },
      update: {
        value: setting.value as Prisma.InputJsonValue,
        group: setting.group,
      },
      create: {
        key: setting.key,
        value: setting.value as Prisma.InputJsonValue,
        group: setting.group,
      },
    });
  }

  console.info("[seed] site settings ready");
}

async function main() {
  console.info("[seed] starting");

  await seedRoles();
  await seedUsers();
  await seedTaxonomy();
  await seedExams();
  await seedSettings();

  /*
   * QUESTION SEEDING INTENTIONALLY DISABLED
   *
   * The old seed system generated 10,000+ synthetic/sample questions
   * through buildAllQuestions().
   *
   * We are NOT calling that generator anymore.
   *
   * Real questions will be imported separately after:
   *   1. Pakistan exam taxonomy is finalized.
   *   2. Previous papers are collected.
   *   3. Sources are recorded.
   *   4. Questions are verified.
   *   5. Duplicate questions are detected.
   */

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
