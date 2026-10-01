import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listReports } from "@/services/admin";
import { ModerationSelect } from "@/components/admin/moderation-select";
import { Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  await requireAdmin("report:manage");
  const reports = await listReports();

  return (
    <section aria-labelledby="reports-heading">
      <h2 id="reports-heading" className="mb-4 text-xl font-bold">
        Reported questions
      </h2>

      {reports.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No reports submitted yet.</p>
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => (
            <li
              key={report.id}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge tone="warn">{report.reason}</Badge>
                  <Badge
                    tone={
                      report.status === "RESOLVED"
                        ? "success"
                        : report.status === "OPEN"
                          ? "danger"
                          : "neutral"
                    }
                  >
                    {report.status}
                  </Badge>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {report.createdAt.toLocaleString()} · {report.user?.email ?? "guest"}
                </span>
              </div>

              <Link
                href={`/mcqs/${report.question.slug}`}
                className="mt-2 block font-medium text-brand-600 hover:underline"
              >
                {report.question.stem.slice(0, 140)}
              </Link>
              {report.message ? (
                <p className="mt-1 text-sm text-[var(--text-muted)]">{report.message}</p>
              ) : null}

              <div className="mt-3">
                <ModerationSelect
                  kind="report"
                  id={report.id}
                  label="Report status"
                  current={report.status}
                  options={[
                    { value: "OPEN", label: "Open" },
                    { value: "REVIEWING", label: "Reviewing" },
                    { value: "RESOLVED", label: "Resolved" },
                    { value: "DISMISSED", label: "Dismissed" },
                  ]}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
