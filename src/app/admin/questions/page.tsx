import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listAdminQuestions, listTaxonomyForAdmin } from "@/services/admin";
import { Badge, DifficultyBadge } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination";
import { QuestionRowActions } from "@/components/admin/question-row-actions";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  subjectId?: string;
  examId?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  page?: string;
};

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("question:read");
  const sp = await searchParams;
  const page = Number.parseInt(sp.page ?? "1", 10) || 1;

  const [{ rows, total, pageCount, pageSize }, { exams, subjects }] =
    await Promise.all([
      listAdminQuestions({
        search: sp.q,
        status: sp.status,
        subjectId: sp.subjectId,
        examId: sp.examId,
        difficulty: sp.difficulty,
        page,
      }),
      listTaxonomyForAdmin(),
    ]);

  const buildQuery = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { ...sp, ...overrides };
    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, String(value));
    }
    return `/admin/questions?${params.toString()}`;
  };

  return (
    <section aria-labelledby="questions-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="questions-heading" className="text-xl font-bold">
          Questions <span className="text-[var(--text-muted)]">({total.toLocaleString()})</span>
        </h2>
        <Link
          href="/admin/questions/new"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          New question
        </Link>
      </div>

      <form method="get" className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <label htmlFor="q" className="sr-only">
            Search questions
          </label>
          <input
            id="q"
            name="q"
            defaultValue={sp.q}
            placeholder="Search question or slug…"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          />
        </div>
        <select
          name="status"
          defaultValue={sp.status ?? ""}
          aria-label="Status"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <select
          name="subjectId"
          defaultValue={sp.subjectId ?? ""}
          aria-label="Subject"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="">All subjects</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          name="examId"
          defaultValue={sp.examId ?? ""}
          aria-label="Exam"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="">All exams</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
        >
          Filter
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No questions match these filters.</p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Questions</caption>
            <thead className="bg-[var(--surface-muted)] text-left">
              <tr>
                <th scope="col" className="p-3 font-semibold">Question</th>
                <th scope="col" className="p-3 font-semibold">Subject</th>
                <th scope="col" className="p-3 font-semibold">Status</th>
                <th scope="col" className="p-3 font-semibold">Difficulty</th>
                <th scope="col" className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((question) => (
                <tr key={question.id} className="border-t border-[var(--border)] align-top">
                  <td className="max-w-md p-3">
                    <Link
                      href={`/admin/questions/${question.id}`}
                      className="font-medium text-brand-600 hover:underline"
                    >
                      {question.stem.slice(0, 110)}
                      {question.stem.length > 110 ? "…" : ""}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">/{question.slug}</p>
                  </td>
                  <td className="p-3">{question.subjects[0]?.subject.name ?? "—"}</td>
                  <td className="p-3">
                    <Badge
                      tone={
                        question.status === "PUBLISHED"
                          ? "success"
                          : question.status === "DRAFT"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {question.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <DifficultyBadge difficulty={question.difficulty} />
                  </td>
                  <td className="p-3">
                    <QuestionRowActions
                      id={question.id}
                      status={question.status}
                      canWrite
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <Pagination
          page={page}
          totalPages={pageCount}
          buildHref={(target) => buildQuery({ page: String(target) })}
        />
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        Showing {rows.length} of {total.toLocaleString()} (page size {pageSize}).
      </p>
    </section>
  );
}
