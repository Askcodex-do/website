import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  hashPassword,
  verifyPassword,
  resolveSessionUser,
  revokeSessionByToken,
  destroyAllSessions,
} from "@/lib/auth";
import { createSessionToken, hashSessionToken } from "@/lib/auth/session";
import { registerSchema, loginSchema, passwordSchema } from "@/lib/validation";
import { roleHasPermission, isAdmin } from "@/lib/auth/permissions";
import { db } from "./helpers/db";

/** Authentication unit tests — hashing, validation and role authorisation. */

describe("password hashing", () => {
  it("never stores the plaintext and verifies correctly", async () => {
    const hash = await hashPassword("CorrectHorseBattery1");
    expect(hash).not.toBe("CorrectHorseBattery1");
    expect(hash.startsWith("$2")).toBe(true);
    expect(await verifyPassword("CorrectHorseBattery1", hash)).toBe(true);
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("produces a different hash each time (salted)", async () => {
    const a = await hashPassword("SamePassword123");
    const b = await hashPassword("SamePassword123");
    expect(a).not.toBe(b);
  });
});

describe("registration validation", () => {
  it("accepts a valid registration", () => {
    const result = registerSchema.safeParse({
      name: "Ayesha Khan",
      email: "ayesha@example.com",
      password: "StrongPass123",
      confirmPassword: "StrongPass123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects weak passwords", () => {
    expect(passwordSchema.safeParse("short").success).toBe(false);
    expect(passwordSchema.safeParse("12345678").success).toBe(false);
    expect(passwordSchema.safeParse("NoDigitsHere").success).toBe(false);
  });

  it("rejects malformed emails", () => {
    expect(
      loginSchema.safeParse({ email: "not-an-email", password: "StrongPass123" })
        .success,
    ).toBe(false);
  });
});

describe("role-based authorisation", () => {
  it("grants admins every permission regardless of the stored list", () => {
    const admin = { key: "admin", permissions: [] as string[] };
    expect(roleHasPermission(admin, "question:delete")).toBe(true);
    expect(roleHasPermission(admin, "settings:manage")).toBe(true);
  });

  it("only grants users permissions they explicitly hold", () => {
    const user = { key: "user", permissions: [] as string[] };
    expect(roleHasPermission(user, "question:write")).toBe(false);
    expect(isAdmin({ role: user })).toBe(false);
  });

  it("denies guests and null roles", () => {
    expect(roleHasPermission(null, "question:read")).toBe(false);
    expect(roleHasPermission({ key: "guest", permissions: [] }, "question:read")).toBe(
      false,
    );
  });
});

/**
 * Session lifecycle against the real database. These cover the logout bug:
 * logout must be authoritative (server-side revocation), refresh must not
 * restore the session, and revoked/expired tokens must be rejected.
 */
describe("session lifecycle (logout)", () => {
  const EMAIL = "vitest-session@example.test";
  let userId: string;

  async function issueSession(): Promise<string> {
    const { token, tokenHash, expiresAt } = createSessionToken();
    await db.session.create({
      data: { userId, tokenHash, expiresAt },
    });
    return token;
  }

  beforeAll(async () => {
    await db.session.deleteMany({ where: { user: { email: EMAIL } } });
    await db.user.deleteMany({ where: { email: EMAIL } });
    const role = await db.role.upsert({
      where: { key: "user" },
      update: {},
      create: { key: "user", name: "User", permissions: [], isSystem: true },
    });
    const user = await db.user.create({
      data: {
        email: EMAIL,
        name: "Session Tester",
        passwordHash: await bcryptHash("Test@12345"),
        roleId: role.id,
        emailVerifiedAt: new Date(),
      },
    });
    userId = user.id;
  });

  afterAll(async () => {
    await db.session.deleteMany({ where: { userId } });
    await db.user.deleteMany({ where: { id: userId } });
  });

  it("resolves a valid session token to its user", async () => {
    const token = await issueSession();
    const user = await resolveSessionUser(token);
    expect(user?.email).toBe(EMAIL);
  });

  it("rejects a missing or unknown token", async () => {
    expect(await resolveSessionUser(undefined)).toBeNull();
    expect(await resolveSessionUser("not-a-real-token")).toBeNull();
  });

  it("does not resolve a session after logout (refresh must not restore it)", async () => {
    const token = await issueSession();
    expect(await resolveSessionUser(token)).not.toBeNull();

    // Logout = revoke server-side. A client that still holds the cookie value
    // must be rejected, which is what prevents a refresh from re-authenticating.
    await revokeSessionByToken(token);
    expect(await resolveSessionUser(token)).toBeNull();
  });

  it("rejects an expired session", async () => {
    const { token, tokenHash } = createSessionToken();
    await db.session.create({
      data: { userId, tokenHash, expiresAt: new Date(Date.now() - 1000) },
    });
    expect(await resolveSessionUser(token)).toBeNull();
  });

  it("rejects a session for a suspended user", async () => {
    const token = await issueSession();
    await db.user.update({ where: { id: userId }, data: { status: "SUSPENDED" } });
    expect(await resolveSessionUser(token)).toBeNull();
    await db.user.update({ where: { id: userId }, data: { status: "ACTIVE" } });
  });

  it("revokes every session for a user on sign-out-all", async () => {
    const a = await issueSession();
    const b = await issueSession();
    await destroyAllSessions(userId);
    expect(await resolveSessionUser(a)).toBeNull();
    expect(await resolveSessionUser(b)).toBeNull();
  });

  it("only stores a hash of the session token, never the raw token", async () => {
    const token = await issueSession();
    const byRaw = await db.session.findUnique({ where: { tokenHash: token } });
    const byHash = await db.session.findUnique({
      where: { tokenHash: hashSessionToken(token) },
    });
    expect(byRaw).toBeNull();
    expect(byHash).not.toBeNull();
  });
});

async function bcryptHash(plain: string): Promise<string> {
  const { default: bcrypt } = await import("bcryptjs");
  return bcrypt.hash(plain, 4);
}
