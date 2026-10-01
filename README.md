# MCQ Prep Platform

A production-ready, SEO-first web platform for MCQ (multiple-choice question)
preparation for jobs, admissions, competitive examinations and educational tests.

Questions are not hard-coded per exam. Every question carries metadata, and a
reusable **Question Selection Engine** turns an exam's configured syllabus into a
filtered question pool. Adding a new exam is a data/configuration change, not a
code change.

- **Stack:** Next.js 15 (App Router) + TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Scale:** ships with 10,000+ seeded questions and is designed for hundreds of thousands
- **No separate per-exam code:** PST, CSS, JEST and future exams share one architecture

---

## Table of contents

- [How it works](#how-it-works)
- [Feature overview](#feature-overview)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Database, migrations and seed](#database-migrations-and-seed)
- [Question Selection Engine](#question-selection-engine)
- [Admin panel](#admin-panel)
- [Bulk import](#bulk-import)
- [SEO](#seo)
- [Testing](#testing)
- [Production build](#production-build)
- [Deployment](#deployment)
- [Security](#security)
- [Extending the platform](#extending-the-platform)

---

## How it works

```
                 DATABASE
                    ↓
          Question metadata (subject, topic, exam,
          education level, difficulty, province, year, tags)
                    ↓
          Question Selection Engine  (src/services/question-selection.ts)
                    ↓
          Exam configuration / syllabus (exam_configurations + exam_subjects)
                    ↓
          Filters + rules  (education level, difficulty, exclusions)
                    ↓
          STATIC or RANDOM mode
                    ↓
          MCQ pages / Quiz pages / Search / Dashboard / public API
```

A user selecting **PST** loads the PST configuration, resolves its education
levels, subjects and topics, queries matching questions and returns them in the
exam's deterministic static order. Selecting **English Grammar** resolves the same
way but randomises the pool. Both paths run through one engine — the UI never
special-cases an exam.

---

## Feature overview

- **Metadata-driven question bank** with subjects, topics, exams, education
  levels, difficulty, province, year and tags.
- **Question Selection Engine** supporting exam, subject, topic, education level,
  difficulty, province, year, limit, mode (static/random) and exclusions.
- **Static and random display modes**, configured per exam in the database.
- **Individual MCQ pages** with like, bookmark, share (WhatsApp/Facebook/X/
  LinkedIn/native), report, copy link and next question. The correct answer is
  never sent to the browser before the user answers.
- **Quiz engine** with configurable count, time limit, mode, negative marking and
  server-side scoring. Attempts are stored and reviewable.
- **Guest support** for browsing, search, answering and quizzes (session-scoped),
  with login only required for persistent data.
- **Authentication**: registration, login, logout, forgot/reset password, email
  verification, DB-backed sessions, bcrypt hashing and role-based access control.
- **User dashboard**: totals, accuracy, subject/exam performance and recent activity.
- **Admin panel**: question CRUD, publish/archive, taxonomy, users, reports,
  contact messages, settings (identity, social, features, SEO) and bulk import.
- **Bulk CSV/Excel import** with validation, duplicate detection and error reporting.
- **Search** across questions, exams, subjects and topics.
- **Automatic SEO**: titles, descriptions, canonicals, Open Graph, Twitter cards,
  JSON-LD structured data, breadcrumbs, sitemap index, robots.txt and slugs.
- **Responsive** from 320px phones to large TVs; accessible, semantic markup.

---

## Project structure

```
prisma/
  schema.prisma              # Data model + indexes
  migrations/                # SQL migrations
  seed.ts                    # Seed entry point
  seed/taxonomy.ts           # Exams, subjects, topics, education levels (the blueprint)
  seed/config.ts             # Seed scale configuration
  seed/generators/           # Parameterised question generators
src/
  app/                       # App Router routes (pages + API route handlers)
  components/                # UI, admin, dashboard, mcq, quiz, layout components
  content/                   # Static legal/FAQ copy
  lib/                       # env, db, auth, api helpers, rate limiting, SEO, audit
  services/                  # Business logic: selection engine, quiz, search, admin, import
  types/                     # Shared types
tests/                       # Vitest unit + integration tests
```

---

## Getting started

### Prerequisites

- Node.js >= 20.9
- PostgreSQL >= 14

### 1. Install dependencies

```bash
npm install
```

`postinstall` runs `prisma generate`.

### 2. Configure environment

```bash
cp .env.example .env
# edit .env and set DATABASE_URL and a strong AUTH_SECRET
```

Generate a secret:

```bash
openssl rand -base64 48
```

### 3. Create the database

```bash
createdb mcq_exam          # or create it in your Postgres client
npm run db:migrate         # apply migrations (dev)
npm run db:seed            # generate 10,000+ questions
```

### 4. Run

```bash
npm run dev                # http://localhost:3000
```

The seed prints the admin account email when it finishes. The default admin
credentials are `admin@example.com` / `Admin@12345`; override them with
`SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before seeding in production, and
change the password immediately after first login.

---

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `AUTH_SECRET` | yes | >= 32 char secret for signing sessions |
| `SESSION_MAX_AGE` | no | Session lifetime in seconds (default 30 days) |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical site origin used for SEO |
| `NEXT_PUBLIC_SITE_NAME` | no | Site name used in titles and emails |
| `NEXT_PUBLIC_SITE_TAGLINE` | no | Default meta description |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | no | Enables real email delivery; when unset, mail is logged to the console |
| `RATE_LIMIT_CONTACT_PER_HOUR` | no | Contact form rate limit |
| `TEST_DATABASE_URL` | no | Separate database for tests (falls back to `DATABASE_URL`) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | no | Override the seeded admin account (default `admin@example.com` / `Admin@12345`) |

Never commit `.env`. Only `.env.example` is tracked.

---

## Database, migrations and seed

```bash
npm run db:migrate     # create/apply migrations in development
npm run db:deploy      # apply migrations in production/CI
npm run db:seed        # seed (skips if questions already exist)
SEED_FORCE=1 npm run db:seed   # wipe and re-seed
npm run db:studio      # browse the database
npm run db:reset       # drop, migrate and re-seed
```

The seed generates questions from parameterised templates in
`prisma/seed/generators/`, then links every question to the exams, subjects,
topics and education levels defined in `prisma/seed/taxonomy.ts`. A fresh seed
produces roughly:

- 13 exams, 10 subjects, 43 topics, 6 education levels
- 11,000+ questions and 44,000+ options
- 50,000+ question-to-exam links

Key indexes cover exam, subject, topic, education level, difficulty, status and
slug, so the engine stays fast as the bank grows.

---

## Question Selection Engine

`src/services/question-selection.ts` is the single source of truth for choosing
questions. It is used by MCQ pages, quiz pages, search and the dashboard.

```ts
import { getQuestions } from "@/services/question-selection";

// PST uses its configured static order.
await getQuestions({ exam: "pst", mode: "static", limit: 20 });

// English Grammar draws randomly from its pool.
await getQuestions({ subject: "english-grammar", mode: "random", limit: 20 });
```

Supported filters: `exam`, `subject`, `topic`, `educationLevel`, `difficulty`,
`province`, `year`, `excludeIds`, `limit`, `mode`.

When an exam is selected, the engine intersects the requested filters with the
exam's configured subjects and education levels, so an exam can never surface an
unrelated question. Unknown exams resolve to an empty pool rather than leaking
the whole bank.

---

## Admin panel

Sign in with an admin account and open `/admin`.

- **Overview** — counts and recent activity
- **Questions** — search, filter, paginate, create, edit, publish, archive
- **Bulk import** — CSV/Excel upload with validation and preview
- **Taxonomy** — exams, subjects, topics, education levels and their question counts
- **Users** — search, change role and status
- **Reports** — review reported questions
- **Messages** — contact form submissions
- **Settings** — site identity, social links, feature flags, SEO defaults

All admin routes and APIs are protected by role-based checks and record audit log
entries for important actions.

---

## Bulk import

Upload a CSV or Excel file from `/admin/import`. Columns:

```
question, option_a, option_b, option_c, option_d, correct_answer, explanation,
subject, topic, exam, education_level, difficulty, year, source, tags
```

- `correct_answer` accepts `A`–`D` or `1`–`4`.
- `exam` and `education_level` accept multiple values separated by `|`.
- `subject` and `topic` must match existing names or slugs.
- Rows are validated first: missing fields, invalid answers, duplicate options,
  in-file duplicates and existing duplicates are all reported. Only valid,
  non-duplicate rows are inserted.

---

## SEO

Every public page generates its metadata from database content via
`src/lib/seo/metadata.ts`:

- SEO title, meta description and canonical URL
- Open Graph and Twitter card tags
- JSON-LD structured data (`Organization`, `WebSite`, `Question`, `ItemList`,
  `FAQPage`, `BreadcrumbList`)
- Breadcrumbs and a correct heading hierarchy
- SEO-friendly slugs (`/exams/pst`, `/mcqs/english/what-is-a-noun`)

`/sitemap.xml` is a sitemap index pointing at chunked child sitemaps, and
`/robots.txt` allows public content while blocking private and filtered URLs.
See [docs/seo.md](docs/seo.md) for Search Console / Bing setup.

---

## Testing

```bash
npm test           # run once
npm run test:watch # watch mode
```

Integration tests run against a real PostgreSQL database (never mocks). Point
`TEST_DATABASE_URL` at a disposable database; it falls back to `DATABASE_URL`.
The suite covers authentication, question filtering, PST/CSS selection,
education filtering, static/random modes, quiz scoring, negative marking, quiz
history, bookmarks, likes, admin permissions, bulk import, search, SEO metadata
and the sitemap.

```bash
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

---

## Production build

```bash
npm ci
npm run db:deploy
npm run build
npm start
```

---

## Deployment

See [docs/deployment.md](docs/deployment.md) for a step-by-step guide (managed
Postgres, environment setup, migrations, caching/CDN and health checks).

---

## Security

- Passwords hashed with bcrypt; plaintext is never stored.
- Database-backed sessions in httpOnly, SameSite cookies.
- Role-based authorisation on every admin route and API.
- Input validation with Zod; Prisma parameterised queries prevent SQL injection.
- React escaping plus JSON-LD sanitisation prevent XSS.
- Same-origin checks on state-changing requests; security headers in `next.config.js`.
- Rate limiting on sensitive endpoints (contact, auth).
- Quiz scoring is computed server-side from a snapshotted correct option; the
  browser can never supply or influence a score.
- Audit logging for important admin actions.

---

## Extending the platform

The architecture is intentionally extensible. Adding an exam means adding rows to
`prisma/seed/taxonomy.ts` (or through the admin panel) — no frontend changes.
The same engine can back a public API, a mobile app, or future features such as
paid memberships, certificates, leaderboards, AI explanations, multilingual
content, teacher/institution accounts and advertisement management.

---

## License

MIT — see [LICENSE](LICENSE).
