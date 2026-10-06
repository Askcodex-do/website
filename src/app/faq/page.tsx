import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript, faqJsonLd } from "@/lib/seo/structured-data";
import { faqItems } from "@/content/legal";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Frequently Asked Questions",
    description:
      "Answers about guest practice, exam question selection, static and random modes, scoring and reporting mistakes.",
    path: "/faq",
  });
}

export default function FaqPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([breadcrumbJsonLd(crumbs), faqJsonLd(faqItems)]),
          }}
        />
        <Breadcrumbs items={crumbs} />
        <PageHeader
          title="Frequently Asked Questions"
          description="Short answers to the questions we get most often."
        />

        <dl className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <dt className="text-base font-semibold">{item.question}</dt>
              <dd className="mt-2 text-[var(--text-muted)]">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-[var(--text-muted)]">
          Still stuck?{" "}
          <Link href="/contact" className="font-medium text-brand-600 hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
