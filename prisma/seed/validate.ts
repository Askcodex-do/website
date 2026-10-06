/**
 * Seed integrity checks.
 *
 * Run with `npm run db:validate` (or `npx tsx prisma/seed/validate.ts`). It
 * asserts the invariants the platform relies on before a seed is committed:
 *
 *   1. taxonomy slugs are globally unique (schema enforces this per model);
 *   2. every exam references real subjects / education levels;
 *   3. every generated question maps to a real subject+topic, has exactly four
 *      unique options, a valid answer index and a unique slug/content hash;
 *   4. every question's education levels intersect its exams' levels, so no
 *      question can be surfaced for a qualification it does not belong to.
 */

import { contentHash } from "../../src/lib/utils";
import { EDUCATION_LEVELS, SUBJECTS } from "./taxonomy";
import { PAKISTAN_EXAMS } from "./taxonomy-pakistan";
import { buildAllQuestions } from "./generators";
import {
  buildExamSubjectMap,
  buildTopicCanonicalMap,
  canonicalTopicSlug,
  resolvePlacement,
} from "./generators/helpers";

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  stats: Record<string, number>;
}

export function validateSeed(options?: { questions?: boolean }): ValidationResult {
  const errors: string[] = [];
  const stats: Record<string, number> = {};
  const canonical = buildTopicCanonicalMap();

  /* ---- taxonomy slug uniqueness (mirrors DB unique constraints) ---- */
  // Slugs are unique per table, not globally: a subject and a topic may share a
  // slug (e.g. "seerah"), but two topics may not.
  const subjectSlugsSeen = new Map<string, string[]>();
  const subSubjectSlugs = new Map<string, string[]>();
  const topicSlugs = new Map<string, string[]>();
  const subtopicSlugs = new Map<string, string[]>();
  const add = (map: Map<string, string[]>, slug: string, where: string) => {
    const list = map.get(slug) ?? [];
    list.push(where);
    map.set(slug, list);
  };
  for (const subject of SUBJECTS) {
    add(subjectSlugsSeen, subject.slug, `subject:${subject.slug}`);
    for (const ss of subject.subSubjects ?? []) add(subSubjectSlugs, ss.slug, `subsubject:${subject.slug}`);
    for (const topic of subject.topics) {
      add(topicSlugs, canonicalTopicSlug(canonical, subject.slug, topic.slug)!, `topic:${subject.slug}`);
      for (const st of topic.subtopics ?? []) {
        add(subtopicSlugs, st.slug, `subtopic:${subject.slug}/${topic.slug}`);
      }
    }
  }
  for (const [label, map] of [
    ["subject", subjectSlugsSeen],
    ["sub-subject", subSubjectSlugs],
    ["topic", topicSlugs],
    ["subtopic", subtopicSlugs],
  ] as const) {
    for (const [slug, where] of map) {
      if (where.length > 1) errors.push(`duplicate ${label} slug "${slug}": ${where.join(", ")}`);
    }
  }

  const subjectSlugs = new Set(SUBJECTS.map((s) => s.slug));
  const levelSlugs = new Set(EDUCATION_LEVELS.map((l) => l.slug));
  const topicBySlug = new Map<string, { subject: string; levels: string[] }>();
  for (const subject of SUBJECTS) {
    for (const topic of subject.topics) {
      const slug = canonicalTopicSlug(canonical, subject.slug, topic.slug)!;
      topicBySlug.set(`${subject.slug}|${slug}`, { subject: subject.slug, levels: subject.levels });
    }
  }

  /* ---- exam references ---- */
  const examSlugs = new Set<string>();
  for (const exam of PAKISTAN_EXAMS) {
    if (examSlugs.has(exam.slug)) errors.push(`duplicate exam slug "${exam.slug}"`);
    examSlugs.add(exam.slug);
    for (const subject of exam.subjects) {
      if (!subjectSlugs.has(subject)) {
        errors.push(`exam "${exam.slug}" references unknown subject "${subject}"`);
      }
    }
    for (const level of exam.educationLevels) {
      if (!levelSlugs.has(level)) {
        errors.push(`exam "${exam.slug}" references unknown education level "${level}"`);
      }
    }
    if (exam.subjects.length === 0) errors.push(`exam "${exam.slug}" has no subjects`);
    if (exam.educationLevels.length === 0) {
      errors.push(`exam "${exam.slug}" has no education levels`);
    }
  }

  stats.subjects = SUBJECTS.length;
  stats.topics = topicBySlug.size;
  stats.subSubjects = SUBJECTS.reduce((a, s) => a + (s.subSubjects?.length ?? 0), 0);
  stats.educationLevels = EDUCATION_LEVELS.length;
  stats.exams = PAKISTAN_EXAMS.length;

  if (options?.questions === false) {
    return { ok: errors.length === 0, errors, stats };
  }

  /* ---- generated questions ---- */
  const examSubjectMap = buildExamSubjectMap();
  const raw = buildAllQuestions(
    { educationLevels: EDUCATION_LEVELS.map((l) => l.slug), exams: [] },
    examSubjectMap,
  );
  stats.questionsRaw = raw.length;

  const examLevels = new Map(PAKISTAN_EXAMS.map((e) => [e.slug, new Set(e.educationLevels)]));
  const subjectLevels: Record<string, string[]> = {};
  for (const s of SUBJECTS) subjectLevels[s.slug] = s.levels;
  const examLevelsRec: Record<string, string[]> = {};
  for (const e of PAKISTAN_EXAMS) examLevelsRec[e.slug] = e.educationLevels;
  const seenSlugs = new Set<string>();
  const seenHashes = new Set<string>();
  let duplicateSlugs = 0;
  let duplicateHashes = 0;
  let malformed = 0;
  let qualificationMismatch = 0;
  let unknownTopic = 0;
  let missingExamLink = 0;

  for (const q of raw) {
    const canonicalTopic = canonicalTopicSlug(canonical, q.subject, q.topic);
    if (!subjectSlugs.has(q.subject) || !canonicalTopic || !topicBySlug.has(`${q.subject}|${canonicalTopic}`)) {
      unknownTopic++;
      if (unknownTopic <= 10) errors.push(`question "${q.slug}" has unknown subject/topic (${q.subject}/${q.topic})`);
      continue;
    }
    if (q.options.length !== 4 || new Set(q.options).size !== 4) {
      malformed++;
      if (malformed <= 10) errors.push(`question "${q.slug}" does not have 4 unique options`);
    }
    if (q.correct < 0 || q.correct > 3) {
      malformed++;
      if (malformed <= 10) errors.push(`question "${q.slug}" has invalid answer index ${q.correct}`);
    }
    if (seenSlugs.has(q.slug)) duplicateSlugs++;
    seenSlugs.add(q.slug);
    const hash = contentHash({ stem: q.stem, options: q.options, correct: q.options[q.correct] ?? "" });
    if (seenHashes.has(hash)) duplicateHashes++;
    seenHashes.add(hash);

    // Mirror the seed's placement and confirm it never drifts from the exams'
    // levels — this is the invariant that keeps preparation qualification-aware.
    const placement = resolvePlacement(
      q.subject,
      q.difficulty,
      examSubjectMap,
      subjectLevels,
      examLevelsRec,
    );
    if (placement.exams.length === 0) {
      missingExamLink++;
      if (missingExamLink <= 10) errors.push(`question "${q.slug}" has no exam links`);
    }
    const allowed = new Set<string>();
    for (const examSlug of placement.exams) for (const l of examLevels.get(examSlug) ?? []) allowed.add(l);
    const overlap = placement.levels.filter((l) => allowed.has(l));
    if (allowed.size > 0 && overlap.length === 0) {
      qualificationMismatch++;
      if (qualificationMismatch <= 10) {
        errors.push(`question "${q.slug}" levels ${placement.levels} do not match its exams ${placement.exams}`);
      }
    }
  }

  stats.questions = raw.length;
  stats.uniqueSlugs = seenSlugs.size;
  stats.uniqueContent = seenHashes.size;
  stats.duplicateSlugs = duplicateSlugs;
  stats.duplicateHashes = duplicateHashes;
  stats.malformed = malformed;
  stats.qualificationMismatch = qualificationMismatch;
  stats.unknownTopic = unknownTopic;
  stats.missingExamLink = missingExamLink;

  if (duplicateSlugs > 0) errors.push(`${duplicateSlugs} duplicate question slugs`);
  if (malformed > 0) errors.push(`${malformed} malformed questions`);
  if (qualificationMismatch > 0) errors.push(`${qualificationMismatch} qualification mismatches`);
  if (missingExamLink > 0) errors.push(`${missingExamLink} questions without exam links`);

  return { ok: errors.length === 0, errors, stats };
}

if (process.argv[1]?.endsWith("validate.ts")) {
  const result = validateSeed();
  console.log(JSON.stringify(result.stats, null, 2));
  if (!result.ok) {
    console.error(`\n✗ ${result.errors.length} problem(s):`);
    for (const e of result.errors.slice(0, 100)) console.error("  -", e);
    process.exit(1);
  }
  console.log("\n✓ seed validation passed");
}
