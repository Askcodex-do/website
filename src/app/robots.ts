import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

/** /robots.txt — allow public content, keep private and filtered URLs out. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/",
          "/dashboard",
          "/dashboard/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/search",
          "/quiz/",
          // Filtered listing permutations would be near-duplicate content.
          "/mcqs?",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
