import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/lib/auth";
import { getGuestSessionId } from "@/lib/guest";
import { getAttemptForTaking } from "@/services/quiz";
import { PageShell } from "@/components/layout/container";
import { QuizRunner } from "@/components/quiz/quiz-runner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Taking quiz",
  description: "Answer the questions and submit to see your score.",
  path: "/quiz",
  noindex: true,
});

export default async function QuizTakingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const guestSessionId = user ? null : await getGuestSessionId();
  if (!user && !guestSessionId) notFound();

  let attempt;
  try {
    attempt = await getAttemptForTaking(id, {
      userId: user?.id ?? null,
      guestSessionId,
    });
  } catch {
    notFound();
  }

  // Completed attempts should be viewed on the results page.
  if (attempt.status !== "IN_PROGRESS") {
    redirect(`/quiz/${id}/results`);
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-1 text-xl font-bold">
          {attempt.exam?.name ?? attempt.subject?.name ?? "Practice quiz"}
        </h1>
        <p className="mb-6 text-sm text-[var(--text-muted)]">
          {attempt.totalQuestions} questions
          {attempt.timeLimitSeconds
            ? ` · ${Math.round(attempt.timeLimitSeconds / 60)} minute limit`
            : " · no time limit"}
          {attempt.negativeMarking ? " · negative marking applies" : ""}
        </p>
        <QuizRunner attempt={attempt} />
      </div>
    </PageShell>
  );
}
