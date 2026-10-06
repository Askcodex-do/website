import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listVerificationQueue } from "@/services/admin-content";
import { Badge, DifficultyBadge } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination";
import { VerificationActions } from "@/components/admin/verification-actions";
import type { VerificationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const STATUSES: Array<{ value: VerificationStatus; label: string }> = [
  { value: "UNVERIFIED", label: "Unverified" },
  { value: "PENDING_REVIEW", label: "Pending review" },
  { value: "FLAGGED", label: "Flagged" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
];

export default async function AdminVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  await requireAdmin("question:verify");
  const sp = await searchParams;
  const page = Number.parseInt(sp.page ?? "1", 10) || 1;
  const status = STATUSES.some((s) => s.value === sp.status)
    ? (sp.status as VerificationStatus)
    : undefined;

  const { rows, total, pageCount, counts } = await listVerificationQueue({
    status,
    page,
  });

  return (
    <section aria-labelledby="verification-heading">
      <div className="mb-4">
        <h2 id="verification-heading" className="text-xl font-bold">
          Verification queue
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Review generated and imported questions before they are presented as
          verified. A question can only be verified once it has a source or
          reference.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href="/admin/verification"
          className={`rounded-lg border px-3 py-1.5 text-sm ${
            !status ? "border-brand-500 bg-brand-50 text-brand-700" : "border-[var(--border)]"
          }`}
        >
          Needs review ({counts.UNVERIFIED ?? 0})
        </Link>
        {STATUSES.map((item) => (
          <Link
            key={item.value}
            href={`/admin/verification?status=${item.value}`}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              status === item.value
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-[var(--border)]"
            }`}
          >
            {item.label} ({counts[item.value] ?? 0})
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
          Nothing in this queue. 🎉
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <Badge tone={row.verification === "VERIFIED" ? "success" : "warn"}>
                      {row.verification.replace("_", " ").toLowerCase()}
                    </Badge>
                    <Badge tone="neutral">{row.origin.replace("_", " ").toLowerCase()}</Badge>
                    <DifficultyBadge difficulty={row.difficulty} />
                    {row.subjects[0] ? (
                      <span className="text-xs text-[var(--text-muted)]">
                        {row.subjects[0].subject.name}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/admin/questions/${row.id}`}
                    className="font-medium hover:text-brand-700 hover:underline"
                  >
                    {row.stem}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {row.source || row.reference
                      ? `Source: ${[row.source, row.reference].filter(Boolean).join(" — ")}`
                      : "No source recorded"}
                  </p>
                </div>
                <VerificationActions questionId={row.id} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 ? (
        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={pageCount}
            buildHref={(target) =>
              status
                ? `/admin/verification?status=${status}&page=${target}`
                : `/admin/verification?page=${target}`
            }
          />
        </div>
      ) : null}

      <p className="mt-4 text-xs text-[var(--text-muted)]">
        Showing {rows.length.toLocaleString()} of {total.toLocaleString()} questions.
      </p>
    </section>
  );
}
