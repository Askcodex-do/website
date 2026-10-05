export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { siteUrl } from "@/lib/env";

export const revalidate = 3600;

/**
 * Sitemap index. Next.js emits /sitemap.xml as an index that points at the
 * chunked child sitemaps below, so the file stays small as the question bank
 * grows into the hundreds of thousands.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [questions, exams, subjects, topics, prepPages, previousPapers] =
    await Promise.all([
      db.question.count({ where: { status: "PUBLISHED" } }),
      db.exam.count({ where: { isActive: true } }),
      db.subject.count(),
      db.topic.count(),
      db.prepPage.count({ where: { isPublished: true } }),
      db.previousPaper.count({ where: { isPublished: true } }),
    ]);

  const chunkSize = 20000;
  const questionChunks = Math.max(1, Math.ceil(questions / chunkSize));

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/exams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/subjects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/mcqs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/previous-papers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Child sitemaps are only advertised when there is content to list, keeping
  // the index honest.
  if (exams > 0) entries.push(childSitemap("exams"));
  if (subjects > 0) entries.push(childSitemap("subjects"));
  if (topics > 0) entries.push(childSitemap("topics"));
  if (prepPages > 0) entries.push(childSitemap("prep-pages"));
  if (previousPapers > 0) entries.push(childSitemap("previous-papers"));
  for (let i = 0; i < questionChunks; i++) {
    entries.push(childSitemap(`questions-${i}`));
  }

  return entries;
}

function childSitemap(slug: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}/sitemaps/${slug}.xml`,
    lastModified: new Date(),
  };
}
