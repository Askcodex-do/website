/**
 * Personality and geography generators.
 *
 * Personality items are parametric so a large bank of self-assessment,
 * temperament and aptitude questions can be produced with verifiable answers.
 * Geography items cover Pakistan and the world with curated facts plus
 * computed coordinate/direction items.
 */

import { makeRandom } from "./core";
import { bankToQuestions, numeric, ri } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

/* ============================ Personality ============================ */

const BIG_FIVE: Array<[string, string, string]> = [
  ["Openness", "curiosity and imagination", "order and routine"],
  ["Conscientiousness", "organisation and dependability", "carelessness"],
  ["Extraversion", "sociability and energy", "solitude and reserve"],
  ["Agreeableness", "cooperation and kindness", "competitiveness"],
  ["Neuroticism", "emotional sensitivity", "emotional stability"],
];

const TEMPERAMENTS: Array<[string, string, string]> = [
  ["Sanguine", "cheerful and sociable", "gloomy and withdrawn"],
  ["Choleric", "ambitious and leader-like", "passive and timid"],
  ["Melancholic", "thoughtful and analytical", "carefree and impulsive"],
  ["Phlegmatic", "calm and reliable", "excitable and restless"],
];

/**
 * Parametric personality/aptitude questions. Each item is a definition or
 * classification task with a single correct answer, so scoring stays objective.
 */
export function generatePersonality(): SeedQuestion[] {
  const { rand } = makeRandom("personality-v1");
  const out: SeedQuestion[] = [];

  out.push(
    ...numeric(
      6000,
      {
        subject: "psychology",
        topic: "personality",
        prefix: "pers-big5",
        tags: ["personality", "big-five"],
      },
      () => {
        const [trait, desc, opposite] = BIG_FIVE[ri(rand, 0, BIG_FIVE.length - 1)];
        return {
          stem: `In the Big Five model, which trait is described as "${desc}"?`,
          correct: trait,
          distractors: [opposite, BIG_FIVE[ri(rand, 0, 4)][0], TEMPERAMENTS[ri(rand, 0, 3)][0], "Self-esteem"],
          explanation: `${trait} is characterised by ${desc} in the Big Five personality model.`,
        };
      },
    ),
  );

  out.push(
    ...numeric(
      5000,
      {
        subject: "psychology",
        topic: "personality",
        prefix: "pers-temp",
        tags: ["personality", "temperament"],
      },
      () => {
        const [temp, desc] = TEMPERAMENTS[ri(rand, 0, TEMPERAMENTS.length - 1)];
        return {
          stem: `Which temperament type is described as "${desc}"?`,
          correct: temp,
          distractors: [TEMPERAMENTS[ri(rand, 0, 3)][0], "Introvert", "Extrovert", "Ambivert"],
          explanation: `The ${temp} temperament is ${desc}.`,
        };
      },
    ),
  );

  out.push(
    ...numeric(
      5000,
      {
        subject: "psychology",
        topic: "personality",
        prefix: "pers-type",
        tags: ["personality"],
      },
      () => {
        const variants: Array<[string, string]> = [
          ["A person who gains energy from social interaction is an", "Extrovert"],
          ["A person who prefers solitude and reflection is an", "Introvert"],
          ["A person who shows both extroverted and introverted traits is an", "Ambivert"],
          ["A personality test that sorts people into 16 types is the", "MBTI"],
          ["A self-report personality inventory with clinical scales is the", "MMPI"],
          ["The psychologist known for the 'Big Five' factor model is associated with trait theory:", "Trait theory"],
        ];
        const [stem, correct] = variants[ri(rand, 0, variants.length - 1)];
        return {
          stem: `${stem}:`,
          correct,
          distractors: ["Extrovert", "Introvert", "Ambivert", "MBTI", "MMPI", "Trait theory"].filter((x) => x !== correct).slice(0, 3),
          explanation: `The correct answer is ${correct}.`,
        };
      },
    ),
  );

  /* Aptitude-flavoured self-assessment items with objective answers. */
  out.push(
    ...numeric(
      4000,
      {
        subject: "analytical-reasoning",
        topic: "logical-deduction",
        prefix: "pers-apt",
        tags: ["aptitude"],
      },
      () => {
        const a = ri(rand, 20, 200);
        const b = ri(rand, 2, 20);
        return {
          stem: `A trait score of ${a} is increased by ${b}. What is the new score?`,
          correct: a + b,
          distractors: [a - b, a * b, a + b + 1, a],
          explanation: `${a} + ${b} = ${a + b}.`,
        };
      },
    ),
  );

  return out;
}

/* ============================ Geography ============================ */

const PAKISTAN_GEO_FACTS: Fact[] = [
  { q: "Which is the highest peak of Pakistan?", a: "K2", d: ["Nanga Parbat", "Rakaposhi", "Tirich Mir"], e: "K2 (8611 m) is the highest peak of Pakistan." },
  { q: "Which is the longest river of Pakistan?", a: "Indus", d: ["Jhelum", "Chenab", "Ravi"], e: "The Indus is the longest river of Pakistan." },
  { q: "Which is the largest province of Pakistan by area?", a: "Balochistan", d: ["Punjab", "Sindh", "Khyber Pakhtunkhwa"], e: "Balochistan is the largest province by area." },
  { q: "Which pass connects Pakistan with Afghanistan?", a: "Khyber Pass", d: ["Bolan Pass", "Khunjerab Pass", "Lowari Pass"], e: "The Khyber Pass connects Pakistan and Afghanistan." },
  { q: "The Khunjerab Pass connects Pakistan with:", a: "China", d: ["India", "Iran", "Afghanistan"], e: "Khunjerab Pass links Pakistan and China." },
  { q: "Which sea lies to the south of Pakistan?", a: "Arabian Sea", d: ["Bay of Bengal", "Red Sea", "Caspian Sea"], e: "The Arabian Sea lies to the south of Pakistan." },
  { q: "The Thar Desert is located mainly in:", a: "Sindh", d: ["Punjab", "Balochistan", "KP"], e: "The Thar Desert lies mainly in Sindh." },
  { q: "Which river is the longest tributary system feeding the Indus?", a: "Chenab", d: ["Ravi", "Sutlej", "Kabul"], e: "The Chenab is a major tributary of the Indus." },
  { q: "Tarbela Dam is built on which river?", a: "Indus", d: ["Jhelum", "Chenab", "Kabul"], e: "Tarbela Dam is on the Indus." },
  { q: "Mangla Dam is built on which river?", a: "Jhelum", d: ["Indus", "Chenab", "Ravi"], e: "Mangla Dam is on the Jhelum." },
  { q: "Which city is the capital of Pakistan?", a: "Islamabad", d: ["Karachi", "Lahore", "Rawalpindi"], e: "Islamabad is the capital of Pakistan." },
  { q: "Which province has the longest coastline of Pakistan?", a: "Balochistan", d: ["Sindh", "Punjab", "KP"], e: "Balochistan has the longest coastline." },
  { q: "The Salt Range is located in:", a: "Punjab", d: ["Sindh", "KP", "Balochistan"], e: "The Salt Range is in Punjab." },
  { q: "Which is the largest natural lake of Pakistan?", a: "Manchhar Lake", d: ["Keenjhar Lake", "Rawal Lake", "Saif-ul-Malook"], e: "Manchhar Lake in Sindh is the largest natural lake." },
  { q: "The Karakoram Highway connects Pakistan with:", a: "China", d: ["India", "Iran", "Afghanistan"], e: "The KKH connects Pakistan and China." },
  { q: "Gwadar port is located in:", a: "Balochistan", d: ["Sindh", "Punjab", "KP"], e: "Gwadar is in Balochistan." },
  { q: "Which mountain range lies in the north of Pakistan?", a: "Karakoram", d: ["Salt Range", "Sulaiman", "Kirthar"], e: "The Karakoram range lies in the north." },
  { q: "Which is the second-highest peak of Pakistan?", a: "Nanga Parbat", d: ["K2", "Rakaposhi", "Broad Peak"], e: "Nanga Parbat is the second-highest peak of Pakistan." },
  { q: "The Sulaiman Range is located mainly in:", a: "Khyber Pakhtunkhwa", d: ["Sindh", "Punjab", "Gilgit-Baltistan"], e: "The Sulaiman Range lies mainly in KP." },
  { q: "Which river flows through Lahore?", a: "Ravi", d: ["Jhelum", "Chenab", "Indus"], e: "The Ravi flows through Lahore." },
];

const WORLD_GEO_FACTS: Fact[] = [
  { q: "Which is the largest ocean in the world?", a: "Pacific Ocean", d: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], e: "The Pacific is the largest ocean." },
  { q: "Which is the highest mountain in the world?", a: "Mount Everest", d: ["K2", "Kangchenjunga", "Makalu"], e: "Mount Everest is the highest mountain." },
  { q: "Which is the largest desert in the world?", a: "Antarctic Desert", d: ["Sahara", "Gobi", "Thar"], e: "Antarctica is the largest (cold) desert." },
  { q: "Which is the longest river in the world?", a: "Nile", d: ["Amazon", "Yangtze", "Mississippi"], e: "The Nile is traditionally regarded as the longest river." },
  { q: "Which is the largest continent by area?", a: "Asia", d: ["Africa", "North America", "Europe"], e: "Asia is the largest continent." },
  { q: "Which is the smallest continent?", a: "Australia", d: ["Europe", "Antarctica", "South America"], e: "Australia is the smallest continent." },
  { q: "Which country has the largest population?", a: "India", d: ["China", "United States", "Indonesia"], e: "India became the most populous country in 2023." },
  { q: "Which line divides the Earth into Northern and Southern hemispheres?", a: "Equator", d: ["Prime Meridian", "Tropic of Cancer", "Tropic of Capricorn"], e: "The Equator divides the hemispheres." },
  { q: "Which line of longitude is 0 degrees?", a: "Prime Meridian", d: ["Equator", "Tropic of Cancer", "International Date Line"], e: "The Prime Meridian is 0 degrees longitude." },
  { q: "Which is the deepest ocean trench?", a: "Mariana Trench", d: ["Java Trench", "Puerto Rico Trench", "Tonga Trench"], e: "The Mariana Trench is the deepest." },
  { q: "The Sahara Desert is located in:", a: "Africa", d: ["Asia", "Australia", "South America"], e: "The Sahara is in Africa." },
  { q: "Which country is known as the Land of the Rising Sun?", a: "Japan", d: ["China", "Korea", "Vietnam"], e: "Japan is the Land of the Rising Sun." },
  { q: "Which is the largest country by area?", a: "Russia", d: ["Canada", "China", "United States"], e: "Russia is the largest country by area." },
  { q: "Which strait separates Asia from North America?", a: "Bering Strait", d: ["Strait of Gibraltar", "Strait of Hormuz", "Malacca Strait"], e: "The Bering Strait separates Asia and North America." },
  { q: "Which is the largest island in the world?", a: "Greenland", d: ["Borneo", "Madagascar", "New Guinea"], e: "Greenland is the largest island." },
  { q: "Which continent has the most countries?", a: "Africa", d: ["Asia", "Europe", "South America"], e: "Africa has the most countries." },
  { q: "Which is the highest waterfall in the world?", a: "Angel Falls", d: ["Niagara Falls", "Victoria Falls", "Iguazu Falls"], e: "Angel Falls is the highest waterfall." },
  { q: "Which is the largest sea?", a: "Mediterranean Sea", d: ["Red Sea", "Black Sea", "Caspian Sea"], e: "The Mediterranean is the largest sea (the Caspian is a lake)." },
  { q: "The Great Barrier Reef is located near:", a: "Australia", d: ["Brazil", "India", "Mexico"], e: "The Great Barrier Reef is near Australia." },
  { q: "Which country has the most time zones?", a: "France", d: ["Russia", "United States", "China"], e: "France, with overseas territories, has the most time zones." },
];

const HUMAN_GEO_FACTS: Fact[] = [
  { q: "The study of human populations is called:", a: "Demography", d: ["Geology", "Ecology", "Cartography"], e: "Demography studies human populations." },
  { q: "Which country has the highest urban population share?", a: "Singapore", d: ["India", "Nigeria", "Pakistan"], e: "Singapore is almost entirely urban." },
  { q: "Migration from rural to urban areas is called:", a: "Urbanisation", d: ["Emigration", "Immigration", "Colonisation"], e: "Rural-to-urban movement is urbanisation." },
  { q: "Which sector employs most people in developing countries?", a: "Agriculture", d: ["Manufacturing", "Services", "Mining"], e: "Agriculture employs most in developing countries." },
  { q: "A densely populated area is measured by:", a: "Population density", d: ["Birth rate", "Death rate", "Literacy rate"], e: "Population density measures people per area." },
  { q: "Which is a push factor for migration?", a: "Unemployment", d: ["Better jobs", "Good schools", "Peace"], e: "Unemployment pushes people to migrate." },
  { q: "Which is a pull factor for migration?", a: "Higher wages", d: ["War", "Famine", "Flood"], e: "Higher wages attract migrants." },
  { q: "The world's population is approximately:", a: "8 billion", d: ["4 billion", "6 billion", "12 billion"], e: "World population is about 8 billion." },
];

const CLIMATE_FACTS: Fact[] = [
  { q: "The instrument used to measure rainfall is a:", a: "Rain gauge", d: ["Barometer", "Anemometer", "Hygrometer"], e: "A rain gauge measures rainfall." },
  { q: "The instrument used to measure wind speed is a:", a: "Anemometer", d: ["Barometer", "Rain gauge", "Thermometer"], e: "An anemometer measures wind speed." },
  { q: "The instrument used to measure humidity is a:", a: "Hygrometer", d: ["Barometer", "Anemometer", "Seismograph"], e: "A hygrometer measures humidity." },
  { q: "The average weather of a place over a long period is its:", a: "Climate", d: ["Weather", "Season", "Forecast"], e: "Climate is long-term average weather." },
  { q: "Which gas is chiefly responsible for the greenhouse effect?", a: "Carbon dioxide", d: ["Oxygen", "Nitrogen", "Helium"], e: "CO₂ drives the greenhouse effect." },
  { q: "The region near the Equator is generally:", a: "Hot and wet", d: ["Cold and dry", "Hot and dry", "Cold and wet"], e: "Equatorial regions are hot and wet." },
  { q: "Monsoon winds bring:", a: "Seasonal rainfall", d: ["Snow only", "Drought only", "Heat only"], e: "Monsoons bring seasonal rain." },
  { q: "Which climate zone has the lowest rainfall?", a: "Desert", d: ["Tropical", "Temperate", "Polar"], e: "Deserts receive the least rainfall." },
];

const RESOURCE_FACTS: Fact[] = [
  { q: "Which is a renewable natural resource?", a: "Solar energy", d: ["Coal", "Petroleum", "Natural gas"], e: "Solar energy is renewable." },
  { q: "Which is a non-renewable resource?", a: "Coal", d: ["Wind", "Solar", "Hydro"], e: "Coal is non-renewable." },
  { q: "Which mineral is mined in Pakistan's Salt Range?", a: "Rock salt", d: ["Diamond", "Gold", "Platinum"], e: "The Salt Range yields rock salt." },
  { q: "Which resource is essential for agriculture?", a: "Water", d: ["Gold", "Coal", "Iron"], e: "Water is essential for agriculture." },
  { q: "Which country is a major oil producer in the Middle East?", a: "Saudi Arabia", d: ["Nepal", "Mongolia", "Bolivia"], e: "Saudi Arabia is a major oil producer." },
  { q: "Forests are important because they:", a: "Absorb carbon dioxide", d: ["Increase pollution", "Reduce rainfall", "Cause erosion"], e: "Forests absorb CO₂." },
  { q: "Which energy source is used by hydroelectric dams?", a: "Flowing water", d: ["Coal", "Oil", "Gas"], e: "Hydroelectric dams use flowing water." },
  { q: "Sustainable use of resources means using them:", a: "Without depleting them", d: ["As fast as possible", "Only once", "Without limits"], e: "Sustainability avoids depletion." },
];

/** Parametric coordinate/scale questions for map-reading practice. */
function geographyNumeric(): SeedQuestion[] {
  const { rand } = makeRandom("geo-v1");
  const out: SeedQuestion[] = [];
  out.push(
    ...numeric(
      5000,
      {
        subject: "geography",
        topic: "map-reading",
        prefix: "geo-scale",
        tags: ["map-reading", "scale"],
      },
      () => {
        const cm = ri(rand, 2, 40);
        const kmPerCm = ri(rand, 1, 50);
        const km = cm * kmPerCm;
        return {
          stem: `On a map, 1 cm represents ${kmPerCm} km. How many kilometres does ${cm} cm represent?`,
          correct: `${km} km`,
          distractors: [`${km + kmPerCm} km`, `${cm + kmPerCm} km`, `${km / 2} km`, `${km - kmPerCm} km`],
          explanation: `${cm} cm × ${kmPerCm} km/cm = ${km} km.`,
        };
      },
    ),
  );
  out.push(
    ...numeric(
      5000,
      {
        subject: "geography",
        topic: "map-reading",
        prefix: "geo-scale2",
        tags: ["map-reading", "scale"],
      },
      () => {
        const cm = ri(rand, 2, 30);
        const kmPerCm = ri(rand, 2, 40);
        const km = cm * kmPerCm;
        return {
          stem: `A map scale is 1:${kmPerCm * 100000}. How many kilometres does ${cm} cm on the map represent?`,
          correct: `${km} km`,
          distractors: [`${km + 1} km`, `${km - 1} km`, `${km * 2} km`, `${cm} km`],
          explanation: `1 cm represents ${kmPerCm} km, so ${cm} cm represents ${km} km.`,
        };
      },
    ),
  );
  out.push(
    ...numeric(
      4000,
      {
        subject: "geography",
        topic: "physical-geography",
        prefix: "geo-temp",
        tags: ["physical-geography", "climate"],
      },
      () => {
        const t1 = ri(rand, -10, 30);
        const drop = ri(rand, 2, 20);
        return {
          stem: `A place has a temperature of ${t1}°C. It falls by ${drop}°C. What is the new temperature?`,
          correct: `${t1 - drop}°C`,
          distractors: [`${t1 + drop}°C`, `${drop - t1}°C`, `${t1}°C`, `${t1 - drop - 1}°C`],
          explanation: `${t1} − ${drop} = ${t1 - drop}°C.`,
        };
      },
    ),
  );
  return out;
}

export function generateGeography(): SeedQuestion[] {
  const out: SeedQuestion[] = [];
  out.push(
    ...bankToQuestions(PAKISTAN_GEO_FACTS, {
      subject: "geography",
      topic: "physical-geography",
      prefix: "geo-pk-phys",
      tags: ["pakistan-geography"],
    }),
  );
  out.push(
    ...bankToQuestions(HUMAN_GEO_FACTS, {
      subject: "geography",
      topic: "human-geography",
      prefix: "geo-pk-human",
      tags: ["human-geography"],
    }),
  );
  out.push(
    ...bankToQuestions(WORLD_GEO_FACTS, {
      subject: "geography",
      topic: "world-geography",
      prefix: "geo-world",
      tags: ["world-geography"],
    }),
  );
  out.push(
    ...bankToQuestions(CLIMATE_FACTS, {
      subject: "geography",
      topic: "climate-weather",
      prefix: "geo-climate",
      tags: ["climate-weather"],
    }),
  );
  out.push(
    ...bankToQuestions(RESOURCE_FACTS, {
      subject: "geography",
      topic: "natural-resources",
      prefix: "geo-resources",
      tags: ["natural-resources"],
    }),
  );
  // Mirror the world-geography facts into General Knowledge's topic (distinct
  // prefix and topic, so no content-hash collision with the geography subject).
  out.push(
    ...bankToQuestions(WORLD_GEO_FACTS, {
      subject: "general-knowledge",
      topic: "world-geography",
      prefix: "geo-gk-world",
      tags: ["world-geography"],
    }),
  );
  out.push(...geographyNumeric());
  return out;
}
