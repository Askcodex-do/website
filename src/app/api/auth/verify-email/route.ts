import { db } from "@/lib/db";
import { hashOneTimeToken } from "@/lib/auth/session";
import { ApiError, jsonOk, routeHandler } from "@/lib/api";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";

/** POST /api/auth/verify-email — confirm an email-verification token. */
export const POST = routeHandler(async (request) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) throw new ApiError(400, "Verification token is required");

  const tokenHash = hashOneTimeToken(token, "verify");
  const record = await db.emailVerificationToken.findUnique({
    where: { tokenHash },
  });

  if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
    throw new ApiError(400, "This verification link is invalid or has expired.");
  }

  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { emailVerifiedAt: new Date() },
    }),
    db.emailVerificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  await audit({
    actorId: record.userId,
    action: "user.email.verified",
    entityType: "user",
    entityId: record.userId,
  });

  return jsonOk({ verified: true });
});
