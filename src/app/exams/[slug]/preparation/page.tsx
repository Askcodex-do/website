import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, itemListJsonLd } from "@/lib/seo/structured-data";
import { PREP_TYPE_LABEL, prepTypePath } from "@/lib/prep";
import { listPrepPagesForExam } from "@/services/prep-pages";
import { getExamBySlug } from "@/services/taxonomy";
import { PageShell, PageHeader, CardGrid } from "@/components/layout/container";
import { Breadcrumbs, Card, EmptyState } from "@/components/ui";

export const revalidate = 3600;

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
      path: `/exams/${slug}/preparation`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${exam.name} — Preparation Guide`,
    description: `Overview, eligibility, syllabus, paper pattern and strategy for the ${exam.name}.`,
    path: `/exams/${exam.slug}/preparation`,
    keywords: [`${exam.name} preparation`, `${exam.name} syllabus`, `${exam.name} pattern`],
  });
}

export default async function ExamPreparationIndex({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);
  if (!exam) notFound();

  const pages = await listPrepPagesForExam(slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
    { name: exam.name, path: `/exams/${exam.slug}` },
    { name: "Preparation", path: `/exams/${exam.slug}/preparation` },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              pages.map((p) => ({
                name: p.title,
                path: prepTypePath(slug, p.type),
              })),
              `${exam.name} preparation`,
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={`${exam.name} — Preparation Guide`}
        description="Everything you need to plan your preparation: overview, eligibility, syllabus, paper pattern and strategy."
      />
      {pages.length === 0 ? (
        <EmptyState
          title="No preparation pages yet"
          description="Preparation content will appear here once published."
        />
      ) : (
        <CardGrid columns={3}>
          {pages.map((page) => (
            <Card key={page.id} as="li" className="list-none p-5">
              <Link href={prepTypePath(slug, page.type)} className="block">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {PREP_TYPE_LABEL[page.type]}
                </p>
                <h2 className="mt-1 font-semibold">{page.title}</h2>
                {page.summary ? (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{page.summary}</p>
                ) : null}
              </Link>
            </Card>
          ))}
        </CardGrid>
      )}
    </PageShell>
  );
}
