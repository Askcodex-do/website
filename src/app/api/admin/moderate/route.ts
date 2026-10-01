import { ApiError, assertSameOrigin, jsonOk, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import { resolveReport, setContactStatus, setUserRole, setUserStatus } from "@/services/admin";

export const runtime = "nodejs";

type Body = {
  kind?: "report" | "message" | "user-role" | "user-status";
  id?: string;
  status?: string;
  roleKey?: string;
  note?: string;
};

/**
 * POST /api/admin/moderate
 *
 * Single endpoint for moderation actions. Each action is validated against its
 * own allow-list of values before it reaches the service layer, and the actor's
 * permission is checked per action kind.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body?.kind || !body.id) {
    throw new ApiError(422, "A kind and id are required");
  }

  switch (body.kind) {
    case "report": {
      const actor = await requireAdminApi("report:manage");
      const status = body.status;
      if (status !== "REVIEWING" && status !== "RESOLVED" && status !== "DISMISSED") {
        throw new ApiError(422, "Invalid report status");
      }
      await resolveReport(body.id, status, actor.id, body.note);
      return jsonOk({ id: body.id, status });
    }
    case "message": {
      const actor = await requireAdminApi("contact:manage");
      const status = body.status;
      if (status !== "NEW" && status !== "READ" && status !== "REPLIED" && status !== "SPAM") {
        throw new ApiError(422, "Invalid message status");
      }
      await setContactStatus(body.id, status, actor.id);
      return jsonOk({ id: body.id, status });
    }
    case "user-role": {
      const actor = await requireAdminApi("user:manage");
      if (!body.roleKey) throw new ApiError(422, "roleKey is required");
      await setUserRole(body.id, body.roleKey, actor.id);
      return jsonOk({ id: body.id, roleKey: body.roleKey });
    }
    case "user-status": {
      const actor = await requireAdminApi("user:manage");
      const status = body.status;
      if (status !== "ACTIVE" && status !== "SUSPENDED" && status !== "DELETED") {
        throw new ApiError(422, "Invalid user status");
      }
      await setUserStatus(body.id, status, actor.id);
      return jsonOk({ id: body.id, status });
    }
    default:
      throw new ApiError(422, "Unknown moderation kind");
  }
});
