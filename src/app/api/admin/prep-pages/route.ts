import { ApiError, assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import {
  listPrepPagesForAdmin,
  prepPageSchema,
  savePrepPage,
} from "@/services/admin-content";

export const runtime = "nodejs";

/** GET /api/admin/prep-pages?examId=… — list preparation pages. */
export const GET = routeHandler(async (request) => {
  await requireAdminApi("content:manage");
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId") ?? undefined;
  const pages = await listPrepPagesForAdmin(examId);
  return jsonOk(pages);
});

/** POST /api/admin/prep-pages — create or update a preparation page. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("content:manage");
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? undefined;

  const input = await parseJson(request, prepPageSchema);
  try {
    const page = await savePrepPage(input, user.id, id);
    return jsonOk(page, { status: id ? 200 : 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new ApiError(404, "Preparation page not found");
    }
    throw error;
  }
});
