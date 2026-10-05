import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import { getPreviousPaperBySlug } from "@/services/previous-papers";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Alert, Badge, Breadcrumbs, EmptyState } from "@/components/ui";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getPreviousPaperBySlug(slug);
  if (!paper) {
    return buildMetadata({
      title: "Paper not found",
      description: "The requested previous paper could not be found.",
      path: `/previous-papers/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${paper.title} – Solved MCQs with Answers`,
    description: `Practice ${paper.title} (${paper.year}) — ${paper.questionCount} questions with explanations. ${
      paper.verified ? "Verified sourced paper." : "Unverified practice reconstruction."
    }`,
    path: `/previous-papers/${paper.slug}`,
    keywords: [paper.title, `${paper.exam?.name ?? ""} past paper`, `${paper.year} past paper`],
  });
}

export default async function PreviousPaperDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = await getPreviousPaperBySlug(slug);
  if (!paper) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Previous Papers", path: "/previous-papers" },
    { name: paper.title, path: `/previous-papers/${paper.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader title={paper.title} description={paper.paperName ?? undefined}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={paper.verified ? "success" : "warn"}>
            {paper.verified ? "Verified & sourced" : "Unverified reconstruction"}
          </Badge>
          <Badge tone="neutral">{paper.year}</Badge>
          {paper.session ? <Badge tone="neutral">{paper.session}</Badge> : null}
        </div>
      </PageHeader>

      <Alert
        tone={paper.verified ? "success" : "warn"}
        title={paper.verified ? "Verified paper" : "Unverified practice reconstruction"}
      >
        {paper.source ??
          "No source recorded for this paper. Treat it as practice only."}
      </Alert>

      <div className="mt-6 flex flex-wrap gap-3">
        {paper.exam ? (
          <Link
            href={`/quiz?exam=${paper.exam.slug}`}
            className="text-sm text-brand-700 hover:underline"
          >
            Start a {paper.exam.name} quiz
          </Link>
        ) : null}
        {paper.subject ? (
          <Link
            href={`/subjects/${paper.subject.slug}`}
            className="text-sm text-brand-700 hover:underline"
          >
            More {paper.subject.name} questions
          </Link>
        ) : null}
      </div>

      <section aria-labelledby="paper-questions" className="mt-8">
        <h2 id="paper-questions" className="mb-4 text-xl font-bold">
          Questions
        </h2>
        {paper.questions.length === 0 ? (
          <EmptyState
            title="No questions in this paper yet"
            description="An administrator can attach questions to this paper."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {paper.questions.map((question) => (
              <McqCard key={question.id} question={question} showSubject />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
