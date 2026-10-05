import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listPrepPagesForAdmin } from "@/services/admin-content";
import { listTaxonomyForAdmin } from "@/services/admin";
import { Badge } from "@/components/ui";
import { PrepPageForm } from "@/components/admin/prep-page-form";

export const dynamic = "force-dynamic";

export default async function AdminPrepPagesPage() {
  await requireAdmin("content:manage");
  const [{ exams }, pages] = await Promise.all([
    listTaxonomyForAdmin(),
    listPrepPagesForAdmin(),
  ]);

  return (
    <section aria-labelledby="prep-heading">
      <div className="mb-4">
        <h2 id="prep-heading" className="text-xl font-bold">
          Preparation pages
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Reusable content templates per exam. Adding an exam's preparation pages
          is data entry — no new code, no new components.
        </p>
      </div>

      <PrepPageForm exams={exams.map((e) => ({ id: e.id, name: e.name }))} />

      <div className="mt-10">
        <h3 className="mb-3 font-semibold">Published pages ({pages.length})</h3>
        {pages.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            No preparation pages yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {pages.map((page) => (
              <li
                key={page.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
              >
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {page.exam?.name ?? "—"} · {page.type.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!page.isPublished ? <Badge tone="danger">Hidden</Badge> : null}
                  {page.exam ? (
                    <Link
                      href={`/exams/${page.exam.slug}/preparation`}
                      className="rounded border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--surface-muted)]"
                    >
                      View
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
