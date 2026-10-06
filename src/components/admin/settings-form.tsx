"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  FeatureFlags,
  SeoSettings,
  SiteIdentity,
  SocialLinks,
} from "@/services/settings";

type Group = "site.identity" | "site.social" | "site.features" | "site.seo";
type GroupValue = SiteIdentity | SocialLinks | FeatureFlags | SeoSettings;

const FIELD_META: Record<
  Group,
  { title: string; description: string; fields: Array<{ key: string; label: string; type: "text" | "boolean" }> }
> = {
  "site.identity": {
    title: "Site identity",
    description: "Name, tagline and contact details shown across the site.",
    fields: [
      { key: "name", label: "Site name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "contactEmail", label: "Contact email", type: "text" },
      { key: "contactPhone", label: "Contact phone", type: "text" },
      { key: "address", label: "Address", type: "text" },
    ],
  },
  "site.social": {
    title: "Social links",
    description: "Leave a field blank to hide that link everywhere.",
    fields: [
      { key: "facebook", label: "Facebook URL", type: "text" },
      { key: "youtube", label: "YouTube URL", type: "text" },
      { key: "instagram", label: "Instagram URL", type: "text" },
      { key: "x", label: "X (Twitter) URL", type: "text" },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
      { key: "whatsapp", label: "WhatsApp URL", type: "text" },
    ],
  },
  "site.features": {
    title: "Features",
    description: "Feature flags that change site behaviour without a redeploy.",
    fields: [
      { key: "allowGuestQuizzes", label: "Allow guest quizzes", type: "boolean" },
      { key: "allowGuestReports", label: "Allow guest reports", type: "boolean" },
      { key: "showQuestionStats", label: "Show question statistics", type: "boolean" },
      { key: "requireEmailVerification", label: "Require email verification", type: "boolean" },
    ],
  },
  "site.seo": {
    title: "SEO",
    description: "Defaults used when generating page metadata.",
    fields: [
      { key: "defaultTitleSuffix", label: "Default title suffix", type: "text" },
      { key: "twitterHandle", label: "Twitter/X handle", type: "text" },
      { key: "googleSiteVerification", label: "Google verification token", type: "text" },
      { key: "bingSiteVerification", label: "Bing verification token", type: "text" },
    ],
  },
};

export function SettingsForm({
  group,
  initial,
}: {
  group: Group;
  initial: GroupValue;
}) {
  const meta = FIELD_META[group];
  const [values, setValues] = useState<Record<string, string | boolean>>(
    initial as unknown as Record<string, string | boolean>,
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const router = useRouter();

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("saving");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: group, value: values }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("saved");
      router.refresh();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={save}
      className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <h3 className="text-lg font-semibold">{meta.title}</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{meta.description}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {meta.fields.map((field) =>
          field.type === "boolean" ? (
            <label key={field.key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(values[field.key])}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.checked }))
                }
                className="h-4 w-4"
              />
              {field.label}
            </label>
          ) : (
            <div key={field.key}>
              <label htmlFor={`${group}-${field.key}`} className="mb-1 block text-sm font-medium">
                {field.label}
              </label>
              <input
                id={`${group}-${field.key}`}
                value={String(values[field.key] ?? "")}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
        {status === "saved" ? (
          <span role="status" className="text-sm text-success-700">
            Saved.
          </span>
        ) : null}
        {status === "error" ? (
          <span role="alert" className="text-sm text-danger-700">
            Could not save.
          </span>
        ) : null}
      </div>
    </form>
  );
}
