/**
 * Social sciences, humanities and commerce generators.
 *
 * Curated fact banks cover Pakistan studies, Islamiat, general knowledge,
 * history, geography, civics, economics, political science, sociology,
 * psychology, education, media, law and business. Economics and accounting also
 * include computed items (interest, ratios, depreciation) that scale.
 */

import { makeRandom } from "./core";
import { bankToQuestions, numeric, ri } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

/* ============================ Pakistan Studies ============================ */

const PAKISTAN_FACTS: Fact[] = [
  { q: "In which year did Pakistan gain independence?", a: "1947", d: ["1946", "1948", "1945"], e: "Pakistan became independent on 14 August 1947." },
  { q: "Who is the founder of Pakistan?", a: "Quaid-e-Azam Muhammad Ali Jinnah", d: ["Allama Iqbal", "Liaquat Ali Khan", "Sir Syed Ahmad Khan"], e: "Quaid-e-Azam founded Pakistan." },
  { q: "What is the national language of Pakistan?", a: "Urdu", d: ["English", "Punjabi", "Sindhi"], e: "Urdu is the national language." },
  { q: "What is the national animal of Pakistan?", a: "Markhor", d: ["Lion", "Tiger", "Deer"], e: "The Markhor is the national animal." },
  { q: "What is the national bird of Pakistan?", a: "Chukar", d: ["Eagle", "Peacock", "Falcon"], e: "The Chukar is the national bird." },
  { q: "What is the national tree of Pakistan?", a: "Deodar", d: ["Neem", "Banyan", "Peepal"], e: "The Deodar is the national tree." },
  { q: "What is the national flower of Pakistan?", a: "Jasmine", d: ["Rose", "Tulip", "Sunflower"], e: "Jasmine is the national flower." },
  { q: "Who presented the Lahore Resolution?", a: "A. K. Fazlul Huq", d: ["Muhammad Ali Jinnah", "Liaquat Ali Khan", "Allama Iqbal"], e: "A. K. Fazlul Huq presented the Lahore Resolution in 1940." },
  { q: "In which year was the Lahore Resolution passed?", a: "1940", d: ["1939", "1941", "1942"], e: "The Lahore Resolution was passed in 1940." },
  { q: "What is the capital of Pakistan?", a: "Islamabad", d: ["Karachi", "Lahore", "Rawalpindi"], e: "Islamabad is the capital." },
  { q: "Which is the largest province of Pakistan by area?", a: "Balochistan", d: ["Punjab", "Sindh", "Khyber Pakhtunkhwa"], e: "Balochistan is the largest by area." },
  { q: "Which is the largest city of Pakistan by population?", a: "Karachi", d: ["Lahore", "Islamabad", "Faisalabad"], e: "Karachi is the largest city." },
  { q: "How many provinces does Pakistan have?", a: "4", d: ["3", "5", "6"], e: "Pakistan has four provinces." },
  { q: "What is the highest peak of Pakistan?", a: "K2", d: ["Nanga Parbat", "Rakaposhi", "Tirich Mir"], e: "K2 is the highest peak of Pakistan." },
  { q: "Which river is the longest in Pakistan?", a: "Indus", d: ["Jhelum", "Chenab", "Ravi"], e: "The Indus is the longest river." },
  { q: "What is the national sport of Pakistan?", a: "Field hockey", d: ["Cricket", "Squash", "Kabaddi"], e: "Field hockey is the national sport." },
  { q: "When was the first constitution of Pakistan adopted?", a: "1956", d: ["1947", "1962", "1973"], e: "The first constitution was adopted in 1956." },
  { q: "When was the current constitution of Pakistan adopted?", a: "1973", d: ["1956", "1962", "1985"], e: "The 1973 Constitution is the current one." },
  { q: "Who was the first Prime Minister of Pakistan?", a: "Liaquat Ali Khan", d: ["Muhammad Ali Jinnah", "Khawaja Nazimuddin", "Feroz Khan Noon"], e: "Liaquat Ali Khan was the first Prime Minister." },
  { q: "Who was the first Governor-General of Pakistan?", a: "Quaid-e-Azam Muhammad Ali Jinnah", d: ["Liaquat Ali Khan", "Iskander Mirza", "Khawaja Nazimuddin"], e: "Jinnah was the first Governor-General." },
  { q: "Which city is known as the 'City of Gardens'?", a: "Lahore", d: ["Karachi", "Peshawar", "Quetta"], e: "Lahore is called the City of Gardens." },
  { q: "The Tarbela Dam is built on which river?", a: "Indus", d: ["Jhelum", "Chenab", "Kabul"], e: "Tarbela Dam is on the Indus." },
  { q: "Which pass connects Pakistan with Afghanistan?", a: "Khyber Pass", d: ["Bolan Pass", "Khunjerab Pass", "Lowari Pass"], e: "The Khyber Pass connects Pakistan and Afghanistan." },
  { q: "The Khunjerab Pass connects Pakistan with:", a: "China", d: ["India", "Iran", "Afghanistan"], e: "Khunjerab Pass connects Pakistan with China." },
  { q: "When did Pakistan conduct its first nuclear test?", a: "1998", d: ["1974", "1996", "2000"], e: "Pakistan conducted nuclear tests in May 1998." },
  { q: "Which sea lies to the south of Pakistan?", a: "Arabian Sea", d: ["Bay of Bengal", "Red Sea", "Caspian Sea"], e: "The Arabian Sea lies to the south." },
  { q: "What is the total area of Pakistan (approx.)?", a: "796,096 km²", d: ["881,913 km²", "640,000 km²", "500,000 km²"], e: "Pakistan covers about 796,096 km²." },
  { q: "Which is the smallest province of Pakistan by area?", a: "Khyber Pakhtunkhwa", d: ["Punjab", "Sindh", "Balochistan"], e: "Among the four provinces, KP is the smallest by area." },
];

/* ============================ Islamiat ============================ */

const ISLAMIAT_FACTS: Fact[] = [
  { q: "How many Surahs are there in the Holy Quran?", a: "114", d: ["112", "116", "110"], e: "The Quran has 114 Surahs." },
  { q: "How many Ayats are there in the Holy Quran?", a: "6236", d: ["6000", "6666", "5000"], e: "The Quran has 6236 Ayats (by the standard count)." },
  { q: "How many Pillars of Islam are there?", a: "5", d: ["4", "6", "7"], e: "Islam has five pillars." },
  { q: "What is the first pillar of Islam?", a: "Shahadah", d: ["Salah", "Zakat", "Sawm"], e: "The Shahadah (declaration of faith) is the first pillar." },
  { q: "How many times a day are Muslims required to pray (Salah)?", a: "5", d: ["3", "6", "7"], e: "Five daily prayers are obligatory." },
  { q: "In which month do Muslims fast?", a: "Ramadan", d: ["Shawwal", "Rajab", "Muharram"], e: "Fasting is observed in Ramadan." },
  { q: "What is the rate of Zakat on wealth?", a: "2.5%", d: ["5%", "10%", "1%"], e: "Zakat is 2.5% of qualifying wealth." },
  { q: "Which is the longest Surah of the Quran?", a: "Al-Baqarah", d: ["Al-Imran", "An-Nisa", "Al-Kahf"], e: "Surah Al-Baqarah is the longest." },
  { q: "Which is the shortest Surah of the Quran?", a: "Al-Kawthar", d: ["Al-Asr", "Al-Ikhlas", "Al-Falaq"], e: "Surah Al-Kawthar is the shortest." },
  { q: "Who was the first Caliph of Islam?", a: "Abu Bakr (RA)", d: ["Umar (RA)", "Uthman (RA)", "Ali (RA)", ], e: "Abu Bakr (RA) was the first Caliph." },
  { q: "How many years did the Prophet Muhammad (PBUH) live?", a: "63", d: ["60", "65", "70"], e: "The Prophet (PBUH) lived 63 years." },
  { q: "In which year did the Hijrah (migration to Madinah) take place?", a: "622 CE", d: ["610 CE", "632 CE", "600 CE"], e: "The Hijrah took place in 622 CE." },
  { q: "Which is the first month of the Islamic calendar?", a: "Muharram", d: ["Ramadan", "Rajab", "Safar"], e: "Muharram is the first Islamic month." },
  { q: "How many Ramadans did the Prophet (PBUH) observe?", a: "9", d: ["10", "8", "12"], e: "The Prophet (PBUH) observed nine Ramadans after fasting was prescribed." },
  { q: "Which Surah is called the 'heart of the Quran'?", a: "Yaseen", d: ["Al-Fatiha", "Al-Ikhlas", "Ar-Rahman"], e: "Surah Yaseen is often called the heart of the Quran." },
  { q: "How many Rak'ahs are in Fajr prayer (Farz)?", a: "2", d: ["3", "4", "1"], e: "Fajr has two Farz Rak'ahs." },
  { q: "How many Rak'ahs are in Maghrib prayer (Farz)?", a: "3", d: ["2", "4", "5"], e: "Maghrib has three Farz Rak'ahs." },
  { q: "What is the first Surah of the Quran?", a: "Al-Fatiha", d: ["Al-Baqarah", "An-Nas", "Al-Ikhlas"], e: "Al-Fatiha is the first Surah." },
  { q: "What is the last Surah of the Quran?", a: "An-Nas", d: ["Al-Falaq", "Al-Ikhlas", "Al-Kawthar"], e: "An-Nas is the last Surah." },
  { q: "Which angel brought revelation to the Prophet (PBUH)?", a: "Jibreel (Gabriel)", d: ["Mikaeel", "Israfeel", "Azraeel"], e: "Jibreel brought the revelation." },
];

/* ============================ General Knowledge ============================ */

const GK_FACTS: Fact[] = [
  { q: "Which is the largest ocean in the world?", a: "Pacific Ocean", d: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], e: "The Pacific is the largest ocean." },
  { q: "Which is the highest mountain in the world?", a: "Mount Everest", d: ["K2", "Kangchenjunga", "Makalu"], e: "Mount Everest is the highest mountain." },
  { q: "Which is the largest desert in the world?", a: "Antarctic Desert", d: ["Sahara", "Gobi", "Thar"], e: "Antarctica is the largest desert (cold desert)." },
  { q: "Which planet is known as the Red Planet?", a: "Mars", d: ["Venus", "Jupiter", "Mercury"], e: "Mars is the Red Planet." },
  { q: "Which is the largest planet in the solar system?", a: "Jupiter", d: ["Saturn", "Neptune", "Earth"], e: "Jupiter is the largest planet." },
  { q: "How many continents are there on Earth?", a: "7", d: ["5", "6", "8"], e: "There are seven continents." },
  { q: "Which is the smallest continent?", a: "Australia", d: ["Europe", "Antarctica", "South America"], e: "Australia is the smallest continent." },
  { q: "Which country has the largest population?", a: "India", d: ["China", "USA", "Indonesia"], e: "India has the largest population." },
  { q: "What is the currency of Japan?", a: "Yen", d: ["Won", "Yuan", "Ringgit"], e: "Japan's currency is the yen." },
  { q: "What is the currency of Saudi Arabia?", a: "Riyal", d: ["Dinar", "Dirham", "Rial"], e: "Saudi Arabia uses the riyal." },
  { q: "What is the currency of the United Kingdom?", a: "Pound Sterling", d: ["Euro", "Dollar", "Franc"], e: "The UK uses the pound sterling." },
  { q: "What is the currency of China?", a: "Yuan (Renminbi)", d: ["Yen", "Won", "Taka"], e: "China uses the yuan." },
  { q: "What is the capital of Turkey?", a: "Ankara", d: ["Istanbul", "Izmir", "Bursa"], e: "Ankara is the capital of Turkey." },
  { q: "What is the capital of Saudi Arabia?", a: "Riyadh", d: ["Jeddah", "Mecca", "Medina"], e: "Riyadh is the capital." },
  { q: "What is the capital of Japan?", a: "Tokyo", d: ["Osaka", "Kyoto", "Nagoya"], e: "Tokyo is the capital of Japan." },
  { q: "What is the capital of Australia?", a: "Canberra", d: ["Sydney", "Melbourne", "Perth"], e: "Canberra is the capital of Australia." },
  { q: "What is the capital of Canada?", a: "Ottawa", d: ["Toronto", "Vancouver", "Montreal"], e: "Ottawa is the capital of Canada." },
  { q: "What is the capital of the United States?", a: "Washington, D.C.", d: ["New York", "Los Angeles", "Chicago"], e: "Washington, D.C. is the capital." },
  { q: "Which organisation is headquartered in New York?", a: "United Nations", d: ["WHO", "UNESCO", "IMF"], e: "The UN is headquartered in New York." },
  { q: "Where is the headquarters of the World Health Organization?", a: "Geneva", d: ["New York", "Paris", "Vienna"], e: "WHO is headquartered in Geneva." },
  { q: "Where is the headquarters of UNESCO?", a: "Paris", d: ["Geneva", "New York", "Rome"], e: "UNESCO is headquartered in Paris." },
  { q: "Where is the headquarters of the IMF?", a: "Washington, D.C.", d: ["Geneva", "New York", "London"], e: "The IMF is headquartered in Washington, D.C." },
  { q: "Which is the largest country in the world by area?", a: "Russia", d: ["Canada", "China", "USA"], e: "Russia is the largest by area." },
  { q: "Which is the smallest country in the world?", a: "Vatican City", d: ["Monaco", "Nauru", "San Marino"], e: "Vatican City is the smallest country." },
  { q: "Who wrote the play 'Romeo and Juliet'?", a: "William Shakespeare", d: ["Charles Dickens", "John Keats", "Jane Austen"], e: "Shakespeare wrote Romeo and Juliet." },
  { q: "Who wrote 'Pride and Prejudice'?", a: "Jane Austen", d: ["Charlotte Bronte", "George Eliot", "Virginia Woolf"], e: "Jane Austen wrote Pride and Prejudice." },
  { q: "Who painted the 'Mona Lisa'?", a: "Leonardo da Vinci", d: ["Michelangelo", "Raphael", "Van Gogh"], e: "Da Vinci painted the Mona Lisa." },
  { q: "Who developed the theory of relativity?", a: "Albert Einstein", d: ["Isaac Newton", "Niels Bohr", "Galileo"], e: "Einstein developed relativity." },
  { q: "Who discovered penicillin?", a: "Alexander Fleming", d: ["Louis Pasteur", "Edward Jenner", "Robert Koch"], e: "Fleming discovered penicillin." },
  { q: "Who was the first person to walk on the Moon?", a: "Neil Armstrong", d: ["Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], e: "Neil Armstrong was first on the Moon." },
  { q: "In which year did World War II end?", a: "1945", d: ["1944", "1946", "1939"], e: "World War II ended in 1945." },
  { q: "In which year did World War I begin?", a: "1914", d: ["1918", "1912", "1920"], e: "World War I began in 1914." },
];

/* ============================ History / Geography / Civics ============================ */

const HISTORY_FACTS: Fact[] = [
  { q: "Who was the first President of the United States?", a: "George Washington", d: ["Abraham Lincoln", "Thomas Jefferson", "John Adams"], e: "George Washington was the first US President." },
  { q: "The French Revolution began in:", a: "1789", d: ["1776", "1799", "1815"], e: "The French Revolution began in 1789." },
  { q: "Who was the first Emperor of China (unified)?", a: "Qin Shi Huang", d: ["Kublai Khan", "Han Wudi", "Sun Yat-sen"], e: "Qin Shi Huang unified China." },
  { q: "The Renaissance began in which country?", a: "Italy", d: ["France", "England", "Germany"], e: "The Renaissance began in Italy." },
  { q: "Who wrote 'The Prince'?", a: "Niccolò Machiavelli", d: ["Plato", "Aristotle", "Thomas Hobbes"], e: "Machiavelli wrote The Prince." },
  { q: "The Industrial Revolution began in:", a: "Britain", d: ["France", "Germany", "USA"], e: "The Industrial Revolution began in Britain." },
  { q: "The Mughal Empire was founded by:", a: "Babur", d: ["Akbar", "Humayun", "Aurangzeb"], e: "Babur founded the Mughal Empire." },
  { q: "Which Mughal emperor built the Taj Mahal?", a: "Shah Jahan", d: ["Akbar", "Jahangir", "Aurangzeb"], e: "Shah Jahan built the Taj Mahal." },
  { q: "The Battle of Plassey was fought in:", a: "1757", d: ["1857", "1707", "1764"], e: "The Battle of Plassey was fought in 1757." },
  { q: "The War of Independence in the subcontinent took place in:", a: "1857", d: ["1757", "1885", "1906"], e: "The 1857 War of Independence." },
  { q: "The Indian National Congress was founded in:", a: "1885", d: ["1857", "1906", "1919"], e: "The Congress was founded in 1885." },
  { q: "The All-India Muslim League was founded in:", a: "1906", d: ["1885", "1916", "1930"], e: "The Muslim League was founded in 1906." },
];

const GEOGRAPHY_FACTS: Fact[] = [
  { q: "Which is the longest river in the world?", a: "Nile", d: ["Amazon", "Yangtze", "Mississippi"], e: "The Nile is generally considered the longest river." },
  { q: "Which is the largest lake in the world?", a: "Caspian Sea", d: ["Lake Superior", "Lake Victoria", "Lake Baikal"], e: "The Caspian Sea is the largest lake." },
  { q: "Which line divides the Earth into Northern and Southern Hemispheres?", a: "Equator", d: ["Prime Meridian", "Tropic of Cancer", "Tropic of Capricorn"], e: "The Equator divides the hemispheres." },
  { q: "Which is the deepest ocean trench?", a: "Mariana Trench", d: ["Tonga Trench", "Java Trench", "Puerto Rico Trench"], e: "The Mariana Trench is the deepest." },
  { q: "The Sahara Desert is located in:", a: "Africa", d: ["Asia", "Australia", "South America"], e: "The Sahara is in Africa." },
  { q: "Which country is called the 'Land of the Rising Sun'?", a: "Japan", d: ["China", "Thailand", "Korea"], e: "Japan is the Land of the Rising Sun." },
  { q: "Which strait separates Asia from North America?", a: "Bering Strait", d: ["Strait of Malacca", "Strait of Hormuz", "Gibraltar"], e: "The Bering Strait separates them." },
  { q: "The Suez Canal connects the Mediterranean Sea with:", a: "Red Sea", d: ["Black Sea", "Arabian Sea", "Persian Gulf"], e: "The Suez Canal connects the Mediterranean and the Red Sea." },
  { q: "Which is the largest island in the world?", a: "Greenland", d: ["Madagascar", "Borneo", "New Guinea"], e: "Greenland is the largest island." },
  { q: "Which country has the most time zones?", a: "France", d: ["Russia", "USA", "China"], e: "France spans the most time zones." },
];

const CIVICS_FACTS: Fact[] = [
  { q: "What is the supreme law of a country called?", a: "Constitution", d: ["Statute", "Ordinance", "Regulation"], e: "The constitution is the supreme law." },
  { q: "The legislature's main function is to:", a: "Make laws", d: ["Enforce laws", "Interpret laws", "Execute laws"], e: "The legislature makes laws." },
  { q: "The judiciary's main function is to:", a: "Interpret laws", d: ["Make laws", "Enforce laws", "Collect taxes"], e: "The judiciary interprets laws." },
  { q: "The executive's main function is to:", a: "Enforce laws", d: ["Make laws", "Interpret laws", "Amend laws"], e: "The executive enforces laws." },
  { q: "Universal adult franchise means:", a: "Right to vote for all adults", d: ["Right to education", "Right to property", "Right to work"], e: "It is the right of all adults to vote." },
  { q: "Which document lists fundamental rights in Pakistan?", a: "The Constitution of 1973", d: ["The Penal Code", "The Civil Code", "The Companies Act"], e: "Fundamental rights are in the 1973 Constitution." },
];

/* ============================ Economics / Political Science / Sociology ============================ */

const ECONOMICS_FACTS: Fact[] = [
  { q: "What does GDP stand for?", a: "Gross Domestic Product", d: ["General Domestic Product", "Gross Development Product", "Gross Domestic Price"], e: "GDP = Gross Domestic Product." },
  { q: "What does inflation mean?", a: "A general rise in prices", d: ["A fall in prices", "A rise in employment", "A fall in population"], e: "Inflation is a general rise in prices." },
  { q: "The law of demand states that, other things equal, as price rises, quantity demanded:", a: "Falls", d: ["Rises", "Stays constant", "Doubles"], e: "Demand falls as price rises." },
  { q: "The law of supply states that as price rises, quantity supplied:", a: "Rises", d: ["Falls", "Stays constant", "Halves"], e: "Supply rises as price rises." },
  { q: "What is the central bank of Pakistan?", a: "State Bank of Pakistan", d: ["National Bank of Pakistan", "Habib Bank", "Bank of Punjab"], e: "The State Bank of Pakistan is the central bank." },
  { q: "Fiscal policy is managed by:", a: "The government", d: ["The central bank", "Commercial banks", "The stock exchange"], e: "Fiscal policy is the government's." },
  { q: "Monetary policy is managed by:", a: "The central bank", d: ["The government", "Commercial banks", "Parliament"], e: "Monetary policy is the central bank's." },
  { q: "A budget deficit occurs when:", a: "Expenditure exceeds revenue", d: ["Revenue exceeds expenditure", "Revenue equals expenditure", "Exports exceed imports"], e: "Deficit = expenditure > revenue." },
  { q: "Which is a factor of production?", a: "Labour", d: ["Money", "Inflation", "Price"], e: "Labour is a factor of production." },
  { q: "Opportunity cost is:", a: "The value of the next best alternative forgone", d: ["The money paid for a good", "The total cost of production", "The tax on a good"], e: "It is the next best alternative forgone." },
];

const POLITICAL_FACTS: Fact[] = [
  { q: "Who wrote 'The Republic'?", a: "Plato", d: ["Aristotle", "Socrates", "Machiavelli"], e: "Plato wrote The Republic." },
  { q: "Who is known as the father of political science?", a: "Aristotle", d: ["Plato", "Socrates", "Hobbes"], e: "Aristotle is the father of political science." },
  { q: "Who wrote 'Leviathan'?", a: "Thomas Hobbes", d: ["John Locke", "Rousseau", "Montesquieu"], e: "Hobbes wrote Leviathan." },
  { q: "The theory of separation of powers is associated with:", a: "Montesquieu", d: ["Locke", "Hobbes", "Rousseau"], e: "Montesquieu propounded separation of powers." },
  { q: "Who wrote 'The Social Contract'?", a: "Jean-Jacques Rousseau", d: ["Voltaire", "Locke", "Hobbes"], e: "Rousseau wrote The Social Contract." },
  { q: "What is the head of government in a parliamentary system called?", a: "Prime Minister", d: ["President", "Governor", "Mayor"], e: "The Prime Minister heads the government." },
  { q: "In a presidential system, the head of state is:", a: "The President", d: ["The Prime Minister", "The Speaker", "The Chief Justice"], e: "The President is head of state and government." },
  { q: "The United Nations was founded in:", a: "1945", d: ["1919", "1950", "1939"], e: "The UN was founded in 1945." },
  { q: "How many permanent members does the UN Security Council have?", a: "5", d: ["10", "15", "7"], e: "There are five permanent members." },
  { q: "SAARC was established in:", a: "1985", d: ["1990", "1975", "1995"], e: "SAARC was established in 1985." },
];

const SOCIOLOGY_FACTS: Fact[] = [
  { q: "Who is considered the father of sociology?", a: "Auguste Comte", d: ["Emile Durkheim", "Max Weber", "Karl Marx"], e: "Auguste Comte is the father of sociology." },
  { q: "Who wrote 'The Protestant Ethic and the Spirit of Capitalism'?", a: "Max Weber", d: ["Karl Marx", "Durkheim", "Comte"], e: "Max Weber wrote it." },
  { q: "Who wrote 'Das Kapital'?", a: "Karl Marx", d: ["Engels", "Weber", "Durkheim"], e: "Karl Marx wrote Das Kapital." },
  { q: "The study of human society is called:", a: "Sociology", d: ["Psychology", "Anthropology", "History"], e: "Sociology is the study of human society." },
  { q: "A family consisting of parents and children is called:", a: "Nuclear family", d: ["Joint family", "Extended family", "Blended family"], e: "This is a nuclear family." },
  { q: "The process of learning culture is called:", a: "Socialisation", d: ["Assimilation", "Acculturation", "Stratification"], e: "It is socialisation." },
  { q: "Social stratification refers to:", a: "Ranking of people in a hierarchy", d: ["Migration of people", "Growth of cities", "Change in population"], e: "It is hierarchical ranking." },
  { q: "Who coined the term 'sociology'?", a: "Auguste Comte", d: ["Herbert Spencer", "Durkheim", "Weber"], e: "Comte coined the term." },
];

const PSYCHOLOGY_FACTS: Fact[] = [
  { q: "Who is considered the father of psychoanalysis?", a: "Sigmund Freud", d: ["Carl Jung", "B. F. Skinner", "William James"], e: "Freud founded psychoanalysis." },
  { q: "Who developed the theory of classical conditioning?", a: "Ivan Pavlov", d: ["Skinner", "Freud", "Piaget"], e: "Pavlov developed classical conditioning." },
  { q: "Who developed operant conditioning?", a: "B. F. Skinner", d: ["Pavlov", "Watson", "Jung"], e: "Skinner developed operant conditioning." },
  { q: "Who proposed the hierarchy of needs?", a: "Abraham Maslow", d: ["Carl Rogers", "Freud", "Erikson"], e: "Maslow proposed the hierarchy of needs." },
  { q: "Which part of the brain controls balance?", a: "Cerebellum", d: ["Cerebrum", "Medulla", "Thalamus"], e: "The cerebellum controls balance." },
  { q: "Who developed the theory of cognitive development?", a: "Jean Piaget", d: ["Erikson", "Vygotsky", "Kohlberg"], e: "Piaget developed cognitive development theory." },
  { q: "The 'id', 'ego' and 'superego' are concepts of:", a: "Sigmund Freud", d: ["Carl Jung", "Alfred Adler", "Skinner"], e: "These are Freudian concepts." },
  { q: "Who conducted the famous 'bobo doll' experiment?", a: "Albert Bandura", d: ["Pavlov", "Skinner", "Milgram"], e: "Bandura conducted the bobo doll experiment." },
];

const EDUCATION_FACTS: Fact[] = [
  { q: "Who is known as the father of modern education?", a: "John Amos Comenius", d: ["John Dewey", "Pestalozzi", "Rousseau"], e: "Comenius is the father of modern education." },
  { q: "Who wrote 'Democracy and Education'?", a: "John Dewey", d: ["Comenius", "Tagore", "Montessori"], e: "Dewey wrote Democracy and Education." },
  { q: "Bloom's taxonomy is used to classify:", a: "Learning objectives", d: ["Teaching methods", "School buildings", "Exam schedules"], e: "It classifies learning objectives." },
  { q: "Which is a method of teaching?", a: "Lecture method", d: ["Harvesting", "Ploughing", "Mining"], e: "Lecture method is a teaching method." },
  { q: "Curriculum refers to:", a: "The course of study", d: ["The school building", "The exam hall", "The library"], e: "Curriculum is the course of study." },
  { q: "The process of measuring learning is called:", a: "Assessment", d: ["Curriculum", "Pedagogy", "Management"], e: "Assessment measures learning." },
];

const MEDIA_FACTS: Fact[] = [
  { q: "What does 'mass communication' refer to?", a: "Communication to large audiences", d: ["One-to-one talking", "Internal thinking", "Written letters only"], e: "Mass communication targets large audiences." },
  { q: "Which is a print medium?", a: "Newspaper", d: ["Radio", "Television", "Internet"], e: "Newspapers are print media." },
  { q: "Which is an electronic medium?", a: "Television", d: ["Newspaper", "Magazine", "Pamphlet"], e: "Television is electronic media." },
  { q: "The 'freedom of press' means:", a: "Media can report without undue state control", d: ["Media must obey the government", "Media cannot report", "Media owns the state"], e: "It is freedom from undue state control." },
  { q: "Who is considered the father of modern journalism?", a: "Joseph Pulitzer", d: ["Rupert Murdoch", "Edward Murrow", "Walter Cronkite"], e: "Pulitzer is regarded as a father of modern journalism." },
  { q: "A press release is issued by:", a: "An organisation to inform the media", d: ["A reader to a newspaper", "A journalist to a source", "A government to a citizen"], e: "Organisations issue press releases." },
];

const LAW_FACTS: Fact[] = [
  { q: "What is the supreme law of Pakistan?", a: "The Constitution of 1973", d: ["The Penal Code", "The Civil Procedure Code", "The Evidence Act"], e: "The 1973 Constitution is supreme." },
  { q: "The law that deals with crimes is called:", a: "Criminal law", d: ["Civil law", "Company law", "Family law"], e: "Criminal law deals with crimes." },
  { q: "The law that deals with disputes between individuals is:", a: "Civil law", d: ["Criminal law", "Constitutional law", "Tax law"], e: "Civil law deals with private disputes." },
  { q: "Who is the head of the judiciary in Pakistan?", a: "Chief Justice of Pakistan", d: ["President", "Prime Minister", "Attorney General"], e: "The Chief Justice heads the judiciary." },
  { q: "The burden of proof in a criminal case lies on:", a: "The prosecution", d: ["The accused", "The judge", "The witness"], e: "The prosecution bears the burden of proof." },
  { q: "Islamic law is known as:", a: "Shariah", d: ["Fiqh only", "Urf", "Qanun"], e: "Islamic law is Shariah." },
];

const BUSINESS_FACTS: Fact[] = [
  { q: "What does 'marketing' involve?", a: "Promoting and selling products", d: ["Only manufacturing", "Only accounting", "Only hiring"], e: "Marketing promotes and sells products." },
  { q: "What is the 4Ps of marketing?", a: "Product, Price, Place, Promotion", d: ["Plan, Price, People, Profit", "Product, Profit, Place, Plan", "Price, People, Plan, Promotion"], e: "The 4Ps are Product, Price, Place, Promotion." },
  { q: "Management is best defined as:", a: "Getting things done through others", d: ["Doing everything yourself", "Only planning", "Only controlling"], e: "Management gets things done through others." },
  { q: "What does HRM stand for?", a: "Human Resource Management", d: ["High Resource Management", "Human Relations Management", "Human Resource Marketing"], e: "HRM = Human Resource Management." },
  { q: "An entrepreneur is a person who:", a: "Starts and runs a business", d: ["Works for wages only", "Only invests in stocks", "Only audits accounts"], e: "An entrepreneur starts a business." },
  { q: "What is 'break-even point'?", a: "Where total revenue equals total cost", d: ["Where profit is maximum", "Where loss is maximum", "Where sales are zero"], e: "Break-even is revenue = cost." },
  { q: "Which is a function of management?", a: "Planning", d: ["Auditing", "Selling", "Manufacturing"], e: "Planning is a management function." },
  { q: "What is e-commerce?", a: "Buying and selling online", d: ["Buying in a shop", "Only advertising", "Only banking"], e: "E-commerce is online trade." },
];

const ACCOUNTING_FACTS: Fact[] = [
  { q: "The accounting equation is:", a: "Assets = Liabilities + Equity", d: ["Assets = Liabilities − Equity", "Assets + Equity = Liabilities", "Assets = Equity − Liabilities"], e: "Assets = Liabilities + Equity." },
  { q: "What is a debit?", a: "An entry on the left side of an account", d: ["An entry on the right side", "A type of loan", "A type of tax"], e: "Debit is the left side." },
  { q: "What is a credit?", a: "An entry on the right side of an account", d: ["An entry on the left side", "A type of expense", "A type of asset"], e: "Credit is the right side." },
  { q: "Which statement shows a firm's financial position?", a: "Balance sheet", d: ["Income statement", "Cash flow statement", "Trial balance"], e: "The balance sheet shows financial position." },
  { q: "Which statement shows profit or loss?", a: "Income statement", d: ["Balance sheet", "Cash flow statement", "Ledger"], e: "The income statement shows profit or loss." },
  { q: "Double-entry bookkeeping means:", a: "Every transaction affects two accounts", d: ["Every transaction affects one account", "No transaction is recorded", "Only cash is recorded"], e: "Every transaction has two effects." },
  { q: "Depreciation is the allocation of the cost of an asset over its:", a: "Useful life", d: ["Market value", "Salvage value", "Purchase date"], e: "Depreciation is over useful life." },
  { q: "Which is a current asset?", a: "Cash", d: ["Building", "Machinery", "Land"], e: "Cash is a current asset." },
  { q: "Which is a fixed asset?", a: "Machinery", d: ["Cash", "Debtors", "Stock"], e: "Machinery is a fixed asset." },
  { q: "The excess of revenue over expenses is:", a: "Profit", d: ["Loss", "Capital", "Liability"], e: "Revenue − expenses = profit." },
];

export function generateSocialV1(): SeedQuestion[] {
  const { rand } = makeRandom("social-v1");
  const out: SeedQuestion[] = [];

  const bank = (facts: Fact[], subject: string, topic: string, prefix: string, tags: string[] = []) =>
    out.push(...bankToQuestions(facts, { subject, topic, prefix, tags }));

  // Each fact bank is emitted once under its primary subject/topic; cross-exam
  // coverage comes from exam fan-out (a Pakistan-studies question is linked to
  // every exam whose blueprint includes Pakistan studies), so there is no need
  // to duplicate the same question under several subjects.
  bank(PAKISTAN_FACTS, "pakistan-studies", "pakistan-movement", "so-pk", ["pakistan"]);
  bank(ISLAMIAT_FACTS, "islamiat", "quran", "so-isl", ["islam"]);
  bank(GK_FACTS, "general-knowledge", "world-geography", "so-gk", ["gk"]);
  bank(HISTORY_FACTS, "history", "modern-history", "so-hi", ["history"]);
  bank(GEOGRAPHY_FACTS, "geography", "world-geography", "so-geo", ["geography"]);
  bank(CIVICS_FACTS, "civics", "government", "so-civ", ["civics"]);
  bank(ECONOMICS_FACTS, "economics", "microeconomics", "so-eco", ["economics"]);
  bank(POLITICAL_FACTS, "political-science", "political-theory", "so-pol", ["political-science"]);
  bank(SOCIOLOGY_FACTS, "sociology", "sociological-theory", "so-soc", ["sociology"]);
  bank(PSYCHOLOGY_FACTS, "psychology", "general-psychology", "so-psy", ["psychology"]);
  bank(EDUCATION_FACTS, "education", "pedagogy", "so-edu", ["education"]);
  bank(MEDIA_FACTS, "mass-communication", "journalism", "so-mc", ["media"]);
  bank(LAW_FACTS, "law", "constitutional-law", "so-law", ["law"]);
  bank(BUSINESS_FACTS, "business-administration", "management", "so-ba", ["business"]);
  bank(ACCOUNTING_FACTS, "accounting", "financial-accounting", "so-acc", ["accounting"]);

  /* ---- computed accounting / economics ---- */
  out.push(
    ...numeric(6000, { subject: "accounting", topic: "financial-accounting", prefix: "so-acc-eq", tags: ["accounting"] }, () => {
      const liabilities = ri(rand, 1000, 90000);
      const equity = ri(rand, 1000, 90000);
      const assets = liabilities + equity;
      return {
        stem: `A firm has liabilities of Rs. ${liabilities} and equity of Rs. ${equity}. What are its total assets?`,
        correct: `Rs. ${assets}`,
        distractors: [`Rs. ${equity - liabilities}`, `Rs. ${assets + 1000}`, `Rs. ${liabilities}`, `Rs. ${assets - 1000}`],
        explanation: `Assets = Liabilities + Equity = ${liabilities} + ${equity} = ${assets}.`,
      };
    }),
  );
  out.push(
    ...numeric(6000, { subject: "accounting", topic: "cost-accounting", prefix: "so-acc-profit", tags: ["accounting"] }, () => {
      const revenue = ri(rand, 10000, 500000);
      const expenses = ri(rand, 1000, revenue - 1);
      const profit = revenue - expenses;
      return {
        stem: `A business has revenue of Rs. ${revenue} and expenses of Rs. ${expenses}. What is its profit?`,
        correct: `Rs. ${profit}`,
        distractors: [`Rs. ${revenue + expenses}`, `Rs. ${expenses}`, `Rs. ${profit + 100}`, `Rs. ${profit - 100}`],
        explanation: `Profit = Revenue − Expenses = ${revenue} − ${expenses} = ${profit}.`,
      };
    }),
  );
  out.push(
    ...numeric(5000, { subject: "economics", topic: "money-banking", prefix: "so-eco-si", tags: ["interest"] }, () => {
      const p = ri(rand, 5, 100) * 1000;
      const r = ri(rand, 2, 18);
      const t = ri(rand, 1, 8);
      const si = (p * r * t) / 100;
      return {
        stem: `Calculate the simple interest on Rs. ${p} at ${r}% per annum for ${t} years.`,
        correct: `Rs. ${si}`,
        distractors: [`Rs. ${si + 100}`, `Rs. ${p + si}`, `Rs. ${si / 2}`, `Rs. ${si - 100}`],
        explanation: `SI = PRT/100 = (${p} × ${r} × ${t})/100 = ${si}.`,
      };
    }),
  );
  out.push(
    ...numeric(5000, { subject: "economics", topic: "microeconomics", prefix: "so-eco-mkt", tags: ["market"] }, () => {
      const price = ri(rand, 5, 500);
      const qty = ri(rand, 2, 200);
      const total = price * qty;
      return {
        stem: `At a price of Rs. ${price} per unit, ${qty} units are sold. What is the total revenue?`,
        correct: `Rs. ${total}`,
        distractors: [`Rs. ${price + qty}`, `Rs. ${total + price}`, `Rs. ${total - qty}`, `Rs. ${Math.round(total / 2)}`],
        explanation: `Total revenue = price × quantity = ${price} × ${qty} = ${total}.`,
      };
    }),
  );

  return out;
}
