"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export interface PaperOption {
  id: string;
  name: string;
}

/** Create a previous paper. Verified status is derived from having a source. */
export function PaperForm({
  exams,
  subjects,
}: {
  exams: PaperOption[];
  subjects: PaperOption[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    year: new Date().getFullYear(),
    paperName: "",
    session: "",
    source: "",
    reference: "",
    examId: "",
    subjectId: "",
  });

  const update = (key: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/admin/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not create the paper.");
      }
      setSuccess(`Created "${form.title}".`);
      setForm((prev) => ({ ...prev, title: "", paperName: "", source: "", reference: "" }));
      startTransition(() => router.refresh());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || pending;

  return (
    <form
      onSubmit={submit}
      className="mb-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <h3 className="mb-3 font-semibold">Add a previous paper</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" htmlFor="paper-title">
          <input
            id="paper-title"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="input"
            placeholder="PPSC Lecturer English 2023"
          />
        </Field>
        <Field label="Year" htmlFor="paper-year">
          <input
            id="paper-year"
            type="number"
            min={1900}
            max={2100}
            required
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
            className="input"
          />
        </Field>
        <Field label="Paper name (optional)" htmlFor="paper-name">
          <input
            id="paper-name"
            value={form.paperName}
            onChange={(e) => update("paperName", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Session (optional)" htmlFor="paper-session">
          <input
            id="paper-session"
            value={form.session}
            onChange={(e) => update("session", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Exam" htmlFor="paper-exam">
          <select
            id="paper-exam"
            value={form.examId}
            onChange={(e) => update("examId", e.target.value)}
            className="input"
          >
            <option value="">None</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Subject" htmlFor="paper-subject">
          <select
            id="paper-subject"
            value={form.subjectId}
            onChange={(e) => update("subjectId", e.target.value)}
            className="input"
          >
            <option value="">None</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Source (marks the paper verified)" htmlFor="paper-source">
          <input
            id="paper-source"
            value={form.source}
            onChange={(e) => update("source", e.target.value)}
            className="input"
            placeholder="Official PPSC website / gazette"
          />
        </Field>
        <Field label="Reference (optional)" htmlFor="paper-reference">
          <input
            id="paper-reference"
            value={form.reference}
            onChange={(e) => update("reference", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mt-3 text-sm text-success-700">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {busy ? "Saving…" : "Add paper"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
