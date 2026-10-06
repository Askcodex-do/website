"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { value: "VERIFIED", label: "Verify" },
  { value: "PENDING_REVIEW", label: "Queue review" },
  { value: "REJECTED", label: "Reject" },
  { value: "FLAGGED", label: "Flag" },
  { value: "UNVERIFIED", label: "Reset" },
] as const;

/** Inline verification workflow control for a question in the review queue. */
export function VerificationActions({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (status: string) => {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/admin/verify?id=${encodeURIComponent(questionId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not update verification.");
      }
      startTransition(() => router.refresh());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || pending;

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => submit(option.value)}
            className={
              option.value === "VERIFIED"
                ? "rounded border border-success-500/40 px-2 py-1 text-success-700 hover:bg-success-50 disabled:opacity-50"
                : option.value === "REJECTED"
                  ? "rounded border border-danger-500/40 px-2 py-1 text-danger-700 hover:bg-danger-50 disabled:opacity-50"
                  : "rounded border border-[var(--border)] px-2 py-1 hover:bg-[var(--surface-muted)] disabled:opacity-50"
            }
          >
            {option.label}
          </button>
        ))}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-danger-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
