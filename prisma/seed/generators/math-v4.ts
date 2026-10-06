/**
 * High-volume mathematics generator.
 *
 * Every item is derived from parameters, so answers are computed rather than
 * asserted. Operand ranges are wide enough to produce hundreds of thousands of
 * genuinely distinct questions while every one remains solvable and correct.
 */

import { difficultyFor } from "./core";
import { numeric, ri } from "./bank";
import { makeRandom } from "./core";
import type { SeedQuestion } from "./core";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};

export function generateMathV4(): SeedQuestion[] {
  const { rand } = makeRandom("math-v4");
  const out: SeedQuestion[] = [];
  const push = (qs: SeedQuestion[]) => out.push(...qs);

  /* ---- arithmetic ---- */
  push(
    numeric(26000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-add", tags: ["addition", "arithmetic"] }, () => {
      const a = ri(rand, 120, 98000);
      const b = ri(rand, 120, 98000);
      const c = a + b;
      return {
        stem: `What is ${a} + ${b}?`,
        correct: c,
        distractors: [c + 10, c - 10, c + 100, c - 1],
        explanation: `${a} + ${b} = ${c}.`,
      };
    }),
  );
  push(
    numeric(24000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-sub", tags: ["subtraction", "arithmetic"] }, () => {
      const a = ri(rand, 5000, 99000);
      const b = ri(rand, 100, a - 1);
      const c = a - b;
      return {
        stem: `What is ${a} − ${b}?`,
        correct: c,
        distractors: [c + 10, c - 10, c + 1, c - 100],
        explanation: `${a} − ${b} = ${c}.`,
      };
    }),
  );
  push(
    numeric(26000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-mul", tags: ["multiplication", "arithmetic"] }, () => {
      const a = ri(rand, 12, 999);
      const b = ri(rand, 12, 999);
      const c = a * b;
      return {
        stem: `What is ${a} × ${b}?`,
        correct: c,
        distractors: [c + a, c - b, c + 1, c - 10],
        explanation: `${a} × ${b} = ${c}.`,
      };
    }),
  );
  push(
    numeric(22000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-div", tags: ["division", "arithmetic"] }, () => {
      const b = ri(rand, 3, 99);
      const c = ri(rand, 3, 999);
      const a = b * c;
      return {
        stem: `What is ${a} ÷ ${b}?`,
        correct: c,
        distractors: [c + 1, c - 1, c + 10, c - 2],
        explanation: `${a} ÷ ${b} = ${c} (because ${b} × ${c} = ${a}).`,
      };
    }),
  );
  push(
    numeric(12000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-mixed", tags: ["bidmas", "arithmetic"] }, () => {
      const a = ri(rand, 5, 40);
      const b = ri(rand, 3, 30);
      const c = ri(rand, 2, 20);
      const correct = a * b + c;
      return {
        stem: `What is ${a} × ${b} + ${c}?`,
        correct,
        distractors: [correct + a, correct - c, (a + b) * c, correct + 10],
        explanation: `Multiply first: ${a} × ${b} = ${a * b}; then ${a * b} + ${c} = ${correct}.`,
      };
    }),
  );

  /* ---- number properties ---- */
  push(
    numeric(9000, { subject: "mathematics", topic: "number-theory", prefix: "m4-hcf", tags: ["hcf", "gcd"] }, () => {
      const g = ri(rand, 2, 40);
      const a = g * ri(rand, 2, 30);
      const b = g * ri(rand, 2, 30);
      const correct = gcd(a, b);
      return {
        stem: `What is the highest common factor (HCF) of ${a} and ${b}?`,
        correct,
        distractors: [correct + 1, correct * 2, a, lcm(a, b)],
        explanation: `The HCF of ${a} and ${b} is ${correct}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "number-theory", prefix: "m4-lcm", tags: ["lcm"] }, () => {
      const a = ri(rand, 4, 60);
      const b = ri(rand, 4, 60);
      const correct = lcm(a, b);
      return {
        stem: `What is the least common multiple (LCM) of ${a} and ${b}?`,
        correct,
        distractors: [correct + a, correct - b, a * b + 1, correct * 2],
        explanation: `LCM(${a}, ${b}) = ${correct}.`,
      };
    }),
  );
  push(
    numeric(6000, { subject: "mathematics", topic: "number-theory", prefix: "m4-prime", tags: ["prime-numbers"] }, () => {
      const n = ri(rand, 20, 500);
      const correct = isPrime(n) ? "Prime" : "Composite";
      return {
        stem: `Is ${n} a prime number or a composite number?`,
        correct,
        distractors: [correct === "Prime" ? "Composite" : "Prime", "Neither", "Both"],
        explanation: `${n} is ${correct.toLowerCase()}.`,
      };
    }),
  );
  push(
    numeric(6000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-sqrt", tags: ["square-root"] }, () => {
      const r = ri(rand, 4, 400);
      const n = r * r;
      return {
        stem: `What is the square root of ${n}?`,
        correct: r,
        distractors: [r + 1, r - 1, r + 10, r * 2],
        explanation: `${r} × ${r} = ${n}, so √${n} = ${r}.`,
      };
    }),
  );
  push(
    numeric(5000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-cube", tags: ["cube"] }, () => {
      const r = ri(rand, 3, 60);
      return {
        stem: `What is ${r}³ (${r} cubed)?`,
        correct: r * r * r,
        distractors: [r * r, r * r * r + r, 3 * r, r * r * r - r],
        explanation: `${r}³ = ${r} × ${r} × ${r} = ${r * r * r}.`,
      };
    }),
  );

  /* ---- percentages & proportion ---- */
  push(
    numeric(16000, { subject: "mathematics", topic: "percentages", prefix: "m4-pct", tags: ["percentage"] }, () => {
      const p = ri(rand, 2, 95);
      const n = ri(rand, 2, 40) * 20;
      const correct = (p * n) / 100;
      if (!Number.isInteger(correct)) return null;
      return {
        stem: `What is ${p}% of ${n}?`,
        correct,
        distractors: [correct + p, correct - 1, (p * n) / 50, correct + 10],
        explanation: `${p}% of ${n} = (${p}/100) × ${n} = ${correct}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "percentages", prefix: "m4-pctchange", tags: ["percentage"] }, () => {
      const from = ri(rand, 20, 400);
      const to = ri(rand, 20, 400);
      if (to === from) return null;
      const pct = ((to - from) / from) * 100;
      const correct = `${pct > 0 ? "+" : ""}${Math.round(pct * 100) / 100}%`;
      return {
        stem: `A value changes from ${from} to ${to}. What is the percentage change?`,
        correct,
        distractors: [`${Math.round(((to - from) / to) * 10000) / 100}%`, `${-Math.round(pct * 100) / 100}%`, `${Math.round(pct * 100) / 100}%`, "0%"],
        explanation: `Change = ${to} − ${from} = ${to - from}; percentage change = (${to - from}/${from}) × 100 = ${correct}.`,
      };
    }),
  );
  push(
    numeric(8000, { subject: "mathematics", topic: "ratio-proportion", prefix: "m4-ratio", tags: ["ratio"] }, () => {
      const a = ri(rand, 2, 40);
      const b = ri(rand, 2, 40);
      const k = ri(rand, 2, 30);
      const total = (a + b) * k;
      const correct = a * k;
      return {
        stem: `A sum of ${total} is divided between two people in the ratio ${a}:${b}. What is the larger share if ${a} > ${b}?`,
        correct: a > b ? a * k : b * k,
        distractors: [a > b ? b * k : a * k, total, a * k + k, (a + b) * k - 1],
        explanation: `Total parts = ${a + b}; each part = ${total} ÷ ${a + b} = ${k}; the larger share = ${Math.max(a, b)} × ${k} = ${Math.max(a, b) * k}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "averages", prefix: "m4-avg", tags: ["average", "mean"] }, () => {
      const n = ri(rand, 3, 8);
      const nums = Array.from({ length: n }, () => ri(rand, 2, 200));
      const sum = nums.reduce((a, b) => a + b, 0);
      if (sum % n !== 0) return null;
      const correct = sum / n;
      return {
        stem: `What is the average of ${nums.join(", ")}?`,
        correct,
        distractors: [correct + 1, correct - 1, sum, correct + 5],
        explanation: `Sum = ${sum}; average = ${sum} ÷ ${n} = ${correct}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-profit", tags: ["profit-loss"] }, () => {
      const cost = ri(rand, 5, 60) * 10;
      const pct = ri(rand, 5, 90);
      const profit = (cost * pct) / 100;
      const sp = cost + profit;
      return {
        stem: `An item costs Rs. ${cost} and is sold at a ${pct}% profit. What is the selling price?`,
        correct: sp,
        distractors: [cost - profit, sp + 10, cost, sp - 1],
        explanation: `Profit = ${pct}% of ${cost} = ${profit}; selling price = ${cost} + ${profit} = ${sp}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-si", tags: ["simple-interest"] }, () => {
      const p = ri(rand, 2, 50) * 1000;
      const r = ri(rand, 2, 15);
      const t = ri(rand, 1, 6);
      const si = (p * r * t) / 100;
      return {
        stem: `Find the simple interest on Rs. ${p} at ${r}% per annum for ${t} years.`,
        correct: si,
        distractors: [si + p, si / 2, si + 100, si - 100],
        explanation: `SI = (P × R × T)/100 = (${p} × ${r} × ${t})/100 = ${si}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-speed", tags: ["speed-distance-time"] }, () => {
      const speed = ri(rand, 20, 120);
      const time = ri(rand, 2, 12);
      const dist = speed * time;
      return {
        stem: `A vehicle travels at ${speed} km/h for ${time} hours. What distance does it cover?`,
        correct: `${dist} km`,
        distractors: [`${dist + speed} km`, `${speed + time} km`, `${dist - speed} km`, `${Math.round(dist / 2)} km`],
        explanation: `Distance = speed × time = ${speed} × ${time} = ${dist} km.`,
      };
    }),
  );
  push(
    numeric(8000, { subject: "mathematics", topic: "arithmetic", prefix: "m4-work", tags: ["time-work"] }, () => {
      const a = ri(rand, 2, 24);
      const b = ri(rand, 2, 24);
      const days = (a * b) / (a + b);
      if (!Number.isInteger(days * 100)) return null;
      const correct = `${Math.round(days * 100) / 100} days`;
      return {
        stem: `A can finish a job in ${a} days and B in ${b} days. Working together, how long will they take?`,
        correct,
        distractors: [`${a + b} days`, `${Math.round(((a + b) / 2) * 100) / 100} days`, `${Math.abs(a - b)} days`, `${a * b} days`],
        explanation: `Combined rate = 1/${a} + 1/${b}; time = (${a} × ${b})/(${a} + ${b}) = ${correct}.`,
      };
    }),
  );

  /* ---- algebra ---- */
  push(
    numeric(16000, { subject: "mathematics", topic: "algebra", prefix: "m4-linear", tags: ["algebra", "linear-equations"] }, () => {
      const a = ri(rand, 2, 25);
      const x = ri(rand, 2, 40);
      const b = ri(rand, 1, 100);
      const c = a * x + b;
      return {
        stem: `Solve for x: ${a}x + ${b} = ${c}.`,
        correct: x,
        distractors: [x + 1, x - 1, x + a, c - b],
        explanation: `${a}x = ${c} − ${b} = ${c - b}; x = ${c - b} ÷ ${a} = ${x}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "algebra", prefix: "m4-quad", tags: ["quadratic"] }, () => {
      const r1 = ri(rand, 1, 15);
      const r2 = ri(rand, 1, 15);
      const b = -(r1 + r2);
      const c = r1 * r2;
      return {
        stem: `What are the roots of x² ${b >= 0 ? "+" : "−"} ${Math.abs(b)}x + ${c} = 0?`,
        correct: `${r1} and ${r2}`,
        distractors: [`${-r1} and ${-r2}`, `${r1} and ${-r2}`, `${r1 + 1} and ${r2 + 1}`, `${r1 * r2} and 1`],
        explanation: `x² ${b >= 0 ? "+" : "−"} ${Math.abs(b)}x + ${c} = (x − ${r1})(x − ${r2}), so x = ${r1} or ${r2}.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "algebra", prefix: "m4-simplify", tags: ["algebra"] }, () => {
      const a = ri(rand, 2, 20);
      const b = ri(rand, 2, 20);
      const c = ri(rand, 2, 20);
      const d = ri(rand, 2, 20);
      const coef = a + c;
      const con = b + d;
      return {
        stem: `Simplify: ${a}x + ${b} + ${c}x + ${d}.`,
        correct: `${coef}x + ${con}`,
        distractors: [`${a + c}x + ${b * d}`, `${a * c}x + ${con}`, `${coef}x + ${con + 1}`, `${a + c + b + d}x`],
        explanation: `Combine like terms: (${a} + ${c})x + (${b} + ${d}) = ${coef}x + ${con}.`,
      };
    }),
  );
  push(
    numeric(8000, { subject: "mathematics", topic: "sequences-series", prefix: "m4-ap", tags: ["arithmetic-progression"] }, () => {
      const a = ri(rand, 1, 30);
      const d = ri(rand, 2, 15);
      const n = ri(rand, 5, 25);
      const term = a + (n - 1) * d;
      return {
        stem: `Find the ${n}th term of the arithmetic progression ${a}, ${a + d}, ${a + 2 * d}, …`,
        correct: term,
        distractors: [term + d, term - d, a + n * d, term + a],
        explanation: `aₙ = a + (n − 1)d = ${a} + (${n} − 1) × ${d} = ${term}.`,
      };
    }),
  );
  push(
    numeric(8000, { subject: "mathematics", topic: "logarithms", prefix: "m4-log", tags: ["logarithms"] }, () => {
      const base = [2, 3, 5, 10][ri(rand, 0, 4)];
      const exp = ri(rand, 1, 6);
      const n = Math.pow(base, exp);
      return {
        stem: `What is log${base}(${n})?`,
        correct: exp,
        distractors: [exp + 1, exp - 1, n, base],
        explanation: `${base}^${exp} = ${n}, so log${base}(${n}) = ${exp}.`,
      };
    }),
  );

  /* ---- geometry & mensuration ---- */
  push(
    numeric(9000, { subject: "mathematics", topic: "geometry", prefix: "m4-triangle", tags: ["geometry", "angles"] }, () => {
      const a = ri(rand, 20, 140);
      const b = ri(rand, 20, 140);
      if (a + b >= 170) return null;
      const c = 180 - a - b;
      return {
        stem: `Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`,
        correct: `${c}°`,
        distractors: [`${c + 10}°`, `${180 - a}°`, `${c - 10}°`, `${a + b}°`],
        explanation: `The angles of a triangle sum to 180°, so the third angle = 180 − ${a} − ${b} = ${c}°.`,
      };
    }),
  );
  push(
    numeric(9000, { subject: "mathematics", topic: "mensuration", prefix: "m4-rect", tags: ["area", "perimeter"] }, () => {
      const l = ri(rand, 3, 90);
      const w = ri(rand, 3, 90);
      const area = l * w;
      return {
        stem: `A rectangle is ${l} cm long and ${w} cm wide. What is its area?`,
        correct: `${area} cm²`,
        distractors: [`${2 * (l + w)} cm²`, `${l + w} cm²`, `${area + l} cm²`, `${area - w} cm²`],
        explanation: `Area = length × width = ${l} × ${w} = ${area} cm².`,
      };
    }),
  );
  push(
    numeric(7000, { subject: "mathematics", topic: "mensuration", prefix: "m4-circle", tags: ["circle", "area"] }, () => {
      const r = ri(rand, 1, 50);
      const area = Math.round(3.14159 * r * r * 100) / 100;
      return {
        stem: `What is the area of a circle of radius ${r} cm (use π = 3.14159)?`,
        correct: `${area} cm²`,
        distractors: [`${Math.round(2 * 3.14159 * r * 100) / 100} cm²`, `${Math.round(3.14159 * r * 100) / 100} cm²`, `${area * 2} cm²`, `${r * r} cm²`],
        explanation: `Area = πr² = 3.14159 × ${r}² = ${area} cm².`,
      };
    }),
  );
  push(
    numeric(6000, { subject: "mathematics", topic: "trigonometry", prefix: "m4-trig", tags: ["trigonometry"] }, () => {
      const table: Array<[number, string, string]> = [
        [30, "1/2", "0.5"],
        [45, "1/√2", "0.7071"],
        [60, "√3/2", "0.8660"],
        [90, "1", "1"],
        [0, "0", "0"],
      ];
      const [deg, exact] = table[ri(rand, 0, table.length - 1)];
      return {
        stem: `What is sin ${deg}°?`,
        correct: exact,
        distractors: ["1/2", "√3/2", "1", "0"],
        explanation: `sin ${deg}° = ${exact}.`,
      };
    }),
  );

  /* ---- probability & statistics ---- */
  push(
    numeric(7000, { subject: "mathematics", topic: "probability", prefix: "m4-prob", tags: ["probability"] }, () => {
      const total = ri(rand, 4, 60);
      const favourable = ri(rand, 1, total - 1);
      const g = gcd(favourable, total);
      const correct = `${favourable / g}/${total / g}`;
      return {
        stem: `A bag contains ${total} balls of which ${favourable} are red. What is the probability of drawing a red ball?`,
        correct,
        distractors: [`${total / g}/${favourable / g}`, `${favourable}/${total + 1}`, `1/${total}`, `${favourable}/${total - 1}`],
        explanation: `P(red) = ${favourable}/${total} = ${correct}.`,
      };
    }),
  );
  push(
    numeric(7000, { subject: "mathematics", topic: "statistics-math", prefix: "m4-median", tags: ["statistics", "median"] }, () => {
      const n = ri(rand, 3, 9);
      const nums = Array.from({ length: n }, () => ri(rand, 1, 100)).sort((a, b) => a - b);
      const mid = Math.floor(n / 2);
      const median = n % 2 === 1 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      return {
        stem: `What is the median of the data set ${nums.join(", ")}?`,
        correct: median,
        distractors: [nums[0], nums[n - 1], median + 1, median - 1],
        explanation: `With ${n} values, the median is ${median}.`,
      };
    }),
  );

  return out;
}
