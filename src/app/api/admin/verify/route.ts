import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import {
  listVerificationQueue,
  setQuestionVerification,
  verificationSchema,
} from "@/services/admin-content";

export const runtime = "nodejs";

/** GET /api/admin/verify — questions awaiting review. */
export const GET = routeHandler(async (request) => {
  await requireAdminApi("question:verify");
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const page = Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1;

  const result = await listVerificationQueue({
    status: status
      ? (status as "UNVERIFIED" | "PENDING_REVIEW" | "VERIFIED" | "REJECTED" | "FLAGGED")
      : undefined,
    page,
  });
  return jsonOk(result);
});

/** POST /api/admin/verify?id=<questionId> — set a question's verification status. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:verify");

  const url = new URL(request.url);
  const questionId = url.searchParams.get("id");
  if (!questionId) throw new ApiError(422, "A question id is required");

  const input = await parseJson(request, verificationSchema);
  try {
    const result = await setQuestionVerification(questionId, input, user.id);
    return jsonOk(result);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new ApiError(404, "Question not found");
    }
    throw error;
  }
});
