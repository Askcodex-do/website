/**
 * Gap-fill banks.
 *
 * A handful of topics had their content de-duplicated against a sibling topic
 * (the same facts were emitted under two topics and the global content hash kept
 * only the first). These facts give each such topic distinct, valid content so
 * no topic is left empty.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const GAP_BANKS: SubjectSpec[] = [
  {
    slug: "arabic",
    topics: [
      {
        slug: "arabic-grammar",
        facts: [
          f("Arabic grammar is called:", "Nahw", ["Sarf", "Balagha", "Adab"], "Nahw is Arabic grammar."),
          f("In Arabic, a verb usually comes:", "First in the sentence", ["Last in the sentence", "In the middle", "Nowhere"], "Arabic verbs typically precede the subject."),
          f("Arabic nouns have how many cases?", "3", ["2", "4", "5"], "Arabic has nominative, accusative and genitive cases."),
          f("The Arabic word for 'the' is:", "Al-", ["El-", "La-", "Il-"], "'Al-' is the Arabic definite article."),
          f("Arabic dual number refers to:", "Exactly two", ["One", "Three", "Many"], "The dual refers to exactly two."),
          f("A masculine noun in Arabic is called:", "Mudhakkar", ["Muannath", "Jamid", "Mushtaq"], "Mudhakkar is masculine."),
        ],
      },
    ],
  },
  {
    slug: "persian",
    topics: [
      {
        slug: "persian-poetry",
        facts: [
          f("Rumi wrote in:", "Persian", ["Arabic", "Urdu", "Turkish"], "Rumi wrote in Persian."),
          f("The Masnavi was written by:", "Rumi", ["Hafiz", "Saadi", "Ferdowsi"], "Rumi wrote the Masnavi."),
          f("Hafiz is famous for his:", "Ghazals", ["Epics", "Novels", "Plays"], "Hafiz is famous for ghazals."),
          f("The Gulistan was written by:", "Saadi", ["Rumi", "Hafiz", "Ferdowsi"], "Saadi wrote the Gulistan."),
          f("Ferdowsi wrote the:", "Shahnameh", ["Masnavi", "Gulistan", "Divan"], "Ferdowsi wrote the Shahnameh."),
          f("Persian poetry often uses the form:", "Ghazal", ["Sonnet", "Haiku", "Limerick"], "Persian poetry often uses the ghazal."),
        ],
      },
    ],
  },
  {
    slug: "punjabi",
    topics: [
      {
        slug: "punjabi-prose",
        facts: [
          f("Punjabi prose includes:", "Short stories and essays", ["Only poetry", "Only songs", "Only drama"], "Punjabi prose includes stories and essays."),
          f("Modern Punjabi prose developed in the:", "20th century", ["16th century", "17th century", "18th century"], "Modern Punjabi prose developed in the 20th century."),
          f("A Punjabi short story is called:", "Kahani", ["Ghazal", "Nazm", "Sher"], "Kahani is a Punjabi short story."),
          f("Punjabi prose is used in:", "Education and media", ["Only music", "Only dance", "Only painting"], "Punjabi prose is used in education and media."),
          f("Punjabi novels grew popular in the:", "20th century", ["15th century", "16th century", "17th century"], "Punjabi novels grew in the 20th century."),
          f("Punjabi essays often discuss:", "Social themes", ["Only astronomy", "Only geology", "Only chemistry"], "Punjabi essays often discuss social themes."),
        ],
      },
    ],
  },
  {
    slug: "pashto",
    topics: [
      {
        slug: "pashto-prose",
        facts: [
          f("Pashto prose includes:", "Short stories and essays", ["Only poetry", "Only songs", "Only drama"], "Pashto prose includes stories and essays."),
          f("Modern Pashto prose developed in the:", "20th century", ["16th century", "17th century", "18th century"], "Modern Pashto prose developed in the 20th century."),
          f("A Pashto short story is called:", "Qissa", ["Ghazal", "Nazm", "Sher"], "Qissa is a Pashto story."),
          f("Pashto prose is used in:", "Education and media", ["Only music", "Only dance", "Only painting"], "Pashto prose is used in education and media."),
          f("Pashto novels grew popular in the:", "20th century", ["15th century", "16th century", "17th century"], "Pashto novels grew in the 20th century."),
          f("Pashto essays often discuss:", "Social and tribal themes", ["Only astronomy", "Only geology", "Only chemistry"], "Pashto essays often discuss social themes."),
        ],
      },
    ],
  },
  {
    slug: "sindhi",
    topics: [
      {
        slug: "shah-jo-risalo",
        facts: [
          f("Shah Jo Risalo was composed by:", "Shah Abdul Latif Bhittai", ["Sachal Sarmast", "Shaikh Ayaz", "Kalich Beg"], "Bhittai composed Shah Jo Risalo."),
          f("Shah Jo Risalo is written in:", "Sindhi", ["Urdu", "Persian", "Punjabi"], "Shah Jo Risalo is in Sindhi."),
          f("The 'Sur' chapters of Shah Jo Risalo are named after:", "Ragas", ["Kings", "Rivers", "Cities"], "Sur chapters are named after musical ragas."),
          f("Shah Jo Risalo's most famous Sur is:", "Sur Sasui Abri", ["Sur Kaleh", "Sur Samundi", "Sur Ramkali"], "Sur Sasui Abri is among the most famous."),
          f("Bhittai's poetry draws on:", "Folk romances", ["Only religion", "Only history", "Only politics"], "Bhittai draws on folk romances."),
          f("Shah Jo Risalo is recited with:", "Music", ["Painting", "Dance only", "Silence"], "Shah Jo Risalo is recited with music."),
        ],
      },
    ],
  },
  {
    slug: "chemistry",
    topics: [
      {
        slug: "atomic-structure",
        facts: [
          f("Who proposed the nuclear model of the atom?", "Rutherford", ["Dalton", "Thomson", "Bohr"], "Rutherford proposed the nuclear model."),
          f("Who proposed the planetary model of the atom?", "Bohr", ["Dalton", "Thomson", "Rutherford"], "Bohr proposed the planetary model."),
          f("Who discovered the electron?", "J. J. Thomson", ["Rutherford", "Bohr", "Chadwick"], "Thomson discovered the electron."),
          f("Who discovered the neutron?", "Chadwick", ["Thomson", "Rutherford", "Bohr"], "Chadwick discovered the neutron."),
          f("The atomic number equals the number of:", "Protons", ["Neutrons", "Electrons plus neutrons", "Nucleons"], "Atomic number equals protons."),
          f("Isotopes differ in the number of:", "Neutrons", ["Protons", "Electrons", "Nucleons only"], "Isotopes differ in neutrons."),
        ],
      },
    ],
  },
];
