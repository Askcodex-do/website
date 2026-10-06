import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScript, organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";
import { getSocialLinks } from "@/services/settings";
import {
  getPlatformStats,
  listExams,
  listSubjects,
} from "@/services/taxonomy";
import { getQuestions } from "@/services/question-selection";
import { Card, SectionHeading, Badge } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { McqCard } from "@/components/mcq/mcq-card";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "MCQ Practice — Jobs, Admissions & Competitive Exam Preparation",
    description:
      "Practise thousands of multiple-choice questions for PST, CSS, JEST, lecturer and university entry tests. Filter by exam, subject, topic, education level and difficulty.",
    path: "/",
    keywords: [
      "MCQ practice",
      "PST MCQs",
      "CSS MCQs",
      "JEST MCQs",
      "entry test MCQs",
      "online quiz",
    ],
  });
}

export default async function HomePage() {
  const [stats, featuredExams, subjects, social, sample] = await Promise.all([
    getPlatformStats(),
    listExams({ featuredOnly: true }),
    listSubjects(),
    getSocialLinks(),
    getQuestions({ mode: "random", limit: 6 }),
  ]);

  const exams = featuredExams.length > 0 ? featuredExams : await listExams();
  const topSubjects = subjects.slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            organizationJsonLd(social as unknown as Record<string, string>),
            websiteJsonLd(),
          ]),
        }}
      />

      <section className="border-b border-[var(--border)] bg-gradient-to-b from-brand-50 to-[var(--page-bg)]">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <Badge tone="brand">Trusted practice for every exam</Badge>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Practise MCQs for jobs, admissions and competitive exams
            </h1>
            <p className="mt-4 text-lg text-[var(--text-muted)]">
              Questions are selected automatically for your exam, subject,
              education level and difficulty — the same engine powers every
              quiz, so new exams need no new code.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/quiz" size="lg">
                Start a quiz
              </ButtonLink>
              <ButtonLink href="/exams" variant="secondary" size="lg">
                Browse exams
              </ButtonLink>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Questions" value={stats.questions} />
            <Stat label="Exams" value={stats.exams} />
            <Stat label="Subjects" value={stats.subjects} />
            <Stat label="Topics" value={stats.topics} />
          </dl>
        </Container>
      </section>

      <Container className="py-10">
        <SectionHeading
          title="Popular exams"
          description="Each exam loads its own syllabus configuration automatically."
          action={
            <Link href="/exams" className="text-sm font-medium text-brand-600 hover:underline">
              View all exams →
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.slice(0, 6).map((exam) => (
            <Card key={exam.slug} className="p-5 transition-shadow hover:shadow-md">
              <Link href={`/exams/${exam.slug}`} className="block">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{exam.name}</h3>
                  <Badge tone={exam.mode === "STATIC" ? "brand" : "warn"}>
                    {exam.mode === "STATIC" ? "Static" : "Random"}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                  {exam.description}
                </p>
                <p className="mt-3 text-sm font-medium text-brand-600">
                  {exam.questionCount?.toLocaleString() ?? 0} questions
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-10">
        <SectionHeading
          title="Browse by subject"
          description="Jump straight into a subject or narrow down by topic."
          action={
            <Link href="/subjects" className="text-sm font-medium text-brand-600 hover:underline">
              All subjects →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {topSubjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <p className="font-semibold">{subject.name}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {subject.questionCount?.toLocaleString() ?? 0} MCQs
              </p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <SectionHeading
          title="Try a question"
          description="Every question opens on its own shareable, SEO-friendly page."
          action={
            <Link href="/mcqs" className="text-sm font-medium text-brand-600 hover:underline">
              Browse all MCQs →
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {sample.questions.map((question) => (
            <McqCard key={question.id} question={question} showSubject />
          ))}
        </div>
      </Container>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1 text-2xl font-bold">{value.toLocaleString()}</dd>
    </div>
  );
}
