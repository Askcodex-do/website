import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import { setQuestionStatus, updateQuestion, questionInputSchema } from "@/services/admin";

export const runtime = "nodejs";

/** PUT /api/admin/questions/[id] — update a question. */
export const PUT = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:write");
  const { id } = await context.params;
  const input = await parseJson(request, questionInputSchema);

  try {
    const updated = await updateQuestion(id, input, user.id);
    return jsonOk(updated);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      throw new ApiError(404, "Question not found");
    }
    throw error;
  }
});

/** PATCH /api/admin/questions/[id] — change status (publish/unpublish/archive). */
export const PATCH = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:publish");
  const { id } = await context.params;

  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status;
  if (status !== "DRAFT" && status !== "PUBLISHED" && status !== "ARCHIVED") {
    throw new ApiError(422, "Status must be DRAFT, PUBLISHED or ARCHIVED");
  }

  await setQuestionStatus(id, status, user.id);
  return jsonOk({ id, status });
});

/** DELETE /api/admin/questions/[id] — archive (soft delete). */
export const DELETE = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:delete");
  const { id } = await context.params;
  await setQuestionStatus(id, "ARCHIVED", user.id);
  return jsonOk({ id, status: "ARCHIVED" });
});
