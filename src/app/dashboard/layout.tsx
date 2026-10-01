import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { PageShell } from "@/components/layout/container";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  return (
    <PageShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Signed in as {user.name ?? user.email}
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
        <DashboardNav />
        <div className="mt-6 min-w-0 lg:mt-0">{children}</div>
      </div>
    </PageShell>
  );
}
