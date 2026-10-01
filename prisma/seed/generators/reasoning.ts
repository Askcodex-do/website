import { buildOptions, makeRandom } from "./core";
import type { GeneratorContext, SeedQuestion } from "./core";
import { SCALE } from "../config";

/**
 * Reasoning generator: number series, odd-one-out, direction sense and
 * coding-decoding. All answers are computed from the template parameters.
 */
export function generateReasoningQuestions(
  ctx: GeneratorContext,
): SeedQuestion[] {
  const { rand } = makeRandom("reasoning-v2");
  const out: SeedQuestion[] = [];

  const add = (
    partial: Omit<SeedQuestion, "subject" | "exams" | "educationLevels" | "status">,
  ) =>
    out.push({
      ...partial,
      subject: "analytical-reasoning",
      exams: ctx.exams,
      educationLevels: ctx.educationLevels,
      status: "PUBLISHED",
    });

  function emit(
    count: number,
    topic: string,
    tags: string[],
    staticBase: number,
    build: (index: number) => {
      slug: string;
      stem: string;
      correct: string | number;
      distractors: Array<string | number>;
      explanation: string;
      difficulty?: "EASY" | "MEDIUM" | "HARD";
    },
  ) {
    const seen = new Set<string>();
    let made = 0;
    for (let attempt = 0; attempt < count * 6 && made < count; attempt++) {
      const spec = build(attempt);
      if (seen.has(spec.stem)) continue;
      seen.add(spec.stem);
      const { options, correct } = buildOptions(spec.correct, spec.distractors, rand);
      add({
        slug: spec.slug,
        stem: spec.stem,
        options,
        correct,
        explanation: spec.explanation,
        difficulty: spec.difficulty ?? "MEDIUM",
        topic,
        tags,
        staticOrder: staticBase + made,
      });
      made++;
    }
  }

  emit(
    SCALE.reasoning.numberSeriesAdd,
    "series-sequences",
    ["number-series", "reasoning"],
    23000,
    (i) => {
      const start = 2 + Math.floor(rand() * 25);
      const step = 2 + Math.floor(rand() * 11);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const answer = start + 4 * step;
      return {
        slug: `reasoning-series-add-${i}`,
        stem: `Find the next number in the series: ${terms.join(", ")}, ?`,
        correct: answer,
        distractors: [answer + step, answer - step, answer + 1],
        explanation: `Each term increases by ${step}, so the next term is ${terms[3]} + ${step} = ${answer}.`,
      };
    },
  );

  emit(
    SCALE.reasoning.numberSeriesMultiply,
    "series-sequences",
    ["number-series", "reasoning"],
    24000,
    (i) => {
      const start = 2 + Math.floor(rand() * 5);
      const mult = 2 + Math.floor(rand() * 2);
      const terms = [start, start * mult, start * mult ** 2, start * mult ** 3];
      const answer = start * mult ** 4;
      return {
        slug: `reasoning-series-multiply-${i}`,
        stem: `Find the next number in the series: ${terms.join(", ")}, ?`,
        correct: answer,
        distractors: [answer * mult, Math.floor(answer / mult), answer + mult],
        explanation: `Each term is multiplied by ${mult}, so the next term is ${terms[3]} × ${mult} = ${answer}.`,
        difficulty: "HARD",
      };
    },
  );

  emit(
    SCALE.reasoning.oddOneOut,
    "odd-one-out",
    ["odd-one-out", "reasoning"],
    25000,
    (i) => {
      const even = 2 + Math.floor(rand() * 40) * 2;
      const odd = even + 1 + Math.floor(rand() * 40) * 2;
      return {
        slug: `reasoning-odd-one-out-${i}`,
        stem: `Which of the following numbers is the odd one out?`,
        correct: odd,
        distractors: [even, even + 4, even + 8],
        explanation: `${odd} is odd while the other three numbers are even.`,
        difficulty: "EASY",
      };
    },
  );

  emit(
    SCALE.reasoning.direction,
    "logical-deduction",
    ["direction", "reasoning"],
    26000,
    (i) => {
      const steps = 3 + Math.floor(rand() * 12);
      const turnRight = i % 2 === 0;
      const facing = turnRight ? "East" : "West";
      return {
        slug: `reasoning-direction-${i}`,
        stem: `A person walks ${steps} km towards North, then turns ${turnRight ? "right" : "left"} and walks ${steps} km. Which direction is the person now facing?`,
        correct: facing,
        distractors: turnRight
          ? ["West", "North", "South"]
          : ["East", "North", "South"],
        explanation: `Walking north then turning ${turnRight ? "right" : "left"} (a 90° turn) makes the person face ${facing}.`,
      };
    },
  );

  const words = ["CAT", "DOG", "SUN", "MAP", "PEN", "BUS", "CAR", "BOX"];
  emit(
    SCALE.reasoning.codingDecoding,
    "logical-deduction",
    ["coding", "reasoning"],
    27000,
    (i) => {
      const shift = 1 + (i % 5);
      const word = words[i % words.length];
      const encode = (w: string) =>
        w
          .split("")
          .map((c) =>
            String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65),
          )
          .join("");
      const coded = encode(word);
      const decoys = words
        .filter((w) => w !== word)
        .slice(0, 3)
        .map(encode);
      return {
        slug: `reasoning-coding-${i}`,
        stem: `In a certain code, each letter is shifted ${shift} position(s) forward in the alphabet. How is "${word}" written in that code?`,
        correct: coded,
        distractors: decoys,
        explanation: `Shifting each letter of "${word}" forward by ${shift} gives "${coded}".`,
      };
    },
  );

  return out;
}
