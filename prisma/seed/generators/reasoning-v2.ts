/**
 * Analytical-reasoning generator.
 *
 * Series, analogies, coding-decoding and odd-one-out items are all produced
 * from parameters, so each item has a verifiable answer and the family scales
 * to tens of thousands of distinct questions.
 */

import { makeRandom } from "./core";
import { numeric, ri } from "./bank";
import type { SeedQuestion } from "./core";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function generateReasoningV2(): SeedQuestion[] {
  const { rand } = makeRandom("reasoning-v2");
  const out: SeedQuestion[] = [];

  /* ---- number series ---- */
  out.push(
    ...numeric(14000, { subject: "analytical-reasoning", topic: "number-series", prefix: "rs2-arith", tags: ["number-series"] }, () => {
      const a = ri(rand, 2, 60);
      const d = ri(rand, 2, 25);
      const n = 5;
      const terms = Array.from({ length: n }, (_, i) => a + i * d);
      const correct = a + n * d;
      return {
        stem: `Find the next number in the series: ${terms.join(", ")}, ___`,
        correct,
        distractors: [correct + d, correct - d, correct + 1, a + n * d + d],
        explanation: `The series increases by ${d} each step, so the next term is ${terms[n - 1]} + ${d} = ${correct}.`,
      };
    }),
  );
  out.push(
    ...numeric(12000, { subject: "analytical-reasoning", topic: "number-series", prefix: "rs2-geo", tags: ["number-series"] }, () => {
      const a = ri(rand, 1, 9);
      const r = [2, 3][ri(rand, 0, 1)];
      const terms = Array.from({ length: 4 }, (_, i) => a * Math.pow(r, i));
      const correct = a * Math.pow(r, 4);
      return {
        stem: `Find the next number in the series: ${terms.join(", ")}, ___`,
        correct,
        distractors: [correct * r, correct / r, correct + r, correct - 1],
        explanation: `Each term is multiplied by ${r}, so the next term is ${terms[3]} × ${r} = ${correct}.`,
      };
    }),
  );
  out.push(
    ...numeric(10000, { subject: "analytical-reasoning", topic: "number-series", prefix: "rs2-sq", tags: ["number-series"] }, () => {
      const start = ri(rand, 2, 15);
      const terms = Array.from({ length: 4 }, (_, i) => Math.pow(start + i, 2));
      const correct = Math.pow(start + 4, 2);
      return {
        stem: `Find the next number in the series: ${terms.join(", ")}, ___`,
        correct,
        distractors: [correct + 1, correct - 1, Math.pow(start + 5, 2), correct + 2],
        explanation: `The terms are squares of ${start}, ${start + 1}, ${start + 2}, ${start + 3}, so the next is ${start + 4}² = ${correct}.`,
      };
    }),
  );

  /* ---- letter series ---- */
  out.push(
    ...numeric(9000, { subject: "analytical-reasoning", topic: "letter-series", prefix: "rs2-let", tags: ["letter-series"] }, () => {
      const start = ri(rand, 0, 10);
      const step = ri(rand, 1, 5);
      const idx = Array.from({ length: 4 }, (_, i) => start + i * step);
      if (idx[3] + step > 25) return null;
      const terms = idx.map((i) => LETTERS[i]);
      const correct = LETTERS[idx[3] + step];
      return {
        stem: `Find the next letter in the series: ${terms.join(", ")}, ___`,
        correct,
        distractors: [LETTERS[idx[3] + step + 1], LETTERS[idx[3] + step - 1], LETTERS[idx[3] + 2 * step] ?? "Z", LETTERS[start]],
        explanation: `Each letter advances by ${step}, so the next is ${correct}.`,
      };
    }),
  );

  /* ---- coding-decoding ---- */
  out.push(
    ...numeric(9000, { subject: "analytical-reasoning", topic: "coding-decoding", prefix: "rs2-code", tags: ["coding-decoding"] }, () => {
      const shift = ri(rand, 1, 6);
      const len = ri(rand, 3, 5);
      const word = Array.from({ length: len }, () => LETTERS[ri(rand, 0, 25)]);
      const coded = word.map((c) => LETTERS[(LETTERS.indexOf(c) + shift) % 26]);
      return {
        stem: `In a certain code, each letter is replaced by the letter ${shift} position(s) ahead. If "${word.join("")}" is written in that code, what is the result?`,
        correct: coded.join(""),
        distractors: [
          word.map((c) => LETTERS[(LETTERS.indexOf(c) - shift + 26) % 26]).join(""),
          coded.join("").split("").reverse().join(""),
          word.join(""),
          coded.join("") + "A",
        ],
        explanation: `Shifting each letter ${shift} place(s) forward gives ${coded.join("")}.`,
      };
    }),
  );

  /* ---- analogy (numbers) ---- */
  out.push(
    ...numeric(9000, { subject: "analytical-reasoning", topic: "analogies", prefix: "rs2-anal", tags: ["analogies"] }, () => {
      const a = ri(rand, 2, 20);
      const b = a * a;
      const c = ri(rand, 2, 20);
      const correct = c * c;
      return {
        stem: `Complete the analogy: ${a} : ${b} :: ${c} : ___`,
        correct,
        distractors: [c * 2, correct + c, c + a, correct - 1],
        explanation: `The relationship is "number : its square", so ${c} : ${c}² = ${correct}.`,
      };
    }),
  );

  /* ---- direction sense ---- */
  out.push(
    ...numeric(8000, { subject: "analytical-reasoning", topic: "direction-sense", prefix: "rs2-dir", tags: ["direction-sense"] }, () => {
      const north = ri(rand, 1, 40);
      const east = ri(rand, 1, 40);
      const dirs = ["North", "South", "East", "West"];
      const start = dirs[ri(rand, 0, 3)];
      return {
        stem: `A person walks ${north} km North and then ${east} km East. Which direction is the person from the starting point?`,
        correct: "North-East",
        distractors: ["South-East", "North-West", "South-West"],
        explanation: `Moving North then East places the person to the North-East of the start.`,
      };
    }),
  );

  /* ---- odd one out (numbers) ---- */
  out.push(
    ...numeric(7000, { subject: "analytical-reasoning", topic: "odd-one-out", prefix: "rs2-odd", tags: ["odd-one-out"] }, () => {
      const base = ri(rand, 2, 12);
      const mult = [3, 4, 5, 6][ri(rand, 0, 3)];
      const evens = [base, base * mult, base * mult * mult];
      if (new Set(evens).size < 3) return null;
      const odd = evens[0] + 1;
      return {
        stem: `Find the odd one out: ${evens[0]}, ${evens[1]}, ${evens[2]}, ${odd}`,
        correct: `${odd}`,
        distractors: [`${evens[0]}`, `${evens[1]}`, `${evens[2]}`],
        explanation: `${evens[0]}, ${evens[1]} and ${evens[2]} are all multiples of ${base}; ${odd} is not.`,
      };
    }),
  );

  /* ---- blood relations / ranking (computed) ---- */
  out.push(
    ...numeric(6000, { subject: "analytical-reasoning", topic: "logical-deduction", prefix: "rs2-rank", tags: ["ranking"] }, () => {
      const total = ri(rand, 20, 60);
      const fromTop = ri(rand, 3, total - 2);
      const fromBottom = total - fromTop + 1;
      return {
        stem: `In a class of ${total} students, Ali ranks ${fromTop}th from the top. What is his rank from the bottom?`,
        correct: fromBottom,
        distractors: [fromBottom + 1, fromBottom - 1, total - fromTop, fromTop],
        explanation: `Rank from bottom = total − rank from top + 1 = ${total} − ${fromTop} + 1 = ${fromBottom}.`,
      };
    }),
  );

  return out;
}
