"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export interface ExamOption {
  id: string;
  name: string;
}

interface SectionDraft {
  heading: string;
  body: string;
  bullets: string;
}

interface FaqDraft {
  question: string;
  answer: string;
}

interface StoredPage {
  id: string;
  examId: string | null;
  type: string;
  title: string;
  summary: string | null;
  sections: Array<{ heading: string; body: string; bullets?: string[] }> | null;
  faqs: Array<{ question: string; answer: string }> | null;
  isPublished: boolean;
}

const TYPES = [
  "OVERVIEW",
  "ELIGIBILITY",
  "SYLLABUS",
  "PATTERN",
  "SUBJECTS",
  "TOPICS",
  "STRATEGY",
  "NOTES",
  "FAQ",
  "PREPARATION",
] as const;

/** Editor for a single exam preparation page. One row per (exam, type). */
export function PrepPageForm({ exams }: { exams: ExamOption[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [examId, setExamId] = useState(exams[0]?.id ?? "");
  const [type, setType] = useState<string>("OVERVIEW");
  const [pageId, setPageId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [sections, setSections] = useState<SectionDraft[]>([
    { heading: "", body: "", bullets: "" },
  ]);
  const [faqs, setFaqs] = useState<FaqDraft[]>([]);

  // Load an existing page whenever the exam/type selection changes.
  useEffect(() => {
    if (!examId) return;
    let active = true;
    setLoading(true);
    fetch(`/api/admin/prep-pages?examId=${encodeURIComponent(examId)}`)
      .then((r) => r.json())
      .then((payload) => {
        if (!active || !payload?.ok) return;
        const match = (payload.data as StoredPage[]).find((p) => p.type === type);
        if (match) {
          setPageId(match.id);
          setTitle(match.title);
          setSummary(match.summary ?? "");
          setIsPublished(match.isPublished);
          setSections(
            (match.sections ?? []).length > 0
              ? (match.sections ?? []).map((s) => ({
                  heading: s.heading,
                  body: s.body,
                  bullets: (s.bullets ?? []).join("\n"),
                }))
              : [{ heading: "", body: "", bullets: "" }],
          );
          setFaqs(match.faqs ?? []);
        } else {
          setPageId(null);
          setTitle("");
          setSummary("");
          setIsPublished(true);
          setSections([{ heading: "", body: "", bullets: "" }]);
          setFaqs([]);
        }
      })
      .catch(() => {
        if (active) setError("Could not load preparation pages.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [examId, type]);

  const payload = useMemo(
    () => ({
      examId,
      type,
      title: title.trim(),
      summary: summary.trim(),
      isPublished,
      sortOrder: TYPES.indexOf(type as (typeof TYPES)[number]),
      sections: sections
        .filter((s) => s.heading.trim() && s.body.trim())
        .map((s) => ({
          heading: s.heading.trim(),
          body: s.body.trim(),
          bullets: s.bullets
            .split("\n")
            .map((b) => b.trim())
            .filter(Boolean),
        })),
      faqs: faqs
        .filter((f) => f.question.trim() && f.answer.trim())
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() })),
    }),
    [examId, type, title, summary, isPublished, sections, faqs],
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const url = pageId
        ? `/api/admin/prep-pages?id=${encodeURIComponent(pageId)}`
        : "/api/admin/prep-pages";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not save the page.");
      }
      setPageId(data.data.id);
      setSuccess("Preparation page saved.");
      startTransition(() => router.refresh());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || pending;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="prep-exam" className="mb-1 block text-sm font-medium">
            Exam
          </label>
          <select
            id="prep-exam"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="input"
            required
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="prep-type" className="mb-1 block text-sm font-medium">
            Page type
          </label>
          <select
            id="prep-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="prep-title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="prep-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
            placeholder="PST Eligibility Criteria"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="prep-summary" className="mb-1 block text-sm font-medium">
            Summary
          </label>
          <input
            id="prep-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <fieldset className="rounded-[var(--radius-card)] border border-[var(--border)] p-4">
        <legend className="px-1 text-sm font-semibold">Sections</legend>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="rounded-lg border border-[var(--border)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Section {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSections((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-xs text-danger-700 hover:underline"
                >
                  Remove
                </button>
              </div>
              <input
                value={section.heading}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, heading: e.target.value } : s,
                    ),
                  )
                }
                className="input mb-2"
                placeholder="Heading"
                aria-label={`Section ${index + 1} heading`}
              />
              <textarea
                value={section.body}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, body: e.target.value } : s,
                    ),
                  )
                }
                className="input mb-2"
                rows={3}
                placeholder="Body"
                aria-label={`Section ${index + 1} body`}
              />
              <textarea
                value={section.bullets}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, bullets: e.target.value } : s,
                    ),
                  )
                }
                className="input"
                rows={2}
                placeholder="Bullets, one per line"
                aria-label={`Section ${index + 1} bullets`}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setSections((prev) => [...prev, { heading: "", body: "", bullets: "" }])
          }
          className="mt-3 rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--surface-muted)]"
        >
          Add section
        </button>
      </fieldset>

      <fieldset className="rounded-[var(--radius-card)] border border-[var(--border)] p-4">
        <legend className="px-1 text-sm font-semibold">FAQs</legend>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-[var(--border)] p-3">
              <input
                value={faq.question}
                onChange={(e) =>
                  setFaqs((prev) =>
                    prev.map((f, i) =>
                      i === index ? { ...f, question: e.target.value } : f,
                    ),
                  )
                }
                className="input mb-2"
                placeholder="Question"
                aria-label={`FAQ ${index + 1} question`}
              />
              <textarea
                value={faq.answer}
                onChange={(e) =>
                  setFaqs((prev) =>
                    prev.map((f, i) => (i === index ? { ...f, answer: e.target.value } : f)),
                  )
                }
                className="input"
                rows={2}
                placeholder="Answer"
                aria-label={`FAQ ${index + 1} answer`}
              />
              <button
                type="button"
                onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== index))}
                className="mt-2 text-xs text-danger-700 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "" }])}
          className="mt-3 rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--surface-muted)]"
        >
          Add FAQ
        </button>
      </fieldset>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Published
      </label>

      {error ? (
        <p role="alert" className="text-sm text-danger-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="text-sm text-success-700">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabled || loading}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {busy ? "Saving…" : loading ? "Loading…" : "Save page"}
      </button>
    </form>
  );
}
