import { buildOptions, makeRandom } from "./core";
import type { GeneratorContext, SeedQuestion } from "./core";

interface Fact {
  subject: string;
  topic: string;
  stem: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  tags?: string[];
  /** Optional explicit source/reference for a specific fact. */
  reference?: string;
}

/**
 * Curated fact bank for subjects that cannot be generated algorithmically.
 * Each entry supplies one correct answer and three plausible distractors.
 */
const FACTS: Fact[] = [
  // ----- General Science: Biology -----------------------------------------
  { subject: "general-science", topic: "biology", stem: "Which organelle is known as the powerhouse of the cell?", correct: "Mitochondria", wrong: ["Nucleus", "Ribosome", "Golgi apparatus"], explanation: "Mitochondria produce ATP through cellular respiration, supplying energy to the cell.", tags: ["cell", "biology"] },
  { subject: "general-science", topic: "biology", stem: "The process by which green plants make their own food is called:", correct: "Photosynthesis", wrong: ["Respiration", "Transpiration", "Digestion"], explanation: "Plants convert light energy, carbon dioxide and water into glucose during photosynthesis.", tags: ["plants", "photosynthesis"] },
  { subject: "general-science", topic: "biology", stem: "Which gas do plants absorb from the atmosphere during photosynthesis?", correct: "Carbon dioxide", wrong: ["Oxygen", "Nitrogen", "Hydrogen"], explanation: "Plants take in carbon dioxide and release oxygen during photosynthesis.", tags: ["photosynthesis", "gases"] },
  { subject: "general-science", topic: "biology", stem: "What is the basic structural and functional unit of life?", correct: "Cell", wrong: ["Tissue", "Organ", "Molecule"], explanation: "The cell is the smallest unit that can carry out all life processes.", tags: ["cell"] },
  { subject: "general-science", topic: "biology", stem: "Which blood cells are primarily responsible for fighting infection?", correct: "White blood cells", wrong: ["Red blood cells", "Platelets", "Plasma"], explanation: "White blood cells (leukocytes) defend the body against pathogens.", tags: ["blood", "immunity"] },
  { subject: "general-science", topic: "biology", stem: "The green pigment in plants that absorbs light is:", correct: "Chlorophyll", wrong: ["Haemoglobin", "Melanin", "Carotene"], explanation: "Chlorophyll absorbs light energy for photosynthesis.", tags: ["plants", "pigment"] },
  { subject: "general-science", topic: "biology", stem: "How many chambers does the human heart have?", correct: "Four", wrong: ["Two", "Three", "Five"], explanation: "The human heart has two atria and two ventricles — four chambers in total.", tags: ["heart", "anatomy"] },
  { subject: "general-science", topic: "biology", stem: "Which part of the plant absorbs water and minerals from the soil?", correct: "Roots", wrong: ["Leaves", "Stem", "Flowers"], explanation: "Roots anchor the plant and absorb water and dissolved minerals.", tags: ["plants", "roots"] },
  { subject: "general-science", topic: "biology", stem: "DNA stands for:", correct: "Deoxyribonucleic acid", wrong: ["Diribonucleic acid", "Deoxyribose nucleus", "Dinucleic acid"], explanation: "DNA is deoxyribonucleic acid, the molecule that stores genetic information.", tags: ["genetics"] },
  { subject: "general-science", topic: "biology", stem: "Which vitamin is produced in human skin on exposure to sunlight?", correct: "Vitamin D", wrong: ["Vitamin A", "Vitamin C", "Vitamin K"], explanation: "Skin synthesises vitamin D when exposed to ultraviolet B light.", tags: ["vitamins", "skin"] },

  // ----- General Science: Physics -----------------------------------------
  { subject: "general-science", topic: "physics", stem: "What is the SI unit of force?", correct: "Newton", wrong: ["Joule", "Watt", "Pascal"], explanation: "Force is measured in newtons (N), where 1 N = 1 kg·m/s².", tags: ["units", "force"] },
  { subject: "general-science", topic: "physics", stem: "The speed of light in a vacuum is approximately:", correct: "3 × 10⁸ m/s", wrong: ["3 × 10⁶ m/s", "3 × 10⁵ m/s", "3 × 10¹⁰ m/s"], explanation: "Light travels at about 299,792,458 m/s, commonly rounded to 3 × 10⁸ m/s.", tags: ["light", "constants"] },
  { subject: "general-science", topic: "physics", stem: "Which law states that for every action there is an equal and opposite reaction?", correct: "Newton's third law", wrong: ["Newton's first law", "Newton's second law", "Law of gravitation"], explanation: "Newton's third law describes action–reaction pairs.", tags: ["newton", "laws"] },
  { subject: "general-science", topic: "physics", stem: "The SI unit of electric current is:", correct: "Ampere", wrong: ["Volt", "Ohm", "Coulomb"], explanation: "Electric current is measured in amperes (A).", tags: ["units", "electricity"] },
  { subject: "general-science", topic: "physics", stem: "Which instrument measures atmospheric pressure?", correct: "Barometer", wrong: ["Thermometer", "Hygrometer", "Anemometer"], explanation: "A barometer measures atmospheric pressure.", tags: ["instruments", "pressure"] },
  { subject: "general-science", topic: "physics", stem: "Sound cannot travel through:", correct: "A vacuum", wrong: ["Water", "Steel", "Air"], explanation: "Sound needs a medium to travel; it cannot propagate through a vacuum.", tags: ["sound"] },
  { subject: "general-science", topic: "physics", stem: "The energy possessed by a moving body is called:", correct: "Kinetic energy", wrong: ["Potential energy", "Chemical energy", "Nuclear energy"], explanation: "Kinetic energy is the energy of motion: KE = ½mv².", tags: ["energy"] },
  { subject: "general-science", topic: "physics", stem: "Which mirror is used in vehicle rear-view mirrors?", correct: "Convex mirror", wrong: ["Concave mirror", "Plane mirror", "Cylindrical mirror"], explanation: "Convex mirrors give a wider field of view, making them ideal for rear-view mirrors.", tags: ["optics", "mirrors"] },

  // ----- General Science: Chemistry ---------------------------------------
  { subject: "general-science", topic: "chemistry", stem: "What is the chemical symbol for gold?", correct: "Au", wrong: ["Ag", "Gd", "Go"], explanation: "Gold's symbol Au comes from the Latin word 'aurum'.", tags: ["elements", "symbols"] },
  { subject: "general-science", topic: "chemistry", stem: "Water is composed of hydrogen and:", correct: "Oxygen", wrong: ["Carbon", "Nitrogen", "Chlorine"], explanation: "Water (H₂O) contains two hydrogen atoms and one oxygen atom.", tags: ["water", "compounds"] },
  { subject: "general-science", topic: "chemistry", stem: "The pH value of a neutral solution is:", correct: "7", wrong: ["0", "14", "1"], explanation: "A neutral solution such as pure water has a pH of 7 at 25 °C.", tags: ["ph", "acids"] },
  { subject: "general-science", topic: "chemistry", stem: "Which gas is most abundant in Earth's atmosphere?", correct: "Nitrogen", wrong: ["Oxygen", "Carbon dioxide", "Argon"], explanation: "Nitrogen makes up about 78% of the atmosphere by volume.", tags: ["atmosphere", "gases"] },
  { subject: "general-science", topic: "chemistry", stem: "The chemical formula of common table salt is:", correct: "NaCl", wrong: ["KCl", "NaHCO₃", "CaCO₃"], explanation: "Table salt is sodium chloride (NaCl).", tags: ["compounds", "salt"] },
  { subject: "general-science", topic: "chemistry", stem: "Which element has the atomic number 1?", correct: "Hydrogen", wrong: ["Helium", "Carbon", "Oxygen"], explanation: "Hydrogen has one proton, giving it atomic number 1.", tags: ["elements", "atomic-number"] },
  { subject: "general-science", topic: "chemistry", stem: "Rusting of iron is an example of:", correct: "Oxidation", wrong: ["Reduction", "Sublimation", "Neutralisation"], explanation: "Rust forms when iron reacts with oxygen and water — an oxidation reaction.", tags: ["reactions", "oxidation"] },
  { subject: "general-science", topic: "chemistry", stem: "Which acid is present in the human stomach?", correct: "Hydrochloric acid", wrong: ["Sulphuric acid", "Nitric acid", "Acetic acid"], explanation: "The stomach secretes hydrochloric acid (HCl) to digest food.", tags: ["acids", "human-body"] },

  // ----- General Science: Human Body --------------------------------------
  { subject: "general-science", topic: "human-body", stem: "How many bones are there in the adult human body?", correct: "206", wrong: ["186", "226", "246"], explanation: "An adult human skeleton has 206 bones.", tags: ["skeleton", "anatomy"] },
  { subject: "general-science", topic: "human-body", stem: "Which is the largest organ of the human body?", correct: "Skin", wrong: ["Liver", "Brain", "Lungs"], explanation: "The skin is the largest organ by surface area and weight.", tags: ["organs", "skin"] },
  { subject: "general-science", topic: "human-body", stem: "Which organ produces insulin in the human body?", correct: "Pancreas", wrong: ["Liver", "Kidney", "Stomach"], explanation: "The pancreas produces insulin to regulate blood glucose.", tags: ["organs", "hormones"] },
  { subject: "general-science", topic: "human-body", stem: "The normal resting heart rate for an adult is about:", correct: "60–100 beats per minute", wrong: ["20–40 beats per minute", "120–160 beats per minute", "180–200 beats per minute"], explanation: "A normal adult resting heart rate is roughly 60–100 bpm.", tags: ["heart", "health"] },
  { subject: "general-science", topic: "human-body", stem: "Which organ is responsible for filtering blood and producing urine?", correct: "Kidney", wrong: ["Liver", "Spleen", "Lungs"], explanation: "The kidneys filter waste from blood to produce urine.", tags: ["organs", "kidney"] },
  { subject: "general-science", topic: "human-body", stem: "How many teeth does a normal adult human have?", correct: "32", wrong: ["28", "30", "36"], explanation: "Adults normally have 32 permanent teeth, including wisdom teeth.", tags: ["teeth", "anatomy"] },
  { subject: "general-science", topic: "human-body", stem: "Which part of the brain controls balance and coordination?", correct: "Cerebellum", wrong: ["Cerebrum", "Medulla", "Hypothalamus"], explanation: "The cerebellum coordinates movement, balance and posture.", tags: ["brain", "anatomy"] },
  { subject: "general-science", topic: "human-body", stem: "Red blood cells are produced mainly in the:", correct: "Bone marrow", wrong: ["Liver", "Spleen", "Kidney"], explanation: "Bone marrow is the primary site of red blood cell production.", tags: ["blood", "bone-marrow"] },

  // ----- Computer Science -------------------------------------------------
  { subject: "computer", topic: "computer-fundamentals", stem: "What does CPU stand for?", correct: "Central Processing Unit", wrong: ["Central Program Unit", "Computer Processing Unit", "Central Processor Utility"], explanation: "The CPU is the central processing unit that executes instructions.", tags: ["hardware", "cpu"] },
  { subject: "computer", topic: "computer-fundamentals", stem: "Which of the following is a volatile memory?", correct: "RAM", wrong: ["ROM", "Hard disk", "SSD"], explanation: "RAM loses its contents when power is removed, so it is volatile.", tags: ["memory", "ram"] },
  { subject: "computer", topic: "computer-fundamentals", stem: "1 byte is equal to how many bits?", correct: "8", wrong: ["4", "16", "32"], explanation: "One byte consists of 8 bits.", tags: ["bits", "units"] },
  { subject: "computer", topic: "computer-fundamentals", stem: "Which number system does a computer use internally?", correct: "Binary", wrong: ["Decimal", "Octal", "Hexadecimal"], explanation: "Computers operate on binary (base-2) logic, using 0 and 1.", tags: ["number-system", "binary"] },
  { subject: "computer", topic: "computer-fundamentals", stem: "What does GUI stand for?", correct: "Graphical User Interface", wrong: ["General User Interface", "Graphical Utility Integration", "Global User Index"], explanation: "A GUI lets users interact with a computer through graphical elements.", tags: ["interface", "gui"] },
  { subject: "computer", topic: "computer-fundamentals", stem: "Which of the following is an operating system?", correct: "Linux", wrong: ["Oracle", "Photoshop", "Chrome"], explanation: "Linux is an operating system; the others are applications or a database.", tags: ["software", "os"] },
  { subject: "computer", topic: "hardware", stem: "Which device is used to input data into a computer by typing?", correct: "Keyboard", wrong: ["Monitor", "Printer", "Speaker"], explanation: "A keyboard is an input device used for typing text.", tags: ["input", "keyboard"] },
  { subject: "computer", topic: "hardware", stem: "Which component supplies power to the computer?", correct: "SMPS", wrong: ["CPU", "GPU", "RAM"], explanation: "The Switched Mode Power Supply (SMPS) converts AC to the DC voltages the PC needs.", tags: ["hardware", "power"] },
  { subject: "computer", topic: "hardware", stem: "Which of these is an output device?", correct: "Monitor", wrong: ["Mouse", "Keyboard", "Scanner"], explanation: "A monitor displays output; the others are input devices.", tags: ["output", "monitor"] },
  { subject: "computer", topic: "hardware", stem: "What is the main circuit board of a computer called?", correct: "Motherboard", wrong: ["Daughterboard", "Expansion card", "Backplane"], explanation: "The motherboard connects and allows communication between all components.", tags: ["hardware", "motherboard"] },
  { subject: "computer", topic: "software", stem: "Which of the following is system software?", correct: "Operating system", wrong: ["Word processor", "Spreadsheet", "Web browser"], explanation: "An operating system is system software; the others are application software.", tags: ["software", "os"] },
  { subject: "computer", topic: "software", stem: "What is the file extension of a Microsoft Word document?", correct: ".docx", wrong: [".xlsx", ".pptx", ".txt"], explanation: ".docx is the modern Word document format.", tags: ["file-formats", "ms-office"] },
  { subject: "computer", topic: "software", stem: "Which software is used to create presentations?", correct: "PowerPoint", wrong: ["Excel", "Word", "Access"], explanation: "Microsoft PowerPoint is presentation software.", tags: ["ms-office", "presentation"] },
  { subject: "computer", topic: "software", stem: "What does an antivirus program do?", correct: "Detects and removes malicious software", wrong: ["Speeds up the CPU", "Increases RAM", "Compresses files"], explanation: "Antivirus software detects, blocks and removes malware.", tags: ["security", "software"] },
  { subject: "computer", topic: "networking", stem: "What does WWW stand for?", correct: "World Wide Web", wrong: ["World Wide Webinar", "Wide World Web", "Web World Wide"], explanation: "WWW is the World Wide Web, a system of interlinked hypertext documents.", tags: ["internet", "www"] },
  { subject: "computer", topic: "networking", stem: "Which protocol is used to transfer web pages?", correct: "HTTP", wrong: ["FTP", "SMTP", "POP3"], explanation: "HTTP (HyperText Transfer Protocol) transfers web pages.", tags: ["protocols", "http"] },
  { subject: "computer", topic: "networking", stem: "What does LAN stand for?", correct: "Local Area Network", wrong: ["Long Area Network", "Large Access Network", "Linked Area Node"], explanation: "A LAN is a network covering a small geographic area.", tags: ["network", "lan"] },
  { subject: "computer", topic: "networking", stem: "Which device connects multiple networks together?", correct: "Router", wrong: ["Switch", "Hub", "Repeater"], explanation: "A router forwards data between different networks.", tags: ["network", "router"] },
  { subject: "computer", topic: "networking", stem: "An email address must contain which symbol?", correct: "@", wrong: ["#", "$", "&"], explanation: "Every email address uses the '@' symbol to separate the user name and domain.", tags: ["email", "internet"] },
  { subject: "computer", topic: "ms-office", stem: "In Microsoft Excel, which function adds a range of numbers?", correct: "SUM", wrong: ["ADD", "TOTAL", "PLUS"], explanation: "The SUM function adds the numeric values in a range.", tags: ["excel", "functions"] },
  { subject: "computer", topic: "ms-office", stem: "Which shortcut key is used to copy in most applications?", correct: "Ctrl + C", wrong: ["Ctrl + V", "Ctrl + X", "Ctrl + Z"], explanation: "Ctrl + C copies the selected content to the clipboard.", tags: ["shortcuts", "ms-office"] },
  { subject: "computer", topic: "ms-office", stem: "In Microsoft Word, which shortcut key saves a document?", correct: "Ctrl + S", wrong: ["Ctrl + P", "Ctrl + O", "Ctrl + N"], explanation: "Ctrl + S saves the current document.", tags: ["shortcuts", "word"] },
  { subject: "computer", topic: "ms-office", stem: "Which file extension is used for Microsoft Excel workbooks?", correct: ".xlsx", wrong: [".docx", ".pptx", ".pdf"], explanation: ".xlsx is the modern Excel workbook format.", tags: ["excel", "file-formats"] },

  // ----- Pakistan Studies -------------------------------------------------
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "In which year did Pakistan gain independence?", correct: "1947", wrong: ["1945", "1946", "1948"], explanation: "Pakistan became an independent state on 14 August 1947.", tags: ["independence", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "Who is known as the founder of Pakistan?", correct: "Quaid-e-Azam Muhammad Ali Jinnah", wrong: ["Allama Iqbal", "Liaquat Ali Khan", "Sir Syed Ahmad Khan"], explanation: "Muhammad Ali Jinnah led the movement that created Pakistan.", tags: ["founder", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "The Lahore Resolution (Pakistan Resolution) was passed in which year?", correct: "1940", wrong: ["1935", "1939", "1942"], explanation: "The Lahore Resolution demanding separate states for Muslims was passed in 1940.", tags: ["lahore-resolution", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "Allama Iqbal delivered his famous Allahabad Address in:", correct: "1930", wrong: ["1928", "1932", "1934"], explanation: "Iqbal's 1930 Allahabad Address envisioned a separate Muslim state.", tags: ["iqbal", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "Who presented the Lahore Resolution in 1940?", correct: "A. K. Fazlul Huq", wrong: ["Muhammad Ali Jinnah", "Liaquat Ali Khan", "Allama Iqbal"], explanation: "A. K. Fazlul Huq moved the Lahore Resolution at the 1940 session.", tags: ["lahore-resolution", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "The All India Muslim League was founded in which year?", correct: "1906", wrong: ["1885", "1911", "1916"], explanation: "The All India Muslim League was founded in Dhaka in 1906.", tags: ["muslim-league", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "The partition of Bengal took place in which year?", correct: "1905", wrong: ["1900", "1908", "1911"], explanation: "Bengal was partitioned in 1905 and reunited in 1911.", tags: ["bengal", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-movement", stem: "Who wrote the famous book 'Pakistan: The Fatherland of the Pak Nation'?", correct: "Chaudhry Rahmat Ali", wrong: ["Allama Iqbal", "Muhammad Ali Jinnah", "Sir Syed Ahmad Khan"], explanation: "Chaudhry Rahmat Ali coined the name 'Pakistan'.", tags: ["pakistan-name", "history"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "What is the capital city of Pakistan?", correct: "Islamabad", wrong: ["Karachi", "Lahore", "Peshawar"], explanation: "Islamabad became the capital of Pakistan in the 1960s.", tags: ["capital", "geography"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "Which is the largest city of Pakistan by population?", correct: "Karachi", wrong: ["Lahore", "Faisalabad", "Islamabad"], explanation: "Karachi is Pakistan's largest city by population.", tags: ["cities", "geography"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "What is the highest mountain peak in Pakistan?", correct: "K2", wrong: ["Nanga Parbat", "Rakaposhi", "Tirich Mir"], explanation: "K2 (Godwin-Austen) at 8,611 m is the highest peak in Pakistan.", tags: ["mountains", "geography"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "Which is the longest river in Pakistan?", correct: "Indus", wrong: ["Jhelum", "Chenab", "Ravi"], explanation: "The Indus is Pakistan's longest river, about 3,180 km long.", tags: ["rivers", "geography"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "How many provinces does Pakistan have?", correct: "Four", wrong: ["Three", "Five", "Six"], explanation: "Pakistan has four provinces: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.", tags: ["provinces", "geography"] },
  { subject: "pakistan-studies", topic: "pakistan-geography", stem: "Which province of Pakistan has the largest area?", correct: "Balochistan", wrong: ["Punjab", "Sindh", "Khyber Pakhtunkhwa"], explanation: "Balochistan is the largest province of Pakistan by area.", tags: ["provinces", "geography"] },
  { subject: "pakistan-studies", topic: "constitution", stem: "The current constitution of Pakistan was adopted in which year?", correct: "1973", wrong: ["1956", "1962", "1985"], explanation: "The Constitution of Pakistan was adopted in 1973.", tags: ["constitution", "history"] },
  { subject: "pakistan-studies", topic: "constitution", stem: "Who is the head of state of Pakistan?", correct: "President", wrong: ["Prime Minister", "Chief Justice", "Speaker"], explanation: "The President is the ceremonial head of state of Pakistan.", tags: ["government", "constitution"] },
  { subject: "pakistan-studies", topic: "constitution", stem: "How many members are there in the Senate of Pakistan?", correct: "96", wrong: ["100", "104", "342"], explanation: "The Senate of Pakistan has 96 members.", tags: ["senate", "parliament"] },
  { subject: "pakistan-studies", topic: "constitution", stem: "Pakistan's national language is:", correct: "Urdu", wrong: ["English", "Punjabi", "Sindhi"], explanation: "Urdu is the national language of Pakistan.", tags: ["language", "national"] },
  { subject: "pakistan-studies", topic: "national-symbols", stem: "What is the national animal of Pakistan?", correct: "Markhor", wrong: ["Lion", "Tiger", "Deer"], explanation: "The Markhor is Pakistan's national animal.", tags: ["national", "symbols"] },
  { subject: "pakistan-studies", topic: "national-symbols", stem: "What is the national flower of Pakistan?", correct: "Jasmine", wrong: ["Rose", "Sunflower", "Tulip"], explanation: "Jasmine (Chambeli) is Pakistan's national flower.", tags: ["national", "symbols"] },
  { subject: "pakistan-studies", topic: "national-symbols", stem: "What is the national bird of Pakistan?", correct: "Chukar", wrong: ["Peacock", "Eagle", "Parrot"], explanation: "The Chukar partridge is the national bird of Pakistan.", tags: ["national", "symbols"] },
  { subject: "pakistan-studies", topic: "national-symbols", stem: "How many colours are there in the national flag of Pakistan?", correct: "Two", wrong: ["Three", "Four", "One"], explanation: "The flag has a green field with a white crescent and star, plus a white stripe.", tags: ["flag", "symbols"] },

  // ----- Islamiat ---------------------------------------------------------
  { subject: "islamiat", topic: "quran", stem: "How many surahs are there in the Holy Quran?", correct: "114", wrong: ["112", "116", "120"], explanation: "The Holy Quran contains 114 surahs.", tags: ["quran", "surahs"] },
  { subject: "islamiat", topic: "quran", stem: "Which is the longest surah of the Holy Quran?", correct: "Al-Baqarah", wrong: ["Al-Imran", "An-Nisa", "Al-Kahf"], explanation: "Surah Al-Baqarah is the longest surah of the Quran.", tags: ["quran", "surahs"] },
  { subject: "islamiat", topic: "quran", stem: "Which is the first surah of the Holy Quran?", correct: "Al-Fatihah", wrong: ["Al-Baqarah", "An-Nas", "Al-Ikhlas"], explanation: "Surah Al-Fatihah is the opening chapter of the Quran.", tags: ["quran", "surahs"] },
  { subject: "islamiat", topic: "quran", stem: "In which language was the Holy Quran revealed?", correct: "Arabic", wrong: ["Persian", "Urdu", "Hebrew"], explanation: "The Quran was revealed in Arabic.", tags: ["quran", "language"] },
  { subject: "islamiat", topic: "quran", stem: "How many paras (juz) are there in the Holy Quran?", correct: "30", wrong: ["20", "25", "40"], explanation: "The Quran is divided into 30 equal parts called paras or juz.", tags: ["quran", "juz"] },
  { subject: "islamiat", topic: "quran", stem: "Which surah is known as the 'heart of the Quran'?", correct: "Yasin", wrong: ["Al-Fatihah", "Al-Kahf", "Ar-Rahman"], explanation: "Surah Yasin is commonly known as the heart of the Quran.", tags: ["quran", "surahs"] },
  { subject: "islamiat", topic: "seerah", stem: "In which year was the Prophet Muhammad (PBUH) born?", correct: "570 CE", wrong: ["610 CE", "622 CE", "632 CE"], explanation: "The Prophet (PBUH) was born around 570 CE in Makkah.", tags: ["seerah", "history"] },
  { subject: "islamiat", topic: "seerah", stem: "In which city was the Prophet Muhammad (PBUH) born?", correct: "Makkah", wrong: ["Madinah", "Taif", "Jerusalem"], explanation: "The Prophet (PBUH) was born in Makkah.", tags: ["seerah", "makkah"] },
  { subject: "islamiat", topic: "seerah", stem: "The migration (Hijrah) of the Prophet (PBUH) was to which city?", correct: "Madinah", wrong: ["Makkah", "Taif", "Damascus"], explanation: "The Prophet (PBUH) migrated from Makkah to Madinah in 622 CE.", tags: ["hijrah", "seerah"] },
  { subject: "islamiat", topic: "seerah", stem: "What was the name of the Prophet's (PBUH) mother?", correct: "Aminah", wrong: ["Khadijah", "Fatimah", "Halimah"], explanation: "The Prophet's (PBUH) mother was Aminah bint Wahb.", tags: ["seerah", "family"] },
  { subject: "islamiat", topic: "seerah", stem: "Who was the first caliph of Islam?", correct: "Abu Bakr (RA)", wrong: ["Umar (RA)", "Uthman (RA)", "Ali (RA)"], explanation: "Abu Bakr Siddiq (RA) was the first caliph of Islam.", tags: ["caliphs", "history"] },
  { subject: "islamiat", topic: "ibadat", stem: "How many times a day are the obligatory prayers (Salah) performed?", correct: "Five", wrong: ["Three", "Four", "Six"], explanation: "Muslims perform five obligatory prayers daily.", tags: ["salah", "ibadat"] },
  { subject: "islamiat", topic: "ibadat", stem: "Fasting during Ramadan is which pillar of Islam?", correct: "Fourth", wrong: ["Second", "Third", "Fifth"], explanation: "Fasting (Sawm) in Ramadan is the fourth pillar of Islam.", tags: ["fasting", "pillars"] },
  { subject: "islamiat", topic: "ibadat", stem: "What is the name of the pilgrimage to Makkah performed in Dhul-Hijjah?", correct: "Hajj", wrong: ["Umrah", "Ziyarat", "Sadaqah"], explanation: "Hajj is the annual pilgrimage performed in the month of Dhul-Hijjah.", tags: ["hajj", "ibadat"] },
  { subject: "islamiat", topic: "ibadat", stem: "Zakat is obligatory on Muslims who possess wealth above a minimum threshold called:", correct: "Nisab", wrong: ["Fitrana", "Khums", "Sadaqah"], explanation: "Nisab is the minimum wealth threshold at which Zakat becomes due.", tags: ["zakat", "ibadat"] },
  { subject: "islamiat", topic: "ibadat", stem: "In which month do Muslims fast?", correct: "Ramadan", wrong: ["Shawwal", "Rajab", "Muharram"], explanation: "Fasting is obligatory during the month of Ramadan.", tags: ["ramadan", "fasting"] },
  { subject: "islamiat", topic: "islamic-history", stem: "The Battle of Badr took place in which year?", correct: "624 CE (2 AH)", wrong: ["630 CE (8 AH)", "625 CE (3 AH)", "627 CE (5 AH)"], explanation: "The Battle of Badr was fought in 2 AH (624 CE).", tags: ["battles", "history"] },
  { subject: "islamiat", topic: "islamic-history", stem: "Who compiled the Holy Quran into a single book form?", correct: "Abu Bakr (RA)", wrong: ["Umar (RA)", "Uthman (RA)", "Ali (RA)"], explanation: "Abu Bakr (RA) ordered the first compilation of the Quran.", tags: ["quran", "history"] },
  { subject: "islamiat", topic: "islamic-history", stem: "The Kaaba is located in which city?", correct: "Makkah", wrong: ["Madinah", "Jerusalem", "Taif"], explanation: "The Kaaba is in the Masjid al-Haram in Makkah.", tags: ["kaaba", "makkah"] },
  { subject: "islamiat", topic: "islamic-history", stem: "How many battles are mentioned by name in the Holy Quran?", correct: "Badr is the first major battle", wrong: ["Uhud", "Khandaq", "Hunayn"], explanation: "Badr was the first major battle of Islam, mentioned in the Quran.", tags: ["battles", "history"] },

  // ----- General Knowledge -------------------------------------------------
  { subject: "general-knowledge", topic: "world-geography", stem: "Which is the largest ocean in the world?", correct: "Pacific Ocean", wrong: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], explanation: "The Pacific is the largest and deepest ocean.", tags: ["oceans", "geography"] },
  { subject: "general-knowledge", topic: "world-geography", stem: "Which is the largest continent by area?", correct: "Asia", wrong: ["Africa", "Europe", "North America"], explanation: "Asia is the largest continent in both area and population.", tags: ["continents", "geography"] },
  { subject: "general-knowledge", topic: "world-geography", stem: "Which is the longest river in the world?", correct: "Nile", wrong: ["Amazon", "Yangtze", "Mississippi"], explanation: "The Nile is traditionally regarded as the world's longest river.", tags: ["rivers", "geography"] },
  { subject: "general-knowledge", topic: "world-geography", stem: "Which country has the largest population in the world?", correct: "India", wrong: ["China", "United States", "Indonesia"], explanation: "India overtook China as the most populous country in 2023.", tags: ["population", "countries"] },
  { subject: "general-knowledge", topic: "world-geography", stem: "Which is the largest desert in the world?", correct: "Sahara", wrong: ["Gobi", "Thar", "Kalahari"], explanation: "The Sahara is the largest hot desert in the world.", tags: ["deserts", "geography"] },
  { subject: "general-knowledge", topic: "world-geography", stem: "Mount Everest is located in which mountain range?", correct: "Himalayas", wrong: ["Andes", "Rockies", "Alps"], explanation: "Mount Everest lies in the Himalayan range.", tags: ["mountains", "geography"] },
  { subject: "general-knowledge", topic: "inventions-discoveries", stem: "Who invented the telephone?", correct: "Alexander Graham Bell", wrong: ["Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], explanation: "Alexander Graham Bell is credited with inventing the telephone.", tags: ["inventions", "science"] },
  { subject: "general-knowledge", topic: "inventions-discoveries", stem: "Who discovered penicillin?", correct: "Alexander Fleming", wrong: ["Louis Pasteur", "Edward Jenner", "Robert Koch"], explanation: "Alexander Fleming discovered penicillin in 1928.", tags: ["discoveries", "medicine"] },
  { subject: "general-knowledge", topic: "inventions-discoveries", stem: "Who invented the light bulb?", correct: "Thomas Edison", wrong: ["Alexander Bell", "James Watt", "Michael Faraday"], explanation: "Thomas Edison developed the first commercially practical light bulb.", tags: ["inventions", "science"] },
  { subject: "general-knowledge", topic: "inventions-discoveries", stem: "Who formulated the theory of relativity?", correct: "Albert Einstein", wrong: ["Isaac Newton", "Galileo Galilei", "Niels Bohr"], explanation: "Albert Einstein developed the theory of relativity.", tags: ["physics", "scientists"] },
  { subject: "general-knowledge", topic: "inventions-discoveries", stem: "Who is credited with the law of gravitation?", correct: "Isaac Newton", wrong: ["Albert Einstein", "Kepler", "Copernicus"], explanation: "Isaac Newton formulated the universal law of gravitation.", tags: ["physics", "scientists"] },
  { subject: "general-knowledge", topic: "sports", stem: "How many players are there in a football (soccer) team on the field?", correct: "11", wrong: ["9", "10", "12"], explanation: "Each football team fields 11 players.", tags: ["football", "sports"] },
  { subject: "general-knowledge", topic: "sports", stem: "How often are the Olympic Games held?", correct: "Every four years", wrong: ["Every two years", "Every three years", "Every five years"], explanation: "The Summer and Winter Olympics are each held every four years.", tags: ["olympics", "sports"] },
  { subject: "general-knowledge", topic: "sports", stem: "In cricket, how many players are there in a team?", correct: "11", wrong: ["9", "10", "12"], explanation: "A cricket team has 11 players.", tags: ["cricket", "sports"] },
  { subject: "general-knowledge", topic: "sports", stem: "Which country hosted the 2022 FIFA World Cup?", correct: "Qatar", wrong: ["Russia", "Brazil", "South Africa"], explanation: "Qatar hosted the 2022 FIFA World Cup.", tags: ["football", "world-cup"] },
  { subject: "general-knowledge", topic: "sports", stem: "The Olympic Games originated in which country?", correct: "Greece", wrong: ["Italy", "France", "Egypt"], explanation: "The ancient Olympic Games originated in Greece.", tags: ["olympics", "history"] },
  { subject: "general-knowledge", topic: "books-authors", stem: "Who wrote the play 'Romeo and Juliet'?", correct: "William Shakespeare", wrong: ["Charles Dickens", "John Keats", "Jane Austen"], explanation: "William Shakespeare wrote 'Romeo and Juliet'.", tags: ["literature", "authors"] },
  { subject: "general-knowledge", topic: "books-authors", stem: "Who wrote the novel 'Pride and Prejudice'?", correct: "Jane Austen", wrong: ["Emily Bronte", "Virginia Woolf", "Charlotte Bronte"], explanation: "Jane Austen wrote 'Pride and Prejudice'.", tags: ["literature", "authors"] },
  { subject: "general-knowledge", topic: "books-authors", stem: "Who is the author of 'The Discovery of India'?", correct: "Jawaharlal Nehru", wrong: ["Mahatma Gandhi", "Rabindranath Tagore", "S. Radhakrishnan"], explanation: "Jawaharlal Nehru wrote 'The Discovery of India'.", tags: ["literature", "authors"] },
  { subject: "general-knowledge", topic: "books-authors", stem: "Who wrote 'Shahnameh'?", correct: "Ferdowsi", wrong: ["Rumi", "Hafiz", "Saadi"], explanation: "Ferdowsi wrote the Persian epic 'Shahnameh'.", tags: ["literature", "authors"] },

  // ----- Current Affairs ---------------------------------------------------
  { subject: "current-affairs", topic: "international-organizations", stem: "Where is the headquarters of the United Nations located?", correct: "New York", wrong: ["Geneva", "Paris", "Vienna"], explanation: "The UN headquarters is in New York City.", tags: ["un", "organizations"] },
  { subject: "current-affairs", topic: "international-organizations", stem: "How many permanent members are there in the UN Security Council?", correct: "5", wrong: ["7", "10", "15"], explanation: "The UN Security Council has five permanent members with veto power.", tags: ["un", "security-council"] },
  { subject: "current-affairs", topic: "international-organizations", stem: "The headquarters of the World Health Organization (WHO) is in:", correct: "Geneva", wrong: ["New York", "Paris", "Rome"], explanation: "WHO is headquartered in Geneva, Switzerland.", tags: ["who", "organizations"] },
  { subject: "current-affairs", topic: "international-organizations", stem: "The IMF stands for:", correct: "International Monetary Fund", wrong: ["International Management Fund", "International Money Federation", "International Market Fund"], explanation: "IMF stands for International Monetary Fund.", tags: ["imf", "organizations"] },
  { subject: "current-affairs", topic: "international-organizations", stem: "SAARC stands for:", correct: "South Asian Association for Regional Cooperation", wrong: ["South Asian Alliance for Regional Commerce", "Southern Asian Association for Regional Cooperation", "South Atlantic Association for Regional Cooperation"], explanation: "SAARC is the South Asian Association for Regional Cooperation.", tags: ["saarc", "organizations"] },
  { subject: "current-affairs", topic: "international-organizations", stem: "In which year was the United Nations founded?", correct: "1945", wrong: ["1919", "1939", "1950"], explanation: "The United Nations was founded in 1945.", tags: ["un", "history"] },
  { subject: "current-affairs", topic: "international-relations", stem: "The term 'Cold War' refers to tension primarily between:", correct: "The United States and the Soviet Union", wrong: ["Britain and Germany", "China and Japan", "India and Pakistan"], explanation: "The Cold War was a period of geopolitical tension between the US and the USSR.", tags: ["cold-war", "history"] },
  { subject: "current-affairs", topic: "international-relations", stem: "The Berlin Wall fell in which year?", correct: "1989", wrong: ["1985", "1991", "1993"], explanation: "The Berlin Wall fell in 1989, leading to German reunification.", tags: ["berlin-wall", "history"] },
  { subject: "current-affairs", topic: "economy", stem: "What does GDP stand for?", correct: "Gross Domestic Product", wrong: ["General Domestic Product", "Gross Development Product", "Global Domestic Product"], explanation: "GDP is the Gross Domestic Product — the total value of goods and services produced.", tags: ["economy", "gdp"] },
  { subject: "current-affairs", topic: "economy", stem: "Inflation refers to:", correct: "A general rise in the price level", wrong: ["A fall in the price level", "A rise in unemployment", "A fall in national income"], explanation: "Inflation is a sustained increase in the general price level.", tags: ["economy", "inflation"] },
  { subject: "current-affairs", topic: "economy", stem: "Which organisation publishes the Human Development Index (HDI)?", correct: "UNDP", wrong: ["WHO", "IMF", "World Bank"], explanation: "The UNDP publishes the annual Human Development Index.", tags: ["undp", "development"] },

  // ----- Everyday Science --------------------------------------------------
  { subject: "everyday-science", topic: "units-measurements", stem: "What is the SI unit of length?", correct: "Metre", wrong: ["Kilometre", "Centimetre", "Foot"], explanation: "The metre is the base SI unit of length.", tags: ["units", "si"] },
  { subject: "everyday-science", topic: "units-measurements", stem: "What is the SI unit of mass?", correct: "Kilogram", wrong: ["Gram", "Pound", "Newton"], explanation: "The kilogram is the base SI unit of mass.", tags: ["units", "si"] },
  { subject: "everyday-science", topic: "units-measurements", stem: "How many metres are there in one kilometre?", correct: "1000", wrong: ["100", "10000", "500"], explanation: "One kilometre equals 1000 metres.", tags: ["units", "conversion"] },
  { subject: "everyday-science", topic: "units-measurements", stem: "What is the SI unit of temperature?", correct: "Kelvin", wrong: ["Celsius", "Fahrenheit", "Rankine"], explanation: "The kelvin is the SI base unit of thermodynamic temperature.", tags: ["units", "temperature"] },
  { subject: "everyday-science", topic: "units-measurements", stem: "How many grams are there in one kilogram?", correct: "1000", wrong: ["100", "10", "10000"], explanation: "One kilogram equals 1000 grams.", tags: ["units", "conversion"] },
  { subject: "everyday-science", topic: "units-measurements", stem: "What is the SI unit of time?", correct: "Second", wrong: ["Minute", "Hour", "Day"], explanation: "The second is the base SI unit of time.", tags: ["units", "si"] },
  { subject: "everyday-science", topic: "scientific-instruments", stem: "Which instrument is used to measure temperature?", correct: "Thermometer", wrong: ["Barometer", "Hygrometer", "Ammeter"], explanation: "A thermometer measures temperature.", tags: ["instruments", "temperature"] },
  { subject: "everyday-science", topic: "scientific-instruments", stem: "Which instrument is used to measure electric current?", correct: "Ammeter", wrong: ["Voltmeter", "Barometer", "Odometer"], explanation: "An ammeter measures electric current in amperes.", tags: ["instruments", "electricity"] },
  { subject: "everyday-science", topic: "scientific-instruments", stem: "A microscope is used to:", correct: "View very small objects", wrong: ["View distant objects", "Measure pressure", "Measure rainfall"], explanation: "A microscope magnifies very small objects for detailed viewing.", tags: ["instruments", "microscope"] },
  { subject: "everyday-science", topic: "scientific-instruments", stem: "Which instrument measures rainfall?", correct: "Rain gauge", wrong: ["Barometer", "Anemometer", "Hygrometer"], explanation: "A rain gauge measures the amount of rainfall.", tags: ["instruments", "weather"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Which disease is caused by a deficiency of vitamin C?", correct: "Scurvy", wrong: ["Rickets", "Beriberi", "Anaemia"], explanation: "A lack of vitamin C causes scurvy.", tags: ["health", "vitamins"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Malaria is spread by which vector?", correct: "Mosquito", wrong: ["Housefly", "Tick", "Sandfly"], explanation: "Malaria is transmitted by the female Anopheles mosquito.", tags: ["health", "diseases"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Which vitamin deficiency causes night blindness?", correct: "Vitamin A", wrong: ["Vitamin B", "Vitamin C", "Vitamin D"], explanation: "Vitamin A deficiency impairs vision, especially at night.", tags: ["health", "vitamins"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Diabetes mellitus is caused by a deficiency of:", correct: "Insulin", wrong: ["Adrenaline", "Thyroxine", "Haemoglobin"], explanation: "Diabetes results from insufficient or ineffective insulin.", tags: ["health", "diseases"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Which organ is affected by tuberculosis (TB) most commonly?", correct: "Lungs", wrong: ["Liver", "Kidney", "Heart"], explanation: "TB most commonly affects the lungs.", tags: ["health", "diseases"] },
  { subject: "everyday-science", topic: "diseases-health", stem: "Which of the following is a waterborne disease?", correct: "Cholera", wrong: ["Malaria", "Tuberculosis", "Measles"], explanation: "Cholera spreads through contaminated water.", tags: ["health", "diseases"] },
];

/**
 * Turn the curated fact bank into SeedQuestions, wiring each fact to every exam
 * whose subject list includes the fact's subject.
 */
export function generateFactQuestions(
  ctx: GeneratorContext,
  examSlugsForSubject: Record<string, string[]>,
): SeedQuestion[] {
  const { rand } = makeRandom("facts-v1");
  return FACTS.map((fact, index) => {
    const { options, correct } = buildOptions(fact.correct, fact.wrong, rand);
    return {
      slug: `q-${fact.subject}-${fact.topic}-${index}`.slice(0, 120),
      stem: fact.stem,
      options,
      correct,
      explanation: fact.explanation,
      difficulty: fact.difficulty ?? "MEDIUM",
      subject: fact.subject,
      topic: fact.topic,
      exams: examSlugsForSubject[fact.subject] ?? [],
      educationLevels: ctx.educationLevels,
      tags: fact.tags ?? [],
      staticOrder: 5000 + index,
      status: "PUBLISHED" as const,
      // The fact bank is curated and editorially reviewed, so these questions
      // are sourced (VERIFIED_PRACTICE) rather than raw generated content.
      source: "Curated fact bank",
      reference:
        fact.reference ?? "Editorially reviewed fact bank (curated references)",
      origin: "VERIFIED_PRACTICE" as const,
    };
  });
}
