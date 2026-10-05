import "@/lib/server-guard";

import { cookies, headers } from "next/headers";
import { cache } from "react";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { env, isProduction } from "@/lib/env";
import { hashIp, sha256Hex } from "@/lib/utils";
import {
  createSessionToken,
  hashSessionToken,
  SESSION_COOKIE,
} from "@/lib/auth/session";
import type { Permission } from "@/lib/auth/permissions";
import { roleHasPermission } from "@/lib/auth/permissions";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  emailVerifiedAt: Date | null;
  role: {
    key: string;
    name: string;
    permissions: string[];
  };
}

const BCRYPT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Create a DB-backed session row and set the httpOnly cookie. */
export async function createSession(
  userId: string,
  meta: { userAgent?: string | null; ip?: string | null } = {},
): Promise<void> {
  const { token, tokenHash, expiresAt } = createSessionToken();

  await db.session.create({
    data: {
      userId,
      tokenHash,
      userAgent: meta.userAgent?.slice(0, 512) ?? null,
      ipHash: hashIp(meta.ip),
      expiresAt,
    },
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (raw) {
    await revokeSessionByToken(raw);
  }
  // Delete with the same path/attributes used when setting, so the browser
  // cannot keep a stale cookie that would resurrect the session on refresh.
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  store.delete(SESSION_COOKIE);
}

/**
 * Revoke a single session by its raw token. This is the authoritative half of
 * logout: once revoked, resolveSessionUser() rejects the token even if a client
 * retained the cookie, so a refresh cannot restore the signed-in state.
 */
export async function revokeSessionByToken(rawToken: string): Promise<void> {
  const tokenHash = hashSessionToken(rawToken);
  await db.session
    .updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    .catch(() => undefined);
}

/** Revoke every active session for a user (password change, "sign out all"). */
export async function destroyAllSessions(userId: string): Promise<void> {
  await db.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

/**
 * Resolve a session token (raw cookie value) to a user. Kept separate from the
 * cookie plumbing so the full lifecycle — including revocation on logout — can
 * be tested directly against the database.
 *
 * A session is rejected when it is unknown, revoked, expired, or belongs to a
 * non-active user, which is what makes logout authoritative even if the browser
 * still holds a copy of the cookie.
 */
export async function resolveSessionUser(
  rawToken: string | undefined | null,
): Promise<SessionUser | null> {
  if (!rawToken) return null;

  const tokenHash = hashSessionToken(rawToken);
  const session = await db.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: { role: true },
      },
    },
  });

  if (!session) return null;
  if (session.revokedAt) return null;
  if (session.expiresAt.getTime() < Date.now()) return null;
  if (session.user.status !== "ACTIVE") return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    emailVerifiedAt: session.user.emailVerifiedAt,
    role: {
      key: session.user.role.key,
      name: session.user.role.name,
      permissions: session.user.role.permissions,
    },
  };
}

/**
 * Resolve the current user from the session cookie. Cached per-request so a page
 * with many server components issues at most one session lookup.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  return resolveSessionUser(store.get(SESSION_COOKIE)?.value);
});

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new AuthError("AUTH_REQUIRED", "Authentication required");
  return user;
}

export async function requirePermission(
  permission: Permission,
): Promise<SessionUser> {
  const user = await requireUser();
  if (!roleHasPermission(user.role, permission)) {
    throw new AuthError("FORBIDDEN", "You do not have access to this resource");
  }
  return user;
}

export class AuthError extends Error {
  constructor(
    public code: "AUTH_REQUIRED" | "FORBIDDEN",
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/** Best-effort client metadata for session/audit rows. */
export async function requestMeta(): Promise<{
  userAgent: string | null;
  ip: string | null;
}> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
  return { userAgent: h.get("user-agent"), ip };
}

export function tokenHash(token: string): string {
  return sha256Hex(token);
}

export { env };
