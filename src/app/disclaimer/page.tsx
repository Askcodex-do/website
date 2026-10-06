import type { Metadata } from "next";
import { ContentPage, contentMetadata } from "@/components/layout/content-page";
import { disclaimerSections } from "@/content/legal";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return contentMetadata({
    title: "Disclaimer",
    description:
      "This is an independent practice resource with no affiliation to any examination board.",
    path: "/disclaimer",
  });
}

export default function DisclaimerPage() {
  return (
    <ContentPage
      title="Disclaimer"
      description="Please read this before relying on any content."
      path="/disclaimer"
      sections={disclaimerSections}
    />
  );
}
