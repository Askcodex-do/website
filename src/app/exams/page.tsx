import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { itemListJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { listExams, listCategories, listOrganizations } from "@/services/taxonomy";
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

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; organization?: string }>;
}) {
  const sp = await searchParams;
  const [exams, categories, organizations] = await Promise.all([
    listExams({
      categorySlug: sp.category,
      organizationSlug: sp.organization,
    }),
    listCategories(),
    listOrganizations(),
  ]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
  ];

  const activeFilter = sp.category
    ? categories.find((c) => c.slug === sp.category)
    : sp.organization
      ? organizations.find((o) => o.slug === sp.organization)
      : null;

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
        title={activeFilter ? `${activeFilter.name} Exams` : "Exams"}
        description="Choose an exam to practise its configured syllabus. Questions are selected automatically from the shared question bank."
      />

      <nav aria-label="Filter exams" className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/exams"
          className={`rounded-full border px-3 py-1.5 text-sm ${
            !sp.category && !sp.organization
              ? "border-brand-500 bg-brand-50 text-brand-700"
              : "border-[var(--border)] hover:bg-[var(--surface-muted)]"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/exams?category=${category.slug}`}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              sp.category === category.slug
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-[var(--border)] hover:bg-[var(--surface-muted)]"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {organizations.length > 0 ? (
        <nav aria-label="Filter exams by organization" className="mb-6 flex flex-wrap gap-2">
          {organizations.map((organization) => (
            <Link
              key={organization.id}
              href={`/exams?organization=${organization.slug}`}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                sp.organization === organization.slug
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              {organization.shortName ?? organization.name}
            </Link>
          ))}
        </nav>
      ) : null}

      {exams.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
          No exams match this filter yet.
        </p>
      ) : (
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
      )}
    </PageShell>
  );
}
