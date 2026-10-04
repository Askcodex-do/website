/**
 * MCQ Prep — Production Database Seed
 *
 * Seeds:
 *   - roles
 *   - users
 *   - education levels
 *   - subjects
 *   - topics
 *   - exams
 *   - exam configurations
 *   - site settings
 *   - original practice MCQs
 *
 * IMPORTANT:
 * These questions are ORIGINAL PRACTICE QUESTIONS.
 *
 * They must NOT be described as previous-paper questions.
 * Verified previous-paper questions should be imported separately with
 * their real source, reference and year.
 *
 * Run:
 *   npm run db:seed
 */

import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import {
  EDUCATION_LEVELS,
  EXAMS,
  SUBJECTS,
  SITE_SETTINGS_DEFAULT,
} from "./seed/taxonomy";

const db = new PrismaClient();

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hashQuestion(stem: string, options: string[]) {
  return crypto
    .createHash("sha256")
    .update(
      [
        stem.trim().toLowerCase(),
        ...options.map((x) => x.trim().toLowerCase()),
      ].join("|"),
    )
    .digest("hex");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function questionSlug(stem: string, index: number) {
  return `${slugify(stem)}-${index}`;
}

type Difficulty = "EASY" | "MEDIUM" | "HARD";

interface GeneratedQuestion {
  stem: string;
  explanation?: string;
  subject: string;
  topic: string;
  difficulty: Difficulty;
  correct: string;
  options: string[];
  educationLevels: string[];
  exams?: string[];
  tags?: string[];
}

/* -------------------------------------------------------------------------- */
/* Roles                                                                      */
/* -------------------------------------------------------------------------- */

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

  console.info("[seed] roles ready");
}

/* -------------------------------------------------------------------------- */
/* Users                                                                      */
/* -------------------------------------------------------------------------- */

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

  console.info("[seed] users ready");
}

/* -------------------------------------------------------------------------- */
/* Taxonomy                                                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Exams                                                                      */
/* -------------------------------------------------------------------------- */

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

  console.info("[seed] exams and configurations ready");
}

/* -------------------------------------------------------------------------- */
/* Site settings                                                              */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Question bank                                                              */
/* -------------------------------------------------------------------------- */

/**
 * These are original practice questions.
 *
 * They are deliberately separated from verified previous-paper content.
 */

const QUESTION_BANK: GeneratedQuestion[] = [
  /* ================================ ENGLISH ============================== */

  {
    stem: "Choose the correct plural form of 'child'.",
    subject: "english",
    topic: "parts-of-speech",
    difficulty: "EASY",
    correct: "children",
    options: ["childs", "children", "childes", "childrens"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["english", "grammar", "plural"],
  },
  {
    stem: "Choose the correct article: He is ___ honest man.",
    subject: "english",
    topic: "articles",
    difficulty: "EASY",
    correct: "an",
    options: ["a", "an", "the", "no article"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["english", "articles"],
  },
  {
    stem: "Choose the correct preposition: She is good ___ mathematics.",
    subject: "english",
    topic: "prepositions",
    difficulty: "EASY",
    correct: "at",
    options: ["in", "at", "on", "for"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["english", "prepositions"],
  },
  {
    stem: "Choose the synonym of 'rapid'.",
    subject: "english",
    topic: "synonyms-antonyms",
    difficulty: "EASY",
    correct: "quick",
    options: ["slow", "quick", "weak", "late"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["english", "vocabulary"],
  },
  {
    stem: "Choose the antonym of 'ancient'.",
    subject: "english",
    topic: "synonyms-antonyms",
    difficulty: "EASY",
    correct: "modern",
    options: ["old", "historic", "modern", "former"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["english", "vocabulary"],
  },
  {
    stem: "Identify the tense: 'She has completed her work.'",
    subject: "english",
    topic: "tenses",
    difficulty: "MEDIUM",
    correct: "Present perfect",
    options: [
      "Present simple",
      "Present continuous",
      "Present perfect",
      "Past perfect",
    ],
    educationLevels: ["matric", "intermediate", "graduation"],
    tags: ["english", "tenses"],
  },
  {
    stem: "Choose the passive voice of: 'Ali wrote the letter.'",
    subject: "english",
    topic: "active-passive-voice",
    difficulty: "MEDIUM",
    correct: "The letter was written by Ali.",
    options: [
      "The letter is written by Ali.",
      "The letter was written by Ali.",
      "The letter has written Ali.",
      "The letter wrote Ali.",
    ],
    educationLevels: ["matric", "intermediate", "graduation"],
    tags: ["english", "voice"],
  },
  {
    stem: "Identify the noun in the sentence: 'Honesty is the best policy.'",
    subject: "english",
    topic: "parts-of-speech",
    difficulty: "EASY",
    correct: "Honesty",
    options: ["is", "the", "best", "Honesty"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["english", "grammar"],
  },

  /* ============================== MATHEMATICS ============================ */

  {
    stem: "What is 25% of 200?",
    subject: "mathematics",
    topic: "percentages",
    difficulty: "EASY",
    correct: "50",
    options: ["25", "40", "50", "75"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["mathematics", "percentage"],
  },
  {
    stem: "What is the average of 10, 20 and 30?",
    subject: "mathematics",
    topic: "averages",
    difficulty: "EASY",
    correct: "20",
    options: ["15", "20", "25", "30"],
    educationLevels: ["middle", "matric"],
    tags: ["mathematics", "average"],
  },
  {
    stem: "If x + 7 = 15, what is x?",
    subject: "mathematics",
    topic: "algebra",
    difficulty: "EASY",
    correct: "8",
    options: ["6", "7", "8", "9"],
    educationLevels: ["middle", "matric"],
    tags: ["mathematics", "algebra"],
  },
  {
    stem: "What is the square of 12?",
    subject: "mathematics",
    topic: "arithmetic",
    difficulty: "EASY",
    correct: "144",
    options: ["124", "132", "144", "156"],
    educationLevels: ["middle", "matric"],
    tags: ["mathematics"],
  },
  {
    stem: "A ratio of 2:3 has a total of 25 parts. What is the value of the smaller share?",
    subject: "mathematics",
    topic: "percentages",
    difficulty: "MEDIUM",
    correct: "10",
    options: ["8", "10", "12", "15"],
    educationLevels: ["matric", "intermediate"],
    tags: ["mathematics", "ratio"],
  },
  {
    stem: "What is the perimeter of a square with side 6 cm?",
    subject: "mathematics",
    topic: "geometry",
    difficulty: "EASY",
    correct: "24 cm",
    options: ["12 cm", "18 cm", "24 cm", "36 cm"],
    educationLevels: ["middle", "matric"],
    tags: ["mathematics", "geometry"],
  },
  {
    stem: "What is 3/4 expressed as a percentage?",
    subject: "mathematics",
    topic: "percentages",
    difficulty: "EASY",
    correct: "75%",
    options: ["25%", "50%", "75%", "80%"],
    educationLevels: ["middle", "matric"],
    tags: ["mathematics", "fractions"],
  },
  {
    stem: "If a product costs Rs. 800 and is sold for Rs. 1,000, what is the profit?",
    subject: "mathematics",
    topic: "arithmetic",
    difficulty: "EASY",
    correct: "Rs. 200",
    options: ["Rs. 100", "Rs. 150", "Rs. 200", "Rs. 250"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["mathematics", "profit"],
  },

  /* =========================== GENERAL SCIENCE ========================== */

  {
    stem: "What is the chemical symbol for oxygen?",
    subject: "general-science",
    topic: "chemistry",
    difficulty: "EASY",
    correct: "O",
    options: ["Ox", "O", "Og", "Om"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["science", "chemistry"],
  },
  {
    stem: "What gas do plants primarily use during photosynthesis?",
    subject: "general-science",
    topic: "biology",
    difficulty: "EASY",
    correct: "Carbon dioxide",
    options: [
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
      "Hydrogen",
    ],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["science", "biology"],
  },
  {
    stem: "What is the basic unit of life?",
    subject: "general-science",
    topic: "biology",
    difficulty: "EASY",
    correct: "Cell",
    options: ["Tissue", "Cell", "Organ", "Atom"],
    educationLevels: ["middle", "matric"],
    tags: ["biology"],
  },
  {
    stem: "Which organ pumps blood throughout the human body?",
    subject: "general-science",
    topic: "human-body",
    difficulty: "EASY",
    correct: "Heart",
    options: ["Liver", "Heart", "Kidney", "Lung"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["biology", "human-body"],
  },
  {
    stem: "What is the SI unit of force?",
    subject: "general-science",
    topic: "physics",
    difficulty: "EASY",
    correct: "Newton",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    educationLevels: ["matric", "intermediate"],
    tags: ["physics"],
  },
  {
    stem: "At approximately what temperature does pure water freeze at standard atmospheric pressure?",
    subject: "general-science",
    topic: "physics",
    difficulty: "EASY",
    correct: "0°C",
    options: ["0°C", "10°C", "50°C", "100°C"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["science"],
  },
  {
    stem: "Which particle has a negative electric charge?",
    subject: "general-science",
    topic: "physics",
    difficulty: "EASY",
    correct: "Electron",
    options: ["Proton", "Neutron", "Electron", "Nucleus"],
    educationLevels: ["matric", "intermediate"],
    tags: ["physics", "atoms"],
  },

  /* ================================ COMPUTER ============================ */

  {
    stem: "What does CPU stand for?",
    subject: "computer",
    topic: "computer-fundamentals",
    difficulty: "EASY",
    correct: "Central Processing Unit",
    options: [
      "Central Processing Unit",
      "Computer Processing Utility",
      "Central Program Utility",
      "Computer Primary Unit",
    ],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["computer", "cpu"],
  },
  {
    stem: "Which device is primarily used to enter text into a computer?",
    subject: "computer",
    topic: "hardware",
    difficulty: "EASY",
    correct: "Keyboard",
    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["computer", "hardware"],
  },
  {
    stem: "Which of the following is an operating system?",
    subject: "computer",
    topic: "software",
    difficulty: "EASY",
    correct: "Linux",
    options: ["Linux", "HTML", "JPEG", "USB"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["computer", "software"],
  },
  {
    stem: "What does URL stand for?",
    subject: "computer",
    topic: "networking",
    difficulty: "EASY",
    correct: "Uniform Resource Locator",
    options: [
      "Universal Record Link",
      "Uniform Resource Locator",
      "Unified Routing Link",
      "User Resource Location",
    ],
    educationLevels: ["matric", "intermediate", "graduation"],
    tags: ["computer", "internet"],
  },
  {
    stem: "Which application is commonly used to create spreadsheets?",
    subject: "computer",
    topic: "ms-office",
    difficulty: "EASY",
    correct: "Microsoft Excel",
    options: [
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft Paint",
      "Notepad",
    ],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["computer", "ms-office"],
  },

  /* =========================== PAKISTAN STUDIES ========================= */

  {
    stem: "Pakistan came into existence on which date?",
    subject: "pakistan-studies",
    topic: "pakistan-movement",
    difficulty: "EASY",
    correct: "14 August 1947",
    options: [
      "23 March 1940",
      "14 August 1947",
      "11 September 1948",
      "25 December 1947",
    ],
    educationLevels: ["primary", "middle", "matric", "intermediate"],
    tags: ["pakistan", "history"],
  },
  {
    stem: "Who was the founder of Pakistan?",
    subject: "pakistan-studies",
    topic: "pakistan-movement",
    difficulty: "EASY",
    correct: "Muhammad Ali Jinnah",
    options: [
      "Allama Iqbal",
      "Muhammad Ali Jinnah",
      "Liaquat Ali Khan",
      "Sir Syed Ahmad Khan",
    ],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["pakistan", "history"],
  },
  {
    stem: "What is the capital city of Pakistan?",
    subject: "pakistan-studies",
    topic: "pakistan-geography",
    difficulty: "EASY",
    correct: "Islamabad",
    options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["pakistan", "geography"],
  },
  {
    stem: "Which is the largest province of Pakistan by area?",
    subject: "pakistan-studies",
    topic: "pakistan-geography",
    difficulty: "EASY",
    correct: "Balochistan",
    options: ["Punjab", "Sindh", "Balochistan", "Khyber Pakhtunkhwa"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["pakistan", "geography"],
  },
  {
    stem: "What is the national language of Pakistan?",
    subject: "pakistan-studies",
    topic: "national-symbols",
    difficulty: "EASY",
    correct: "Urdu",
    options: ["Punjabi", "Urdu", "Sindhi", "English"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["pakistan"],
  },

  /* ================================= ISLAMIAT =========================== */

  {
    stem: "How many obligatory prayers are there in Islam each day?",
    subject: "islamiat",
    topic: "ibadat",
    difficulty: "EASY",
    correct: "Five",
    options: ["Three", "Four", "Five", "Six"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["islamiat", "prayer"],
  },
  {
    stem: "Which month of the Islamic calendar is associated with fasting?",
    subject: "islamiat",
    topic: "ibadat",
    difficulty: "EASY",
    correct: "Ramadan",
    options: ["Muharram", "Rajab", "Ramadan", "Shawwal"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["islamiat", "fasting"],
  },
  {
    stem: "What is the first month of the Islamic calendar?",
    subject: "islamiat",
    topic: "islamic-history",
    difficulty: "EASY",
    correct: "Muharram",
    options: ["Muharram", "Ramadan", "Shawwal", "Safar"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["islamiat"],
  },
  {
    stem: "What is the obligatory charity in Islam commonly called?",
    subject: "islamiat",
    topic: "ibadat",
    difficulty: "EASY",
    correct: "Zakat",
    options: ["Sawm", "Zakat", "Hajj", "Salah"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["islamiat", "zakat"],
  },

  /* =========================== GENERAL KNOWLEDGE ======================== */

  {
    stem: "Which is the largest ocean on Earth?",
    subject: "general-knowledge",
    topic: "world-geography",
    difficulty: "EASY",
    correct: "Pacific Ocean",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["general-knowledge", "geography"],
  },
  {
    stem: "Which planet is known as the Red Planet?",
    subject: "general-knowledge",
    topic: "inventions-discoveries",
    difficulty: "EASY",
    correct: "Mars",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["general-knowledge", "space"],
  },
  {
    stem: "Which instrument is used to measure temperature?",
    subject: "general-knowledge",
    topic: "inventions-discoveries",
    difficulty: "EASY",
    correct: "Thermometer",
    options: ["Barometer", "Thermometer", "Ammeter", "Hygrometer"],
    educationLevels: ["primary", "middle", "matric"],
    tags: ["general-knowledge", "science"],
  },

  /* ============================ EVERYDAY SCIENCE ======================== */

  {
    stem: "Which instrument is used to measure atmospheric pressure?",
    subject: "everyday-science",
    topic: "scientific-instruments",
    difficulty: "EASY",
    correct: "Barometer",
    options: ["Thermometer", "Barometer", "Ammeter", "Voltmeter"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["science", "instruments"],
  },
  {
    stem: "What is the SI unit of electric current?",
    subject: "everyday-science",
    topic: "units-measurements",
    difficulty: "EASY",
    correct: "Ampere",
    options: ["Volt", "Ohm", "Ampere", "Watt"],
    educationLevels: ["matric", "intermediate"],
    tags: ["science", "units"],
  },

  /* ========================== ANALYTICAL REASONING ====================== */

  {
    stem: "Find the next number: 2, 4, 6, 8, ?",
    subject: "analytical-reasoning",
    topic: "series-sequences",
    difficulty: "EASY",
    correct: "10",
    options: ["9", "10", "11", "12"],
    educationLevels: ["middle", "matric", "intermediate"],
    tags: ["reasoning", "series"],
  },
  {
    stem: "Find the next number: 3, 6, 12, 24, ?",
    subject: "analytical-reasoning",
    topic: "series-sequences",
    difficulty: "MEDIUM",
    correct: "48",
    options: ["36", "42", "48", "54"],
    educationLevels: ["matric", "intermediate", "graduation"],
    tags: ["reasoning", "series"],
  },
  {
    stem: "Which one is different from the others?",
    subject: "analytical-reasoning",
    topic: "odd-one-out",
    difficulty: "EASY",
    correct: "Apple",
    options: ["Mango", "Banana", "Apple", "Carrot"],
    educationLevels: ["primary", "middle"],
    tags: ["reasoning"],
  },
];

/* -------------------------------------------------------------------------- */
/* Reliable generated mathematics questions                                  */
/* -------------------------------------------------------------------------- */

/**
 * Creates additional deterministic arithmetic questions.
 *
 * These are algorithmic rather than fabricated factual claims, which makes
 * them suitable for generating a larger practice pool with exact answers.
 */

function generateArithmeticQuestions(): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];

  let number = 1;

  for (let a = 2; a <= 50; a++) {
    for (let b = 2; b <= 20; b++) {
      if (questions.length >= 500) {
        return questions;
      }

      const answer = a * b;

      const wrong1 = answer + b;
      const wrong2 = answer - b;
      const wrong3 = answer + a;

      questions.push({
        stem: `What is ${a} × ${b}?`,
        subject: "mathematics",
        topic: "arithmetic",
        difficulty: answer > 500 ? "MEDIUM" : "EASY",
        correct: String(answer),
        options: [
          String(wrong1),
          String(wrong2),
          String(answer),
          String(wrong3),
        ],
        educationLevels: ["middle", "matric", "intermediate"],
        tags: ["mathematics", "arithmetic", "multiplication"],
      });

      number++;
    }
  }

  return questions;
}

function generatePercentageQuestions(): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];

  const percentages = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75];

  for (let base = 100; base <= 2000; base += 100) {
    for (const percentage of percentages) {
      if (questions.length >= 300) {
        return questions;
      }

      const answer = (base * percentage) / 100;

      questions.push({
        stem: `What is ${percentage}% of ${base}?`,
        subject: "mathematics",
        topic: "percentages",
        difficulty: percentage === 50 ? "EASY" : "MEDIUM",
        correct: String(answer),
        options: [
          String(answer + 10),
          String(answer),
          String(answer + 20),
          String(Math.max(0, answer - 10)),
        ],
        educationLevels: ["middle", "matric", "intermediate"],
        tags: ["mathematics", "percentage"],
      });
    }
  }

  return questions;
}

function generateAlgebraQuestions(): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];

  for (let x = 1; x <= 200; x++) {
    if (questions.length >= 200) {
      break;
    }

    const add = 5 + (x % 20);
    const total = x + add;

    questions.push({
      stem: `If x + ${add} = ${total}, what is x?`,
      subject: "mathematics",
      topic: "algebra",
      difficulty: "EASY",
      correct: String(x),
      options: [
        String(x - 2),
        String(x),
        String(x + 2),
        String(x + 5),
      ],
      educationLevels: ["middle", "matric", "intermediate"],
      tags: ["mathematics", "algebra"],
    });
  }

  return questions;
}

/* -------------------------------------------------------------------------- */
/* Tag handling                                                               */
/* -------------------------------------------------------------------------- */

async function getOrCreateTags(tags: string[]) {
  const result: { id: string }[] = [];

  for (const tagName of tags) {
    const slug = slugify(tagName);

    const tag = await db.tag.upsert({
      where: { slug },
      update: {
        name: tagName,
      },
      create: {
        slug,
        name: tagName,
      },
      select: {
        id: true,
      },
    });

    result.push(tag);
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Question seeding                                                           */
/* -------------------------------------------------------------------------- */

async function seedQuestions() {
  const generatedQuestions = [
    ...QUESTION_BANK,
    ...generateArithmeticQuestions(),
    ...generatePercentageQuestions(),
    ...generateAlgebraQuestions(),
  ];

  console.info(
    `[seed] preparing ${generatedQuestions.length} original practice questions`,
  );

  const subjects = await db.subject.findMany({
    select: {
      id: true,
      slug: true,
    },
  });

  const topics = await db.topic.findMany({
    select: {
      id: true,
      slug: true,
      subjectId: true,
    },
  });

  const levels = await db.educationLevel.findMany({
    select: {
      id: true,
      slug: true,
    },
  });

  const exams = await db.exam.findMany({
    select: {
      id: true,
      slug: true,
      subjects: {
        select: {
          subjectId: true,
        },
      },
      educationLevels: {
        select: {
          educationLevelId: true,
        },
      },
    },
  });

  const subjectMap = new Map(
    subjects.map((subject) => [subject.slug, subject.id]),
  );

  const topicMap = new Map(
    topics.map((topic) => [topic.slug, topic]),
  );

  const levelMap = new Map(
    levels.map((level) => [level.slug, level.id]),
  );

  let createdCount = 0;
  let skippedCount = 0;

  for (let index = 0; index < generatedQuestions.length; index++) {
    const item = generatedQuestions[index];

    const subjectId = subjectMap.get(item.subject);
    const topic = topicMap.get(item.topic);

    if (!subjectId) {
      console.warn(
        `[seed] skipped question: subject not found: ${item.subject}`,
      );
      skippedCount++;
      continue;
    }

    if (!topic) {
      console.warn(
        `[seed] skipped question: topic not found: ${item.topic}`,
      );
      skippedCount++;
      continue;
    }

    const contentHash = hashQuestion(item.stem, item.options);

    const existing = await db.question.findUnique({
      where: {
        contentHash,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      skippedCount++;
      continue;
    }

    const validOptions = [...item.options];

    if (
      validOptions.length !== 4 ||
      new Set(validOptions.map((x) => x.toLowerCase())).size !== 4
    ) {
      console.warn(
        `[seed] skipped invalid options: ${item.stem}`,
      );
      skippedCount++;
      continue;
    }

    if (!validOptions.includes(item.correct)) {
      console.warn(
        `[seed] skipped because correct answer is missing: ${item.stem}`,
      );
      skippedCount++;
      continue;
    }

    const slugBase = questionSlug(item.stem, index + 1);

    const question = await db.question.create({
      data: {
        slug: slugBase,
        stem: item.stem,
        explanation:
          item.explanation ??
          `The correct answer is "${item.correct}".`,
        source: "Original practice question",
        reference: null,
        difficulty: item.difficulty,
        status: "PUBLISHED",
        type: "SINGLE_CHOICE",
        language: "ENGLISH",
        year: null,
        province: null,
        staticOrder: index + 1,
        contentHash,
        publishedAt: new Date(),

        subjects: {
          create: [
            {
              subjectId,
            },
          ],
        },

        topics: {
          create: [
            {
              topicId: topic.id,
            },
          ],
        },

        options: {
          create: validOptions.map((option, optionIndex) => ({
            label: String.fromCharCode(65 + optionIndex),
            text: option,
            isCorrect: option === item.correct,
            sortOrder: optionIndex,
          })),
        },

        educationLevels: {
          create: item.educationLevels
            .map((levelSlug) => levelMap.get(levelSlug))
            .filter((id): id is string => Boolean(id))
            .map((educationLevelId) => ({
              educationLevelId,
            })),
        },
      },
      select: {
        id: true,
      },
    });

    /* -------------------------------------------------------------------- */
    /* Attach question to matching exams                                    */
    /* -------------------------------------------------------------------- */

    const selectedExamIds = new Set<string>();

    if (item.exams?.length) {
      for (const examSlug of item.exams) {
        const exam = exams.find(
          (candidate) => candidate.slug === examSlug,
        );

        if (exam) {
          selectedExamIds.add(exam.id);
        }
      }
    } else {
      for (const exam of exams) {
        const examHasSubject = exam.subjects.some(
          (x) => x.subjectId === subjectId,
        );

        if (!examHasSubject) {
          continue;
        }

        const questionLevelIds = item.educationLevels
          .map((slug) => levelMap.get(slug))
          .filter((id): id is string => Boolean(id));

        const examHasMatchingLevel =
          questionLevelIds.length === 0 ||
          exam.educationLevels.some((x) =>
            questionLevelIds.includes(x.educationLevelId),
          );

        if (examHasMatchingLevel) {
          selectedExamIds.add(exam.id);
        }
      }
    }

    if (selectedExamIds.size > 0) {
      await db.questionExam.createMany({
        data: Array.from(selectedExamIds).map((examId) => ({
          questionId: question.id,
          examId,
        })),
        skipDuplicates: true,
      });
    }

    if (item.tags?.length) {
      const tags = await getOrCreateTags(item.tags);

      await db.questionTag.createMany({
        data: tags.map((tag) => ({
          questionId: question.id,
          tagId: tag.id,
        })),
        skipDuplicates: true,
      });
    }

    createdCount++;

    if (createdCount % 100 === 0) {
      console.info(
        `[seed] questions created: ${createdCount}`,
      );
    }
  }

  console.info(
    `[seed] question seeding complete — created: ${createdCount}, skipped: ${skippedCount}`,
  );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

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
    questionExams: await db.questionExam.count(),
    questionSubjects: await db.questionSubject.count(),
    questionTopics: await db.questionTopic.count(),
    questionEducationLevels:
      await db.questionEducationLevel.count(),
    tags: await db.tag.count(),
    questionTags: await db.questionTag.count(),
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
