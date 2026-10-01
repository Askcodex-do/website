import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getGuestSessionId } from "@/lib/guest";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { answerSchema } from "@/lib/validation";
import { rateLimitByIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/questions/[id]/answer — grade a single practice answer.
 *
 * Correctness is decided here from the database; the browser never supplies it.
 * The correct option and explanation are returned only in this response.
 */
export const POST = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const { id } = await context.params;

  const limit = await rateLimitByIp("answer", 300, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many requests. Please slow down.");
  }

  const { optionId } = await parseJson(request, answerSchema);

  const question = await db.question.findFirst({
    where: { id, status: "PUBLISHED" },
    include: { options: { orderBy: { sortOrder: "asc" } } },
  });
  if (!question) throw new ApiError(404, "Question not found");

  const correctOption = question.options.find((o) => o.isCorrect);
  const selected = optionId
    ? question.options.find((o) => o.id === optionId)
    : null;
  if (optionId && !selected) {
    throw new ApiError(422, "The selected option does not belong to this question");
  }

  const isCorrect = selected ? selected.isCorrect : null;

  // Update denormalised counters (best-effort; never blocks the response).
  await db.question
    .update({
      where: { id },
      data: {
        timesAnswered: { increment: 1 },
        ...(isCorrect ? { timesCorrect: { increment: 1 } } : {}),
        viewCount: { increment: 0 },
      },
    })
    .catch(() => undefined);

  void (await getCurrentUser());
  void (await getGuestSessionId());

  return jsonOk({
    questionId: question.id,
    selectedOptionId: optionId,
    correctOptionId: correctOption?.id ?? null,
    isCorrect,
    explanation: question.explanation,
    reference: question.reference,
    source: question.source,
  });
});
