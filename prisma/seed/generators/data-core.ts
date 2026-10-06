/**
 * Data-driven subject banks.
 *
 * The platform's remaining subjects are filled from compact curated banks. A
 * subject declares topics; each topic carries curated facts (question, answer,
 * distractors, explanation) and optionally parametric specs. This keeps the
 * catalogue the single source of truth: adding coverage means adding data here,
 * never touching the selection engine or the UI.
 *
 * Every emitted question flows through the same qualification placement and
 * distribution rules as the rest of the seed.
 */

import { makeRandom } from "./core";
import { bankToQuestions, numeric } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

export type SeedLanguage = "ENGLISH" | "URDU" | "SINDHI";

/** A parametric spec: `count` computed items under one subject/topic. */
export interface NumericSpec {
  count: number;
  prefix: string;
  tags?: string[];
  build: (rand: () => number) => {
    stem: string;
    correct: string | number;
    distractors: Array<string | number>;
    explanation: string;
    tags?: string[];
  } | null;
}

export interface TopicSpec {
  slug: string;
  facts?: Fact[];
  numeric?: NumericSpec[];
}

export interface SubjectSpec {
  slug: string;
  /** Content language; defaults to ENGLISH. */
  language?: SeedLanguage;
  topics: TopicSpec[];
}

/**
 * Expand a list of subject specs into SeedQuestions. Exam links and education
 * levels are left empty and filled centrally by `buildAllQuestions`, exactly as
 * for the other generators.
 */
export function generateSubjectBanks(specs: readonly SubjectSpec[]): SeedQuestion[] {
  const out: SeedQuestion[] = [];
  for (const subject of specs) {
    for (const topic of subject.topics) {
      if (topic.facts?.length) {
        const qs = bankToQuestions(topic.facts, {
          subject: subject.slug,
          topic: topic.slug,
          prefix: `db-${subject.slug}-${topic.slug}`,
          tags: [topic.slug],
        });
        if (subject.language) for (const q of qs) q.language = subject.language;
        out.push(...qs);
      }
      for (const spec of topic.numeric ?? []) {
        const { rand } = makeRandom(`${spec.prefix}-rand`);
        const qs = numeric(
          spec.count,
          {
            subject: subject.slug,
            topic: topic.slug,
            prefix: spec.prefix,
            tags: spec.tags ?? [topic.slug],
          },
          () => spec.build(rand),
        );
        if (subject.language) for (const q of qs) q.language = subject.language;
        out.push(...qs);
      }
    }
  }
  return out;
}

/** Convenience: build a Fact with three distractors. */
export function f(
  q: string,
  a: string,
  d: [string, string, string],
  e: string,
  tags?: string[],
): Fact {
  return { q, a, d, e, tags };
}

export { makeRandom, numeric };
export type { Fact, SeedQuestion };
