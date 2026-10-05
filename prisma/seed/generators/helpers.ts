/**
 * Derived lookups shared by the generators and the seed writer.
 *
 * Everything here is computed from the taxonomy, so exams, subjects and
 * qualification levels stay in sync automatically when the catalogue changes.
 */

import { EDUCATION_LEVELS, SUBJECTS } from "../taxonomy";
import { PAKISTAN_EXAMS } from "../taxonomy-pakistan";

/** subject slug → every exam slug whose blueprint includes that subject. */
export function buildExamSubjectMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const subject of SUBJECTS) map[subject.slug] = [];
  for (const exam of PAKISTAN_EXAMS) {
    for (const subject of exam.subjects) {
      if (map[subject]) map[subject].push(exam.slug);
    }
  }
  return map;
}

/** subject slug → education levels at which the subject is taught. */
export function buildSubjectLevelMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const subject of SUBJECTS) map[subject.slug] = subject.levels;
  return map;
}

/** exam slug → education levels required for that exam. */
export function buildExamLevelMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const exam of PAKISTAN_EXAMS) map[exam.slug] = exam.educationLevels;
  return map;
}

/** subject slug → topic slugs. */
export function buildSubjectTopicMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const subject of SUBJECTS) map[subject.slug] = subject.topics.map((t) => t.slug);
  return map;
}

/**
 * Qualification levels for a question: the levels at which its subject is
 * taught, intersected with the levels of the exams it belongs to. Falling back
 * to the subject levels keeps every question tagged when a subject has no exam.
 */
export function qualifyLevels(
  subject: string,
  examSlugs: string[],
  subjectLevels: Record<string, string[]>,
  examLevels: Record<string, string[]>,
): string[] {
  const subjectSet = subjectLevels[subject] ?? EDUCATION_LEVELS.map((l) => l.slug);
  const allowed = new Set<string>();
  for (const exam of examSlugs) for (const l of examLevels[exam] ?? []) allowed.add(l);
  const overlap = subjectSet.filter((l) => allowed.has(l));
  if (overlap.length > 0) return overlap;
  return subjectSet;
}

/** Order education-level slugs from lowest to highest. */
export const LEVEL_RANK: Record<string, number> = Object.fromEntries(
  EDUCATION_LEVELS.map((l) => [l.slug, l.rank]),
);

export function lowestLevel(levels: string[]): string {
  return [...levels].sort((a, b) => (LEVEL_RANK[a] ?? 0) - (LEVEL_RANK[b] ?? 0))[0] ?? "matric";
}

/** Pick the exam most representative of a subject for stable STATIC ordering. */
export function primaryExamFor(examSlugs: string[]): string {
  return examSlugs[0] ?? "general-knowledge";
}

/**
 * Canonical topic slugs.
 *
 * `Topic.slug` is globally unique in the schema, but several concepts (physics,
 * biology, economy, …) legitimately appear as a topic under more than one
 * subject. The first subject to claim a slug owns it; later subjects get a
 * namespaced slug (`general-science-units-measurements`). This keeps every
 * subject → topic relationship intact without slug collisions.
 */
export function buildTopicCanonicalMap(): Map<string, string> {
  const claimed = new Set<string>();
  const map = new Map<string, string>();
  for (const subject of SUBJECTS) {
    for (const topic of subject.topics) {
      const key = `${subject.slug}|${topic.slug}`;
      if (claimed.has(topic.slug)) {
        map.set(key, `${subject.slug}-${topic.slug}`);
      } else {
        claimed.add(topic.slug);
        map.set(key, topic.slug);
      }
    }
  }
  return map;
}

/** Canonical slug for a (subject, topic) pair, or null when it does not exist. */
export function canonicalTopicSlug(
  map: Map<string, string>,
  subject: string,
  topic: string,
): string | null {
  return map.get(`${subject}|${topic}`) ?? null;
}

/**
 * Education levels a difficulty band belongs to. Used to narrow a question's
 * levels inside its subject's levels, so an easy English item does not surface
 * in a post-graduate pool.
 */
const DIFFICULTY_LEVELS: Record<string, string[]> = {
  EASY: ["primary", "middle", "matric", "intermediate"],
  MEDIUM: ["matric", "intermediate", "graduation"],
  HARD: ["intermediate", "graduation", "post-graduation", "doctorate"],
};

/** Hard cap on exam links per question to keep the join table scalable. */
export const MAX_EXAMS_PER_QUESTION = 60;

export interface Placement {
  levels: string[];
  exams: string[];
}

/**
 * Resolve a question's qualification levels and the exams it belongs to.
 *
 * Levels are the levels at which the subject is taught, narrowed by the
 * difficulty band. Exams are then the exams that both include the subject and
 * share one of those levels — so a question can never be linked to an exam
 * whose qualification it does not match, and the fan-out stays bounded.
 */
export function resolvePlacement(
  subject: string,
  difficulty: string | undefined,
  examSubjectMap: Record<string, string[]>,
  subjectLevels: Record<string, string[]>,
  examLevels: Record<string, string[]>,
): Placement {
  const base = subjectLevels[subject] ?? [];
  const band = DIFFICULTY_LEVELS[difficulty ?? "MEDIUM"] ?? [];
  let levels = base.filter((l) => band.includes(l));
  if (levels.length === 0) levels = base;

  const candidates = examSubjectMap[subject] ?? [];
  let exams = candidates.filter((exam) =>
    (examLevels[exam] ?? []).some((l) => levels.includes(l)),
  );
  if (exams.length === 0) {
    // The subject's exams sit at a different level than the difficulty band
    // (e.g. an easy item in a subject whose only exam is a master's programme).
    // Keep the exam links, but widen the levels to the exams' levels so the
    // question never claims a qualification its exams do not share.
    exams = candidates;
    const examLevelSet = new Set<string>();
    for (const exam of exams) for (const l of examLevels[exam] ?? []) examLevelSet.add(l);
    const withinSubject = [...examLevelSet].filter((l) => base.length === 0 || base.includes(l));
    const widened = new Set([...levels, ...withinSubject, ...(withinSubject.length ? [] : examLevelSet)]);
    levels = [...widened];
  }
  if (exams.length > MAX_EXAMS_PER_QUESTION) exams = exams.slice(0, MAX_EXAMS_PER_QUESTION);
  return { levels, exams };
}
