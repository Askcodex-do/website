import Link from "next/link";
import { Badge, DifficultyBadge } from "@/components/ui";
import type { PublicQuestion } from "@/services/types";

/** Compact, link-only summary of a question used in listings. */
export function McqCard({
  question,
  showSubject = false,
}: {
  question: PublicQuestion;
  showSubject?: boolean;
}) {
  const href = `/mcqs/${question.subject?.slug ?? "general"}/${question.slug}`;
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-md">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={question.difficulty} />
        {showSubject && question.subject ? (
          <Badge tone="brand">{question.subject.name}</Badge>
        ) : null}
        {question.year ? <Badge>Year {question.year}</Badge> : null}
      </div>
      <h3 className="text-base font-semibold leading-snug">
        <Link
          href={href}
          className="hover:text-brand-700 hover:underline focus-visible:underline"
        >
          {question.stem}
        </Link>
      </h3>
      <ul className="mt-3 space-y-1 text-sm text-[var(--text-muted)]">
        {question.options.map((option) => (
          <li key={option.id} className="flex gap-2">
            <span className="font-medium">{option.label}.</span>
            <span className="line-clamp-1">{option.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between pt-2 text-xs text-[var(--text-muted)]">
        <span>
          {question.topic ? question.topic.name : "General"}
        </span>
        <Link
          href={href}
          className="font-medium text-brand-600 hover:underline"
        >
          View question →
        </Link>
      </div>
    </article>
  );
}
