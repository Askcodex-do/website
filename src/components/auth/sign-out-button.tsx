"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { classNames } from "@/lib/class-names";

/**
 * Sign-out control.
 *
 * Calls the logout endpoint (which revokes the session server-side and clears
 * the cookie), then hard-navigates to the home page. A full document navigation
 * — rather than a client-side route change — discards every cached server
 * component and in-memory client state, so no authenticated content can linger
 * in the UI or reappear on refresh/back.
 */
export function SignOutButton({
  className,
  label = "Sign out",
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
    } catch {
      // Even if the request fails, still send the user away from protected UI.
    } finally {
      router.replace("/");
      router.refresh();
      // Full reload guarantees the router cache is dropped.
      window.location.assign("/");
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={busy}
      className={classNames(
        className ??
          "rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]",
        "disabled:opacity-60",
      )}
    >
      {busy ? "Signing out…" : label}
    </button>
  );
}
