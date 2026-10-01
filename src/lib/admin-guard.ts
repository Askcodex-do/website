import { redirect } from "next/navigation";
import { getCurrentUser, type SessionUser } from "@/lib/auth";
import { roleHasPermission, type Permission } from "@/lib/auth/permissions";
import { ApiError } from "@/lib/api";

/**
 * Page-level guard for the admin area. Unauthenticated visitors are sent to the
 * login page with a return path; authenticated non-admins get a 404-equivalent
 * redirect to the dashboard so the admin area is not even discoverable.
 */
export async function requireAdmin(permission?: Permission): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (!roleHasPermission(user.role, permission ?? "analytics:view")) {
    redirect("/dashboard");
  }
  return user;
}

/**
 * API-level guard for admin routes. Throws ApiError so routeHandler returns a
 * clean 401/403 JSON response instead of redirecting.
 */
export async function requireAdminApi(
  permission: Permission = "analytics:view",
): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new ApiError(401, "Authentication required");
  if (!roleHasPermission(user.role, permission)) {
    throw new ApiError(403, "You do not have permission to perform this action");
  }
  return user;
}

