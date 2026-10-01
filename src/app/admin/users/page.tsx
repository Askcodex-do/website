import { requireAdmin } from "@/lib/admin-guard";
import { listUsersForAdmin } from "@/services/admin";
import { ModerationSelect } from "@/components/admin/moderation-select";
import { Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin("user:manage");
  const { q } = await searchParams;
  const users = await listUsersForAdmin(q);

  return (
    <section aria-labelledby="users-heading">
      <h2 id="users-heading" className="mb-4 text-xl font-bold">
        Users
      </h2>

      <form method="get" className="mb-4 flex gap-3">
        <label htmlFor="user-search" className="sr-only">
          Search by email
        </label>
        <input
          id="user-search"
          name="q"
          defaultValue={q}
          placeholder="Search by email…"
          className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
        <table className="w-full text-sm">
          <caption className="sr-only">Users</caption>
          <thead className="bg-[var(--surface-muted)] text-left">
            <tr>
              <th scope="col" className="p-3">Email</th>
              <th scope="col" className="p-3">Role</th>
              <th scope="col" className="p-3">Status</th>
              <th scope="col" className="p-3">Joined</th>
              <th scope="col" className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[var(--border)]">
                <td className="p-3">
                  <p className="font-medium">{user.name ?? "—"}</p>
                  <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                </td>
                <td className="p-3">
                  <Badge tone={user.role.key === "admin" ? "brand" : "neutral"}>
                    {user.role.name}
                  </Badge>
                </td>
                <td className="p-3">
                  <Badge tone={user.status === "ACTIVE" ? "success" : "danger"}>
                    {user.status}
                  </Badge>
                </td>
                <td className="p-3 text-[var(--text-muted)]">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-2">
                    <ModerationSelect
                      kind="user-role"
                      id={user.id}
                      label="Role"
                      field="roleKey"
                      current={user.role.key}
                      options={[
                        { value: "user", label: "User" },
                        { value: "admin", label: "Admin" },
                      ]}
                    />
                    <ModerationSelect
                      kind="user-status"
                      id={user.id}
                      label="Status"
                      current={user.status}
                      options={[
                        { value: "ACTIVE", label: "Active" },
                        { value: "SUSPENDED", label: "Suspended" },
                        { value: "DELETED", label: "Deleted" },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--text-muted)]">No users found.</p>
      ) : null}
    </section>
  );
}
