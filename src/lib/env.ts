import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters")
    .default("development-only-insecure-secret-change-me-please"),
  SESSION_MAX_AGE: z.coerce.number().int().positive().default(60 * 60 * 24 * 30),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("MCQ Prep"),
  NEXT_PUBLIC_SITE_TAGLINE: z
    .string()
    .default("Practice MCQs for jobs, admissions and competitive exams"),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASSWORD: z.string().optional().default(""),
  SMTP_FROM: z.string().optional().default("MCQ Prep <no-reply@example.com>"),
  RATE_LIMIT_CONTACT_PER_HOUR: z.coerce.number().int().positive().default(5),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
export const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
export const siteName = env.NEXT_PUBLIC_SITE_NAME;
export const siteTagline = env.NEXT_PUBLIC_SITE_TAGLINE;
export const emailConfigured = Boolean(env.SMTP_HOST && env.SMTP_USER);
