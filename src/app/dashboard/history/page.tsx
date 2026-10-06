import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listUserAttempts } from "@/services/quiz";
import { formatDuration } from "@/lib/utils";
import { EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function QuizHistoryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/history");

  const attempts = await listUserAttempts(user.id, 100);

  return (
    <section aria-labelledby="history-heading">
      <h2 id="history-heading" className="mb-4 text-xl font-bold">
        Quiz history
      </h2>
      {attempts.length === 0 ? (
        <EmptyState
          title="No completed quizzes"
          description="Your finished quizzes will appear here with a full answer review."
        action={<ButtonLink href="/quiz">Start a quiz</ButtonLink>}
        />
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Your completed quiz attempts</caption>
            <thead className="bg-[var(--surface-muted)] text-left">
              <tr>
                <th scope="col" className="p-3 font-semibold">Quiz</th>
                <th scope="col" className="p-3 font-semibold">Date</th>
                <th scope="col" className="p-3 font-semibold">Score</th>
                <th scope="col" className="p-3 font-semibold">Correct</th>
                <th scope="col" className="p-3 font-semibold">%</th>
                <th scope="col" className="p-3 font-semibold">Time</th>
                <th scope="col" className="p-3 font-semibold"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id} className="border-t border-[var(--border)]">
                  <th scope="row" className="p-3 text-left font-medium">
                    {attempt.exam?.name ?? attempt.subject?.name ?? "Practice quiz"}
                  </th>
                  <td className="p-3 text-[var(--text-muted)]">
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 tabular-nums">
                    {attempt.score}/{attempt.maxScore}
                  </td>
                  <td className="p-3 tabular-nums">
                    {attempt.correct}/{attempt.totalQuestions}
                  </td>
                  <td className="p-3 tabular-nums">{attempt.percentage}%</td>
                  <td className="p-3 tabular-nums">
                    {formatDuration(attempt.timeTakenSeconds ?? 0)}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/quiz/${attempt.id}/results`}
                      className="font-medium text-brand-600 hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
