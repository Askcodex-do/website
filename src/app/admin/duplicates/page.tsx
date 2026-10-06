import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { findDuplicateQuestions, findNearDuplicates } from "@/services/admin-content";
import { Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminDuplicatesPage() {
  await requireAdmin("question:read");
  const [{ groups, totalGroups }, near] = await Promise.all([
    findDuplicateQuestions(50),
    findNearDuplicates(25),
  ]);

  return (
    <section aria-labelledby="duplicates-heading" className="space-y-8">
      <div>
        <h2 id="duplicates-heading" className="text-xl font-bold">
          Duplicate detection
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Exact duplicates share the same content hash (question, options and
          correct answer). Near-duplicates share a stem prefix but differ in
          content — review before merging.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Exact duplicates ({totalGroups} groups)
        </h3>
        {groups.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            No exact duplicates found. 🎉
          </p>
        ) : (
          <ul className="space-y-3">
            {groups.map((group) => (
              <li
                key={group.key}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Badge tone="danger">{group.count} copies</Badge>
                  <code className="text-xs text-[var(--text-muted)]">
                    {group.key.slice(0, 40)}…
                  </code>
                </div>
                <p className="font-medium">{group.sample}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.ids.map((id) => (
                    <li key={id}>
                      <Link
                        href={`/admin/questions/${id}`}
                        className="rounded border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--surface-muted)]"
                      >
                        Open
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Possible near-duplicates ({near.length})
        </h3>
        {near.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            No near-duplicates detected in the most recent questions.
          </p>
        ) : (
          <ul className="space-y-3">
            {near.map((group) => (
              <li
                key={group.key}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <p className="font-medium">{group.key}…</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/admin/questions/${item.id}`}
                        className="rounded border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--surface-muted)]"
                      >
                        {item.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
