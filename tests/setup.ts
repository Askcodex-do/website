/**
 * Vitest setup. Loads the local .env file so modules that validate environment
 * variables (src/lib/env.ts) and the Prisma client see DATABASE_URL during tests.
 */
try {
  // Node 20.12+ / 24 exposes process.loadEnvFile.
  process.loadEnvFile(".env");
} catch {
  // No .env file (CI provides real environment variables instead).
}
