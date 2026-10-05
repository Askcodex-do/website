/**
 * Taxonomy + exam blueprint seed data.
 *
 * Exams are data-driven. The public site reads exam configuration from the
 * database instead of hard-coding individual exams.
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
  topics: { slug: string; name: string; description?: string }[];
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

/* -------------------------------------------------------------------------- */
/* Education levels                                                           */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Subjects and topics                                                        */
/* -------------------------------------------------------------------------- */

export const SUBJECTS: SeedSubject[] = [
  {
    slug: "english",
    name: "English",
    description:
      "English grammar, vocabulary, comprehension and verbal ability.",
    topics: [
      { slug: "tenses", name: "Tenses" },
      { slug: "parts-of-speech", name: "Parts of Speech" },
      { slug: "articles", name: "Articles" },
      { slug: "prepositions", name: "Prepositions" },
      { slug: "conjunctions", name: "Conjunctions" },
      { slug: "pronouns", name: "Pronouns" },
      { slug: "adjectives", name: "Adjectives" },
      { slug: "adverbs", name: "Adverbs" },
      { slug: "verbs", name: "Verbs" },
      { slug: "synonyms-antonyms", name: "Synonyms & Antonyms" },
      { slug: "sentence-structure", name: "Sentence Structure" },
      { slug: "sentence-correction", name: "Sentence Correction" },
      { slug: "idioms-phrases", name: "Idioms & Phrases" },
      { slug: "active-passive-voice", name: "Active & Passive Voice" },
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
    topics: [
      { slug: "arithmetic", name: "Arithmetic" },
      { slug: "number-system", name: "Number System" },
      { slug: "fractions", name: "Fractions & Decimals" },
      { slug: "percentages", name: "Percentages" },
      { slug: "ratios-proportions", name: "Ratios & Proportions" },
      { slug: "averages", name: "Averages" },
      { slug: "profit-loss", name: "Profit & Loss" },
      { slug: "simple-interest", name: "Simple Interest" },
      { slug: "compound-interest", name: "Compound Interest" },
      { slug: "time-work", name: "Time & Work" },
      { slug: "time-distance", name: "Time, Speed & Distance" },
      { slug: "algebra", name: "Algebra" },
      { slug: "equations", name: "Equations" },
      { slug: "sequences", name: "Sequences & Series" },
      { slug: "geometry", name: "Geometry" },
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
    topics: [
      { slug: "computer-fundamentals", name: "Computer Fundamentals" },
      { slug: "computer-history", name: "Computer History & Generations" },
      { slug: "hardware", name: "Hardware" },
      { slug: "software", name: "Software" },
      { slug: "operating-systems", name: "Operating Systems" },
      { slug: "memory-storage", name: "Memory & Storage" },
      { slug: "input-output", name: "Input & Output Devices" },
      { slug: "ms-office", name: "MS Office" },
      { slug: "internet", name: "Internet" },
      { slug: "networking", name: "Networking" },
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
    topics: [
      { slug: "pakistan-movement", name: "Pakistan Movement" },
      { slug: "muslim-league", name: "All-India Muslim League" },
      { slug: "allama-iqbal", name: "Allama Iqbal" },
      { slug: "quaid-e-azam", name: "Quaid-e-Azam" },
      { slug: "partition", name: "Partition of India" },
      { slug: "pakistan-history", name: "History of Pakistan" },
      { slug: "pakistan-geography", name: "Geography of Pakistan" },
      { slug: "rivers-dams", name: "Rivers, Dams & Water Resources" },
      { slug: "provinces", name: "Provinces & Administrative Areas" },
      { slug: "natural-resources", name: "Natural Resources" },
      { slug: "constitution", name: "Constitution & Government" },
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
    topics: [
      { slug: "quran", name: "Quran & Tafseer" },
      { slug: "hadith", name: "Hadith" },
      { slug: "seerah", name: "Seerah of the Prophet (PBUH)" },
      { slug: "makki-madani", name: "Makki & Madani Surahs" },
      { slug: "ibadat", name: "Ibadat (Worship)" },
      { slug: "salah", name: "Salah" },
      { slug: "fasting", name: "Fasting" },
      { slug: "zakat", name: "Zakat" },
      { slug: "hajj", name: "Hajj" },
      { slug: "islamic-history", name: "Islamic History" },
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
];

/* -------------------------------------------------------------------------- */
/* Pakistani exams                                                            */
/* -------------------------------------------------------------------------- */

export const EXAMS: SeedExam[] = [
  /* ============================== NATIONAL ============================== */

  {
    slug: "css",
    name: "CSS — Central Superior Services",
    shortName: "CSS",
    description:
      "Competitive examination preparation for Pakistan's Central Superior Services.",
    type: "COMPETITIVE",
    province: "Federal",
    isFeatured: true,
    sortOrder: 1,
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-affairs",
      "pakistan-studies",
      "current-affairs-competitive",
      "general-knowledge",
      "everyday-science",
      "islamiat",
      "analytical-reasoning",
      "economics",
    ],
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
    slug: "fpsc",
    name: "FPSC General Recruitment Tests",
    shortName: "FPSC",
    description:
      "Practice questions for Federal Public Service Commission recruitment examinations.",
    type: "JOB",
    province: "Federal",
    isFeatured: true,
    sortOrder: 2,
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "general-knowledge",
      "pakistan-studies",
      "islamiat",
      "current-affairs",
      "everyday-science",
      "computer",
      "analytical-reasoning",
      "mathematics",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
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
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
      "computer",
      "everyday-science",
      "pakistan-studies",
      "current-affairs",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
    },
  },

  {
    slug: "nat",
    name: "NTS NAT — National Aptitude Test",
    shortName: "NAT",
    description:
      "Practice for NTS National Aptitude Test for university admissions.",
    type: "ADMISSION",
    province: "Federal",
    isFeatured: true,
    sortOrder: 4,
    educationLevels: ["intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "everyday-science",
      "computer",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 100,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 100,
      negativeMarking: false,
    },
  },

  /* =========================== MEDICAL TESTS ============================ */

  {
    slug: "mdcat",
    name: "MDCAT — Medical & Dental College Admission Test",
    shortName: "MDCAT",
    description:
      "Medical and dental college admission test preparation covering Biology, Chemistry, Physics and English.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 10,
    educationLevels: ["intermediate"],
    subjects: ["biology", "chemistry", "physics", "english"],
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
    slug: "nums",
    name: "NUMS Entry Test",
    shortName: "NUMS",
    description:
      "National University of Medical Sciences admission test preparation.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 11,
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

  /* ========================= ENGINEERING TESTS ========================== */

  {
    slug: "ecat",
    name: "ECAT — Engineering College Admission Test",
    shortName: "ECAT",
    description:
      "Engineering admission test preparation covering Mathematics, Physics, Chemistry and English.",
    type: "ADMISSION",
    province: "Punjab",
    isFeatured: true,
    sortOrder: 12,
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 100,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 180,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "english", "analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: [
      "mathematics",
      "english",
      "analytical-reasoning",
      "physics",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
    },
  },

  /* ============================== LAW ================================== */

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
    educationLevels: ["intermediate"],
    subjects: [
      "english",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "current-affairs",
      "analytical-reasoning",
      "law",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 90,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["law", "english", "pakistan-studies", "general-knowledge"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 90,
      negativeMarking: false,
    },
  },

  /* ========================== PROVINCIAL =============================== */

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
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "current-affairs",
      "everyday-science",
      "computer",
      "mathematics",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "current-affairs",
      "everyday-science",
      "computer",
      "mathematics",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "current-affairs",
      "everyday-science",
      "computer",
      "mathematics",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "current-affairs",
      "everyday-science",
      "computer",
      "mathematics",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-affairs",
      "pakistan-studies",
      "current-affairs",
      "general-knowledge",
      "islamiat",
      "everyday-science",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "pakistan-affairs",
      "pakistan-studies",
      "current-affairs",
      "general-knowledge",
      "islamiat",
      "everyday-science",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
    },
  },

  /* ============================= TEACHING ============================== */

  {
    slug: "pst",
    name: "PST — Primary School Teacher",
    shortName: "PST",
    description:
      "Primary School Teacher recruitment test preparation.",
    type: "JOB",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 40,
    educationLevels: ["primary", "matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "everyday-science",
      "islamiat",
      "pakistan-studies",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 90,
      negativeMarking: false,
    },
  },

  {
    slug: "jest",
    name: "JEST — Junior Elementary School Teacher",
    shortName: "JEST",
    description:
      "Junior Elementary School Teacher recruitment test preparation.",
    type: "JOB",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 41,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "everyday-science",
      "islamiat",
      "pakistan-studies",
      "computer",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 90,
      negativeMarking: false,
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
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: [
      "english",
      "mathematics",
      "everyday-science",
      "computer",
      "pakistan-studies",
      "islamiat",
      "general-knowledge",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 90,
      negativeMarking: false,
    },
  },

  {
    slug: "lecturer",
    name: "Lecturer Recruitment Test",
    shortName: "Lecturer",
    description:
      "Lecturer and college teacher recruitment test preparation.",
    type: "JOB",
    sortOrder: 43,
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "general-knowledge",
      "current-affairs",
      "pakistan-studies",
      "islamiat",
      "analytical-reasoning",
      "computer",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
    },
  },

  /* ============================ UNIVERSITY ============================= */

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
    subjects: [
      "mathematics",
      "physics",
      "chemistry",
      "biology",
      "english",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 180,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "english", "analytical-reasoning", "computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: [
      "mathematics",
      "english",
      "physics",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: [
      "english",
      "mathematics",
      "analytical-reasoning",
      "general-knowledge",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    educationLevels: ["intermediate"],
    subjects: ["mathematics", "physics", "chemistry", "english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 100,
      timeLimitMinutes: 120,
      negativeMarking: false,
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
    },
  },

  /* ========================== GENERAL PRACTICE ========================= */

  {
    slug: "university-entry-test",
    name: "University Entry Test",
    shortName: "Entry Test",
    description:
      "General university admission test practice.",
    type: "ADMISSION",
    isFeatured: true,
    sortOrder: 60,
    educationLevels: ["intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "physics",
      "chemistry",
      "biology",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
    },
  },

  {
    slug: "admission-test",
    name: "Admission Tests — General",
    shortName: "Admission",
    description:
      "General admission and scholarship aptitude test practice.",
    type: "ADMISSION",
    sortOrder: 61,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "general-knowledge",
      "analytical-reasoning",
      "everyday-science",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
    },
  },

  {
    slug: "english-grammar",
    name: "English Grammar Practice",
    shortName: "English Grammar",
    description:
      "English grammar and vocabulary practice.",
    type: "EDUCATIONAL",
    isFeatured: true,
    sortOrder: 70,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
    },
  },

  {
    slug: "general-knowledge",
    name: "General Knowledge Practice",
    shortName: "General Knowledge",
    description:
      "General knowledge practice for Pakistani students and test candidates.",
    type: "GENERAL",
    isFeatured: true,
    sortOrder: 71,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["general-knowledge", "everyday-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
    },
  },

  {
    slug: "mathematics-practice",
    name: "Mathematics Practice",
    shortName: "Mathematics",
    description:
      "Mathematics practice from basic arithmetic to quantitative aptitude.",
    type: "EDUCATIONAL",
    sortOrder: 72,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["mathematics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
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
    educationLevels: ["middle", "matric", "intermediate"],
    subjects: ["physics", "chemistry", "biology", "everyday-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
    },
  },

  {
    slug: "computer-practice",
    name: "Computer Practice",
    shortName: "Computer",
    description:
      "Computer science and information technology practice.",
    type: "EDUCATIONAL",
    sortOrder: 74,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
    },
  },

  {
    slug: "islamiat-practice",
    name: "Islamiat Practice",
    shortName: "Islamiat",
    description:
      "Islamiat practice for school, college and competitive examinations.",
    type: "EDUCATIONAL",
    sortOrder: 75,
    educationLevels: ["primary", "middle", "matric", "intermediate", "graduation"],
    subjects: ["islamiat"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
    },
  },

  {
    slug: "pakistan-studies-practice",
    name: "Pakistan Studies Practice",
    shortName: "Pakistan Studies",
    description:
      "Pakistan Studies practice covering history, geography and constitution.",
    type: "EDUCATIONAL",
    sortOrder: 76,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["pakistan-studies", "pakistan-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
    },
  },

  {
    slug: "current-affairs-practice",
    name: "Current Affairs Practice",
    shortName: "Current Affairs",
    description:
      "Current affairs practice for Pakistani job and competitive examinations.",
    type: "GENERAL",
    sortOrder: 77,
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["current-affairs", "current-affairs-competitive"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
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
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["analytical-reasoning"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 45,
      negativeMarking: false,
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
    educationLevels: ["graduation", "post-graduation"],
    subjects: ["law"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 50,
      timeLimitMinutes: 60,
      negativeMarking: false,
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Site defaults                                                              */
/* -------------------------------------------------------------------------- */

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
  {
    key: "site.social",
    group: "social",
    value: SOCIAL_LINKS_DEFAULT,
  },
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
