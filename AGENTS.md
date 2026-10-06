# AGENTS.md

Repository-specific notes for agents working in this codebase.

## Commands

```bash
npm install                # also runs `prisma generate` via postinstall
npm run db:migrate         # apply/create migrations (needs DATABASE_URL)
npm run db:seed            # seed taxonomy + 11k+ questions (idempotent unless SEED_FORCE=1)
npm run typecheck          # tsc --noEmit
npm test                   # vitest, integration tests against real PostgreSQL
npm run build              # prisma generate && prisma migrate deploy && next build
```

- `SEED_FORCE=1 npm run db:seed` wipes existing questions and reseeds. Without it
  the seed skips the (slow) question insert when questions already exist.
- Tests are integration tests against a **real PostgreSQL database** (no mocks).
  They create `vitest-` prefixed fixtures and clean up after themselves, so they
  do not depend on seeded content — but migrations must be applied first. Set
  `TEST_DATABASE_URL` to point at a disposable database.

## Architecture

- Questions are **never hard-coded per exam**. Every question carries metadata and
  the reusable `QuestionSelectionService` (`src/services/`) resolves an exam's
  configured syllabus into a filtered pool. PST, CSS and future exams share it.
- Question banks live in `prisma/seed/generators/`. Generators expand templates
  into thousands of deterministic, answer-checked items. Curated hand-authored
  items live in `prisma/seed/generators/curated.ts` and flow through the same
  engine.
- The taxonomy has three optional layers: subject → sub-subject → topic. The
  sub-subject grouping is data-only in `prisma/seed/taxonomy/sub-subjects.ts`;
  `subjects.ts` reparents the listed topics at module load. A topic with no
  sub-subject stays directly under its subject.
- The engine applies an **exam qualification gate**: a question must share an
  education level with the exam (`ExamEducationLevel`) or it is excluded, so an
  exam can never surface material pitched at another stage. The generator's
  `resolvePlacement()` aligns each question's levels with its linked exams.
- Admin duplicate detection (`findDuplicateQuestions`) groups by normalised stem
  **in PostgreSQL**, not in a fixed application-side window, so it stays correct
  as the bank grows past hundreds of thousands of rows.
- Exam/quiz mode (`STATIC` vs `RANDOM`) is configuration, not frontend logic.
  It is stored on `ExamConfiguration.mode`.

## Gotchas

- Every generator question's `subject`/`topic` pair must exist in
  `prisma/seed/taxonomy.ts`, and every `exam.subjects` slug in
  `prisma/seed/taxonomy-pakistan.ts` must be a real subject slug — otherwise the
  seed inserts questions that no exam can ever surface.
- `Topic.slug` and `SubSubject.slug` are globally unique in the schema, so a
  topic slug (e.g. `economy`) cannot appear under two subjects. Namespace slugs
  when the same concept belongs to multiple subjects.
- When merging taxonomy changes, prefer the local hand-tuned exam definitions
  (config mode, subject mappings) over imported ones, and append only genuinely
  new exams.
- The seed de-duplicates globally on `contentHash` (stem + options + correct).
  Reusing the same fact bank for two topics therefore drops the second copy
  entirely, leaving that topic empty. Give each topic its own distinct facts.
- `SEED_SUBJECT_CAP` is unset by default so the full generated bank ships; set it
  (e.g. `SEED_SUBJECT_CAP=5000`) to trim a subject that would otherwise dominate
  when seeding a small environment.
