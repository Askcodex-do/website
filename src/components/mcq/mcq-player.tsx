"use client";

import { useEffect, useRef, useState } from "react";
import type { PublicQuestion } from "@/services/types";

interface AnswerResult {
  correctOptionId: string | null;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  explanation: string | null;
  reference: string | null;
  source: string | null;
}

/**
 * Single-question practice player.
 *
 * The correct answer is never present in the initial payload — it is fetched
 * from the server only after the user submits. Result state is conveyed with
 * text and icons, not colour alone.
 */
export function McqPlayer({
  question,
  initialAnswered = false,
  nextHref,
}: {
  question: PublicQuestion;
  initialAnswered?: boolean;
  nextHref?: string | null;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Move focus to the result once it appears so screen readers announce it.
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.focus();
    }
  }, [result]);

  async function submit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/questions/${question.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId: selected }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not submit your answer.");
      }
      setResult(payload.data as AnswerResult);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const answered = result !== null;

  return (
    <div>
      <fieldset disabled={answered || submitting} className="space-y-3">
        <legend className="sr-only">Choose one answer</legend>
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = answered && result?.correctOptionId === option.id;
          const isWrongChoice =
            answered && isSelected && result?.correctOptionId !== option.id;

          return (
            <label
              key={option.id}
              className={[
                "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                isCorrect
                  ? "border-success-500 bg-success-50"
                  : isWrongChoice
                    ? "border-danger-500 bg-danger-50"
                    : isSelected
                      ? "border-brand-500 bg-brand-50"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-brand-300",
                answered ? "cursor-default" : "",
              ].join(" ")}
            >
              <input
                type="radio"
                name="option"
                value={option.id}
                checked={isSelected}
                onChange={() => setSelected(option.id)}
                className="mt-1 h-4 w-4 accent-[var(--color-brand-600)]"
              />
              <span className="flex-1">
                <span className="font-semibold">{option.label}.</span>{" "}
                <span>{option.text}</span>
              </span>
              {isCorrect ? (
                <span className="shrink-0 text-sm font-semibold text-success-700">
                  <span aria-hidden="true">✓ </span>Correct
                </span>
              ) : null}
              {isWrongChoice ? (
                <span className="shrink-0 text-sm font-semibold text-danger-700">
                  <span aria-hidden="true">✕ </span>Your answer
                </span>
              ) : null}
            </label>
          );
        })}
      </fieldset>

      {error ? (
        <p role="alert" className="mt-3 rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}

      {!answered ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={submit}
            disabled={!selected || submitting}
            className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Checking…" : "Submit answer"}
          </button>
        </div>
      ) : null}

      {answered ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="region"
          aria-label="Answer result"
          className="mt-5 space-y-4 outline-none"
        >
          <div
            className={[
              "rounded-lg border p-4",
              result?.isCorrect
                ? "border-success-500/40 bg-success-50"
                : "border-danger-500/40 bg-danger-50",
            ].join(" ")}
          >
            <p
              className={[
                "text-base font-bold",
                result?.isCorrect ? "text-success-700" : "text-danger-700",
              ].join(" ")}
            >
              <span aria-hidden="true">{result?.isCorrect ? "✓ " : "✕ "}</span>
              {result?.isCorrect
                ? "Correct!"
                : result?.selectedOptionId === null
                  ? "Not answered"
                  : "Incorrect"}
            </p>
            <p className="mt-1 text-sm">
              Correct answer:{" "}
              <strong>
                {question.options.find((o) => o.id === result?.correctOptionId)?.label}.
                {" "}
                {question.options.find((o) => o.id === result?.correctOptionId)?.text}
              </strong>
            </p>
          </div>

          {result?.explanation ? (
            <section aria-labelledby="explanation-heading">
              <h2 id="explanation-heading" className="text-sm font-semibold">
                Explanation
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {result.explanation}
              </p>
            </section>
          ) : null}

          {result?.reference || result?.source ? (
            <section aria-labelledby="reference-heading">
              <h2 id="reference-heading" className="text-sm font-semibold">
                Reference
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {[result?.source, result?.reference].filter(Boolean).join(" — ")}
              </p>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {nextHref ? (
              <a
                href={nextHref}
                className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700"
              >
                Next question →
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setResult(null);
              }}
              className="rounded-lg border border-[var(--border)] px-5 py-2.5 font-medium hover:bg-[var(--surface-muted)]"
            >
              Try again
            </button>
          </div>
        </div>
      ) : null}

      {initialAnswered ? null : (
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          The correct answer and explanation are revealed after you submit.
        </p>
      )}
    </div>
  );
}
