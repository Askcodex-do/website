"use client";

import { useState } from "react";

/** Contact form with inline validation, honeypot and rate-limit feedback. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Array<{ path: string; message: string }>>([]);
  const [sent, setSent] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setIssues([]);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, website }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        if (Array.isArray(payload.issues)) setIssues(payload.issues);
        throw new Error(payload.error ?? "Could not send your message.");
      }
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const fieldError = (field: string) =>
    issues.find((issue) => issue.path === field)?.message;

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-success-500/40 bg-success-50 p-6 text-success-700"
      >
        <p className="font-semibold">Thanks — your message has been sent.</p>
        <p className="mt-1 text-sm">
          We will get back to you at the email address you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
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
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
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
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          aria-invalid={Boolean(fieldError("subject"))}
          className={inputClass}
        />
        {fieldError("subject") ? (
          <p className="mt-1 text-sm text-danger-700">{fieldError("subject")}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(fieldError("message"))}
          className={inputClass}
        />
        {fieldError("message") ? (
          <p className="mt-1 text-sm text-danger-700">{fieldError("message")}</p>
        ) : null}
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
