import { buildOptions, makeRandom } from "./core";
import type { GeneratorContext, SeedQuestion } from "./core";
import { SCALE } from "../config";

/**
 * Computer science generator. Produces binary/decimal conversion questions
 * (all 256 byte values) plus data-unit conversion questions — every answer is
 * computed, so correctness is guaranteed.
 */
export function generateComputerQuestions(
  ctx: GeneratorContext,
): SeedQuestion[] {
  const { rand } = makeRandom("computer-v1");
  const out: SeedQuestion[] = [];

  const add = (
    partial: Omit<SeedQuestion, "subject" | "exams" | "educationLevels" | "status">,
  ) =>
    out.push({
      ...partial,
      subject: "computer",
      exams: ctx.exams,
      educationLevels: ctx.educationLevels,
      status: "PUBLISHED",
    });

  // Binary → decimal for all byte values (0–255).
  for (let n = 0; n < SCALE.computer.binary; n++) {
    const binary = n.toString(2).padStart(8, "0");
    const { options, correct } = buildOptions(
      n,
      [n + 1, n - 1, n ^ 0b11111111],
      rand,
    );
    add({
      slug: `computer-binary-to-decimal-${n}`,
      stem: `What is the decimal value of the binary number ${binary}?`,
      options,
      correct,
      explanation: `${binary} in binary = ${n} in decimal.`,
      difficulty: n < 64 ? "EASY" : n < 192 ? "MEDIUM" : "HARD",
      topic: "computer-fundamentals",
      tags: ["binary", "number-system"],
      staticOrder: 20000 + n,
    });
  }

  // Data storage unit conversions.
  const unitPairs: Array<[string, string, number]> = [
    ["1 kilobyte (KB)", "bytes", 1024],
    ["1 megabyte (MB)", "kilobytes (KB)", 1024],
    ["1 gigabyte (GB)", "megabytes (MB)", 1024],
    ["1 terabyte (TB)", "gigabytes (GB)", 1024],
  ];
  unitPairs.forEach(([from, to, factor], i) => {
    const { options, correct } = buildOptions(
      factor,
      [1000, factor * 2, factor / 2],
      rand,
    );
    add({
      slug: `computer-unit-${i}`,
      stem: `How many ${to} are there in ${from}?`,
      options,
      correct,
      explanation: `1 ${from.split(" ")[1]} = ${factor} ${to}.`,
      difficulty: "EASY",
      topic: "computer-fundamentals",
      tags: ["units", "storage"],
      staticOrder: 20260 + i,
    });
  });

  return out;
}

/**
 * Everyday Science generator: metric unit conversions, computed from a table.
 */
export function generateScienceQuestions(ctx: GeneratorContext): SeedQuestion[] {
  const { rand } = makeRandom("science-v1");
  const out: SeedQuestion[] = [];

  const add = (
    partial: Omit<SeedQuestion, "subject" | "exams" | "educationLevels" | "status">,
  ) =>
    out.push({
      ...partial,
      subject: "everyday-science",
      exams: ctx.exams,
      educationLevels: ctx.educationLevels,
      status: "PUBLISHED",
    });

  const conversions: Array<[string, string, number]> = [
    ["metres", "centimetres", 100],
    ["kilometres", "metres", 1000],
    ["kilograms", "grams", 1000],
    ["litres", "millilitres", 1000],
    ["hours", "minutes", 60],
    ["minutes", "seconds", 60],
    ["tonnes", "kilograms", 1000],
    ["metres", "millimetres", 1000],
  ];

  const amounts = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100,
    120, 150, 200, 250, 300, 400, 500,
  ];

  let made = 0;
  for (const [from, to, factor] of conversions) {
    for (const amount of amounts) {
      if (made >= SCALE.science.unitConversion) break;
      const correct = amount * factor;
      const { options, correct: ci } = buildOptions(
        correct,
        [correct * 10, correct / 10, correct + factor],
        rand,
      );
      add({
        slug: `science-unit-${from}-${to}-${amount}`,
        stem: `How many ${to} are there in ${amount} ${from}?`,
        options,
        correct: ci,
        explanation: `1 ${from.replace(/s$/, "")} = ${factor} ${to}, so ${amount} × ${factor} = ${correct} ${to}.`,
        difficulty: "EASY",
        topic: "units-measurements",
        tags: ["units", "conversion"],
        staticOrder: 21000 + made,
      });
      made++;
    }
  }

  return out;
}
