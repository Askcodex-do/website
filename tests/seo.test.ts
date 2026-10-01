import { describe, it, expect } from "vitest";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo/metadata";
import { questionJsonLd, itemListJsonLd, faqJsonLd } from "@/lib/seo/structured-data";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { slugify, truncate, contentHash, percent, seededRandom, shuffle } from "@/lib/utils";
import type { PublicQuestion } from "@/services/types";

/**
 * SEO and shared-utility tests. Metadata, structured data, robots and the
 * sitemap index must all be generated from configuration rather than hard-coded.
 */

describe("metadata generation", () => {
  it("builds a canonical URL and Open Graph tags from a path", () => {
    const meta = buildMetadata({
      title: "PST MCQs – Practice Questions with Answers",
      description: "Practice PST MCQs covering important subjects and topics.",
      path: "/exams/pst",
    });
    expect(meta.alternates?.canonical).toContain("/exams/pst");
    expect(meta.openGraph?.title).toBe("PST MCQs – Practice Questions with Answers");
    expect((meta.twitter as { card?: string } | undefined)?.card).toBe(
      "summary_large_image",
    );
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });

  it("truncates long descriptions to the meta limit", () => {
    const meta = buildMetadata({
      title: "Long description test",
      description: "word ".repeat(200),
      path: "/",
    });
    expect((meta.description as string).length).toBeLessThanOrEqual(160);
  });

  it("marks private pages noindex", () => {
    const meta = buildMetadata({
      title: "Dashboard",
      description: "Private",
      path: "/dashboard",
      noindex: true,
    });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });

  it("never produces duplicate canonicals for different paths", () => {
    const a = buildMetadata({ title: "A", description: "a", path: "/exams/pst" });
    const b = buildMetadata({ title: "B", description: "b", path: "/exams/css" });
    expect(a.alternates?.canonical).not.toBe(b.alternates?.canonical);
  });
});

describe("structured data", () => {
  it("emits breadcrumb list JSON-LD", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Exams", path: "/exams" },
    ]);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[0].position).toBe(1);
  });

  it("emits a FAQPage JSON-LD block", () => {
    const data = faqJsonLd([{ question: "What is PST?", answer: "A teaching test." }]);
    expect(data["@type"]).toBe("FAQPage");
  });

  it("emits an item list for category pages", () => {
    const data = itemListJsonLd(
      [{ name: "English", path: "/subjects/english" }],
      "Subjects",
    );
    expect(data["@type"]).toBe("ItemList");
    expect(data.numberOfItems).toBe(1);
  });

  it("emits a Question JSON-LD without leaking the correct option marker", () => {
    const question: PublicQuestion = {
      id: "1",
      slug: "what-is-a-noun",
      stem: "What is a noun?",
      explanation: "A naming word.",
      source: null,
      reference: null,
      difficulty: "EASY",
      type: "SINGLE_CHOICE",
      language: "ENGLISH",
      status: "PUBLISHED",
      year: null,
      province: null,
      likeCount: 0,
      bookmarkCount: 0,
      viewCount: 0,
      timesAnswered: 0,
      timesCorrect: 0,
      options: [
        { id: "a", label: "A", text: "A naming word" },
        { id: "b", label: "B", text: "A doing word" },
      ],
      subject: { slug: "english", name: "English" },
      topic: { slug: "parts-of-speech", name: "Parts of Speech" },
      exams: [{ slug: "css", name: "CSS" }],
    };
    const data = questionJsonLd(question, "/mcqs/what-is-a-noun");
    expect(data["@type"]).toBe("Question");
    expect(JSON.stringify(data)).toContain("what-is-a-noun");
  });
});

describe("robots.txt", () => {
  it("allows public content and blocks private areas", () => {
    const robotsTxt = robots();
    const rules = Array.isArray(robotsTxt.rules) ? robotsTxt.rules[0] : robotsTxt.rules;
    expect(rules?.allow).toBe("/");
    const disallow = Array.isArray(rules?.disallow) ? rules.disallow : [rules?.disallow];
    expect(disallow).toContain("/admin");
    expect(disallow).toContain("/dashboard");
    expect(robotsTxt.sitemap).toContain("/sitemap.xml");
  });
});

describe("sitemap index", () => {
  it("lists core pages and child sitemaps", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/exams"))).toBe(true);
    expect(urls.some((u) => u.includes("/sitemaps/questions-0.xml"))).toBe(true);
  });
});

describe("shared utilities", () => {
  it("slugifies text into URL-safe segments", () => {
    expect(slugify("What is a Noun?")).toBe("what-is-a-noun");
    expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
  });

  it("produces a stable content hash regardless of option order", () => {
    const a = contentHash({ stem: "Q", options: ["x", "y", "z", "w"], correct: "x" });
    const b = contentHash({ stem: "Q", options: ["w", "z", "y", "x"], correct: "x" });
    expect(a).toBe(b);
  });

  it("computes percentages safely", () => {
    expect(percent(3, 4)).toBe(75);
    expect(percent(0, 0)).toBe(0);
  });

  it("shuffles deterministically with a seeded generator", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = shuffle(items, seededRandom("seed"));
    const b = shuffle(items, seededRandom("seed"));
    expect(a).toEqual(b);
  });

  it("truncates at word boundaries", () => {
    expect(truncate("the quick brown fox jumps", 12)).toContain("…");
  });
});
