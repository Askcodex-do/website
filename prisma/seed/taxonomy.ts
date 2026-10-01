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
      "Grammar, vocabulary, comprehension and composition for competitive exams.",
    topics: [
      { slug: "tenses", name: "Tenses" },
      { slug: "parts-of-speech", name: "Parts of Speech" },
      { slug: "articles", name: "Articles" },
      { slug: "prepositions", name: "Prepositions" },
      { slug: "synonyms-antonyms", name: "Synonyms & Antonyms" },
      { slug: "sentence-structure", name: "Sentence Structure" },
      { slug: "idioms-phrases", name: "Idioms & Phrases" },
      { slug: "active-passive-voice", name: "Active & Passive Voice" },
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    description: "Arithmetic, algebra, geometry and quantitative reasoning.",
    topics: [
      { slug: "arithmetic", name: "Arithmetic" },
      { slug: "algebra", name: "Algebra" },
      { slug: "geometry", name: "Geometry" },
      { slug: "percentages", name: "Percentages & Ratios" },
      { slug: "averages", name: "Averages" },
    ],
  },
  {
    slug: "general-science",
    name: "General Science",
    description: "Physics, chemistry and biology fundamentals.",
    topics: [
      { slug: "biology", name: "Biology" },
      { slug: "physics", name: "Physics" },
      { slug: "chemistry", name: "Chemistry" },
      { slug: "human-body", name: "Human Body" },
    ],
  },
  {
    slug: "computer",
    name: "Computer Science",
    description: "Computer fundamentals, hardware, software and networking.",
    topics: [
      { slug: "computer-fundamentals", name: "Computer Fundamentals" },
      { slug: "hardware", name: "Hardware" },
      { slug: "software", name: "Software & Applications" },
      { slug: "networking", name: "Networking & Internet" },
      { slug: "ms-office", name: "MS Office" },
    ],
  },
  {
    slug: "pakistan-studies",
    name: "Pakistan Studies",
    description: "History, geography and culture of Pakistan.",
    topics: [
      { slug: "pakistan-movement", name: "Pakistan Movement" },
      { slug: "pakistan-geography", name: "Geography of Pakistan" },
      { slug: "constitution", name: "Constitution & Government" },
      { slug: "national-symbols", name: "National Symbols" },
    ],
  },
  {
    slug: "islamiat",
    name: "Islamiat",
    description: "Islamic studies: Quran, Seerah, Ibadat and Islamic history.",
    topics: [
      { slug: "quran", name: "Quran & Tafseer" },
      { slug: "seerah", name: "Seerah of the Prophet (PBUH)" },
      { slug: "ibadat", name: "Ibadat (Worship)" },
      { slug: "islamic-history", name: "Islamic History" },
    ],
  },
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description: "Everyday general knowledge and world affairs.",
    topics: [
      { slug: "world-geography", name: "World Geography" },
      { slug: "inventions-discoveries", name: "Inventions & Discoveries" },
      { slug: "sports", name: "Sports" },
      { slug: "books-authors", name: "Books & Authors" },
    ],
  },
  {
    slug: "current-affairs",
    name: "Current Affairs",
    description: "Recent national and international developments.",
    topics: [
      { slug: "international-relations", name: "International Relations" },
      { slug: "economy", name: "Economy" },
      { slug: "international-organizations", name: "International Organizations" },
    ],
  },
  {
    slug: "everyday-science",
    name: "Everyday Science",
    description: "Applied science questions asked in job and admission tests.",
    topics: [
      { slug: "units-measurements", name: "Units & Measurements" },
      { slug: "scientific-instruments", name: "Scientific Instruments" },
      { slug: "diseases-health", name: "Diseases & Health" },
    ],
  },
  {
    slug: "analytical-reasoning",
    name: "Analytical Reasoning",
    description: "Logical reasoning, series and problem solving.",
    topics: [
      { slug: "series-sequences", name: "Series & Sequences" },
      { slug: "logical-deduction", name: "Logical Deduction" },
      { slug: "odd-one-out", name: "Odd One Out" },
    ],
  },
];

export const EXAMS: SeedExam[] = [
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
    educationLevels: ["primary", "matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "general-science",
      "islamiat",
      "pakistan-studies",
      "general-knowledge",
    ],
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
    slug: "css",
    name: "CSS — Central Superior Services",
    shortName: "CSS",
    description:
      "Practice MCQs for the CSS competitive examination covering English, General Science, Pakistan Affairs, Islamiat, Current Affairs and Analytical Reasoning.",
    type: "COMPETITIVE",
    province: "Federal",
    isFeatured: true,
    sortOrder: 2,
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "general-science",
      "pakistan-studies",
      "islamiat",
      "current-affairs",
      "analytical-reasoning",
      "general-knowledge",
    ],
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
    slug: "jest",
    name: "JEST — Junior Elementary School Teacher",
    shortName: "JEST",
    description:
      "Practice MCQs for the Junior Elementary School Teacher recruitment test.",
    type: "JOB",
    province: "Sindh",
    isFeatured: true,
    sortOrder: 3,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "general-science",
      "islamiat",
      "pakistan-studies",
      "computer",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 30,
      negativeMarking: false,
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
    sortOrder: 4,
    educationLevels: ["graduation", "post-graduation"],
    subjects: [
      "english",
      "general-science",
      "computer",
      "pakistan-studies",
      "islamiat",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 25,
      timeLimitMinutes: 35,
      negativeMarking: true,
      negativeMarkFactor: 0.25,
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
    sortOrder: 5,
    educationLevels: ["intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "general-science",
      "analytical-reasoning",
      "computer",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 30,
      timeLimitMinutes: 40,
      negativeMarking: false,
    },
  },
  {
    slug: "admission-test",
    name: "Admission Tests (General)",
    shortName: "Admission",
    description:
      "General admission and scholarship test practice for colleges and universities.",
    type: "ADMISSION",
    sortOrder: 6,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: [
      "english",
      "mathematics",
      "general-science",
      "general-knowledge",
      "analytical-reasoning",
    ],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
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
    sortOrder: 7,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["english"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
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
    sortOrder: 8,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["general-knowledge", "everyday-science"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
    },
  },
  {
    slug: "mathematics-practice",
    name: "Mathematics Practice",
    shortName: "Mathematics",
    description:
      "Random mathematics MCQs covering arithmetic, algebra, geometry and percentages.",
    type: "EDUCATIONAL",
    sortOrder: 9,
    educationLevels: ["middle", "matric", "intermediate"],
    subjects: ["mathematics"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 25,
      negativeMarking: false,
    },
  },
  {
    slug: "computer-practice",
    name: "Computer Practice",
    shortName: "Computer",
    description:
      "Random computer science MCQs covering fundamentals, hardware, software and networking.",
    type: "EDUCATIONAL",
    sortOrder: 10,
    educationLevels: ["matric", "intermediate", "graduation"],
    subjects: ["computer"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
    },
  },
  {
    slug: "islamiat-practice",
    name: "Islamiat Practice",
    shortName: "Islamiat",
    description: "Random Islamiat MCQs on Quran, Seerah, Ibadat and history.",
    type: "EDUCATIONAL",
    sortOrder: 11,
    educationLevels: ["primary", "middle", "matric", "intermediate"],
    subjects: ["islamiat"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
    },
  },
  {
    slug: "pakistan-studies-practice",
    name: "Pakistan Studies Practice",
    shortName: "Pakistan Studies",
    description:
      "Random Pakistan Studies MCQs on the Pakistan Movement, geography and constitution.",
    type: "EDUCATIONAL",
    sortOrder: 12,
    educationLevels: ["middle", "matric", "intermediate", "graduation"],
    subjects: ["pakistan-studies"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
    },
  },
  {
    slug: "current-affairs-practice",
    name: "Current Affairs Practice",
    shortName: "Current Affairs",
    description:
      "Random current affairs MCQs on international relations, economy and organizations.",
    type: "GENERAL",
    sortOrder: 13,
    educationLevels: ["intermediate", "graduation", "post-graduation"],
    subjects: ["current-affairs"],
    configuration: {
      mode: "RANDOM",
      defaultQuestionCount: 20,
      timeLimitMinutes: 20,
      negativeMarking: false,
    },
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
