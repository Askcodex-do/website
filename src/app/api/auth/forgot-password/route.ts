import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { hashOneTimeToken } from "@/lib/auth/session";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { forgotPasswordSchema } from "@/lib/validation";
import { rateLimitByIp } from "@/lib/rate-limit";
import { sendMail, passwordResetEmail } from "@/lib/mailer";
import { siteUrl } from "@/lib/env";

export const runtime = "nodejs";

/**
 * POST /api/auth/forgot-password — issue a reset token.
 *
 * Always returns the same response whether or not the account exists, so the
 * endpoint cannot be used to enumerate registered emails.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limit = await rateLimitByIp("forgot-password", 5, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many requests. Please try again later.");
  }

  const { email } = await parseJson(request, forgotPasswordSchema);
  const user = await db.user.findUnique({ where: { email } });

  if (user) {
    const raw = randomBytes(32).toString("base64url");
    await db.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashOneTimeToken(raw, "reset"),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
    await sendMail({
      to: user.email,
      subject: "Reset your password",
      text: `Reset your password: ${siteUrl}/reset-password?token=${raw}`,
      html: passwordResetEmail(`${siteUrl}/reset-password?token=${raw}`),
    });
  }

  return jsonOk({
    message: "If an account exists for that email, a reset link has been sent.",
  });
});
