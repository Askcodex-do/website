/**
 * Seed content for previous papers and static preparation pages.
 *
 * Preparation pages are built from reusable templates driven by each exam's
 * metadata — the same generator produces every exam's pages, so adding an exam
 * never means hand-writing new pages. Previous papers are seeded only where the
 * record is explicitly marked unverified/reconstructed; nothing here claims to
 * be an authentic official paper.
 */

import type { SeedExam } from "./taxonomy";

export interface SeedPrepSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface SeedPrepFaq {
  question: string;
  answer: string;
}

export interface SeedPrepPage {
  slug: string;
  examSlug: string;
  type:
    | "OVERVIEW"
    | "ELIGIBILITY"
    | "SYLLABUS"
    | "PATTERN"
    | "SUBJECTS"
    | "TOPICS"
    | "STRATEGY"
    | "NOTES"
    | "FAQ"
    | "PREPARATION";
  title: string;
  summary: string;
  sections: SeedPrepSection[];
  faqs?: SeedPrepFaq[];
  sortOrder: number;
}

/**
 * Build the standard set of preparation pages for an exam from its metadata.
 * Every exam gets the same page types; the content is parameterised, not
 * duplicated.
 */
export function buildPrepPages(exam: SeedExam): SeedPrepPage[] {
  const name = exam.shortName || exam.name;
  const subjects = exam.subjects
    .map((slug) => slug.replace(/-/g, " "))
    .join(", ");

  const pages: SeedPrepPage[] = [
    {
      slug: `${exam.slug}-overview`,
      examSlug: exam.slug,
      type: "OVERVIEW",
      title: `${name} — Exam Overview`,
      summary: `An introduction to the ${exam.name}, who conducts it and what it covers.`,
      sortOrder: 1,
      sections: [
        {
          heading: `What is the ${name} test?`,
          body:
            exam.description ||
            `${exam.name} is a competitive selection test in Pakistan.`,
        },
        {
          heading: "Who should prepare for it?",
          body: "Candidates who meet the eligibility criteria and are targeting the associated post or programme.",
          bullets: exam.subjects.map(
            (slug) => `Candidates weak in ${slug.replace(/-/g, " ")} should start with that subject.`,
          ),
        },
        {
          heading: "How to use this platform",
          body: "Start with a short quiz to benchmark yourself, then work through subject-wise practice and finish with full-length mock papers.",
        },
      ],
      faqs: [
        {
          question: `Is the ${name} test multiple-choice?`,
          answer:
            "The written screening stage is objective (MCQ) based; check the latest official notification for the exact pattern each year.",
        },
        {
          question: "Are these questions the actual exam questions?",
          answer:
            "No. Practice questions on this platform are for preparation. Verified previous papers, where available, are labelled separately.",
        },
      ],
    },
    {
      slug: `${exam.slug}-eligibility`,
      examSlug: exam.slug,
      type: "ELIGIBILITY",
      title: `${name} — Eligibility Criteria`,
      summary: `Who can apply for the ${exam.name}.`,
      sortOrder: 2,
      sections: [
        {
          heading: "Required qualification",
          body:
            exam.eligibility ||
            "Eligibility depends on the specific post or programme. Always confirm against the official advertisement.",
        },
        {
          heading: "Education level",
          body: `This test is mapped to the following education levels: ${exam.educationLevels
            .map((l) => l.replace(/-/g, " "))
            .join(", ")}.`,
        },
        {
          heading: "Region",
          body: exam.province
            ? `Conducted at the ${exam.province} level.`
            : "Open nationally unless the advertisement states otherwise.",
        },
      ],
    },
    {
      slug: `${exam.slug}-syllabus`,
      examSlug: exam.slug,
      type: "SYLLABUS",
      title: `${name} — Syllabus`,
      summary: `The subjects and topics covered by the ${exam.name}.`,
      sortOrder: 3,
      sections: [
        {
          heading: "Subjects",
          body: `The test covers: ${subjects}.`,
          bullets: exam.subjects.map((s) => s.replace(/-/g, " ")),
        },
        {
          heading: "How the syllabus maps to practice",
          body: "Every practice question is tagged with a subject and topic, so selecting this exam only surfaces questions from the subjects above.",
        },
      ],
    },
    {
      slug: `${exam.slug}-pattern`,
      examSlug: exam.slug,
      type: "PATTERN",
      title: `${name} — Paper Pattern`,
      summary: `Structure, duration and marking of the ${exam.name}.`,
      sortOrder: 4,
      sections: [
        {
          heading: "Test pattern",
          body: exam.testPattern || "Objective (MCQ) based screening test.",
        },
        {
          heading: "Duration and marks",
          body: `Duration: ${exam.duration || "varies"}. Total marks: ${exam.totalMarks || "varies"}.`,
        },
        {
          heading: "Negative marking",
          body: exam.configuration.negativeMarking
            ? `Yes — ${exam.configuration.negativeMarkFactor ?? 0.25} marks are deducted per wrong answer.`
            : "No negative marking in the practice configuration for this exam.",
        },
      ],
    },
    {
      slug: `${exam.slug}-strategy`,
      examSlug: exam.slug,
      type: "STRATEGY",
      title: `${name} — Preparation Strategy`,
      summary: `A practical study plan for the ${exam.name}.`,
      sortOrder: 5,
      sections: [
        {
          heading: "Recommended sequence",
          body: "Build fundamentals, then practise topic-wise, then attempt timed mocks.",
          bullets: [
            "Revise core concepts for each subject.",
            "Practise topic-wise MCQs until accuracy is consistently high.",
            "Attempt full-length mock papers under timed conditions.",
            "Review every wrong answer and read the explanation.",
          ],
        },
        {
          heading: "Time management",
          body: `Aim to answer each question in about ${Math.max(
            20,
            Math.round((exam.configuration.timeLimitMinutes * 60) / Math.max(1, exam.configuration.defaultQuestionCount)),
          )} seconds during practice.`,
        },
        {
          heading: "Avoid guessing blindly",
          body: exam.configuration.negativeMarking
            ? "Because negative marking applies, skip questions you cannot narrow down."
            : "With no negative marking, attempt every question.",
        },
      ],
    },
  ];

  return pages;
}

/**
 * Previous-paper seed definitions.
 *
 * IMPORTANT: no authentic, sourced papers are bundled here. Each entry is an
 * explicitly unverified practice reconstruction drawn from the platform's own
 * question bank, and is labelled as such in the UI. Administrators add genuine
 * previous papers (with sources) through the admin panel.
 */
export interface SeedPreviousPaper {
  slug: string;
  examSlug: string;
  subjectSlug: string;
  title: string;
  year: number;
  paperName: string;
  session?: string;
  source: string;
  verified: boolean;
  /** How many questions to attach from the matching pool. */
  questionCount: number;
}

export const PREVIOUS_PAPERS: SeedPreviousPaper[] = [
  {
    slug: "css-screening-practice-reconstruction",
    examSlug: "css",
    subjectSlug: "english",
    title: "CSS Screening — Practice Reconstruction",
    year: new Date().getFullYear() - 1,
    paperName: "CSS Screening Test",
    session: "Practice set",
    source:
      "Practice reconstruction from the platform question bank — not an official CSS paper.",
    verified: false,
    questionCount: 25,
  },
  {
    slug: "ppsc-lecturer-english-practice-reconstruction",
    examSlug: "lecturer",
    subjectSlug: "english",
    title: "PPSC Lecturer (English) — Practice Reconstruction",
    year: new Date().getFullYear() - 2,
    paperName: "Lecturer Recruitment Test",
    session: "Practice set",
    source:
      "Practice reconstruction from the platform question bank — not an official PPSC paper.",
    verified: false,
    questionCount: 20,
  },
  {
    slug: "pst-practice-reconstruction",
    examSlug: "pst",
    subjectSlug: "general-knowledge",
    title: "PST — Practice Reconstruction",
    year: new Date().getFullYear() - 1,
    paperName: "Primary School Teacher Test",
    session: "Practice set",
    source:
      "Practice reconstruction from the platform question bank — not an official paper.",
    verified: false,
    questionCount: 20,
  },
];
