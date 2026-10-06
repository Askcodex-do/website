import type { Metadata } from "next";
import { ContentPage, contentMetadata } from "@/components/layout/content-page";
import { cookieSections } from "@/content/legal";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return contentMetadata({
    title: "Cookie Policy",
    description:
      "The essential cookies we use, and why there are no advertising cookies.",
    path: "/cookie-policy",
  });
}

export default function CookiePolicyPage() {
  return (
    <ContentPage
      title="Cookie Policy"
      description="A short, honest account of the cookies we set."
      path="/cookie-policy"
      sections={cookieSections}
    />
  );
}
