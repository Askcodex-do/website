"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** Inline publish/unpublish and archive controls for a question row. */
export function QuestionRowActions({
  id,
  status,
}: {
  id: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  canWrite?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  const setStatus = async (next: "DRAFT" | "PUBLISHED" | "ARCHIVED") => {
    setBusy(true);
    try {
      await fetch(`/api/admin/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      startTransition(() => router.refresh());
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || pending;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <Link
        href={`/admin/questions/${id}`}
        className="rounded border border-[var(--border)] px-2 py-1 hover:bg-[var(--surface-muted)]"
      >
        Edit
      </Link>
      {status !== "PUBLISHED" ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setStatus("PUBLISHED")}
          className="rounded border border-[var(--border)] px-2 py-1 hover:bg-[var(--surface-muted)] disabled:opacity-50"
        >
          Publish
        </button>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setStatus("DRAFT")}
          className="rounded border border-[var(--border)] px-2 py-1 hover:bg-[var(--surface-muted)] disabled:opacity-50"
        >
          Unpublish
        </button>
      )}
      {status !== "ARCHIVED" ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setStatus("ARCHIVED")}
          className="rounded border border-[var(--border)] px-2 py-1 text-danger-700 hover:bg-danger-50 disabled:opacity-50"
        >
          Archive
        </button>
      ) : null}
    </div>
  );
}
