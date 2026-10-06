/**
 * Shared types for the seed data set. The seed is intentionally plain data so
 * that the same structures can be reused by tests and the bulk importer.
 */

export type SeedDifficulty = "EASY" | "MEDIUM" | "HARD";
export type SeedLanguage = "ENGLISH" | "URDU" | "SINDHI";

export interface SeedQuestion {
  /** Unique, human-readable slug used in the public URL. */
  slug: string;
  stem: string;
  options: string[]; // exactly 4, in order A–D
  /** Index into `options` (0-based). */
  correct: number;
  explanation?: string;
  reference?: string;
  source?: string;
  difficulty?: SeedDifficulty;
  subject: string; // subject slug
  topic: string; // topic slug
  exams: string[]; // exam slugs
  educationLevels: string[]; // education level slugs
  year?: number;
  province?: string;
  tags?: string[];
  staticOrder?: number;
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  /** Provenance; defaults to GENERATED unless a source is supplied. */
  origin?:
    | "OFFICIAL_PAPER"
    | "VERIFIED_PRACTICE"
    | "GENERATED"
    | "IMPORTED";
  /** Content language; defaults to ENGLISH. */
  language?: SeedLanguage;
}
