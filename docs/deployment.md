# Deployment guide

This guide deploys the MCQ Prep Platform to a Node.js host with a managed
PostgreSQL database. The steps are the same for a VM, a container platform or a
PaaS such as Vercel, Fly.io, Railway or Render.

## 1. Provision PostgreSQL

Create a database and a least-privilege application user. Note the connection
string; add `?sslmode=require` for managed providers that enforce TLS.

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/mcq_exam?schema=public&sslmode=require"
```

## 2. Configure environment

Copy `.env.example` to your host's environment and set at minimum:

- `DATABASE_URL`
- `AUTH_SECRET` — a fresh 48-byte random value (`openssl rand -base64 48`)
- `NEXT_PUBLIC_SITE_URL` — the public https origin, used for canonical URLs and
  the sitemap

Optional: `SMTP_*` for email delivery, `NEXT_PUBLIC_SITE_NAME`,
`NEXT_PUBLIC_SITE_TAGLINE`, `RATE_LIMIT_CONTACT_PER_HOUR`.

Never commit secrets. Inject them through the platform's secret manager.

## 3. Install and build

```bash
npm ci
npx prisma generate
npx prisma migrate deploy     # apply committed migrations
npm run build
```

Run `prisma migrate deploy` as a release/deploy step, not at runtime, so
concurrent instances never race on migrations.

## 4. Seed the question bank (first deploy only)

```bash
npm run db:seed
```

The seed is idempotent: it skips when questions already exist. Use
`SEED_FORCE=1` only when you intend to wipe and regenerate. It prints the admin
account email; the default credentials are `admin@example.com` / `Admin@12345`.
Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before seeding in production and
change the password immediately after first login.

## 5. Start

```bash
npm start        # serves on PORT (default 3000)
```

Run at least one instance behind a load balancer. The app is stateless apart from
PostgreSQL, so horizontal scaling is safe.

## 6. Reverse proxy, TLS and caching

- Terminate TLS at the proxy and redirect HTTP to HTTPS.
- The app sets security headers in `next.config.js`; keep them enabled.
- Hashed assets under `/_next/static/*` are served with immutable cache headers
  and are safe to front with a CDN.
- Cache public category pages at the CDN where your platform allows; the sitemap
  is revalidated hourly.

## 7. Post-deploy checks

```bash
curl -I https://YOUR_DOMAIN/robots.txt     # 200
curl -I https://YOUR_DOMAIN/sitemap.xml    # 200
curl -s https://YOUR_DOMAIN/ | head        # home page renders
```

Then submit the sitemap to Google Search Console and Bing Webmaster Tools (see
[seo.md](seo.md)).

## 8. Ongoing operations

- Back up PostgreSQL on a schedule and test restores.
- Watch slow queries; the schema already indexes exam, subject, topic, education
  level, difficulty, status and slug.
- Apply new migrations with `prisma migrate deploy` before restarting.
- Keep `AUTH_SECRET` stable; rotating it invalidates existing sessions.
