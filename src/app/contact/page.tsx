import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSocialLinks } from "@/services/settings";
import { PageShell, PageHeader } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui";
import { ContactForm } from "@/components/layout/contact-form";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Contact Us",
    description:
      "Get in touch about a question, a report, a partnership or a general enquiry.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const social = await getSocialLinks();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} />
        <PageHeader
          title="Contact Us"
          description="Questions, corrections, partnerships or feedback — we read every message."
        />

        <ContactForm />

        <section aria-labelledby="contact-elsewhere" className="mt-10">
          <h2 id="contact-elsewhere" className="mb-3 text-lg font-bold">
            Elsewhere
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {(
              [
                ["Facebook", social.facebook],
                ["YouTube", social.youtube],
                ["Instagram", social.instagram],
                ["X", social.x],
                ["LinkedIn", social.linkedin],
                ["WhatsApp", social.whatsapp],
              ] as const
            )
              .filter(([, url]) => Boolean(url))
              .map(([label, url]) => (
                <li key={label}>
                  <a
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 hover:border-brand-300 hover:bg-brand-50"
                  >
                    {label}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
