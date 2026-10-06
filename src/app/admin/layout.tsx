import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { requireAdmin } from "@/lib/admin-guard";
import { PageShell } from "@/components/layout/container";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Administration area.",
  path: "/admin",
  noindex: true,
});

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <PageShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {user.name ?? user.email} · {user.role.name}
          </p>
        </div>
        <SignOutButton label="Sign out" />
      </div>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
        <AdminNav />
        <div className="mt-6 min-w-0 lg:mt-0">{children}</div>
      </div>
    </PageShell>
  );
}
