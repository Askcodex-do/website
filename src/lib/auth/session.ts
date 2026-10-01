import { randomBytes } from "node:crypto";
import { env } from "@/lib/env";
import { sha256Hex } from "@/lib/utils";

export const SESSION_COOKIE = "mcq_session";

export interface SessionToken {
  token: string;
  tokenHash: string;
  expiresAt: Date;
}

/** Generate a cryptographically random session token; only its hash is stored. */
export function createSessionToken(): SessionToken {
  const token = randomBytes(32).toString("base64url");
  const maxAgeMs = env.SESSION_MAX_AGE * 1000;
  return {
    token,
    tokenHash: hashSessionToken(token),
    expiresAt: new Date(Date.now() + maxAgeMs),
  };
}

export function hashSessionToken(token: string): string {
  return sha256Hex(`session:${token}`);
}

export function generateOpaqueToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

/** Hash for one-time tokens (password reset / email verification). */
export function hashOneTimeToken(token: string, purpose: string): string {
  return sha256Hex(`${purpose}:${token}`);
}
