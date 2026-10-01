import Link from "next/link";
import { classNames } from "@/lib/class-names";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Filter bar rendered as a plain GET form so every filtered view has a
 * shareable, crawlable URL and works without client JavaScript.
 */
export function FilterBar({
  action,
  fields,
  hidden,
  submitLabel = "Apply filters",
}: {
  action: string;
  fields: Array<{
    name: string;
    label: string;
    value: string;
    options: FilterOption[];
    allLabel?: string;
  }>;
  hidden?: Record<string, string | undefined>;
  submitLabel?: string;
}) {
  return (
    <form
      action={action}
      method="get"
      className="mb-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      {hidden
        ? Object.entries(hidden).map(([key, value]) =>
            value ? <input key={key} type="hidden" name={key} value={value} /> : null,
          )
        : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`filter-${field.name}`}
              className="mb-1 block text-sm font-medium"
            >
              {field.label}
            </label>
            <select
              id={`filter-${field.name}`}
              name={field.name}
              defaultValue={field.value}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <option value="">{field.allLabel ?? `All ${field.label.toLowerCase()}`}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                  {typeof option.count === "number" ? ` (${option.count})` : ""}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          {submitLabel}
        </button>
        <Link
          href={action}
          className={classNames(
            "rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]",
          )}
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
