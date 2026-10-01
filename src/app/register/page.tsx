import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/lib/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Create account",
  description: "Create a free account to save your quiz history and bookmarks.",
  path: "/register",
  noindex: true,
});

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthLayout
      title="Create your account"
      description="Free to use. Registration is only needed to save progress across devices."
    >
      <AuthForm mode="register" />
    </AuthLayout>
  );
}
