"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Accessible search box. Submits to /search as a normal GET form. */
export function SearchBox({
  defaultValue = "",
  className,
  size = "md",
}: {
  defaultValue?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      role="search"
      action="/search"
      method="get"
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = value.trim();
        if (trimmed.length < 2) return;
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Search questions, exams, subjects and topics
      </label>
      <div className="flex items-stretch gap-1">
        <input
          id="site-search"
          type="search"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search MCQs, subjects, exams…"
          autoComplete="off"
          enterKeyHint="search"
          className={
            size === "sm"
              ? "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              : "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm"
          }
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-brand-600 px-3 text-sm font-medium text-white hover:bg-brand-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
