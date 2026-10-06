import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getSiteIdentity } from "@/services/settings";
import { MainNav, type NavLink } from "@/components/layout/main-nav";
import { SearchBox } from "@/components/layout/search-box";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { isAdmin } from "@/lib/auth/permissions";

const PRIMARY_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/exams", label: "Exams" },
  { href: "/subjects", label: "Subjects" },
  { href: "/topics", label: "Topics" },
  { href: "/mcqs", label: "MCQs" },
  { href: "/quiz", label: "Quiz" },
  { href: "/previous-papers", label: "Previous Papers" },
  { href: "/search", label: "Search" },
];

export async function SiteHeader() {
  const [user, identity] = await Promise.all([getCurrentUser(), getSiteIdentity()]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm font-black text-white"
          >
            MQ
          </span>
          <span className="hidden sm:inline">{identity.name}</span>
        </Link>

        <div className="ml-auto hidden max-w-sm flex-1 lg:block">
          <SearchBox size="sm" />
        </div>

        <nav aria-label="Account" className="ml-auto flex items-center gap-2 lg:ml-0">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
              >
                Dashboard
              </Link>
              {isAdmin(user) ? (
                <Link
                  href="/admin"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                >
                  Admin
                </Link>
              ) : null}
              <form action="/api/auth/logout" method="post" className="contents">
                <SignOutButton />
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <MainNav links={PRIMARY_LINKS} />
      </div>

      <div className="border-t border-[var(--border)] px-4 py-2 lg:hidden">
        <SearchBox size="sm" />
      </div>
    </header>
  );
}
