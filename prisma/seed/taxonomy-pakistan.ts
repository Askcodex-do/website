/**
 * Pakistan exam & career taxonomy.
 *
 * Category → Exam → Program/Test, plus the conducting authority. All of this is
 * data: adding a new exam means adding rows here (and links to subjects), never
 * touching the public site or the Question Selection Engine.
 */

import type { SeedExam } from "./taxonomy";

export interface SeedCategory {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  sortOrder: number;
}

export interface SeedOrganization {
  slug: string;
  name: string;
  shortName?: string;
  website?: string;
  description?: string;
}

export const CATEGORIES: SeedCategory[] = [
  {
    slug: "teaching-tests",
    name: "Teaching Tests",
    description:
      "Recruitment and eligibility tests for school, college and university teaching posts across Pakistan.",
    icon: "teacher",
    sortOrder: 1,
  },
  {
    slug: "competitive-exams",
    name: "Competitive Examinations",
    description:
      "Federal and provincial competitive examinations for civil service and elite administrative posts.",
    icon: "trophy",
    sortOrder: 2,
  },
  {
    slug: "entry-tests",
    name: "Entry & Admission Tests",
    description:
      "University and professional college admission tests (MDCAT, ECAT, NAT, GAT and university-specific tests).",
    icon: "door",
    sortOrder: 3,
  },
  {
    slug: "academic-exams",
    name: "Academic Examinations",
    description:
      "School and college board examinations: Matric/SSC and Intermediate/HSSC, plus subject practice.",
    icon: "book",
    sortOrder: 4,
  },
  {
    slug: "government-jobs",
    name: "Government Job Tests",
    description:
      "Written and MCQ-based recruitment tests for federal and provincial public-sector posts.",
    icon: "building",
    sortOrder: 5,
  },
  {
    slug: "medical-engineering",
    name: "Medical & Engineering",
    description:
      "Medical and engineering college admission and aptitude tests.",
    icon: "stethoscope",
    sortOrder: 6,
  },
  {
    slug: "banking-tests",
    name: "Banking & Finance Tests",
    description:
      "Banking sector recruitment and aptitude tests, plus finance professional entry tests.",
    icon: "bank",
    sortOrder: 7,
  },
  {
    slug: "police-armed-forces",
    name: "Police & Armed Forces",
    description:
      "Recruitment tests for police, army, air force, navy and paramilitary forces.",
    icon: "shield",
    sortOrder: 8,
  },
  {
    slug: "technical-diploma",
    name: "Technical & Diploma",
    description:
      "Diploma of Associate Engineering (DAE) and technical education entrance and assessment tests.",
    icon: "gear",
    sortOrder: 9,
  },
  {
    slug: "professional-certification",
    name: "Professional Certification",
    description:
      "Professional body examinations and certifications (accounting, IT, management).",
    icon: "certificate",
    sortOrder: 10,
  },
  {
    slug: "general-practice",
    name: "General Practice",
    description:
      "Subject-wise practice banks for general knowledge, English, mathematics, science and more.",
    icon: "sparkles",
    sortOrder: 11,
  },
];

export const ORGANIZATIONS: SeedOrganization[] = [
  {
    slug: "fpsc",
    name: "Federal Public Service Commission",
    shortName: "FPSC",
    website: "https://www.fpsc.gov.pk",
    description: "Federal authority for CSS and central superior services recruitment.",
  },
  {
    slug: "ppsc",
    name: "Punjab Public Service Commission",
    shortName: "PPSC",
    website: "https://www.ppsc.gop.pk",
    description: "Provincial commission for Punjab government recruitment.",
  },
  {
    slug: "spsc",
    name: "Sindh Public Service Commission",
    shortName: "SPSC",
    website: "https://www.spsc.gov.pk",
    description: "Provincial commission for Sindh government recruitment.",
  },
  {
    slug: "kppsc",
    name: "Khyber Pakhtunkhwa Public Service Commission",
    shortName: "KPPSC",
    website: "https://www.kppsc.gov.pk",
    description: "Provincial commission for Khyber Pakhtunkhwa recruitment.",
  },
  {
    slug: "bpsc",
    name: "Balochistan Public Service Commission",
    shortName: "BPSC",
    website: "https://www.bpsc.gob.pk",
    description: "Provincial commission for Balochistan recruitment.",
  },
  {
    slug: "nts",
    name: "National Testing Service",
    shortName: "NTS",
    website: "https://www.nts.org.pk",
    description: "National testing body conducting NAT, GAT and many job tests.",
  },
  {
    slug: "hec",
    name: "Higher Education Commission",
    shortName: "HEC",
    website: "https://www.hec.gov.pk",
    description: "Federal regulator for higher education and university admissions.",
  },
  {
    slug: "etea",
    name: "Educational Testing and Evaluation Agency",
    shortName: "ETEA",
    website: "https://www.etea.edu.pk",
    description: "Khyber Pakhtunkhwa testing agency for admissions and recruitment.",
  },
  {
    slug: "uhs",
    name: "University of Health Sciences",
    shortName: "UHS",
    website: "https://www.uhs.edu.pk",
    description: "Conducts medical and dental college admission tests in Punjab.",
  },
  {
    slug: "pmdc",
    name: "Pakistan Medical & Dental Council",
    shortName: "PMDC",
    website: "https://www.pmdc.pk",
    description: "Regulator for medical and dental education and the MDCAT.",
  },
  {
    slug: "pec",
    name: "Pakistan Engineering Council",
    shortName: "PEC",
    website: "https://www.pec.org.pk",
    description: "Regulator for engineering education and accreditation.",
  },
  {
    slug: "sbps",
    name: "Institute of Bankers Pakistan",
    shortName: "IBP",
    website: "https://www.ibp.org.pk",
    description: "Professional body for banking examinations and certification.",
  },
  {
    slug: "provincial-boards",
    name: "Provincial Education Boards",
    shortName: "Boards",
    description:
      "Provincial boards of intermediate and secondary education (BISE) conducting Matric and Intermediate exams.",
  },
  {
    slug: "police",
    name: "Provincial Police Departments",
    shortName: "Police",
    description: "Provincial police recruitment and promotion testing.",
  },
  {
    slug: "pak-army",
    name: "Pakistan Armed Forces",
    shortName: "Armed Forces",
    description: "Army, Air Force and Navy recruitment and selection tests.",
  },
  {
    slug: "sst",
    name: "School Education Departments",
    shortName: "SED",
    description: "Provincial school education departments recruiting teachers.",
  },
];

/**
 * Exam catalogue. Each exam carries its hierarchy links, education levels,
 * subjects, structured metadata for preparation pages, and the configuration
 * that drives the Question Selection Engine.
 */
/* -------------------------------------------------------------------------- */
/* Exams                                                                      */
/* -------------------------------------------------------------------------- */

export const PAKISTAN_EXAMS: SeedExam[] = [
  {
    slug: "pst",
    name: "PST — Primary School Teacher",
    shortName: "PST",
    description:
      "Practice MCQs for the Primary School Teacher recruitment test covering English, Mathematics, General Science, Islamiat and Pakistan Studies at primary level.",
    type: "JOB",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 1,
    category: "teaching-tests",
    organization: "sst",
    eligibility:
      "Graduate (BA/BSc) with a recognised teaching qualification.",
    testPattern:
      "100 multiple-choice questions; no negative marking; merit based on written test and interview.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["primary", "matric", "intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-science", "islamiat", "pakistan-studies", "general-knowledge"],
    configuration: {
      mode: "STATIC",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
      staticOrderSeed: "pst-v1",
    },
  },
  {
    slug: "jest",
    name: "JEST — Junior Elementary School Teacher",
    shortName: "JEST",
    description:
      "Practice MCQs for the Junior Elementary School Teacher recruitment test.",
    type: "JOB",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 2,
    category: "teaching-tests",
    organization: "sst",
    eligibility:
      "Graduate with B.Ed or equivalent teaching qualification.",
    testPattern:
      "100 MCQs covering subject knowledge and teaching aptitude.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-science", "islamiat", "pakistan-studies", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "sst-general",
    name: "SST — Secondary School Teacher",
    shortName: "SST",
    description:
      "Practice MCQs for Secondary School Teacher recruitment across science and general subjects.",
    type: "JOB",
    province: "Punjab",
    sortOrder: 3,
    category: "teaching-tests",
    organization: "ppsc",
    eligibility:
      "Master's degree in the relevant subject with B.Ed.",
    testPattern:
      "Subject-specific MCQs plus general ability questions.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "general-science", "computer", "pakistan-studies", "islamiat", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "lecturer",
    name: "Lecturer Recruitment Test",
    shortName: "Lecturer",
    description:
      "Practice MCQs for lecturer and college teacher recruitment across subjects.",
    type: "JOB",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 4,
    category: "teaching-tests",
    organization: "ppsc",
    eligibility:
      "Master's or MPhil in the relevant subject.",
    testPattern:
      "Subject MCQs with a general ability section; negative marking applies.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "general-science", "computer", "pakistan-studies", "islamiat", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 35,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "aEO",
    name: "AEO — Assistant Education Officer",
    shortName: "AEO",
    description:
      "Practice MCQs for Assistant Education Officer recruitment tests.",
    type: "JOB",
    province: "Punjab",
    sortOrder: 5,
    category: "teaching-tests",
    organization: "ppsc",
    eligibility:
      "Master's degree with B.Ed or M.Ed.",
    testPattern:
      "General ability, education and subject knowledge MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "islamiat", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "css",
    name: "CSS — Central Superior Services",
    shortName: "CSS",
    description:
      "Practice MCQs for the CSS competitive examination covering English, General Science, Pakistan Affairs, Islamiat, Current Affairs and Analytical Reasoning.",
    type: "COMPETITIVE",
    province: "Federal",
    isFeatured: true,
    sortOrder: 6,
    category: "competitive-exams",
    organization: "fpsc",
    eligibility:
      "Bachelor's degree (2nd division) from a recognised university.",
    testPattern:
      "MCQ-based screening test (100 marks) followed by written and interview stages.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "general-science", "pakistan-studies", "islamiat", "current-affairs", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pms",
    name: "PMS — Provincial Management Service",
    shortName: "PMS",
    description:
      "Practice MCQs for the Provincial Management Service competitive examination.",
    type: "COMPETITIVE",
    province: "Punjab",
    sortOrder: 7,
    category: "competitive-exams",
    organization: "ppsc",
    eligibility:
      "Bachelor's degree from a recognised university.",
    testPattern:
      "MCQ screening test followed by written papers and interview.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "pakistan-studies", "islamiat", "current-affairs", "general-knowledge", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "fpsc-general",
    name: "FPSC General Recruitment Test",
    shortName: "FPSC",
    description:
      "Practice MCQs for Federal Public Service Commission general recruitment tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 8,
    category: "competitive-exams",
    organization: "fpsc",
    eligibility:
      "Varies by post; usually a relevant bachelor's or master's degree.",
    testPattern:
      "Subject and general ability MCQs depending on the post.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "islamiat", "current-affairs", "analytical-reasoning", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "ppsc-general",
    name: "PPSC General Recruitment Test",
    shortName: "PPSC",
    description:
      "Practice MCQs for Punjab Public Service Commission recruitment tests.",
    type: "JOB",
    province: "Punjab",
    sortOrder: 9,
    category: "competitive-exams",
    organization: "ppsc",
    eligibility:
      "Varies by post; relevant degree required.",
    testPattern:
      "General ability and subject-specific MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "islamiat", "current-affairs", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "mdcat",
    name: "MDCAT — Medical & Dental College Admission Test",
    shortName: "MDCAT",
    description:
      "Practice MCQs for the Medical and Dental College Admission Test covering Biology, Chemistry, Physics and English.",
    type: "ADMISSION",
    province: "Federal",
    isFeatured: true,
    sortOrder: 10,
    category: "medical-engineering",
    organization: "pmdc",
    eligibility:
      "Intermediate (HSSC) with pre-medical subjects.",
    testPattern:
      "200 MCQs across Biology, Chemistry, Physics and English; no negative marking.",
    duration:
      "210 minutes",
    totalMarks:
      "200",
    educationLevels: ["intermediate"],
    subjects: ["general-science", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 30,
      timeLimitMinutes: 45,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "ecat",
    name: "ECAT — Engineering College Admission Test",
    shortName: "ECAT",
    description:
      "Practice MCQs for the Engineering College Admission Test covering Physics, Chemistry, Mathematics and English.",
    type: "ADMISSION",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 11,
    category: "medical-engineering",
    organization: "pec",
    eligibility:
      "Intermediate (HSSC) with pre-engineering subjects.",
    testPattern:
      "100 MCQs across Physics, Chemistry, Mathematics and English.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "general-science", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 30,
      timeLimitMinutes: 45,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "nat",
    name: "NAT — National Aptitude Test",
    shortName: "NAT",
    description:
      "Practice MCQs for the National Aptitude Test used for university admissions.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 12,
    category: "entry-tests",
    organization: "nts",
    eligibility:
      "Intermediate or equivalent for undergraduate admissions.",
    testPattern:
      "Verbal, quantitative and analytical reasoning MCQs.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 30,
      timeLimitMinutes: 40,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "gat",
    name: "GAT — Graduate Assessment Test",
    shortName: "GAT",
    description:
      "Practice MCQs for the Graduate Assessment Test for postgraduate admissions.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 13,
    category: "entry-tests",
    organization: "nts",
    eligibility:
      "Bachelor's degree for MS/MPhil admissions.",
    testPattern:
      "Verbal, quantitative and analytical reasoning MCQs.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 40,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "university-entry-test",
    name: "University Entry Test",
    shortName: "Entry Test",
    description:
      "Practice MCQs for university admission and entry tests (MDCAT/ECAT style aptitude and subject questions).",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 14,
    category: "entry-tests",
    organization: "hec",
    eligibility:
      "Intermediate (HSSC) or equivalent.",
    testPattern:
      "Subject and aptitude MCQs depending on the programme.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-science", "analytical-reasoning", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 30,
      timeLimitMinutes: 40,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "admission-test",
    name: "Admission Tests (General)",
    shortName: "Admission",
    description:
      "General admission and scholarship test practice for colleges and universities.",
    type: "ADMISSION",
    sortOrder: 15,
    category: "entry-tests",
    organization: "hec",
    eligibility:
      "Matric to graduation depending on the programme.",
    testPattern:
      "General ability and subject MCQs.",
    duration:
      "60 minutes",
    totalMarks:
      "100",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-science", "general-knowledge", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "matric-ssc",
    name: "Matric / SSC Board Examination",
    shortName: "Matric",
    description:
      "Practice MCQs for Matriculation (SSC) board examinations across science and general subjects.",
    type: "EDUCATIONAL",
    sortOrder: 16,
    category: "academic-exams",
    organization: "provincial-boards",
    eligibility:
      "Class 9–10 students of recognised schools.",
    testPattern:
      "Objective (MCQ) paper alongside subjective papers per subject.",
    duration:
      "Per subject",
    totalMarks:
      "Per subject",
    educationLevels: ["matric"],
    subjects: ["english", "mathematics", "general-science", "computer", "pakistan-studies", "islamiat"],
    configuration: {
      mode: "STATIC",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
      staticOrderSeed: "matric-v1",
    },
  },
  {
    slug: "intermediate-hssc",
    name: "Intermediate / HSSC Board Examination",
    shortName: "Intermediate",
    description:
      "Practice MCQs for Intermediate (HSSC) board examinations across science and general subjects.",
    type: "EDUCATIONAL",
    sortOrder: 17,
    category: "academic-exams",
    organization: "provincial-boards",
    eligibility:
      "Class 11–12 students of recognised colleges.",
    testPattern:
      "Objective (MCQ) paper alongside subjective papers per subject.",
    duration:
      "Per subject",
    totalMarks:
      "Per subject",
    educationLevels: ["intermediate"],
    subjects: ["english", "mathematics", "general-science", "computer", "pakistan-studies", "islamiat"],
    configuration: {
      mode: "STATIC",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
      staticOrderSeed: "hssc-v1",
    },
  },
  {
    slug: "nts-nat-undergrad",
    name: "Undergraduate Admission Test (NTS)",
    shortName: "UG Admission",
    description:
      "Practice MCQs for undergraduate admission tests administered by national testing services.",
    type: "ADMISSION",
    sortOrder: 18,
    category: "academic-exams",
    organization: "nts",
    eligibility:
      "Intermediate or equivalent.",
    testPattern:
      "Verbal, quantitative and subject MCQs.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 40,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "fia-test",
    name: "FIA Recruitment Test",
    shortName: "FIA",
    description:
      "Practice MCQs for Federal Investigation Agency recruitment tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 19,
    category: "government-jobs",
    organization: "fpsc",
    eligibility:
      "Varies by post; relevant degree required.",
    testPattern:
      "General knowledge, English and analytical reasoning MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "analytical-reasoning", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "customs-inspector",
    name: "Customs / Excise Inspector Test",
    shortName: "Customs",
    description:
      "Practice MCQs for Customs and Excise inspector recruitment tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 20,
    category: "government-jobs",
    organization: "fpsc",
    eligibility:
      "Bachelor's degree from a recognised university.",
    testPattern:
      "General ability and subject MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "health-department-test",
    name: "Health Department Recruitment Test",
    shortName: "Health Dept",
    description:
      "Practice MCQs for provincial health department recruitment (technical and non-technical posts).",
    type: "JOB",
    province: "Punjab",
    sortOrder: 21,
    category: "government-jobs",
    organization: "ppsc",
    eligibility:
      "Varies by post; relevant technical qualification.",
    testPattern:
      "Subject and general ability MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["general-science", "english", "general-knowledge", "islamiat"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "banking-test",
    name: "Banking Recruitment Test",
    shortName: "Banking",
    description:
      "Practice MCQs for commercial bank recruitment and aptitude tests (NBP, HBL, UBL and others).",
    type: "JOB",
    province: "Federal",
    sortOrder: 22,
    category: "banking-tests",
    organization: "sbps",
    eligibility:
      "Bachelor's or master's degree, usually in business or a related field.",
    testPattern:
      "English, quantitative, analytical and general knowledge MCQs.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge", "current-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 40,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "state-bank-test",
    name: "State Bank of Pakistan Test",
    shortName: "SBP",
    description:
      "Practice MCQs for State Bank of Pakistan recruitment tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 23,
    category: "banking-tests",
    organization: "sbps",
    eligibility:
      "Bachelor's or master's degree, typically in economics, finance or IT.",
    testPattern:
      "Quantitative, analytical, English and economics/finance MCQs.",
    duration:
      "120 minutes",
    totalMarks:
      "100",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "current-affairs", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 40,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "police-test",
    name: "Police Recruitment Test",
    shortName: "Police",
    description:
      "Practice MCQs for provincial police recruitment tests.",
    type: "JOB",
    province: "Punjab",
    sortOrder: 24,
    category: "police-armed-forces",
    organization: "police",
    eligibility:
      "Matric to graduation depending on the post.",
    testPattern:
      "General knowledge, English, mathematics and Pakistan Studies MCQs.",
    duration:
      "60 minutes",
    totalMarks:
      "100",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["general-knowledge", "english", "pakistan-studies", "islamiat", "mathematics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pak-army-test",
    name: "Pakistan Army Selection Test",
    shortName: "Pak Army",
    description:
      "Practice MCQs for Pakistan Army initial selection and academic tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 25,
    category: "police-armed-forces",
    organization: "pak-army",
    eligibility:
      "Intermediate to graduation depending on the entry.",
    testPattern:
      "Verbal, non-verbal, academic and general knowledge MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-knowledge", "pakistan-studies", "islamiat", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "paf-test",
    name: "Pakistan Air Force Selection Test",
    shortName: "PAF",
    description:
      "Practice MCQs for Pakistan Air Force initial selection tests.",
    type: "JOB",
    province: "Federal",
    sortOrder: 26,
    category: "police-armed-forces",
    organization: "pak-army",
    eligibility:
      "Intermediate (pre-engineering/pre-medical) to graduation.",
    testPattern:
      "Verbal, non-verbal, physics and mathematics MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["intermediate", "graduation"],
    subjects: ["english", "mathematics", "general-science", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "dae-entry",
    name: "DAE — Diploma of Associate Engineering Entry Test",
    shortName: "DAE",
    description:
      "Practice MCQs for Diploma of Associate Engineering entrance and assessment tests.",
    type: "ADMISSION",
    sortOrder: 27,
    category: "technical-diploma",
    organization: "etea",
    eligibility:
      "Matric (science) or equivalent.",
    testPattern:
      "Mathematics, physics, chemistry and English MCQs.",
    duration:
      "90 minutes",
    totalMarks:
      "100",
    educationLevels: ["matric", "intermediate"],
    subjects: ["mathematics", "general-science", "english", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "professional-certification",
    name: "Professional Certification Exams",
    shortName: "Professional",
    description:
      "Practice MCQs for professional certification and body examinations.",
    type: "COMPETITIVE",
    sortOrder: 28,
    category: "professional-certification",
    organization: "hec",
    eligibility:
      "Varies by certification; usually a relevant degree.",
    testPattern:
      "Subject-specific MCQ and scenario-based questions.",
    duration:
      "Varies",
    totalMarks:
      "Varies",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["computer", "english", "analytical-reasoning", "current-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "english-grammar",
    name: "English Grammar Practice",
    shortName: "English Grammar",
    description:
      "Unlimited random English grammar MCQs covering tenses, articles, prepositions, voice and sentence structure.",
    type: "EDUCATIONAL",
    isFeatured: true,
    sortOrder: 29,
    category: "general-practice",
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "general-knowledge",
    name: "General Knowledge Practice",
    shortName: "General Knowledge",
    description:
      "Random general knowledge MCQs on world geography, science, sports and books.",
    type: "GENERAL",
    isFeatured: true,
    sortOrder: 30,
    category: "general-practice",
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["general-knowledge", "everyday-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "mathematics-practice",
    name: "Mathematics Practice",
    shortName: "Mathematics",
    description:
      "Random mathematics MCQs covering arithmetic, algebra, geometry and percentages.",
    type: "EDUCATIONAL",
    sortOrder: 31,
    category: "general-practice",
    educationLevels: ["middle", "matric", "intermediate"],
    subjects: ["mathematics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "computer-practice",
    name: "Computer Practice",
    shortName: "Computer",
    description:
      "Random computer science MCQs covering fundamentals, hardware, software and networking.",
    type: "EDUCATIONAL",
    sortOrder: 32,
    category: "general-practice",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "islamiat-practice",
    name: "Islamiat Practice",
    shortName: "Islamiat",
    description:
      "Random Islamiat MCQs on Quran, Seerah, Ibadat and history.",
    type: "EDUCATIONAL",
    sortOrder: 33,
    category: "general-practice",
    educationLevels: ["primary", "middle", "matric", "intermediate"],
    subjects: ["islamiat"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pakistan-studies-practice",
    name: "Pakistan Studies Practice",
    shortName: "Pakistan Studies",
    description:
      "Random Pakistan Studies MCQs on the Pakistan Movement, geography and constitution.",
    type: "EDUCATIONAL",
    sortOrder: 34,
    category: "general-practice",
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["pakistan-studies"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "current-affairs-practice",
    name: "Current Affairs Practice",
    shortName: "Current Affairs",
    description:
      "Random current affairs MCQs on international relations, economy and organizations.",
    type: "GENERAL",
    sortOrder: 35,
    category: "general-practice",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["current-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "fpsc",
    name: "FPSC General Recruitment Tests",
    shortName: "FPSC",
    description:
      "Practice questions for Federal Public Service Commission recruitment examinations.",
    type: "JOB",
    province: "Federal",
    isFeatured: true,
    sortOrder: 2,
    category: "competitive-exams",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "general-knowledge", "pakistan-studies", "islamiat", "current-affairs", "everyday-science", "computer", "analytical-reasoning", "mathematics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "nts",
    name: "NTS General Test",
    shortName: "NTS",
    description:
      "General preparation for National Testing Service Pakistan tests.",
    type: "JOB",
    province: "Federal",
    isFeatured: true,
    sortOrder: 3,
    category: "entry-tests",
    organization: "nts",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge", "computer", "everyday-science", "pakistan-studies", "current-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "gat-general",
    name: "NTS GAT General",
    shortName: "GAT General",
    description:
      "Graduate Assessment Test General preparation for postgraduate admissions.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 5,
    category: "entry-tests",
    organization: "nts",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "gat-subject",
    name: "NTS GAT Subject",
    shortName: "GAT Subject",
    description:
      "Graduate Assessment Test Subject preparation for postgraduate candidates.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 6,
    category: "entry-tests",
    organization: "nts",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "hec-usat",
    name: "HEC USAT — Undergraduate Studies Aptitude Test",
    shortName: "USAT",
    description:
      "Undergraduate Studies Aptitude Test preparation.",
    type: "ADMISSION",
    province: "Federal",
    isFeatured: true,
    sortOrder: 7,
    category: "entry-tests",
    organization: "nts",
    educationLevels: ["intermediate"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 100,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "hec-hat",
    name: "HEC HAT — Higher Education Aptitude Test",
    shortName: "HAT",
    description:
      "Higher Education Aptitude Test preparation for scholarships and postgraduate opportunities.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 8,
    category: "entry-tests",
    organization: "nts",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 100,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "nums",
    name: "NUMS Entry Test",
    shortName: "NUMS",
    description:
      "National University of Medical Sciences admission test preparation.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 11,
    category: "medical-engineering",
    educationLevels: ["intermediate"],
    subjects: ["biology", "chemistry", "physics", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 150,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "net-engineering",
    name: "NUST NET Engineering",
    shortName: "NET Engineering",
    description:
      "NUST engineering admission test preparation.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 13,
    category: "medical-engineering",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 180,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "giki-entry-test",
    name: "GIKI Admission Test",
    shortName: "GIKI",
    description:
      "GIKI undergraduate admission test preparation.",
    type: "ADMISSION",
    province: "Khyber Pakhtunkhwa",
    sortOrder: 14,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "english", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pieas-entry-test",
    name: "PIEAS Admission Test",
    shortName: "PIEAS",
    description:
      "PIEAS undergraduate admission test preparation.",
    type: "ADMISSION",
    province: "Federal",
    sortOrder: 15,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "comsats-entry-test",
    name: "COMSATS Admission Test",
    shortName: "COMSATS",
    description:
      "COMSATS undergraduate admission test preparation.",
    type: "ADMISSION",
    sortOrder: 16,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "english", "analytical-reasoning", "physics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "lat",
    name: "HEC LAT — Law Admission Test",
    shortName: "LAT",
    description:
      "Law Admission Test preparation for undergraduate law admissions.",
    type: "ADMISSION",
    province: "Federal",
    isFeatured: true,
    sortOrder: 20,
    category: "professional-certification",
    educationLevels: ["intermediate"],
    subjects: ["english", "pakistan-studies", "islamiat", "general-knowledge", "current-affairs", "analytical-reasoning", "law"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 90,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "law-gat",
    name: "HEC LAW-GAT",
    shortName: "LAW-GAT",
    description:
      "Law Graduate Assessment Test preparation.",
    type: "COMPETITIVE",
    province: "Federal",
    isFeatured: true,
    sortOrder: 21,
    category: "professional-certification",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["law", "english", "pakistan-studies", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 90,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "ppsc",
    name: "PPSC — Punjab Public Service Commission",
    shortName: "PPSC",
    description:
      "Punjab Public Service Commission recruitment and competitive test preparation.",
    type: "JOB",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 30,
    category: "competitive-exams",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "pakistan-studies", "islamiat", "general-knowledge", "current-affairs", "everyday-science", "computer", "mathematics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "spsc",
    name: "SPSC — Sindh Public Service Commission",
    shortName: "SPSC",
    description:
      "Sindh Public Service Commission recruitment and competitive test preparation.",
    type: "JOB",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 31,
    category: "competitive-exams",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "pakistan-studies", "islamiat", "general-knowledge", "current-affairs", "everyday-science", "computer", "mathematics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "kppsc",
    name: "KPPSC — Khyber Pakhtunkhwa Public Service Commission",
    shortName: "KPPSC",
    description:
      "KPPSC recruitment and competitive examination preparation.",
    type: "JOB",
    province: "Khyber Pakhtunkhwa",
    sortOrder: 32,
    category: "competitive-exams",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "pakistan-studies", "islamiat", "general-knowledge", "current-affairs", "everyday-science", "computer", "mathematics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "bpsc",
    name: "BPSC — Balochistan Public Service Commission",
    shortName: "BPSC",
    description:
      "BPSC recruitment and competitive examination preparation.",
    type: "JOB",
    province: "Balochistan",
    sortOrder: 33,
    category: "competitive-exams",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "pakistan-studies", "islamiat", "general-knowledge", "current-affairs", "everyday-science", "computer", "mathematics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pms-punjab",
    name: "PMS Punjab",
    shortName: "PMS Punjab",
    description:
      "Punjab Provincial Management Service competitive examination preparation.",
    type: "COMPETITIVE",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 34,
    category: "competitive-exams",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "pakistan-affairs", "pakistan-studies", "current-affairs", "general-knowledge", "islamiat", "everyday-science", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "pms-sindh",
    name: "PMS Sindh / CCE",
    shortName: "SPSC CCE",
    description:
      "Sindh Public Service Commission Combined Competitive Examination preparation.",
    type: "COMPETITIVE",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 35,
    category: "competitive-exams",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["english", "pakistan-affairs", "pakistan-studies", "current-affairs", "general-knowledge", "islamiat", "everyday-science", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "teaching-recruitment",
    name: "Teaching Recruitment Tests",
    shortName: "Teaching",
    description:
      "General preparation for teacher recruitment examinations in Pakistan.",
    type: "JOB",
    sortOrder: 42,
    category: "teaching-tests",
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["english", "mathematics", "everyday-science", "computer", "pakistan-studies", "islamiat", "general-knowledge", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 90,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "nust-net",
    name: "NUST NET",
    shortName: "NET",
    description:
      "NUST National Entrance Test preparation for undergraduate admissions.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 50,
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 180,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "fast-entry-test",
    name: "FAST-NUCES Admission Test",
    shortName: "FAST",
    description:
      "FAST-NUCES undergraduate admission test preparation.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 51,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "english", "analytical-reasoning", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "air-university-entry-test",
    name: "Air University Entry Test",
    shortName: "Air University",
    description:
      "Air University undergraduate admission test preparation.",
    type: "ADMISSION",
    sortOrder: 52,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "english", "physics", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "bahria-university-entry-test",
    name: "Bahria University Entry Test",
    shortName: "Bahria",
    description:
      "Bahria University admission test preparation.",
    type: "ADMISSION",
    sortOrder: 53,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["english", "mathematics", "analytical-reasoning", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "ned-entry-test",
    name: "NED University Entry Test",
    shortName: "NED",
    description:
      "NED University undergraduate admission test preparation.",
    type: "ADMISSION",
    province: "Sindh",
    sortOrder: 54,
    category: "entry-tests",
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "muet-entry-test",
    name: "MUET Entry Test",
    shortName: "MUET",
    description:
      "Mehran University admission test preparation.",
    type: "ADMISSION",
    province: "Sindh",
    sortOrder: 55,
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "science-practice",
    name: "Science Practice",
    shortName: "Science",
    description:
      "General science practice covering Biology, Chemistry and Physics.",
    type: "EDUCATIONAL",
    sortOrder: 73,
    category: "general-practice",
    educationLevels: ["middle", "matric", "intermediate"],
    subjects: ["physics", "chemistry", "biology", "everyday-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "analytical-reasoning-practice",
    name: "Analytical Reasoning Practice",
    shortName: "Reasoning",
    description:
      "Logical, analytical and aptitude reasoning practice.",
    type: "EDUCATIONAL",
    sortOrder: 78,
    category: "general-practice",
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
  {
    slug: "law-practice",
    name: "Law Practice",
    shortName: "Law",
    description:
      "Law and legal aptitude MCQ practice.",
    type: "EDUCATIONAL",
    sortOrder: 79,
    category: "professional-certification",
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["law"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
      marksPerQuestion: 1,
      passingPercentage: 50,
    },
  },
];
