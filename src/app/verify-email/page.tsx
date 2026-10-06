import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { db } from "@/lib/db";
import { hashOneTimeToken } from "@/lib/auth/session";
import { AuthLayout } from "@/components/auth/auth-layout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Verify email",
  description: "Confirm your email address.",
  path: "/verify-email",
  noindex: true,
});

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthLayout title="Email verification" description="No verification token was supplied.">
        <p className="text-sm text-[var(--text-muted)]">
          If you followed a link from your inbox, try opening it again.
        </p>
      </AuthLayout>
    );
  }

  const record = await db.emailVerificationToken.findUnique({
    where: { tokenHash: hashOneTimeToken(token, "verify") },
  });

  const valid = Boolean(
    record && !record.usedAt && record.expiresAt.getTime() > Date.now(),
  );

  if (valid && record) {
    await db.$transaction([
      db.user.update({
        where: { id: record.userId },
        data: { emailVerifiedAt: new Date() },
      }),
      db.emailVerificationToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
    ]);
  }

  return (
    <AuthLayout
      title={valid ? "Email verified" : "Link expired"}
      description={
        valid
          ? "Thanks — your email address has been confirmed."
          : "This verification link is invalid or has already been used."
      }
    >
      <Link href="/login" className="text-brand-600 hover:underline">
        Continue to sign in →
      </Link>
    </AuthLayout>
  );
}
