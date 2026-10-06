import Link from "next/link";
import { activeSocialLinks, getSiteIdentity, getSocialLinks } from "@/services/settings";
import { listExams, listSubjects } from "@/services/taxonomy";

const RESOURCE_LINKS = [
  { href: "/mcqs", label: "All MCQs" },
  { href: "/topics", label: "Topics" },
  { href: "/quiz", label: "Take a Quiz" },
  { href: "/previous-papers", label: "Previous Papers" },
  { href: "/search", label: "Search" },
  { href: "/sitemap", label: "Sitemap" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export async function SiteFooter() {
  const [identity, social, exams, subjects] = await Promise.all([
    getSiteIdentity(),
    getSocialLinks(),
    listExams(),
    listSubjects(),
  ]);
  const socialLinks = activeSocialLinks(social);
  const year = new Date().getFullYear();

  const examLinks = exams.slice(0, 5).map((exam) => ({
    href: `/exams/${exam.slug}`,
    label: `${exam.name} MCQs`,
  }));
  const subjectLinks = subjects.slice(0, 6).map((subject) => ({
    href: `/subjects/${subject.slug}`,
    label: subject.name,
  }));

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">{identity.name}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{identity.tagline}</p>
          <address className="mt-3 space-y-1 text-sm not-italic text-[var(--text-muted)]">
            {identity.contactEmail ? (
              <p>
                <a
                  href={`mailto:${identity.contactEmail}`}
                  className="hover:text-brand-600 hover:underline"
                >
                  {identity.contactEmail}
                </a>
              </p>
            ) : null}
            {identity.contactPhone ? <p>{identity.contactPhone}</p> : null}
            {identity.address ? <p>{identity.address}</p> : null}
          </address>
          {socialLinks.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="text-sm text-[var(--text-muted)] hover:text-brand-600 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <FooterColumn title="Popular Exams" links={examLinks} />
        <FooterColumn title="Popular Subjects" links={subjectLinks} />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-4">
        <p className="mx-auto max-w-6xl text-center text-xs text-[var(--text-muted)]">
          © {year} {identity.name}. All rights reserved. Content is provided for
          exam preparation and practice purposes.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[var(--text-muted)] hover:text-brand-600 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
