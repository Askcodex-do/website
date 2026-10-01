import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import { createQuestion, questionInputSchema } from "@/services/admin";

export const runtime = "nodejs";

/**
 * POST /api/admin/questions — create a question.
 * All validation and persistence happen server-side; the client form is a
 * convenience only.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:write");
  const input = await parseJson(request, questionInputSchema);

  try {
    const created = await createQuestion(input, user.id);
    return jsonOk(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      throw new ApiError(409, "A question with this slug or content already exists");
    }
    throw error;
  }
});
