/**
 * Top-level exam categories. Categories group exams for navigation, SEO landing
 * pages and the Question Selection Engine's category filter.
 */

export interface SeedCategory {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  sortOrder: number;
}

export const CATEGORIES: SeedCategory[] = [
  { slug: "competitive-exams", name: "Competitive Examinations", description: "Federal and provincial competitive examinations for civil service and elite administrative posts.", icon: "trophy", sortOrder: 1 },
  { slug: "teaching-tests", name: "Teaching Tests", description: "Recruitment and eligibility tests for school, college and university teaching posts across Pakistan.", icon: "teacher", sortOrder: 2 },
  { slug: "entry-tests", name: "Entry & Admission Tests", description: "University and college admission and aptitude tests (NAT, GAT, HAT, USAT and university-specific tests).", icon: "door", sortOrder: 3 },
  { slug: "medical-engineering", name: "Medical & Engineering", description: "Medical and engineering college admission and aptitude tests (MDCAT, ECAT, UHS, AKU).", icon: "stethoscope", sortOrder: 4 },
  { slug: "academic-exams", name: "Academic Examinations", description: "School and college board examinations: Matric/SSC, Intermediate/HSSC, O-Level and A-Level.", icon: "book", sortOrder: 5 },
  { slug: "degree-programs", name: "Degree Programmes", description: "University degree programme practice: BA/BSc, BS, B.Com, MA, MSc, MBA, MPhil and PhD subjects.", icon: "graduation", sortOrder: 6 },
  { slug: "government-jobs", name: "Government Job Tests", description: "Written and MCQ-based recruitment tests for federal and provincial public-sector posts.", icon: "building", sortOrder: 7 },
  { slug: "police-armed-forces", name: "Police & Armed Forces", description: "Recruitment tests for police, army, air force, navy and paramilitary forces.", icon: "shield", sortOrder: 8 },
  { slug: "banking-tests", name: "Banking & Finance Tests", description: "Banking sector recruitment and aptitude tests, plus finance professional entry tests.", icon: "bank", sortOrder: 9 },
  { slug: "health-jobs", name: "Health & Medical Jobs", description: "Health department recruitment and medical professional entry tests (nursing, pharmacy, DPT, DVM).", icon: "heart-pulse", sortOrder: 10 },
  { slug: "it-computer-jobs", name: "IT & Computer Jobs", description: "IT, computer science and data-entry recruitment tests.", icon: "cpu", sortOrder: 11 },
  { slug: "media-jobs", name: "Media & Journalism", description: "Journalism, broadcasting and information department recruitment tests.", icon: "mic", sortOrder: 12 },
  { slug: "judicial-legal", name: "Judicial & Legal", description: "Law admission tests, judicial service and legal practice examinations.", icon: "scale", sortOrder: 13 },
  { slug: "technical-diploma", name: "Technical & Diploma", description: "Diploma of Associate Engineering (DAE) and technical education entrance and assessment tests.", icon: "gear", sortOrder: 14 },
  { slug: "professional-certification", name: "Professional Certification", description: "Professional body examinations and certifications (accounting, management, project management).", icon: "certificate", sortOrder: 15 },
  { slug: "language-tests", name: "Language & Proficiency Tests", description: "English and Pakistani/regional language proficiency and international test preparation.", icon: "languages", sortOrder: 16 },
  { slug: "general-practice", name: "General Practice", description: "Subject-wise practice banks for general knowledge, English, Urdu, mathematics, science and more.", icon: "sparkles", sortOrder: 17 },
];
