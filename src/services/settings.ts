import "@/lib/server-guard";

import { db } from "@/lib/db";

/**
 * Site settings live in the database so administrators can change identity,
 * social links and feature flags without a redeploy. Nothing is hard-coded.
 */

export interface SiteIdentity {
  name: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  youtube: string;
  instagram: string;
  x: string;
  linkedin: string;
  whatsapp: string;
}

export interface FeatureFlags {
  allowGuestQuizzes: boolean;
  allowGuestReports: boolean;
  showQuestionStats: boolean;
  requireEmailVerification: boolean;
}

export interface SeoSettings {
  defaultTitleSuffix: string;
  twitterHandle: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
}

const DEFAULTS = {
  identity: {
    name: "MCQ Prep",
    tagline: "Practice MCQs for jobs, admissions and competitive exams",
    contactEmail: "support@example.com",
    contactPhone: "",
    address: "",
  } satisfies SiteIdentity,
  social: {
    facebook: "",
    youtube: "",
    instagram: "",
    x: "",
    linkedin: "",
    whatsapp: "",
  } satisfies SocialLinks,
  features: {
    allowGuestQuizzes: true,
    allowGuestReports: true,
    showQuestionStats: true,
    requireEmailVerification: false,
  } satisfies FeatureFlags,
  seo: {
    defaultTitleSuffix: "MCQ Prep",
    twitterHandle: "",
    googleSiteVerification: "",
    bingSiteVerification: "",
  } satisfies SeoSettings,
};

async function readSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db.siteSetting.findUnique({ where: { key } });
    if (!row) return fallback;
    return { ...fallback, ...(row.value as object) } as T;
  } catch {
    // Settings are non-critical; fall back rather than breaking the page.
    return fallback;
  }
}

export const getSiteIdentity = () => readSetting("site.identity", DEFAULTS.identity);
export const getSocialLinks = () => readSetting("site.social", DEFAULTS.social);
export const getFeatureFlags = () => readSetting("site.features", DEFAULTS.features);
export const getSeoSettings = () => readSetting("site.seo", DEFAULTS.seo);

export async function updateSetting(key: string, value: Record<string, unknown>) {
  return db.siteSetting.upsert({
    where: { key },
    update: { value: value as never },
    create: { key, value: value as never, group: key.split(".")[1] ?? "general" },
  });
}

/** Only non-empty social links, in a stable display order. */
export function activeSocialLinks(social: SocialLinks) {
  const labels: Record<keyof SocialLinks, string> = {
    facebook: "Facebook",
    youtube: "YouTube",
    instagram: "Instagram",
    x: "X",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  };
  return (Object.keys(labels) as Array<keyof SocialLinks>)
    .filter((key) => Boolean(social[key]))
    .map((key) => ({ key, label: labels[key], href: social[key] }));
}
