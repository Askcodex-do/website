import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { changePassword, updateProfile } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; passwordError?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/profile");
  const sp = await searchParams;

  return (
    <section aria-labelledby="profile-heading" className="max-w-xl space-y-8">
      <div>
        <h2 id="profile-heading" className="mb-4 text-xl font-bold">
          Profile
        </h2>
        {sp.updated ? (
          <p
            role="status"
            className="mb-3 rounded-lg bg-success-50 p-3 text-sm text-success-700"
          >
            Profile updated.
          </p>
        ) : null}
        <ProfileForm
          action={updateProfile}
          defaultName={user.name ?? ""}
          email={user.email}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold">Change password</h3>
        {sp.passwordError ? (
          <p
            role="alert"
            className="mb-3 rounded-lg bg-danger-50 p-3 text-sm text-danger-700"
          >
            Could not change your password. Check your current password and try again.
          </p>
        ) : null}
        <ProfileForm action={changePassword} mode="password" />
      </div>
    </section>
  );
}
