import { db } from "@/lib/db";
import { hashPassword, destroySession } from "@/lib/auth";
import { hashOneTimeToken } from "@/lib/auth/session";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { resetPasswordSchema } from "@/lib/validation";
import { rateLimitByIp } from "@/lib/rate-limit";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";

/** POST /api/auth/reset-password — consume a reset token and set a new password. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limit = await rateLimitByIp("reset-password", 10, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many requests. Please try again later.");
  }

  const { token, password } = await parseJson(request, resetPasswordSchema);
  const tokenHash = hashOneTimeToken(token, "reset");

  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
    throw new ApiError(400, "This reset link is invalid or has expired.");
  }

  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { passwordHash: await hashPassword(password) },
    }),
    db.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    // Invalidate every existing session for this account.
    db.session.updateMany({
      where: { userId: record.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  await destroySession();
  await audit({
    actorId: record.userId,
    action: "user.password.reset",
    entityType: "user",
    entityId: record.userId,
  });

  return jsonOk({ message: "Your password has been reset. You can now sign in." });
});
