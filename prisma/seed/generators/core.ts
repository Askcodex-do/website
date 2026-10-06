/**
 * Shared primitives for the deterministic question generators.
 *
 * Generators expand compact templates into large volumes of genuinely valid
 * MCQs so the seeded database reaches 10,000+ real, answerable questions
 * without shipping a 10,000-row CSV. Every generated item still carries full
 * metadata and flows through the same Question Selection Engine as
 * hand-authored questions.
 */

import { seededRandom } from "../../../src/lib/utils";
import type { SeedDifficulty, SeedQuestion } from "../types";

export type { SeedQuestion, SeedDifficulty };

export interface GeneratorContext {
  educationLevels: string[];
  exams: string[];
}

/** Each generator module receives its own seeded PRNG for reproducibility. */
export function makeRandom(seed: string) {
  const rand = seededRandom(seed);
  return {
    rand,
    pick<T>(items: readonly T[]): T {
      return items[Math.floor(rand() * items.length)];
    },
    int(minInclusive: number, maxExclusive: number): number {
      return minInclusive + Math.floor(rand() * (maxExclusive - minInclusive));
    },
  };
}

/**
 * Build four distinct, shuffled options from a correct value plus distractors.
 * Falls back to numeric/ordinal padding if fewer than three unique distractors
 * are supplied, so generated questions are always well-formed.
 */
export function buildOptions(
  correctValue: string | number,
  distractors: Array<string | number>,
  rand: () => number,
): { options: string[]; correct: number } {
  const unique = Array.from(
    new Set([String(correctValue), ...distractors.map(String)]),
  );
  if (unique.length < 4) {
    const numericBase = Number(correctValue);
    let bump = 1;
    while (unique.length < 4) {
      const candidate = Number.isFinite(numericBase)
        ? String(numericBase + 10 + bump)
        : `${correctValue} (${bump})`;
      if (!unique.includes(candidate)) unique.push(candidate);
      bump++;
    }
  }
  const four = unique.slice(0, 4);
  for (let i = four.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [four[i], four[j]] = [four[j], four[i]];
  }
  return {
  options: four,
  correct: four.indexOf(String(correctValue)),
};
}

/** Spread generated questions across EASY/MEDIUM/HARD by position. */
export function difficultyFor(index: number, total: number): SeedDifficulty {
  const ratio = index / Math.max(1, total - 1);
  if (ratio < 0.35) return "EASY";
  if (ratio < 0.75) return "MEDIUM";
  return "HARD";
}

/** Convenience factory to keep generator bodies terse and consistent. */
export function makeQuestion(
  input: Omit<SeedQuestion, "status" | "options" | "correct"> & {
    options: string[];
    correct: number;
  },
): SeedQuestion {
  return { status: "PUBLISHED", ...input };
}
