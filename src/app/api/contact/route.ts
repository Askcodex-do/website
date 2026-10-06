import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { contactSchema } from "@/lib/validation";
import { clientIp, rateLimitByIp } from "@/lib/rate-limit";
import { hashIp } from "@/lib/utils";
import { env } from "@/lib/env";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";

/**
 * POST /api/contact — store a contact message.
 * Protected by a honeypot field plus an IP rate limit.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limit = await rateLimitByIp(
    "contact",
    env.RATE_LIMIT_CONTACT_PER_HOUR,
    60 * 60,
  );
  if (!limit.allowed) {
    throw new ApiError(
      429,
      `Too many messages. Please try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minute(s).`,
    );
  }

  const input = await parseJson(request, contactSchema);

  // Honeypot: a filled hidden field means an automated submission.
  if (input.website && input.website.length > 0) {
    return jsonOk({ received: true }, { status: 201 });
  }

  const ip = await clientIp();
  const user = await getCurrentUser();

  const message = await db.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      ipHash: hashIp(ip),
      userAgent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
    },
  });

  await audit({
    actorId: user?.id ?? null,
    action: "contact.submitted",
    entityType: "contact",
    entityId: message.id,
    ip,
  });

  return jsonOk({ received: true, id: message.id }, { status: 201 });
});
