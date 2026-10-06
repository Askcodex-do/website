/**
 * Coverage completion banks (social sciences, humanities, commerce).
 *
 * Fills the remaining topics across Islamiat, Pakistan Studies, history,
 * political science, sociology, psychology, civics, economics, education, media,
 * law, general knowledge, current affairs, accounting, business administration
 * and analytical reasoning.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const EXTRA2_BANKS: SubjectSpec[] = [
  /* ============================ Islamiat ============================ */
  {
    slug: "islamiat",
    topics: [
      {
        slug: "hadith",
        facts: [
          f("Which is the most authentic Hadith collection?", "Sahih Bukhari", ["Sahih Muslim only", "Sunan Abu Dawud", "Muwatta Malik"], "Sahih Bukhari is the most authentic."),
          f("How many books are in Sihah Sittah?", "6", ["4", "5", "7"], "Sihah Sittah are six books."),
          f("A Hadith consists of the text and the:", "Chain of narrators", ["Translation", "Commentary", "Index"], "A Hadith has an isnad and matn."),
          f("Hadith that are the Prophet's (PBUH) sayings are called:", "Qawli", ["Fi'li", "Taqriri", "Ijma"], "Qawli Hadith are verbal."),
          f("Hadith describing the Prophet's (PBUH) actions are:", "Fi'li", ["Qawli", "Taqriri", "Ijma"], "Fi'li Hadith describe actions."),
          f("The science of Hadith criticism is:", "Ilm al-Hadith", ["Ilm al-Kalam", "Ilm al-Fiqh", "Ilm al-Nahw"], "Ilm al-Hadith studies Hadith."),
        ],
      },
      {
        slug: "fiqh",
        facts: [
          f("Fiqh means:", "Islamic jurisprudence", ["Islamic history", "Islamic art", "Islamic architecture"], "Fiqh is Islamic jurisprudence."),
          f("The primary sources of Islamic law are the Quran and:", "Sunnah", ["Ijma", "Qiyas", "Urf"], "Quran and Sunnah are primary."),
          f("Consensus of scholars is called:", "Ijma", ["Qiyas", "Ijtihad", "Urf"], "Ijma is consensus."),
          f("Analogical reasoning in Islamic law is:", "Qiyas", ["Ijma", "Ijtihad", "Istihsan"], "Qiyas is analogical reasoning."),
          f("Independent legal reasoning is:", "Ijtihad", ["Ijma", "Qiyas", "Taqlid"], "Ijtihad is independent reasoning."),
          f("Following a jurist's rulings is:", "Taqlid", ["Ijtihad", "Ijma", "Qiyas"], "Taqlid means following a jurist."),
        ],
      },
      {
        slug: "pillars-of-islam",
        facts: [
          f("How many pillars of Islam are there?", "5", ["4", "6", "7"], "Islam has five pillars."),
          f("What is the first pillar of Islam?", "Shahadah", ["Salah", "Zakat", "Sawm"], "The Shahadah is the first pillar."),
          f("How many daily obligatory prayers are there?", "5", ["3", "6", "7"], "There are five daily prayers."),
          f("The rate of Zakat on qualifying wealth is:", "2.5%", ["5%", "10%", "1%"], "Zakat is 2.5%."),
          f("Fasting is obligatory in the month of:", "Ramadan", ["Shawwal", "Rajab", "Muharram"], "Fasting is in Ramadan."),
          f("Hajj is performed in the month of:", "Dhul-Hijjah", ["Ramadan", "Muharram", "Rajab"], "Hajj is in Dhul-Hijjah."),
        ],
      },
      {
        slug: "islamic-morality",
        facts: [
          f("Honesty in Islam is:", "Obligatory", ["Optional", "Forbidden", "Discouraged"], "Honesty is obligatory."),
          f("Backbiting in Islam is:", "Forbidden", ["Encouraged", "Optional", "Neutral"], "Backbiting is forbidden."),
          f("Kindness to parents is:", "Highly rewarded", ["Optional", "Forbidden", "Discouraged"], "Kindness to parents is highly rewarded."),
          f("Truthfulness is a sign of:", "Faith", ["Wealth", "Power", "Status"], "Truthfulness is a sign of faith."),
          f("Charity in Islam is called:", "Sadaqah", ["Riba", "Gharar", "Zakat only"], "Voluntary charity is Sadaqah."),
          f("The Prophet (PBUH) emphasised good:", "Character", ["Wealth", "Power", "Fame"], "Good character is central to Islam."),
        ],
      },
      {
        slug: "prophets",
        facts: [
          f("How many prophets are mentioned in the Quran?", "25", ["10", "40", "50"], "25 prophets are named in the Quran."),
          f("Which prophet is called the father of prophets?", "Ibrahim (AS)", ["Musa (AS)", "Nuh (AS)", "Adam (AS)"], "Ibrahim (AS) is called the father of prophets."),
          f("Which prophet built the Ark?", "Nuh (AS)", ["Musa (AS)", "Ibrahim (AS)", "Yusuf (AS)"], "Nuh (AS) built the Ark."),
          f("Which prophet was given the Torah?", "Musa (AS)", ["Isa (AS)", "Dawud (AS)", "Sulaiman (AS)"], "Musa (AS) received the Torah."),
          f("Which prophet was given the Zabur?", "Dawud (AS)", ["Musa (AS)", "Isa (AS)", "Yusuf (AS)"], "Dawud (AS) received the Zabur."),
          f("Which prophet was given the Injil?", "Isa (AS)", ["Musa (AS)", "Dawud (AS)", "Yahya (AS)"], "Isa (AS) received the Injil."),
        ],
      },
      {
        slug: "khilafat",
        facts: [
          f("How many rightly-guided Caliphs were there?", "4", ["3", "5", "6"], "There were four rightly-guided Caliphs."),
          f("Who was the first Caliph?", "Abu Bakr (RA)", ["Umar (RA)", "Uthman (RA)", "Ali (RA)"], "Abu Bakr (RA) was the first Caliph."),
          f("Who was the second Caliph?", "Umar (RA)", ["Abu Bakr (RA)", "Uthman (RA)", "Ali (RA)"], "Umar (RA) was the second Caliph."),
          f("Who was the third Caliph?", "Uthman (RA)", ["Abu Bakr (RA)", "Umar (RA)", "Ali (RA)"], "Uthman (RA) was the third Caliph."),
          f("Who was the fourth Caliph?", "Ali (RA)", ["Abu Bakr (RA)", "Umar (RA)", "Uthman (RA)"], "Ali (RA) was the fourth Caliph."),
          f("The Umayyad dynasty was founded by:", "Muawiyah (RA)", ["Abu Bakr (RA)", "Umar (RA)", "Ali (RA)"], "Muawiyah (RA) founded the Umayyad dynasty."),
        ],
      },
    ],
  },

  /* ============================ Pakistan Studies ============================ */
  {
    slug: "pakistan-studies",
    topics: [
      {
        slug: "freedom-struggle",
        facts: [
          f("The Lahore Resolution was passed in:", "1940", ["1939", "1941", "1942"], "The Lahore Resolution was passed in 1940."),
          f("Who presented the Lahore Resolution?", "A. K. Fazlul Huq", ["Muhammad Ali Jinnah", "Liaquat Ali Khan", "Allama Iqbal"], "Fazlul Huq presented the Lahore Resolution."),
          f("The War of Independence took place in:", "1857", ["1847", "1867", "1877"], "The War of Independence was in 1857."),
          f("The Indian National Congress was founded in:", "1885", ["1875", "1895", "1905"], "The Congress was founded in 1885."),
          f("The All India Muslim League was founded in:", "1906", ["1900", "1910", "1915"], "The Muslim League was founded in 1906."),
          f("The Simla Deputation met the Viceroy in:", "1906", ["1900", "1910", "1916"], "The Simla Deputation was in 1906."),
        ],
      },
      {
        slug: "pakistan-economy",
        facts: [
          f("The currency of Pakistan is the:", "Rupee", ["Dinar", "Riyal", "Taka"], "Pakistan's currency is the rupee."),
          f("The central bank of Pakistan is the:", "State Bank of Pakistan", ["National Bank", "Habib Bank", "Bank of Punjab"], "The State Bank is the central bank."),
          f("Pakistan's largest export sector is:", "Textiles", ["Automobiles", "Aerospace", "Pharmaceuticals"], "Textiles dominate exports."),
          f("Which crop is central to Pakistan's agriculture?", "Wheat", ["Coffee", "Tea", "Rubber"], "Wheat is central to agriculture."),
          f("Remittances to Pakistan come mainly from:", "Overseas workers", ["Tourists", "Exports only", "Aid only"], "Overseas workers send remittances."),
          f("GDP stands for:", "Gross Domestic Product", ["Gross Development Product", "General Domestic Product", "Global Domestic Product"], "GDP is Gross Domestic Product."),
        ],
      },
      {
        slug: "pakistan-government",
        facts: [
          f("The current constitution of Pakistan was adopted in:", "1973", ["1956", "1962", "1985"], "The 1973 Constitution is current."),
          f("The head of state of Pakistan is the:", "President", ["Prime Minister", "Chief Justice", "Speaker"], "The President is head of state."),
          f("The National Assembly is the:", "Lower house", ["Upper house", "Supreme court", "Cabinet"], "The National Assembly is the lower house."),
          f("The Senate of Pakistan represents the:", "Provinces", ["National Assembly", "Judiciary", "Army"], "The Senate represents the provinces."),
          f("The Prime Minister is the head of:", "Government", ["State", "Judiciary", "Army"], "The PM heads the government."),
          f("Pakistan's Supreme Court is located in:", "Islamabad", ["Lahore", "Karachi", "Peshawar"], "The Supreme Court is in Islamabad."),
        ],
      },
      {
        slug: "regional-cultures",
        facts: [
          f("Which is the national language of Pakistan?", "Urdu", ["English", "Punjabi", "Sindhi"], "Urdu is the national language."),
          f("Which province is famous for Ajrak?", "Sindh", ["Punjab", "KP", "Balochistan"], "Ajrak is associated with Sindh."),
          f("Which province is famous for truck art?", "Punjab", ["Sindh", "KP", "Balochistan"], "Truck art is prominent in Punjab."),
          f("The Kalash people live in:", "Khyber Pakhtunkhwa", ["Sindh", "Punjab", "Balochistan"], "The Kalash live in KP (Chitral)."),
          f("Which language is spoken in Gilgit-Baltistan?", "Balti", ["Sindhi", "Pashto", "Punjabi"], "Balti is spoken in Gilgit-Baltistan."),
          f("Sindhi topi is a symbol of:", "Sindh", ["Punjab", "KP", "Balochistan"], "The Sindhi topi symbolises Sindh."),
        ],
      },
      {
        slug: "wars-pakistan",
        facts: [
          f("The first war between Pakistan and India was in:", "1948", ["1965", "1971", "1999"], "The first war was in 1948."),
          f("The 1965 war between Pakistan and India lasted about:", "17 days", ["1 day", "1 year", "6 months"], "The 1965 war lasted about 17 days."),
          f("The 1971 war resulted in the creation of:", "Bangladesh", ["Nepal", "Bhutan", "Sri Lanka"], "The 1971 war led to Bangladesh."),
          f("The Kargil conflict took place in:", "1999", ["1989", "1995", "2005"], "Kargil was in 1999."),
          f("The 1965 war is remembered for the defence of:", "Lahore", ["Karachi", "Quetta", "Peshawar"], "Lahore's defence is remembered."),
          f("Pakistan's Armed Forces Day is:", "6 September", ["14 August", "23 March", "25 December"], "6 September is Defence Day."),
        ],
      },
      {
        slug: "nuclear-pakistan",
        facts: [
          f("Pakistan conducted nuclear tests in:", "1998", ["1974", "1996", "2000"], "Pakistan tested in May 1998."),
          f("The nuclear tests were conducted at:", "Chagai", ["Kahuta", "Tarbela", "Gwadar"], "Tests were at Chagai, Balochistan."),
          f("Pakistan's nuclear programme was led by:", "A. Q. Khan", ["Abdus Salam", "Ishfaq Ahmad", "Riazuddin"], "A. Q. Khan led the programme."),
          f("Pakistan became a nuclear power in:", "1998", ["1974", "1990", "2001"], "Pakistan became a nuclear power in 1998."),
          f("Pakistan's nuclear doctrine is based on:", "Minimum credible deterrence", ["First strike", "No first use only", "Disarmament"], "Pakistan follows minimum credible deterrence."),
          f("Which organisation regulates Pakistan's nuclear energy?", "PAEC", ["SUPARCO", "PSQCA", "WAPDA"], "The PAEC regulates nuclear energy."),
        ],
      },
    ],
  },

  /* ============================ History ============================ */
  {
    slug: "history",
    topics: [
      {
        slug: "ancient-history",
        facts: [
          f("The Indus Valley Civilisation was discovered in:", "1921", ["1901", "1931", "1941"], "Harappa was discovered in 1921."),
          f("Mohenjo-daro is located in:", "Sindh", ["Punjab", "KP", "Balochistan"], "Mohenjo-daro is in Sindh."),
          f("The Indus Valley people were known for:", "Urban planning", ["Iron tools", "Gunpowder", "Paper making"], "They were known for urban planning."),
          f("Which ancient civilisation built the pyramids?", "Egyptian", ["Indus", "Chinese", "Mesopotamian"], "The Egyptians built the pyramids."),
          f("The Great Wall was built in:", "China", ["India", "Egypt", "Persia"], "The Great Wall is in China."),
          f("Mesopotamia is located between the:", "Tigris and Euphrates", ["Nile and Congo", "Indus and Ganges", "Amazon and Orinoco"], "Mesopotamia lies between the Tigris and Euphrates."),
        ],
      },
      {
        slug: "medieval-history",
        facts: [
          f("The Crusades began in:", "1096", ["1000", "1200", "1300"], "The Crusades began in 1096."),
          f("Genghis Khan founded the:", "Mongol Empire", ["Ottoman Empire", "Mughal Empire", "Roman Empire"], "Genghis Khan founded the Mongol Empire."),
          f("The Ottoman Empire was centred on:", "Turkey", ["Egypt", "Persia", "India"], "The Ottoman Empire centred on Turkey."),
          f("The Mughal Empire was founded by:", "Babur", ["Akbar", "Aurangzeb", "Shah Jahan"], "Babur founded the Mughal Empire."),
          f("The Battle of Panipat (1526) was won by:", "Babur", ["Ibrahim Lodi", "Akbar", "Sher Shah"], "Babur won at Panipat in 1526."),
          f("The Taj Mahal was built by:", "Shah Jahan", ["Akbar", "Aurangzeb", "Babur"], "Shah Jahan built the Taj Mahal."),
        ],
      },
      {
        slug: "world-wars",
        facts: [
          f("World War I began in:", "1914", ["1918", "1939", "1945"], "WWI began in 1914."),
          f("World War I ended in:", "1918", ["1914", "1939", "1945"], "WWI ended in 1918."),
          f("World War II began in:", "1939", ["1918", "1935", "1945"], "WWII began in 1939."),
          f("World War II ended in:", "1945", ["1939", "1942", "1950"], "WWII ended in 1945."),
          f("The Treaty of Versailles followed:", "World War I", ["World War II", "The Cold War", "The Crusades"], "Versailles followed WWI."),
          f("The atomic bomb was used in WWII on:", "Hiroshima and Nagasaki", ["Tokyo and Osaka", "Berlin and Munich", "Rome and Milan"], "Bombs fell on Hiroshima and Nagasaki."),
        ],
      },
      {
        slug: "islamic-history-advanced",
        facts: [
          f("The Battle of Tours was fought in:", "732 CE", ["600 CE", "900 CE", "1000 CE"], "The Battle of Tours was in 732 CE."),
          f("The Abbasid Caliphate was founded in:", "750 CE", ["600 CE", "900 CE", "1200 CE"], "The Abbasids were founded in 750 CE."),
          f("The Ottoman Empire captured Constantinople in:", "1453", ["1353", "1553", "1253"], "Constantinople fell in 1453."),
          f("The House of Wisdom was in:", "Baghdad", ["Cairo", "Damascus", "Cordoba"], "The House of Wisdom was in Baghdad."),
          f("Al-Andalus refers to Muslim rule in:", "Spain", ["Italy", "France", "Greece"], "Al-Andalus was Muslim Spain."),
          f("The Battle of Yarmouk was fought against the:", "Byzantines", ["Persians only", "Mongols", "Vikings"], "Yarmouk was against the Byzantines."),
        ],
      },
      {
        slug: "south-asian-history",
        facts: [
          f("The Mauryan Empire was founded by:", "Chandragupta Maurya", ["Ashoka", "Akbar", "Babur"], "Chandragupta Maurya founded the Mauryan Empire."),
          f("Ashoka was a ruler of the:", "Mauryan Empire", ["Mughal Empire", "Gupta Empire", "Maratha Empire"], "Ashoka ruled the Mauryan Empire."),
          f("The Gupta Empire is known as the:", "Golden Age of India", ["Dark Age", "Iron Age", "Bronze Age"], "The Gupta era is the Golden Age of India."),
          f("The Battle of Plassey was fought in:", "1757", ["1707", "1807", "1857"], "Plassey was in 1757."),
          f("The British East India Company was founded in:", "1600", ["1500", "1700", "1800"], "The East India Company was founded in 1600."),
          f("The partition of Bengal took place in:", "1905", ["1900", "1910", "1915"], "Bengal was partitioned in 1905."),
        ],
      },
      {
        slug: "revolutions",
        facts: [
          f("The French Revolution began in:", "1789", ["1776", "1799", "1815"], "The French Revolution began in 1789."),
          f("The American Revolution began in:", "1775", ["1789", "1765", "1800"], "The American Revolution began in 1775."),
          f("The Russian Revolution took place in:", "1917", ["1905", "1921", "1930"], "The Russian Revolution was in 1917."),
          f("The Industrial Revolution began in:", "Britain", ["France", "Germany", "USA"], "The Industrial Revolution began in Britain."),
          f("The Bastille was stormed in:", "1789", ["1776", "1799", "1815"], "The Bastille was stormed in 1789."),
          f("The American Declaration of Independence was signed in:", "1776", ["1775", "1789", "1800"], "Independence was declared in 1776."),
        ],
      },
    ],
  },

  /* ============================ Political Science ============================ */
  {
    slug: "political-science",
    topics: [
      {
        slug: "constitutions",
        facts: [
          f("A constitution is the:", "Fundamental law of a state", ["A tax law", "A trade rule", "A court order"], "A constitution is fundamental law."),
          f("A written constitution is:", "Codified in a single document", ["Based on custom only", "Unwritten", "Oral only"], "Written constitutions are codified."),
          f("The UK has a:", "Unwritten constitution", ["Written constitution", "No constitution", "A code only"], "The UK has an unwritten constitution."),
          f("A constitution limits the power of:", "Government", ["Citizens", "Courts only", "Media"], "Constitutions limit government power."),
          f("An amendment is a:", "Change to the constitution", ["New law only", "Court ruling", "Treaty"], "Amendments change the constitution."),
          f("A rigid constitution is one that is:", "Difficult to amend", ["Easy to amend", "Unwritten", "Temporary"], "Rigid constitutions are hard to amend."),
        ],
      },
      {
        slug: "political-systems",
        facts: [
          f("A parliamentary system is headed by a:", "Prime Minister", ["President", "King", "Governor"], "Parliamentary systems are led by a PM."),
          f("A presidential system is headed by a:", "President", ["Prime Minister", "Chancellor", "Speaker"], "Presidential systems are led by a President."),
          f("A unitary system has:", "One central government", ["Many sovereign states", "No government", "Only local bodies"], "Unitary systems have one central government."),
          f("A federal system divides power between:", "Central and regional governments", ["Courts and police", "Parties and voters", "Army and police"], "Federalism divides central and regional power."),
          f("A democracy is a system of government by:", "The people", ["One ruler", "The army", "The courts"], "Democracy is rule by the people."),
          f("A monarchy is ruled by a:", "King or Queen", ["President", "Prime Minister", "Speaker"], "Monarchies are ruled by a king or queen."),
        ],
      },
      {
        slug: "public-administration",
        facts: [
          f("Public administration is the implementation of:", "Government policy", ["Private profit", "Party politics", "Judicial review"], "Public administration implements policy."),
          f("A bureaucracy is a:", "System of officials", ["A political party", "A court", "An army"], "Bureaucracy is a system of officials."),
          f("Civil servants are:", "Government employees", ["Elected officials", "Judges", "Soldiers"], "Civil servants are government employees."),
          f("Accountability in administration means:", "Responsibility for actions", ["Secrecy", "Autonomy", "Immunity"], "Accountability means responsibility."),
          f("A ministry is headed by a:", "Minister", ["Judge", "Soldier", "Mayor"], "Ministries are headed by ministers."),
          f("New Public Management emphasises:", "Efficiency", ["Only tradition", "Only secrecy", "Only hierarchy"], "NPM emphasises efficiency."),
        ],
      },
      {
        slug: "international-politics",
        facts: [
          f("International politics studies:", "Relations among states", ["Only domestic affairs", "Only courts", "Only trade"], "It studies inter-state relations."),
          f("The UN Security Council has how many members?", "15", ["5", "10", "20"], "The Security Council has 15 members."),
          f("Diplomacy is the management of:", "Relations between states", ["Domestic trade", "Local elections", "Religious affairs"], "Diplomacy manages inter-state relations."),
          f("A superpower is a state with:", "Global influence", ["No influence", "Only regional influence", "No military"], "Superpowers have global influence."),
          f("The Cold War was between the US and the:", "Soviet Union", ["China", "Germany", "Japan"], "The Cold War was US–USSR."),
          f("Globalisation increases:", "Interdependence", ["Isolation", "Autarky", "Separation"], "Globalisation increases interdependence."),
        ],
      },
      {
        slug: "democracy",
        facts: [
          f("Democracy originated in:", "Greece", ["Rome", "Egypt", "China"], "Democracy originated in ancient Greece."),
          f("A key feature of democracy is:", "Free elections", ["Hereditary rule", "Military rule", "One-party rule"], "Free elections are key to democracy."),
          f("Universal suffrage means the right to vote for:", "All adults", ["Only men", "Only the rich", "Only the educated"], "Universal suffrage is for all adults."),
          f("The rule of law means:", "Everyone is equal before the law", ["The ruler is above the law", "Laws are optional", "Courts rule"], "The rule of law applies equally to all."),
          f("A referendum is a:", "Direct vote by the people", ["Court ruling", "Party decision", "Military order"], "A referendum is a direct vote."),
          f("Separation of powers divides government into:", "Three branches", ["Two branches", "One branch", "Four branches"], "Powers are divided into three branches."),
        ],
      },
    ],
  },

  /* ============================ Sociology / Psychology / Civics ============================ */
  {
    slug: "sociology",
    topics: [
      {
        slug: "social-institutions",
        facts: [
          f("Which is a social institution?", "Family", ["A machine", "A river", "A planet"], "The family is a social institution."),
          f("Education is a:", "Social institution", ["Natural resource", "Machine", "Weather system"], "Education is a social institution."),
          f("Religion is studied by sociologists as a:", "Social institution", ["Only belief", "Only ritual", "Only law"], "Religion is a social institution."),
          f("The family's main function is:", "Socialisation", ["Taxation", "Production only", "Defence"], "The family socialises members."),
          f("Economy as an institution organises:", "Production and distribution", ["Belief", "Marriage", "Law"], "The economy organises production."),
          f("Government as an institution provides:", "Order and governance", ["Marriage", "Belief", "Art"], "Government provides order."),
        ],
      },
      {
        slug: "culture-society",
        facts: [
          f("Culture includes:", "Beliefs, values and norms", ["Only food", "Only dress", "Only language"], "Culture includes beliefs, values and norms."),
          f("Norms are:", "Rules of behaviour", ["Natural laws", "Physical forces", "Weather patterns"], "Norms are rules of behaviour."),
          f("A value is a:", "Shared belief about what is good", ["A machine", "A river", "A planet"], "Values are shared beliefs."),
          f("Material culture includes:", "Objects and technology", ["Only ideas", "Only beliefs", "Only values"], "Material culture includes objects."),
          f("Non-material culture includes:", "Ideas and beliefs", ["Only tools", "Only buildings", "Only machines"], "Non-material culture is ideas."),
          f("Ethnocentrism is judging others by:", "One's own culture", ["Universal standards", "No standards", "Natural law"], "Ethnocentrism judges by one's own culture."),
        ],
      },
      {
        slug: "social-change",
        facts: [
          f("Social change refers to:", "Transformation of society", ["Stability only", "No change", "Reversal only"], "Social change is societal transformation."),
          f("Urbanisation is a form of:", "Social change", ["Natural law", "Physical force", "Weather"], "Urbanisation drives social change."),
          f("Technology drives:", "Social change", ["Only stability", "Only tradition", "Only custom"], "Technology drives social change."),
          f("Industrialisation led to:", "Urban society", ["Rural isolation", "Feudal order", "Tribal life"], "Industrialisation produced urban society."),
          f("Globalisation affects:", "Culture and economy", ["Only weather", "Only geology", "Only astronomy"], "Globalisation affects culture and economy."),
          f("A social movement aims at:", "Social change", ["Personal gain", "Weather control", "Geology"], "Social movements seek change."),
        ],
      },
      {
        slug: "social-problems",
        facts: [
          f("Poverty is a:", "Social problem", ["Natural resource", "Weather event", "Machine"], "Poverty is a social problem."),
          f("Unemployment is a:", "Social problem", ["Natural law", "Physical force", "Religion"], "Unemployment is a social problem."),
          f("Crime is studied by:", "Criminology", ["Astronomy", "Geology", "Botany"], "Criminology studies crime."),
          f("Illiteracy is a:", "Social problem", ["Natural resource", "Machine", "Planet"], "Illiteracy is a social problem."),
          f("Drug abuse is a:", "Social problem", ["Natural law", "Weather pattern", "Religion"], "Drug abuse is a social problem."),
          f("Gender inequality is a:", "Social problem", ["Natural law", "Physical force", "Astronomy"], "Gender inequality is a social problem."),
        ],
      },
    ],
  },
  {
    slug: "psychology",
    topics: [
      {
        slug: "developmental-psychology",
        facts: [
          f("Developmental psychology studies:", "Changes across the lifespan", ["Only childhood", "Only adulthood", "Only old age"], "It studies lifespan changes."),
          f("Piaget studied:", "Cognitive development", ["Personality", "Memory", "Emotion"], "Piaget studied cognitive development."),
          f("Erikson proposed stages of:", "Psychosocial development", ["Physical growth", "Motor skills", "Language only"], "Erikson proposed psychosocial stages."),
          f("Attachment theory was developed by:", "Bowlby", ["Piaget", "Freud", "Skinner"], "Bowlby developed attachment theory."),
          f("The sensorimotor stage belongs to:", "Piaget", ["Erikson", "Freud", "Bowlby"], "Piaget's first stage is sensorimotor."),
          f("Adolescence is the stage between:", "Childhood and adulthood", ["Birth and infancy", "Adulthood and old age", "Infancy and childhood"], "Adolescence bridges childhood and adulthood."),
        ],
      },
      {
        slug: "cognitive-psychology",
        facts: [
          f("Cognitive psychology studies:", "Mental processes", ["Only behaviour", "Only biology", "Only society"], "Cognitive psychology studies mental processes."),
          f("Memory is the ability to:", "Store and recall information", ["Move muscles", "Digest food", "Pump blood"], "Memory stores and recalls information."),
          f("Short-term memory holds information for:", "A brief period", ["A lifetime", "A year", "A month"], "Short-term memory is brief."),
          f("Attention is the process of:", "Focusing on information", ["Sleeping", "Digesting", "Breathing"], "Attention focuses on information."),
          f("Problem solving involves:", "Finding solutions", ["Only recall", "Only perception", "Only emotion"], "Problem solving finds solutions."),
          f("Language processing occurs in the:", "Brain", ["Heart", "Liver", "Kidney"], "Language processing occurs in the brain."),
        ],
      },
      {
        slug: "clinical-psychology",
        facts: [
          f("Clinical psychology deals with:", "Mental health", ["Only education", "Only business", "Only sports"], "Clinical psychology addresses mental health."),
          f("Depression is a:", "Mood disorder", ["Physical injury", "Virus", "Bacteria"], "Depression is a mood disorder."),
          f("Anxiety is characterised by:", "Excessive worry", ["Lack of emotion", "Physical strength", "Sound sleep"], "Anxiety involves excessive worry."),
          f("Psychotherapy treats:", "Mental health conditions", ["Broken bones", "Infections", "Wounds"], "Psychotherapy treats mental conditions."),
          f("CBT stands for:", "Cognitive Behavioural Therapy", ["Clinical Behavioural Treatment", "Cognitive Basic Training", "Central Behavioural Therapy"], "CBT is Cognitive Behavioural Therapy."),
          f("A phobia is an:", "Irrational fear", ["Rational fear", "Physical illness", "Infection"], "A phobia is an irrational fear."),
        ],
      },
      {
        slug: "social-psychology",
        facts: [
          f("Social psychology studies:", "How people influence each other", ["Only individuals alone", "Only biology", "Only chemistry"], "Social psychology studies interpersonal influence."),
          f("Conformity is:", "Adjusting to group norms", ["Resisting norms", "Ignoring others", "Isolation"], "Conformity adjusts to group norms."),
          f("Obedience studies were conducted by:", "Milgram", ["Piaget", "Freud", "Skinner"], "Milgram studied obedience."),
          f("Attitudes are:", "Evaluations of objects", ["Physical traits", "Infections", "Machines"], "Attitudes are evaluations."),
          f("Prejudice is:", "A preconceived opinion", ["An accurate judgement", "A physical trait", "An infection"], "Prejudice is a preconceived opinion."),
          f("Groupthink is a:", "Flawed group decision process", ["Individual decision", "Physical process", "Infection"], "Groupthink is a flawed group process."),
        ],
      },
    ],
  },
  {
    slug: "civics",
    topics: [
      {
        slug: "citizenship",
        facts: [
          f("A citizen is a:", "Legal member of a state", ["Visitor", "Tourist", "Foreigner"], "A citizen is a legal member of a state."),
          f("Citizenship can be acquired by:", "Birth or naturalisation", ["Tourism", "Travel", "Trade"], "Citizenship is by birth or naturalisation."),
          f("Dual citizenship means holding:", "Two nationalities", ["No nationality", "Three nationalities", "One nationality"], "Dual citizenship means two nationalities."),
          f("A citizen has:", "Rights and duties", ["Only rights", "Only duties", "Neither"], "Citizens have rights and duties."),
          f("Civic responsibility includes:", "Voting", ["Ignoring laws", "Avoiding taxes", "Breaking rules"], "Voting is a civic responsibility."),
          f("Nationality is a:", "Legal status", ["Physical trait", "Religious belief", "Occupation"], "Nationality is a legal status."),
        ],
      },
      {
        slug: "rights-duties",
        facts: [
          f("Human rights are:", "Basic entitlements of all people", ["Privileges for the rich", "Optional benefits", "Gifts"], "Human rights are basic entitlements."),
          f("The right to education is a:", "Fundamental right", ["Privilege", "Luxury", "Optional benefit"], "Education is a fundamental right."),
          f("Duties of a citizen include:", "Obeying the law", ["Ignoring the law", "Avoiding taxes", "Breaking rules"], "Obeying the law is a duty."),
          f("The Universal Declaration of Human Rights was adopted in:", "1948", ["1945", "1950", "1960"], "The UDHR was adopted in 1948."),
          f("Freedom of speech is a:", "Fundamental right", ["Privilege", "Luxury", "Optional benefit"], "Free speech is a fundamental right."),
          f("The right to vote is a:", "Political right", ["Social privilege", "Luxury", "Optional benefit"], "Voting is a political right."),
        ],
      },
      {
        slug: "civic-institutions",
        facts: [
          f("A civic institution includes:", "Local government", ["A private club", "A company", "A shop"], "Local government is a civic institution."),
          f("The police are responsible for:", "Law enforcement", ["Taxation", "Education", "Health"], "Police enforce the law."),
          f("Courts are responsible for:", "Administering justice", ["Collecting taxes", "Building roads", "Running schools"], "Courts administer justice."),
          f("Municipalities manage:", "Local services", ["National defence", "Foreign policy", "Currency"], "Municipalities manage local services."),
          f("Civil society includes:", "NGOs and community groups", ["Only government", "Only courts", "Only police"], "Civil society includes NGOs."),
          f("The civil service implements:", "Government policy", ["Only court orders", "Only laws", "Only taxes"], "The civil service implements policy."),
        ],
      },
    ],
  },

  /* ============================ Economics / Education / Media ============================ */
  {
    slug: "economics",
    topics: [
      {
        slug: "macroeconomics",
        facts: [
          f("Macroeconomics studies:", "The economy as a whole", ["Individual firms", "Single markets", "One consumer"], "Macroeconomics studies the whole economy."),
          f("GDP measures:", "Total output of an economy", ["One firm's profit", "A household's income", "A single price"], "GDP measures total output."),
          f("Inflation is a:", "General rise in prices", ["Fall in prices", "Rise in unemployment", "Fall in income"], "Inflation is rising prices."),
          f("Unemployment rate measures:", "Share of jobless workers", ["Share of students", "Share of retirees", "Share of tourists"], "It measures jobless workers."),
          f("Fiscal policy uses:", "Government spending and taxes", ["Only interest rates", "Only money supply", "Only trade"], "Fiscal policy uses spending and taxes."),
          f("Monetary policy is controlled by the:", "Central bank", ["Parliament", "Courts", "Army"], "Monetary policy is set by the central bank."),
        ],
      },
      {
        slug: "development-economics",
        facts: [
          f("Development economics studies:", "Economic growth and welfare", ["Only prices", "Only trade", "Only money"], "It studies growth and welfare."),
          f("The Human Development Index measures:", "Development beyond income", ["Only income", "Only trade", "Only population"], "HDI measures development beyond income."),
          f("Poverty line defines:", "Minimum income for basic needs", ["Maximum income", "Average income", "Median income"], "The poverty line is a minimum income."),
          f("Sustainable development balances:", "Growth and environment", ["Only growth", "Only environment", "Only trade"], "It balances growth and environment."),
          f("Foreign aid is:", "Assistance from other countries", ["Domestic tax", "Local trade", "Private profit"], "Foreign aid comes from other countries."),
          f("Human capital refers to:", "Skills and knowledge of people", ["Machines", "Buildings", "Land"], "Human capital is people's skills."),
        ],
      },
      {
        slug: "economy",
        facts: [
          f("An economy is a system of:", "Production and consumption", ["Only trade", "Only money", "Only prices"], "An economy produces and consumes."),
          f("A market economy relies on:", "Supply and demand", ["Central planning", "Government orders", "Custom only"], "Market economies rely on supply and demand."),
          f("A command economy is controlled by:", "The government", ["Firms", "Consumers", "Trade unions"], "Command economies are government-controlled."),
          f("A mixed economy combines:", "Market and state", ["Only market", "Only state", "Neither"], "Mixed economies combine market and state."),
          f("Economic growth is measured by:", "Rising GDP", ["Falling GDP", "Rising unemployment", "Falling income"], "Growth is measured by rising GDP."),
          f("A trade deficit occurs when imports:", "Exceed exports", ["Are less than exports", "Equal exports", "Are zero"], "A deficit means imports exceed exports."),
        ],
      },
      {
        slug: "public-finance",
        facts: [
          f("Public finance deals with:", "Government revenue and spending", ["Only private profit", "Only trade", "Only prices"], "Public finance covers government finance."),
          f("A budget is a plan for:", "Revenue and expenditure", ["Only revenue", "Only expenditure", "Only trade"], "A budget plans revenue and expenditure."),
          f("A budget deficit occurs when spending:", "Exceeds revenue", ["Is less than revenue", "Equals revenue", "Is zero"], "A deficit means spending exceeds revenue."),
          f("Taxes are a source of:", "Government revenue", ["Private profit", "Trade", "Prices"], "Taxes provide government revenue."),
          f("Public debt is money borrowed by:", "The government", ["Firms", "Households", "Banks only"], "Public debt is government borrowing."),
          f("Fiscal policy is managed by the:", "Government", ["Central bank only", "Courts", "Army"], "Fiscal policy is managed by the government."),
        ],
      },
    ],
  },
  {
    slug: "education",
    topics: [
      {
        slug: "curriculum",
        facts: [
          f("A curriculum is a:", "Plan of study", ["A textbook", "A test", "A classroom"], "A curriculum is a plan of study."),
          f("Curriculum development involves:", "Designing learning experiences", ["Only testing", "Only grading", "Only teaching"], "It designs learning experiences."),
          f("The syllabus is a:", "List of topics to cover", ["A school", "A teacher", "A test"], "A syllabus lists topics."),
          f("Bloom's taxonomy classifies:", "Learning objectives", ["Schools", "Teachers", "Students only"], "Bloom's taxonomy classifies objectives."),
          f("A hidden curriculum is:", "Unintended learning", ["A formal plan", "A textbook", "A test"], "The hidden curriculum is unintended learning."),
          f("Curriculum evaluation assesses:", "Effectiveness", ["Cost only", "Length only", "Colour only"], "Curriculum evaluation assesses effectiveness."),
        ],
      },
      {
        slug: "educational-psychology",
        facts: [
          f("Educational psychology studies:", "Learning and teaching", ["Only buildings", "Only finance", "Only policy"], "It studies learning and teaching."),
          f("Learning is a relatively permanent change in:", "Behaviour", ["Height", "Colour", "Weight"], "Learning changes behaviour."),
          f("Classical conditioning was studied by:", "Pavlov", ["Skinner", "Piaget", "Erikson"], "Pavlov studied classical conditioning."),
          f("Operant conditioning was studied by:", "Skinner", ["Pavlov", "Piaget", "Bowlby"], "Skinner studied operant conditioning."),
          f("Motivation affects:", "Learning", ["Height", "Colour", "Weight"], "Motivation affects learning."),
          f("Piaget studied:", "Cognitive development", ["Only emotion", "Only memory", "Only language"], "Piaget studied cognitive development."),
        ],
      },
      {
        slug: "assessment",
        facts: [
          f("Assessment measures:", "Student learning", ["School building", "Teacher salary", "Transport"], "Assessment measures learning."),
          f("Formative assessment occurs:", "During learning", ["Only at the end", "Never", "Only at the start"], "Formative assessment is ongoing."),
          f("Summative assessment occurs:", "At the end of learning", ["During learning", "Never", "Only at the start"], "Summative assessment is at the end."),
          f("A rubric is a:", "Scoring guide", ["Textbook", "Test paper", "Classroom"], "A rubric is a scoring guide."),
          f("Validity of a test means it measures:", "What it intends to", ["Anything", "Nothing", "Only speed"], "Validity means measuring the intended construct."),
          f("Reliability of a test means:", "Consistency", ["Accuracy only", "Speed", "Difficulty"], "Reliability means consistency."),
        ],
      },
      {
        slug: "educational-management",
        facts: [
          f("Educational management involves:", "Running educational institutions", ["Only teaching", "Only testing", "Only grading"], "It involves managing institutions."),
          f("A head teacher is responsible for:", "School leadership", ["Only teaching one class", "Only cleaning", "Only transport"], "Head teachers lead schools."),
          f("School inspection ensures:", "Quality standards", ["Profit", "Speed", "Colour"], "Inspection ensures quality."),
          f("Staff development improves:", "Teacher skills", ["Building colour", "Transport", "Canteen food"], "Staff development improves skills."),
          f("A timetable organises:", "Class schedules", ["Salaries", "Transport", "Buildings"], "Timetables organise schedules."),
          f("Budgeting in education allocates:", "Resources", ["Grades", "Tests", "Curricula"], "Budgeting allocates resources."),
        ],
      },
      {
        slug: "philosophy-of-education",
        facts: [
          f("Philosophy of education studies:", "Aims and nature of education", ["Only methods", "Only tests", "Only buildings"], "It studies the aims of education."),
          f("Idealism in education emphasises:", "Ideas and values", ["Only matter", "Only money", "Only machines"], "Idealism emphasises ideas."),
          f("Pragmatism in education emphasises:", "Experience and practice", ["Only theory", "Only memory", "Only authority"], "Pragmatism emphasises experience."),
          f("Realism in education emphasises:", "The objective world", ["Only ideas", "Only feelings", "Only faith"], "Realism emphasises the objective world."),
          f("John Dewey is associated with:", "Pragmatism", ["Idealism", "Realism", "Existentialism"], "Dewey is associated with pragmatism."),
          f("Education for all aims at:", "Universal access", ["Elite access", "No access", "Restricted access"], "Education for all means universal access."),
        ],
      },
    ],
  },
  {
    slug: "mass-communication",
    topics: [
      {
        slug: "media-theory",
        facts: [
          f("Media theory studies:", "How media affects society", ["Only printing", "Only cameras", "Only microphones"], "It studies media effects on society."),
          f("The 'agenda-setting' function means media:", "Shapes what issues matter", ["Only entertains", "Only informs", "Only advertises"], "Agenda-setting shapes issue importance."),
          f("Marshall McLuhan said 'the medium is the':", "Message", ["Market", "Method", "Medium"], "McLuhan said the medium is the message."),
          f("Gatekeeping refers to:", "Controlling information flow", ["Opening doors", "Selling ads", "Printing books"], "Gatekeeping controls information flow."),
          f("Two-step flow theory involves:", "Opinion leaders", ["Only editors", "Only advertisers", "Only cameras"], "Two-step flow involves opinion leaders."),
          f("Framing in media means:", "Presenting information in a context", ["Building frames", "Selling ads", "Printing"], "Framing presents information in context."),
        ],
      },
      {
        slug: "print-media",
        facts: [
          f("Print media includes:", "Newspapers and magazines", ["TV and radio", "Internet only", "Films"], "Print media includes newspapers and magazines."),
          f("A headline is:", "The title of a news story", ["The body text", "A photograph", "An advertisement"], "A headline titles a news story."),
          f("A byline names the:", "Author of an article", ["Editor", "Reader", "Advertiser"], "A byline names the author."),
          f("An editorial expresses:", "The newspaper's opinion", ["A reporter's view", "A reader's view", "An advertiser's view"], "Editorials express the paper's opinion."),
          f("Circulation refers to:", "Number of copies sold", ["Number of pages", "Number of staff", "Number of ads"], "Circulation is copies sold."),
          f("A column is a:", "Regular opinion piece", ["A news report", "A photograph", "An advertisement"], "A column is a regular opinion piece."),
        ],
      },
      {
        slug: "electronic-media",
        facts: [
          f("Electronic media includes:", "TV and radio", ["Newspapers only", "Magazines only", "Books only"], "Electronic media includes TV and radio."),
          f("A broadcast reaches:", "A wide audience", ["One person", "No one", "Only editors"], "Broadcasts reach wide audiences."),
          f("A documentary presents:", "Factual information", ["Fiction only", "Only drama", "Only comedy"], "Documentaries present facts."),
          f("A talk show features:", "Discussion", ["Only music", "Only drama", "Only news"], "Talk shows feature discussion."),
          f("Prime time is:", "Peak viewing hours", ["Off-peak hours", "Night hours only", "Morning hours"], "Prime time is peak viewing."),
          f("A news anchor:", "Presents news", ["Writes novels", "Sells ads", "Directs films"], "News anchors present news."),
        ],
      },
      {
        slug: "advertising-pr",
        facts: [
          f("Advertising aims to:", "Promote products", ["Inform only", "Educate only", "Entertain only"], "Advertising promotes products."),
          f("PR stands for:", "Public Relations", ["Private Relations", "Public Revenue", "Press Release"], "PR is Public Relations."),
          f("A press release is issued to:", "Announce news", ["Sell products", "Collect taxes", "Print books"], "Press releases announce news."),
          f("A target audience is:", "The intended recipients", ["All people", "No one", "Only staff"], "A target audience is intended recipients."),
          f("Brand awareness is created by:", "Advertising", ["Taxation", "Legislation", "Census"], "Advertising creates brand awareness."),
          f("A slogan is a:", "Memorable phrase", ["Long essay", "Photograph", "Contract"], "A slogan is a memorable phrase."),
        ],
      },
      {
        slug: "media-law-ethics",
        facts: [
          f("Media ethics govern:", "Journalistic conduct", ["Only printing", "Only broadcasting", "Only advertising"], "Media ethics govern conduct."),
          f("Defamation is:", "Damaging someone's reputation", ["Praising someone", "Informing the public", "Advertising"], "Defamation damages reputation."),
          f("Freedom of the press is a:", "Democratic right", ["Privilege", "Luxury", "Optional benefit"], "Press freedom is a democratic right."),
          f("Libel is defamation in:", "Written form", ["Spoken form", "Musical form", "Visual form"], "Libel is written defamation."),
          f("Slander is defamation in:", "Spoken form", ["Written form", "Printed form", "Filmed form"], "Slander is spoken defamation."),
          f("The right to privacy limits:", "Media intrusion", ["Media freedom only", "Advertising", "Broadcasting"], "Privacy limits media intrusion."),
        ],
      },
      {
        slug: "digital-media",
        facts: [
          f("Digital media includes:", "Online content", ["Only newspapers", "Only radio", "Only TV"], "Digital media includes online content."),
          f("Social media enables:", "User interaction", ["Only broadcasting", "Only printing", "Only editing"], "Social media enables interaction."),
          f("A blog is a:", "Web log", ["A newspaper", "A radio show", "A film"], "A blog is a web log."),
          f("Clickbait aims to:", "Attract clicks", ["Inform accurately", "Educate", "Entertain only"], "Clickbait attracts clicks."),
          f("Viral content spreads:", "Rapidly online", ["Slowly", "Never", "Only offline"], "Viral content spreads rapidly."),
          f("Fake news is:", "False information", ["Verified news", "Breaking news", "Old news"], "Fake news is false information."),
        ],
      },
    ],
  },

  /* ============================ Law / Accounting / Business ============================ */
  {
    slug: "law",
    topics: [
      {
        slug: "jurisprudence",
        facts: [
          f("Jurisprudence is the study of:", "Legal theory", ["Legal practice only", "Court procedure", "Legal history"], "Jurisprudence is legal theory."),
          f("Natural law theory links law and:", "Morality", ["Power", "Custom", "Economy"], "Natural law links law and morality."),
          f("Legal positivism holds law is:", "What authority enacts", ["Only morality", "Only custom", "Only religion"], "Positivism ties law to authority."),
          f("Austin is associated with:", "Legal positivism", ["Natural law", "Realism", "Sociology"], "Austin is a legal positivist."),
          f("Sociological jurisprudence studies:", "Law and society", ["Only statutes", "Only morality", "Only religion"], "It studies law in society."),
          f("Legal realism focuses on:", "How law works in practice", ["Only theory", "Only morality", "Only religion"], "Realism studies law in practice."),
        ],
      },
      {
        slug: "criminal-law",
        facts: [
          f("Criminal law deals with:", "Offences against society", ["Contracts", "Property sales", "Torts only"], "Criminal law deals with offences."),
          f("The prosecution must prove guilt:", "Beyond reasonable doubt", ["On balance of probabilities", "By hearsay", "By opinion"], "Criminal guilt is proved beyond reasonable doubt."),
          f("An accused is presumed:", "Innocent", ["Guilty", "Liable", "Negligent"], "Accused are presumed innocent."),
          f("Mens rea means:", "Guilty mind", ["Guilty act", "Punishment", "Witness"], "Mens rea is the guilty mind."),
          f("Actus reus means:", "Guilty act", ["Guilty mind", "Punishment", "Witness"], "Actus reus is the guilty act."),
          f("A punishment aims to:", "Deter and reform", ["Reward", "Entertain", "Educate only"], "Punishment deters and reforms."),
        ],
      },
      {
        slug: "civil-law",
        facts: [
          f("Civil law deals with:", "Disputes between individuals", ["Crimes only", "Constitutional matters only", "Tax only"], "Civil law deals with private disputes."),
          f("A tort is a:", "Civil wrong", ["Criminal offence", "Contract", "Statute"], "A tort is a civil wrong."),
          f("Damages are:", "Monetary compensation", ["Imprisonment", "Fines", "Warnings"], "Damages are monetary compensation."),
          f("A contract is a:", "Legally binding agreement", ["A crime", "A tort", "A statute"], "A contract is a binding agreement."),
          f("Negligence involves:", "Breach of duty of care", ["Intentional harm", "Criminal intent", "Fraud only"], "Negligence is a breach of duty of care."),
          f("The standard of proof in civil cases is:", "Balance of probabilities", ["Beyond reasonable doubt", "Absolute certainty", "Hearsay"], "Civil cases use balance of probabilities."),
        ],
      },
      {
        slug: "islamic-law",
        facts: [
          f("Islamic law is called:", "Shariah", ["Fiqh only", "Hadith", "Tafsir"], "Islamic law is Shariah."),
          f("The primary sources of Islamic law are the Quran and:", "Sunnah", ["Ijma", "Qiyas", "Urf"], "Quran and Sunnah are primary sources."),
          f("Hadd punishments are prescribed:", "In the Quran", ["By courts", "By custom", "By parliament"], "Hadd punishments are Quranically prescribed."),
          f("Qisas refers to:", "Retaliation", ["Charity", "Trade", "Marriage"], "Qisas is retaliation."),
          f("Diyat is:", "Blood money", ["Charity", "Trade", "Tax"], "Diyat is blood money."),
          f("Tazir punishments are:", "Discretionary", ["Fixed in the Quran", "Abolished", "Optional"], "Tazir punishments are discretionary."),
        ],
      },
      {
        slug: "international-law-law",
        facts: [
          f("International law governs:", "Relations between states", ["Domestic crime", "Local trade", "Family matters"], "International law governs states."),
          f("The ICJ is located in:", "The Hague", ["New York", "Geneva", "Paris"], "The ICJ sits in The Hague."),
          f("The Geneva Conventions govern:", "War conduct", ["Trade", "Environment", "Culture"], "The Geneva Conventions govern war conduct."),
          f("Sovereignty means:", "Supreme territorial authority", ["UN membership", "Trade rights", "Military aid"], "Sovereignty is supreme authority."),
          f("A treaty is a:", "Formal agreement between states", ["Domestic law", "Speech", "Newspaper"], "A treaty is a formal agreement."),
          f("The UDHR was adopted in:", "1948", ["1945", "1950", "1960"], "The UDHR was adopted in 1948."),
        ],
      },
      {
        slug: "legal-reasoning",
        facts: [
          f("Legal reasoning applies:", "Rules to facts", ["Emotion to law", "Custom to trade", "Opinion to policy"], "Legal reasoning applies rules to facts."),
          f("Precedent is a:", "Previous court decision", ["A statute", "A treaty", "A contract"], "Precedent is a previous decision."),
          f("Stare decisis means:", "Standing by decided cases", ["Free decision", "New law", "Appeal"], "Stare decisis means following precedent."),
          f("Statutory interpretation clarifies:", "The meaning of laws", ["Court fees", "Legal aid", "Bar rules"], "It clarifies the meaning of laws."),
          f("Analogical reasoning in law uses:", "Similar cases", ["Unrelated cases", "Only statutes", "Only custom"], "Analogical reasoning uses similar cases."),
          f("Ratio decidendi is the:", "Reason for a decision", ["The dissent", "The obiter", "The appeal"], "Ratio decidendi is the reason for a decision."),
        ],
      },
    ],
  },
  {
    slug: "accounting",
    topics: [
      {
        slug: "management-accounting",
        facts: [
          f("Management accounting helps:", "Internal decision-making", ["External reporting only", "Tax filing only", "Auditing only"], "Management accounting aids internal decisions."),
          f("A budget is a:", "Financial plan", ["A tax return", "An audit report", "A balance sheet"], "A budget is a financial plan."),
          f("Variance analysis compares:", "Actual and budgeted results", ["Assets and liabilities", "Debits and credits", "Cash and bank"], "Variance analysis compares actual and budgeted."),
          f("Contribution margin is:", "Sales less variable costs", ["Sales less fixed costs", "Total sales", "Total costs"], "Contribution margin is sales less variable costs."),
          f("Break-even analysis finds:", "The point of no profit or loss", ["Maximum profit", "Maximum loss", "Total revenue"], "Break-even is no profit or loss."),
          f("A standard cost is a:", "Predetermined cost", ["Actual cost", "Sunk cost", "Opportunity cost"], "A standard cost is predetermined."),
        ],
      },
      {
        slug: "auditing",
        facts: [
          f("An audit is a:", "Independent examination of accounts", ["Tax filing", "Budget", "Loan"], "An audit examines accounts independently."),
          f("An auditor's report provides:", "An opinion on financial statements", ["A profit figure", "A tax rate", "A budget"], "Auditors give an opinion."),
          f("Internal audit is conducted by:", "The organisation itself", ["External firms only", "Tax authorities", "Banks"], "Internal audit is done internally."),
          f("Audit evidence must be:", "Sufficient and appropriate", ["Optional", "Verbal only", "Estimated"], "Audit evidence must be sufficient and appropriate."),
          f("Materiality in auditing refers to:", "Significance of an item", ["Physical weight", "Colour", "Age"], "Materiality is an item's significance."),
          f("Fraud detection is part of:", "Auditing", ["Budgeting", "Pricing", "Advertising"], "Fraud detection is part of auditing."),
        ],
      },
      {
        slug: "taxation",
        facts: [
          f("Income tax is levied on:", "Income", ["Goods only", "Property only", "Imports only"], "Income tax is on income."),
          f("Sales tax is levied on:", "Sales of goods", ["Income", "Property", "Wealth"], "Sales tax is on sales of goods."),
          f("In Pakistan, sales tax is collected by:", "FBR", ["SBP", "SECP", "NAB"], "FBR collects sales tax."),
          f("A progressive tax is one where the rate:", "Rises with income", ["Falls with income", "Is fixed", "Is zero"], "Progressive tax rates rise with income."),
          f("A regressive tax is one where the rate:", "Falls as income rises", ["Rises with income", "Is fixed", "Is zero"], "Regressive taxes fall as income rises."),
          f("Tax evasion is:", "Illegal non-payment", ["Legal planning", "A refund", "A credit"], "Tax evasion is illegal."),
        ],
      },
      {
        slug: "bookkeeping",
        facts: [
          f("Bookkeeping records:", "Financial transactions", ["Only profits", "Only losses", "Only taxes"], "Bookkeeping records transactions."),
          f("The double-entry system records:", "Two aspects of each transaction", ["One aspect", "Three aspects", "No aspects"], "Double entry records two aspects."),
          f("A ledger is a:", "Book of accounts", ["A receipt", "An invoice", "A cheque"], "A ledger is a book of accounts."),
          f("A journal is a:", "Book of original entry", ["Final accounts", "Balance sheet", "Ledger"], "A journal is the book of original entry."),
          f("Debit and credit must:", "Balance", ["Differ", "Be ignored", "Be equal to zero"], "Debits and credits must balance."),
          f("A trial balance checks:", "Arithmetic accuracy", ["Profit only", "Tax only", "Audit only"], "A trial balance checks arithmetic accuracy."),
        ],
      },
    ],
  },
  {
    slug: "business-administration",
    topics: [
      {
        slug: "marketing",
        facts: [
          f("The marketing mix consists of the:", "4 Ps", ["3 Ps", "5 Ps", "6 Ps"], "The marketing mix is the 4 Ps."),
          f("The 4 Ps are Product, Price, Place and:", "Promotion", ["People", "Process", "Physical evidence"], "The fourth P is Promotion."),
          f("Market segmentation divides a market into:", "Groups", ["Products", "Prices", "Places"], "Segmentation divides markets into groups."),
          f("A target market is a:", "Chosen customer group", ["All customers", "No customers", "Only competitors"], "A target market is the chosen group."),
          f("Branding creates:", "Identity and recognition", ["Only price", "Only place", "Only product"], "Branding creates identity."),
          f("Marketing aims to:", "Satisfy customer needs", ["Only sell", "Only advertise", "Only price"], "Marketing satisfies customer needs."),
        ],
      },
      {
        slug: "organizational-behaviour",
        facts: [
          f("Organisational behaviour studies:", "Behaviour in organisations", ["Only markets", "Only products", "Only finance"], "It studies behaviour in organisations."),
          f("Motivation influences:", "Employee performance", ["Product colour", "Office location", "Company name"], "Motivation influences performance."),
          f("Leadership is the ability to:", "Influence others", ["Sell products", "Set prices", "Audit accounts"], "Leadership influences others."),
          f("Organisational culture is:", "Shared values and norms", ["Office furniture", "Company logo", "Product design"], "Culture is shared values and norms."),
          f("Teamwork improves:", "Productivity", ["Conflict only", "Costs only", "Absenteeism"], "Teamwork improves productivity."),
          f("Job satisfaction affects:", "Retention", ["Product colour", "Office location", "Company name"], "Job satisfaction affects retention."),
        ],
      },
      {
        slug: "human-resource-management",
        facts: [
          f("HRM deals with:", "Managing people at work", ["Only finance", "Only marketing", "Only production"], "HRM manages people at work."),
          f("Recruitment is the process of:", "Attracting candidates", ["Firing staff", "Paying wages", "Training only"], "Recruitment attracts candidates."),
          f("Selection involves:", "Choosing the best candidate", ["Advertising", "Paying", "Firing"], "Selection chooses the best candidate."),
          f("Training improves:", "Employee skills", ["Product colour", "Office location", "Company name"], "Training improves skills."),
          f("Performance appraisal evaluates:", "Employee performance", ["Product design", "Office rent", "Company logo"], "Appraisals evaluate performance."),
          f("Compensation includes:", "Wages and benefits", ["Only wages", "Only benefits", "Only bonuses"], "Compensation includes wages and benefits."),
        ],
      },
      {
        slug: "business-ethics",
        facts: [
          f("Business ethics concerns:", "Moral conduct in business", ["Only profit", "Only law", "Only trade"], "Business ethics concerns moral conduct."),
          f("Corporate social responsibility means:", "Businesses contributing to society", ["Maximising profit only", "Ignoring society", "Avoiding taxes"], "CSR means contributing to society."),
          f("A conflict of interest should be:", "Disclosed", ["Hidden", "Ignored", "Encouraged"], "Conflicts of interest should be disclosed."),
          f("Whistleblowing reports:", "Unethical practices", ["Good practices", "Routine work", "Profits"], "Whistleblowing reports wrongdoing."),
          f("Fair trade aims at:", "Ethical trading", ["Maximum profit", "Exploitation", "Monopoly"], "Fair trade promotes ethical trading."),
          f("Sustainability in business means:", "Long-term responsibility", ["Short-term profit only", "Ignoring the environment", "Maximising waste"], "Sustainability is long-term responsibility."),
        ],
      },
      {
        slug: "entrepreneurship",
        facts: [
          f("An entrepreneur is a person who:", "Starts a business", ["Works for wages", "Retires early", "Avoids risk"], "Entrepreneurs start businesses."),
          f("A business plan is a:", "Roadmap for a business", ["A tax return", "An audit", "A loan"], "A business plan is a roadmap."),
          f("Start-up capital is:", "Initial funding", ["Profit", "Loss", "Tax"], "Start-up capital is initial funding."),
          f("Risk-taking is a key trait of:", "Entrepreneurs", ["Employees", "Auditors", "Customers"], "Risk-taking is key for entrepreneurs."),
          f("Innovation helps a business to:", "Grow", ["Decline", "Stagnate", "Fail"], "Innovation drives growth."),
          f("Venture capital funds:", "Start-ups", ["Government only", "Retirees", "Charities"], "Venture capital funds start-ups."),
        ],
      },
    ],
  },

  /* ============================ Analytical Reasoning ============================ */
  {
    slug: "analytical-reasoning",
    topics: [
      {
        slug: "blood-relations",
        facts: [
          f("If A is B's father and B is C's brother, then A is C's:", "Father", ["Brother", "Uncle", "Son"], "A is C's father."),
          f("A's mother is B's sister. B is A's:", "Uncle or aunt", ["Father", "Brother", "Son"], "B is A's uncle or aunt."),
          f("If X is the son of Y and Y is the daughter of Z, then X is Z's:", "Grandson", ["Son", "Nephew", "Brother"], "X is Z's grandson."),
          f("Pointing to a photo, a man says 'She is my mother's daughter'. She is his:", "Sister", ["Mother", "Aunt", "Daughter"], "Mother's daughter is his sister."),
          f("If P is Q's brother and R is Q's mother, then R is P's:", "Mother", ["Sister", "Aunt", "Daughter"], "R is P's mother."),
          f("A is B's wife. B is C's son. A is C's:", "Daughter-in-law", ["Daughter", "Sister", "Niece"], "A is C's daughter-in-law."),
        ],
      },
      {
        slug: "syllogisms",
        facts: [
          f("All cats are animals. All animals breathe. Therefore:", "All cats breathe", ["No cats breathe", "Some cats breathe only", "Cannot be determined"], "All cats breathe."),
          f("All roses are flowers. Some flowers fade. Therefore:", "Some roses may fade", ["All roses fade", "No roses fade", "Roses are not flowers"], "Some roses may fade."),
          f("No fish are birds. Some birds fly. Therefore:", "No fish fly (from given premises)", ["All fish fly", "Some fish fly", "All birds are fish"], "The premises do not imply fish fly."),
          f("All students are learners. Ali is a student. Therefore:", "Ali is a learner", ["Ali is not a learner", "Ali may not be a learner", "Ali is a teacher"], "Ali is a learner."),
          f("Some books are novels. All novels are fiction. Therefore:", "Some books are fiction", ["All books are fiction", "No books are fiction", "All fiction are books"], "Some books are fiction."),
          f("All metals conduct electricity. Copper is a metal. Therefore:", "Copper conducts electricity", ["Copper does not conduct", "Copper may not conduct", "Copper is not a metal"], "Copper conducts electricity."),
        ],
      },
      {
        slug: "data-sufficiency",
        facts: [
          f("Data sufficiency questions ask whether the given data is:", "Enough to answer the question", ["Always insufficient", "Always sufficient", "Irrelevant"], "Data sufficiency tests if data suffices."),
          f("In data sufficiency, you should:", "Decide sufficiency, not solve fully", ["Always solve fully", "Ignore statements", "Guess"], "You decide sufficiency, not solve."),
          f("Statement (1) alone is sufficient if it:", "Answers the question by itself", ["Needs statement 2", "Is irrelevant", "Contradicts the question"], "Statement 1 alone answers the question."),
          f("If neither statement alone suffices but together they do:", "Both together are sufficient", ["Neither is sufficient", "Only 1 suffices", "Only 2 suffices"], "Together they are sufficient."),
          f("Data sufficiency avoids:", "Unnecessary calculation", ["Reading", "Thinking", "Logic"], "It avoids unnecessary calculation."),
          f("A statement is sufficient if it gives:", "A unique answer", ["Many answers", "No answer", "An irrelevant fact"], "Sufficiency requires a unique answer."),
        ],
      },
      {
        slug: "clock-calendar",
        facts: [
          f("How many degrees does the minute hand move in 5 minutes?", "30", ["6", "60", "90"], "5 minutes = 30 degrees."),
          f("How many degrees does the hour hand move in one hour?", "30", ["6", "60", "90"], "The hour hand moves 30 degrees per hour."),
          f("At 3 o'clock, the angle between the hands is:", "90 degrees", ["30 degrees", "60 degrees", "120 degrees"], "3 o'clock gives a 90-degree angle."),
          f("How many times do the hands of a clock overlap in 12 hours?", "11", ["12", "10", "13"], "The hands overlap 11 times in 12 hours."),
          f("If today is Monday, what day will it be after 15 days?", "Tuesday", ["Monday", "Wednesday", "Sunday"], "15 days = 2 weeks + 1 day → Tuesday."),
          f("How many days are there in a leap year?", "366", ["365", "364", "367"], "A leap year has 366 days."),
        ],
      },
      {
        slug: "statement-assumption",
        facts: [
          f("An assumption is something taken as:", "True without proof", ["Proven", "False", "Irrelevant"], "Assumptions are taken as true without proof."),
          f("Statement: 'Use our cream for fair skin.' Assumption:", "People want fair skin", ["People dislike fairness", "Cream is harmful", "Skin colour is irrelevant"], "The statement assumes people want fair skin."),
          f("Statement: 'Join our classes to pass.' Assumption:", "Classes help passing", ["Classes harm students", "Exams are easy", "Classes are free"], "The statement assumes classes help."),
          f("An implicit assumption is:", "Unstated", ["Stated clearly", "Irrelevant", "False always"], "Implicit assumptions are unstated."),
          f("Assumptions are essential to:", "Logical conclusions", ["Random guessing", "Ignoring facts", "Failing logic"], "Assumptions underpin logical conclusions."),
          f("A valid argument rests on:", "Sound assumptions", ["False assumptions", "No assumptions", "Random ideas"], "Valid arguments rest on sound assumptions."),
        ],
      },
    ],
  },
];
