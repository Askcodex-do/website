/**
 * Remaining regional-language banks: Hindko, Kashmiri and Brahui.
 *
 * These fill the last unpopulated language subjects so every language taught in
 * Pakistan has a practice bank.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const LANGUAGE_BANKS: SubjectSpec[] = [
  {
    slug: "hindko",
    topics: [
      {
        slug: "hindko-grammar",
        facts: [
          f("Hindko is mainly spoken in:", "Khyber Pakhtunkhwa", ["Sindh", "Balochistan", "Gilgit-Baltistan"], "Hindko is chiefly spoken in KP, especially Hazara."),
          f("Hindko is closely related to:", "Punjabi", ["Sindhi", "Balochi", "Pashto"], "Hindko is closely related to Punjabi."),
          f("Hindko belongs to which language family?", "Indo-Aryan", ["Iranian", "Dravidian", "Turkic"], "Hindko is Indo-Aryan."),
          f("The word 'Hindko' literally means:", "Language of Hind", ["Mountain tongue", "River speech", "Desert words"], "Hindko means the language of Hind."),
          f("A famous Hindko-speaking city is:", "Abbottabad", ["Karachi", "Quetta", "Sukkur"], "Abbottabad is a major Hindko-speaking city."),
          f("Hindko is written in which script?", "Shahmukhi", ["Devanagari", "Gurmukhi", "Latin"], "Hindko is written in Shahmukhi."),
        ],
      },
      {
        slug: "hindko-vocabulary",
        facts: [
          f("In Hindko, 'pani' means:", "Water", ["Fire", "Earth", "Air"], "'Pani' means water."),
          f("In Hindko, 'ghar' means:", "House", ["Tree", "Road", "Field"], "'Ghar' means house."),
          f("In Hindko, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Hindko, 'dost' means:", "Friend", ["Enemy", "Teacher", "Doctor"], "'Dost' means friend."),
          f("In Hindko, 'phull' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Phull' means flower."),
          f("In Hindko, 'suraj' means:", "Sun", ["Moon", "Star", "Cloud"], "'Suraj' means sun."),
        ],
      },
      {
        slug: "hindko-poetry",
        facts: [
          f("Hindko poetry is often sung in:", "Folk melodies", ["Opera", "Jazz", "Rock"], "Hindko poetry uses folk melodies."),
          f("Hindko folk poetry often celebrates:", "Love and nature", ["Only war", "Only trade", "Only politics"], "Hindko folk poetry celebrates love and nature."),
          f("A Hindko folk song is often called:", "Geet", ["Sonnet", "Ode", "Haiku"], "A Hindko folk song is a geet."),
          f("Hindko literature includes:", "Poetry and prose", ["Only poetry", "Only prose", "Only drama"], "Hindko literature includes poetry and prose."),
          f("Hindko oral tradition is preserved through:", "Songs and stories", ["Only books", "Only films", "Only newspapers"], "Hindko tradition is preserved orally."),
          f("Hindko poets often write about:", "Local life", ["Foreign lands only", "Only science", "Only industry"], "Hindko poets write about local life."),
        ],
      },
    ],
  },

  {
    slug: "kashmiri",
    topics: [
      {
        slug: "kashmiri-grammar",
        facts: [
          f("Kashmiri is mainly spoken in:", "Kashmir", ["Sindh", "Punjab", "Balochistan"], "Kashmiri is spoken in Kashmir."),
          f("Kashmiri belongs to which language family?", "Dravidian", ["Indo-Aryan", "Iranian", "Turkic"], "Kashmiri is notable as a Dravidian language in a largely Indo-Aryan region."),
          f("Kashmiri is written in which script?", "Perso-Arabic", ["Latin", "Cyrillic", "Greek"], "Kashmiri is written in Perso-Arabic script."),
          f("Kashmiri has how many grammatical genders?", "2", ["1", "3", "4"], "Kashmiri has two grammatical genders."),
          f("Kashmiri is known for its:", "Rich poetry", ["Only prose", "Only drama", "Only journalism"], "Kashmiri is known for its poetry."),
          f("A famous Kashmiri poet is:", "Lal Ded", ["Ghalib", "Iqbal", "Faiz"], "Lal Ded is a famous Kashmiri poet."),
        ],
      },
      {
        slug: "kashmiri-vocabulary",
        facts: [
          f("In Kashmiri, 'tsal' means:", "Water", ["Fire", "Earth", "Air"], "'Tsal' means water."),
          f("In Kashmiri, 'gara' means:", "House", ["Tree", "Road", "Field"], "'Gara' means house."),
          f("In Kashmiri, 'kitaab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitaab' means book."),
          f("In Kashmiri, 'mae' means:", "Mother", ["Father", "Sister", "Brother"], "'Mae' means mother."),
          f("In Kashmiri, 'puh' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Puh' means flower."),
          f("In Kashmiri, 'gor' means:", "Horse", ["Cow", "Goat", "Dog"], "'Gor' means horse."),
        ],
      },
      {
        slug: "kashmiri-poetry",
        facts: [
          f("Lal Ded wrote in:", "Kashmiri", ["Urdu", "Persian", "Punjabi"], "Lal Ded wrote in Kashmiri."),
          f("Kashmiri poetry often deals with:", "Sufi themes", ["Only war", "Only trade", "Only politics"], "Kashmiri poetry often has Sufi themes."),
          f("A Kashmiri folk song is called:", "Lol", ["Sonnet", "Ode", "Haiku"], "A Kashmiri folk song is a lol."),
          f("Kashmiri literature includes:", "Poetry and prose", ["Only poetry", "Only prose", "Only drama"], "Kashmiri literature includes poetry and prose."),
          f("Kashmiri poetry is passed down through:", "Oral tradition", ["Only books", "Only films", "Only newspapers"], "Kashmiri poetry is often oral."),
          f("Kashmiri poets often write about:", "Nature and devotion", ["Only science", "Only industry", "Only trade"], "Kashmiri poets write about nature and devotion."),
        ],
      },
    ],
  },

  {
    slug: "brahvi",
    topics: [
      {
        slug: "brahvi-grammar",
        facts: [
          f("Brahvi is mainly spoken in:", "Balochistan", ["Punjab", "Sindh", "KP"], "Brahvi is mainly spoken in Balochistan."),
          f("Brahvi belongs to which language family?", "Dravidian", ["Indo-Aryan", "Iranian", "Turkic"], "Brahvi is a Dravidian language."),
          f("Brahvi is written in which script?", "Perso-Arabic", ["Latin", "Cyrillic", "Greek"], "Brahvi is written in Perso-Arabic script."),
          f("Brahvi is notable for being a Dravidian language in:", "Balochistan", ["Punjab", "Sindh", "Kashmir"], "Brahvi is a Dravidian language in Balochistan."),
          f("The Brahui people mainly live in:", "Balochistan", ["Punjab", "Sindh", "KP"], "The Brahui live mainly in Balochistan."),
          f("Brahvi is related to languages of:", "South India", ["Central Asia", "East Asia", "Europe"], "Brahvi is related to South Indian Dravidian languages."),
        ],
      },
      {
        slug: "brahvi-vocabulary",
        facts: [
          f("In Brahvi, 'dē' means:", "Water", ["Fire", "Earth", "Air"], "'Dē' means water."),
          f("In Brahvi, 'o' means:", "House", ["Tree", "Road", "Field"], "'O' means house."),
          f("In Brahvi, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Brahvi, 'ba' means:", "Mouth", ["Ear", "Nose", "Eye"], "'Ba' means mouth."),
          f("In Brahvi, 'khalk' means:", "People", ["Animals", "Plants", "Stones"], "'Khalk' means people."),
          f("In Brahvi, 'zan' means:", "To know", ["To eat", "To run", "To sleep"], "'Zan' means to know."),
        ],
      },
    ],
  },
];
