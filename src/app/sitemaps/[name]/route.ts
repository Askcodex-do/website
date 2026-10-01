import { db } from "@/lib/db";
import { siteUrl } from "@/lib/env";

export const revalidate = 3600;

const CHUNK_SIZE = 20000;

/**
 * Child sitemaps referenced by /sitemap.xml.
 *
 * Each kind of content is streamed from the database in pages so a question
 * bank with hundreds of thousands of rows never has to be held in memory at
 * once. Unknown names return 404 rather than an empty sitemap.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const slug = name.replace(/\.xml$/, "");

  const urls: Array<{ loc: string; lastmod?: Date; priority?: number }> = [];

  if (slug === "exams") {
    const exams = await db.exam.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });
    urls.push(
      ...exams.map((e) => ({
        loc: `${siteUrl}/exams/${e.slug}`,
        lastmod: e.updatedAt,
        priority: 0.8,
      })),
    );
  } else if (slug === "subjects") {
    const subjects = await db.subject.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });
    urls.push(
      ...subjects.map((s) => ({
        loc: `${siteUrl}/subjects/${s.slug}`,
        lastmod: s.updatedAt,
        priority: 0.8,
      })),
    );
  } else if (slug === "topics") {
    const topics = await db.topic.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });
    urls.push(
      ...topics.map((t) => ({
        loc: `${siteUrl}/topics/${t.slug}`,
        lastmod: t.updatedAt,
        priority: 0.6,
      })),
    );
  } else if (slug.startsWith("questions-")) {
    const index = Number.parseInt(slug.replace("questions-", ""), 10);
    if (!Number.isFinite(index) || index < 0) {
      return new Response("Not found", { status: 404 });
    }
    const questions = await db.question.findMany({
      where: { status: "PUBLISHED" },
      select: {
        slug: true,
        updatedAt: true,
        subjects: { take: 1, select: { subject: { select: { slug: true } } } },
      },
      orderBy: { id: "asc" },
      skip: index * CHUNK_SIZE,
      take: CHUNK_SIZE,
    });
    if (questions.length === 0 && index > 0) {
      return new Response("Not found", { status: 404 });
    }
    urls.push(
      ...questions.map((q) => ({
        loc: `${siteUrl}/mcqs/${q.subjects[0]?.subject.slug ?? "general"}/${q.slug}`,
        lastmod: q.updatedAt,
        priority: 0.5,
      })),
    );
  } else {
    return new Response("Not found", { status: 404 });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url><loc>${escapeXml(url.loc)}</loc>${
        url.lastmod ? `<lastmod>${url.lastmod.toISOString()}</lastmod>` : ""
      }${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ""}</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
