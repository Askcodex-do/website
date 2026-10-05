import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import {
  createPreviousPaper,
  listPreviousPapersForAdmin,
  previousPaperSchema,
  updatePreviousPaper,
} from "@/services/admin-content";

export const runtime = "nodejs";

/** GET /api/admin/papers — list previous papers. */
export const GET = routeHandler(async () => {
  await requireAdminApi("paper:manage");
  const papers = await listPreviousPapersForAdmin();
  return jsonOk(papers);
});

/** POST /api/admin/papers — create a previous paper. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("paper:manage");
  const input = await parseJson(request, previousPaperSchema);
  const paper = await createPreviousPaper(input, user.id);
  return jsonOk(paper, { status: 201 });
});

/** PUT /api/admin/papers?id=<paperId> — update a previous paper. */
export const PUT = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("paper:manage");
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) throw new ApiError(422, "A paper id is required");

  const input = await parseJson(request, previousPaperSchema);
  try {
    const paper = await updatePreviousPaper(id, input, user.id);
    return jsonOk(paper);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new ApiError(404, "Paper not found");
    }
    throw error;
  }
});
