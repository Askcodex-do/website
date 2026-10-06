import Link from "next/link";
import { classNames } from "@/lib/class-names";
import type { ReactNode } from "react";

/** Lightweight, accessible UI primitives shared across the site. */

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Tag
      className={classNames(
        "rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  title,
  description,
  action,
  level = 2,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  level?: 1 | 2 | 3;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <Heading className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </Heading>
        {description ? (
          <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

const badgeTones = {
  neutral: "bg-[var(--surface-muted)] text-[var(--text-muted)]",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-50 text-success-700",
  danger: "bg-danger-50 text-danger-700",
  warn: "bg-warn-50 text-warn-700",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof badgeTones;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const tone =
    difficulty === "EASY" ? "success" : difficulty === "HARD" ? "danger" : "warn";
  return (
    <Badge tone={tone}>
      <span aria-hidden="true" className="mr-1">
        {difficulty === "EASY" ? "●" : difficulty === "HARD" ? "◆" : "◐"}
      </span>
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </Badge>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
      <p className="text-base font-semibold">{title}</p>
      {description ? (
        <p className="mx-auto mt-1 max-w-md text-sm text-[var(--text-muted)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--text-muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="font-medium text-[var(--text)]">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="hover:text-brand-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Alert({
  tone = "brand",
  title,
  children,
  role,
}: {
  tone?: "brand" | "success" | "danger" | "warn";
  title?: string;
  children: ReactNode;
  role?: "alert" | "status";
}) {
  const tones = {
    brand: "border-brand-200 bg-brand-50 text-brand-800",
    success: "border-success-500/30 bg-success-50 text-success-700",
    danger: "border-danger-500/30 bg-danger-50 text-danger-700",
    warn: "border-warn-500/30 bg-warn-50 text-warn-700",
  } as const;
  return (
    <div
      role={role ?? "status"}
      className={classNames("rounded-lg border p-3 text-sm", tones[tone])}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      <div className={title ? "mt-0.5" : undefined}>{children}</div>
    </div>
  );
}
