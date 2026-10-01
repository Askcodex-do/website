"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { EducationLevelSummary, ExamSummary, SubjectSummary, TopicSummary } from "@/services/types";

interface BuilderOption {
  slug: string;
  name: string;
}

/** Quiz builder. All selection logic is mirrored server-side by the engine. */
export function QuizBuilder({
  exams,
  subjects,
  topics,
  levels,
  initial,
}: {
  exams: ExamSummary[];
  subjects: SubjectSummary[];
  topics: TopicSummary[];
  levels: EducationLevelSummary[];
  initial: {
    exam?: string;
    subject?: string;
    topic?: string;
    educationLevel?: string;
  };
}) {
  const router = useRouter();
  const [exam, setExam] = useState(initial.exam ?? "");
  const [subject, setSubject] = useState(initial.subject ?? "");
  const [topic, setTopic] = useState(initial.topic ?? "");
  const [educationLevel, setEducationLevel] = useState(initial.educationLevel ?? "");
  const [difficulty, setDifficulty] = useState("");
  const [count, setCount] = useState(20);
  const [mode, setMode] = useState<"" | "static" | "random">("");
  const [timed, setTimed] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedExam = exams.find((e) => e.slug === exam);

  const availableSubjects: BuilderOption[] = useMemo(() => {
    if (!selectedExam) return subjects;
    // Prefer the exam's configured subjects when available.
    return subjects;
  }, [selectedExam, subjects]);

  const availableTopics: BuilderOption[] = useMemo(() => {
    if (!subject) return topics;
    return topics.filter((t) => t.subject.slug === subject);
  }, [subject, topics]);

  async function start() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: exam || undefined,
          subject: subject || undefined,
          topic: topic || undefined,
          educationLevel: educationLevel || undefined,
          difficulty: difficulty || undefined,
          count,
          mode: mode || undefined,
          timeLimitSeconds: timed ? undefined : null,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not start the quiz.");
      }
      router.push(`/quiz/${payload.data.attemptId}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const selectClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void start();
      }}
      className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Exam" htmlFor="quiz-exam">
          <select
            id="quiz-exam"
            value={exam}
            onChange={(event) => {
              setExam(event.target.value);
              setSubject("");
              setTopic("");
            }}
            className={selectClass}
          >
            <option value="">Any exam</option>
            {exams.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name} ({e.questionCount ?? 0})
              </option>
            ))}
          </select>
        </Field>

        <Field label="Subject" htmlFor="quiz-subject">
          <select
            id="quiz-subject"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
              setTopic("");
            }}
            className={selectClass}
          >
            <option value="">Any subject</option>
            {availableSubjects.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Topic" htmlFor="quiz-topic">
          <select
            id="quiz-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className={selectClass}
            disabled={availableTopics.length === 0}
          >
            <option value="">Any topic</option>
            {availableTopics.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Education level" htmlFor="quiz-level">
          <select
            id="quiz-level"
            value={educationLevel}
            onChange={(event) => setEducationLevel(event.target.value)}
            className={selectClass}
          >
            <option value="">Any level</option>
            {levels.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Difficulty" htmlFor="quiz-difficulty">
          <select
            id="quiz-difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className={selectClass}
          >
            <option value="">Any difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </Field>

        <Field label="Question order" htmlFor="quiz-mode">
          <select
            id="quiz-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as typeof mode)}
            className={selectClass}
          >
            <option value="">
              Use exam default{selectedExam ? ` (${selectedExam.mode.toLowerCase()})` : ""}
            </option>
            <option value="static">Static (deterministic order)</option>
            <option value="random">Random (shuffled)</option>
          </select>
        </Field>

        <Field label={`Number of questions: ${count}`} htmlFor="quiz-count">
          <input
            id="quiz-count"
            type="range"
            min={5}
            max={100}
            step={5}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-full accent-[var(--color-brand-600)]"
          />
        </Field>

        <Field label="Time limit" htmlFor="quiz-timed">
          <label className="flex items-center gap-2 text-sm">
            <input
              id="quiz-timed"
              type="checkbox"
              checked={timed}
              onChange={(event) => setTimed(event.target.checked)}
              className="h-4 w-4 accent-[var(--color-brand-600)]"
            />
            Use the exam&apos;s configured time limit
          </label>
        </Field>
      </div>

      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Preparing quiz…" : "Start quiz"}
        </button>
        <p className="text-sm text-[var(--text-muted)]">
          No account needed — your progress is saved on this device.
        </p>
      </div>
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
