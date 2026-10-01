import type { Metadata } from "next";
import { ContentPage, contentMetadata } from "@/components/layout/content-page";
import { termsSections } from "@/content/legal";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return contentMetadata({
    title: "Terms & Conditions",
    description:
      "The terms that govern your use of this MCQ practice platform.",
    path: "/terms-conditions",
  });
}

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms & Conditions"
      description="The ground rules for using the platform."
      path="/terms-conditions"
      sections={termsSections}
    />
  );
}
