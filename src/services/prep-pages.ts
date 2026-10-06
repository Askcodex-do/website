import "@/lib/server-guard";

import type { PrepPageType } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * PrepPages — reads reusable, template-driven preparation content. One small set
 * of templates renders every exam's pages; the content is data, keyed on
 * `type`.
 */

export interface PrepSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface PrepFaq {
  question: string;
  answer: string;
}

export interface PrepPageSummary {
  id: string;
  slug: string;
  type: PrepPageType;
  title: string;
  summary: string | null;
  sortOrder: number;
}

export interface PrepPageView extends PrepPageSummary {
  sections: PrepSection[];
  faqs: PrepFaq[];
  exam: { slug: string; name: string } | null;
}

function coerceSections(value: unknown): PrepSection[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      heading: String(item.heading ?? ""),
      body: String(item.body ?? ""),
      bullets: Array.isArray(item.bullets)
        ? item.bullets.map((b) => String(b))
        : undefined,
    }));
}

function coerceFaqs(value: unknown): PrepFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      question: String(item.question ?? ""),
      answer: String(item.answer ?? ""),
    }));
}

export async function listPrepPagesForExam(
  examSlug: string,
): Promise<PrepPageSummary[]> {
  const pages = await db.prepPage.findMany({
    where: { isPublished: true, exam: { slug: examSlug, isActive: true } },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      type: true,
      title: true,
      summary: true,
      sortOrder: true,
    },
  });
  return pages;
}

type PrepPageRow = {
  id: string;
  slug: string;
  type: PrepPageType;
  title: string;
  summary: string | null;
  sortOrder: number;
  sections: unknown;
  faqs: unknown;
  exam: { slug: string; name: string } | null;
};

function toPrepPageView(page: PrepPageRow): PrepPageView {
  return {
    id: page.id,
    slug: page.slug,
    type: page.type,
    title: page.title,
    summary: page.summary,
    sortOrder: page.sortOrder,
    sections: coerceSections(page.sections),
    faqs: coerceFaqs(page.faqs),
    exam: page.exam,
  };
}

export async function getPrepPageBySlug(
  slug: string,
): Promise<PrepPageView | null> {
  const page = await db.prepPage.findFirst({
    where: { slug, isPublished: true },
    include: { exam: { select: { slug: true, name: true } } },
  });
  return page ? toPrepPageView(page) : null;
}

/** A single prep page of a given type for an exam (e.g. its FAQ page). */
export async function getExamPrepPage(
  examSlug: string,
  type: PrepPageType,
): Promise<PrepPageView | null> {
  const page = await db.prepPage.findFirst({
    where: { isPublished: true, type, exam: { slug: examSlug } },
    include: { exam: { select: { slug: true, name: true } } },
  });
  return page ? toPrepPageView(page) : null;
}
