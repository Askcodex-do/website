import type { SeedQuestion } from "../types";
import { generateEnglishQuestions } from "./english";
import { generateFactQuestions } from "./facts";
import { generateMathQuestions } from "./math";
import { generateReasoningQuestions } from "./reasoning";
import { generateComputerQuestions, generateScienceQuestions } from "./science-computer";
import type { GeneratorContext } from "./core";

export type { GeneratorContext } from "./core";
export { generateFactQuestions, generateEnglishQuestions, generateMathQuestions };

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
    ...generateMathQuestions(ctx),
    ...generateEnglishQuestions(ctx),
    ...generateReasoningQuestions(ctx),
    ...generateComputerQuestions(ctx),
    ...generateScienceQuestions(ctx),
    ...generateFactQuestions(ctx, examSlugsForSubject),
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
  return questions.filter((q) => {
    if (seen.has(q.slug)) return false;
    seen.add(q.slug);
    return true;
  });
}
