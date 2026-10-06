import { getCurrentUser } from "@/lib/auth";
import { getGuestSessionId } from "@/lib/guest";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { answerSchema } from "@/lib/validation";
import { answerQuestion, QuizError } from "@/services/quiz";
import { rateLimitByIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** POST /api/quiz/[id]/answer — record and grade an answer server-side. */
export const POST = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const { id } = await context.params;

  const limit = await rateLimitByIp("quiz-answer", 1000, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many requests. Please slow down.");
  }

  const body = await parseJson(request, answerSchema);
  const url = new URL(request.url);
  const questionId = url.searchParams.get("questionId");
  if (!questionId) throw new ApiError(422, "questionId query parameter is required");

  const user = await getCurrentUser();
  const guestSessionId = user ? null : await getGuestSessionId();
  if (!user && !guestSessionId) {
    throw new ApiError(401, "No active quiz session.");
  }

  try {
    const result = await answerQuestion(
      id,
      questionId,
      body.optionId,
      { userId: user?.id ?? null, guestSessionId },
      body.timeSpentSeconds ?? 0,
    );
    return jsonOk(result);
  } catch (error) {
    if (error instanceof QuizError) {
      throw new ApiError(error.code === "NOT_FOUND" ? 404 : 400, error.message);
    }
    throw error;
  }
});
