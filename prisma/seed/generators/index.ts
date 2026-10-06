import type { SeedQuestion } from "../types";
import { generateCuratedQuestions } from "./curated";
import { generateEnglishQuestions } from "./english";
import { generateFactQuestions } from "./facts";
import { generateMathQuestions } from "./math";
import { generateReasoningQuestions } from "./reasoning";
import { generateComputerQuestions, generateScienceQuestions } from "./science-computer";
import { generateMathV4 } from "./math-v4";
import { generateEnglishV2 } from "./english-v2";
import { generateUrduV1, generateRegionalV1 } from "./languages";
import { generateReasoningV2 } from "./reasoning-v2";
import { generateStemV1 } from "./stem";
import { generateSocialV1 } from "./social";
import { generateSubjectBanks } from "./data-core";
import { SCIENCE_BANKS } from "./data-science";
import { HUMANITIES_BANKS } from "./data-humanities";
import { COMMERCE_BANKS } from "./data-commerce";
import { LANGUAGE_BANKS } from "./data-languages";
import { EXTRA_BANKS } from "./data-extra-lang";
import { EXTRA2_BANKS } from "./data-extra2";
import { EXTRA3_BANKS } from "./data-extra3";
import { EXTRA4_BANKS } from "./data-extra4";
import { GAP_BANKS } from "./data-gaps";
import { generatePersonality, generateGeography } from "./data-personality-geo";
import type { GeneratorContext } from "./core";

export type { GeneratorContext } from "./core";
export { generateFactQuestions, generateEnglishQuestions, generateMathQuestions };

/**
 * Optional per-subject cap. Unset by default so the full generated bank ships
 * (the parametric generators are the source of scale). Set `SEED_SUBJECT_CAP` to
 * trim any subject that would otherwise dominate — useful when seeding a small
 * environment. When a subject is trimmed the cut is spread evenly across its
 * topics so no topic is emptied.
 */
const SUBJECT_CAP = Number(process.env.SEED_SUBJECT_CAP ?? 0);

/**
 * Tag the content language of a question. Rather than assume from the subject
 * (many Urdu-subject items are written in English about Urdu), the script of the
 * text decides: content written in the Arabic script is Urdu, or Sindhi when the
 * subject is a Sindhi one.
 */
const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

function applyLanguage(questions: SeedQuestion[]): void {
  for (const q of questions) {
    if (q.language) continue;
    const isInScript = ARABIC_SCRIPT.test(q.stem) || ARABIC_SCRIPT.test(q.options.join(" "));
    if (isInScript) q.language = q.subject.startsWith("sindhi") ? "SINDHI" : "URDU";
  }
}

/**
 * Trim a subject's questions to `cap` while preserving topic coverage: each
 * topic keeps an equal share, and any leftover capacity is filled from the
 * largest topics. Deterministic (order-preserving), so seeds stay reproducible.
 */
function capSubject(questions: SeedQuestion[], cap: number): SeedQuestion[] {
  if (questions.length <= cap) return questions;

  const byTopic = new Map<string, SeedQuestion[]>();
  for (const q of questions) {
    const list = byTopic.get(q.topic) ?? [];
    list.push(q);
    byTopic.set(q.topic, list);
  }

  const topics = [...byTopic.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const quota = Math.max(1, Math.floor(cap / topics.length));
  const picked: SeedQuestion[] = [];
  const leftover: SeedQuestion[] = [];

  for (const [, list] of topics) {
    for (let i = 0; i < list.length; i++) {
      (i < quota ? picked : leftover).push(list[i]);
    }
  }

  // Fill any remaining capacity from the leftovers, in a stable order. Loops
  // avoid spreading huge arrays, which would overflow the call stack.
  for (let i = 0; picked.length < cap && i < leftover.length; i++) {
    picked.push(leftover[i]);
  }

  return picked.slice(0, cap);
}

/** Apply the optional per-subject cap. */
function applyDistribution(questions: SeedQuestion[]): SeedQuestion[] {
  if (!(SUBJECT_CAP > 0)) return questions;

  const bySubject = new Map<string, SeedQuestion[]>();
  for (const q of questions) {
    const list = bySubject.get(q.subject) ?? [];
    list.push(q);
    bySubject.set(q.subject, list);
  }

  const out: SeedQuestion[] = [];
  for (const list of bySubject.values()) {
    for (const q of capSubject(list, SUBJECT_CAP)) out.push(q);
  }
  return out;
}

/**
 * Build the full question set from all generators. `examSlugsForSubject` maps a
 * subject slug to every exam whose blueprint includes that subject, so each
 * generated question links to the correct exams automatically.
 */
export function buildAllQuestions(
  ctx: GeneratorContext,
  examSlugsForSubject: Record<string, string[]>,
): SeedQuestion[] {
  const questions = [
    ...generateCuratedQuestions(),
    ...generateMathQuestions(ctx),
    ...generateEnglishQuestions(ctx),
    ...generateReasoningQuestions(ctx),
    ...generateComputerQuestions(ctx),
    ...generateScienceQuestions(ctx),
    ...generateFactQuestions(ctx, examSlugsForSubject),
    ...generateMathV4(),
    ...generateEnglishV2(),
    ...generateUrduV1(),
    ...generateRegionalV1(),
    ...generateReasoningV2(),
    ...generateStemV1(),
    ...generateSocialV1(),
    ...generateSubjectBanks(SCIENCE_BANKS),
    ...generateSubjectBanks(HUMANITIES_BANKS),
    ...generateSubjectBanks(COMMERCE_BANKS),
    ...generateSubjectBanks(LANGUAGE_BANKS),
    ...generateSubjectBanks(EXTRA_BANKS),
    ...generateSubjectBanks(EXTRA2_BANKS),
    ...generateSubjectBanks(EXTRA3_BANKS),
    ...generateSubjectBanks(EXTRA4_BANKS),
    ...generateSubjectBanks(GAP_BANKS),
    ...generatePersonality(),
    ...generateGeography(),
  ];

  // Exam membership is a property of the subject, so it is resolved here rather
  // than inside each generator. This keeps every question linked to the exams
  // whose blueprint covers its subject — the fact that makes exam filtering
  // return a meaningful pool for PST, CSS and the rest.
  for (const question of questions) {
    if (question.exams.length === 0) {
      question.exams = examSlugsForSubject[question.subject] ?? [];
    }
  }

  // Final safety net: drop any accidental duplicate slugs, keeping the first.
  const seen = new Set<string>();
  const unique = questions.filter((q) => {
    if (seen.has(q.slug)) return false;
    seen.add(q.slug);
    return true;
  });

  // Language tagging and the floor/cap distribution policy are applied last so
  // they see the complete, de-duplicated bank.
  applyLanguage(unique);
  return applyDistribution(unique);
}
