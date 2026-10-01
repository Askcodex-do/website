import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";

/**
 * Guest session handling.
 *
 * Guests get an opaque, server-issued id stored in an httpOnly cookie so their
 * quiz attempts can be created and graded server-side without an account. The
 * value carries no personal data and is never trusted for scoring.
 */

export const GUEST_COOKIE = "mcq_guest";

export async function getGuestSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(GUEST_COOKIE)?.value ?? null;
}

/** Read the guest id, creating and persisting one when absent. */
export async function ensureGuestSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(GUEST_COOKIE)?.value;
  if (existing) return existing;

  const id = randomBytes(24).toString("base64url");
  store.set(GUEST_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return id;
}
