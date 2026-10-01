import { Suspense } from "react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

/** Centered card layout shared by all authentication pages. */
export function AuthLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Container size="narrow" className="py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description ? (
            <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
          ) : null}
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm">Loading…</p>}>{children}</Suspense>
          </div>
        </div>
      </div>
    </Container>
  );
}
