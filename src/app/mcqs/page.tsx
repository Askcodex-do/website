import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, itemListJsonLd } from "@/lib/seo/structured-data";
import { getQuestions } from "@/services/question-selection";
import {
  listCategories,
  listEducationLevels,
  listExams,
  listOrganizations,
  listSubSubjects,
  listSubjects,
  listSubtopics,
  listTopics,
} from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination } from "@/components/ui/pagination";
import { McqCard } from "@/components/mcq/mcq-card";
import type { Difficulty } from "@prisma/client";

export const revalidate = 900;

const PAGE_SIZE = 24;

interface SearchParams {
  exam?: string;
  category?: string;
  organization?: string;
  subject?: string;
  subSubject?: string;
  topic?: string;
  subtopic?: string;
  educationLevel?: string;
  difficulty?: string;
  page?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const parts = [sp.exam, sp.category, sp.subject, sp.topic].filter(Boolean);
  const label = parts.length > 0 ? parts.join(" · ") : "All";
  return buildMetadata({
    title: `${label} MCQs – Practice Questions with Answers`,
    description: `Browse ${label} multiple-choice questions with explanations. Filter by exam, category, subject, topic, education level and difficulty.`,
    path: "/mcqs",
    keywords: ["MCQs", "practice questions", "MCQ with answers"],
    // Filtered views are useful to users but should not compete with the
    // canonical listing in search results.
    noindex: parts.length > 0,
  });
}

export default async function McqsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const difficulty = ["EASY", "MEDIUM", "HARD"].includes(sp.difficulty ?? "")
    ? (sp.difficulty as Difficulty)
    : undefined;

  const [
    result,
    exams,
    categories,
    organizations,
    subjects,
    subSubjects,
    levels,
    topics,
    subtopics,
  ] = await Promise.all([
    getQuestions({
      exam: sp.exam,
      category: sp.category,
      organization: sp.organization,
      subject: sp.subject,
      subSubject: sp.subSubject,
      topic: sp.topic,
      subtopic: sp.subtopic,
      educationLevel: sp.educationLevel,
      difficulty,
      page,
      limit: PAGE_SIZE,
      mode: "static",
    }),
    listExams(),
    listCategories(),
    listOrganizations(),
    listSubjects(),
    listSubSubjects(sp.subject),
    listEducationLevels(),
    listTopics(sp.subject ? { subjectSlug: sp.subject } : undefined),
    listSubtopics(sp.topic),
  ]);

  const totalPages = Math.ceil(result.total / PAGE_SIZE);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "MCQs", path: "/mcqs" },
  ];

  const buildHref = (target: number) => {
    const params = new URLSearchParams();
    if (sp.exam) params.set("exam", sp.exam);
    if (sp.category) params.set("category", sp.category);
    if (sp.organization) params.set("organization", sp.organization);
    if (sp.subject) params.set("subject", sp.subject);
    if (sp.subSubject) params.set("subSubject", sp.subSubject);
    if (sp.topic) params.set("topic", sp.topic);
    if (sp.subtopic) params.set("subtopic", sp.subtopic);
    if (sp.educationLevel) params.set("educationLevel", sp.educationLevel);
    if (sp.difficulty) params.set("difficulty", sp.difficulty);
    if (target > 1) params.set("page", String(target));
    const qs = params.toString();
    return qs ? `/mcqs?${qs}` : "/mcqs";
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              result.questions.map((q) => ({
                name: q.stem,
                path: `/mcqs/${q.subject?.slug ?? "general"}/${q.slug}`,
              })),
              "MCQ listing",
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="MCQs"
        description={`${result.total.toLocaleString()} published questions. Questions are selected by the engine according to the filters you choose.`}
      />

      <FilterBar
        action="/mcqs"
        fields={[
          {
            name: "category",
            label: "Category",
            value: sp.category ?? "",
            options: categories.map((c) => ({ value: c.slug, label: c.name })),
          },
          {
            name: "organization",
            label: "Organization",
            value: sp.organization ?? "",
            options: organizations.map((o) => ({
              value: o.slug,
              label: o.shortName ?? o.name,
            })),
          },
          {
            name: "exam",
            label: "Exam",
            value: sp.exam ?? "",
            options: exams.map((e) => ({ value: e.slug, label: e.name })),
          },
          {
            name: "subject",
            label: "Subject",
            value: sp.subject ?? "",
            options: subjects.map((s) => ({ value: s.slug, label: s.name })),
          },
          {
            name: "subSubject",
            label: "Sub-subject",
            value: sp.subSubject ?? "",
            options: subSubjects.map((s) => ({ value: s.slug, label: s.name })),
          },
          {
            name: "topic",
            label: "Topic",
            value: sp.topic ?? "",
            options: topics.map((t) => ({ value: t.slug, label: t.name })),
          },
          {
            name: "subtopic",
            label: "Subtopic",
            value: sp.subtopic ?? "",
            options: subtopics.map((t) => ({ value: t.slug, label: t.name })),
          },
          {
            name: "educationLevel",
            label: "Education level",
            value: sp.educationLevel ?? "",
            options: levels.map((l) => ({ value: l.slug, label: l.name })),
          },
          {
            name: "difficulty",
            label: "Difficulty",
            value: sp.difficulty ?? "",
            options: [
              { value: "EASY", label: "Easy" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HARD", label: "Hard" },
            ],
          },
        ]}
      />

      {result.questions.length === 0 ? (
        <EmptyState
          title="No questions match these filters"
          description="Try removing a filter or choosing a broader subject."
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.questions.map((question) => (
              <McqCard key={question.id} question={question} showSubject />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
        </>
      )}

      <p className="mt-6 text-sm text-[var(--text-muted)]">
        Looking for a quiz instead?{" "}
        <Link href="/quiz" className="font-medium text-brand-600 hover:underline">
          Build a timed quiz
        </Link>{" "}
        from the same question pool.
      </p>
    </PageShell>
  );
}
