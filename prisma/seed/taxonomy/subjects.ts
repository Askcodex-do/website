/**
 * Comprehensive Pakistan subject catalogue.
 *
 * Every subject lists the education levels at which it is taught and its topic
 * tree. This is pure data: the Question Selection Engine and the generators
 * read it, and new subjects are added here rather than in application code.
 *
 * Levels are used for qualification matching: a question is only surfaced for
 * an exam when the question's levels intersect the exam's levels.
 */

import type { SeedSubject } from "../taxonomy";
import { SUB_SUBJECTS } from "./sub-subjects";

/** Compact builder so the catalogue stays readable at this size. */
type TopicInput =
  | [slug: string, name: string]
  | {
      slug: string;
      name: string;
      subSubject?: string;
      subtopics?: [slug: string, name: string][];
    };

function s(
  slug: string,
  name: string,
  description: string,
  levels: string[],
  topics: TopicInput[],
  subSubjects?: [slug: string, name: string][],
): SeedSubject {
  return {
    slug,
    name,
    description,
    levels,
    subSubjects: subSubjects?.map(([ss, sname]) => ({ slug: ss, name: sname })),
    topics: topics.map((t) =>
      Array.isArray(t)
        ? { slug: t[0], name: t[1] }
        : {
            ...t,
            subtopics: t.subtopics?.map(([st, stname]) => ({ slug: st, name: stname })),
          },
    ),
  };
}

const ALL = [
  "primary",
  "middle",
  "matric",
  "intermediate",
  "graduation",
  "post-graduation",
  "doctorate",
];

const RAW_SUBJECTS: SeedSubject[] = [
  /* Languages & literature */
  s("english", "English", "English grammar, vocabulary, comprehension and verbal ability.", ALL, [
    ["parts-of-speech", "Parts of Speech"],
    ["tenses", "Tenses"],
    ["articles", "Articles"],
    ["prepositions", "Prepositions"],
    ["sentence-structure", "Sentence Structure"],
    ["active-passive-voice", "Active & Passive Voice"],
    ["direct-indirect-speech", "Direct & Indirect Speech"],
    ["synonyms-antonyms", "Synonyms & Antonyms"],
    ["idioms-phrases", "Idioms & Phrases"],
    ["one-word-substitution", "One-Word Substitution"],
    ["spelling", "Spelling"],
    ["vocabulary", "Vocabulary"],
    ["comprehension", "Reading Comprehension"],
    ["punctuation", "Punctuation"],
    ["degrees-of-comparison", "Degrees of Comparison"],
    ["conditionals", "Conditionals"],
    ["modals", "Modal Verbs"],
    ["phrasal-verbs", "Phrasal Verbs"],
    ["subject-verb-agreement", "Subject-Verb Agreement"],
    ["essay-writing", "Essay & Composition"],
  ]),
  s("urdu", "Urdu", "Urdu grammar, vocabulary, idioms and literature.", ALL, [
    ["urdu-qawaid", "Urdu Qawaid (Grammar)"],
    ["ism-fe-l", "Ism aur Fe'l"],
    ["tazkeer-tanees", "Tazkeer wa Tanees"],
    ["wahid-jama", "Wahid wa Jama"],
    ["mutradif", "Mutradif (Synonyms)"],
    ["mutazad", "Mutazad (Antonyms)"],
    ["muhavare", "Muhavare (Idioms)"],
    ["zarb-ul-misl", "Zarb-ul-Misl (Proverbs)"],
    ["urdu-imla", "Urdu Imla (Spelling)"],
    ["jumla-sazi", "Jumla Sazi"],
    ["ghazal", "Ghazal"],
    ["nazm", "Nazm"],
    ["afsana", "Afsana"],
    ["drama-urdu", "Urdu Drama"],
    ["urdu-sahafat", "Urdu Sahafat"],
    ["urdu-qaumi-tahreek", "Urdu aur Tehreek-e-Azadi"],
  ]),
  s("sindhi", "Sindhi", "Sindhi language, grammar and literature.", ALL, [
    ["sindhi-grammar", "Sindhi Grammar"],
    ["sindhi-vocabulary", "Sindhi Vocabulary"],
    ["sindhi-idioms", "Sindhi Idioms"],
    ["sindhi-proverbs", "Sindhi Proverbs"],
    ["sindhi-poetry", "Sindhi Poetry"],
    ["shah-jo-risalo", "Shah Jo Risalo"],
    ["sindhi-prose", "Sindhi Prose"],
    ["sindhi-script", "Sindhi Script"],
  ]),
  s("punjabi", "Punjabi", "Punjabi language, grammar and literature.", ALL, [
    ["punjabi-grammar", "Punjabi Grammar"],
    ["punjabi-vocabulary", "Punjabi Vocabulary"],
    ["punjabi-idioms", "Punjabi Idioms"],
    ["punjabi-proverbs", "Punjabi Proverbs"],
    ["punjabi-poetry", "Punjabi Poetry"],
    ["punjabi-prose", "Punjabi Prose"],
  ]),
  s("pashto", "Pashto", "Pashto language, grammar and literature.", ALL, [
    ["pashto-grammar", "Pashto Grammar"],
    ["pashto-vocabulary", "Pashto Vocabulary"],
    ["pashto-idioms", "Pashto Idioms"],
    ["pashto-proverbs", "Pashto Proverbs"],
    ["pashto-poetry", "Pashto Poetry"],
    ["pashto-prose", "Pashto Prose"],
  ]),
  s("balochi", "Balochi", "Balochi language, grammar and literature.", ALL, [
    ["balochi-grammar", "Balochi Grammar"],
    ["balochi-vocabulary", "Balochi Vocabulary"],
    ["balochi-idioms", "Balochi Idioms"],
    ["balochi-poetry", "Balochi Poetry"],
  ]),
  s("saraiki", "Saraiki", "Saraiki language, grammar and literature.", ALL, [
    ["saraiki-grammar", "Saraiki Grammar"],
    ["saraiki-vocabulary", "Saraiki Vocabulary"],
    ["saraiki-idioms", "Saraiki Idioms"],
    ["saraiki-poetry", "Saraiki Poetry"],
  ]),
  s("hindko", "Hindko", "Hindko language and literature.", ["primary", "middle", "matric", "intermediate", "graduation"], [
    ["hindko-grammar", "Hindko Grammar"],
    ["hindko-vocabulary", "Hindko Vocabulary"],
    ["hindko-poetry", "Hindko Poetry"],
  ]),
  s("kashmiri", "Kashmiri", "Kashmiri language and literature.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["kashmiri-grammar", "Kashmiri Grammar"],
    ["kashmiri-vocabulary", "Kashmiri Vocabulary"],
    ["kashmiri-poetry", "Kashmiri Poetry"],
  ]),
  s("brahvi", "Brahvi", "Brahvi language and literature.", ["middle", "matric", "intermediate", "graduation"], [
    ["brahvi-grammar", "Brahvi Grammar"],
    ["brahvi-vocabulary", "Brahvi Vocabulary"],
  ]),
  s("arabic", "Arabic", "Arabic language, grammar and literature.", ALL, [
    ["arabic-grammar", "Arabic Grammar (Nahw)"],
    ["arabic-morphology", "Arabic Morphology (Sarf)"],
    ["arabic-vocabulary", "Arabic Vocabulary"],
    ["arabic-literature", "Arabic Literature"],
    ["arabic-comprehension", "Arabic Comprehension"],
  ]),
  s("persian", "Persian", "Persian language, grammar and literature.", ALL, [
    ["persian-grammar", "Persian Grammar"],
    ["persian-vocabulary", "Persian Vocabulary"],
    ["persian-poetry", "Persian Poetry"],
    ["persian-literature", "Persian Literature"],
  ]),
  s("english-literature", "English Literature", "English literary periods, authors and texts.", ["intermediate", "graduation", "post-graduation", "doctorate"], [
    ["elizabethan-age", "Elizabethan Age"],
    ["romantic-age", "Romantic Age"],
    ["victorian-age", "Victorian Age"],
    ["modern-age", "Modern Age"],
    ["poetry-criticism", "Poetry & Criticism"],
    ["drama-shakespeare", "Drama & Shakespeare"],
    ["novel-fiction", "Novel & Fiction"],
    ["literary-criticism", "Literary Criticism"],
  ]),
  s("urdu-literature", "Urdu Literature", "Urdu literary movements, authors and texts.", ["intermediate", "graduation", "post-graduation", "doctorate"], [
    ["urdu-shaeri", "Urdu Shaeri"],
    ["urdu-nasar", "Urdu Nasar"],
    ["urdu-novel", "Urdu Novel"],
    ["urdu-afsana", "Urdu Afsana"],
    ["urdu-tanqeed", "Urdu Tanqeed"],
    ["urdu-sahafat-tareekh", "Urdu Sahafat ki Tareekh"],
  ]),
  s("sindhi-literature", "Sindhi Literature", "Sindhi literary history, authors and texts.", ["intermediate", "graduation", "post-graduation"], [
    ["sindhi-classical-poetry", "Sindhi Classical Poetry"],
    ["sindhi-modern-literature", "Sindhi Modern Literature"],
    ["sindhi-writers", "Sindhi Writers"],
  ]),

  /* Islamic studies */
  s("islamiat", "Islamiat", "Core Islamic studies: Quran, Hadith, Seerah, Ibadat and Fiqh.", ALL, [
    ["quran", "Quran"],
    ["hadith", "Hadith"],
    ["seerah", "Seerah (Life of the Prophet)"],
    ["ibadat", "Ibadat (Worship)"],
    ["fiqh", "Fiqh"],
    ["islamic-history", "Islamic History"],
    ["pillars-of-islam", "Pillars of Islam"],
    ["islamic-morality", "Islamic Morality & Ethics"],
    ["prophets", "Prophets of Islam"],
    ["khilafat", "Khilafat"],
  ]),
  s("islamic-studies", "Islamic Studies", "Advanced Islamic studies including theology, law and civilisation.", ["intermediate", "graduation", "post-graduation", "doctorate"], [
    ["quranic-studies", "Quranic Studies (Uloom-ul-Quran)"],
    ["hadith-studies", "Hadith Studies (Uloom-ul-Hadith)"],
    ["fiqh-usul", "Fiqh & Usul-e-Fiqh"],
    ["islamic-theology", "Islamic Theology (Aqeedah)"],
    ["islamic-civilisation", "Islamic Civilisation"],
    ["islamic-economics", "Islamic Economics & Banking"],
    ["comparative-religion", "Comparative Religion"],
    ["muslim-philosophy", "Muslim Philosophy"],
  ]),
  s("seerah", "Seerah", "Life and teachings of Prophet Muhammad (PBUH).", ["primary", "middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["makkah-period", "Makkah Period"],
    ["madinah-period", "Madinah Period"],
    ["battles-islam", "Battles of Islam"],
    ["treaties-pacts", "Treaties & Pacts"],
    ["companions", "Companions (Sahaba)"],
    ["prophetic-teachings", "Prophetic Teachings"],
  ]),
  s("quran-hadith", "Quran & Hadith", "Quranic sciences and Hadith literature.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["quran-revelation", "Revelation & Compilation"],
    ["quran-tajweed", "Tajweed"],
    ["quran-translation", "Translation & Tafseer"],
    ["hadith-collections", "Hadith Collections"],
    ["hadith-science", "Science of Hadith"],
  ]),
  s("fiqh", "Fiqh", "Islamic jurisprudence and practical rulings.", ["matric", "intermediate", "graduation", "post-graduation"], [
    ["fiqh-ibadat", "Fiqh-ul-Ibadat"],
    ["fiqh-muamlat", "Fiqh-ul-Muamlat"],
    ["fiqh-madhab", "Schools of Thought"],
    ["usul-fiqh", "Usul-ul-Fiqh"],
  ]),

  /* Pakistan studies, history & social sciences */
  s("pakistan-studies", "Pakistan Studies", "Pakistan Movement, geography, constitution and national affairs.", ALL, [
    ["pakistan-movement", "Pakistan Movement"],
    ["freedom-struggle", "Freedom Struggle"],
    ["pakistan-geography", "Geography of Pakistan"],
    ["constitution", "Constitution of Pakistan"],
    ["pakistan-economy", "Economy of Pakistan"],
    ["national-symbols", "National Symbols"],
    ["pakistan-government", "Government & Institutions"],
    ["regional-cultures", "Regional Cultures"],
    ["wars-pakistan", "Wars & Defence"],
    ["nuclear-pakistan", "Nuclear Programme"],
  ]),
  s("pakistan-affairs", "Pakistan Affairs", "Current and contemporary Pakistan affairs for competitive exams.", ["intermediate", "graduation", "post-graduation"], [
    ["pa-politics", "Politics & Governance"],
    ["pa-economy", "Economic Affairs"],
    ["pa-foreign-policy", "Foreign Policy"],
    ["pa-society", "Society & Culture"],
    ["pa-institutions", "Institutions"],
    ["pa-challenges", "Contemporary Challenges"],
  ]),
  s("history", "History", "World and Islamic history.", ["matric", "intermediate", "graduation", "post-graduation", "doctorate"], [
    ["ancient-history", "Ancient History"],
    ["medieval-history", "Medieval History"],
    ["modern-history", "Modern History"],
    ["world-wars", "World Wars"],
    ["islamic-history-advanced", "Islamic History"],
    ["south-asian-history", "South Asian History"],
    ["revolutions", "Revolutions & Movements"],
  ]),
  s("political-science", "Political Science", "Political theory, systems and institutions.", ["intermediate", "graduation", "post-graduation", "doctorate"], [
    ["political-theory", "Political Theory"],
    ["constitutions", "Constitutions"],
    ["political-systems", "Political Systems"],
    ["public-administration", "Public Administration"],
    ["international-politics", "International Politics"],
    ["democracy", "Democracy & Governance"],
  ]),
  s("international-relations", "International Relations", "Global politics, diplomacy and organisations.", ["intermediate", "graduation", "post-graduation"], [
    ["ir-theories", "IR Theories"],
    ["international-organizations", "International Organizations"],
    ["diplomacy", "Diplomacy"],
    ["foreign-policy", "Foreign Policy"],
    ["global-conflicts", "Global Conflicts"],
    ["international-law", "International Law"],
  ]),
  s("sociology", "Sociology", "Society, culture and social institutions.", ["intermediate", "graduation", "post-graduation"], [
    ["sociological-theory", "Sociological Theory"],
    ["social-institutions", "Social Institutions"],
    ["culture-society", "Culture & Society"],
    ["social-change", "Social Change"],
    ["social-problems", "Social Problems"],
  ]),
  s("psychology", "Psychology", "Human behaviour, cognition and mental processes.", ["intermediate", "graduation", "post-graduation"], [
    ["general-psychology", "General Psychology"],
    ["developmental-psychology", "Developmental Psychology"],
    ["cognitive-psychology", "Cognitive Psychology"],
    ["clinical-psychology", "Clinical Psychology"],
    ["social-psychology", "Social Psychology"],
    ["personality", "Personality"],
  ]),
  s("philosophy", "Philosophy", "Philosophical thought, logic and ethics.", ["intermediate", "graduation", "post-graduation"], [
    ["logic", "Logic"],
    ["ethics", "Ethics"],
    ["metaphysics", "Metaphysics"],
    ["epistemology", "Epistemology"],
    ["western-philosophy", "Western Philosophy"],
    ["eastern-philosophy", "Eastern Philosophy"],
  ]),
  s("geography", "Geography", "Physical, human and regional geography.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["physical-geography", "Physical Geography"],
    ["human-geography", "Human Geography"],
    ["world-geography", "World Geography"],
    ["map-reading", "Map Reading"],
    ["climate-weather", "Climate & Weather"],
    ["natural-resources", "Natural Resources"],
  ]),
  s("civics", "Civics", "Citizenship, government and civic rights.", ["middle", "matric", "intermediate", "graduation"], [
    ["citizenship", "Citizenship"],
    ["government", "Government"],
    ["rights-duties", "Rights & Duties"],
    ["civic-institutions", "Civic Institutions"],
  ]),
  s("economics", "Economics", "Microeconomics, macroeconomics and development.", ["intermediate", "graduation", "post-graduation"], [
    ["microeconomics", "Microeconomics"],
    ["macroeconomics", "Macroeconomics"],
    ["development-economics", "Development Economics"],
    ["economy", "Economy & Trade"],
    ["money-banking", "Money & Banking"],
    ["public-finance", "Public Finance"],
  ]),
  s("gender-studies", "Gender Studies", "Gender, society and development.", ["intermediate", "graduation", "post-graduation"], [
    ["gender-theory", "Gender Theory"],
    ["women-development", "Women & Development"],
    ["gender-society", "Gender & Society"],
  ]),
  s("social-work", "Social Work", "Social welfare, community development and casework.", ["intermediate", "graduation", "post-graduation"], [
    ["social-welfare", "Social Welfare"],
    ["community-development", "Community Development"],
    ["casework", "Social Casework"],
    ["social-policy", "Social Policy"],
  ]),
  s("library-science", "Library & Information Science", "Library management, cataloguing and information science.", ["graduation", "post-graduation"], [
    ["cataloguing", "Cataloguing"],
    ["classification", "Classification"],
    ["library-management", "Library Management"],
    ["information-science", "Information Science"],
  ]),
  s("education", "Education", "Pedagogy, curriculum, assessment and educational psychology.", ["intermediate", "graduation", "post-graduation"], [
    ["pedagogy", "Pedagogy & Teaching Methods"],
    ["curriculum", "Curriculum & Instruction"],
    ["educational-psychology", "Educational Psychology"],
    ["assessment", "Assessment & Evaluation"],
    ["educational-management", "Educational Management"],
    ["philosophy-of-education", "Philosophy of Education"],
  ]),
  s("mass-communication", "Mass Communication & Journalism", "Journalism, media studies and communication.", ["intermediate", "graduation", "post-graduation"], [
    ["journalism", "Journalism"],
    ["media-theory", "Media Theory"],
    ["print-media", "Print Media"],
    ["electronic-media", "Electronic Media"],
    ["advertising-pr", "Advertising & Public Relations"],
    ["media-law-ethics", "Media Law & Ethics"],
    ["digital-media", "Digital & Social Media"],
  ]),
  s("fine-arts", "Fine Arts", "Visual arts, design and art history.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["art-history", "Art History"],
    ["drawing-painting", "Drawing & Painting"],
    ["design", "Design"],
    ["calligraphy", "Calligraphy"],
  ]),
  s("music", "Music", "Music theory and South Asian music tradition.", ["middle", "matric", "intermediate", "graduation"], [
    ["music-theory", "Music Theory"],
    ["classical-music", "Classical Music"],
    ["instruments", "Musical Instruments"],
  ]),
  s("physical-education", "Physical Education", "Sports science, health and physical fitness.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["sports-science", "Sports Science"],
    ["health-fitness", "Health & Fitness"],
    ["sports-rules", "Sports Rules"],
    ["olympics", "Olympics & Events"],
  ]),

  /* Sciences */
  s("physics", "Physics", "Mechanics, electricity, waves, optics and modern physics.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["mechanics", "Mechanics"],
    ["work-energy-power", "Work, Energy & Power"],
    ["electricity-magnetism", "Electricity & Magnetism"],
    ["waves-sound", "Waves & Sound"],
    ["optics", "Optics"],
    ["thermodynamics", "Thermodynamics"],
    ["modern-physics", "Modern Physics"],
    ["units-measurements", "Units & Measurements"],
    ["nuclear-physics", "Nuclear Physics"],
    ["electronics-physics", "Electronics"],
  ]),
  s("chemistry", "Chemistry", "Physical, organic and inorganic chemistry.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["physical-chemistry", "Physical Chemistry"],
    ["organic-chemistry", "Organic Chemistry"],
    ["inorganic-chemistry", "Inorganic Chemistry"],
    ["analytical-chemistry", "Analytical Chemistry"],
    ["chemical-formulae", "Chemical Formulae & Equations"],
    ["atomic-structure", "Atomic Structure"],
    ["periodic-table", "Periodic Table"],
    ["chemical-reactions", "Chemical Reactions"],
    ["biochemistry-chem", "Biochemistry"],
  ]),
  s("biology", "Biology", "Cell biology, genetics, physiology and ecology.", ["middle", "matric", "intermediate", "graduation", "post-graduation"], [
    ["cell-biology", "Cell Biology"],
    ["genetics", "Genetics"],
    ["human-physiology", "Human Physiology"],
    ["plant-biology", "Plant Biology"],
    ["ecology", "Ecology"],
    ["evolution", "Evolution"],
    ["microbiology", "Microbiology"],
    ["reproduction", "Reproduction"],
  ]),
  s("zoology", "Zoology", "Animal biology, taxonomy and physiology.", ["intermediate", "graduation", "post-graduation"], [
    ["animal-diversity", "Animal Diversity"],
    ["animal-physiology", "Animal Physiology"],
    ["taxonomy", "Taxonomy"],
    ["entomology", "Entomology"],
    ["wildlife", "Wildlife & Conservation"],
  ]),
  s("botany", "Botany", "Plant science, taxonomy and physiology.", ["intermediate", "graduation", "post-graduation"], [
    ["plant-taxonomy", "Plant Taxonomy"],
    ["plant-physiology", "Plant Physiology"],
    ["plant-anatomy", "Plant Anatomy"],
    ["plant-pathology", "Plant Pathology"],
    ["ethnobotany", "Ethnobotany"],
  ]),
  s("mathematics", "Mathematics", "Arithmetic, algebra, geometry, calculus and statistics.", ALL, [
    ["arithmetic", "Arithmetic"],
    ["averages", "Averages"],
    ["percentages", "Percentages"],
    ["ratio-proportion", "Ratio & Proportion"],
    ["algebra", "Algebra"],
    ["geometry", "Geometry"],
    ["trigonometry", "Trigonometry"],
    ["calculus", "Calculus"],
    ["statistics-math", "Statistics"],
    ["probability", "Probability"],
    ["matrices", "Matrices & Determinants"],
    ["logarithms", "Logarithms"],
    ["number-theory", "Number Theory"],
    ["sequences-series", "Sequences & Series"],
    ["series-sequences", "Series & Sequences"],
    ["mensuration", "Mensuration"],
    ["sets-functions", "Sets & Functions"],
  ]),
  s("statistics", "Statistics", "Descriptive and inferential statistics.", ["intermediate", "graduation", "post-graduation"], [
    ["descriptive-statistics", "Descriptive Statistics"],
    ["probability-distributions", "Probability Distributions"],
    ["inferential-statistics", "Inferential Statistics"],
    ["correlation-regression", "Correlation & Regression"],
    ["sampling", "Sampling"],
  ]),
  s("computer", "Computer", "Computer fundamentals, office tools and applications.", ALL, [
    ["computer-fundamentals", "Computer Fundamentals"],
    ["hardware", "Hardware"],
    ["software", "Software"],
    ["ms-office", "MS Office"],
    ["networking", "Networking"],
    ["internet", "Internet & Web"],
    ["databases-basic", "Databases"],
    ["programming-basic", "Programming Basics"],
    ["operating-systems", "Operating Systems"],
    ["cyber-security-basic", "Cyber Security"],
  ]),
  s("computer-science", "Computer Science", "Algorithms, data structures, OS, DBMS and software engineering.", ["intermediate", "graduation", "post-graduation"], [
    ["data-structures", "Data Structures"],
    ["algorithms", "Algorithms"],
    ["operating-systems-cs", "Operating Systems"],
    ["dbms", "Database Systems"],
    ["software-engineering", "Software Engineering"],
    ["computer-networks", "Computer Networks"],
    ["theory-of-computation", "Theory of Computation"],
    ["artificial-intelligence", "Artificial Intelligence"],
    ["web-technologies", "Web Technologies"],
    ["cyber-security", "Cyber Security"],
  ]),
  s("information-technology", "Information Technology", "IT infrastructure, systems and applications.", ["intermediate", "graduation", "post-graduation"], [
    ["it-fundamentals", "IT Fundamentals"],
    ["information-systems", "Information Systems"],
    ["e-commerce", "E-Commerce"],
    ["multimedia", "Multimedia"],
    ["networking-it", "Networking"],
  ]),
  s("software-engineering", "Software Engineering", "Software process, design, testing and project management.", ["graduation", "post-graduation"], [
    ["software-process", "Software Process Models"],
    ["software-design", "Software Design"],
    ["software-testing", "Software Testing"],
    ["software-project-management", "Project Management"],
    ["requirements-engineering", "Requirements Engineering"],
  ]),
  s("environmental-science", "Environmental Science", "Ecology, pollution, climate and conservation.", ["matric", "intermediate", "graduation", "post-graduation"], [
    ["pollution", "Pollution"],
    ["climate-change", "Climate Change"],
    ["conservation", "Conservation"],
    ["ecosystems", "Ecosystems"],
    ["environmental-health", "Environmental Health"],
  ]),
  s("agriculture", "Agriculture", "Crop science, soil, livestock and agronomy.", ["matric", "intermediate", "graduation", "post-graduation"], [
    ["agronomy", "Agronomy"],
    ["soil-science", "Soil Science"],
    ["horticulture", "Horticulture"],
    ["plant-protection", "Plant Protection"],
    ["livestock", "Livestock & Dairy"],
    ["irrigation", "Irrigation"],
  ]),
  s("geology", "Geology", "Earth structure, minerals and rocks.", ["intermediate", "graduation", "post-graduation"], [
    ["mineralogy", "Mineralogy"],
    ["petrology", "Petrology"],
    ["structural-geology", "Structural Geology"],
    ["palaeontology", "Palaeontology"],
  ]),
  s("general-science", "General Science", "Integrated science for school and competitive exams.", ALL, [
    ["biology", "Biology"],
    ["physics", "Physics"],
    ["chemistry", "Chemistry"],
    ["human-body", "Human Body"],
    ["diseases-health", "Diseases & Health"],
    ["inventions-discoveries", "Inventions & Discoveries"],
    ["scientific-instruments", "Scientific Instruments"],
    ["units-measurements", "Units & Measurements"],
    ["environment", "Environment"],
  ]),
  s("everyday-science", "Everyday Science", "Applied science for everyday and competitive use.", ALL, [
    ["human-body", "Human Body"],
    ["diseases-health", "Diseases & Health"],
    ["food-nutrition", "Food & Nutrition"],
    ["vitamins", "Vitamins & Minerals"],
    ["inventions-discoveries", "Inventions & Discoveries"],
    ["scientific-instruments", "Scientific Instruments"],
    ["units-measurements", "Units & Measurements"],
    ["environment", "Environment & Pollution"],
  ]),
  s("analytical-reasoning", "Analytical Reasoning", "Logical and analytical reasoning for tests.", ["matric", "intermediate", "graduation", "post-graduation"], [
    ["number-series", "Number Series"],
    ["letter-series", "Letter Series"],
    ["series-sequences", "Series & Sequences"],
    ["analogies", "Analogies"],
    ["odd-one-out", "Odd One Out"],
    ["coding-decoding", "Coding & Decoding"],
    ["direction-sense", "Direction Sense"],
    ["blood-relations", "Blood Relations"],
    ["syllogisms", "Syllogisms"],
    ["logical-deduction", "Logical Deduction"],
    ["data-sufficiency", "Data Sufficiency"],
    ["clock-calendar", "Clock & Calendar"],
    ["statement-assumption", "Statement & Assumption"],
  ]),

  /* Medical & health */
  s("anatomy", "Anatomy", "Human anatomy and structure.", ["intermediate", "graduation", "post-graduation"], [
    ["general-anatomy", "General Anatomy"],
    ["osteology", "Osteology"],
    ["neuroanatomy", "Neuroanatomy"],
    ["regional-anatomy", "Regional Anatomy"],
    ["histology", "Histology"],
  ]),
  s("physiology", "Physiology", "Human physiology and organ systems.", ["intermediate", "graduation", "post-graduation"], [
    ["general-physiology", "General Physiology"],
    ["cardiovascular", "Cardiovascular Physiology"],
    ["respiratory", "Respiratory Physiology"],
    ["nervous-system", "Nervous System"],
    ["endocrine", "Endocrine System"],
    ["renal", "Renal Physiology"],
  ]),
  s("pharmacology", "Pharmacology", "Drugs, their actions and uses.", ["graduation", "post-graduation"], [
    ["general-pharmacology", "General Pharmacology"],
    ["systemic-pharmacology", "Systemic Pharmacology"],
    ["chemotherapy", "Chemotherapy"],
    ["toxicology", "Toxicology"],
  ]),
  s("nursing", "Nursing", "Nursing practice, care and procedures.", ["intermediate", "graduation", "post-graduation"], [
    ["fundamentals-nursing", "Fundamentals of Nursing"],
    ["medical-surgical-nursing", "Medical-Surgical Nursing"],
    ["community-health-nursing", "Community Health Nursing"],
    ["pediatric-nursing", "Pediatric Nursing"],
    ["nursing-ethics", "Nursing Ethics"],
  ]),
  s("public-health", "Public Health", "Epidemiology, health promotion and policy.", ["intermediate", "graduation", "post-graduation"], [
    ["epidemiology", "Epidemiology"],
    ["health-promotion", "Health Promotion"],
    ["health-policy", "Health Policy"],
    ["biostatistics", "Biostatistics"],
    ["maternal-child-health", "Maternal & Child Health"],
  ]),
  s("biochemistry", "Biochemistry", "Biomolecules, metabolism and molecular biology.", ["intermediate", "graduation", "post-graduation"], [
    ["biomolecules", "Biomolecules"],
    ["metabolism", "Metabolism"],
    ["enzymes", "Enzymes"],
    ["molecular-biology", "Molecular Biology"],
  ]),
  s("medical", "Medical Sciences", "Applied medical sciences for MBBS/medical entry.", ["intermediate", "graduation", "post-graduation"], [
    ["pathology", "Pathology"],
    ["microbiology-medical", "Medical Microbiology"],
    ["forensic-medicine", "Forensic Medicine"],
    ["community-medicine", "Community Medicine"],
    ["clinical-medicine", "Clinical Medicine"],
  ]),

  /* Commerce, business & finance */
  s("accounting", "Accounting", "Financial, cost and management accounting.", ["intermediate", "graduation", "post-graduation"], [
    ["financial-accounting", "Financial Accounting"],
    ["cost-accounting", "Cost Accounting"],
    ["management-accounting", "Management Accounting"],
    ["auditing", "Auditing"],
    ["taxation", "Taxation"],
    ["bookkeeping", "Bookkeeping"],
  ]),
  s("finance", "Finance", "Corporate finance, investment and markets.", ["intermediate", "graduation", "post-graduation"], [
    ["corporate-finance", "Corporate Finance"],
    ["investment", "Investment"],
    ["financial-markets", "Financial Markets"],
    ["financial-management", "Financial Management"],
    ["risk-management", "Risk Management"],
  ]),
  s("business-administration", "Business Administration", "Management, marketing and business operations.", ["intermediate", "graduation", "post-graduation"], [
    ["management", "Management"],
    ["marketing", "Marketing"],
    ["organizational-behaviour", "Organizational Behaviour"],
    ["human-resource-management", "Human Resource Management"],
    ["business-ethics", "Business Ethics"],
    ["entrepreneurship", "Entrepreneurship"],
  ]),
  s("commerce", "Commerce", "Trade, business law and commercial practice.", ["intermediate", "graduation", "post-graduation"], [
    ["trade-commerce", "Trade & Commerce"],
    ["business-law", "Business Law"],
    ["commercial-geography", "Commercial Geography"],
    ["business-communication", "Business Communication"],
  ]),
  s("banking", "Banking", "Banking operations, systems and regulations.", ["intermediate", "graduation", "post-graduation"], [
    ["banking-operations", "Banking Operations"],
    ["islamic-banking", "Islamic Banking"],
    ["central-banking", "Central Banking"],
    ["banking-law", "Banking Law"],
  ]),

  /* Engineering */
  s("electrical-engineering", "Electrical Engineering", "Circuits, machines, power and control.", ["intermediate", "graduation", "post-graduation"], [
    ["circuit-theory", "Circuit Theory"],
    ["electrical-machines", "Electrical Machines"],
    ["power-systems", "Power Systems"],
    ["control-systems", "Control Systems"],
    ["measurements-instruments", "Measurements & Instruments"],
  ]),
  s("mechanical-engineering", "Mechanical Engineering", "Thermodynamics, mechanics and machines.", ["intermediate", "graduation", "post-graduation"], [
    ["engineering-mechanics", "Engineering Mechanics"],
    ["thermodynamics-me", "Thermodynamics"],
    ["fluid-mechanics", "Fluid Mechanics"],
    ["machine-design", "Machine Design"],
    ["manufacturing", "Manufacturing Processes"],
  ]),
  s("civil-engineering", "Civil Engineering", "Structures, materials and surveying.", ["intermediate", "graduation", "post-graduation"], [
    ["structural-analysis", "Structural Analysis"],
    ["concrete-technology", "Concrete Technology"],
    ["surveying", "Surveying"],
    ["geotechnical", "Geotechnical Engineering"],
    ["transportation", "Transportation Engineering"],
  ]),
  s("electronics", "Electronics", "Electronic devices, circuits and communication.", ["intermediate", "graduation", "post-graduation"], [
    ["semiconductor-devices", "Semiconductor Devices"],
    ["analog-electronics", "Analog Electronics"],
    ["digital-electronics", "Digital Electronics"],
    ["communication-systems", "Communication Systems"],
  ]),
  s("engineering-fundamentals", "Engineering Fundamentals", "Core engineering basics for entry tests.", ["intermediate", "graduation"], [
    ["engineering-drawing", "Engineering Drawing"],
    ["engineering-materials", "Engineering Materials"],
    ["basic-mechanics", "Basic Mechanics"],
    ["engineering-ethics", "Engineering Ethics"],
  ]),

  /* Law */
  s("law", "Law", "Legal systems, jurisprudence and constitutional law.", ["intermediate", "graduation", "post-graduation"], [
    ["jurisprudence", "Jurisprudence"],
    ["constitutional-law", "Constitutional Law"],
    ["criminal-law", "Criminal Law"],
    ["civil-law", "Civil Law"],
    ["islamic-law", "Islamic Law"],
    ["international-law-law", "International Law"],
    ["legal-reasoning", "Legal Reasoning"],
  ]),

  /* General knowledge & current affairs */
  s("general-knowledge", "General Knowledge", "World and Pakistan general knowledge.", ALL, [
    ["books-authors", "Books & Authors"],
    ["sports", "Sports"],
    ["international-organizations", "International Organizations"],
    ["world-geography", "World Geography"],
    ["national-symbols", "National Symbols"],
    ["inventions-discoveries", "Inventions & Discoveries"],
    ["awards-honours", "Awards & Honours"],
    ["capitals-currencies", "Capitals & Currencies"],
    ["famous-personalities", "Famous Personalities"],
    ["important-days", "Important Days"],
  ]),
  s("current-affairs", "Current Affairs", "Contemporary national and international affairs.", ["intermediate", "graduation", "post-graduation"], [
    ["international-relations", "International Relations"],
    ["economy", "Economy"],
    ["international-organizations", "International Organizations"],
    ["environment", "Environment"],
    ["sports-affairs", "Sports"],
    ["science-technology", "Science & Technology"],
    ["national-affairs", "National Affairs"],
  ]),
  s("current-affairs-competitive", "Current Affairs (Competitive)", "Current affairs tailored for CSS/PMS and competitive exams.", ["graduation", "post-graduation"], [
    ["ca-international", "International Affairs"],
    ["ca-economy", "Economic Affairs"],
    ["ca-pakistan", "Pakistan Affairs"],
    ["ca-organizations", "Organizations & Summits"],
    ["ca-science", "Science & Technology"],
  ]),
  s("tourism", "Tourism & Hospitality", "Tourism, travel and hospitality management.", ["intermediate", "graduation", "post-graduation"], [
    ["tourism-management", "Tourism Management"],
    ["hospitality", "Hospitality"],
    ["travel-geography", "Travel Geography"],
  ]),
  s("research-methods", "Research Methods", "Research design, methodology and academic writing.", ["graduation", "post-graduation", "doctorate"], [
    ["research-design", "Research Design"],
    ["research-methodology", "Research Methodology"],
    ["data-collection", "Data Collection"],
    ["academic-writing", "Academic Writing"],
    ["referencing", "Referencing & Citation"],
  ]),
  s("jurisprudence", "Jurisprudence & Legal Theory", "Legal theory, philosophy of law and legal systems.", ["intermediate", "graduation", "post-graduation"], [
    ["legal-theory", "Legal Theory"],
    ["natural-law", "Natural Law"],
    ["positive-law", "Positive Law"],
    ["legal-concepts", "Legal Concepts"],
  ]),
  s("marketing", "Marketing", "Marketing principles, consumer behaviour and branding.", ["intermediate", "graduation", "post-graduation"], [
    ["marketing-principles", "Marketing Principles"],
    ["consumer-behaviour", "Consumer Behaviour"],
    ["branding", "Branding"],
    ["digital-marketing", "Digital Marketing"],
    ["market-research", "Market Research"],
  ]),
];

/**
 * Attach the sub-subject layer declared in `sub-subjects.ts`. Grouping is data
 * driven: a topic listed under a sub-subject is reparented, everything else
 * stays directly under its subject. Unknown slugs are ignored so the catalogue
 * remains the single source of truth.
 */
function withSubSubjects(subjects: SeedSubject[]): SeedSubject[] {
  const groupsBySubject = new Map<string, typeof SUB_SUBJECTS>();
  for (const group of SUB_SUBJECTS) {
    const list = groupsBySubject.get(group.subject) ?? [];
    list.push(group);
    groupsBySubject.set(group.subject, list);
  }

  return subjects.map((subject) => {
    const groups = groupsBySubject.get(subject.slug);
    if (!groups?.length) return subject;

    const topicSlugs = new Set(subject.topics.map((t) => t.slug));
    const subSubjects = groups
      .filter((g) => g.topics.some((t) => topicSlugs.has(t)))
      .map((g) => ({ slug: g.slug, name: g.name, description: g.description }));

    const placement = new Map<string, string>();
    for (const group of groups) {
      for (const topic of group.topics) {
        if (topicSlugs.has(topic)) placement.set(topic, group.slug);
      }
    }

    return {
      ...subject,
      subSubjects,
      topics: subject.topics.map((topic) => {
        const subSubject = placement.get(topic.slug);
        return subSubject ? { ...topic, subSubject } : topic;
      }),
    };
  });
}

export const SUBJECTS: SeedSubject[] = withSubSubjects(RAW_SUBJECTS);
