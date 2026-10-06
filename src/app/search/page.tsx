import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { search } from "@/services/search";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Badge, EmptyState } from "@/components/ui";
import { SearchBox } from "@/components/layout/search-box";
import { McqCard } from "@/components/mcq/mcq-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();
  return buildMetadata({
    title: query ? `Search results for “${query}”` : "Search",
    description: query
      ? `MCQs and categories matching “${query}”.`
      : "Search across questions, exams, subjects and topics.",
    path: "/search",
    // Result pages are intentionally excluded from indexing.
    noindex: true,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query.length >= 2 ? await search(query, { limit: 20 }) : null;

  const hasAny =
    results &&
    (results.questions.length > 0 ||
      results.exams.length > 0 ||
      results.subjects.length > 0 ||
      results.topics.length > 0 ||
      results.categories.length > 0 ||
      results.organizations.length > 0 ||
      results.subSubjects.length > 0 ||
      results.previousPapers.length > 0);

  return (
    <PageShell>
      <PageHeader
        title={query ? `Results for “${query}”` : "Search"}
        description="Search questions, exams, subjects and topics."
      />
      <div className="mb-8 max-w-xl">
        <SearchBox defaultValue={query} />
      </div>

      {!query || query.length < 2 ? (
        <EmptyState
          title="Enter at least two characters"
          description="Try searching for a subject, topic or keyword such as “photosynthesis”."
        />
      ) : !hasAny ? (
        <EmptyState
          title={`No results for “${query}”`}
          description="Try a different keyword, or browse by exam or subject."
        />
      ) : (
        <div className="space-y-10">
          {results!.exams.length > 0 ? (
            <Section title="Exams">
              <ul className="flex flex-wrap gap-2">
                {results!.exams.map((exam) => (
                  <li key={exam.slug}>
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {exam.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.subjects.length > 0 ? (
            <Section title="Subjects">
              <ul className="flex flex-wrap gap-2">
                {results!.subjects.map((subject) => (
                  <li key={subject.slug}>
                    <Link
                      href={`/subjects/${subject.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {subject.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.topics.length > 0 ? (
            <Section title="Topics">
              <ul className="flex flex-wrap gap-2">
                {results!.topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {topic.name}
                      <span className="text-[var(--text-muted)]">
                        {" "}
                        · {topic.subjectName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.categories.length > 0 ? (
            <Section title="Categories">
              <ul className="flex flex-wrap gap-2">
                {results!.categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/exams?category=${category.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.organizations.length > 0 ? (
            <Section title="Organizations">
              <ul className="flex flex-wrap gap-2">
                {results!.organizations.map((organization) => (
                  <li key={organization.slug}>
                    <Link
                      href={`/exams?organization=${organization.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {organization.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.subSubjects.length > 0 ? (
            <Section title="Sub-subjects">
              <ul className="flex flex-wrap gap-2">
                {results!.subSubjects.map((subSubject) => (
                  <li key={subSubject.slug}>
                    <Link
                      href={`/subjects/${subSubject.subjectSlug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {subSubject.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.previousPapers.length > 0 ? (
            <Section title="Previous papers">
              <ul className="flex flex-wrap gap-2">
                {results!.previousPapers.map((paper) => (
                  <li key={paper.slug}>
                    <Link
                      href={`/previous-papers/${paper.slug}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                    >
                      {paper.title}
                      <span className="text-[var(--text-muted)]"> · {paper.year}</span>
                      {!paper.verified ? (
                        <span className="text-[var(--text-muted)]"> (reconstructed)</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results!.questions.length > 0 ? (
            <Section
              title={`Questions (${results!.total.questions.toLocaleString()})`}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results!.questions.map((question) => (
                  <McqCard key={question.id} question={question} showSubject />
                ))}
              </div>
            </Section>
          ) : null}
        </div>
      )}
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        {title}
        <Badge tone="neutral" className="sr-only">
          section
        </Badge>
      </h2>
      {children}
    </section>
  );
}
