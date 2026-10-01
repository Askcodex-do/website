import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import { getTopicBySlug } from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) {
    return buildMetadata({
      title: "Topic not found",
      description: "The requested topic could not be found.",
      path: `/topics/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${topic.name} MCQs – ${topic.subject.name} Practice Questions`,
    description: `Practise ${topic.name} MCQs from ${topic.subject.name} with explanations and references.`,
    path: `/topics/${topic.slug}`,
    keywords: [`${topic.name} MCQs`, `${topic.subject.name} ${topic.name}`],
  });
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) notFound();

  const result = await getQuestions({ topic: slug, limit: 12 });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Subjects", path: "/subjects" },
    { name: topic.subject.name, path: `/subjects/${topic.subject.slug}` },
    { name: topic.name, path: `/topics/${topic.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={`${topic.name} MCQs`}
        description={
          topic.description ??
          `${result.total.toLocaleString()} questions in ${topic.subject.name}.`
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/quiz?topic=${topic.slug}`}>Start topic quiz</ButtonLink>
          <ButtonLink href={`/mcqs?topic=${topic.slug}`} variant="secondary">
            Browse all questions
          </ButtonLink>
          <Link
            href={`/subjects/${topic.subject.slug}`}
            className="self-center text-sm font-medium text-brand-600 hover:underline"
          >
            ← Back to {topic.subject.name}
          </Link>
        </div>
      </PageHeader>

      {result.questions.length === 0 ? (
        <EmptyState title="No questions found" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {result.questions.map((question) => (
            <McqCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
