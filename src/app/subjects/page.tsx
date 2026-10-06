import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { itemListJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { listSubjects } from "@/services/taxonomy";
import { PageShell, PageHeader, CardGrid } from "@/components/layout/container";
import { Breadcrumbs, Card } from "@/components/ui";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "All Subjects — MCQ Practice by Subject",
    description:
      "Browse MCQ practice by subject: English, Mathematics, General Science, Computer, Islamiat, Pakistan Studies, Reasoning and more.",
    path: "/subjects",
    keywords: ["subjects", "MCQ subjects", "English MCQs", "Maths MCQs"],
  });
}

export default async function SubjectsPage() {
  const subjects = await listSubjects();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Subjects", path: "/subjects" },
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              subjects.map((s) => ({ name: s.name, path: `/subjects/${s.slug}` })),
              "Subjects",
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Subjects"
        description="Pick a subject to browse its topics and questions across every exam that includes it."
      />

      <CardGrid columns={3}>
        {subjects.map((subject) => (
          <Card
            key={subject.slug}
            as="li"
            className="list-none p-5 transition-shadow hover:shadow-md"
          >
            <Link href={`/subjects/${subject.slug}`} className="block">
              <h2 className="text-lg font-semibold">{subject.name}</h2>
              {subject.description ? (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                  {subject.description}
                </p>
              ) : null}
              <p className="mt-3 text-sm font-medium text-brand-600">
                {subject.questionCount?.toLocaleString() ?? 0} MCQs
                {subject.topicCount ? ` · ${subject.topicCount} topics` : ""}
              </p>
            </Link>
          </Card>
        ))}
      </CardGrid>
    </PageShell>
  );
}
