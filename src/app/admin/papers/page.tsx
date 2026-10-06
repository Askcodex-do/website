import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listPreviousPapersForAdmin } from "@/services/admin-content";
import { listTaxonomyForAdmin } from "@/services/admin";
import { Badge } from "@/components/ui";
import { PaperForm } from "@/components/admin/paper-form";

export const dynamic = "force-dynamic";

export default async function AdminPapersPage() {
  await requireAdmin("paper:manage");
  const [papers, { exams, subjects }] = await Promise.all([
    listPreviousPapersForAdmin(),
    listTaxonomyForAdmin(),
  ]);

  return (
    <section aria-labelledby="papers-heading">
      <div className="mb-4">
        <h2 id="papers-heading" className="text-xl font-bold">
          Previous papers
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Past papers are marked verified only when a source or reference is
          attached. Unverified entries are labelled as reconstructions on the
          public site.
        </p>
      </div>

      <PaperForm
        exams={exams.map((e) => ({ id: e.id, name: e.name }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
      />

      {papers.length === 0 ? (
        <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
          No previous papers yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {papers.map((paper) => (
            <li
              key={paper.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge tone={paper.verified ? "success" : "warn"}>
                    {paper.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge tone="neutral">{paper.year}</Badge>
                  {!paper.isPublished ? <Badge tone="danger">Hidden</Badge> : null}
                </div>
                <p className="font-medium">{paper.title}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {paper.exam?.name ?? "General"}
                  {paper.subject ? ` · ${paper.subject.name}` : ""} ·{" "}
                  {paper._count.questions} questions
                </p>
              </div>
              <Link
                href={`/previous-papers/${paper.slug}`}
                className="rounded border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--surface-muted)]"
              >
                View public page
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
