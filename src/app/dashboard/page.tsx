import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserStats, listUserAttempts } from "@/services/quiz";
import { formatDuration, percent } from "@/lib/utils";
import { EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const [stats, attempts] = await Promise.all([
    getUserStats(user.id),
    listUserAttempts(user.id, 5),
  ]);

  const cards = [
    { label: "Total quizzes", value: stats.totalQuizzes.toLocaleString() },
    { label: "Questions attempted", value: stats.questionsAttempted.toLocaleString() },
    { label: "Correct answers", value: stats.correct.toLocaleString() },
    { label: "Incorrect answers", value: stats.incorrect.toLocaleString() },
    { label: "Accuracy", value: `${stats.accuracy}%` },
    { label: "Average score", value: `${stats.averagePercentage}%` },
    { label: "Time practised", value: formatDuration(stats.totalTimeSeconds) },
    { label: "Skipped", value: stats.skipped.toLocaleString() },
  ];

  return (
    <div className="space-y-10">
      <section aria-labelledby="overview-stats">
        <h2 id="overview-stats" className="mb-4 text-xl font-bold">
          Your performance
        </h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <dt className="text-sm text-[var(--text-muted)]">{card.label}</dt>
              <dd className="mt-1 text-xl font-bold tabular-nums">{card.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="recent-activity">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="recent-activity" className="text-xl font-bold">
            Recent activity
          </h2>
          <ButtonLink href="/dashboard/history" variant="secondary">
            View all
          </ButtonLink>
        </div>
        {attempts.length === 0 ? (
          <EmptyState
            title="No quizzes yet"
            description="Take your first quiz to start building your history."
          action={<ButtonLink href="/quiz">Start a quiz</ButtonLink>}
          />
        ) : (
          <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]">
            {attempts.map((attempt) => (
              <li key={attempt.id}>
                <Link
                  href={`/quiz/${attempt.id}/results`}
                  className="flex flex-wrap items-center justify-between gap-2 p-4 hover:bg-[var(--surface-muted)]"
                >
                  <span className="font-medium">
                    {attempt.exam?.name ?? attempt.subject?.name ?? "Practice quiz"}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {attempt.correct}/{attempt.totalQuestions} correct ·{" "}
                    {attempt.percentage}%
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString()
                      : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceTable
          title="Subject performance"
          rows={stats.bySubject}
          emptyLabel="Take a quiz to see subject-level performance."
        />
        <PerformanceTable
          title="Exam performance"
          rows={stats.byExam}
          emptyLabel="Take an exam quiz to see exam-level performance."
        />
      </div>
    </div>
  );
}

function PerformanceTable({
  title,
  rows,
  emptyLabel,
}: {
  title: string;
  rows: Array<{
    slug: string;
    name: string;
    correct: number;
    attempted: number;
    accuracy: number;
    averagePercentage: number;
  }>;
  emptyLabel: string;
}) {
  return (
    <section aria-labelledby={`perf-${title}`}>
      <h2 id={`perf-${title}`} className="mb-3 text-lg font-bold">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">{emptyLabel}</p>
      ) : (
        <table className="w-full border-collapse overflow-hidden rounded-lg border border-[var(--border)] text-sm">
          <caption className="sr-only">{title}</caption>
          <thead className="bg-[var(--surface-muted)] text-left">
            <tr>
              <th scope="col" className="p-3 font-semibold">
                Name
              </th>
              <th scope="col" className="p-3 font-semibold">
                Attempted
              </th>
              <th scope="col" className="p-3 font-semibold">
                Accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-t border-[var(--border)]">
                <th scope="row" className="p-3 text-left font-medium">
                  {row.name}
                </th>
                <td className="p-3 tabular-nums">{row.attempted}</td>
                <td className="p-3 tabular-nums">{percent(row.correct, row.attempted)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
