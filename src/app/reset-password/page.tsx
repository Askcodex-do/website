import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Set a new password",
  description: "Choose a new password for your account.",
  path: "/reset-password",
  noindex: true,
});

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthLayout title="Invalid link" description="This reset link is missing its token.">
        <p className="text-sm text-[var(--text-muted)]">
          Request a new link from the{" "}
          <Link href="/forgot-password" className="text-brand-600 hover:underline">
            forgot password
          </Link>{" "}
          page.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password" description="Choose a strong new password.">
      <AuthForm mode="reset" token={token} />
    </AuthLayout>
  );
}
