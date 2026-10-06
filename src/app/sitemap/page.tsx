import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import { listExams, listSubjects, listTopics } from "@/services/taxonomy";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Sitemap",
    description:
      "A human-readable index of every exam, subject and topic on the site.",
    path: "/sitemap",
  });
}

export default async function SitemapPage() {
  const [exams, subjects, topics] = await Promise.all([
    listExams(),
    listSubjects(),
    listTopics(),
  ]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Sitemap", path: "/sitemap" },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
        />
        <Breadcrumbs items={crumbs} />
        <PageHeader
          title="Sitemap"
          description="Browse every section of the site. Search engines can also use our machine-readable sitemap at /sitemap.xml."
        />

        <Section title="Exams">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="text-brand-600 hover:underline"
                >
                  {exam.name} MCQs
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Subjects">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <li key={subject.slug}>
                <Link
                  href={`/subjects/${subject.slug}`}
                  className="text-brand-600 hover:underline"
                >
                  {subject.name} MCQs
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Topics">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="text-brand-600 hover:underline"
                >
                  {topic.name} MCQs
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Site pages">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Home", "/"],
              ["All MCQs", "/mcqs"],
              ["Build a quiz", "/quiz"],
              ["Search", "/search"],
              ["About Us", "/about"],
              ["Contact Us", "/contact"],
              ["FAQ", "/faq"],
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms-conditions"],
              ["Disclaimer", "/disclaimer"],
              ["Cookie Policy", "/cookie-policy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-brand-600 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}
