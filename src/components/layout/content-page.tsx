import type { ReactNode } from "react";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/structured-data";
import { siteName, siteUrl } from "@/lib/env";
import type { Metadata } from "next";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

/** Renders a static content page with breadcrumbs and optional schema. */
export function ContentPage({
  title,
  description,
  path,
  intro,
  sections,
  children,
}: {
  title: string;
  description: string;
  path: string;
  intro?: string;
  sections?: LegalSection[];
  children?: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} />
        <PageHeader title={title} description={description} />
        {intro ? (
          <p className="mb-6 text-[var(--text-muted)]">{intro}</p>
        ) : null}
        {children}
        {sections?.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="mb-2 text-xl font-bold">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-3 text-[var(--text-muted)]">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="list-disc space-y-1 pl-6 text-[var(--text-muted)]">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <p className="mt-10 text-sm text-[var(--text-muted)]">
          Last updated: {new Date().toISOString().slice(0, 10)} · {siteName} (
          <a href={siteUrl} className="text-brand-600 hover:underline">
            {siteUrl.replace(/^https?:\/\//, "")}
          </a>
          )
        </p>
      </article>
    </PageShell>
  );
}

export function contentMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return buildMetadata(input);
}
