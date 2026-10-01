import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo/metadata";
import { jsonLdScript, questionJsonLd } from "@/lib/seo/structured-data";
import { getQuestionBySlug } from "@/services/question-selection";
import { getAdjacentQuestion, getUserQuestionFlags } from "@/services/engagement";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { PageShell } from "@/components/layout/container";
import { Badge, Breadcrumbs, DifficultyBadge } from "@/components/ui";
import { McqPlayer } from "@/components/mcq/mcq-player";
import { QuestionActions } from "@/components/mcq/question-actions";

export const revalidate = 3600;

async function loadQuestion(slug: string) {
  return getQuestionBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = await loadQuestion(slug);
  if (!question) {
    return buildMetadata({
      title: "Question not found",
      description: "The requested question could not be found.",
      path: `/mcqs`,
      noindex: true,
    });
  }
  const path = `/mcqs/${question.subject?.slug ?? "general"}/${question.slug}`;
  return buildMetadata({
    title: question.stem,
    description:
      question.explanation ??
      `Practice this ${question.subject?.name ?? "general"} MCQ with the correct answer and explanation.`,
    path,
    keywords: [
      question.subject?.name ?? "MCQ",
      question.topic?.name ?? "practice",
      "MCQ with answer",
    ],
    type: "article",
  });
}

export default async function McqDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>;
}) {
  const { subject: subjectSlug, slug } = await params;
  const question = await loadQuestion(slug);
  if (!question) notFound();

  // Canonical path uses the question's own subject, so /mcqs/wrong-slug/x
  // still resolves to one canonical URL.
  const canonicalPath = `/mcqs/${question.subject?.slug ?? "general"}/${question.slug}`;

  const user = await getCurrentUser();
  const [flags, adjacent] = await Promise.all([
    getUserQuestionFlags(user?.id ?? null, question.id),
    getAdjacentQuestion(null, question.id),
  ]);

  // Increment the view counter (best effort; not part of the rendered output).
  await db.question
    .update({ where: { id: question.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => undefined);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "MCQs", path: "/mcqs" },
    ...(question.subject
      ? [
          {
            name: question.subject.name,
            path: `/subjects/${question.subject.slug}`,
          },
        ]
      : []),
    { name: "Question", path: canonicalPath },
  ];

  const nextHref = adjacent
    ? `/mcqs/${adjacent.subjectSlug}/${adjacent.slug}`
    : null;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            questionJsonLd(question, canonicalPath),
          ]),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} />

        <article>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={question.difficulty} />
            {question.subject ? (
              <Badge tone="brand">
                <Link href={`/subjects/${question.subject.slug}`}>
                  {question.subject.name}
                </Link>
              </Badge>
            ) : null}
            {question.topic ? (
              <Badge>
                <Link href={`/topics/${question.topic.slug}`}>{question.topic.name}</Link>
              </Badge>
            ) : null}
            {question.year ? <Badge>Year {question.year}</Badge> : null}
          </div>

          <h1 className="text-xl font-bold leading-snug sm:text-2xl">
            {question.stem}
          </h1>

          <div className="mt-6">
            <McqPlayer question={question} nextHref={nextHref} />
          </div>

          <QuestionActions
            questionId={question.id}
            canonicalUrl={absoluteUrl(canonicalPath)}
            stem={question.stem}
            initialLiked={flags.liked}
            initialBookmarked={flags.bookmarked}
            signedIn={Boolean(user)}
            likeCount={question.likeCount}
            bookmarkCount={question.bookmarkCount}
          />

          {question.exams.length > 0 ? (
            <section aria-labelledby="related-exams" className="mt-6">
              <h2 id="related-exams" className="text-sm font-semibold">
                Appears in
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {question.exams.map((exam) => (
                  <li key={exam.slug}>
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="text-sm text-brand-600 hover:underline"
                    >
                      {exam.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </div>
    </PageShell>
  );
}
