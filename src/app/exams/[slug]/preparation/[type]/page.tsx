import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { faqJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { PREP_TYPE_LABEL, prepTypeFromSlug, prepTypePath } from "@/lib/prep";
import { getExamPrepPage, listPrepPagesForExam } from "@/services/prep-pages";
import { getExamBySlug } from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { PrepPageContent } from "@/components/prep/prep-page-content";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; type: string }>;
}): Promise<Metadata> {
  const { slug, type } = await params;
  const prepType = prepTypeFromSlug(type);
  if (!prepType) {
    return buildMetadata({
      title: "Preparation page not found",
      description: "The requested preparation page could not be found.",
      path: `/exams/${slug}/preparation/${type}`,
      noindex: true,
    });
  }
  const page = await getExamPrepPage(slug, prepType);
  if (!page) {
    return buildMetadata({
      title: "Preparation page not found",
      description: "The requested preparation page could not be found.",
      path: `/exams/${slug}/preparation/${type}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: page.title,
    description:
      page.summary ??
      `${PREP_TYPE_LABEL[prepType]} information for ${page.exam?.name ?? "this exam"}.`,
    path: prepTypePath(slug, prepType),
    keywords: [page.title, `${page.exam?.name ?? ""} ${PREP_TYPE_LABEL[prepType]}`],
  });
}

export default async function ExamPrepPage({
  params,
}: {
  params: Promise<{ slug: string; type: string }>;
}) {
  const { slug, type } = await params;
  const prepType = prepTypeFromSlug(type);
  if (!prepType) notFound();

  const [exam, page, allPages] = await Promise.all([
    getExamBySlug(slug),
    getExamPrepPage(slug, prepType),
    listPrepPagesForExam(slug),
  ]);
  if (!exam || !page) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
    { name: exam.name, path: `/exams/${exam.slug}` },
    { name: PREP_TYPE_LABEL[prepType], path: prepTypePath(slug, prepType) },
  ];

  const relatedLinks = allPages
    .filter((p) => p.type !== prepType)
    .map((p) => ({
      label: p.title,
      href: prepTypePath(slug, p.type),
    }));

  const ld: unknown[] = [breadcrumbJsonLd(crumbs)];
  if (page.faqs.length > 0) ld.push(faqJsonLd(page.faqs));

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title={page.title}
        description={page.summary ?? undefined}
      />
      {page.sections.length === 0 ? (
        <EmptyState
          title="Content coming soon"
          description="This preparation page has not been published yet."
        />
      ) : (
        <PrepPageContent page={page} relatedLinks={relatedLinks} />
      )}
    </PageShell>
  );
}
