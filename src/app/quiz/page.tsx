import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import {
  listEducationLevels,
  listExams,
  listSubjects,
  listTopics,
} from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui";
import { QuizBuilder } from "@/components/quiz/quiz-builder";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Build a Quiz — Timed MCQ Practice",
    description:
      "Create a custom MCQ quiz by exam, subject, topic, education level, difficulty and length. Static or random order, with server-side scoring.",
    path: "/quiz",
    keywords: ["quiz", "MCQ quiz", "timed quiz", "practice test"],
  });
}

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{
    exam?: string;
    subject?: string;
    topic?: string;
    educationLevel?: string;
  }>;
}) {
  const sp = await searchParams;
  const [exams, subjects, topics, levels] = await Promise.all([
    listExams(),
    listSubjects(),
    listTopics(),
    listEducationLevels(),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Build a quiz"
        description="Choose your filters and the Question Selection Engine will assemble the quiz for you."
      />
      <div className="max-w-3xl">
        <QuizBuilder
          exams={exams}
          subjects={subjects}
          topics={topics}
          levels={levels}
          initial={{
            exam: sp.exam,
            subject: sp.subject,
            topic: sp.topic,
            educationLevel: sp.educationLevel,
          }}
        />
      </div>
    </PageShell>
  );
}
