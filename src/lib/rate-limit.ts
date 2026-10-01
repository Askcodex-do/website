import "@/lib/server-guard";

import { headers } from "next/headers";
import { db } from "@/lib/db";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Durable, database-backed fixed-window rate limiter.
 *
 * Uses a single row per (key, window) and an atomic upsert, so it stays correct
 * across multiple app instances without external infrastructure. For very high
 * traffic, swap the store for Redis — the call signature stays the same.
 */
export async function rateLimit(options: {
  key: string;
  limit: number;
  windowSeconds: number;
}): Promise<RateLimitResult> {
  const { key, limit, windowSeconds } = options;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const windowStart = new Date(Math.floor(now / windowMs) * windowMs);

  const record = await db.rateLimit.upsert({
    where: { key_windowStart: { key, windowStart } },
    create: { key, windowStart, count: 1 },
    update: { count: { increment: 1 } },
  });

  const remaining = Math.max(0, limit - record.count);
  const retryAfterSeconds = Math.ceil(
    (windowStart.getTime() + windowMs - now) / 1000,
  );

  return {
    allowed: record.count <= limit,
    remaining,
    retryAfterSeconds: Math.max(1, retryAfterSeconds),
  };
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

/** Convenience wrapper for IP-scoped limits. */
export async function rateLimitByIp(
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const ip = await clientIp();
  return rateLimit({ key: `${scope}:${ip}`, limit, windowSeconds });
}
