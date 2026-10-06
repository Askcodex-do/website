"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/lib/class-names";

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/quiz", label: "Take a quiz" },
  { href: "/dashboard/history", label: "Quiz history" },
  { href: "/dashboard/saved", label: "Saved questions" },
  { href: "/dashboard/liked", label: "Liked questions" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="lg:sticky lg:top-20 lg:self-start">
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {LINKS.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={classNames(
                  "block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
                  active ? "bg-brand-600 text-white" : "hover:bg-[var(--surface-muted)]",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
