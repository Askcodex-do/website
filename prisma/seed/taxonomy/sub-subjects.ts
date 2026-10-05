/**
 * Sub-subject layer of the taxonomy.
 *
 * Subjects → sub-subjects → topics. The middle layer groups topics into the
 * broader strands a syllabus is usually organised by (e.g. Mathematics →
 * Algebra → Quadratic Equations). Topics not listed here stay directly under
 * their subject, so the hierarchy is fully optional and additive.
 *
 * Slugs are globally unique across subjects, so a sub-subject slug is enough
 * to place it; `subjects` declares which subject owns it.
 */

export interface SubSubjectGroup {
  subject: string;
  slug: string;
  name: string;
  description?: string;
  /** Topic slugs (within the owning subject) grouped under this sub-subject. */
  topics: string[];
}

export const SUB_SUBJECTS: SubSubjectGroup[] = [
  /* ---------------- Mathematics ---------------- */
  {
    subject: "mathematics",
    slug: "arithmetic",
    name: "Arithmetic",
    description: "Numbers, fractions, percentages, ratio and averages.",
    topics: ["arithmetic", "averages", "percentages", "ratio-proportion", "number-theory"],
  },
  {
    subject: "mathematics",
    slug: "algebra",
    name: "Algebra",
    description: "Expressions, equations, sequences and logarithms.",
    topics: ["algebra", "sequences-series", "series-sequences", "logarithms", "matrices"],
  },
  {
    subject: "mathematics",
    slug: "geometry-trigonometry",
    name: "Geometry & Trigonometry",
    description: "Shapes, mensuration and trigonometric ratios.",
    topics: ["geometry", "trigonometry", "mensuration"],
  },
  {
    subject: "mathematics",
    slug: "calculus-analysis",
    name: "Calculus & Analysis",
    description: "Limits, differentiation, integration and functions.",
    topics: ["calculus", "sets-functions"],
  },
  {
    subject: "mathematics",
    slug: "statistics-probability",
    name: "Statistics & Probability",
    description: "Data handling, probability and statistical measures.",
    topics: ["statistics-math", "probability"],
  },

  /* ---------------- English ---------------- */
  {
    subject: "english",
    slug: "english-grammar",
    name: "Grammar",
    description: "Parts of speech, tenses, voice, narration and agreement.",
    topics: [
      "parts-of-speech",
      "tenses",
      "articles",
      "prepositions",
      "sentence-structure",
      "active-passive-voice",
      "direct-indirect-speech",
      "degrees-of-comparison",
      "conditionals",
      "modals",
      "subject-verb-agreement",
      "punctuation",
    ],
  },
  {
    subject: "english",
    slug: "english-vocabulary",
    name: "Vocabulary & Usage",
    description: "Word meanings, idioms and phrasal verbs.",
    topics: [
      "synonyms-antonyms",
      "idioms-phrases",
      "one-word-substitution",
      "spelling",
      "vocabulary",
      "phrasal-verbs",
    ],
  },
  {
    subject: "english",
    slug: "english-composition",
    name: "Comprehension & Composition",
    description: "Reading comprehension and writing skills.",
    topics: ["comprehension", "essay-writing"],
  },

  /* ---------------- Urdu ---------------- */
  {
    subject: "urdu",
    slug: "urdu-qawaid-group",
    name: "Urdu Qawaid (Grammar)",
    description: "Core Urdu grammar rules.",
    topics: [
      "urdu-qawaid",
      "ism-fe-l",
      "tazkeer-tanees",
      "wahid-jama",
      "urdu-imla",
      "jumla-sazi",
    ],
  },
  {
    subject: "urdu",
    slug: "urdu-vocab-group",
    name: "Urdu Vocabulary",
    description: "Synonyms, antonyms, idioms and proverbs.",
    topics: ["mutradif", "mutazad", "muhavare", "zarb-ul-misl"],
  },
  {
    subject: "urdu",
    slug: "urdu-literature",
    name: "Urdu Literature",
    description: "Poetry, prose and literary forms.",
    topics: ["ghazal", "nazm", "afsana", "drama-urdu", "urdu-sahafat", "urdu-qaumi-tahreek"],
  },

  /* ---------------- Computer ---------------- */
  {
    subject: "computer",
    slug: "computer-hardware",
    name: "Hardware & Systems",
    description: "Computer components, OS and number systems.",
    topics: ["computer-fundamentals", "hardware", "operating-systems"],
  },
  {
    subject: "computer",
    slug: "computer-applications",
    name: "Applications",
    description: "Productivity software and everyday applications.",
    topics: ["software", "ms-office"],
  },
  {
    subject: "computer",
    slug: "computer-networking-web",
    name: "Networking & Internet",
    description: "Networks, the internet and cyber safety.",
    topics: ["networking", "internet", "cyber-security-basic"],
  },
  {
    subject: "computer",
    slug: "computer-programming-data",
    name: "Programming & Data",
    description: "Programming basics and databases.",
    topics: ["programming-basic", "databases-basic"],
  },

  /* ---------------- Physics ---------------- */
  {
    subject: "physics",
    slug: "physics-classical",
    name: "Classical Mechanics",
    description: "Motion, forces, work and energy.",
    topics: ["mechanics", "work-energy-power"],
  },
  {
    subject: "physics",
    slug: "physics-electromagnetism",
    name: "Electricity & Magnetism",
    description: "Current, circuits, magnetism and electronics.",
    topics: ["electricity-magnetism", "electronics-physics"],
  },
  {
    subject: "physics",
    slug: "physics-waves-optics",
    name: "Waves, Sound & Optics",
    description: "Wave behaviour, sound and light.",
    topics: ["waves-sound", "optics"],
  },
  {
    subject: "physics",
    slug: "physics-modern",
    name: "Modern & Nuclear Physics",
    description: "Relativity, quantum ideas and nuclear physics.",
    topics: ["modern-physics", "nuclear-physics", "thermodynamics", "units-measurements"],
  },

  /* ---------------- Chemistry ---------------- */
  {
    subject: "chemistry",
    slug: "chemistry-physical",
    name: "Physical Chemistry",
    description: "Physical principles, formulae and reactions.",
    topics: ["physical-chemistry", "chemical-formulae", "chemical-reactions"],
  },
  {
    subject: "chemistry",
    slug: "chemistry-inorganic",
    name: "Inorganic Chemistry",
    description: "Atomic structure, periodic table and inorganic compounds.",
    topics: ["inorganic-chemistry", "atomic-structure", "periodic-table"],
  },
  {
    subject: "chemistry",
    slug: "chemistry-organic-analytical",
    name: "Organic & Analytical Chemistry",
    description: "Organic compounds, analysis and biochemistry.",
    topics: ["organic-chemistry", "analytical-chemistry", "biochemistry-chem"],
  },

  /* ---------------- Biology ---------------- */
  {
    subject: "biology",
    slug: "biology-cells-genetics",
    name: "Cells & Genetics",
    description: "Cell biology, genetics and reproduction.",
    topics: ["cell-biology", "genetics", "reproduction"],
  },
  {
    subject: "biology",
    slug: "biology-organisms",
    name: "Organisms & Physiology",
    description: "Human physiology, plants and microbiology.",
    topics: ["human-physiology", "plant-biology", "microbiology"],
  },
  {
    subject: "biology",
    slug: "biology-ecology-evolution",
    name: "Ecology & Evolution",
    description: "Ecosystems and evolutionary theory.",
    topics: ["ecology", "evolution"],
  },

  /* ---------------- Pakistan Studies ---------------- */
  {
    subject: "pakistan-studies",
    slug: "ps-movement",
    name: "Freedom Movement",
    description: "The Pakistan Movement and independence.",
    topics: ["pakistan-movement", "freedom-struggle", "wars-pakistan", "nuclear-pakistan"],
  },
  {
    subject: "pakistan-studies",
    slug: "ps-geography-economy",
    name: "Geography & Economy",
    description: "Land, resources and the economy.",
    topics: ["pakistan-geography", "pakistan-economy"],
  },
  {
    subject: "pakistan-studies",
    slug: "ps-constitution-government",
    name: "Constitution & Government",
    description: "Constitutional and political institutions.",
    topics: ["constitution", "pakistan-government", "national-symbols", "regional-cultures"],
  },

  /* ---------------- Islamiat ---------------- */
  {
    subject: "islamiat",
    slug: "islamiat-scripture",
    name: "Quran & Hadith",
    description: "The Quran and the Hadith.",
    topics: ["quran", "hadith"],
  },
  {
    subject: "islamiat",
    slug: "islamiat-fiqh-ibadat",
    name: "Fiqh & Ibadat",
    description: "Jurisprudence, worship and the pillars of Islam.",
    topics: ["ibadat", "fiqh", "pillars-of-islam"],
  },
  {
    subject: "islamiat",
    slug: "islamiat-seerah-history",
    name: "Seerah & Islamic History",
    description: "The life of the Prophet (PBUH) and Islamic history.",
    topics: ["seerah", "islamic-history", "khilafat", "prophets", "islamic-morality"],
  },

  /* ---------------- General Knowledge ---------------- */
  {
    subject: "general-knowledge",
    slug: "gk-geography-world",
    name: "World Geography",
    description: "Countries, capitals and physical features.",
    topics: ["world-geography", "capitals-currencies", "national-symbols"],
  },
  {
    subject: "general-knowledge",
    slug: "gk-organisations",
    name: "Organisations & Affairs",
    description: "International organisations and current affairs.",
    topics: ["international-organizations", "important-days", "sports"],
  },
  {
    subject: "general-knowledge",
    slug: "gk-science-people",
    name: "Science & People",
    description: "Discoveries, awards and notable figures.",
    topics: ["inventions-discoveries", "awards-honours", "famous-personalities", "books-authors"],
  },

  /* ---------------- Economics & Business ---------------- */
  {
    subject: "economics",
    slug: "economics-theory",
    name: "Economic Theory",
    description: "Micro and macroeconomic principles.",
    topics: ["microeconomics", "macroeconomics", "development-economics"],
  },
  {
    subject: "economics",
    slug: "economics-money-public",
    name: "Money & Public Finance",
    description: "Banking, money and public finance.",
    topics: ["money-banking", "public-finance", "economy"],
  },
  {
    subject: "business-administration",
    slug: "ba-management",
    name: "Management",
    description: "Management and organisational behaviour.",
    topics: ["management", "organizational-behaviour", "human-resource-management"],
  },
  {
    subject: "business-administration",
    slug: "ba-entrepreneurship-ethics",
    name: "Entrepreneurship & Ethics",
    description: "Enterprise and business ethics.",
    topics: ["entrepreneurship", "business-ethics", "marketing"],
  },
  {
    subject: "accounting",
    slug: "accounting-financial",
    name: "Financial Accounting",
    description: "Financial statements and bookkeeping.",
    topics: ["financial-accounting", "bookkeeping"],
  },
  {
    subject: "accounting",
    slug: "accounting-managerial-audit",
    name: "Managerial & Audit",
    description: "Costing, management accounting and audit.",
    topics: ["cost-accounting", "management-accounting", "auditing", "taxation"],
  },

  /* ---------------- Social Sciences ---------------- */
  {
    subject: "history",
    slug: "history-world",
    name: "World History",
    description: "Ancient, medieval and modern world history.",
    topics: ["ancient-history", "medieval-history", "modern-history", "world-wars", "revolutions"],
  },
  {
    subject: "history",
    slug: "history-regional",
    name: "Regional & Islamic History",
    description: "South Asian and Islamic history.",
    topics: ["south-asian-history", "islamic-history-advanced"],
  },
  {
    subject: "geography",
    slug: "geography-physical",
    name: "Physical Geography",
    description: "Landforms, climate and natural resources.",
    topics: ["physical-geography", "climate-weather", "natural-resources"],
  },
  {
    subject: "geography",
    slug: "geography-human",
    name: "Human & World Geography",
    description: "Population, maps and world regions.",
    topics: ["human-geography", "world-geography", "map-reading"],
  },
  {
    subject: "political-science",
    slug: "pol-theory-systems",
    name: "Theory & Systems",
    description: "Political theory and systems of government.",
    topics: ["political-theory", "political-systems", "democracy", "constitutions"],
  },
  {
    subject: "political-science",
    slug: "pol-international",
    name: "International Politics",
    description: "International politics and administration.",
    topics: ["international-politics", "public-administration"],
  },
  {
    subject: "sociology",
    slug: "sociology-theory-institutions",
    name: "Theory & Institutions",
    description: "Sociological theory and social institutions.",
    topics: ["sociological-theory", "social-institutions", "culture-society"],
  },
  {
    subject: "sociology",
    slug: "sociology-change-problems",
    name: "Social Change & Problems",
    description: "Social change and contemporary issues.",
    topics: ["social-change", "social-problems"],
  },
  {
    subject: "psychology",
    slug: "psychology-general-developmental",
    name: "General & Developmental",
    description: "Foundations and development of behaviour.",
    topics: ["general-psychology", "developmental-psychology", "personality"],
  },
  {
    subject: "psychology",
    slug: "psychology-applied",
    name: "Applied Psychology",
    description: "Cognitive, clinical and social psychology.",
    topics: ["cognitive-psychology", "clinical-psychology", "social-psychology"],
  },

  /* ---------------- Education, Law, Media, Health ---------------- */
  {
    subject: "education",
    slug: "education-foundations",
    name: "Foundations",
    description: "Pedagogy, curriculum and educational philosophy.",
    topics: ["pedagogy", "curriculum", "philosophy-of-education"],
  },
  {
    subject: "education",
    slug: "education-assessment-management",
    name: "Assessment & Management",
    description: "Educational assessment and administration.",
    topics: ["assessment", "educational-psychology", "educational-management"],
  },
  {
    subject: "law",
    slug: "law-public",
    name: "Public Law",
    description: "Constitutional, criminal and international law.",
    topics: ["constitutional-law", "criminal-law", "international-law-law", "jurisprudence"],
  },
  {
    subject: "law",
    slug: "law-private",
    name: "Private Law",
    description: "Civil, Islamic and procedural law.",
    topics: ["civil-law", "islamic-law", "legal-reasoning"],
  },
  {
    subject: "mass-communication",
    slug: "media-journalism",
    name: "Journalism & Media",
    description: "Reporting, media theory and platforms.",
    topics: ["journalism", "media-theory", "print-media", "electronic-media", "digital-media"],
  },
  {
    subject: "mass-communication",
    slug: "media-law-advertising",
    name: "Advertising & Media Law",
    description: "Advertising, public relations and media ethics.",
    topics: ["advertising-pr", "media-law-ethics"],
  },
  {
    subject: "nursing",
    slug: "nursing-clinical",
    name: "Clinical Nursing",
    description: "Medical-surgical and paediatric nursing.",
    topics: ["medical-surgical-nursing", "pediatric-nursing", "fundamentals-nursing"],
  },
  {
    subject: "nursing",
    slug: "nursing-community-ethics",
    name: "Community & Ethics",
    description: "Community health and nursing ethics.",
    topics: ["community-health-nursing", "nursing-ethics"],
  },
];
