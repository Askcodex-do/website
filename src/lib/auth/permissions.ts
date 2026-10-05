/**
 * Central permission catalogue. Roles reference these strings, and the seed
 * grants them to the built-in roles. New roles (teacher, institution, ...) can
 * be added as data without touching application code.
 */
export const PERMISSIONS = [
  "question:read",
  "question:write",
  "question:delete",
  "question:publish",
  "question:verify",
  "taxonomy:write",
  "exam:configure",
  "paper:manage",
  "content:manage",
  "user:manage",
  "report:manage",
  "contact:manage",
  "seo:manage",
  "settings:manage",
  "analytics:view",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_KEYS = {
  GUEST: "guest",
  USER: "user",
  ADMIN: "admin",
} as const;

export type RoleKey = (typeof ROLE_KEYS)[keyof typeof ROLE_KEYS];

export const ROLE_PERMISSIONS: Record<RoleKey, Permission[]> = {
  guest: [],
  user: [],
  admin: [...PERMISSIONS],
};

export interface RoleLike {
  key: string;
  permissions: string[];
}

export function roleHasPermission(
  role: RoleLike | null | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;
  if (role.key === ROLE_KEYS.ADMIN) return true;
  return role.permissions.includes(permission);
}

export function isAdmin(user: { role: RoleLike } | null | undefined): boolean {
  return user?.role.key === ROLE_KEYS.ADMIN;
}
