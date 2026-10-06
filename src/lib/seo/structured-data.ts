import { siteName, siteUrl } from "@/lib/env";
import type { PublicQuestion } from "@/services/types";

/**
 * JSON-LD structured data builders. Emitting accurate schema.org markup helps
 * search engines understand the content without any black-hat tactics.
 */

export function organizationJsonLd(social: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    url: siteUrl,
    sameAs: Object.values(social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function quizJsonLd(input: {
  name: string;
  description: string;
  path: string;
  questionCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    educationalLevel: "Multiple",
    numberOfQuestions: input.questionCount,
    about: { "@type": "Thing", name: "Multiple choice examination preparation" },
  };
}

/**
 * Question schema for an individual MCQ page. The accepted answer is
 * intentionally omitted so the correct option is never exposed to crawlers
 * before a user answers.
 */
export function questionJsonLd(question: PublicQuestion, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question.stem,
    url: `${siteUrl}${path}`,
    eduQuestionType: "Multiple choice",
    learningResourceType: "Quiz",
    ...(question.subject
      ? { about: { "@type": "Thing", name: question.subject.name } }
      : {}),
    suggestedAnswer: question.options.map((option) => ({
      "@type": "Answer",
      position: option.label,
      text: option.text,
    })),
    ...(question.explanation
      ? { comment: { "@type": "Comment", text: question.explanation } }
      : {}),
  };
}

export function itemListJsonLd(
  items: Array<{ name: string; path: string }>,
  name: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Serialise JSON-LD safely for embedding in a <script> tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
