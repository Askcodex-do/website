import { redirect } from "next/navigation";
import { destroySession, getCurrentUser } from "@/lib/auth";
import { jsonOk, routeHandler } from "@/lib/api";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";

/**
 * POST /api/auth/logout — revoke the session and clear the cookie.
 * Supports both a progressive-enhancement HTML form post (redirects home) and
 * a fetch/JSON client (returns JSON).
 */
export const POST = routeHandler(async (request) => {
  const user = await getCurrentUser();
  await destroySession();
  if (user) {
    await audit({
      actorId: user.id,
      action: "user.logout",
      entityType: "user",
      entityId: user.id,
    });
  }

  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
  if (wantsJson) return jsonOk({ signedOut: true });

  redirect("/");
});
