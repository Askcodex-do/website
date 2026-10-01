# SEO guide

SEO is generated from database content, not hand-written per page. This document
explains what the app emits and how to wire it up to search engines.

## What is generated automatically

Every public page (exam, subject, topic, MCQ, quiz, category, search, static
pages) builds metadata through `src/lib/seo/metadata.ts`:

- **Title** — specific and unique per page, using the root title template
- **Meta description** — derived from database content, truncated to 160 chars
- **Canonical URL** — one per page, built from `NEXT_PUBLIC_SITE_URL`
- **Open Graph** — title, description, URL, site name, type and image
- **Twitter card** — `summary_large_image`
- **JSON-LD** — `Organization`, `WebSite`, `Question`, `ItemList`, `FAQPage`,
  `BreadcrumbList` where relevant
- **Breadcrumbs** — visible navigation plus matching structured data
- **Slugs** — clean, keyword-bearing URLs

## URL structure

```
/exams/pst
/exams/css
/subjects/english
/topics/tenses
/mcqs/english/what-is-a-noun
```

Filtered listing permutations (for example `/mcqs?subject=...`) are blocked in
`robots.txt` to avoid near-duplicate content.

## robots.txt

`src/app/robots.ts` allows all public content and disallows:

```
/api/, /admin, /dashboard, /login, /register, /forgot-password,
/reset-password, /verify-email, /search, /quiz/, /mcqs?
```

It also advertises the sitemap location.

## Sitemap

`src/app/sitemap.ts` emits a **sitemap index** at `/sitemap.xml` that points at
chunked child sitemaps (`/sitemaps/questions-N.xml`, `/sitemaps/exams.xml`, and
so on). Chunking keeps each file small and lets the index scale to hundreds of
thousands of questions. Newly published questions appear automatically. The
sitemap revalidates hourly.

## Search engines

### Google Search Console

1. Add your property and verify ownership (DNS or an HTML meta tag).
2. If you use the meta-tag method, paste the token into the admin **Settings →
   SEO → Google verification token**; it is rendered from the database.
3. Submit `https://YOUR_DOMAIN/sitemap.xml`.
4. Use the URL Inspection tool on a few MCQ pages to confirm they are indexable.

### Bing Webmaster Tools

1. Add and verify your site (you can import from Google Search Console).
2. Paste the token into **Settings → SEO → Bing verification token** if using the
   meta-tag method.
3. Submit the same sitemap URL.

### Other engines

Most other engines accept the sitemap via `robots.txt`, which is already set.

## Guidelines

- Do not use black-hat techniques. The goal is technically correct, crawlable,
  indexable content — not guaranteed rankings.
- Keep titles and descriptions unique; the metadata builder derives them from
  distinct database rows, so avoid publishing duplicate questions.
- Return correct HTTP status codes (404 for missing questions, 410 for removed
  content if you add it).
- Monitor Core Web Vitals; the app ships small bundles, code splitting, lazy
  loading and image optimisation by default.
