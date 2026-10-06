import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, quizJsonLd } from "@/lib/seo/structured-data";
import { getExamBySlug, listSubjects } from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { PageShell, PageHeader, CardGrid } from "@/components/layout/container";
import { Badge, Breadcrumbs, Card, EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);
  if (!exam) {
    return buildMetadata({
      title: "Exam not found",
      description: "The requested exam could not be found.",
      path: `/exams/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${exam.name} MCQs – Practice Questions with Answers`,
    description:
      exam.description ??
      `Practise ${exam.name} MCQs covering the exam's configured subjects and topics, with explanations and references.`,
    path: `/exams/${exam.slug}`,
    keywords: [`${exam.name} MCQs`, `${exam.name} practice`, `${exam.name} quiz`],
  });
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);
  if (!exam) notFound();

  const [subjects, preview] = await Promise.all([
    listSubjects({ examSlug: slug }),
    getQuestions({ exam: slug, limit: 6 }),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
    { name: exam.name, path: `/exams/${exam.slug}` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            quizJsonLd({
              name: `${exam.name} MCQ Practice`,
              description: exam.description ?? `Practice ${exam.name} MCQs`,
              path: `/exams/${exam.slug}`,
              questionCount: exam.questionCount ?? 0,
            }),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader title={exam.name} description={exam.description ?? undefined}>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={`/quiz?exam=${exam.slug}`}>
            Start {exam.name} quiz
          </ButtonLink>
          <ButtonLink href={`/mcqs?exam=${exam.slug}`} variant="secondary">
            Browse all questions
          </ButtonLink>
          <Badge tone={exam.mode === "STATIC" ? "brand" : "warn"}>
            {exam.mode === "STATIC" ? "Static order" : "Random order"}
          </Badge>
          {exam.negativeMarking ? (
            <Badge tone="danger">Negative marking</Badge>
          ) : null}
        </div>
      </PageHeader>

      <dl className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Questions" value={(exam.questionCount ?? 0).toLocaleString()} />
        <Stat label="Subjects" value={String(subjects.length)} />
        <Stat label="Default length" value={`${exam.defaultQuestionCount} Qs`} />
        <Stat label="Time limit" value={`${exam.timeLimitMinutes} min`} />
      </dl>

      <section aria-labelledby="exam-subjects" className="mb-10">
        <h2 id="exam-subjects" className="mb-4 text-xl font-bold">
          Subjects in this exam
        </h2>
        {subjects.length === 0 ? (
          <EmptyState
            title="No subjects configured yet"
            description="This exam's blueprint has no subjects linked. An administrator can add them from the admin panel."
          />
        ) : (
          <CardGrid columns={3}>
            {subjects.map((subject) => (
              <Card key={subject.slug} as="li" className="list-none p-4">
                <Link href={`/exams/${exam.slug}/${subject.slug}`} className="block">
                  <h3 className="font-semibold">{subject.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {subject.questionCount?.toLocaleString() ?? 0} MCQs
                    {subject.topicCount ? ` · ${subject.topicCount} topics` : ""}
                  </p>
                </Link>
              </Card>
            ))}
          </CardGrid>
        )}
      </section>

      <section aria-labelledby="exam-preview">
        <h2 id="exam-preview" className="mb-4 text-xl font-bold">
          Sample questions
        </h2>
        {preview.questions.length === 0 ? (
          <EmptyState
            title="No published questions yet"
            description="Questions will appear here as soon as they are published."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {preview.questions.map((question) => (
              <McqCard key={question.id} question={question} showSubject />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1 text-xl font-bold">{value}</dd>
    </div>
  );
}
