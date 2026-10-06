import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { itemListJsonLd, jsonLdScript } from "@/lib/seo/structured-data";
import { listTopics } from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs, Card } from "@/components/ui";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "All Topics — MCQ Practice by Topic",
    description:
      "Browse MCQ practice by topic across every subject, from tenses and algebra to computer fundamentals and Pakistan Studies.",
    path: "/topics",
    keywords: ["topics", "MCQ topics", "practice topics"],
  });
}

export default async function TopicsPage() {
  const topics = await listTopics();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
  ];

  // Group by subject for readable scanning.
  const grouped = new Map<string, typeof topics>();
  for (const topic of topics) {
    const key = topic.subject.name;
    const list = grouped.get(key) ?? [];
    list.push(topic);
    grouped.set(key, list);
  }

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(crumbs),
            itemListJsonLd(
              topics.map((t) => ({ name: t.name, path: `/topics/${t.slug}` })),
              "Topics",
            ),
          ]),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Topics"
        description="Every topic groups questions from across the shared question bank."
      />

      <div className="space-y-8">
        {[...grouped.entries()].map(([subjectName, subjectTopics]) => (
          <section key={subjectName} aria-labelledby={`subject-${subjectName}`}>
            <h2 id={`subject-${subjectName}`} className="mb-3 text-lg font-bold">
              {subjectName}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjectTopics.map((topic) => (
                <Card key={topic.slug} as="li" className="list-none p-4">
                  <Link href={`/topics/${topic.slug}`} className="block">
                    <h3 className="font-medium">{topic.name}</h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {topic.questionCount?.toLocaleString() ?? 0} MCQs
                    </p>
                  </Link>
                </Card>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
