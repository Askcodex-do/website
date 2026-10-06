import { buildOptions, difficultyFor, makeRandom } from "./core";
import type { GeneratorContext, SeedQuestion } from "./core";
import { SCALE } from "../config";

/**
 * Mathematics generator.
 *
 * Every question is produced from a parameterised template whose answer is
 * computed, never invented, so all generated items are mathematically correct.
 * A `seen` set keyed on the stem prevents duplicates within the batch.
 */
export function generateMathQuestions(ctx: GeneratorContext): SeedQuestion[] {
  const { rand, pick } = makeRandom("math-v3");
  const out: SeedQuestion[] = [];
  const seen = new Set<string>();

  const add = (
    partial: Omit<SeedQuestion, "subject" | "exams" | "educationLevels" | "status">,
  ) => {
    const key = partial.stem.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      ...partial,
      subject: "mathematics",
      exams: ctx.exams,
      educationLevels: ctx.educationLevels,
      status: "PUBLISHED",
    });
  };

  /** Emit `count` distinct items via a template that returns null when it draws a repeat. */
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
    } | null,
  ) {
    let made = 0;
    for (let attempt = 0; attempt < count * 6 && made < count; attempt++) {
      const spec = build(attempt);
      if (!spec) continue;
      const key = spec.stem.trim().toLowerCase();
      if (seen.has(key)) continue;
      const { options, correct } = buildOptions(spec.correct, spec.distractors, rand);
      add({
        slug: spec.slug,
        stem: spec.stem,
        options,
        correct,
        explanation: spec.explanation,
        difficulty: difficultyFor(made, count),
        topic,
        tags,
        staticOrder: staticBase + made,
      });
      made++;
    }
  }

  emit(SCALE.math.addition, "arithmetic", ["addition", "arithmetic"], 1000, (i) => {
    const a = 15 + Math.floor(rand() * 900);
    const b = 7 + Math.floor(rand() * 500);
    const correct = a + b;
    return {
      slug: `math-add-${i}`,
      stem: `What is the sum of ${a} and ${b}?`,
      correct,
      distractors: [correct - 10, correct + 1, correct - 1],
      explanation: `${a} + ${b} = ${correct}.`,
    };
  });

  emit(SCALE.math.subtraction, "arithmetic", ["subtraction", "arithmetic"], 2500, (i) => {
    const a = 120 + Math.floor(rand() * 1800);
    const b = 20 + Math.floor(rand() * 119);
    const correct = a - b;
    return {
      slug: `math-subtract-${i}`,
      stem: `What is ${a} − ${b}?`,
      correct,
      distractors: [correct + 10, correct - 1, correct + 1],
      explanation: `${a} − ${b} = ${correct}.`,
    };
  });

  emit(SCALE.math.multiplication, "arithmetic", ["multiplication", "arithmetic"], 4000, (i) => {
    const a = 6 + Math.floor(rand() * 40);
    const b = 6 + Math.floor(rand() * 30);
    const correct = a * b;
    return {
      slug: `math-multiply-${i}`,
      stem: `What is ${a} × ${b}?`,
      correct,
      distractors: [correct + a, correct - b, correct + 10],
      explanation: `${a} × ${b} = ${correct}.`,
    };
  });

  emit(SCALE.math.division, "arithmetic", ["division", "arithmetic"], 5500, (i) => {
    const b = 3 + Math.floor(rand() * 25);
    const q = 4 + Math.floor(rand() * 40);
    const a = b * q;
    return {
      slug: `math-divide-${i}`,
      stem: `What is ${a} ÷ ${b}?`,
      correct: q,
      distractors: [q + 1, q - 1, q + 2],
      explanation: `${a} ÷ ${b} = ${q}.`,
    };
  });

  // Percentages — deterministic grid over value × base.
  {
    let idx = 0;
    const percentValues = [5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75];
    const percentBases = [
      40, 60, 80, 100, 120, 150, 200, 240, 300, 400, 500, 600, 800, 1000,
    ];
    for (const p of percentValues) {
      for (const base of percentBases) {
        const correct = (p / 100) * base;
        const { options, correct: ci } = buildOptions(
          correct,
          [correct + base / 10, correct - base / 20, correct * 1.5],
          rand,
        );
        add({
          slug: `math-percent-${p}-of-${base}`,
          stem: `What is ${p}% of ${base}?`,
          options,
          correct: ci,
          explanation: `${p}% of ${base} = (${p} ÷ 100) × ${base} = ${correct}.`,
          difficulty: difficultyFor(idx, 154),
          topic: "percentages",
          tags: ["percentage", "ratio"],
          staticOrder: 6500 + idx,
        });
        idx++;
      }
    }
  }

  emit(SCALE.math.average, "averages", ["average", "mean"], 7000, (i) => {
    const n = 3 + Math.floor(rand() * 4);
    const nums = Array.from({ length: n }, () => 5 + Math.floor(rand() * 120));
    const sum = nums.reduce((s, v) => s + v, 0);
    const correct = Math.round((sum / n) * 100) / 100;
    return {
      slug: `math-average-${i}`,
      stem: `What is the average of ${nums.join(", ")}?`,
      correct,
      distractors: [
        correct + 2,
        correct - 3,
        Math.round((sum / (n + 1)) * 100) / 100,
      ],
      explanation: `Sum = ${sum}; average = ${sum} ÷ ${n} = ${correct}.`,
    };
  });

  emit(SCALE.math.algebra, "algebra", ["algebra", "equations"], 7600, (i) => {
    const a = 2 + Math.floor(rand() * 12);
    const x = 2 + Math.floor(rand() * 30);
    const b = 1 + Math.floor(rand() * 40);
    const c = a * x + b;
    return {
      slug: `math-algebra-${i}`,
      stem: `If ${a}x + ${b} = ${c}, what is the value of x?`,
      correct: x,
      distractors: [x + 1, x - 1, x + 2],
      explanation: `${a}x = ${c} − ${b} = ${c - b}; x = ${c - b} ÷ ${a} = ${x}.`,
    };
  });

  emit(SCALE.math.rectangleArea, "geometry", ["geometry", "area"], 8600, (i) => {
    const l = 4 + Math.floor(rand() * 40);
    const w = 3 + Math.floor(rand() * 30);
    const area = l * w;
    return {
      slug: `math-rect-area-${i}`,
      stem: `A rectangle has a length of ${l} cm and a width of ${w} cm. What is its area?`,
      correct: area,
      distractors: [2 * (l + w), area + l, area - w],
      explanation: `Area = length × width = ${l} × ${w} = ${area} cm².`,
    };
  });

  emit(SCALE.math.triangleAngle, "geometry", ["geometry", "triangle"], 9200, (i) => {
    const a = 20 + Math.floor(rand() * 100);
    const b = 20 + Math.floor(rand() * Math.max(1, 150 - a));
    const correct = 180 - a - b;
    return {
      slug: `math-triangle-angle-${i}`,
      stem: `Two angles of a triangle measure ${a}° and ${b}°. What is the third angle?`,
      correct,
      distractors: [correct + 10, correct - 10, Math.max(1, 180 - a)],
      explanation: `The angles of a triangle sum to 180°. Third angle = 180 − ${a} − ${b} = ${correct}°.`,
    };
  });

  // Speed × time (grid).
  {
    let idx = 0;
    const speeds = [20, 30, 40, 45, 50, 60, 72, 80, 90, 100];
    const hoursList = [1, 2, 3, 4, 5, 6];
    for (const speed of speeds) {
      for (const hours of hoursList) {
        const distance = speed * hours;
        const { options, correct } = buildOptions(
          distance,
          [distance + speed, distance - hours, speed + hours],
          rand,
        );
        add({
          slug: `math-speed-${speed}-${hours}`,
          stem: `A car travels at ${speed} km/h for ${hours} hours. How far does it travel?`,
          options,
          correct,
          explanation: `Distance = speed × time = ${speed} × ${hours} = ${distance} km.`,
          difficulty: difficultyFor(idx, 60),
          topic: "arithmetic",
          tags: ["word-problem", "speed"],
          staticOrder: 9600 + idx,
        });
        idx++;
      }
    }
  }

  emit(SCALE.math.ratio, "percentages", ["ratio", "proportion"], 9700, (i) => {
    const unit = 2 + Math.floor(rand() * 20);
    const ratioA = 2 + Math.floor(rand() * 6);
    const ratioB = ratioA + 1 + Math.floor(rand() * 5);
    const total = unit * (ratioA + ratioB);
    const correct = unit * ratioA;
    return {
      slug: `math-ratio-${i}`,
      stem: `An amount of ${total} is divided between two people in the ratio ${ratioA}:${ratioB}. What is the smaller share?`,
      correct,
      distractors: [unit * ratioB, correct + unit, correct - unit],
      explanation: `Total parts = ${ratioA} + ${ratioB} = ${ratioA + ratioB}; one part = ${total} ÷ ${ratioA + ratioB} = ${unit}; smaller share = ${unit} × ${ratioA} = ${correct}.`,
    };
  });

  emit(
    SCALE.math.simpleInterest,
    "arithmetic",
    ["simple-interest", "word-problem"],
    10300,
    (i) => {
      const principal = pick([1000, 2000, 2500, 4000, 5000, 8000, 10000]);
      const rate = pick([4, 5, 6, 8, 10, 12, 15]);
      const years = pick([1, 2, 3, 4, 5]);
      const interest = (principal * rate * years) / 100;
      return {
        slug: `math-simple-interest-${i}`,
        stem: `Find the simple interest on ${principal} at ${rate}% per annum for ${years} year(s).`,
        correct: interest,
        distractors: [
          interest + principal * 0.01,
          interest * 2,
          interest / 2,
        ],
        explanation: `Simple interest = (P × R × T) ÷ 100 = (${principal} × ${rate} × ${years}) ÷ 100 = ${interest}.`,
      };
    },
  );

  emit(SCALE.math.hcf, "arithmetic", ["hcf", "number-theory"], 10800, (i) => {
    const g = 3 + Math.floor(rand() * 15);
    const m = 2 + Math.floor(rand() * 8);
    const n = m + 1 + Math.floor(rand() * 6);
    const a = g * m;
    const b = g * n;
    return {
      slug: `math-hcf-${i}`,
      stem: `What is the highest common factor (HCF) of ${a} and ${b}?`,
      correct: g,
      distractors: [g * 2, Math.min(a, b), 1],
      explanation: `${a} = ${g} × ${m} and ${b} = ${g} × ${n}; the highest common factor is ${g}.`,
    };
  });

  emit(SCALE.math.squareRoot, "algebra", ["square-root", "arithmetic"], 11200, (i) => {
    const n = 4 + Math.floor(rand() * 60);
    const correct = n;
    return {
      slug: `math-sqrt-${i}`,
      stem: `What is the square root of ${n * n}?`,
      correct,
      distractors: [correct + 1, correct - 1, correct * 2],
      explanation: `${n} × ${n} = ${n * n}, so √${n * n} = ${n}.`,
    };
  });

  emit(
    SCALE.math.fractionToPercent,
    "percentages",
    ["fractions", "percentage"],
    11800,
    (i) => {
      const numerator = 1 + Math.floor(rand() * 9);
      const denominator = numerator + 1 + Math.floor(rand() * 11);
      const correct = Math.round((numerator / denominator) * 10000) / 100;
      return {
        slug: `math-fraction-percent-${i}`,
        stem: `Express the fraction ${numerator}/${denominator} as a percentage (rounded to 2 decimal places).`,
        correct: `${correct}%`,
        distractors: [`${correct + 1}%`, `${Math.round((numerator / denominator) * 1000) / 10}%`, `${correct - 1}%`],
        explanation: `${numerator}/${denominator} = ${(numerator / denominator).toFixed(4)} = ${correct}%.`,
      };
    },
  );

  return out;
}
