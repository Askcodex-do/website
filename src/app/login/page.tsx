import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/lib/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to track your quiz history, bookmarks and progress.",
  path: "/login",
  noindex: true,
});

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to track your progress. You can always practise as a guest."
    >
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
