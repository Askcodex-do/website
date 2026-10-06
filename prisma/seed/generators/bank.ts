/**
 * Helpers for turning compact data banks into large volumes of valid MCQs.
 *
 * A "bank" is an array of facts; each fact can be emitted under several question
 * templates, which is how a few hundred curated facts become thousands of
 * genuinely distinct questions. Computed templates (see `numeric`) take the
 * opposite approach: they derive the answer from parameters, so they can
 * produce an unbounded number of correct items.
 */

import { buildOptions, difficultyFor, makeRandom } from "./core";
import type { SeedQuestion } from "./core";

export interface Fact {
  /** Stem, optionally containing `{a}`/`{b}` placeholders filled per template. */
  q: string;
  /** Correct answer. */
  a: string;
  /** Distractors (at least three are recommended). */
  d: string[];
  /** Optional explanation. */
  e?: string;
  tags?: string[];
}

/**
 * Volume multiplier for parametric generators. The default targets the
 * platform's 500,000-question dataset; set `SEED_SCALE_FACTOR=1` for a fast
 * local seed or a higher value to grow the bank further.
 */
export const SEED_SCALE = Math.max(0.1, Number(process.env.SEED_SCALE_FACTOR ?? 2));

/** Apply the configured scale factor to a requested count. */
export const sc = (n: number): number => Math.max(1, Math.round(n * SEED_SCALE));

export interface BankOptions {
  subject: string;
  topic: string;
  /** Slug prefix, e.g. `eng-vocab`. */
  prefix: string;
  tags?: string[];
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  source?: string;
  reference?: string;
}

/**
 * Emit one question per fact. Stems are de-duplicated so repeated templates do
 * not collide, and every emitted question is validated to have four unique
 * options with a resolvable answer.
 */
export function bankToQuestions(
  facts: readonly Fact[],
  options: BankOptions,
): SeedQuestion[] {
  const out: SeedQuestion[] = [];
  const seen = new Set<string>();
  const { rand } = makeRandom(`${options.prefix}-bank`);
  facts.forEach((fact, index) => {
    const stem = fact.q.trim();
    if (seen.has(stem.toLowerCase())) return;
    seen.add(stem.toLowerCase());
    const { options: opts, correct } = buildOptions(fact.a, fact.d, rand);
    out.push({
      slug: `${options.prefix}-${index + 1}`,
      stem,
      options: opts,
      correct,
      explanation: fact.e,
      difficulty: options.difficulty ?? difficultyFor(index, facts.length),
      subject: options.subject,
      topic: options.topic,
      exams: [],
      educationLevels: [],
      tags: [...(options.tags ?? []), ...(fact.tags ?? [])],
      source: options.source,
      reference: options.reference,
      status: "PUBLISHED",
      origin: options.source || options.reference ? "VERIFIED_PRACTICE" : "GENERATED",
    });
  });
  return out;
}

/**
 * Emit `count` distinct questions from a numeric/parametric template. The
 * template returns `null` to signal a draw that should be retried, which keeps
 * the output free of duplicates even when the parameter space is small.
 */
export function numeric(
  count: number,
  options: BankOptions & { staticBase?: number },
  build: (index: number) => {
    stem: string;
    correct: string | number;
    distractors: Array<string | number>;
    explanation?: string;
    tags?: string[];
  } | null,
): SeedQuestion[] {
  const { rand } = makeRandom(`${options.prefix}-numeric`);
  const out: SeedQuestion[] = [];
  const seen = new Set<string>();
  const target = sc(count);
  for (let attempt = 0; attempt < target * 4 && out.length < target; attempt++) {
    const spec = build(attempt);
    if (!spec) continue;
    const stem = spec.stem.trim();
    if (seen.has(stem.toLowerCase())) continue;
    seen.add(stem.toLowerCase());
    const { options: opts, correct } = buildOptions(spec.correct, spec.distractors, rand);
    out.push({
      slug: `${options.prefix}-${out.length + 1}`,
      stem,
      options: opts,
      correct,
      explanation: spec.explanation,
      difficulty: options.difficulty ?? difficultyFor(out.length, target),
      subject: options.subject,
      topic: options.topic,
      exams: [],
      educationLevels: [],
      tags: [...(options.tags ?? []), ...(spec.tags ?? [])],
      staticOrder: options.staticBase !== undefined ? options.staticBase + out.length : undefined,
      status: "PUBLISHED",
      origin: "GENERATED",
    });
  }
  return out;
}

/** Random integer in [min, max]. */
export function ri(rand: () => number, min: number, max: number): number {
  return min + Math.floor(rand() * (max - min + 1));
}

/** Deterministic integer sequence helper. */
export function seq(rand: () => number, count: number, min: number, max: number): number[] {
  return Array.from({ length: count }, () => ri(rand, min, max));
}
