import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/lib/auth";
import { getGuestSessionId } from "@/lib/guest";
import { getAttemptResults } from "@/services/quiz";
import { formatDuration } from "@/lib/utils";
import { PageShell } from "@/components/layout/container";
import { Badge } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Quiz results",
  description: "Your quiz score and detailed answer review.",
  path: "/quiz",
  noindex: true,
});

export default async function QuizResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const guestSessionId = user ? null : await getGuestSessionId();
  if (!user && !guestSessionId) notFound();

  let results;
  try {
    results = await getAttemptResults(id, {
      userId: user?.id ?? null,
      guestSessionId,
    });
  } catch {
    notFound();
  }

  // An unfinished attempt should be resumed rather than reviewed.
  if (results.status === "IN_PROGRESS") {
    redirect(`/quiz/${id}`);
  }

  const title =
    results.exam?.name ?? results.subject?.name ?? results.topic?.name ?? "Practice quiz";

  const summary = [
    { label: "Total questions", value: results.totalQuestions },
    { label: "Attempted", value: results.attempted },
    { label: "Correct", value: results.correct },
    { label: "Incorrect", value: results.incorrect },
    { label: "Skipped", value: results.skipped },
    { label: "Score", value: `${results.score} / ${results.maxScore}` },
    { label: "Percentage", value: `${results.percentage}%` },
    { label: "Time taken", value: formatDuration(results.timeTakenSeconds) },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Results — {title}</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {results.mode === "STATIC" ? "Static order" : "Random order"}
              {results.negativeMarking ? " · negative marking applied" : ""}
              {results.completedAt
                ? ` · completed ${new Date(results.completedAt).toLocaleString()}`
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/quiz">New quiz</ButtonLink>
            {user ? <ButtonLink href="/dashboard" variant="secondary">Dashboard</ButtonLink> : null}
          </div>
        </div>

        <dl className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <dt className="text-sm text-[var(--text-muted)]">{item.label}</dt>
              <dd className="mt-1 text-xl font-bold tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mb-4 text-xl font-bold">Answer review</h2>
        <ol className="space-y-4">
          {results.questions.map((question, index) => {
            const state =
              question.selectedOptionId === null
                ? { label: "Skipped", tone: "neutral" as const }
                : question.isCorrect
                  ? { label: "Correct", tone: "success" as const }
                  : { label: "Incorrect", tone: "danger" as const };

            return (
              <li
                key={question.id}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-muted)]">
                    Question {index + 1}
                  </span>
                  <Badge tone={state.tone}>
                    <span aria-hidden="true">
                      {state.tone === "success" ? "✓ " : state.tone === "danger" ? "✕ " : "– "}
                    </span>
                    {state.label}
                  </Badge>
                  {results.negativeMarking && question.marksAwarded !== 0 ? (
                    <Badge tone={question.marksAwarded > 0 ? "success" : "danger"}>
                      {question.marksAwarded > 0 ? "+" : ""}
                      {question.marksAwarded} mark
                      {Math.abs(question.marksAwarded) === 1 ? "" : "s"}
                    </Badge>
                  ) : null}
                </div>

                <h3 className="font-semibold leading-snug">{question.stem}</h3>

                <ul className="mt-3 space-y-2 text-sm">
                  {question.options.map((option) => {
                    const isCorrect = option.id === question.correctOptionId;
                    const isSelected = option.id === question.selectedOptionId;
                    return (
                      <li
                        key={option.id}
                        className={[
                          "rounded-lg border px-3 py-2",
                          isCorrect
                            ? "border-success-500 bg-success-50"
                            : isSelected
                              ? "border-danger-500 bg-danger-50"
                              : "border-[var(--border)]",
                        ].join(" ")}
                      >
                        <span className="font-medium">{option.label}.</span> {option.text}
                        {isCorrect ? (
                          <span className="ml-2 text-xs font-semibold text-success-700">
                            (correct answer)
                          </span>
                        ) : null}
                        {isSelected && !isCorrect ? (
                          <span className="ml-2 text-xs font-semibold text-danger-700">
                            (your answer)
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>

                {question.explanation ? (
                  <p className="mt-3 text-sm text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--foreground)]">
                      Explanation:{" "}
                    </span>
                    {question.explanation}
                  </p>
                ) : null}

                {question.reference || question.source ? (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--foreground)]">
                      Reference:{" "}
                    </span>
                    {[question.source, question.reference].filter(Boolean).join(" — ")}
                  </p>
                ) : null}

                <p className="mt-3 text-xs">
                  <Link
                    href={`/mcqs/${question.subjectSlug ?? "general"}/${question.slug}`}
                    className="font-medium text-brand-600 hover:underline"
                  >
                    Open question page →
                  </Link>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </PageShell>
  );
}
