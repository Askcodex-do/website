"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AttemptForTaking } from "@/services/quiz";

/**
 * Quiz runner.
 *
 * Answers are sent to the server one at a time and graded there; this component
 * never sees or computes a correct answer. The timer is advisory — the server
 * clamps recorded time to the configured limit.
 */
export function QuizRunner({ attempt }: { attempt: AttemptForTaking }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const question of attempt.questions) {
      if (question.selectedOptionId) initial[question.id] = question.selectedOptionId;
    }
    return initial;
  });
  const [submitting, setSubmitting] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = attempt.questions.length;
  const current = attempt.questions[index];
  const answeredCount = Object.keys(answers).length;

  const startedAt = useMemo(
    () => new Date(attempt.startedAt).getTime(),
    [attempt.startedAt],
  );
  const deadline =
    attempt.timeLimitSeconds !== null ? startedAt + attempt.timeLimitSeconds * 1000 : null;
  const [remaining, setRemaining] = useState<number | null>(() =>
    deadline ? Math.max(0, Math.round((deadline - Date.now()) / 1000)) : null,
  );
  const finalizeRef = useRef<() => Promise<void>>(async () => {});

  const finalize = useCallback(async () => {
    setFinalizing(true);
    setError(null);
    try {
      const response = await fetch(`/api/quiz/${attempt.id}/finalize`, {
        method: "POST",
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not finish the quiz.");
      }
      router.push(`/quiz/${attempt.id}/results`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setFinalizing(false);
    }
  }, [attempt.id, router]);

  finalizeRef.current = finalize;

  // Countdown; auto-submit when time runs out.
  useEffect(() => {
    if (deadline === null) return;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        clearInterval(timer);
        void finalizeRef.current();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  async function select(optionId: string) {
    if (!current) return;
    const previous = answers[current.id];
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
    setSubmitting(true);
    try {
      const response = await fetch(
        `/api/quiz/${attempt.id}/answer?questionId=${encodeURIComponent(current.id)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ optionId }),
        },
      );
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not save your answer.");
      }
    } catch (caught) {
      // Roll back the optimistic selection so the UI matches server state.
      setAnswers((prev) => {
        const next = { ...prev };
        if (previous) next[current.id] = previous;
        else delete next[current.id];
        return next;
      });
      setError(caught instanceof Error ? caught.message : "Could not save your answer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!current) {
    return <p>This quiz has no questions.</p>;
  }

  const formatted =
    remaining !== null
      ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
      : null;
  const lowTime = remaining !== null && remaining <= 60;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm font-medium">
          Question {index + 1} of {total}
          <span className="ml-2 text-[var(--text-muted)]">{answeredCount} answered</span>
        </p>
        {formatted ? (
          <p
            role="timer"
            aria-live={lowTime ? "assertive" : "off"}
            className={[
              "rounded-lg px-3 py-1 text-sm font-semibold tabular-nums",
              lowTime ? "bg-danger-50 text-danger-700" : "bg-[var(--surface-muted)]",
            ].join(" ")}
          >
            <span className="sr-only">Time remaining: </span>
            {formatted}
          </p>
        ) : null}
        <button
          type="button"
          onClick={finalize}
          disabled={finalizing}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-60"
        >
          {finalizing ? "Finishing…" : "Finish quiz"}
        </button>
      </div>

      <fieldset disabled={submitting}>
        <legend className="text-lg font-semibold leading-snug">{current.stem}</legend>
        <div className="mt-4 space-y-3">
          {current.options.map((option) => {
            const selected = answers[current.id] === option.id;
            return (
              <label
                key={option.id}
                className={[
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-brand-300",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name={`q-${current.id}`}
                  value={option.id}
                  checked={selected}
                  onChange={() => select(option.id)}
                  className="mt-1 h-4 w-4 accent-[var(--color-brand-600)]"
                />
                <span>
                  <span className="font-semibold">{option.label}.</span>{" "}
                  <span>{option.text}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          disabled={index === total - 1}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      <nav aria-label="Question navigation" className="mt-6">
        <p className="mb-2 text-sm font-medium">Jump to question</p>
        <ul className="flex flex-wrap gap-2">
          {attempt.questions.map((question, i) => {
            const isAnswered = Boolean(answers[question.id]);
            const isCurrent = i === index;
            return (
              <li key={question.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={isCurrent ? "true" : undefined}
                  aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}`}
                  className={[
                    "h-9 w-9 rounded-lg border text-sm font-medium",
                    isCurrent
                      ? "border-brand-600 bg-brand-600 text-white"
                      : isAnswered
                        ? "border-success-500 bg-success-50 text-success-700"
                        : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]",
                  ].join(" ")}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Green numbers indicate answered questions; the current question is
          highlighted.
        </p>
      </nav>
    </div>
  );
}
