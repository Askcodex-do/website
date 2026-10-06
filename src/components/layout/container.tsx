import { classNames } from "@/lib/class-names";
import type { ReactNode } from "react";

/** Standard page container with consistent horizontal rhythm and max width. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  } as const;
  return (
    <div className={classNames("mx-auto w-full px-4", widths[size], className)}>
      {children}
    </div>
  );
}

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("py-6 sm:py-8", className)}>
      <Container>{children}</Container>
    </div>
  );
}

/** Page header used on list and detail pages. */
export function PageHeader({
  title,
  description,
  children,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <header className="mb-6">
      {breadcrumbs}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description ? (
        <p className="mt-2 max-w-3xl text-[var(--text-muted)]">{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </header>
  );
}

/** Responsive grid used by taxonomy listings. */
export function CardGrid({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  } as const;
  return <div className={classNames("grid gap-4", cols[columns])}>{children}</div>;
}
