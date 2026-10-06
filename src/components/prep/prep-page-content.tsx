import Link from "next/link";
import { Badge } from "@/components/ui";
import type { PrepPageView } from "@/services/prep-pages";

/**
 * Renders a preparation page from its stored sections + FAQs. One component
 * serves every exam's preparation pages because the content is data.
 */
export function PrepPageContent({
  page,
  relatedLinks = [],
}: {
  page: PrepPageView;
  relatedLinks?: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <article className="space-y-8">
        {page.sections.map((section, index) => (
          <section key={`${section.heading}-${index}`}>
            <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
            <p className="mt-2 whitespace-pre-line text-[var(--text-muted)]">
              {section.body}
            </p>
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-6 text-[var(--text-muted)]">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {page.faqs.length > 0 ? (
          <section aria-labelledby="prep-faq">
            <h2 id="prep-faq" className="text-xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <dl className="mt-4 divide-y divide-[var(--border)]">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-4">
                  <dt className="font-semibold">{faq.question}</dt>
                  <dd className="mt-1 text-[var(--text-muted)]">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </article>

      <aside className="space-y-6">
        {page.exam ? (
          <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              This exam
            </h2>
            <p className="mt-1 font-semibold">{page.exam.name}</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href={`/exams/${page.exam.slug}`}
                className="text-sm text-brand-700 hover:underline"
              >
                Exam overview &amp; practice
              </Link>
              <Link
                href={`/quiz?exam=${page.exam.slug}`}
                className="text-sm text-brand-700 hover:underline"
              >
                Start a quiz
              </Link>
            </div>
          </div>
        ) : null}

        {relatedLinks.length > 0 ? (
          <nav
            aria-label="Related preparation pages"
            className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              More preparation
            </h2>
            <ul className="mt-2 space-y-2">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-700 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Editorially reviewed</Badge>
          <Badge tone="brand">Free to use</Badge>
        </div>
      </aside>
    </div>
  );
}
