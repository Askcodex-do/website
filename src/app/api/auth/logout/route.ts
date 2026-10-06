import { NextResponse } from "next/server";
import { destroySession, getCurrentUser } from "@/lib/auth";
import { jsonOk, routeHandler } from "@/lib/api";
import { audit } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/auth/logout — revoke the session and clear the cookie.
 *
 * Supports both a progressive-enhancement HTML form post (303 redirect home)
 * and a fetch/JSON client (200 JSON). The redirect is returned directly rather
 * than thrown, so it can never be swallowed by error handling.
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

  const accept = request.headers.get("accept") ?? "";
  const isFormPost = accept.includes("text/html");
  const wantsJson = accept.includes("application/json") || !isFormPost;

  // No caching, so a refresh after sign-out can never replay a cached
  // authenticated response.
  const noStore = { "Cache-Control": "no-store, max-age=0" };

  if (wantsJson) {
    return jsonOk({ signedOut: true }, { headers: noStore });
  }

  // 303 turns the POST into a GET on the destination so a refresh is safe.
  return NextResponse.redirect(new URL("/", request.url), {
    status: 303,
    headers: noStore,
  });
});
