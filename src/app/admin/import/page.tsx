import { requireAdmin } from "@/lib/admin-guard";
import { IMPORT_COLUMNS } from "@/services/bulk-import";
import { ImportForm } from "@/components/admin/import-form";

export const dynamic = "force-dynamic";

export default async function ImportPage() {
  await requireAdmin("question:write");

  return (
    <section aria-labelledby="import-heading" className="space-y-6">
      <div>
        <h2 id="import-heading" className="text-xl font-bold">
          Bulk MCQ import
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Upload a CSV or Excel file. Rows are validated first; only valid,
          non-duplicate rows are inserted. The correct answer accepts A–D or 1–4.
        </p>
      </div>

      <ImportForm columns={IMPORT_COLUMNS} />

      <details className="rounded-[var(--radius-card)] border border-[var(--border)] p-4 text-sm">
        <summary className="cursor-pointer font-medium">Column reference</summary>
        <ul className="mt-3 space-y-1">
          <li><strong>question</strong> — question text (required)</li>
          <li><strong>option_a</strong> … <strong>option_d</strong> — four distinct options (required)</li>
          <li><strong>correct_answer</strong> — A, B, C, D or 1–4 (required)</li>
          <li><strong>subject</strong> / <strong>topic</strong> — must match existing names or slugs (required)</li>
          <li><strong>exam</strong> — exam name/slug; separate multiple with a pipe (|)</li>
          <li><strong>education_level</strong> — level name/slug; separate multiple with a pipe (|)</li>
          <li><strong>difficulty</strong> — EASY, MEDIUM or HARD (defaults to MEDIUM)</li>
          <li><strong>year</strong>, <strong>explanation</strong>, <strong>source</strong>, <strong>tags</strong> — optional</li>
        </ul>
      </details>
    </section>
  );
}
