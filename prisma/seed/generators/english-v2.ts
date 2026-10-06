/**
 * English language generator.
 *
 * Grammar items are parametric (verb forms, plurals, degrees of comparison) so
 * they scale without hand-authoring; vocabulary items come from curated banks
 * and are emitted under several templates.
 */

import { makeRandom } from "./core";
import { bankToQuestions, numeric, ri } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

const IRREGULAR: Array<[string, string, string]> = [
  ["go", "went", "gone"], ["eat", "ate", "eaten"], ["write", "wrote", "written"],
  ["take", "took", "taken"], ["see", "saw", "seen"], ["come", "came", "come"],
  ["know", "knew", "known"], ["give", "gave", "given"], ["find", "found", "found"],
  ["think", "thought", "thought"], ["tell", "told", "told"], ["become", "became", "become"],
  ["show", "showed", "shown"], ["leave", "left", "left"], ["feel", "felt", "felt"],
  ["bring", "brought", "brought"], ["begin", "began", "begun"], ["keep", "kept", "kept"],
  ["hold", "held", "held"], ["write", "wrote", "written"], ["stand", "stood", "stood"],
  ["hear", "heard", "heard"], ["let", "let", "let"], ["mean", "meant", "meant"],
  ["set", "set", "set"], ["meet", "met", "met"], ["run", "ran", "run"],
  ["pay", "paid", "paid"], ["sit", "sat", "sat"], ["speak", "spoke", "spoken"],
  ["lie", "lay", "lain"], ["lead", "led", "led"], ["read", "read", "read"],
  ["grow", "grew", "grown"], ["lose", "lost", "lost"], ["fall", "fell", "fallen"],
  ["send", "sent", "sent"], ["build", "built", "built"], ["understand", "understood", "understood"],
  ["draw", "drew", "drawn"], ["break", "broke", "broken"], ["spend", "spent", "spent"],
  ["cut", "cut", "cut"], ["rise", "rose", "risen"], ["drive", "drove", "driven"],
  ["buy", "bought", "bought"], ["wear", "wore", "worn"], ["choose", "chose", "chosen"],
  ["seek", "sought", "sought"], ["throw", "threw", "thrown"], ["catch", "caught", "caught"],
  ["deal", "dealt", "dealt"], ["win", "won", "won"], ["forget", "forgot", "forgotten"],
  ["freeze", "froze", "frozen"], ["hide", "hid", "hidden"], ["sing", "sang", "sung"],
  ["swim", "swam", "swum"], ["teach", "taught", "taught"], ["fly", "flew", "flown"],
];

const NOUNS: Array<[string, string]> = [
  ["child", "children"], ["man", "men"], ["woman", "women"], ["tooth", "teeth"],
  ["foot", "feet"], ["mouse", "mice"], ["goose", "geese"], ["ox", "oxen"],
  ["leaf", "leaves"], ["knife", "knives"], ["wolf", "wolves"], ["shelf", "shelves"],
  ["city", "cities"], ["baby", "babies"], ["lady", "ladies"], ["story", "stories"],
  ["box", "boxes"], ["church", "churches"], ["bus", "buses"], ["watch", "watches"],
  ["hero", "heroes"], ["potato", "potatoes"], ["tomato", "tomatoes"], ["echo", "echoes"],
  ["crisis", "crises"], ["analysis", "analyses"], ["datum", "data"], ["medium", "media"],
  ["phenomenon", "phenomena"], ["criterion", "criteria"], ["alumnus", "alumni"], ["radius", "radii"],
];

const ADJECTIVES: Array<[string, string, string]> = [
  ["good", "better", "best"], ["bad", "worse", "worst"], ["far", "farther", "farthest"],
  ["little", "less", "least"], ["much", "more", "most"], ["many", "more", "most"],
  ["big", "bigger", "biggest"], ["happy", "happier", "happiest"], ["beautiful", "more beautiful", "most beautiful"],
  ["important", "more important", "most important"], ["easy", "easier", "easiest"], ["difficult", "more difficult", "most difficult"],
  ["hot", "hotter", "hottest"], ["famous", "more famous", "most famous"], ["clever", "cleverer", "cleverest"],
  ["narrow", "narrower", "narrowest"], ["brave", "braver", "bravest"], ["heavy", "heavier", "heaviest"],
];

const SYNONYMS: Array<[string, string, string]> = [
  ["abandon", "desert", "keep"], ["abundant", "plentiful", "scarce"], ["candid", "frank", "deceitful"],
  ["diligent", "hardworking", "lazy"], ["eloquent", "articulate", "mute"], ["fragile", "delicate", "sturdy"],
  ["generous", "liberal", "stingy"], ["hazard", "danger", "safety"], ["immense", "huge", "tiny"],
  ["jubilant", "overjoyed", "sorrowful"], ["keen", "eager", "indifferent"], ["lucid", "clear", "obscure"],
  ["magnificent", "splendid", "ordinary"], ["novice", "beginner", "expert"], ["obstinate", "stubborn", "flexible"],
  ["prosperity", "wealth", "poverty"], ["quaint", "charming", "ugly"], ["resilient", "tough", "fragile"],
  ["sagacious", "wise", "foolish"], ["tenacious", "persistent", "yielding"], ["ubiquitous", "omnipresent", "rare"],
  ["vivid", "bright", "dull"], ["wary", "cautious", "reckless"], ["zealous", "enthusiastic", "apathetic"],
  ["benevolent", "kind", "cruel"], ["concise", "brief", "lengthy"], ["deteriorate", "worsen", "improve"],
  ["eminent", "distinguished", "unknown"], ["futile", "useless", "useful"], ["gregarious", "sociable", "reclusive"],
  ["hostile", "unfriendly", "friendly"], ["inevitable", "unavoidable", "avoidable"], ["lament", "mourn", "celebrate"],
  ["meticulous", "careful", "careless"], ["notorious", "infamous", "reputable"], ["obsolete", "outdated", "modern"],
  ["placid", "calm", "agitated"], ["reluctant", "unwilling", "willing"], ["scrutinize", "examine", "ignore"],
  ["transparent", "clear", "opaque"], ["vacant", "empty", "occupied"], ["wither", "fade", "bloom"],
];

const IDIOMS: Array<[string, string, string]> = [
  ["a blessing in disguise", "something good that seemed bad", "an obvious curse"],
  ["a piece of cake", "very easy", "very difficult"],
  ["break the ice", "start a conversation", "end a friendship"],
  ["once in a blue moon", "very rarely", "very often"],
  ["spill the beans", "reveal a secret", "keep a secret"],
  ["hit the nail on the head", "do the right thing", "miss the point"],
  ["under the weather", "feeling ill", "feeling joyful"],
  ["bite the bullet", "face a hard situation bravely", "run away from danger"],
  ["let the cat out of the bag", "disclose a secret", "hide the truth"],
  ["burn the midnight oil", "work late into the night", "sleep early"],
  ["a wild goose chase", "a futile search", "a successful hunt"],
  ["turn a blind eye", "ignore deliberately", "watch carefully"],
  ["smell a rat", "suspect something wrong", "trust completely"],
  ["rain cats and dogs", "rain heavily", "rain lightly"],
  ["in hot water", "in trouble", "in comfort"],
  ["a hard nut to crack", "a difficult problem", "an easy task"],
  ["beat about the bush", "avoid the main point", "come to the point"],
  ["call it a day", "stop working", "begin working"],
  ["see eye to eye", "agree", "disagree"],
  ["with flying colours", "with great success", "with failure"],
  ["pull someone's leg", "joke with someone", "hurt someone"],
  ["a bolt from the blue", "a sudden shock", "an expected event"],
  ["at the eleventh hour", "at the last moment", "very early"],
  ["give the cold shoulder", "ignore someone", "welcome someone"],
];

const ONE_WORD: Array<[string, string, string]> = [
  ["One who loves books", "Bibliophile", "Bibliophobe"],
  ["One who speaks many languages", "Polyglot", "Monolingual"],
  ["A person who eats too much", "Glutton", "Ascetic"],
  ["A place where bees are kept", "Apiary", "Aviary"],
  ["A place where birds are kept", "Aviary", "Apiary"],
  ["One who studies stars", "Astronomer", "Astrologer"],
  ["A speech delivered without preparation", "Extempore", "Elegy"],
  ["A poem on the death of someone", "Elegy", "Ode"],
  ["One who does not believe in God", "Atheist", "Theist"],
  ["A government by the people", "Democracy", "Monarchy"],
  ["A government by one person", "Autocracy", "Democracy"],
  ["A speech made to oneself", "Soliloquy", "Dialogue"],
  ["One who is unable to pay debts", "Insolvent", "Affluent"],
  ["A word opposite in meaning", "Antonym", "Synonym"],
  ["A word similar in meaning", "Synonym", "Antonym"],
  ["One who walks on foot", "Pedestrian", "Passenger"],
  ["A person who compiles a dictionary", "Lexicographer", "Bibliographer"],
  ["One who loves mankind", "Philanthropist", "Misanthrope"],
  ["One who hates mankind", "Misanthrope", "Philanthropist"],
  ["A life story written by oneself", "Autobiography", "Biography"],
];

export function generateEnglishV2(): SeedQuestion[] {
  const { rand } = makeRandom("english-v2");
  const out: SeedQuestion[] = [];

  /* ---- verb forms (parametric) ---- */
  out.push(
    ...numeric(6000, { subject: "english", topic: "tenses", prefix: "e2-past", tags: ["verbs", "tenses"] }, () => {
      const [base, past] = IRREGULAR[ri(rand, 0, IRREGULAR.length - 1)];
      return {
        stem: `What is the past tense of the verb "${base}"?`,
        correct: past,
        distractors: [base + "ed", IRREGULAR[ri(rand, 0, IRREGULAR.length - 1)][1], base + "d", base],
        explanation: `The past tense of "${base}" is "${past}".`,
      };
    }),
  );
  out.push(
    ...numeric(6000, { subject: "english", topic: "tenses", prefix: "e2-pp", tags: ["verbs", "participles"] }, () => {
      const [base, , pp] = IRREGULAR[ri(rand, 0, IRREGULAR.length - 1)];
      return {
        stem: `What is the past participle of the verb "${base}"?`,
        correct: pp,
        distractors: [base + "ed", IRREGULAR[ri(rand, 0, IRREGULAR.length - 1)][2], base, base + "en"],
        explanation: `The past participle of "${base}" is "${pp}".`,
      };
    }),
  );
  out.push(
    ...numeric(4000, { subject: "english", topic: "tenses", prefix: "e2-third", tags: ["verbs", "subject-verb-agreement"] }, () => {
      const [base] = IRREGULAR[ri(rand, 0, IRREGULAR.length - 1)];
      return {
        stem: `Choose the correct third-person singular form: He ____ to school every day. ("${base}")`,
        correct: `${base}s`,
        distractors: [base, `${base}es`, `${base}ing`],
        explanation: `Third-person singular of "${base}" is "${base}s".`,
      };
    }),
  );

  /* ---- plurals ---- */
  out.push(
    ...numeric(5000, { subject: "english", topic: "parts-of-speech", prefix: "e2-plural", tags: ["plurals", "nouns"] }, () => {
      const [sing, plural] = NOUNS[ri(rand, 0, NOUNS.length - 1)];
      return {
        stem: `What is the plural of "${sing}"?`,
        correct: plural,
        distractors: [sing + "s", sing + "es", NOUNS[ri(rand, 0, NOUNS.length - 1)][1]],
        explanation: `The plural of "${sing}" is "${plural}".`,
      };
    }),
  );

  /* ---- degrees of comparison ---- */
  out.push(
    ...numeric(5000, { subject: "english", topic: "degrees-of-comparison", prefix: "e2-comp", tags: ["adjectives", "comparison"] }, () => {
      const [pos, comp, sup] = ADJECTIVES[ri(rand, 0, ADJECTIVES.length - 1)];
      const which = ri(rand, 0, 1);
      return which === 0
        ? {
            stem: `What is the comparative degree of "${pos}"?`,
            correct: comp,
            distractors: [sup, pos + "er", `more ${pos}`],
            explanation: `Comparative: ${comp}; superlative: ${sup}.`,
          }
        : {
            stem: `What is the superlative degree of "${pos}"?`,
            correct: sup,
            distractors: [comp, pos + "est", `most ${pos}`],
            explanation: `Superlative: ${sup}; comparative: ${comp}.`,
          };
    }),
  );

  /* ---- bank-driven vocabulary ---- */
  const synonymFacts: Fact[] = [];
  for (const [word, syn, ant] of SYNONYMS) {
    synonymFacts.push({
      q: `Choose the word most similar in meaning to "${word}".`,
      a: syn,
      d: [ant, "unrelated", "none of these"],
      e: `"${syn}" is a synonym of "${word}".`,
      tags: ["synonyms"],
    });
    synonymFacts.push({
      q: `Choose the word most opposite in meaning to "${word}".`,
      a: ant,
      d: [syn, "similar", "none of these"],
      e: `"${ant}" is an antonym of "${word}".`,
      tags: ["antonyms"],
    });
  }
  out.push(...bankToQuestions(synonymFacts, { subject: "english", topic: "synonyms-antonyms", prefix: "e2-syn", tags: ["vocabulary"] }));

  const idiomFacts: Fact[] = IDIOMS.map(([idiom, meaning, wrong]) => ({
    q: `What does the idiom "${idiom}" mean?`,
    a: meaning,
    d: [wrong, "a literal description", "none of these"],
    e: `"${idiom}" means ${meaning}.`,
  }));
  out.push(...bankToQuestions(idiomFacts, { subject: "english", topic: "idioms-phrases", prefix: "e2-idiom", tags: ["idioms"] }));

  const oneWordFacts: Fact[] = ONE_WORD.map(([def, ans, wrong]) => ({
    q: `${def} is called:`,
    a: ans,
    d: [wrong, "None of these", "All of these"],
  }));
  out.push(...bankToQuestions(oneWordFacts, { subject: "english", topic: "one-word-substitution", prefix: "e2-oneword" }));

  return out;
}
