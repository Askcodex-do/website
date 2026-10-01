"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Kind = "report" | "message" | "user-role" | "user-status";

/**
 * Generic moderation control. Renders a labelled select plus an Apply button and
 * posts to /api/admin/moderate. Used by reports, messages and users.
 */
export function ModerationSelect({
  kind,
  id,
  label,
  current,
  options,
  field = "status",
}: {
  kind: Kind;
  id: string;
  label: string;
  current: string;
  options: Array<{ value: string; label: string }>;
  field?: "status" | "roleKey";
}) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [busy, setBusy] = useState(false);
  const [pending, startTransition] = useTransition();

  const apply = async () => {
    setBusy(true);
    try {
      await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id, [field]: value }),
      });
      startTransition(() => router.refresh());
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={`${kind}-${id}`}>
        {label}
      </label>
      <select
        id={`${kind}-${id}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={apply}
        disabled={busy || pending || value === current}
        className="rounded border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--surface-muted)] disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
}
