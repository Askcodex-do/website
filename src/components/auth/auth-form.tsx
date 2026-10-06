"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Mode = "login" | "register" | "forgot" | "reset";

/**
 * Shared authentication form. Posts to the JSON API and surfaces field-level
 * validation errors returned by the server.
 */
export function AuthForm({ mode, token }: { mode: Mode; token?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Array<{ path: string; message: string }>>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const endpoints: Record<Mode, string> = {
    login: "/api/auth/login",
    register: "/api/auth/register",
    forgot: "/api/auth/forgot-password",
    reset: "/api/auth/reset-password",
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setIssues([]);
    setSuccess(null);

    const body: Record<string, unknown> =
      mode === "login"
        ? { email, password }
        : mode === "register"
          ? { name, email, password }
          : mode === "forgot"
            ? { email }
            : { token, password };

    try {
      const response = await fetch(endpoints[mode], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        if (Array.isArray(payload.issues)) setIssues(payload.issues);
        throw new Error(payload.error ?? "Something went wrong.");
      }

      if (mode === "login" || mode === "register") {
        router.push(next);
        router.refresh();
        return;
      }
      if (mode === "forgot") {
        setSuccess(payload.data.message as string);
      } else {
        setSuccess("Your password has been reset. You can now sign in.");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const fieldError = (field: string) =>
    issues.find((issue) => issue.path === field)?.message;

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {mode === "register" ? (
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(fieldError("name"))}
            className={inputClass}
          />
          {fieldError("name") ? (
            <p className="mt-1 text-sm text-danger-700">{fieldError("name")}</p>
          ) : null}
        </div>
      ) : null}

      {mode !== "reset" ? (
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(fieldError("email"))}
            className={inputClass}
          />
          {fieldError("email") ? (
            <p className="mt-1 text-sm text-danger-700">{fieldError("email")}</p>
          ) : null}
        </div>
      ) : null}

      {mode !== "forgot" ? (
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            {mode === "reset" ? "New password" : "Password"}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldError("password"))}
            aria-describedby={mode === "register" ? "password-hint" : undefined}
            className={inputClass}
          />
          {mode === "register" ? (
            <p id="password-hint" className="mt-1 text-xs text-[var(--text-muted)]">
              At least 8 characters, including a letter and a number.
            </p>
          ) : null}
          {fieldError("password") ? (
            <p className="mt-1 text-sm text-danger-700">{fieldError("password")}</p>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="rounded-lg bg-success-50 p-3 text-sm text-success-700">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {busy
          ? "Please wait…"
          : mode === "login"
            ? "Sign in"
            : mode === "register"
              ? "Create account"
              : mode === "forgot"
                ? "Send reset link"
                : "Reset password"}
      </button>

      <div className="space-y-1 text-center text-sm text-[var(--text-muted)]">
        {mode === "login" ? (
          <>
            <p>
              <Link href="/forgot-password" className="text-brand-600 hover:underline">
                Forgot your password?
              </Link>
            </p>
            <p>
              No account?{" "}
              <Link href="/register" className="text-brand-600 hover:underline">
                Create one
              </Link>
            </p>
          </>
        ) : null}
        {mode === "register" ? (
          <p>
            Already registered?{" "}
            <Link href="/login" className="text-brand-600 hover:underline">
              Sign in
            </Link>
          </p>
        ) : null}
        {mode === "forgot" || mode === "reset" ? (
          <p>
            <Link href="/login" className="text-brand-600 hover:underline">
              ← Back to sign in
            </Link>
          </p>
        ) : null}
      </div>
    </form>
  );
}
