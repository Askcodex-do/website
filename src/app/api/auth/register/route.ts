import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import {
  createSession,
  hashPassword,
  requestMeta,
} from "@/lib/auth";
import { hashOneTimeToken } from "@/lib/auth/session";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { registerSchema } from "@/lib/validation";
import { rateLimitByIp } from "@/lib/rate-limit";
import { audit } from "@/lib/audit";
import { emailConfigured, siteUrl } from "@/lib/env";
import { sendMail, verificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";

/** POST /api/auth/register — create an account and sign the user in. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limit = await rateLimitByIp("register", 10, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many attempts. Please try again later.");
  }

  const input = await parseJson(request, registerSchema);

  const existing = await db.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const userRole = await db.role.findUnique({ where: { key: "user" } });
  if (!userRole) {
    throw new ApiError(500, "Registration is temporarily unavailable.");
  }

  const user = await db.user.create({
    data: {
      email: input.email,
      name: input.name,
      passwordHash: await hashPassword(input.password),
      roleId: userRole.id,
    },
  });

  // Issue an email-verification token when email delivery is configured.
  if (emailConfigured) {
    const raw = randomBytes(32).toString("base64url");
    await db.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash: hashOneTimeToken(raw, "verify"),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    await sendMail({
      to: user.email,
      subject: "Confirm your email address",
      text: `Confirm your email: ${siteUrl}/verify-email?token=${raw}`,
      html: verificationEmail(`${siteUrl}/verify-email?token=${raw}`),
    });
  }

  const meta = await requestMeta();
  await createSession(user.id, meta);
  await audit({
    actorId: user.id,
    action: "user.register",
    entityType: "user",
    entityId: user.id,
    ip: meta.ip,
  });

  return jsonOk({ id: user.id, email: user.email, name: user.name }, { status: 201 });
});
