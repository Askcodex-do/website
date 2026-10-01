import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { registerSchema, loginSchema, passwordSchema } from "@/lib/validation";
import { roleHasPermission, isAdmin } from "@/lib/auth/permissions";

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
