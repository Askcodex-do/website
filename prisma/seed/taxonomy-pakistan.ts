/**
 * Pakistan exam & career taxonomy.
 *
 * Category → Exam → Program/Test, plus the conducting authority. All of this is
 * data: adding a new exam means adding rows here (and links to subjects), never
 * touching the public site or the Question Selection Engine.
 */

import type { SeedExam } from "./taxonomy";

export type { SeedCategory } from "./taxonomy/categories";
export type { SeedOrganization } from "./taxonomy/organizations";

export { CATEGORIES } from "./taxonomy/categories";
export { ORGANIZATIONS } from "./taxonomy/organizations";
export { EXAMS as PAKISTAN_EXAMS } from "./taxonomy/exams";
