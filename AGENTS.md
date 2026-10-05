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
