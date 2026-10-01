import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { itemListJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { getSubjectBySlug, listTopics } from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, Card, EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = await getSubjectBySlug(slug);
  if (!subject) {
    return buildMetadata({
      title: "Subject not found",
      description: "The requested subject could not be found.",
      path: `/subjects/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${subject.name} MCQs – Practice Questions with Answers`,
    description:
      subject.description ??
      `Practise ${subject.name} MCQs with explanations, organised by topic and difficulty.`,
    path: `/subjects/${subject.slug}`,
    keywords: [`${subject.name} MCQs`, `${subject.name} practice`, `${subject.name} quiz`],
  });
}

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = await getSubjectBySlug(slug);
  if (!subject) notFound();

  const [topics, result] = await Promise.all([
    listTopics({ subjectSlug: slug }),
    getQuestions({ subject: slug, limit: 12 }),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Subjects", path: "/subjects" },
    { name: subject.name, path: `/subjects/${subject.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              topics.map((t) => ({ name: t.name, path: `/topics/${t.slug}` })),
              `${subject.name} topics`,
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={`${subject.name} MCQs`}
        description={
          subject.description ??
          `${result.total.toLocaleString()} questions across ${topics.length} topics.`
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/quiz?subject=${subject.slug}`}>
            Start {subject.name} quiz
          </ButtonLink>
          <ButtonLink href={`/mcqs?subject=${subject.slug}`} variant="secondary">
            Browse all questions
          </ButtonLink>
        </div>
      </PageHeader>

      {topics.length > 0 ? (
        <section aria-labelledby="subject-topics" className="mb-8">
          <h2 id="subject-topics" className="mb-3 text-lg font-bold">
            Topics
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card key={topic.slug} as="li" className="list-none p-4">
                <Link href={`/topics/${topic.slug}`} className="block">
                  <h3 className="font-medium">{topic.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {topic.questionCount?.toLocaleString() ?? 0} MCQs
                  </p>
                </Link>
              </Card>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="subject-questions">
        <h2 id="subject-questions" className="mb-4 text-lg font-bold">
          Recent questions
        </h2>
        {result.questions.length === 0 ? (
          <EmptyState title="No questions found" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {result.questions.map((question) => (
              <McqCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
