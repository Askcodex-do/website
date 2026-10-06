/**
 * Humanities, social sciences, arts, law, business and literature banks.
 *
 * Fills islamic-studies, seerah, quran-hadith, fiqh, pakistan-affairs,
 * international-relations, philosophy, gender-studies, social-work,
 * library-science, fine-arts, music, physical-education, current-affairs
 * (competitive), tourism, research-methods, jurisprudence, marketing and the
 * literature subjects.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const HUMANITIES_BANKS: SubjectSpec[] = [
  {
    slug: "islamic-studies",
    topics: [
      {
        slug: "quranic-studies",
        facts: [
          f("How many Surahs are in the Holy Quran?", "114", ["112", "116", "110"], "The Quran has 114 Surahs."),
          f("How many Ayats are in the Holy Quran (standard count)?", "6236", ["6000", "6666", "5000"], "The Quran has 6236 Ayats."),
          f("Which is the longest Surah of the Quran?", "Al-Baqarah", ["Al-Imran", "An-Nisa", "Al-Kahf"], "Surah Al-Baqarah is the longest."),
          f("Which is the first Surah of the Quran?", "Al-Fatiha", ["Al-Baqarah", "An-Nas", "Al-Ikhlas"], "Al-Fatiha is the first Surah."),
          f("The Quran was revealed over a period of about:", "23 years", ["10 years", "40 years", "5 years"], "Revelation spanned about 23 years."),
          f("Which Surah is called the heart of the Quran?", "Yaseen", ["Al-Fatiha", "Al-Ikhlas", "Ar-Rahman"], "Surah Yaseen is called the heart of the Quran."),
        ],
      },
      {
        slug: "hadith-studies",
        facts: [
          f("Which is regarded as the most authentic collection of Hadith?", "Sahih Bukhari", ["Sahih Muslim only", "Sunan Abu Dawud", "Muwatta Malik"], "Sahih Bukhari is widely considered the most authentic."),
          f("How many authentic books are in Sihah Sittah?", "6", ["4", "5", "7"], "Sihah Sittah are the six authentic books."),
          f("A Hadith consists of the text and the:", "Chain of narrators", ["Translation", "Commentary", "Index"], "A Hadith has an isnad (chain) and matn (text)."),
          f("Hadith that are the Prophet's (PBUH) sayings are called:", "Qawli", ["Fi'li", "Taqrti", "Ijma"], "Qawli Hadith are verbal sayings."),
          f("Hadith describing the Prophet's (PBUH) actions are:", "Fi'li", ["Qawli", "Taqriri", "Ijma"], "Fi'li Hadith describe actions."),
          f("The science of Hadith criticism is:", "Ilm al-Hadith", ["Ilm al-Kalam", "Ilm al-Fiqh", "Ilm al-Nahw"], "Ilm al-Hadith studies Hadith authenticity."),
        ],
      },
      {
        slug: "fiqh-usul",
        facts: [
          f("Usul al-fiqh means:", "Principles of jurisprudence", ["History of law", "Practice of law", "Custom of law"], "Usul al-fiqh are the principles of jurisprudence."),
          f("Maslahah mursalah means:", "Public interest", ["Private gain", "Personal opinion", "Custom"], "Maslahah mursalah is public interest."),
          f("Istishab means:", "Presumption of continuity", ["Change of law", "Custom", "Analogy"], "Istishab presumes continuity."),
          f("Istihsan means:", "Juristic preference", ["Blind imitation", "Consensus", "Analogy"], "Istihsan is juristic preference."),
          f("How many major Sunni schools of fiqh are there?", "4", ["2", "3", "5"], "There are four major Sunni schools."),
          f("The Hanafi school was founded by:", "Imam Abu Hanifa", ["Imam Malik", "Imam Shafi'i", "Imam Ahmad"], "Imam Abu Hanifa founded the Hanafi school."),
        ],
      },
      {
        slug: "islamic-theology",
        facts: [
          f("Tawhid means:", "Oneness of Allah", ["Prophethood", "Angels", "Judgement"], "Tawhid is belief in the oneness of Allah."),
          f("The pillars of Iman are:", "6", ["5", "4", "7"], "There are six articles of faith."),
          f("Belief in prophets is called:", "Risalah", ["Tawhid", "Akhirah", "Qadar"], "Risalah is belief in prophets."),
          f("Belief in the Day of Judgement is:", "Akhirah", ["Tawhid", "Risalah", "Qadar"], "Akhirah is belief in the Hereafter."),
          f("Divine predestination is:", "Qadar", ["Tawhid", "Risalah", "Akhirah"], "Qadar is divine decree."),
          f("The Islamic creed is called:", "Aqeedah", ["Fiqh", "Hadith", "Tafsir"], "Aqeedah is the Islamic creed."),
        ],
      },
      {
        slug: "islamic-civilisation",
        facts: [
          f("The first Islamic state was established in:", "Madinah", ["Makkah", "Taif", "Jerusalem"], "The first Islamic state was in Madinah."),
          f("The Charter of Madinah was a:", "Constitution", ["Treaty only", "Poem", "Book of law only"], "The Charter of Madinah was a constitution."),
          f("Which city was the first capital of the Islamic state?", "Madinah", ["Makkah", "Damascus", "Baghdad"], "Madinah was the first capital."),
          f("The Umayyad capital was:", "Damascus", ["Baghdad", "Cairo", "Madinah"], "The Umayyads ruled from Damascus."),
          f("The Abbasid capital was:", "Baghdad", ["Damascus", "Cairo", "Cordoba"], "The Abbasids ruled from Baghdad."),
          f("The House of Wisdom was established in:", "Baghdad", ["Damascus", "Cairo", "Istanbul"], "Bayt al-Hikmah was in Baghdad."),
        ],
      },
      {
        slug: "islamic-economics",
        facts: [
          f("Riba in Islamic finance means:", "Interest/usury", ["Trade", "Charity", "Partnership"], "Riba is interest, which is prohibited."),
          f("Zakat is a form of:", "Obligatory charity", ["Trade", "Loan", "Tax only"], "Zakat is obligatory charity."),
          f("Islamic banking avoids:", "Interest", ["Trade", "Profit", "Investment"], "Islamic banking avoids interest."),
          f("Mudarabah is a:", "Profit-sharing partnership", ["Loan", "Interest", "Tax"], "Mudarabah is a profit-sharing arrangement."),
          f("Musharakah means:", "Joint partnership", ["Sole ownership", "Interest", "Charity"], "Musharakah is joint partnership."),
          f("Takaful is Islamic:", "Insurance", ["Banking", "Taxation", "Trade"], "Takaful is Islamic insurance."),
        ],
      },
      {
        slug: "comparative-religion",
        facts: [
          f("How many major world religions are usually listed?", "5", ["2", "3", "10"], "Islam, Christianity, Judaism, Hinduism and Buddhism are major religions."),
          f("The holy book of Christianity is the:", "Bible", ["Torah", "Quran", "Vedas"], "The Bible is the Christian scripture."),
          f("The holy book of Judaism is the:", "Torah", ["Bible", "Quran", "Tripitaka"], "The Torah is the Jewish scripture."),
          f("The Vedas belong to:", "Hinduism", ["Buddhism", "Islam", "Judaism"], "The Vedas are Hindu scriptures."),
          f("Buddhism was founded by:", "Gautama Buddha", ["Confucius", "Laozi", "Mahavira"], "Gautama Buddha founded Buddhism."),
          f("Zoroastrianism originated in:", "Persia", ["India", "China", "Arabia"], "Zoroastrianism originated in ancient Persia."),
        ],
      },
      {
        slug: "muslim-philosophy",
        facts: [
          f("Al-Ghazali was a famous Muslim:", "Philosopher and theologian", ["Poet only", "Soldier", "Trader"], "Al-Ghazali was a philosopher and theologian."),
          f("Ibn Sina is known in the West as:", "Avicenna", ["Averroes", "Alhazen", "Al-Kindi"], "Ibn Sina is known as Avicenna."),
          f("Ibn Rushd is known in the West as:", "Averroes", ["Avicenna", "Alhazen", "Al-Farabi"], "Ibn Rushd is known as Averroes."),
          f("Ibn Khaldun wrote the:", "Muqaddimah", ["Canon of Medicine", "Al-Qanun", "Hayy ibn Yaqzan"], "Ibn Khaldun wrote the Muqaddimah."),
          f("Ibn Sina wrote:", "The Canon of Medicine", ["The Muqaddimah", "The Muqaddimah only", "Hayy ibn Yaqzan"], "Ibn Sina wrote the Canon of Medicine."),
          f("Al-Kindi is known as the first:", "Arab philosopher", ["Muslim historian", "Muslim poet", "Muslim king"], "Al-Kindi is called the first Arab philosopher."),
        ],
      },
    ],
  },

  {
    slug: "seerah",
    topics: [
      {
        slug: "makkah-period",
        facts: [
          f("In which year was the Prophet Muhammad (PBUH) born?", "570 CE", ["610 CE", "622 CE", "632 CE"], "The Prophet (PBUH) was born around 570 CE."),
          f("Where was the Prophet (PBUH) born?", "Makkah", ["Madinah", "Taif", "Jerusalem"], "The Prophet (PBUH) was born in Makkah."),
          f("The first revelation came in the cave of:", "Hira", ["Thawr", "Uhud", "Safa"], "The first revelation was in the cave of Hira."),
          f("At what age did the Prophet (PBUH) receive the first revelation?", "40", ["30", "50", "60"], "The first revelation came at age 40."),
          f("Who was the first to accept Islam?", "Khadijah (RA)", ["Abu Bakr (RA)", "Ali (RA)", "Umar (RA)"], "Khadijah (RA) was the first to accept Islam."),
          f("The Prophet (PBUH) belonged to which tribe?", "Quraysh", ["Aws", "Khazraj", "Thaqif"], "The Prophet (PBUH) was of the Quraysh."),
        ],
      },
      {
        slug: "madinah-period",
        facts: [
          f("The Hijrah (migration) was to:", "Madinah", ["Makkah", "Taif", "Abyssinia"], "The Hijrah was to Madinah (Yathrib)."),
          f("In which year did the Hijrah take place?", "622 CE", ["610 CE", "630 CE", "632 CE"], "The Hijrah was in 622 CE."),
          f("The first mosque built was:", "Masjid Quba", ["Masjid al-Haram", "Masjid an-Nabawi", "Masjid al-Aqsa"], "Masjid Quba was the first mosque."),
          f("The Charter of Madinah was written to:", "Unite the communities", ["Declare war", "Collect taxes", "Build roads"], "The charter united Madinah's communities."),
          f("The Prophet (PBUH) passed away in:", "632 CE", ["622 CE", "610 CE", "630 CE"], "The Prophet (PBUH) passed away in 632 CE."),
          f("Where is the Prophet (PBUH) buried?", "Madinah", ["Makkah", "Taif", "Jerusalem"], "The Prophet (PBUH) is buried in Madinah."),
        ],
      },
      {
        slug: "battles-islam",
        facts: [
          f("The first major battle of Islam was:", "Badr", ["Uhud", "Khandaq", "Khaybar"], "The Battle of Badr was the first major battle."),
          f("The Battle of Badr took place in:", "2 AH", ["1 AH", "3 AH", "5 AH"], "Badr occurred in 2 AH."),
          f("The Battle of Uhud took place in:", "3 AH", ["1 AH", "2 AH", "5 AH"], "Uhud occurred in 3 AH."),
          f("The Battle of the Trench is also called:", "Khandaq", ["Badr", "Uhud", "Hunayn"], "The Battle of the Trench is Khandaq."),
          f("The Battle of Khaybar took place in:", "7 AH", ["2 AH", "3 AH", "5 AH"], "Khaybar occurred in 7 AH."),
          f("The conquest of Makkah took place in:", "8 AH", ["2 AH", "5 AH", "10 AH"], "Makkah was conquered in 8 AH."),
        ],
      },
      {
        slug: "treaties-pacts",
        facts: [
          f("The Treaty of Hudaybiyyah was signed in:", "6 AH", ["2 AH", "4 AH", "8 AH"], "The Treaty of Hudaybiyyah was in 6 AH."),
          f("The Treaty of Hudaybiyyah was between the Muslims and the:", "Quraysh", ["Jews of Madinah", "Romans", "Persians"], "It was with the Quraysh of Makkah."),
          f("The pledge at Aqabah was made with the people of:", "Madinah", ["Makkah", "Taif", "Yemen"], "The Aqabah pledges were with Madinah's people."),
          f("The Charter of Madinah established:", "Religious tolerance", ["Slavery", "War", "Trade only"], "The charter promoted coexistence."),
          f("The Treaty of Hudaybiyyah led to:", "A period of peace", ["Immediate war", "Mass migration", "Famine"], "The treaty brought a truce."),
          f("The Muslims migrated to Abyssinia to escape:", "Persecution", ["Famine", "Flood", "Disease"], "They migrated to escape persecution."),
        ],
      },
      {
        slug: "companions",
        facts: [
          f("Who was the first Caliph?", "Abu Bakr (RA)", ["Umar (RA)", "Uthman (RA)", "Ali (RA)"], "Abu Bakr (RA) was the first Caliph."),
          f("Who was known as 'Farooq'?", "Umar (RA)", ["Abu Bakr (RA)", "Uthman (RA)", "Ali (RA)"], "Umar (RA) was called Farooq."),
          f("Who compiled the Quran into a single book?", "Abu Bakr (RA)", ["Umar (RA)", "Uthman (RA)", "Ali (RA)"], "Compilation began under Abu Bakr (RA)."),
          f("Who standardised the Quranic text?", "Uthman (RA)", ["Abu Bakr (RA)", "Umar (RA)", "Ali (RA)"], "Uthman (RA) standardised the text."),
          f("Who was the first child to accept Islam?", "Ali (RA)", ["Umar (RA)", "Uthman (RA)", "Bilal (RA)"], "Ali (RA) was the first child to accept Islam."),
          f("Who was the first muezzin of Islam?", "Bilal (RA)", ["Abu Bakr (RA)", "Umar (RA)", "Salman (RA)"], "Bilal (RA) was the first muezzin."),
        ],
      },
      {
        slug: "prophetic-teachings",
        facts: [
          f("The Prophet (PBUH) was known for his:", "Truthfulness", ["Wealth", "Strength", "Speed"], "The Prophet (PBUH) was known as Al-Amin, the trustworthy."),
          f("The Prophet (PBUH) emphasised the importance of:", "Good character", ["Wealth", "Power", "Fame"], "Good character is central to Islamic teaching."),
          f("Seeking knowledge is:", "Obligatory", ["Forbidden", "Optional", "Discouraged"], "Seeking knowledge is encouraged and obligatory."),
          f("The Prophet (PBUH) taught kindness to:", "All creation", ["Only Muslims", "Only relatives", "Only neighbours"], "Kindness extends to all creation."),
          f("Honesty in trade was:", "Encouraged", ["Forbidden", "Ignored", "Optional"], "The Prophet (PBUH) encouraged honest trade."),
          f("The Prophet's (PBUH) farewell sermon emphasised:", "Equality", ["Wealth", "Tribalism", "War"], "The farewell sermon stressed human equality."),
        ],
      },
    ],
  },

  {
    slug: "quran-hadith",
    topics: [
      {
        slug: "quran-revelation",
        facts: [
          f("The Quran was revealed to the Prophet (PBUH) through:", "Angel Jibreel", ["Angel Mikael", "Angel Israfeel", "Angel Azraeel"], "Jibreel brought the revelation."),
          f("The first revealed words were from Surah:", "Al-Alaq", ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas"], "The first revelation was from Surah Al-Alaq."),
          f("Revelation of the Quran was completed in about:", "23 years", ["10 years", "40 years", "5 years"], "Revelation spanned about 23 years."),
          f("The Quran is divided into:", "114 Surahs", ["100 Surahs", "120 Surahs", "110 Surahs"], "The Quran has 114 Surahs."),
          f("The Quran was revealed in:", "Arabic", ["Persian", "Urdu", "Hebrew"], "The Quran was revealed in Arabic."),
          f("Which Surah was revealed first in full?", "Al-Fatiha", ["Al-Alaq", "Al-Baqarah", "An-Nas"], "Al-Fatiha is regarded as the first complete Surah."),
        ],
      },
      {
        slug: "quran-tajweed",
        facts: [
          f("Tajweed is the science of:", "Reciting the Quran correctly", ["Interpreting the Quran", "Translating the Quran", "Memorising the Quran"], "Tajweed governs correct recitation."),
          f("Idgham in tajweed means:", "Merging", ["Separating", "Pausing", "Lengthening"], "Idgham is merging of letters."),
          f("Madd in tajweed refers to:", "Elongation", ["Merging", "Stopping", "Whispering"], "Madd is elongation of sound."),
          f("A person who has memorised the Quran is called a:", "Hafiz", ["Qari", "Imam", "Mufti"], "A Hafiz has memorised the Quran."),
          f("Ghunnah refers to:", "Nasal sound", ["Silence", "Loud sound", "Whisper"], "Ghunnah is a nasalised sound."),
          f("Qalqalah means:", "Echoing sound", ["Silence", "Merging", "Elongation"], "Qalqalah is an echoing pronunciation."),
        ],
      },
      {
        slug: "quran-translation",
        facts: [
          f("The Quran has how many Juz (parts)?", "30", ["20", "40", "10"], "The Quran has 30 Juz."),
          f("Which Surah is the shortest?", "Al-Kawthar", ["Al-Asr", "Al-Ikhlas", "Al-Falaq"], "Al-Kawthar is the shortest Surah."),
          f("Which Surah is the last?", "An-Nas", ["Al-Falaq", "Al-Ikhlas", "Al-Kawthar"], "An-Nas is the last Surah."),
          f("The opening Surah of the Quran is:", "Al-Fatiha", ["Al-Baqarah", "An-Nas", "Al-Ikhlas"], "Al-Fatiha opens the Quran."),
          f("Which Surah is named after a woman?", "Maryam", ["An-Nisa", "Al-Mujadila", "At-Talaq"], "Surah Maryam is named after Maryam (Mary)."),
          f("Which Surah mentions the story of the elephant?", "Al-Fil", ["Al-Qadr", "Al-Asr", "Al-Maun"], "Surah Al-Fil recounts the Year of the Elephant."),
        ],
      },
      {
        slug: "hadith-collections",
        facts: [
          f("Sahih Muslim is a collection of:", "Hadith", ["Tafsir", "Fiqh", "Poetry"], "Sahih Muslim is a Hadith collection."),
          f("Muwatta is a collection by:", "Imam Malik", ["Imam Bukhari", "Imam Muslim", "Imam Tirmidhi"], "Imam Malik compiled the Muwatta."),
          f("Sunan Abu Dawud is a:", "Hadith collection", ["Tafsir", "History", "Poetry"], "Sunan Abu Dawud is a Hadith collection."),
          f("Which is a collection of Hadith by Imam Tirmidhi?", "Jami at-Tirmidhi", ["Sahih Bukhari", "Sahih Muslim", "Muwatta"], "Jami at-Tirmidhi is by Imam Tirmidhi."),
          f("Hadith are the sayings and actions of:", "The Prophet (PBUH)", ["The Caliphs", "The scholars", "The companions"], "Hadith record the Prophet's (PBUH) words and deeds."),
          f("How many Hadith are in Sahih Bukhari (approx.)?", "7000+", ["1000", "500", "300"], "Sahih Bukhari contains about 7000+ Hadith."),
        ],
      },
      {
        slug: "hadith-science",
        facts: [
          f("The chain of narrators in a Hadith is the:", "Isnad", ["Matn", "Sharh", "Tafsir"], "Isnad is the chain of narration."),
          f("The text of a Hadith is the:", "Matn", ["Isnad", "Sanad", "Sharh"], "Matn is the text of the Hadith."),
          f("A Hadith with a broken chain is:", "Mursal", ["Sahih", "Hasan", "Mutawatir"], "Mursal Hadith have a broken chain."),
          f("A Hadith narrated by many chains is:", "Mutawatir", ["Ahad", "Mursal", "Daif"], "Mutawatir Hadith have many chains."),
          f("A weak Hadith is termed:", "Daif", ["Sahih", "Hasan", "Mutawatir"], "Daif means weak."),
          f("The study of narrators is:", "Ilm ar-Rijal", ["Ilm al-Kalam", "Ilm al-Nahw", "Ilm al-Bayan"], "Ilm ar-Rijal studies narrators."),
        ],
      },
    ],
  },

  {
    slug: "fiqh",
    topics: [
      {
        slug: "fiqh-ibadat",
        facts: [
          f("How many pillars of Islam are there?", "5", ["4", "6", "7"], "Islam has five pillars."),
          f("How many daily obligatory prayers are there?", "5", ["3", "6", "7"], "There are five daily prayers."),
          f("The rate of Zakat on qualifying wealth is:", "2.5%", ["5%", "10%", "1%"], "Zakat is 2.5%."),
          f("Fasting is obligatory in the month of:", "Ramadan", ["Shawwal", "Rajab", "Muharram"], "Fasting is in Ramadan."),
          f("Hajj is obligatory for those who are:", "Financially and physically able", ["Young", "Rich only", "Male only"], "Hajj is for those able to perform it."),
          f("How many Rak'ahs are in Fajr Farz?", "2", ["3", "4", "1"], "Fajr has two Farz Rak'ahs."),
        ],
      },
      {
        slug: "fiqh-muamlat",
        facts: [
          f("Riba in transactions is:", "Prohibited", ["Encouraged", "Optional", "Neutral"], "Riba (interest) is prohibited."),
          f("Trade in Islam is:", "Permissible", ["Forbidden", "Discouraged", "Compulsory"], "Trade is generally permissible."),
          f("A contract of sale in Islamic law is:", "Bay", ["Riba", "Zakat", "Hajj"], "Bay is a sale contract."),
          f("Gharar in contracts means:", "Excessive uncertainty", ["Profit", "Loss", "Charity"], "Gharar is excessive uncertainty, which is avoided."),
          f("Zakat is levied on:", "Qualifying wealth", ["Income only", "Property only", "Crops only"], "Zakat applies to qualifying wealth."),
          f("Islamic inheritance is governed by:", "Shariah", ["Custom only", "Civil law only", "Contract"], "Inheritance follows Shariah rules."),
        ],
      },
      {
        slug: "fiqh-madhab",
        facts: [
          f("How many major Sunni schools of jurisprudence are there?", "4", ["2", "3", "5"], "There are four major Sunni schools."),
          f("The Hanafi school was founded by:", "Imam Abu Hanifa", ["Imam Malik", "Imam Shafi", "Imam Hanbal"], "Imam Abu Hanifa founded the Hanafi school."),
          f("The Maliki school was founded by:", "Imam Malik", ["Imam Abu Hanifa", "Imam Shafi", "Imam Hanbal"], "Imam Malik founded the Maliki school."),
          f("The Shafi school was founded by:", "Imam Shafi", ["Imam Abu Hanifa", "Imam Malik", "Imam Hanbal"], "Imam Shafi founded the Shafi school."),
          f("The Hanbali school was founded by:", "Imam Hanbal", ["Imam Abu Hanifa", "Imam Malik", "Imam Shafi"], "Imam Hanbal founded the Hanbali school."),
          f("The Shia school of jurisprudence is mainly the:", "Jafari", ["Hanafi", "Maliki", "Hanbali"], "The Jafari school is followed by Shia Muslims."),
        ],
      },
      {
        slug: "usul-fiqh",
        facts: [
          f("The primary sources of Islamic law are:", "Quran and Sunnah", ["Ijma and Qiyas", "Urf and Istihsan", "Custom and tradition"], "Quran and Sunnah are primary."),
          f("Ijma means:", "Consensus", ["Analogy", "Custom", "Reasoning"], "Ijma is consensus of scholars."),
          f("Qiyas means:", "Analogical reasoning", ["Consensus", "Custom", "Preference"], "Qiyas is analogical reasoning."),
          f("Istihsan means:", "Juristic preference", ["Consensus", "Analogy", "Custom"], "Istihsan is juristic preference."),
          f("Urf means:", "Custom", ["Analogy", "Consensus", "Preference"], "Urf is customary practice."),
          f("Maslahah means:", "Public interest", ["Private gain", "Custom", "Analogy"], "Maslahah is public interest."),
        ],
      },
    ],
  },

  {
    slug: "pakistan-affairs",
    topics: [
      {
        slug: "pa-politics",
        facts: [
          f("Pakistan's first constitution was adopted in:", "1956", ["1947", "1962", "1973"], "The first constitution was adopted in 1956."),
          f("The current constitution of Pakistan was adopted in:", "1973", ["1956", "1962", "1985"], "The 1973 Constitution is current."),
          f("How many provinces does Pakistan have?", "4", ["3", "5", "6"], "Pakistan has four provinces."),
          f("The Senate of Pakistan represents the:", "Provinces", ["National Assembly only", "Judiciary", "Army"], "The Senate represents the provinces."),
          f("The National Assembly is the:", "Lower house", ["Upper house", "Supreme court", "Cabinet"], "The National Assembly is the lower house."),
          f("The head of state of Pakistan is the:", "President", ["Prime Minister", "Chief Justice", "Speaker"], "The President is head of state."),
        ],
      },
      {
        slug: "pa-economy",
        facts: [
          f("The currency of Pakistan is the:", "Rupee", ["Dinar", "Riyal", "Taka"], "Pakistan's currency is the rupee."),
          f("The central bank of Pakistan is the:", "State Bank of Pakistan", ["National Bank", "Habib Bank", "Bank of Punjab"], "The State Bank is the central bank."),
          f("Pakistan's largest export sector historically is:", "Textiles", ["Automobiles", "Aerospace", "Pharmaceuticals"], "Textiles dominate exports."),
          f("GDP stands for:", "Gross Domestic Product", ["Gross Development Product", "General Domestic Product", "Global Domestic Product"], "GDP is Gross Domestic Product."),
          f("Remittances to Pakistan come mainly from:", "Overseas workers", ["Tourists", "Exports only", "Aid only"], "Overseas workers send remittances."),
          f("Which crop is central to Pakistan's agriculture?", "Wheat", ["Coffee", "Tea", "Rubber"], "Wheat is central to Pakistani agriculture."),
        ],
      },
      {
        slug: "pa-foreign-policy",
        facts: [
          f("Pakistan's foreign policy is shaped by its relations with:", "Neighbouring countries", ["Only Europe", "Only Africa", "Only America"], "Neighbours shape Pakistan's foreign policy."),
          f("The Indus Waters Treaty is between Pakistan and:", "India", ["China", "Afghanistan", "Iran"], "The Indus Waters Treaty is with India."),
          f("CPEC stands for:", "China-Pakistan Economic Corridor", ["Central Pakistan Economic Council", "China Pakistan Energy Corridor", "Combined Pakistan Economic Committee"], "CPEC is the China-Pakistan Economic Corridor."),
          f("Pakistan is a member of:", "OIC", ["NATO", "EU", "ASEAN"], "Pakistan is a member of the OIC."),
          f("Pakistan joined the United Nations in:", "1947", ["1950", "1960", "1971"], "Pakistan joined the UN in 1947."),
          f("The Durand Line is the border between Pakistan and:", "Afghanistan", ["India", "Iran", "China"], "The Durand Line borders Afghanistan."),
        ],
      },
      {
        slug: "pa-society",
        facts: [
          f("The national language of Pakistan is:", "Urdu", ["English", "Punjabi", "Sindhi"], "Urdu is the national language."),
          f("Pakistan's population is predominantly:", "Muslim", ["Hindu", "Christian", "Buddhist"], "Pakistan's majority is Muslim."),
          f("The largest city of Pakistan is:", "Karachi", ["Lahore", "Islamabad", "Faisalabad"], "Karachi is the largest city."),
          f("The literacy rate measures:", "Reading and writing ability", ["Wealth", "Height", "Employment"], "Literacy measures reading and writing."),
          f("Pakistan's national sport is:", "Field hockey", ["Cricket", "Squash", "Kabaddi"], "Field hockey is the national sport."),
          f("Which is Pakistan's national animal?", "Markhor", ["Lion", "Tiger", "Deer"], "The Markhor is the national animal."),
        ],
      },
      {
        slug: "pa-institutions",
        facts: [
          f("The Supreme Court of Pakistan is located in:", "Islamabad", ["Lahore", "Karachi", "Peshawar"], "The Supreme Court is in Islamabad."),
          f("The Parliament of Pakistan is located in:", "Islamabad", ["Lahore", "Karachi", "Quetta"], "Parliament is in Islamabad."),
          f("The Election Commission of Pakistan conducts:", "Elections", ["Trials", "Trade", "Taxation"], "The ECP conducts elections."),
          f("The National Accountability Bureau deals with:", "Corruption", ["Traffic", "Education", "Health"], "NAB deals with corruption."),
          f("Pakistan's armed forces are headed by the:", "Chief of Army Staff", ["President", "Prime Minister", "Speaker"], "The COAS heads the army."),
          f("The Federal Board of Revenue deals with:", "Taxation", ["Elections", "Health", "Education"], "FBR deals with taxation."),
        ],
      },
      {
        slug: "pa-challenges",
        facts: [
          f("Which is a major challenge for Pakistan's economy?", "Energy shortage", ["Excess energy", "Too few people", "No agriculture"], "Energy shortages hinder the economy."),
          f("Water scarcity in Pakistan is mainly due to:", "Low storage capacity", ["Excess rainfall", "Too many dams", "Low population"], "Limited storage contributes to scarcity."),
          f("Which is a social challenge in Pakistan?", "Illiteracy", ["Over-literacy", "Excess housing", "Low population"], "Illiteracy is a key social challenge."),
          f("Terrorism has affected Pakistan's:", "Security and economy", ["Only tourism", "Only agriculture", "Only sports"], "Terrorism affects security and economy."),
          f("Population growth in Pakistan is:", "Rapid", ["Declining", "Zero", "Negative"], "Pakistan's population grows rapidly."),
          f("Which sector employs most of Pakistan's workforce?", "Agriculture", ["IT", "Mining", "Banking"], "Agriculture employs most workers."),
        ],
      },
    ],
  },

  {
    slug: "international-relations",
    topics: [
      {
        slug: "ir-theories",
        facts: [
          f("Realism in IR emphasises:", "National interest and power", ["Cooperation", "Culture", "Trade only"], "Realism stresses power and national interest."),
          f("Liberalism in IR emphasises:", "Cooperation and institutions", ["War", "Isolation", "Empire"], "Liberalism stresses cooperation and institutions."),
          f("Constructivism in IR emphasises:", "Ideas and identity", ["Military power", "Wealth", "Geography only"], "Constructivism stresses ideas and identity."),
          f("The balance of power is a concept in:", "Realism", ["Liberalism", "Constructivism", "Marxism"], "Balance of power is a realist concept."),
          f("Anarchy in IR refers to:", "Absence of world government", ["Chaos only", "Civil war", "Dictatorship"], "Anarchy means no higher authority above states."),
          f("Soft power is the ability to influence through:", "Attraction", ["Force", "Coercion", "Sanctions"], "Soft power works through attraction."),
        ],
      },
      {
        slug: "international-organizations",
        facts: [
          f("The UN was founded in:", "1945", ["1919", "1939", "1950"], "The UN was founded in 1945."),
          f("The UN headquarters is in:", "New York", ["Geneva", "Paris", "Vienna"], "The UN is headquartered in New York."),
          f("How many permanent members are on the UN Security Council?", "5", ["7", "10", "15"], "There are five permanent members."),
          f("The WHO is headquartered in:", "Geneva", ["New York", "Paris", "Rome"], "WHO is in Geneva."),
          f("SAARC is a regional organisation for:", "South Asia", ["Europe", "Africa", "Latin America"], "SAARC covers South Asia."),
          f("The IMF deals with:", "International monetary cooperation", ["Health", "Culture", "Sports"], "The IMF handles monetary cooperation."),
        ],
      },
      {
        slug: "diplomacy",
        facts: [
          f("Diplomacy is the management of:", "Relations between states", ["Domestic trade", "Local elections", "Religious affairs"], "Diplomacy manages inter-state relations."),
          f("An ambassador represents a state:", "Abroad", ["At home", "In court", "In parliament"], "An ambassador represents a state abroad."),
          f("A treaty is a:", "Formal agreement between states", ["Domestic law", "Speech", "Newspaper"], "A treaty is a formal inter-state agreement."),
          f("Summit diplomacy involves:", "Heads of state meeting", ["Only ambassadors", "Only clerks", "Only soldiers"], "Summit diplomacy involves leaders."),
          f("Bilateral relations involve:", "Two states", ["Many states", "One state", "No states"], "Bilateral means two parties."),
          f("Multilateral diplomacy involves:", "Several states", ["Two states", "One state", "None"], "Multilateral involves several states."),
        ],
      },
      {
        slug: "foreign-policy",
        facts: [
          f("Foreign policy is a state's strategy towards:", "Other states", ["Its own citizens only", "Local firms", "Schools"], "Foreign policy concerns other states."),
          f("National interest is the:", "Core goal of foreign policy", ["A trade union", "A tax", "A festival"], "National interest guides foreign policy."),
          f("Sanctions are used to:", "Pressure a state", ["Reward a state", "Entertain", "Educate"], "Sanctions pressure states."),
          f("A trade embargo restricts:", "Commerce with a state", ["Tourism only", "Culture only", "Sports only"], "Embargoes restrict trade."),
          f("Pakistan's foreign policy prioritises relations with:", "China and Muslim states", ["Only Europe", "Only Africa", "Only America"], "Pakistan prioritises key partners."),
          f("The Ministry of Foreign Affairs handles a state's:", "External relations", ["Internal trade", "Police", "Health"], "Foreign ministries handle external relations."),
        ],
      },
      {
        slug: "global-conflicts",
        facts: [
          f("The Cold War was between the US and the:", "Soviet Union", ["China", "Germany", "Japan"], "The Cold War was US–USSR."),
          f("The Berlin Wall fell in:", "1989", ["1985", "1991", "1993"], "The Berlin Wall fell in 1989."),
          f("World War I began in:", "1914", ["1918", "1939", "1945"], "WWI began in 1914."),
          f("World War II ended in:", "1945", ["1918", "1939", "1950"], "WWII ended in 1945."),
          f("The Cuban Missile Crisis occurred in:", "1962", ["1950", "1970", "1980"], "The Cuban Missile Crisis was in 1962."),
          f("The term 'Cold War' refers to:", "Geopolitical tension without direct war", ["A winter battle", "A trade deal", "A treaty"], "The Cold War was tension without direct conflict."),
        ],
      },
      {
        slug: "international-law",
        facts: [
          f("International law primarily governs:", "Relations between states", ["Domestic crime", "Local trade", "Family matters"], "International law governs states."),
          f("The International Court of Justice is in:", "The Hague", ["New York", "Geneva", "Paris"], "The ICJ sits in The Hague."),
          f("The Geneva Conventions deal with:", "War conduct", ["Trade", "Environment", "Culture"], "The Geneva Conventions govern war conduct."),
          f("Human rights are protected globally by:", "The UN", ["Only courts", "Only armies", "Only banks"], "The UN protects human rights globally."),
          f("A state's sovereignty means:", "Supreme authority over its territory", ["Membership of the UN", "Trade rights", "Military aid"], "Sovereignty is supreme territorial authority."),
          f("The Universal Declaration of Human Rights was adopted in:", "1948", ["1945", "1950", "1960"], "The UDHR was adopted in 1948."),
        ],
      },
    ],
  },

  {
    slug: "philosophy",
    topics: [
      {
        slug: "logic",
        facts: [
          f("The study of valid reasoning is:", "Logic", ["Ethics", "Metaphysics", "Aesthetics"], "Logic studies valid reasoning."),
          f("A syllogism is a form of:", "Deductive reasoning", ["Inductive reasoning", "Abductive reasoning", "Analogy"], "A syllogism is deductive."),
          f("If all men are mortal and Socrates is a man, then Socrates is:", "Mortal", ["Immortal", "A god", "A stone"], "This is a classic syllogism."),
          f("A logical fallacy is:", "An error in reasoning", ["A valid argument", "A true statement", "A proof"], "Fallacies are errors in reasoning."),
          f("A premise is a:", "Statement supporting a conclusion", ["Conclusion", "Fallacy", "Definition only"], "Premises support conclusions."),
          f("Deduction moves from:", "General to particular", ["Particular to general", "Cause to effect", "Effect to cause"], "Deduction moves general to particular."),
        ],
      },
      {
        slug: "ethics",
        facts: [
          f("The study of morality is:", "Ethics", ["Logic", "Metaphysics", "Epistemology"], "Ethics studies morality."),
          f("Utilitarianism judges actions by:", "Consequences", ["Intentions", "Rules", "Authority"], "Utilitarianism focuses on consequences."),
          f("Deontology judges actions by:", "Duty and rules", ["Consequences", "Emotion", "Wealth"], "Deontology focuses on duty."),
          f("Virtue ethics focuses on:", "Character", ["Consequences", "Rules", "Laws"], "Virtue ethics focuses on character."),
          f("The greatest good for the greatest number is associated with:", "Utilitarianism", ["Deontology", "Virtue ethics", "Nihilism"], "This is the utilitarian principle."),
          f("Kant is associated with:", "Deontology", ["Utilitarianism", "Existentialism", "Pragmatism"], "Kant is a deontologist."),
        ],
      },
      {
        slug: "metaphysics",
        facts: [
          f("The study of reality and existence is:", "Metaphysics", ["Ethics", "Logic", "Aesthetics"], "Metaphysics studies reality."),
          f("Ontology studies:", "Being", ["Knowledge", "Morality", "Beauty"], "Ontology studies being."),
          f("Determinism holds that events are:", "Caused", ["Random", "Free", "Unknown"], "Determinism holds events are caused."),
          f("Free will is the ability to:", "Choose", ["Obey", "Suffer", "Sleep"], "Free will is the capacity to choose."),
          f("Materialism holds that reality is:", "Physical", ["Mental", "Spiritual", "Ideal"], "Materialism holds reality is physical."),
          f("Idealism holds that reality is:", "Mental", ["Physical", "Material", "Atomic"], "Idealism holds reality is mental."),
        ],
      },
      {
        slug: "epistemology",
        facts: [
          f("The study of knowledge is:", "Epistemology", ["Metaphysics", "Ethics", "Logic"], "Epistemology studies knowledge."),
          f("Rationalism emphasises:", "Reason", ["Experience", "Emotion", "Authority"], "Rationalism emphasises reason."),
          f("Empiricism emphasises:", "Experience", ["Reason", "Faith", "Intuition only"], "Empiricism emphasises experience."),
          f("Skepticism questions:", "Certainty of knowledge", ["Morality", "Beauty", "Being"], "Skepticism questions certainty."),
          f("A priori knowledge is independent of:", "Experience", ["Reason", "Logic", "Language"], "A priori knowledge is independent of experience."),
          f("Descartes' famous phrase is:", "I think, therefore I am", ["Know thyself", "The unexamined life", "Man is the measure"], "Cogito ergo sum is Descartes' phrase."),
        ],
      },
      {
        slug: "western-philosophy",
        facts: [
          f("Socrates was a philosopher from:", "Greece", ["Rome", "Egypt", "Persia"], "Socrates was Greek."),
          f("Plato was a student of:", "Socrates", ["Aristotle", "Descartes", "Kant"], "Plato studied under Socrates."),
          f("Aristotle was a student of:", "Plato", ["Socrates", "Kant", "Hegel"], "Aristotle studied under Plato."),
          f("The Republic was written by:", "Plato", ["Aristotle", "Socrates", "Kant"], "Plato wrote The Republic."),
          f("Existentialism is associated with:", "Sartre", ["Plato", "Aristotle", "Descartes"], "Sartre is a key existentialist."),
          f("The Enlightenment emphasised:", "Reason", ["Faith", "Tradition", "Emotion"], "The Enlightenment emphasised reason."),
        ],
      },
      {
        slug: "eastern-philosophy",
        facts: [
          f("Confucianism originated in:", "China", ["India", "Japan", "Persia"], "Confucianism originated in China."),
          f("Buddhism originated in:", "India", ["China", "Japan", "Korea"], "Buddhism originated in India."),
          f("The Bhagavad Gita is a:", "Hindu scripture", ["Buddhist text", "Islamic text", "Chinese text"], "The Bhagavad Gita is Hindu scripture."),
          f("Laozi is associated with:", "Taoism", ["Confucianism", "Buddhism", "Shinto"], "Laozi is associated with Taoism."),
          f("Nirvana is a concept in:", "Buddhism", ["Islam", "Christianity", "Judaism"], "Nirvana is a Buddhist concept."),
          f("Zen is a form of:", "Buddhism", ["Hinduism", "Taoism", "Shinto"], "Zen is a Buddhist tradition."),
        ],
      },
    ],
  },

  {
    slug: "gender-studies",
    topics: [
      {
        slug: "gender-theory",
        facts: [
          f("Gender refers to:", "Social roles and identity", ["Biological sex only", "Age", "Income"], "Gender concerns social roles and identity."),
          f("Sex refers to:", "Biological characteristics", ["Social roles", "Culture", "Language"], "Sex refers to biological characteristics."),
          f("Feminism advocates for:", "Gender equality", ["Female superiority", "Male superiority", "No rights"], "Feminism advocates gender equality."),
          f("Patriarchy describes:", "Male-dominated social structures", ["Female-dominated structures", "Equal structures", "Classless structures"], "Patriarchy is male dominance in society."),
          f("Gender mainstreaming means:", "Integrating gender into policy", ["Ignoring gender", "Separating genders", "Restricting women"], "Mainstreaming integrates gender into policy."),
          f("Intersectionality considers:", "Overlapping social identities", ["Only gender", "Only class", "Only race"], "Intersectionality examines overlapping identities."),
        ],
      },
      {
        slug: "women-development",
        facts: [
          f("The UN body for gender equality is:", "UN Women", ["WHO", "IMF", "UNESCO"], "UN Women promotes gender equality."),
          f("CEDAW stands for:", "Convention on the Elimination of All Forms of Discrimination Against Women", ["Council for Economic Development", "Committee for Education", "Centre for Women Affairs"], "CEDAW is the women's rights convention."),
          f("Women's empowerment includes:", "Economic and political participation", ["Isolation", "Restriction", "Illiteracy"], "Empowerment includes participation."),
          f("Which index measures gender inequality?", "Gender Inequality Index", ["Human Development Index", "Gini Index", "Consumer Price Index"], "The GII measures gender inequality."),
          f("Microfinance for women promotes:", "Economic independence", ["Dependence", "Isolation", "Illiteracy"], "Microfinance supports independence."),
          f("The gender pay gap refers to:", "Difference in earnings", ["Difference in age", "Difference in height", "Difference in education"], "The pay gap is an earnings difference."),
        ],
      },
      {
        slug: "gender-society",
        facts: [
          f("Gender stereotypes are:", "Generalised beliefs about genders", ["Scientific facts", "Legal laws", "Economic policies"], "Stereotypes are generalised beliefs."),
          f("Gender socialisation begins in:", "Childhood", ["Old age", "Adulthood", "Retirement"], "Gender socialisation begins in childhood."),
          f("Which institution shapes gender roles?", "Family", ["Only the army", "Only courts", "Only banks"], "The family shapes gender roles."),
          f("Gender-based violence is a:", "Human rights violation", ["Private matter", "Legal right", "Cultural norm"], "Gender-based violence violates human rights."),
          f("Women's representation in politics is measured by:", "Seats held", ["Height", "Income only", "Age only"], "Political representation is measured by seats."),
          f("Education of girls is linked to:", "Lower child mortality", ["Higher child mortality", "Lower literacy", "Higher poverty"], "Girls' education lowers child mortality."),
        ],
      },
    ],
  },

  {
    slug: "social-work",
    topics: [
      {
        slug: "social-welfare",
        facts: [
          f("Social work aims to improve:", "Well-being of people", ["Only infrastructure", "Only industry", "Only defence"], "Social work improves well-being."),
          f("A social worker helps individuals to:", "Access resources", ["Avoid taxes", "Increase wealth", "Gain power"], "Social workers help access resources."),
          f("Welfare services are provided by:", "Government and NGOs", ["Only courts", "Only banks", "Only armies"], "Government and NGOs provide welfare."),
          f("Social security provides:", "Financial protection", ["Entertainment", "Education only", "Transport"], "Social security offers financial protection."),
          f("The main goal of social welfare is:", "Social justice", ["Profit", "Power", "Fame"], "Social welfare aims at social justice."),
          f("A vulnerable group is one that is:", "At risk of harm", ["Wealthy", "Powerful", "Healthy"], "Vulnerable groups are at risk."),
        ],
      },
      {
        slug: "community-development",
        facts: [
          f("Community development involves:", "Local participation", ["Central control only", "Foreign rule", "Isolation"], "Community development is participatory."),
          f("A community needs assessment identifies:", "Local needs", ["Foreign policy", "Stock prices", "Weather"], "Needs assessments identify local needs."),
          f("Capacity building strengthens:", "Skills and institutions", ["Debt", "Isolation", "Illiteracy"], "Capacity building strengthens skills."),
          f("Participatory development involves:", "Community members in decisions", ["Only officials", "Only donors", "Only experts"], "Participatory development involves the community."),
          f("An NGO is a:", "Non-governmental organisation", ["Government body", "Bank", "Court"], "NGOs are non-governmental organisations."),
          f("Sustainable community development balances:", "Social, economic and environmental needs", ["Only profit", "Only growth", "Only infrastructure"], "Sustainability balances multiple needs."),
        ],
      },
      {
        slug: "casework",
        facts: [
          f("Casework involves helping:", "Individuals and families", ["Only governments", "Only companies", "Only armies"], "Casework helps individuals and families."),
          f("The first step in casework is:", "Assessment", ["Termination", "Evaluation", "Referral"], "Casework begins with assessment."),
          f("Confidentiality in casework protects:", "Client information", ["Worker salary", "Agency profit", "Government secrets"], "Confidentiality protects client information."),
          f("Referral means:", "Directing a client to another service", ["Closing a case", "Opening a case", "Charging fees"], "Referral directs clients to services."),
          f("A care plan outlines:", "Services for a client", ["A company budget", "A law", "A tax"], "Care plans outline client services."),
          f("Empathy in social work means:", "Understanding the client's feelings", ["Sympathy only", "Indifference", "Authority"], "Empathy is understanding feelings."),
        ],
      },
      {
        slug: "social-policy",
        facts: [
          f("Social policy addresses:", "Social welfare and needs", ["Only defence", "Only trade", "Only sports"], "Social policy addresses welfare."),
          f("Which is a social policy area?", "Health", ["Astronomy", "Geology", "Mining"], "Health is a social policy area."),
          f("Policy evaluation assesses:", "Effectiveness", ["Popularity only", "Cost only", "Speed only"], "Policy evaluation assesses effectiveness."),
          f("A safety net provides:", "Minimum support", ["Maximum profit", "Luxury", "Entertainment"], "Safety nets provide minimum support."),
          f("Poverty alleviation aims to:", "Reduce poverty", ["Increase poverty", "Ignore poverty", "Measure poverty only"], "Poverty alleviation reduces poverty."),
          f("Universal basic services include:", "Education and health", ["Luxury goods", "Entertainment", "Tourism"], "Basic services include education and health."),
        ],
      },
    ],
  },

  {
    slug: "library-science",
    topics: [
      {
        slug: "cataloguing",
        facts: [
          f("Cataloguing is the process of:", "Organising library materials", ["Buying books", "Printing books", "Binding books"], "Cataloguing organises materials."),
          f("A library catalogue is a:", "List of library holdings", ["Book shop", "Reading room", "Publisher"], "A catalogue lists holdings."),
          f("AACR2 stands for:", "Anglo-American Cataloguing Rules", ["American Archival Code", "Asian Cataloguing Rules", "Automatic Catalogue"], "AACR2 is a cataloguing standard."),
          f("MARC stands for:", "Machine-Readable Cataloguing", ["Manual Archival Record", "Modern Catalogue", "Metadata Archive"], "MARC is Machine-Readable Cataloguing."),
          f("An accession number records:", "Order of addition", ["Book price", "Author name", "Publisher"], "Accession numbers record addition order."),
          f("A call number helps to:", "Locate a book on the shelf", ["Buy a book", "Print a book", "Bind a book"], "Call numbers locate books."),
        ],
      },
      {
        slug: "classification",
        facts: [
          f("The Dewey Decimal Classification divides knowledge into:", "10 classes", ["5 classes", "20 classes", "100 classes"], "DDC has ten main classes."),
          f("The Library of Congress Classification uses:", "Letters", ["Only numbers", "Symbols only", "Colours"], "LCC uses letters."),
          f("Classification arranges materials by:", "Subject", ["Colour", "Size", "Price"], "Classification is by subject."),
          f("The Colon Classification was devised by:", "S. R. Ranganathan", ["Melvil Dewey", "Charles Cutter", "Paul Otlet"], "Ranganathan devised Colon Classification."),
          f("DDC was devised by:", "Melvil Dewey", ["S. R. Ranganathan", "Charles Cutter", "Paul Otlet"], "Melvil Dewey devised the DDC."),
          f("Ranganathan's first law is:", "Books are for use", ["Save the time of the reader", "Every book its reader", "Library is a growing organism"], "The first law is 'Books are for use'."),
        ],
      },
      {
        slug: "library-management",
        facts: [
          f("Library management involves:", "Planning and organising services", ["Only buying books", "Only printing", "Only binding"], "Library management organises services."),
          f("Collection development is:", "Building library resources", ["Destroying books", "Selling books", "Burning books"], "Collection development builds resources."),
          f("A library budget allocates funds for:", "Resources and services", ["Only salaries", "Only buildings", "Only furniture"], "Budgets fund resources and services."),
          f("Interlibrary loan allows:", "Borrowing between libraries", ["Buying books", "Selling books", "Printing books"], "Interlibrary loan shares resources."),
          f("A digital library stores:", "Electronic resources", ["Only paper books", "Only furniture", "Only maps"], "Digital libraries store electronic resources."),
          f("User services include:", "Reference and lending", ["Only cataloguing", "Only classification", "Only binding"], "User services include reference and lending."),
        ],
      },
      {
        slug: "information-science",
        facts: [
          f("Information science studies:", "Information and its management", ["Only books", "Only buildings", "Only furniture"], "Information science studies information management."),
          f("Metadata is:", "Data about data", ["Raw data", "A database", "A network"], "Metadata describes data."),
          f("An OPAC is an:", "Online Public Access Catalogue", ["Offline Public Archive", "Open Public Archive", "Online Private Archive"], "OPAC is an online public catalogue."),
          f("Information retrieval deals with:", "Finding stored information", ["Printing books", "Binding books", "Selling books"], "Information retrieval finds stored information."),
          f("A bibliographic database contains:", "References to publications", ["Only full texts", "Only images", "Only audio"], "Bibliographic databases hold references."),
          f("Digitisation converts:", "Analog to digital", ["Digital to analog", "Paper to stone", "Stone to paper"], "Digitisation converts analog to digital."),
        ],
      },
    ],
  },

  {
    slug: "fine-arts",
    topics: [
      {
        slug: "art-history",
        facts: [
          f("The Mona Lisa was painted by:", "Leonardo da Vinci", ["Michelangelo", "Raphael", "Van Gogh"], "Da Vinci painted the Mona Lisa."),
          f("The Renaissance began in:", "Italy", ["France", "England", "Germany"], "The Renaissance began in Italy."),
          f("Impressionism is an art movement from:", "France", ["Italy", "Spain", "Germany"], "Impressionism began in France."),
          f("Starry Night was painted by:", "Van Gogh", ["Monet", "Picasso", "Da Vinci"], "Van Gogh painted Starry Night."),
          f("Cubism is associated with:", "Picasso", ["Monet", "Van Gogh", "Da Vinci"], "Picasso pioneered Cubism."),
          f("The Sistine Chapel ceiling was painted by:", "Michelangelo", ["Da Vinci", "Raphael", "Donatello"], "Michelangelo painted the Sistine ceiling."),
        ],
      },
      {
        slug: "drawing-painting",
        facts: [
          f("Primary colours are:", "Red, blue and yellow", ["Green, orange and purple", "Black and white", "Grey and brown"], "Red, blue and yellow are primary colours."),
          f("Mixing blue and yellow gives:", "Green", ["Purple", "Orange", "Brown"], "Blue and yellow make green."),
          f("Mixing red and yellow gives:", "Orange", ["Green", "Purple", "Brown"], "Red and yellow make orange."),
          f("A sketch is a:", "Rough drawing", ["Finished painting", "Sculpture", "Print"], "A sketch is a rough drawing."),
          f("Watercolour paints are mixed with:", "Water", ["Oil", "Turpentine", "Varnish"], "Watercolours are mixed with water."),
          f("Oil paints are thinned with:", "Turpentine", ["Water", "Milk", "Vinegar"], "Oil paints use turpentine."),
        ],
      },
      {
        slug: "design",
        facts: [
          f("Design involves:", "Planning visual composition", ["Random drawing", "Copying only", "Selling art"], "Design plans visual composition."),
          f("Graphic design is used for:", "Visual communication", ["Sculpture only", "Architecture only", "Music only"], "Graphic design communicates visually."),
          f("A logo is a:", "Visual brand symbol", ["A painting", "A sculpture", "A building"], "A logo is a brand symbol."),
          f("Typography deals with:", "Text design", ["Colour only", "Space only", "Sound"], "Typography designs text."),
          f("Contrast in design refers to:", "Difference between elements", ["Similarity of elements", "Absence of elements", "Size only"], "Contrast is the difference between elements."),
          f("The colour wheel helps to:", "Combine colours", ["Draw lines", "Cut paper", "Build models"], "The colour wheel guides colour combinations."),
        ],
      },
      {
        slug: "calligraphy",
        facts: [
          f("Calligraphy is the art of:", "Beautiful writing", ["Painting landscapes", "Sculpting", "Photography"], "Calligraphy is decorative writing."),
          f("Arabic calligraphy is closely linked to:", "Islamic art", ["Roman art", "Chinese art", "Greek art"], "Arabic calligraphy is central to Islamic art."),
          f("The Naskh script is a style of:", "Arabic calligraphy", ["Chinese calligraphy", "Latin calligraphy", "Greek calligraphy"], "Naskh is an Arabic script."),
          f("A calligraphy pen is called a:", "Qalam", ["Brush", "Crayon", "Marker"], "A qalam is a calligraphy pen."),
          f("Thuluth is a style of:", "Arabic calligraphy", ["Japanese calligraphy", "Persian music", "Indian dance"], "Thuluth is an Arabic calligraphic style."),
          f("Calligraphy requires:", "Precision and practice", ["Speed only", "No skill", "Only colour"], "Calligraphy requires precision."),
        ],
      },
    ],
  },

  {
    slug: "music",
    topics: [
      {
        slug: "music-theory",
        facts: [
          f("How many notes are in a musical octave (Western)?", "8", ["5", "6", "12"], "An octave spans eight notes."),
          f("A musical scale is a series of:", "Notes in order", ["Chords only", "Beats only", "Instruments"], "A scale orders notes."),
          f("The basic unit of rhythm is the:", "Beat", ["Note", "Chord", "Scale"], "The beat is the rhythm unit."),
          f("A chord consists of:", "Multiple notes played together", ["A single note", "A rhythm", "A tempo"], "Chords combine notes."),
          f("Tempo refers to:", "Speed of music", ["Volume", "Pitch", "Timbre"], "Tempo is the speed of music."),
          f("Pitch refers to:", "Highness or lowness of sound", ["Volume", "Speed", "Duration"], "Pitch is the highness or lowness of a sound."),
        ],
      },
      {
        slug: "classical-music",
        facts: [
          f("Which is a classical music tradition of South Asia?", "Hindustani", ["Jazz", "Blues", "Reggae"], "Hindustani is a South Asian classical tradition."),
          f("A Raga in South Asian music is a:", "Melodic framework", ["Rhythm cycle", "Instrument", "Dance"], "A raga is a melodic framework."),
          f("A Tala in South Asian music is a:", "Rhythmic cycle", ["Melody", "Instrument", "Song"], "A tala is a rhythmic cycle."),
          f("The sitar is a:", "String instrument", ["Wind instrument", "Percussion instrument", "Keyboard instrument"], "The sitar is a string instrument."),
          f("The tabla is a:", "Percussion instrument", ["String instrument", "Wind instrument", "Keyboard instrument"], "The tabla is a percussion instrument."),
          f("Ustad is a title for a:", "Master musician", ["Beginner", "Audience member", "Instrument maker"], "Ustad denotes a master musician."),
        ],
      },
      {
        slug: "instruments",
        facts: [
          f("The piano is a:", "Keyboard instrument", ["String instrument only", "Wind instrument", "Percussion instrument only"], "The piano is a keyboard instrument."),
          f("The flute is a:", "Wind instrument", ["String instrument", "Percussion instrument", "Keyboard instrument"], "The flute is a wind instrument."),
          f("The guitar is a:", "String instrument", ["Wind instrument", "Percussion instrument", "Keyboard instrument"], "The guitar is a string instrument."),
          f("The drum is a:", "Percussion instrument", ["String instrument", "Wind instrument", "Keyboard instrument"], "The drum is a percussion instrument."),
          f("The violin is played with a:", "Bow", ["Plectrum", "Hammer", "Stick"], "The violin is bowed."),
          f("The harmonium is a:", "Keyboard instrument", ["String instrument", "Percussion instrument", "Wind instrument only"], "The harmonium is a keyboard instrument."),
        ],
      },
    ],
  },

  {
    slug: "physical-education",
    topics: [
      {
        slug: "sports-science",
        facts: [
          f("Sports science studies:", "Human performance in sport", ["Only rules", "Only history", "Only equipment"], "Sports science studies performance."),
          f("Which nutrient builds muscle?", "Protein", ["Carbohydrate", "Fat", "Water"], "Protein builds muscle."),
          f("Which nutrient is the main energy source for exercise?", "Carbohydrate", ["Protein", "Fat", "Water"], "Carbohydrates fuel exercise."),
          f("Warming up before exercise helps to:", "Prevent injury", ["Cause injury", "Reduce fitness", "Lower strength"], "Warming up prevents injury."),
          f("Aerobic exercise improves:", "Cardiovascular fitness", ["Only strength", "Only flexibility", "Only speed"], "Aerobic exercise improves cardiovascular fitness."),
          f("Rest and recovery are important for:", "Muscle repair", ["Muscle damage", "Fatigue", "Injury"], "Recovery aids muscle repair."),
        ],
      },
      {
        slug: "health-fitness",
        facts: [
          f("BMI stands for:", "Body Mass Index", ["Basic Muscle Index", "Body Movement Index", "Basic Metabolic Index"], "BMI is Body Mass Index."),
          f("A healthy diet includes:", "Balanced nutrients", ["Only sugar", "Only fat", "Only protein"], "A healthy diet is balanced."),
          f("Regular exercise helps to:", "Maintain health", ["Increase disease", "Reduce fitness", "Cause obesity"], "Exercise maintains health."),
          f("Dehydration during exercise should be prevented by:", "Drinking water", ["Avoiding fluids", "Eating sugar", "Resting only"], "Water prevents dehydration."),
          f("Flexibility is improved by:", "Stretching", ["Sprinting", "Lifting only", "Sleeping"], "Stretching improves flexibility."),
          f("Which is a benefit of physical activity?", "Reduced stress", ["Increased stress", "Poor sleep", "Weak muscles"], "Activity reduces stress."),
        ],
      },
      {
        slug: "sports-rules",
        facts: [
          f("How many players are in a football (soccer) team on the field?", "11", ["9", "10", "12"], "A football team fields 11 players."),
          f("How many players are in a cricket team?", "11", ["9", "10", "12"], "A cricket team has 11 players."),
          f("How many players are in a basketball team on the court?", "5", ["6", "7", "4"], "A basketball team has 5 players on court."),
          f("How many players are in a volleyball team on court?", "6", ["5", "7", "8"], "A volleyball team has 6 players."),
          f("In cricket, how many balls are in an over?", "6", ["4", "5", "8"], "An over has six balls."),
          f("A hockey team on the field has how many players?", "11", ["9", "10", "12"], "A hockey team has 11 players."),
        ],
      },
      {
        slug: "olympics",
        facts: [
          f("How often are the Olympic Games held?", "Every four years", ["Every two years", "Every three years", "Every five years"], "The Olympics are held every four years."),
          f("The Olympic Games originated in:", "Greece", ["Italy", "France", "Egypt"], "The Olympics began in Greece."),
          f("The five Olympic rings represent:", "The continents", ["The oceans", "The sports", "The years"], "The rings represent the continents."),
          f("The modern Olympics began in:", "1896", ["1900", "1888", "1912"], "The modern Olympics began in 1896."),
          f("Which country hosted the 2024 Summer Olympics?", "France", ["Japan", "Brazil", "China"], "France hosted the 2024 Summer Olympics."),
          f("The Olympic motto is:", "Faster, Higher, Stronger", ["Win at all costs", "Play and win", "Sport for all"], "The motto is Citius, Altius, Fortius."),
        ],
      },
    ],
  },

  {
    slug: "current-affairs-competitive",
    topics: [
      {
        slug: "ca-international",
        facts: [
          f("The UN was founded in:", "1945", ["1919", "1939", "1950"], "The UN was founded in 1945."),
          f("NATO stands for:", "North Atlantic Treaty Organization", ["National Atlantic Treaty Organization", "North American Trade Organization", "Northern Alliance Treaty Organization"], "NATO is the North Atlantic Treaty Organization."),
          f("BRICS includes Brazil, Russia, India, China and:", "South Africa", ["Saudi Arabia", "Spain", "Sweden"], "South Africa joined BRICS."),
          f("The G20 is a forum of:", "Major economies", ["Small islands", "Only African states", "Only Asian states"], "The G20 comprises major economies."),
          f("The Paris Agreement concerns:", "Climate change", ["Trade", "Defence", "Health"], "The Paris Agreement addresses climate change."),
          f("The European Union's currency is the:", "Euro", ["Pound", "Dollar", "Franc"], "The euro is the EU currency."),
        ],
      },
      {
        slug: "ca-economy",
        facts: [
          f("GDP stands for:", "Gross Domestic Product", ["Gross Development Product", "General Domestic Product", "Global Domestic Product"], "GDP is Gross Domestic Product."),
          f("Inflation is a:", "General rise in prices", ["Fall in prices", "Rise in unemployment", "Fall in income"], "Inflation is rising prices."),
          f("The IMF deals with:", "Monetary cooperation", ["Health", "Culture", "Sports"], "The IMF handles monetary cooperation."),
          f("A recession is a period of:", "Economic decline", ["Economic growth", "Price stability", "High employment"], "A recession is economic decline."),
          f("The World Bank provides:", "Development finance", ["Military aid only", "Cultural grants only", "Sports funding"], "The World Bank funds development."),
          f("Which organisation publishes the Human Development Index?", "UNDP", ["WHO", "IMF", "WTO"], "UNDP publishes the HDI."),
        ],
      },
      {
        slug: "ca-pakistan",
        facts: [
          f("CPEC stands for:", "China-Pakistan Economic Corridor", ["Central Pakistan Economic Council", "China Pakistan Energy Corridor", "Combined Pakistan Economic Committee"], "CPEC is the China-Pakistan Economic Corridor."),
          f("Pakistan's currency is the:", "Rupee", ["Dinar", "Riyal", "Taka"], "Pakistan's currency is the rupee."),
          f("The State Bank of Pakistan is the:", "Central bank", ["Commercial bank", "Investment bank", "Microfinance bank"], "The State Bank is the central bank."),
          f("Pakistan is a member of:", "OIC", ["NATO", "EU", "ASEAN"], "Pakistan is an OIC member."),
          f("The largest city of Pakistan is:", "Karachi", ["Lahore", "Islamabad", "Faisalabad"], "Karachi is the largest city."),
          f("Pakistan's national language is:", "Urdu", ["English", "Punjabi", "Sindhi"], "Urdu is the national language."),
        ],
      },
      {
        slug: "ca-organizations",
        facts: [
          f("The headquarters of the WHO is in:", "Geneva", ["New York", "Paris", "Rome"], "WHO is in Geneva."),
          f("SAARC stands for:", "South Asian Association for Regional Cooperation", ["South Asian Alliance for Regional Commerce", "Southern Asian Association", "South Atlantic Association"], "SAARC is the South Asian Association for Regional Cooperation."),
          f("The UN Security Council has how many permanent members?", "5", ["7", "10", "15"], "There are five permanent members."),
          f("ASEAN is a regional organisation for:", "Southeast Asia", ["Europe", "Africa", "South America"], "ASEAN covers Southeast Asia."),
          f("The World Trade Organization deals with:", "Global trade rules", ["Health", "Culture", "Defence"], "The WTO governs global trade rules."),
          f("UNESCO is concerned with:", "Education and culture", ["Defence", "Trade only", "Sports only"], "UNESCO deals with education and culture."),
        ],
      },
      {
        slug: "ca-science",
        facts: [
          f("Which organisation is responsible for space research in Pakistan?", "SUPARCO", ["NASA", "ISRO", "ESA"], "SUPARCO is Pakistan's space agency."),
          f("The first Pakistani in space was:", "Namira Salim", ["A. Q. Khan", "Abdus Salam", "Malala Yousafzai"], "Namira Salim became the first Pakistani in space (2023)."),
          f("Pakistan's nuclear tests were conducted in:", "1998", ["1974", "1996", "2000"], "Pakistan conducted nuclear tests in 1998."),
          f("Dr. Abdus Salam won the Nobel Prize in:", "Physics", ["Chemistry", "Medicine", "Literature"], "Abdus Salam won the Physics Nobel Prize."),
          f("Which satellite system does Pakistan use for navigation?", "GPS", ["Only GLONASS", "Only Galileo", "Only BeiDou"], "Pakistan uses GPS among others."),
          f("The Internet was invented in:", "1960s", ["1940s", "1980s", "1990s"], "The Internet originated in the 1960s."),
        ],
      },
    ],
  },

  {
    slug: "tourism",
    topics: [
      {
        slug: "tourism-management",
        facts: [
          f("Tourism management involves:", "Planning and promoting travel", ["Only booking", "Only flying", "Only cooking"], "Tourism management plans travel."),
          f("Ecotourism focuses on:", "Sustainable travel", ["Mass tourism", "Luxury only", "Business travel"], "Ecotourism is sustainable."),
          f("A tourist is a person who travels for:", "Leisure or business", ["Only work", "Only study", "Only health"], "Tourists travel for leisure or business."),
          f("Which is a key tourism destination in Pakistan?", "Hunza Valley", ["Sahara", "Amazon", "Alps"], "Hunza Valley is a key destination."),
          f("Tourism contributes to:", "Economic growth", ["Only pollution", "Only migration", "Only trade"], "Tourism drives economic growth."),
          f("A travel agency helps with:", "Trip arrangements", ["Only insurance", "Only visas", "Only tickets"], "Travel agencies arrange trips."),
        ],
      },
      {
        slug: "hospitality",
        facts: [
          f("Hospitality refers to:", "Welcoming and serving guests", ["Selling goods", "Building roads", "Farming"], "Hospitality serves guests."),
          f("Which is part of the hospitality industry?", "Hotels", ["Mining", "Fishing", "Construction"], "Hotels are hospitality businesses."),
          f("Guest satisfaction is important in:", "Hospitality", ["Mining", "Farming", "Manufacturing"], "Satisfaction matters in hospitality."),
          f("Front office in a hotel handles:", "Guest check-in", ["Only cooking", "Only cleaning", "Only accounting"], "Front office handles check-in."),
          f("Housekeeping maintains:", "Cleanliness", ["Finances", "Marketing", "Security only"], "Housekeeping maintains cleanliness."),
          f("A concierge assists guests with:", "Services and information", ["Cooking", "Accounting", "Farming"], "Concierges assist guests."),
        ],
      },
      {
        slug: "travel-geography",
        facts: [
          f("Which is the highest mountain in Pakistan?", "K2", ["Nanga Parbat", "Rakaposhi", "Tirich Mir"], "K2 is Pakistan's highest mountain."),
          f("The Hunza Valley is located in:", "Gilgit-Baltistan", ["Punjab", "Sindh", "Balochistan"], "Hunza is in Gilgit-Baltistan."),
          f("Which city is known as the 'City of Gardens'?", "Lahore", ["Karachi", "Peshawar", "Quetta"], "Lahore is the City of Gardens."),
          f("The Karakoram Highway connects Pakistan with:", "China", ["India", "Iran", "Afghanistan"], "The KKH connects Pakistan and China."),
          f("Which sea lies to the south of Pakistan?", "Arabian Sea", ["Bay of Bengal", "Red Sea", "Caspian Sea"], "The Arabian Sea is to the south."),
          f("Mohenjo-daro is located in:", "Sindh", ["Punjab", "KP", "Balochistan"], "Mohenjo-daro is in Sindh."),
        ],
      },
    ],
  },

  {
    slug: "research-methods",
    topics: [
      {
        slug: "research-design",
        facts: [
          f("A research design is a:", "Plan for conducting research", ["A result", "A sample", "A citation"], "Research design plans the study."),
          f("Quantitative research uses:", "Numerical data", ["Narrative data", "Images only", "Music"], "Quantitative research uses numbers."),
          f("Qualitative research uses:", "Non-numerical data", ["Numerical data only", "Only statistics", "Only equations"], "Qualitative research uses non-numerical data."),
          f("An experiment tests:", "Cause and effect", ["Only correlation", "Only description", "Only opinion"], "Experiments test cause and effect."),
          f("A hypothesis is a:", "Testable prediction", ["A conclusion", "A citation", "A sample"], "A hypothesis is a testable prediction."),
          f("A control group is used for:", "Comparison", ["Treatment", "Measurement only", "Sampling only"], "Control groups provide comparison."),
        ],
      },
      {
        slug: "research-methodology",
        facts: [
          f("A literature review summarises:", "Existing research", ["New data", "Only results", "Only methods"], "A literature review summarises prior work."),
          f("A variable that is manipulated is the:", "Independent variable", ["Dependent variable", "Control variable", "Constant"], "The independent variable is manipulated."),
          f("A variable that is measured is the:", "Dependent variable", ["Independent variable", "Control variable", "Constant"], "The dependent variable is measured."),
          f("Reliability refers to:", "Consistency of results", ["Accuracy only", "Validity only", "Bias"], "Reliability is consistency."),
          f("Validity refers to:", "Accuracy of measurement", ["Consistency only", "Speed", "Cost"], "Validity is accuracy of measurement."),
          f("A pilot study is a:", "Small preliminary study", ["Final study", "Meta-analysis", "Survey only"], "A pilot study is preliminary."),
        ],
      },
      {
        slug: "data-collection",
        facts: [
          f("A questionnaire is used to:", "Collect data", ["Analyse data", "Publish data", "Store data"], "Questionnaires collect data."),
          f("An interview is a:", "Data collection method", ["Statistical test", "Sampling frame", "Citation"], "Interviews collect data."),
          f("Observation involves:", "Watching behaviour", ["Asking questions", "Reading books", "Running tests"], "Observation watches behaviour."),
          f("A focus group is a:", "Group discussion", ["Survey", "Experiment", "Test"], "A focus group is a discussion."),
          f("Primary data is collected:", "First-hand", ["From books", "From journals", "From archives"], "Primary data is first-hand."),
          f("Secondary data is:", "Already collected data", ["First-hand data", "New data", "Experimental data"], "Secondary data already exists."),
        ],
      },
      {
        slug: "academic-writing",
        facts: [
          f("An abstract is a:", "Summary of a study", ["Full report", "Citation", "Table"], "An abstract summarises a study."),
          f("The IMRaD structure stands for:", "Introduction, Methods, Results and Discussion", ["Idea, Method, Report, Data", "Intro, Model, Review, Draft", "Index, Map, Result, Detail"], "IMRaD is a standard paper structure."),
          f("Plagiarism is:", "Using others' work without credit", ["Citing sources", "Paraphrasing with credit", "Summarising"], "Plagiarism is uncredited use."),
          f("A thesis is a:", "Long research document", ["A short note", "A citation", "A table"], "A thesis is a long research document."),
          f("Academic writing should be:", "Clear and formal", ["Vague", "Informal", "Biased"], "Academic writing is clear and formal."),
          f("Peer review is:", "Evaluation by experts", ["Self-review", "Editing", "Proofreading only"], "Peer review evaluates by experts."),
        ],
      },
      {
        slug: "referencing",
        facts: [
          f("APA is a:", "Referencing style", ["Statistical test", "Sampling method", "Software"], "APA is a referencing style."),
          f("A citation acknowledges:", "A source", ["A result", "A sample", "A variable"], "Citations acknowledge sources."),
          f("A bibliography is a list of:", "Sources", ["Results", "Tables", "Charts"], "A bibliography lists sources."),
          f("In-text citation appears:", "Within the text", ["Only at the end", "Only in tables", "Only in footers"], "In-text citations appear in the text."),
          f("MLA is a:", "Referencing style", ["Data type", "Software", "Method"], "MLA is a referencing style."),
          f("Plagiarism can be avoided by:", "Proper citation", ["Copying", "Omitting sources", "Paraphrasing without credit"], "Proper citation avoids plagiarism."),
        ],
      },
    ],
  },

  {
    slug: "jurisprudence",
    topics: [
      {
        slug: "legal-theory",
        facts: [
          f("Jurisprudence is the study of:", "Legal theory", ["Legal practice only", "Court procedure only", "Legal history only"], "Jurisprudence is legal theory."),
          f("Natural law theory holds that law should reflect:", "Moral principles", ["Only power", "Only custom", "Only economy"], "Natural law links law and morality."),
          f("Legal positivism holds that law is:", "What is enacted by authority", ["Only morality", "Only custom", "Only religion"], "Positivism ties law to authority."),
          f("Austin is associated with:", "Legal positivism", ["Natural law", "Sociological jurisprudence", "Realism"], "Austin is a legal positivist."),
          f("Sociological jurisprudence studies:", "Law and society", ["Only statutes", "Only morality", "Only religion"], "It studies law in society."),
          f("Legal realism focuses on:", "How law actually works", ["Only theory", "Only morality", "Only religion"], "Realism studies law in practice."),
        ],
      },
      {
        slug: "natural-law",
        facts: [
          f("Natural law is derived from:", "Reason and morality", ["Parliament only", "Custom only", "Force"], "Natural law derives from reason and morality."),
          f("St. Thomas Aquinas is associated with:", "Natural law", ["Positivism", "Realism", "Marxism"], "Aquinas is a natural law theorist."),
          f("An unjust law, under natural law theory, is:", "Not truly law", ["Always valid", "Always binding", "Always moral"], "Natural law theory questions unjust laws."),
          f("Natural rights include the right to:", "Life and liberty", ["Property only", "Trade only", "Tax only"], "Natural rights include life and liberty."),
          f("The Universal Declaration of Human Rights reflects:", "Natural law ideas", ["Positivism only", "Realism only", "Marxism only"], "The UDHR reflects natural rights ideas."),
          f("Natural law is considered:", "Universal", ["Local only", "Temporary", "Optional"], "Natural law is regarded as universal."),
        ],
      },
      {
        slug: "positive-law",
        facts: [
          f("Positive law is law that is:", "Enacted by a sovereign", ["Based on morality", "Based on custom", "Based on religion"], "Positive law is sovereign-enacted law."),
          f("Which theorist is linked to positive law?", "John Austin", ["Aquinas", "Plato", "Aristotle"], "Austin is linked to positive law."),
          f("Hans Kelsen developed the:", "Pure theory of law", ["Natural law theory", "Realist theory", "Marxist theory"], "Kelsen developed the pure theory of law."),
          f("According to positivism, law and morality are:", "Separate", ["Identical", "Related always", "Contradictory"], "Positivism separates law and morality."),
          f("A constitution is an example of:", "Positive law", ["Natural law", "Custom", "Morality"], "A constitution is positive law."),
          f("Legislation is a source of:", "Positive law", ["Natural law only", "Morality only", "Religion only"], "Legislation is positive law."),
        ],
      },
      {
        slug: "legal-concepts",
        facts: [
          f("A legal right is a:", "Claim recognised by law", ["Moral claim only", "Custom only", "Force"], "Legal rights are recognised by law."),
          f("A legal duty is an:", "Obligation imposed by law", ["Optional act", "Moral choice", "Custom only"], "Legal duties are legal obligations."),
          f("Legal personality refers to:", "Capacity to have rights and duties", ["Physical person only", "Wealth", "Power"], "Legal personality is capacity for rights."),
          f("Sovereignty in law means:", "Supreme authority", ["Obedience", "Custom", "Morality"], "Sovereignty is supreme legal authority."),
          f("A sanction is a:", "Penalty for breaking law", ["Reward", "Right", "Duty"], "Sanctions are penalties."),
          f("Custom becomes law when:", "Recognised by courts", ["Ignored", "Rejected", "Disputed"], "Judicial recognition makes custom law."),
        ],
      },
    ],
  },

  {
    slug: "marketing",
    topics: [
      {
        slug: "marketing-principles",
        facts: [
          f("Marketing begins with:", "Understanding customer needs", ["Setting a price", "Advertising", "Distribution"], "Marketing begins with customer needs."),
          f("A marketing channel moves goods from producer to:", "Consumer", ["Regulator", "Auditor", "Banker"], "Channels move goods to consumers."),
          f("Market share is a firm's sales as a share of:", "Total market sales", ["Its own costs", "Its own profit", "Its own staff"], "Market share is a share of total market sales."),
          f("A niche market is:", "A specialised segment", ["The whole market", "No market", "A foreign market"], "A niche market is a specialised segment."),
          f("Penetration pricing sets an initial price that is:", "Low", ["High", "Fixed", "Zero"], "Penetration pricing starts low."),
          f("A unique selling proposition is a:", "Distinctive product benefit", ["Discount offer", "Distribution route", "Payment term"], "A USP is a distinctive benefit."),
        ],
      },
      {
        slug: "consumer-behaviour",
        facts: [
          f("Consumer behaviour studies:", "How buyers make decisions", ["Only production", "Only pricing", "Only advertising"], "It studies buyer decisions."),
          f("Which factor influences consumer behaviour?", "Culture", ["Only price", "Only place", "Only product"], "Culture influences consumer behaviour."),
          f("Maslow's hierarchy explains:", "Needs and motivation", ["Prices", "Places", "Products"], "Maslow explains needs and motivation."),
          f("A buying decision process begins with:", "Need recognition", ["Purchase", "Post-purchase", "Evaluation"], "The process begins with need recognition."),
          f("Reference groups influence:", "Consumer choices", ["Production", "Pricing", "Distribution"], "Reference groups influence choices."),
          f("Cognitive dissonance is:", "Post-purchase doubt", ["Pre-purchase joy", "Price change", "Product launch"], "Dissonance is post-purchase doubt."),
        ],
      },
      {
        slug: "branding",
        facts: [
          f("A brand is a:", "Name, symbol or design identifying a product", ["A price", "A place", "A person"], "A brand identifies a product."),
          f("Brand equity is the:", "Value added by a brand name", ["Product cost", "Price", "Place"], "Brand equity is the added value of a brand."),
          f("Brand loyalty is:", "Repeat purchasing", ["One-time purchase", "Switching brands", "Complaining"], "Brand loyalty is repeat purchasing."),
          f("A brand ambassador represents a brand to:", "Consumers", ["Suppliers", "Employees", "Regulators"], "Brand ambassadors represent to consumers."),
          f("Positioning is about:", "How a brand is perceived", ["Where it is sold", "Its price only", "Its size"], "Positioning is perception in the consumer's mind."),
          f("Rebranding changes a brand's:", "Identity", ["Only price", "Only place", "Only product"], "Rebranding changes brand identity."),
        ],
      },
      {
        slug: "digital-marketing",
        facts: [
          f("SEO stands for:", "Search Engine Optimization", ["Social Engine Optimization", "Search Engine Operation", "Site Engine Optimization"], "SEO is Search Engine Optimization."),
          f("Social media marketing uses:", "Social platforms", ["Only newspapers", "Only radio", "Only TV"], "Social media marketing uses social platforms."),
          f("Email marketing targets:", "Subscribers", ["Only walk-ins", "Only callers", "Only visitors"], "Email marketing targets subscribers."),
          f("A click-through rate measures:", "Clicks per impression", ["Sales per click", "Revenue per user", "Cost per view"], "CTR measures clicks per impression."),
          f("Content marketing focuses on:", "Valuable content", ["Only ads", "Only prices", "Only packaging"], "Content marketing provides value."),
          f("PPC stands for:", "Pay Per Click", ["Price Per Customer", "Product Per Cost", "Profit Per Client"], "PPC is Pay Per Click."),
        ],
      },
      {
        slug: "market-research",
        facts: [
          f("Market research gathers information about:", "Customers and markets", ["Only products", "Only prices", "Only places"], "Market research studies customers and markets."),
          f("A survey is a:", "Data collection tool", ["A pricing method", "A distribution channel", "A promotion"], "Surveys collect data."),
          f("A sample in market research is a:", "Subset of a population", ["Whole population", "A product", "A price"], "A sample is a subset."),
          f("Primary research is collected:", "First-hand", ["From reports", "From archives", "From journals"], "Primary research is first-hand."),
          f("Secondary research uses:", "Existing data", ["New data", "Field data", "Experimental data"], "Secondary research uses existing data."),
          f("A focus group provides:", "Qualitative insights", ["Statistical proof", "Financial data", "Production data"], "Focus groups give qualitative insights."),
        ],
      },
    ],
  },

  {
    slug: "english-literature",
    topics: [
      {
        slug: "elizabethan-age",
        facts: [
          f("William Shakespeare wrote in the:", "Elizabethan age", ["Victorian age", "Romantic age", "Modern age"], "Shakespeare wrote in the Elizabethan era."),
          f("Which is a Shakespearean tragedy?", "Hamlet", ["Pride and Prejudice", "Jane Eyre", "Oliver Twist"], "Hamlet is a Shakespearean tragedy."),
          f("Christopher Marlowe wrote:", "Doctor Faustus", ["Hamlet", "Macbeth", "King Lear"], "Marlowe wrote Doctor Faustus."),
          f("The Globe Theatre is associated with:", "Shakespeare", ["Dickens", "Wordsworth", "Joyce"], "The Globe is linked to Shakespeare."),
          f("Which is a Shakespearean comedy?", "A Midsummer Night's Dream", ["Hamlet", "Othello", "King Lear"], "A Midsummer Night's Dream is a comedy."),
          f("Edmund Spenser wrote:", "The Faerie Queene", ["Paradise Lost", "The Canterbury Tales", "Utopia"], "Spenser wrote The Faerie Queene."),
        ],
      },
      {
        slug: "romantic-age",
        facts: [
          f("William Wordsworth was a:", "Romantic poet", ["Victorian novelist", "Modern dramatist", "Elizabethan playwright"], "Wordsworth was a Romantic poet."),
          f("Which poem is by Wordsworth?", "Daffodils", ["Ode to a Nightingale", "The Waste Land", "Paradise Lost"], "Wordsworth wrote Daffodils."),
          f("John Keats wrote:", "Ode to a Nightingale", ["Daffodils", "The Raven", "Ulysses"], "Keats wrote Ode to a Nightingale."),
          f("Lord Byron was a:", "Romantic poet", ["Victorian novelist", "Modern poet", "Elizabethan dramatist"], "Byron was a Romantic poet."),
          f("Shelley wrote:", "Ode to the West Wind", ["Daffodils", "The Raven", "Ulysses"], "Shelley wrote Ode to the West Wind."),
          f("The Romantic movement emphasised:", "Emotion and nature", ["Reason and logic", "Industry", "Science"], "Romanticism emphasised emotion and nature."),
        ],
      },
      {
        slug: "victorian-age",
        facts: [
          f("Charles Dickens wrote:", "Oliver Twist", ["Hamlet", "Jane Eyre", "Ulysses"], "Dickens wrote Oliver Twist."),
          f("Charlotte Bronte wrote:", "Jane Eyre", ["Oliver Twist", "Wuthering Heights", "Middlemarch"], "Charlotte Bronte wrote Jane Eyre."),
          f("Emily Bronte wrote:", "Wuthering Heights", ["Jane Eyre", "Oliver Twist", "Great Expectations"], "Emily Bronte wrote Wuthering Heights."),
          f("Thomas Hardy wrote:", "Tess of the d'Urbervilles", ["Jane Eyre", "Oliver Twist", "Ulysses"], "Hardy wrote Tess of the d'Urbervilles."),
          f("The Victorian era refers to the reign of:", "Queen Victoria", ["Queen Elizabeth", "King George", "King Henry"], "The Victorian era is Queen Victoria's reign."),
          f("Alfred Lord Tennyson was a:", "Poet", ["Novelist", "Dramatist", "Essayist"], "Tennyson was a Victorian poet."),
        ],
      },
      {
        slug: "modern-age",
        facts: [
          f("James Joyce wrote:", "Ulysses", ["Jane Eyre", "Oliver Twist", "Hamlet"], "Joyce wrote Ulysses."),
          f("T. S. Eliot wrote:", "The Waste Land", ["Daffodils", "Ulysses", "Jane Eyre"], "Eliot wrote The Waste Land."),
          f("Virginia Woolf wrote:", "Mrs Dalloway", ["Ulysses", "Jane Eyre", "Oliver Twist"], "Woolf wrote Mrs Dalloway."),
          f("George Orwell wrote:", "1984", ["Ulysses", "Jane Eyre", "Hamlet"], "Orwell wrote 1984."),
          f("Modernism emerged in the:", "Early 20th century", ["16th century", "18th century", "19th century"], "Modernism emerged in the early 20th century."),
          f("Stream of consciousness is associated with:", "Modernist fiction", ["Elizabethan drama", "Romantic poetry", "Victorian novels"], "Stream of consciousness is a modernist technique."),
        ],
      },
      {
        slug: "poetry-criticism",
        facts: [
          f("A sonnet has how many lines?", "14", ["12", "16", "18"], "A sonnet has 14 lines."),
          f("A Shakespearean sonnet has how many quatrains?", "3", ["2", "4", "5"], "A Shakespearean sonnet has three quatrains and a couplet."),
          f("A metaphor is a:", "Implied comparison", ["Direct comparison", "Exaggeration", "Repetition"], "A metaphor is an implied comparison."),
          f("A simile uses:", "Like or as", ["Only rhyme", "Only rhythm", "Only alliteration"], "Similes compare using like or as."),
          f("Alliteration is:", "Repetition of initial sounds", ["Repetition of rhymes", "Repetition of words only", "Repetition of lines"], "Alliteration repeats initial consonant sounds."),
          f("A rhyme scheme is the:", "Pattern of rhymes", ["Number of lines", "Number of stanzas", "Length of lines"], "A rhyme scheme is the pattern of rhymes."),
        ],
      },
      {
        slug: "drama-shakespeare",
        facts: [
          f("Which is a Shakespearean tragedy?", "Macbeth", ["Much Ado About Nothing", "As You Like It", "Twelfth Night"], "Macbeth is a tragedy."),
          f("In 'Hamlet', the prince is from:", "Denmark", ["England", "Scotland", "Italy"], "Hamlet is the prince of Denmark."),
          f("'Romeo and Juliet' is set in:", "Verona", ["Venice", "Rome", "Florence"], "Romeo and Juliet is set in Verona."),
          f("Which character says 'To be, or not to be'?", "Hamlet", ["Macbeth", "Othello", "Lear"], "Hamlet delivers that soliloquy."),
          f("'Othello' is a:", "Tragedy", ["Comedy", "History", "Romance"], "Othello is a tragedy."),
          f("Shakespeare wrote how many plays (approx.)?", "37", ["20", "50", "100"], "Shakespeare wrote about 37 plays."),
        ],
      },
      {
        slug: "novel-fiction",
        facts: [
          f("A novel is a:", "Long work of fiction", ["Short poem", "Play", "Essay"], "A novel is a long fictional work."),
          f("The author of 'Pride and Prejudice' is:", "Jane Austen", ["Emily Bronte", "Virginia Woolf", "George Eliot"], "Jane Austen wrote Pride and Prejudice."),
          f("A protagonist is the:", "Main character", ["Villain", "Narrator only", "Setting"], "The protagonist is the main character."),
          f("The antagonist is the:", "Opponent of the protagonist", ["Main character", "Narrator", "Setting"], "The antagonist opposes the protagonist."),
          f("A plot is the:", "Sequence of events", ["Setting", "Character", "Theme"], "The plot is the sequence of events."),
          f("A theme is the:", "Central idea", ["Setting", "Character", "Plot only"], "A theme is the central idea."),
        ],
      },
      {
        slug: "literary-criticism",
        facts: [
          f("Literary criticism is the:", "Analysis of literature", ["Writing of literature", "Printing of literature", "Selling of literature"], "Criticism analyses literature."),
          f("New Criticism focuses on:", "The text itself", ["The author's life", "The reader's feelings", "Historical context"], "New Criticism focuses on close reading of the text."),
          f("Marxist criticism examines:", "Class and power", ["Only form", "Only rhyme", "Only setting"], "Marxist criticism examines class and power."),
          f("Feminist criticism examines:", "Gender in literature", ["Only form", "Only rhyme", "Only genre"], "Feminist criticism examines gender."),
          f("Structuralism studies:", "Underlying structures", ["Only authors", "Only readers", "Only history"], "Structuralism studies underlying structures."),
          f("Deconstruction is associated with:", "Derrida", ["Aristotle", "Plato", "Wordsworth"], "Derrida is associated with deconstruction."),
        ],
      },
    ],
  },

  {
    slug: "urdu-literature",
    language: "URDU",
    topics: [
      {
        slug: "urdu-shaeri",
        facts: [
          f("Urdu poetry's most popular form is the:", "Ghazal", ["Sonnet", "Haiku", "Ode"], "The ghazal is the most popular Urdu poetic form."),
          f("Mirza Ghalib was a famous:", "Urdu poet", ["Novelist", "Dramatist", "Journalist"], "Ghalib was a celebrated Urdu poet."),
          f("Allama Iqbal is known as:", "Shair-e-Mashriq", ["Shair-e-Urdu", "Baba-e-Urdu", "Ustad-e-Sukhan"], "Iqbal is called Shair-e-Mashriq."),
          f("A 'sher' is a:", "Couplet", ["Quatrain", "Sonnet", "Ode"], "A sher is a couplet in Urdu poetry."),
          f("A collection of ghazals is called a:", "Diwan", ["Nazm", "Afsana", "Drama"], "A Diwan is a collection of ghazals."),
          f("Faiz Ahmed Faiz was a:", "Urdu poet", ["Novelist only", "Dramatist only", "Painter"], "Faiz was a renowned Urdu poet."),
        ],
      },
      {
        slug: "urdu-nasar",
        facts: [
          f("'nasar' in Urdu literature means:", "Prose", ["Poetry", "Drama", "Song"], "Nasar is Urdu prose."),
          f("Sir Syed Ahmed Khan promoted:", "Urdu prose", ["Urdu poetry only", "Urdu drama only", "Urdu film"], "Sir Syed promoted Urdu prose."),
          f("Maulana Abul Kalam Azad wrote:", "Tazkira", ["Diwan", "Ghazal", "Nazm"], "Azad wrote prose works including Tazkira."),
          f("Muhammad Husain Azad wrote:", "Aab-e-Hayat", ["Diwan-e-Ghalib", "Bang-e-Dara", "Afsanay"], "Azad wrote Aab-e-Hayat."),
          f("Urdu prose developed greatly in the:", "19th century", ["16th century", "17th century", "21st century"], "Urdu prose flourished in the 19th century."),
          f("Patras Bokhari was known for:", "Humour", ["Tragedy", "Epic", "Ghazal"], "Patras Bokhari was famous for humour."),
        ],
      },
      {
        slug: "urdu-novel",
        facts: [
          f("The first Urdu novel is often considered:", "Mirat-ul-Uroos", ["Aab-e-Hayat", "Diwan", "Bang-e-Dara"], "Mirat-ul-Uroos is considered an early Urdu novel."),
          f("Premchand wrote in:", "Urdu and Hindi", ["Only Urdu", "Only Hindi", "Only English"], "Premchand wrote in Urdu and Hindi."),
          f("'Aag Ka Darya' was written by:", "Qurratulain Hyder", ["Premchand", "Faiz", "Ghalib"], "Qurratulain Hyder wrote Aag Ka Darya."),
          f("An Urdu novel is called a:", "Novel", ["Ghazal", "Nazm", "Sher"], "An Urdu novel is called a novel."),
          f("Rashid ul Khairi promoted:", "Women's writing", ["Poetry only", "Drama only", "Film"], "Rashid ul Khairi promoted women's writing."),
          f("Bano Qudsia wrote:", "Raja Gidh", ["Aag Ka Darya", "Afsanay", "Bang-e-Dara"], "Bano Qudsia wrote Raja Gidh."),
        ],
      },
      {
        slug: "urdu-afsana",
        facts: [
          f("'afsana' means:", "Short story", ["Novel", "Poem", "Drama"], "Afsana is the Urdu short story."),
          f("Saadat Hasan Manto was a master of:", "Short story", ["Epic", "Ghazal", "Drama"], "Manto mastered the short story."),
          f("'Toba Tek Singh' was written by:", "Saadat Hasan Manto", ["Premchand", "Faiz", "Ghalib"], "Manto wrote Toba Tek Singh."),
          f("Krishan Chander wrote:", "Short stories", ["Only novels", "Only poems", "Only dramas"], "Krishan Chander wrote short stories."),
          f("The Urdu short story flourished in the:", "20th century", ["16th century", "17th century", "21st century"], "The Urdu short story flourished in the 20th century."),
          f("Rajinder Singh Bedi wrote:", "Short stories", ["Only epics", "Only ghazals", "Only dramas"], "Bedi wrote short stories."),
        ],
      },
      {
        slug: "urdu-tanqeed",
        facts: [
          f("'tanqeed' means:", "Criticism", ["Poetry", "Fiction", "Drama"], "Tanqeed is literary criticism."),
          f("Muhammad Husain Azad wrote criticism on:", "Urdu poetry", ["Urdu film", "Urdu drama", "Urdu music"], "Azad criticised Urdu poetry."),
          f("Ehtesham Hussain was an Urdu:", "Critic", ["Poet only", "Novelist only", "Painter"], "Ehtesham Hussain was a critic."),
          f("Al-e-Ahmad Suroor was a:", "Critic", ["Singer", "Painter", "Actor"], "Suroor was a critic."),
          f("Urdu criticism developed in the:", "20th century", ["16th century", "17th century", "21st century"], "Urdu criticism developed in the 20th century."),
          f("A review of a book is called:", "Tabsira", ["Ghazal", "Nazm", "Sher"], "A tabsira is a review."),
        ],
      },
      {
        slug: "urdu-sahafat-tareekh",
        facts: [
          f("'sahafat' means:", "Journalism", ["Poetry", "Fiction", "Drama"], "Sahafat is journalism."),
          f("The first Urdu newspaper is often considered:", "Jam-e-Jahan Numa", ["Dawn", "Jang", "Nawa-i-Waqt"], "Jam-e-Jahan Numa was an early Urdu newspaper."),
          f("Maulana Zafar Ali Khan published:", "Zamindar", ["Dawn", "Jang", "Nawa-i-Waqt"], "Zafar Ali Khan published Zamindar."),
          f("Urdu journalism grew during the:", "Freedom movement", ["Mughal era", "British conquest", "21st century"], "Urdu journalism grew with the freedom movement."),
          f("Muhammad Ali Jinnah's newspaper was:", "Dawn", ["Jang", "Zamindar", "Nawa-i-Waqt"], "Dawn was associated with Jinnah."),
          f("'Akhbar' means:", "Newspaper", ["Magazine", "Book", "Letter"], "Akhbar means newspaper."),
        ],
      },
    ],
  },

  {
    slug: "sindhi-literature",
    language: "SINDHI",
    topics: [
      {
        slug: "sindhi-classical-poetry",
        facts: [
          f("Shah Abdul Latif Bhittai wrote:", "Shah Jo Risalo", ["Diwan-e-Ghalib", "Bang-e-Dara", "Aab-e-Hayat"], "Bhittai wrote Shah Jo Risalo."),
          f("Shah Jo Risalo is written in:", "Sindhi", ["Urdu", "Persian", "Punjabi"], "Shah Jo Risalo is in Sindhi."),
          f("Shah Abdul Latif Bhittai lived in the:", "18th century", ["16th century", "20th century", "21st century"], "Bhittai lived in the 18th century."),
          f("Sachal Sarmast was a:", "Sindhi poet", ["Novelist", "Dramatist", "Journalist"], "Sachal Sarmast was a Sindhi poet."),
          f("The 'Sur' in Shah Jo Risalo refers to:", "Musical modes", ["Chapters only", "Letters", "Numbers"], "Sur refers to musical modes."),
          f("Sindhi classical poetry is often sung in:", "Raag", ["Sonnet", "Haiku", "Ode"], "Sindhi classical poetry is sung in raags."),
        ],
      },
      {
        slug: "sindhi-modern-literature",
        facts: [
          f("Modern Sindhi literature developed in the:", "20th century", ["16th century", "17th century", "18th century"], "Modern Sindhi literature developed in the 20th century."),
          f("Sindhi prose includes:", "Short stories and novels", ["Only poetry", "Only drama", "Only songs"], "Sindhi prose includes fiction."),
          f("Shaikh Ayaz was a:", "Sindhi poet", ["Novelist only", "Painter", "Actor"], "Shaikh Ayaz was a Sindhi poet."),
          f("Sindhi literature reflects:", "Culture and resistance", ["Only romance", "Only religion", "Only history"], "Sindhi literature reflects culture and resistance."),
          f("A Sindhi short story is called:", "Afsano", ["Ghazal", "Nazm", "Sher"], "Afsano is the Sindhi short story."),
          f("Jamal Abro wrote:", "Sindhi short stories", ["Only epics", "Only ghazals", "Only dramas"], "Jamal Abro wrote Sindhi short stories."),
        ],
      },
      {
        slug: "sindhi-writers",
        facts: [
          f("Shah Abdul Latif Bhittai is the greatest:", "Sindhi poet", ["Sindhi novelist", "Sindhi dramatist", "Sindhi journalist"], "Bhittai is the greatest Sindhi poet."),
          f("Sachal Sarmast's real name was:", "Abdul Wahab", ["Abdul Latif", "Ghulam Ali", "Muhammad Yousuf"], "Sachal Sarmast was born Abdul Wahab."),
          f("Mirza Kalich Beg is known as the father of:", "Sindhi prose", ["Sindhi poetry", "Sindhi drama", "Sindhi film"], "Kalich Beg is called the father of Sindhi prose."),
          f("Hassam-ud-Din Rashdi was a Sindhi:", "Writer and scholar", ["Painter", "Singer", "Actor"], "Rashdi was a Sindhi writer and scholar."),
          f("Ali Bhai was associated with Sindhi:", "Theatre", ["Painting", "Music only", "Dance only"], "Ali Bhai was linked to Sindhi theatre."),
          f("Sindhi writers have contributed to:", "Sindhi language and identity", ["Only economics", "Only politics", "Only science"], "Sindhi writers shaped language and identity."),
        ],
      },
    ],
  },
];
