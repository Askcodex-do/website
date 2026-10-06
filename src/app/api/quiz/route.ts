import { getCurrentUser } from "@/lib/auth";
import { ensureGuestSessionId } from "@/lib/guest";
import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { createQuizSchema } from "@/lib/validation";
import { createQuizAttempt, QuizError } from "@/services/quiz";
import { rateLimitByIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/quiz — create a quiz attempt.
 *
 * Questions are chosen by the Question Selection Engine and the correct answers
 * are snapshotted server-side. The response contains no answer key.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limit = await rateLimitByIp("quiz-create", 60, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many quizzes started. Please try again later.");
  }

  const input = await parseJson(request, createQuizSchema);
  const user = await getCurrentUser();
  const guestSessionId = user ? null : await ensureGuestSessionId();

  try {
    const quiz = await createQuizAttempt({
      exam: input.exam,
      subject: input.subject,
      topic: input.topic,
      educationLevel: input.educationLevel,
      difficulty: input.difficulty,
      count: input.count,
      mode: input.mode,
      timeLimitSeconds: input.timeLimitSeconds,
      userId: user?.id ?? null,
      guestSessionId,
    });
    return jsonOk(quiz, { status: 201 });
  } catch (error) {
    if (error instanceof QuizError) {
      throw new ApiError(
        error.code === "NO_QUESTIONS" ? 404 : 400,
        error.message,
      );
    }
    throw error;
  }
});
