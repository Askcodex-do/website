import type { Metadata } from "next";
import { siteName, siteTagline, siteUrl } from "@/lib/env";
import { truncate } from "@/lib/utils";

/**
 * Central metadata builder. Every public page calls this so titles,
 * descriptions, canonicals and social previews are generated consistently from
 * database content — no hand-written duplication, no duplicate canonicals.
 */

export interface PageMetaInput {
  title: string;
  description: string;
  /** Path beginning with "/" — used to build the canonical URL. */
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata(input: PageMetaInput): Metadata {
  const canonical = `${siteUrl}${input.path === "/" ? "" : input.path}`;
  const description = truncate(input.description, 160);
  const ogImage = input.image ?? `${siteUrl}/opengraph-image`;

  return {
    title: input.title,
    description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: input.title,
      description,
      url: canonical,
      siteName,
      locale: "en_PK",
      type: input.type ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: [ogImage],
    },
  };
}

/** Root metadata used by the app layout. */
export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} — ${siteTagline}`,
      template: `%s | ${siteName}`,
    },
    description: siteTagline,
    applicationName: siteName,
    alternates: { canonical: siteUrl },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export interface Breadcrumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
