import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Forgot password",
  description: "Request a password reset link.",
  path: "/forgot-password",
  noindex: true,
});

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email and we'll send a reset link if an account exists."
    >
      <AuthForm mode="forgot" />
    </AuthLayout>
  );
}
