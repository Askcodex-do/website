import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { reportSchema } from "@/lib/validation";
import { clientIp, rateLimitByIp } from "@/lib/rate-limit";
import { hashIp } from "@/lib/utils";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";

/** POST /api/questions/[id]/report — flag a problem with a question. */
export const POST = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const { id } = await context.params;

  const limit = await rateLimitByIp("report", 20, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many reports submitted. Please try again later.");
  }

  const input = await parseJson(request, reportSchema);
  const question = await db.question.findFirst({
    where: { id, status: "PUBLISHED" },
    select: { id: true },
  });
  if (!question) throw new ApiError(404, "Question not found");

  const user = await getCurrentUser();
  const ip = await clientIp();

  await db.$transaction([
    db.report.create({
      data: {
        questionId: id,
        userId: user?.id ?? null,
        reason: input.reason,
        message: input.message ?? null,
        ipHash: hashIp(ip),
      },
    }),
    db.question.update({
      where: { id },
      data: { reportCount: { increment: 1 } },
    }),
  ]);

  await audit({
    actorId: user?.id ?? null,
    action: "question.report",
    entityType: "question",
    entityId: id,
    metadata: { reason: input.reason },
    ip,
  });

  return jsonOk({ received: true }, { status: 201 });
});
