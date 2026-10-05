/**
 * Taxonomy + exam blueprint seed data.
 *
 * This is the ONLY place exam behaviour is defined. The public site never
 * special-cases "PST" or "CSS" — it reads these rows through the Question
 * Selection Engine.
 */

export interface SeedEducationLevel {
  slug: string;
  name: string;
  rank: number;
  description: string;
}

export interface SeedSubject {
  slug: string;
  name: string;
  description: string;
  subSubjects?: { slug: string; name: string; description?: string }[];
  topics: {
    slug: string;
    name: string;
    description?: string;
    /** Optional parent sub-subject slug. */
    subSubject?: string;
    subtopics?: { slug: string; name: string; description?: string }[];
  }[];
}

export interface SeedExam {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  type: "JOB" | "ADMISSION" | "COMPETITIVE" | "EDUCATIONAL" | "GENERAL";
  province?: string;
  isFeatured?: boolean;
  sortOrder: number;
  educationLevels: string[];
  subjects: string[];
  /** Category slug (hierarchy top level). */
  category?: string;
  /** Conducting authority slug. */
  organization?: string;
  /** Structured metadata surfaced on preparation pages. */
  eligibility?: string;
  testPattern?: string;
  syllabus?: string;
  duration?: string;
  totalMarks?: string;
  website?: string;
  configuration: {
    mode: "STATIC" | "RANDOM";
    defaultQuestionCount: number;
    timeLimitMinutes: number;
    negativeMarking: boolean;
    negativeMarkFactor?: number;
    marksPerQuestion?: number;
    passingPercentage?: number;
    staticOrderSeed?: string;
  };
}

export const EDUCATION_LEVELS: SeedEducationLevel[] = [
  {
    slug: "primary",
    name: "Primary (Class 1–5)",
    rank: 1,
    description: "Foundational schooling level.",
  },
  {
    slug: "middle",
    name: "Middle (Class 6–8)",
    rank: 2,
    description: "Middle school level.",
  },
  {
    slug: "matric",
    name: "Matric / SSC (Class 9–10)",
    rank: 3,
    description: "Secondary school certificate level.",
  },
  {
    slug: "intermediate",
    name: "Intermediate / HSSC (Class 11–12)",
    rank: 4,
    description: "Higher secondary certificate level.",
  },
  {
    slug: "graduation",
    name: "Graduation (Bachelor)",
    rank: 5,
    description: "Bachelor's degree level.",
  },
  {
    slug: "post-graduation",
    name: "Post-Graduation (Master/MPhil)",
    rank: 6,
    description: "Master's and MPhil level.",
  },
];

export const SUBJECTS: SeedSubject[] = [
  {
    slug: "english",
    name: "English",
    description:
      "English grammar, vocabulary, comprehension and verbal ability.",
    subSubjects: [
      { slug: "english-grammar", name: "Grammar" },
      { slug: "english-vocabulary", name: "Vocabulary" },
      { slug: "english-composition", name: "Composition" },
    ],
    topics: [
      {
        slug: "tenses", name: "Tenses", subSubject: "english-grammar",
        subtopics: [
          { slug: "present-tense", name: "Present Tense" },
          { slug: "past-tense", name: "Past Tense" },
          { slug: "future-tense", name: "Future Tense" },
        ],
      },
      {
        slug: "parts-of-speech", name: "Parts of Speech", subSubject: "english-grammar",
        subtopics: [
          { slug: "nouns-pronouns", name: "Nouns & Pronouns" },
          { slug: "verbs-adverbs", name: "Verbs & Adverbs" },
          { slug: "adjectives", name: "Adjectives" },
        ],
      },
      { slug: "articles", name: "Articles", subSubject: "english-grammar" },
      { slug: "prepositions", name: "Prepositions", subSubject: "english-grammar" },
      { slug: "conjunctions", name: "Conjunctions" },
      { slug: "pronouns", name: "Pronouns" },
      { slug: "adjectives", name: "Adjectives" },
      { slug: "adverbs", name: "Adverbs" },
      { slug: "verbs", name: "Verbs" },
      {
        slug: "synonyms-antonyms", name: "Synonyms & Antonyms", subSubject: "english-vocabulary",
        subtopics: [
          { slug: "synonyms", name: "Synonyms" },
          { slug: "antonyms", name: "Antonyms" },
        ],
      },
      { slug: "sentence-structure", name: "Sentence Structure", subSubject: "english-grammar" },
      { slug: "sentence-correction", name: "Sentence Correction" },
      { slug: "idioms-phrases", name: "Idioms & Phrases", subSubject: "english-vocabulary" },
      { slug: "active-passive-voice", name: "Active & Passive Voice", subSubject: "english-grammar" },
      { slug: "direct-indirect-speech", name: "Direct & Indirect Speech" },
      { slug: "spelling", name: "Spelling" },
      { slug: "vocabulary", name: "Vocabulary" },
      { slug: "analogy", name: "Analogy" },
      { slug: "one-word-substitution", name: "One Word Substitution" },
      { slug: "comprehension", name: "Reading Comprehension" },
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    description:
      "School mathematics, quantitative aptitude and mathematical reasoning.",
    subSubjects: [
      { slug: "arithmetic", name: "Arithmetic" },
      { slug: "algebra", name: "Algebra" },
      { slug: "geometry", name: "Geometry" },
    ],
    topics: [
      {
        slug: "arithmetic", name: "Arithmetic", subSubject: "arithmetic",
        subtopics: [
          { slug: "fractions-decimals", name: "Fractions & Decimals" },
          { slug: "ratios-proportions", name: "Ratios & Proportions" },
        ],
      },
      { slug: "number-system", name: "Number System" },
      { slug: "fractions", name: "Fractions & Decimals" },
      { slug: "percentages", name: "Percentages", subSubject: "arithmetic" },
      { slug: "ratios-proportions", name: "Ratios & Proportions" },
      { slug: "averages", name: "Averages", subSubject: "arithmetic" },
      { slug: "profit-loss", name: "Profit & Loss" },
      { slug: "simple-interest", name: "Simple Interest" },
      { slug: "compound-interest", name: "Compound Interest" },
      { slug: "time-work", name: "Time & Work" },
      { slug: "time-distance", name: "Time, Speed & Distance" },
      {
        slug: "algebra", name: "Algebra", subSubject: "algebra",
        subtopics: [
          { slug: "equations", name: "Equations" },
          { slug: "polynomials", name: "Polynomials" },
        ],
      },
      { slug: "equations", name: "Equations" },
      { slug: "sequences", name: "Sequences & Series" },
      {
        slug: "geometry", name: "Geometry", subSubject: "geometry",
        subtopics: [
          { slug: "triangles", name: "Triangles" },
          { slug: "circles", name: "Circles" },
        ],
      },
      { slug: "mensuration", name: "Mensuration" },
      { slug: "trigonometry", name: "Trigonometry" },
      { slug: "probability", name: "Probability" },
      { slug: "statistics", name: "Statistics" },
      { slug: "permutation-combination", name: "Permutation & Combination" },
      { slug: "quantitative-reasoning", name: "Quantitative Reasoning" },
    ],
  },
  {
    slug: "physics",
    name: "Physics",
    description:
      "Physics concepts for school, admission and competitive examinations.",
    topics: [
      { slug: "measurements", name: "Measurements & Physical Quantities" },
      { slug: "vectors", name: "Vectors" },
      { slug: "motion", name: "Motion" },
      { slug: "force", name: "Force & Laws of Motion" },
      { slug: "work-energy", name: "Work, Energy & Power" },
      { slug: "circular-motion", name: "Circular Motion" },
      { slug: "gravitation", name: "Gravitation" },
      { slug: "properties-of-matter", name: "Properties of Matter" },
      { slug: "fluid-dynamics", name: "Fluid Dynamics" },
      { slug: "heat", name: "Heat & Thermodynamics" },
      { slug: "waves", name: "Waves" },
      { slug: "sound", name: "Sound" },
      { slug: "optics", name: "Optics" },
      { slug: "electrostatics", name: "Electrostatics" },
      { slug: "current-electricity", name: "Current Electricity" },
      { slug: "magnetism", name: "Magnetism" },
      { slug: "electromagnetic-induction", name: "Electromagnetic Induction" },
      { slug: "electronics", name: "Electronics" },
      { slug: "atomic-physics", name: "Atomic Physics" },
      { slug: "nuclear-physics", name: "Nuclear Physics" },
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    description:
      "Chemistry concepts for medical, engineering and general examinations.",
    topics: [
      { slug: "basic-concepts", name: "Basic Concepts" },
      { slug: "atomic-structure", name: "Atomic Structure" },
      { slug: "periodic-table", name: "Periodic Table" },
      { slug: "chemical-bonding", name: "Chemical Bonding" },
      { slug: "states-of-matter", name: "States of Matter" },
      { slug: "solutions", name: "Solutions" },
      { slug: "thermochemistry", name: "Thermochemistry" },
      { slug: "chemical-equilibrium", name: "Chemical Equilibrium" },
      { slug: "acids-bases", name: "Acids, Bases & Salts" },
      { slug: "electrochemistry", name: "Electrochemistry" },
      { slug: "organic-chemistry", name: "Organic Chemistry" },
      { slug: "hydrocarbons", name: "Hydrocarbons" },
      { slug: "functional-groups", name: "Functional Groups" },
      { slug: "biochemistry", name: "Biochemistry" },
      { slug: "environmental-chemistry", name: "Environmental Chemistry" },
    ],
  },
  {
    slug: "biology",
    name: "Biology",
    description:
      "Biology for MDCAT, NUMS, university admissions and educational exams.",
    topics: [
      { slug: "biological-molecules", name: "Biological Molecules" },
      { slug: "cell-biology", name: "Cell Biology" },
      { slug: "enzymes", name: "Enzymes" },
      { slug: "bioenergetics", name: "Bioenergetics" },
      { slug: "cell-cycle", name: "Cell Cycle & Division" },
      { slug: "genetics", name: "Genetics" },
      { slug: "evolution", name: "Evolution" },
      { slug: "biodiversity", name: "Biodiversity" },
      { slug: "microbiology", name: "Microbiology" },
      { slug: "viruses", name: "Viruses" },
      { slug: "plant-biology", name: "Plant Biology" },
      { slug: "plant-physiology", name: "Plant Physiology" },
      { slug: "human-digestion", name: "Digestion" },
      { slug: "human-respiration", name: "Respiration" },
      { slug: "circulation", name: "Circulation" },
      { slug: "excretion", name: "Excretion" },
      { slug: "nervous-system", name: "Nervous System" },
      { slug: "endocrine-system", name: "Endocrine System" },
      { slug: "reproduction", name: "Reproduction" },
      { slug: "immunity", name: "Immunity" },
      { slug: "biotechnology", name: "Biotechnology" },
      { slug: "ecology", name: "Ecology" },
    ],
  },
  {
    slug: "computer",
    name: "Computer Science",
    description:
      "Computer fundamentals, information technology, programming and networking.",
    subSubjects: [
      { slug: "computer-fundamentals", name: "Fundamentals" },
      { slug: "computer-applications", name: "Applications" },
    ],
    topics: [
      {
        slug: "computer-fundamentals", name: "Computer Fundamentals", subSubject: "computer-fundamentals",
        subtopics: [
          { slug: "input-output-devices", name: "Input & Output Devices" },
          { slug: "memory-storage", name: "Memory & Storage" },
        ],
      },
      { slug: "computer-history", name: "Computer History & Generations" },
      { slug: "hardware", name: "Hardware", subSubject: "computer-fundamentals" },
      { slug: "software", name: "Software", subSubject: "computer-applications" },
      { slug: "operating-systems", name: "Operating Systems" },
      { slug: "memory-storage", name: "Memory & Storage" },
      { slug: "input-output", name: "Input & Output Devices" },
      { slug: "ms-office", name: "MS Office", subSubject: "computer-applications" },
      { slug: "internet", name: "Internet" },
      { slug: "networking", name: "Networking", subSubject: "computer-fundamentals" },
      { slug: "cyber-security", name: "Cyber Security" },
      { slug: "databases", name: "Databases" },
      { slug: "programming", name: "Programming Fundamentals" },
      { slug: "data-structures", name: "Data Structures" },
      { slug: "web-development", name: "Web Development" },
      { slug: "information-technology", name: "Information Technology" },
    ],
  },
  {
    slug: "pakistan-studies",
    name: "Pakistan Studies",
    description:
      "Pakistan history, geography, constitution, politics and national affairs.",
    subSubjects: [
      { slug: "pakistan-history", name: "History" },
      { slug: "pakistan-geography-sub", name: "Geography" },
    ],
    topics: [
      {
        slug: "pakistan-movement", name: "Pakistan Movement", subSubject: "pakistan-history",
        subtopics: [
          { slug: "lahore-resolution", name: "Lahore Resolution" },
          { slug: "independence", name: "Independence" },
        ],
      },
      { slug: "muslim-league", name: "All-India Muslim League" },
      { slug: "allama-iqbal", name: "Allama Iqbal" },
      { slug: "quaid-e-azam", name: "Quaid-e-Azam" },
      { slug: "partition", name: "Partition of India" },
      { slug: "pakistan-history", name: "History of Pakistan" },
      { slug: "pakistan-geography", name: "Geography of Pakistan", subSubject: "pakistan-geography-sub" },
      { slug: "rivers-dams", name: "Rivers, Dams & Water Resources" },
      { slug: "provinces", name: "Provinces & Administrative Areas" },
      { slug: "natural-resources", name: "Natural Resources" },
      { slug: "constitution", name: "Constitution & Government", subSubject: "pakistan-history" },
      { slug: "political-history", name: "Political History" },
      { slug: "national-symbols", name: "National Symbols" },
      { slug: "economy-pakistan", name: "Economy of Pakistan" },
      { slug: "foreign-policy", name: "Foreign Policy" },
    ],
  },
  {
    slug: "islamiat",
    name: "Islamiat",
    description:
      "Quran, Hadith, Seerah, Islamic history, worship and Islamic studies.",
    subSubjects: [
      { slug: "quran-studies", name: "Quran & Hadith" },
      { slug: "islamic-history-sub", name: "Islamic History" },
    ],
    topics: [
      {
        slug: "quran", name: "Quran & Tafseer", subSubject: "quran-studies",
        subtopics: [
          { slug: "quran-revelation", name: "Revelation" },
          { slug: "quran-teachings", name: "Teachings" },
        ],
      },
      { slug: "hadith", name: "Hadith" },
      { slug: "seerah", name: "Seerah of the Prophet (PBUH)", subSubject: "islamic-history-sub" },
      { slug: "makki-madani", name: "Makki & Madani Surahs" },
      { slug: "ibadat", name: "Ibadat (Worship)", subSubject: "quran-studies" },
      { slug: "salah", name: "Salah" },
      { slug: "fasting", name: "Fasting" },
      { slug: "zakat", name: "Zakat" },
      { slug: "hajj", name: "Hajj" },
      { slug: "islamic-history", name: "Islamic History", subSubject: "islamic-history-sub" },
      { slug: "khulafa-e-rashideen", name: "Khulafa-e-Rashideen" },
      { slug: "islamic-civilization", name: "Islamic Civilization" },
      { slug: "islamic-ethics", name: "Islamic Ethics" },
    ],
  },
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description:
      "Pakistan and world general knowledge for jobs, admissions and competitive tests.",
    topics: [
      { slug: "world-geography", name: "World Geography" },
      { slug: "world-history", name: "World History" },
      { slug: "capitals", name: "Countries & Capitals" },
      { slug: "currencies", name: "Currencies" },
      { slug: "inventions-discoveries", name: "Inventions & Discoveries" },
      { slug: "organizations", name: "International Organizations" },
      { slug: "books-authors", name: "Books & Authors" },
      { slug: "awards", name: "Awards & Honours" },
      { slug: "sports", name: "Sports" },
      { slug: "famous-personalities", name: "Famous Personalities" },
      { slug: "important-days", name: "Important Days" },
    ],
  },
  {
    slug: "current-affairs",
    name: "Current Affairs",
    description:
      "Recent national and international developments and important events.",
    topics: [
      { slug: "pakistan-current-affairs", name: "Pakistan Current Affairs" },
      { slug: "international-affairs", name: "International Affairs" },
      { slug: "international-relations", name: "International Relations" },
      { slug: "world-politics", name: "World Politics" },
      { slug: "economy", name: "Economy & Finance" },
      { slug: "international-organizations", name: "International Organizations" },
      { slug: "science-technology", name: "Science & Technology" },
      { slug: "climate-environment", name: "Climate & Environment" },
      { slug: "sports-current-affairs", name: "Sports Current Affairs" },
    ],
  },
  {
    slug: "everyday-science",
    name: "Everyday Science",
    description:
      "Applied science, health, measurements and scientific knowledge.",
    topics: [
      { slug: "units-measurements", name: "Units & Measurements" },
      { slug: "scientific-instruments", name: "Scientific Instruments" },
      { slug: "diseases-health", name: "Diseases & Health" },
      { slug: "human-body", name: "Human Body" },
      { slug: "environment", name: "Environment" },
      { slug: "energy", name: "Energy" },
      { slug: "food-nutrition", name: "Food & Nutrition" },
      { slug: "everyday-physics", name: "Everyday Physics" },
      { slug: "everyday-chemistry", name: "Everyday Chemistry" },
    ],
  },
  {
    slug: "analytical-reasoning",
    name: "Analytical Reasoning",
    description:
      "Logical reasoning, patterns, sequences and problem solving.",
    topics: [
      { slug: "series-sequences", name: "Series & Sequences" },
      { slug: "number-series", name: "Number Series" },
      { slug: "alphabet-series", name: "Alphabet Series" },
      { slug: "coding-decoding", name: "Coding & Decoding" },
      { slug: "logical-deduction", name: "Logical Deduction" },
      { slug: "odd-one-out", name: "Odd One Out" },
      { slug: "analogies", name: "Analogies" },
      { slug: "classification", name: "Classification" },
      { slug: "blood-relations", name: "Blood Relations" },
      { slug: "directions", name: "Directions" },
      { slug: "arrangements", name: "Arrangements" },
      { slug: "syllogisms", name: "Syllogisms" },
      { slug: "critical-thinking", name: "Critical Thinking" },
    ],
  },
  {
    slug: "pakistan-affairs",
    name: "Pakistan Affairs",
    description:
      "Pakistan affairs and national issues for CSS, PMS and competitive exams.",
    topics: [
      { slug: "political-development", name: "Political Development" },
      { slug: "constitutional-development", name: "Constitutional Development" },
      { slug: "governance", name: "Governance" },
      { slug: "economy", name: "Pakistan Economy" },
      { slug: "foreign-relations", name: "Foreign Relations" },
      { slug: "security", name: "National Security" },
      { slug: "society", name: "Society & Culture" },
      { slug: "population", name: "Population & Demography" },
      { slug: "water-energy", name: "Water & Energy" },
    ],
  },
  {
    slug: "current-affairs-competitive",
    name: "Competitive Current Affairs",
    description:
      "Current affairs designed for CSS, PMS, FPSC, PPSC and other competitive tests.",
    topics: [
      { slug: "national", name: "National Affairs" },
      { slug: "international", name: "International Affairs" },
      { slug: "economics", name: "Economics" },
      { slug: "diplomacy", name: "Diplomacy & Foreign Policy" },
      { slug: "global-organizations", name: "Global Organizations" },
      { slug: "technology", name: "Technology" },
      { slug: "environment", name: "Environment & Climate" },
    ],
  },
  {
    slug: "law",
    name: "Law",
    description:
      "Law and legal aptitude for LAT, LAW-GAT and other legal examinations.",
    topics: [
      { slug: "constitution-of-pakistan", name: "Constitution of Pakistan" },
      { slug: "fundamental-rights", name: "Fundamental Rights" },
      { slug: "pakistan-legal-system", name: "Pakistan Legal System" },
      { slug: "jurisprudence", name: "Jurisprudence" },
      { slug: "contract-law", name: "Contract Law" },
      { slug: "criminal-law", name: "Criminal Law" },
      { slug: "international-law", name: "International Law" },
      { slug: "legal-terms", name: "Legal Terms" },
      { slug: "legal-reasoning", name: "Legal Reasoning" },
    ],
  },
  {
    slug: "accounting",
    name: "Accounting",
    description:
      "Accounting and financial concepts for commerce, business and recruitment tests.",
    topics: [
      { slug: "accounting-basics", name: "Accounting Basics" },
      { slug: "journal-ledger", name: "Journal & Ledger" },
      { slug: "financial-statements", name: "Financial Statements" },
      { slug: "cost-accounting", name: "Cost Accounting" },
      { slug: "financial-accounting", name: "Financial Accounting" },
      { slug: "auditing", name: "Auditing" },
    ],
  },
  {
    slug: "economics",
    name: "Economics",
    description:
      "Basic and applied economics for competitive and academic examinations.",
    topics: [
      { slug: "microeconomics", name: "Microeconomics" },
      { slug: "macroeconomics", name: "Macroeconomics" },
      { slug: "money-banking", name: "Money & Banking" },
      { slug: "public-finance", name: "Public Finance" },
      { slug: "international-trade", name: "International Trade" },
      { slug: "pakistan-economy", name: "Pakistan Economy" },
    ],
  },
  {
    slug: "general-science",
    name: "General Science",
    description:
      "Physics, chemistry and biology fundamentals.",
    subSubjects: [
      { slug: "biology", name: "Biology" },
      { slug: "physics", name: "Physics" },
      { slug: "chemistry", name: "Chemistry" },
    ],
    topics: [
      {
        slug: "biology", name: "Biology", subSubject: "biology",
        subtopics: [
          { slug: "cells", name: "Cells" },
          { slug: "photosynthesis", name: "Photosynthesis" },
        ],
      },
      {
        slug: "physics", name: "Physics", subSubject: "physics",
        subtopics: [
          { slug: "force-motion", name: "Force & Motion" },
          { slug: "energy", name: "Energy" },
        ],
      },
      {
        slug: "chemistry", name: "Chemistry", subSubject: "chemistry",
        subtopics: [
          { slug: "elements-compounds", name: "Elements & Compounds" },
          { slug: "acids-bases", name: "Acids & Bases" },
        ],
      },
      { slug: "human-body", name: "Human Body", subSubject: "biology" },
    ],
  },
];

export const SOCIAL_LINKS_DEFAULT = {
  facebook: "",
  youtube: "",
  instagram: "",
  x: "",
  linkedin: "",
  whatsapp: "",
};

export const SITE_SETTINGS_DEFAULT = [
  {
    key: "site.identity",
    group: "general",
    value: {
      name: "MCQ Prep",
      tagline: "Practice MCQs for jobs, admissions and competitive exams",
      contactEmail: "support@example.com",
      contactPhone: "",
      address: "",
    },
  },
  { key: "site.social", group: "social", value: SOCIAL_LINKS_DEFAULT },
  {
    key: "site.features",
    group: "features",
    value: {
      allowGuestQuizzes: true,
      allowGuestReports: true,
      showQuestionStats: true,
      requireEmailVerification: false,
    },
  },
  {
    key: "site.seo",
    group: "seo",
    value: {
      defaultTitleSuffix: "MCQ Prep",
      twitterHandle: "",
      googleSiteVerification: "",
      bingSiteVerification: "",
    },
  },
];
