import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { itemListJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { listExams } from "@/services/taxonomy";
import { PageShell, PageHeader, CardGrid } from "@/components/layout/container";
import { Badge, Breadcrumbs, Card } from "@/components/ui";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "All Exams — MCQ Practice by Exam",
    description:
      "Browse MCQ practice sets for PST, CSS, JEST, lecturer and university entry tests. Each exam loads its own syllabus configuration automatically.",
    path: "/exams",
    keywords: ["exams", "MCQ exams", "PST", "CSS", "JEST", "entry test"],
  });
}

export default async function ExamsPage() {
  const exams = await listExams();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              exams.map((e) => ({ name: e.name, path: `/exams/${e.slug}` })),
              "Exams",
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Exams"
        description="Choose an exam to practise its configured syllabus. Questions are selected automatically from the shared question bank."
      />

      <CardGrid columns={3}>
        {exams.map((exam) => (
          <Card
            key={exam.slug}
            as="li"
            className="list-none p-5 transition-shadow hover:shadow-md"
          >
            <Link href={`/exams/${exam.slug}`} className="block">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{exam.name}</h2>
                <Badge tone={exam.mode === "STATIC" ? "brand" : "warn"}>
                  {exam.mode === "STATIC" ? "Static" : "Random"}
                </Badge>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">
                {exam.description}
              </p>
              <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <div>
                  <dt className="sr-only">Questions</dt>
                  <dd className="font-medium text-brand-600">
                    {exam.questionCount?.toLocaleString() ?? 0} questions
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Default length</dt>
                  <dd className="text-[var(--text-muted)]">
                    {exam.defaultQuestionCount} per quiz · {exam.timeLimitMinutes} min
                  </dd>
                </div>
              </dl>
            </Link>
          </Card>
        ))}
      </CardGrid>
    </PageShell>
  );
}
