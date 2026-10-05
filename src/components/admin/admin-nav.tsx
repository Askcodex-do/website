"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/lib/class-names";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/verification", label: "Verification" },
  { href: "/admin/duplicates", label: "Duplicates" },
  { href: "/admin/import", label: "Bulk import" },
  { href: "/admin/taxonomy", label: "Taxonomy" },
  { href: "/admin/papers", label: "Previous papers" },
  { href: "/admin/prep-pages", label: "Preparation" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="lg:sticky lg:top-20 lg:self-start">
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={classNames(
                  "block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-brand-600 text-white"
                    : "hover:bg-[var(--surface-muted)]",
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
