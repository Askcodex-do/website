"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { classNames } from "@/lib/class-names";

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Responsive primary navigation. Renders a horizontal bar on large screens and
 * an accessible disclosure menu on small screens.
 */
export function MainNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={classNames(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">
          {open ? "Close main menu" : "Open main menu"}
        </span>
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        <span aria-hidden="true">Menu</span>
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute left-0 right-0 top-full z-40 border-b border-[var(--border)] bg-[var(--surface)] shadow-lg lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col p-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={classNames(
                    "block rounded-lg px-3 py-3 text-base font-medium",
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-[var(--text)] hover:bg-[var(--surface-muted)]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
