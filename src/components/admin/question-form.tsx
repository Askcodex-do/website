"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { classNames } from "@/lib/class-names";

export interface TaxonomyOption {
  id: string;
  name: string;
  parentName?: string;
}

export interface QuestionFormValues {
  id?: string;
  stem: string;
  slug: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
  reference: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  subjectId: string;
  topicId: string;
  examIds: string[];
  educationLevelIds: string[];
  year: string;
  province: string;
  tags: string;
}

const EMPTY: QuestionFormValues = {
  stem: "",
  slug: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  explanation: "",
  source: "",
  reference: "",
  difficulty: "MEDIUM",
  status: "DRAFT",
  subjectId: "",
  topicId: "",
  examIds: [],
  educationLevelIds: [],
  year: "",
  province: "",
  tags: "",
};

export function QuestionForm({
  subjects,
  topics,
  exams,
  levels,
  initial,
}: {
  subjects: TaxonomyOption[];
  topics: TaxonomyOption[];
  exams: TaxonomyOption[];
  levels: TaxonomyOption[];
  initial?: Partial<QuestionFormValues> & { id?: string };
}) {
  const router = useRouter();
  const [values, setValues] = useState<QuestionFormValues>({
    ...EMPTY,
    ...initial,
    options: initial?.options ?? EMPTY.options,
    examIds: initial?.examIds ?? [],
    educationLevelIds: initial?.educationLevelIds ?? [],
    year: initial?.year ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(values.id);
  const availableTopics = topics.filter((topic) => {
    if (!values.subjectId) return true;
    return topic.parentName === values.subjectId || topic.parentName === undefined;
  });

  const update = <K extends keyof QuestionFormValues>(
    key: K,
    value: QuestionFormValues[K],
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const setOption = (index: number, text: string) => {
    const next = [...values.options];
    next[index] = text;
    update("options", next);
  };

  const toggle = (key: "examIds" | "educationLevelIds", id: string) => {
    const list = values[key];
    update(key, list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIssues([]);
    setSaving(true);
    try {
      const payload = {
        ...values,
        year: values.year ? Number(values.year) : undefined,
      };
      const response = await fetch(
        isEdit ? `/api/admin/questions/${values.id}` : "/api/admin/questions",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await response.json();
      if (!response.ok || !json.ok) {
        setError(json.error ?? "Could not save the question.");
        if (Array.isArray(json.issues)) {
          setIssues(json.issues.map((i: { path: string; message: string }) => `${i.path}: ${i.message}`));
        }
        return;
      }
      router.push(`/admin/questions/${json.data.id}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm focus:border-brand-500";

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {error ? (
        <div role="alert" className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
          {issues.length > 0 ? (
            <ul className="mt-2 list-disc pl-5">
              {issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor="stem" className="mb-1 block text-sm font-medium">
          Question text <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="stem"
          required
          rows={3}
          value={values.stem}
          onChange={(e) => update("stem", e.target.value)}
          className={fieldClass}
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">
          Options — select the correct one
        </legend>
        <div className="space-y-2">
          {values.options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctIndex"
                checked={values.correctIndex === index}
                onChange={() => update("correctIndex", index)}
                aria-label={`Mark option ${String.fromCharCode(65 + index)} as correct`}
                className="h-4 w-4"
              />
              <span aria-hidden="true" className="w-4 font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <input
                value={option}
                onChange={(e) => setOption(index, e.target.value)}
                aria-label={`Option ${String.fromCharCode(65 + index)}`}
                className={fieldClass}
              />
            </div>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="subjectId" className="mb-1 block text-sm font-medium">
            Subject <span aria-hidden="true">*</span>
          </label>
          <select
            id="subjectId"
            required
            value={values.subjectId}
            onChange={(e) => update("subjectId", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topicId" className="mb-1 block text-sm font-medium">
            Topic <span aria-hidden="true">*</span>
          </label>
          <select
            id="topicId"
            required
            value={values.topicId}
            onChange={(e) => update("topicId", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a topic</option>
            {availableTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty" className="mb-1 block text-sm font-medium">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={values.difficulty}
            onChange={(e) => update("difficulty", e.target.value as QuestionFormValues["difficulty"])}
            className={fieldClass}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(e) => update("status", e.target.value as QuestionFormValues["status"])}
            className={fieldClass}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div>
          <label htmlFor="year" className="mb-1 block text-sm font-medium">
            Year
          </label>
          <input
            id="year"
            inputMode="numeric"
            value={values.year}
            onChange={(e) => update("year", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="province" className="mb-1 block text-sm font-medium">
            Province / region
          </label>
          <input
            id="province"
            value={values.province}
            onChange={(e) => update("province", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Exams</legend>
        <div className="flex flex-wrap gap-3">
          {exams.map((exam) => (
            <label key={exam.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={values.examIds.includes(exam.id)}
                onChange={() => toggle("examIds", exam.id)}
                className="h-4 w-4"
              />
              {exam.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Education levels</legend>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <label key={level.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={values.educationLevelIds.includes(level.id)}
                onChange={() => toggle("educationLevelIds", level.id)}
                className="h-4 w-4"
              />
              {level.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="explanation" className="mb-1 block text-sm font-medium">
            Explanation
          </label>
          <textarea
            id="explanation"
            rows={3}
            value={values.explanation}
            onChange={(e) => update("explanation", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="source" className="mb-1 block text-sm font-medium">
              Source
            </label>
            <input
              id="source"
              value={values.source}
              onChange={(e) => update("source", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="reference" className="mb-1 block text-sm font-medium">
              Reference
            </label>
            <input
              id="reference"
              value={values.reference}
              onChange={(e) => update("reference", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tags" className="mb-1 block text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            value={values.tags}
            onChange={(e) => update("tags", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            Slug (optional — generated from the question)
          </label>
          <input
            id="slug"
            value={values.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className={classNames(
            "rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700",
            saving && "opacity-60",
          )}
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create question"}
        </button>
      </div>
    </form>
  );
}
