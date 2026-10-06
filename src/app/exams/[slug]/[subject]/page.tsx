import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, itemListJsonLd } from "@/lib/seo/structured-data";
import { getExamBySlug, getSubjectBySlug, listTopics } from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, Card, EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subject: string }>;
}): Promise<Metadata> {
  const { slug, subject: subjectSlug } = await params;
  const [exam, subject] = await Promise.all([
    getExamBySlug(slug),
    getSubjectBySlug(subjectSlug),
  ]);
  if (!exam || !subject) {
    return buildMetadata({
      title: "Not found",
      description: "The requested page could not be found.",
      path: `/exams/${slug}/${subjectSlug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${exam.name} ${subject.name} MCQs – Practice with Answers`,
    description: `Practise ${subject.name} MCQs for the ${exam.name} exam. Filtered automatically to this exam's configured syllabus, with explanations.`,
    path: `/exams/${exam.slug}/${subject.slug}`,
    keywords: [
      `${exam.name} ${subject.name} MCQs`,
      `${exam.name} ${subject.name} practice`,
    ],
  });
}

export default async function ExamSubjectPage({
  params,
}: {
  params: Promise<{ slug: string; subject: string }>;
}) {
  const { slug, subject: subjectSlug } = await params;
  const [exam, subject] = await Promise.all([
    getExamBySlug(slug),
    getSubjectBySlug(subjectSlug),
  ]);
  if (!exam || !subject) notFound();

  const [topics, result] = await Promise.all([
    listTopics({ subjectSlug }),
    getQuestions({ exam: slug, subject: subjectSlug, limit: 12 }),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
    { name: exam.name, path: `/exams/${exam.slug}` },
    { name: subject.name, path: `/exams/${exam.slug}/${subject.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              topics.map((t) => ({
                name: t.name,
                path: `/exams/${exam.slug}/${subject.slug}/${t.slug}`,
              })),
              `${exam.name} ${subject.name} topics`,
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={`${exam.name} — ${subject.name} MCQs`}
        description={`Questions for ${subject.name} as configured in the ${exam.name} syllabus (${result.total.toLocaleString()} available).`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/quiz?exam=${exam.slug}&subject=${subject.slug}`}>
            Start quiz
          </ButtonLink>
          <ButtonLink
            href={`/mcqs?exam=${exam.slug}&subject=${subject.slug}`}
            variant="secondary"
          >
            All {subject.name} questions
          </ButtonLink>
        </div>
      </PageHeader>

      {topics.length > 0 ? (
        <section aria-labelledby="subject-topics" className="mb-8">
          <h2 id="subject-topics" className="mb-3 text-lg font-bold">
            Topics
          </h2>
          <ul className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/exams/${exam.slug}/${subject.slug}/${topic.slug}`}
                  className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50"
                >
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="subject-questions">
        <h2 id="subject-questions" className="mb-4 text-lg font-bold">
          Questions
        </h2>
        {result.questions.length === 0 ? (
          <EmptyState
            title="No questions found"
            description="This combination has no published questions yet."
          />
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

export const dynamicParams = true;
void Card;
