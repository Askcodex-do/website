import Link from "next/link";
import { classNames } from "@/lib/class-names";

/**
 * Accessible pagination. Renders links (not buttons) so pages are crawlable and
 * work without JavaScript.
 */
export function Pagination({
  page,
  totalPages,
  buildHref,
  label = "Pagination",
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  label?: string;
}) {
  if (totalPages <= 1) return null;

  const windowSize = 2;
  const start = Math.max(1, page - windowSize);
  const end = Math.min(totalPages, page + windowSize);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav aria-label={label} className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <PageLink href={buildHref(page - 1)} rel="prev">
          ← Previous
        </PageLink>
      ) : (
        <span className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-muted)] opacity-60">
          ← Previous
        </span>
      )}

      {start > 1 ? (
        <>
          <PageLink href={buildHref(1)}>1</PageLink>
          {start > 2 ? <span aria-hidden="true">…</span> : null}
        </>
      ) : null}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          aria-current={p === page ? "page" : undefined}
          className={classNames(
            "rounded-lg border px-3 py-2 text-sm font-medium",
            p === page
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]",
          )}
        >
          {p}
        </Link>
      ))}

      {end < totalPages ? (
        <>
          {end < totalPages - 1 ? <span aria-hidden="true">…</span> : null}
          <PageLink href={buildHref(totalPages)}>{totalPages}</PageLink>
        </>
      ) : null}

      {page < totalPages ? (
        <PageLink href={buildHref(page + 1)} rel="next">
          Next →
        </PageLink>
      ) : (
        <span className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-muted)] opacity-60">
          Next →
        </span>
      )}
    </nav>
  );
}

function PageLink({
  href,
  children,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      rel={rel}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
    >
      {children}
    </Link>
  );
}
