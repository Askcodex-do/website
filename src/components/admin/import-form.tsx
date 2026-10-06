"use client";

import { useState } from "react";

// Column names are passed in as a prop so this client component never imports
// the server-only bulk-import module.

interface ImportError {
  rowNumber: number;
  field?: string;
  message: string;
}

interface PreviewResult {
  mode: "preview";
  totalRows: number;
  validCount: number;
  duplicateInFile: number;
  duplicateInDatabase: number;
  errors: ImportError[];
  sample: Array<{
    rowNumber: number;
    question: string;
    subject: string;
    topic: string;
    difficulty: string;
  }>;
}

interface CommitResult {
  mode: "commit";
  inserted: number;
  skipped: number;
  totalRows: number;
  errors: ImportError[];
}

export function ImportForm({ columns }: { columns: readonly string[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [result, setResult] = useState<CommitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (mode: "preview" | "commit") => {
    if (!file) {
      setError("Choose a CSV or Excel file first.");
      return;
    }
    setBusy(true);
    setError(null);
    if (mode === "preview") setResult(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("mode", mode);
      const response = await fetch("/api/admin/import", { method: "POST", body });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        setError(json.error ?? "Import failed.");
        return;
      }
      if (mode === "preview") setPreview(json.data as PreviewResult);
      else {
        setResult(json.data as CommitResult);
        setPreview(null);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4">
        <label htmlFor="import-file" className="mb-2 block text-sm font-medium">
          CSV or Excel file
        </label>
        <input
          id="import-file"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setPreview(null);
            setResult(null);
          }}
          className="block w-full text-sm"
        />
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Expected columns: {columns.join(", ")}
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => upload("preview")}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-50"
          >
            {busy ? "Working…" : "Validate & preview"}
          </button>
          <button
            type="button"
            disabled={busy || !preview || preview.validCount === 0}
            onClick={() => upload("commit")}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Import {preview ? preview.validCount : 0} valid rows
          </button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </p>
      ) : null}

      {result ? (
        <div role="status" className="rounded-lg bg-success-50 p-4 text-sm text-success-700">
          Import complete — {result.inserted} inserted, {result.skipped} skipped of{" "}
          {result.totalRows} rows.
        </div>
      ) : null}

      {preview ? (
        <div className="space-y-4">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Rows read" value={preview.totalRows} />
            <Stat label="Valid" value={preview.validCount} />
            <Stat label="Duplicates in file" value={preview.duplicateInFile} />
            <Stat label="Already in database" value={preview.duplicateInDatabase} />
          </dl>

          {preview.sample.length > 0 ? (
            <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
              <table className="w-full text-sm">
                <caption className="sr-only">Valid rows preview</caption>
                <thead className="bg-[var(--surface-muted)] text-left">
                  <tr>
                    <th scope="col" className="p-2">Row</th>
                    <th scope="col" className="p-2">Question</th>
                    <th scope="col" className="p-2">Subject</th>
                    <th scope="col" className="p-2">Topic</th>
                    <th scope="col" className="p-2">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.sample.map((row) => (
                    <tr key={row.rowNumber} className="border-t border-[var(--border)]">
                      <td className="p-2 tabular-nums">{row.rowNumber}</td>
                      <td className="p-2">{row.question.slice(0, 80)}</td>
                      <td className="p-2">{row.subject}</td>
                      <td className="p-2">{row.topic}</td>
                      <td className="p-2">{row.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {preview.errors.length > 0 ? (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-danger-700">
                {preview.errors.length} row issue(s)
              </h3>
              <ul className="max-h-72 space-y-1 overflow-y-auto text-sm">
                {preview.errors.map((issue, index) => (
                  <li key={index} className="rounded border border-[var(--border)] p-2">
                    <span className="font-medium">Row {issue.rowNumber}</span>
                    {issue.field ? ` · ${issue.field}` : ""}: {issue.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--border)] p-3">
      <dt className="text-xs text-[var(--text-muted)]">{label}</dt>
      <dd className="text-xl font-bold tabular-nums">{value.toLocaleString()}</dd>
    </div>
  );
}
