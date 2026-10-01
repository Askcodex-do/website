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
    const tokenHash = hashSessionToken(raw);
    await db.session
      .updateMany({
        where: { tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
      })
      .catch(() => undefined);
  }
  store.delete(SESSION_COOKIE);
}

/**
 * Resolve the current user from the session cookie. Cached per-request so a page
 * with many server components issues at most one session lookup.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const tokenHash = hashSessionToken(raw);
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
