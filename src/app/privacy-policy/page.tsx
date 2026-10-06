import type { Metadata } from "next";
import { ContentPage, contentMetadata } from "@/components/layout/content-page";
import { privacySections } from "@/content/legal";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return contentMetadata({
    title: "Privacy Policy",
    description:
      "How we collect, use and protect your information, including cookies and account data.",
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      description="How we handle your data, in plain language."
      path="/privacy-policy"
      sections={privacySections}
    />
  );
}
