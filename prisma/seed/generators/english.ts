import { buildOptions, makeRandom } from "./core";
import type { GeneratorContext, SeedQuestion } from "./core";

const IRREGULAR_VERBS: Array<[string, string, string]> = [
  ["go", "went", "gone"],
  ["eat", "ate", "eaten"],
  ["write", "wrote", "written"],
  ["see", "saw", "seen"],
  ["take", "took", "taken"],
  ["speak", "spoke", "spoken"],
  ["drink", "drank", "drunk"],
  ["begin", "began", "begun"],
  ["break", "broke", "broken"],
  ["choose", "chose", "chosen"],
  ["drive", "drove", "driven"],
  ["give", "gave", "given"],
  ["know", "knew", "known"],
  ["run", "ran", "run"],
  ["sing", "sang", "sung"],
  ["swim", "swam", "swum"],
  ["forget", "forgot", "forgotten"],
  ["freeze", "froze", "frozen"],
  ["hide", "hid", "hidden"],
  ["ride", "rode", "ridden"],
  ["rise", "rose", "risen"],
  ["shake", "shook", "shaken"],
  ["steal", "stole", "stolen"],
  ["teach", "taught", "taught"],
  ["throw", "threw", "thrown"],
  ["wake", "woke", "woken"],
];

const SYNONYMS: Array<[string, string[]]> = [
  ["abundant", ["plentiful", "scarce", "meagre", "rare"]],
  ["brave", ["courageous", "timid", "cowardly", "fearful"]],
  ["candid", ["frank", "deceitful", "secretive", "vague"]],
  ["diligent", ["hardworking", "lazy", "careless", "idle"]],
  ["enormous", ["huge", "tiny", "narrow", "slight"]],
  ["fragile", ["delicate", "sturdy", "robust", "durable"]],
  ["generous", ["liberal", "stingy", "selfish", "greedy"]],
  ["hazardous", ["dangerous", "safe", "secure", "harmless"]],
  ["humble", ["modest", "arrogant", "proud", "haughty"]],
  ["lucid", ["clear", "confusing", "obscure", "vague"]],
  ["meticulous", ["careful", "sloppy", "careless", "hasty"]],
  ["obsolete", ["outdated", "modern", "current", "recent"]],
  ["profound", ["deep", "shallow", "superficial", "trivial"]],
  ["rapid", ["swift", "slow", "sluggish", "leisurely"]],
  ["sincere", ["genuine", "fake", "insincere", "false"]],
  ["transparent", ["clear", "opaque", "cloudy", "murky"]],
  ["vivid", ["bright", "dull", "faint", "pale"]],
  ["weary", ["tired", "energetic", "fresh", "lively"]],
  ["zealous", ["enthusiastic", "indifferent", "apathetic", "uninterested"]],
  ["benevolent", ["kind", "cruel", "harsh", "malicious"]],
  ["cordial", ["friendly", "hostile", "cold", "distant"]],
  ["dormant", ["inactive", "active", "lively", "alert"]],
  ["elaborate", ["detailed", "simple", "brief", "plain"]],
  ["ferocious", ["fierce", "gentle", "mild", "tame"]],
  ["gloomy", ["dismal", "cheerful", "bright", "joyful"]],
];

const SPELLINGS: Array<[string, string[]]> = [
  ["accommodate", ["acommodate", "acommodatee", "acomodate"]],
  ["definitely", ["definately", "definitly", "definetly"]],
  ["separate", ["seperate", "seperete", "seprate"]],
  ["occurrence", ["occurence", "ocurrence", "occurrance"]],
  ["necessary", ["neccessary", "necesary", "necessery"]],
  ["recommend", ["recomend", "reccomend", "recommand"]],
  ["committee", ["commitee", "comittee", "committe"]],
  ["environment", ["enviroment", "enviornment", "environmant"]],
  ["government", ["goverment", "govenment", "governmant"]],
  ["immediately", ["immediatly", "imediately", "immediatelly"]],
  ["embarrass", ["embarass", "embarras", "embaress"]],
  ["privilege", ["priviledge", "privilage", "privelege"]],
  ["maintenance", ["maintainance", "maintenence", "maintainence"]],
  ["acknowledge", ["acknowlege", "acknowledege", "acknowledg"]],
  ["questionnaire", ["questionaire", "questionnair", "questionere"]],
];

interface GrammarTemplate {
  topic: string;
  stem: string;
  correct: string;
  distractors: string[];
  explanation: string;
}

const GRAMMAR_TEMPLATES: GrammarTemplate[] = [
  {
    topic: "tenses",
    stem: `Choose the correct form: "She ______ to the market yesterday."`,
    correct: "went",
    distractors: ["go", "goes", "gone"],
    explanation:
      '"Yesterday" marks the simple past tense, so the past form "went" is correct.',
  },
  {
    topic: "tenses",
    stem: `Which sentence is in the present perfect tense?`,
    correct: "He has finished his homework.",
    distractors: [
      "He finish his homework.",
      "He finishing his homework.",
      "He is finish his homework.",
    ],
    explanation:
      'Present perfect = has/have + past participle, e.g. "has finished".',
  },
  {
    topic: "tenses",
    stem: `Which sentence correctly uses the future tense?`,
    correct: "They will travel to Lahore next week.",
    distractors: [
      "They travels to Lahore next week.",
      "They travelled to Lahore next week.",
      "They travelling to Lahore next week.",
    ],
    explanation: 'Future actions use "will" + base verb.',
  },
  {
    topic: "tenses",
    stem: `Which sentence uses the past continuous tense?`,
    correct: "She was reading a book when I called.",
    distractors: [
      "She reads a book when I called.",
      "She read a book when I called.",
      "She has read a book when I called.",
    ],
    explanation: 'Past continuous = was/were + verb-ing, e.g. "was reading".',
  },
  {
    topic: "articles",
    stem: `Fill in the blank: "She is ______ honest woman."`,
    correct: "an",
    distractors: ["a", "the", "some"],
    explanation:
      '"Honest" begins with a vowel sound, so the article "an" is used.',
  },
  {
    topic: "articles",
    stem: `Fill in the blank: "I bought ______ umbrella yesterday."`,
    correct: "an",
    distractors: ["a", "the", "some"],
    explanation: '"Umbrella" starts with a vowel sound, so "an" is required.',
  },
  {
    topic: "articles",
    stem: `Fill in the blank: "______ sun rises in the east."`,
    correct: "The",
    distractors: ["A", "An", "No article"],
    explanation:
      'Unique objects such as "the sun" take the definite article "the".',
  },
  {
    topic: "articles",
    stem: `Fill in the blank: "He is ______ best student in the class."`,
    correct: "the",
    distractors: ["a", "an", "some"],
    explanation:
      'Superlatives take the definite article "the" ("the best student").',
  },
  {
    topic: "prepositions",
    stem: `Fill in the blank: "He is good ______ mathematics."`,
    correct: "at",
    distractors: ["in", "on", "for"],
    explanation: 'The correct collocation is "good at" a subject or skill.',
  },
  {
    topic: "prepositions",
    stem: `Fill in the blank: "She has been living here ______ 2015."`,
    correct: "since",
    distractors: ["for", "from", "at"],
    explanation:
      '"Since" is used with a point in time; "for" is used with a duration.',
  },
  {
    topic: "prepositions",
    stem: `Fill in the blank: "The book is ______ the table."`,
    correct: "on",
    distractors: ["in", "at", "of"],
    explanation: 'Objects resting on a surface use the preposition "on".',
  },
  {
    topic: "prepositions",
    stem: `Fill in the blank: "He apologised ______ his mistake."`,
    correct: "for",
    distractors: ["of", "on", "at"],
    explanation: 'The correct collocation is "apologise for" something.',
  },
  {
    topic: "prepositions",
    stem: `Fill in the blank: "She is afraid ______ spiders."`,
    correct: "of",
    distractors: ["from", "with", "at"],
    explanation: 'The correct collocation is "afraid of" something.',
  },
  {
    topic: "active-passive-voice",
    stem: `Change to passive voice: "The teacher praised the student."`,
    correct: "The student was praised by the teacher.",
    distractors: [
      "The student is praised by the teacher.",
      "The student praised by the teacher.",
      "The student has praised by the teacher.",
    ],
    explanation:
      'Simple past active "praised" becomes "was/were + past participle" in the passive.',
  },
  {
    topic: "active-passive-voice",
    stem: `Change to passive voice: "They build houses."`,
    correct: "Houses are built by them.",
    distractors: [
      "Houses were built by them.",
      "Houses is built by them.",
      "Houses built by them.",
    ],
    explanation:
      'Simple present active becomes "am/is/are + past participle" in the passive.',
  },
  {
    topic: "active-passive-voice",
    stem: `Change to passive voice: "Someone has stolen my bike."`,
    correct: "My bike has been stolen.",
    distractors: [
      "My bike has stolen.",
      "My bike is stolen.",
      "My bike was steal.",
    ],
    explanation:
      'Present perfect passive = has/have been + past participle ("has been stolen").',
  },
  {
    topic: "sentence-structure",
    stem: `Which of the following is a complete sentence?`,
    correct: "The children played in the park.",
    distractors: [
      "Because the children played.",
      "Playing in the park all day.",
      "In the park the children.",
    ],
    explanation:
      "A complete sentence needs a subject and a finite verb expressing a complete thought.",
  },
  {
    topic: "sentence-structure",
    stem: `Identify the correct subject–verb agreement.`,
    correct: "The list of items is on the desk.",
    distractors: [
      "The list of items are on the desk.",
      "The list of items were on the desk.",
      "The list of items be on the desk.",
    ],
    explanation: 'The subject is "list" (singular), so the verb must be "is".',
  },
  {
    topic: "sentence-structure",
    stem: `Identify the correct subject–verb agreement.`,
    correct: "Neither of the boys was present.",
    distractors: [
      "Neither of the boys were present.",
      "Neither of the boys are present.",
      "Neither of the boys be present.",
    ],
    explanation:
      '"Neither" is singular, so it takes the singular verb "was".',
  },
  {
    topic: "parts-of-speech",
    stem: `In the sentence "She sings beautifully", what part of speech is "beautifully"?`,
    correct: "Adverb",
    distractors: ["Adjective", "Noun", "Verb"],
    explanation:
      '"Beautifully" modifies the verb "sings", so it is an adverb.',
  },
  {
    topic: "parts-of-speech",
    stem: `In the sentence "The tall building collapsed", what part of speech is "tall"?`,
    correct: "Adjective",
    distractors: ["Adverb", "Noun", "Pronoun"],
    explanation: '"Tall" describes the noun "building", so it is an adjective.',
  },
  {
    topic: "parts-of-speech",
    stem: `Which word in "Quickly, the fox jumped over the fence" is a preposition?`,
    correct: "over",
    distractors: ["Quickly", "fox", "jumped"],
    explanation: '"Over" shows the relationship between "jumped" and "fence".',
  },
  {
    topic: "idioms-phrases",
    stem: `What does the idiom "to break the ice" mean?`,
    correct: "To start a conversation in a social setting",
    distractors: [
      "To destroy something valuable",
      "To feel extremely cold",
      "To end a friendship",
    ],
    explanation:
      '"To break the ice" means to relieve tension and start a conversation.',
  },
  {
    topic: "idioms-phrases",
    stem: `What does the idiom "once in a blue moon" mean?`,
    correct: "Very rarely",
    distractors: ["Very often", "Every month", "Never at all"],
    explanation: '"Once in a blue moon" means something happens very rarely.',
  },
  {
    topic: "idioms-phrases",
    stem: `What does the idiom "a blessing in disguise" mean?`,
    correct: "An apparent misfortune that turns out to be beneficial",
    distractors: [
      "A hidden danger",
      "A generous gift",
      "An obvious lie",
    ],
    explanation:
      '"A blessing in disguise" is something that seems bad at first but leads to a good outcome.',
  },
];

export function generateEnglishQuestions(ctx: GeneratorContext): SeedQuestion[] {
  const { rand } = makeRandom("english-v1");
  const out: SeedQuestion[] = [];

  const add = (
    partial: Omit<SeedQuestion, "subject" | "exams" | "educationLevels" | "status">,
  ) =>
    out.push({
      ...partial,
      subject: "english",
      exams: ctx.exams,
      educationLevels: ctx.educationLevels,
      status: "PUBLISHED",
    });

  IRREGULAR_VERBS.forEach(([base, past, participle], i) => {
    const { options, correct } = buildOptions(past, [base, participle, `${base}s`], rand);
    add({
      slug: `english-past-tense-${base}`,
      stem: `What is the simple past tense of the verb "${base}"?`,
      options,
      correct,
      explanation: `The simple past of "${base}" is "${past}" (past participle: "${participle}").`,
      difficulty: i % 3 === 0 ? "EASY" : "MEDIUM",
      topic: "tenses",
      tags: ["verbs", "tenses"],
      staticOrder: 2000 + i,
    });
  });

  SYNONYMS.forEach(([word, [syn, ...antonyms]], i) => {
    const synQ = buildOptions(syn, antonyms, rand);
    add({
      slug: `english-synonym-${word}`,
      stem: `Choose the word closest in meaning (synonym) to "${word}".`,
      options: synQ.options,
      correct: synQ.correct,
      explanation: `"${syn}" is the closest synonym of "${word}".`,
      difficulty: i % 4 === 0 ? "HARD" : "MEDIUM",
      topic: "synonyms-antonyms",
      tags: ["vocabulary", "synonyms"],
      staticOrder: 2050 + i,
    });

    const antQ = buildOptions(antonyms[0], [syn, antonyms[1], antonyms[2]], rand);
    add({
      slug: `english-antonym-${word}`,
      stem: `Choose the word most opposite in meaning (antonym) to "${word}".`,
      options: antQ.options,
      correct: antQ.correct,
      explanation: `"${antonyms[0]}" is the most nearly opposite in meaning to "${word}".`,
      difficulty: i % 4 === 0 ? "HARD" : "MEDIUM",
      topic: "synonyms-antonyms",
      tags: ["vocabulary", "antonyms"],
      staticOrder: 2075 + i,
    });
  });

  SPELLINGS.forEach(([correctWord, wrong], i) => {
    const { options, correct } = buildOptions(correctWord, wrong, rand);
    add({
      slug: `english-spelling-${correctWord}`,
      stem: `Which of the following words is spelled correctly?`,
      options,
      correct,
      explanation: `The correct spelling is "${correctWord}".`,
      difficulty: "MEDIUM",
      topic: "sentence-structure",
      tags: ["spelling", "vocabulary"],
      staticOrder: 2100 + i,
    });
  });

  GRAMMAR_TEMPLATES.forEach((t, i) => {
    const { options, correct } = buildOptions(t.correct, t.distractors, rand);
    add({
      slug: `english-grammar-${i}`,
      stem: t.stem,
      options,
      correct,
      explanation: t.explanation,
      difficulty: i % 3 === 2 ? "HARD" : i % 3 === 1 ? "MEDIUM" : "EASY",
      topic: t.topic,
      tags: ["grammar", t.topic],
      staticOrder: 2200 + i,
    });
  });

  return out;
}
