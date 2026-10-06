import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import {
  getExamBySlug,
  getSubjectBySlug,
  getTopicBySlug,
} from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subject: string; topic: string }>;
}): Promise<Metadata> {
  const { slug, subject: subjectSlug, topic: topicSlug } = await params;
  const [exam, subject, topic] = await Promise.all([
    getExamBySlug(slug),
    getSubjectBySlug(subjectSlug),
    getTopicBySlug(topicSlug),
  ]);
  if (!exam || !subject || !topic) {
    return buildMetadata({
      title: "Not found",
      description: "The requested page could not be found.",
      path: `/exams/${slug}/${subjectSlug}/${topicSlug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${exam.name} ${topic.name} MCQs – ${subject.name} Practice`,
    description: `Practise ${topic.name} MCQs for ${exam.name} (${subject.name}), selected automatically from the exam's configured syllabus.`,
    path: `/exams/${exam.slug}/${subject.slug}/${topic.slug}`,
    keywords: [`${topic.name} MCQs`, `${exam.name} ${topic.name}`],
  });
}

export default async function ExamTopicPage({
  params,
}: {
  params: Promise<{ slug: string; subject: string; topic: string }>;
}) {
  const { slug, subject: subjectSlug, topic: topicSlug } = await params;
  const [exam, subject, topic] = await Promise.all([
    getExamBySlug(slug),
    getSubjectBySlug(subjectSlug),
    getTopicBySlug(topicSlug),
  ]);
  if (!exam || !subject || !topic) notFound();

  const result = await getQuestions({
    exam: slug,
    subject: subjectSlug,
    topic: topicSlug,
    limit: 12,
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
    { name: exam.name, path: `/exams/${exam.slug}` },
    { name: subject.name, path: `/exams/${exam.slug}/${subject.slug}` },
    { name: topic.name, path: `/exams/${exam.slug}/${subject.slug}/${topic.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={`${topic.name} — ${exam.name} ${subject.name} MCQs`}
        description={`${result.total.toLocaleString()} ${topic.name} questions configured for ${exam.name}.`}
      >
        <ButtonLink
          href={`/quiz?exam=${exam.slug}&subject=${subject.slug}&topic=${topic.slug}`}
        >
          Start topic quiz
        </ButtonLink>
      </PageHeader>

      {result.questions.length === 0 ? (
        <EmptyState
          title="No questions found"
          description="No published questions match this topic for the selected exam."
        />
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
