import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, itemListJsonLd } from "@/lib/seo/structured-data";
import { listPreviousPapers, listPreviousPaperYears } from "@/services/previous-papers";
import { listExams } from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Badge, Breadcrumbs, Card, EmptyState } from "@/components/ui";
import { FilterBar } from "@/components/ui/filter-bar";

export const revalidate = 3600;

interface SearchParams {
  exam?: string;
  year?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(sp.exam || sp.year);
  return buildMetadata({
    title: "Previous Papers – Solved Past Papers with Answers",
    description:
      "Browse previous papers by exam and year. Verified, sourced papers are clearly labelled; practice reconstructions are marked as unverified.",
    path: "/previous-papers",
    keywords: ["previous papers", "past papers", "solved past papers"],
    noindex: filtered,
  });
}

export default async function PreviousPapersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const year = sp.year ? Number.parseInt(sp.year, 10) : undefined;

  const [papers, exams, years] = await Promise.all([
    listPreviousPapers({ exam: sp.exam, year: Number.isFinite(year) ? year : undefined }),
    listExams(),
    listPreviousPaperYears(),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Previous Papers", path: "/previous-papers" },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              papers.map((p) => ({ name: p.title, path: `/previous-papers/${p.slug}` })),
              "Previous papers",
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Previous Papers"
        description="Past papers organised by exam and year. Verified papers cite their source; unverified reconstructions are labelled so you always know what you are practising."
      />

      <FilterBar
        action="/previous-papers"
        fields={[
          {
            name: "exam",
            label: "Exam",
            value: sp.exam ?? "",
            options: exams.map((e) => ({ value: e.slug, label: e.name })),
          },
          {
            name: "year",
            label: "Year",
            value: sp.year ?? "",
            options: years.map((y) => ({ value: String(y), label: String(y) })),
          },
        ]}
      />

      {papers.length === 0 ? (
        <EmptyState
          title="No previous papers yet"
          description="Verified past papers will appear here as they are added by administrators."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => (
            <Card key={paper.id} as="li" className="list-none p-5">
              <Link href={`/previous-papers/${paper.slug}`} className="block">
                <div className="flex items-center gap-2">
                  <Badge tone={paper.verified ? "success" : "warn"}>
                    {paper.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <span className="text-sm text-[var(--text-muted)]">{paper.year}</span>
                </div>
                <h2 className="mt-2 font-semibold">{paper.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {paper.exam?.name ?? "General"}
                  {paper.subject ? ` · ${paper.subject.name}` : ""} ·{" "}
                  {paper.questionCount} questions
                </p>
              </Link>
            </Card>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
