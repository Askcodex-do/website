"use client";

import { useFormStatus } from "react-dom";

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

/**
 * Profile and password forms. Both submit to server actions, so validation and
 * persistence never depend on client JavaScript.
 */
export function ProfileForm({
  action,
  mode = "profile",
  defaultName,
  email,
}: {
  action: (formData: FormData) => Promise<void>;
  mode?: "profile" | "password";
  defaultName?: string;
  email?: string;
}) {
  if (mode === "password") {
    return (
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium">
            Current password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="mb-1 block text-sm font-medium">
            New password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className={inputClass}
          />
        </div>
        <SubmitButton label="Change password" />
      </form>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Display name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultName}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email-readonly" className="mb-1 block text-sm font-medium">
          Email address
        </label>
        <input
          id="email-readonly"
          type="email"
          value={email}
          readOnly
          aria-describedby="email-help"
          className={`${inputClass} bg-[var(--surface-muted)]`}
        />
        <p id="email-help" className="mt-1 text-xs text-[var(--text-muted)]">
          Your email address cannot be changed here.
        </p>
      </div>
      <SubmitButton label="Save profile" />
    </form>
  );
}
