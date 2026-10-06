import { db } from "@/lib/db";
import { createSession, requestMeta, verifyPassword } from "@/lib/auth";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { loginSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { audit } from "@/lib/audit";
import { clientIp } from "@/lib/rate-limit";
import { hashIp } from "@/lib/utils";

export const runtime = "nodejs";

/** POST /api/auth/login — verify credentials and start a session. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const ip = await clientIp();
  const input = await parseJson(request, loginSchema);

  // Limit per IP and per account so one cannot be brute-forced from many IPs.
  const ipLimit = await rateLimit({
    key: `login:ip:${hashIp(ip)}`,
    limit: 20,
    windowSeconds: 15 * 60,
  });
  const accountLimit = await rateLimit({
    key: `login:acct:${hashIp(input.email)}`,
    limit: 10,
    windowSeconds: 15 * 60,
  });
  if (!ipLimit.allowed || !accountLimit.allowed) {
    throw new ApiError(429, "Too many login attempts. Please try again later.");
  }

  const user = await db.user.findUnique({ where: { email: input.email } });
  // Always run a comparison to keep timing uniform for unknown accounts.
  const hash = user?.passwordHash ?? "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali";
  const valid = await verifyPassword(input.password, hash);

  if (!user || !valid) {
    await audit({
      action: "user.login.failed",
      entityType: "user",
      metadata: { email: input.email },
      ip,
    });
    throw new ApiError(401, "Invalid email or password.");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "This account is not active.");
  }

  const meta = await requestMeta();
  await createSession(user.id, meta);
  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });
  await audit({
    actorId: user.id,
    action: "user.login",
    entityType: "user",
    entityId: user.id,
    ip,
  });

  return jsonOk({ id: user.id, email: user.email, name: user.name });
});
