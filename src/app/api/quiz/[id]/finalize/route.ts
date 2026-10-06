import { getCurrentUser } from "@/lib/auth";
import { getGuestSessionId } from "@/lib/guest";
import { ApiError, assertSameOrigin, jsonOk, routeHandler } from "@/lib/api";
import { finalizeAttempt, QuizError } from "@/services/quiz";

export const runtime = "nodejs";

/** POST /api/quiz/[id]/finalize — grade the attempt and store the summary. */
export const POST = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const { id } = await context.params;

  const user = await getCurrentUser();
  const guestSessionId = user ? null : await getGuestSessionId();
  if (!user && !guestSessionId) {
    throw new ApiError(401, "No active quiz session.");
  }

  try {
    const result = await finalizeAttempt(id, {
      userId: user?.id ?? null,
      guestSessionId,
    });
    return jsonOk(result);
  } catch (error) {
    if (error instanceof QuizError) {
      throw new ApiError(
        error.code === "NOT_FOUND" ? 404 : error.code === "FORBIDDEN" ? 403 : 400,
        error.message,
      );
    }
    throw error;
  }
});
