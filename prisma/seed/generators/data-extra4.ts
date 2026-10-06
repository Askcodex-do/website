/**
 * Coverage completion banks (general science and general awareness).
 *
 * Fills the remaining general-science, everyday-science, general-knowledge and
 * current-affairs topics. Content is kept distinct per topic so the seed's
 * global content-hash de-duplication never removes an item.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const EXTRA4_BANKS: SubjectSpec[] = [
  /* ============================ General Science ============================ */
  {
    slug: "general-science",
    topics: [
      {
        slug: "diseases-health",
        facts: [
          f("Malaria is spread by which vector?", "Mosquito", ["Housefly", "Tick", "Sandfly"], "Malaria is transmitted by the female Anopheles mosquito."),
          f("Which disease is caused by a vitamin C deficiency?", "Scurvy", ["Rickets", "Beriberi", "Anaemia"], "Vitamin C deficiency causes scurvy."),
          f("Which vitamin deficiency causes night blindness?", "Vitamin A", ["Vitamin B", "Vitamin C", "Vitamin D"], "Vitamin A deficiency impairs night vision."),
          f("Tuberculosis most commonly affects the:", "Lungs", ["Liver", "Kidney", "Heart"], "TB most commonly affects the lungs."),
          f("Diabetes mellitus is caused by a deficiency of:", "Insulin", ["Adrenaline", "Thyroxine", "Haemoglobin"], "Diabetes involves insulin deficiency."),
          f("Which is a waterborne disease?", "Cholera", ["Malaria", "Tuberculosis", "Measles"], "Cholera spreads through contaminated water."),
        ],
      },
      {
        slug: "inventions-discoveries",
        facts: [
          f("Who invented the telephone?", "Alexander Graham Bell", ["Thomas Edison", "Nikola Tesla", "Marconi"], "Bell invented the telephone."),
          f("Who discovered penicillin?", "Alexander Fleming", ["Louis Pasteur", "Edward Jenner", "Robert Koch"], "Fleming discovered penicillin."),
          f("Who invented the light bulb?", "Thomas Edison", ["Alexander Bell", "James Watt", "Michael Faraday"], "Edison developed the practical light bulb."),
          f("Who formulated the theory of relativity?", "Albert Einstein", ["Isaac Newton", "Galileo", "Niels Bohr"], "Einstein developed relativity."),
          f("Who formulated the law of gravitation?", "Isaac Newton", ["Albert Einstein", "Kepler", "Copernicus"], "Newton formulated gravitation."),
          f("Who invented the printing press?", "Johannes Gutenberg", ["James Watt", "Thomas Edison", "Alexander Bell"], "Gutenberg invented the printing press."),
        ],
      },
      {
        slug: "scientific-instruments",
        facts: [
          f("Which instrument measures temperature?", "Thermometer", ["Barometer", "Hygrometer", "Ammeter"], "A thermometer measures temperature."),
          f("Which instrument measures electric current?", "Ammeter", ["Voltmeter", "Barometer", "Odometer"], "An ammeter measures current."),
          f("Which instrument measures atmospheric pressure?", "Barometer", ["Thermometer", "Hygrometer", "Anemometer"], "A barometer measures atmospheric pressure."),
          f("A microscope is used to:", "View very small objects", ["View distant objects", "Measure pressure", "Measure rainfall"], "A microscope magnifies small objects."),
          f("Which instrument measures rainfall?", "Rain gauge", ["Barometer", "Anemometer", "Hygrometer"], "A rain gauge measures rainfall."),
          f("A telescope is used to:", "View distant objects", ["View small objects", "Measure pressure", "Measure humidity"], "A telescope views distant objects."),
        ],
      },
      {
        slug: "units-measurements",
        facts: [
          f("What is the SI unit of length?", "Metre", ["Kilometre", "Centimetre", "Foot"], "The metre is the SI unit of length."),
          f("What is the SI unit of mass?", "Kilogram", ["Gram", "Pound", "Newton"], "The kilogram is the SI unit of mass."),
          f("How many metres are in one kilometre?", "1000", ["100", "10000", "500"], "One kilometre equals 1000 metres."),
          f("What is the SI unit of temperature?", "Kelvin", ["Celsius", "Fahrenheit", "Rankine"], "The kelvin is the SI unit of temperature."),
          f("How many grams are in one kilogram?", "1000", ["100", "10", "10000"], "One kilogram equals 1000 grams."),
          f("What is the SI unit of time?", "Second", ["Minute", "Hour", "Day"], "The second is the SI unit of time."),
        ],
      },
      {
        slug: "environment",
        facts: [
          f("Which gas is a major greenhouse gas?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Helium"], "CO₂ is a major greenhouse gas."),
          f("Which activity causes deforestation?", "Logging", ["Planting trees", "Recycling", "Composting"], "Logging causes deforestation."),
          f("Which of these is a renewable resource?", "Wind", ["Coal", "Petroleum", "Natural gas"], "Wind is renewable."),
          f("Water pollution is caused by:", "Industrial waste", ["Rainfall", "Sunlight", "Wind"], "Industrial waste pollutes water."),
          f("Which pollutant depletes the ozone layer?", "CFCs", ["Carbon dioxide", "Oxygen", "Water vapour"], "CFCs deplete ozone."),
          f("Recycling helps to:", "Reduce waste", ["Increase waste", "Deplete resources", "Pollute water"], "Recycling reduces waste."),
        ],
      },
    ],
  },

  /* ============================ Everyday Science ============================ */
  {
    slug: "everyday-science",
    topics: [
      {
        slug: "human-body",
        facts: [
          f("How many bones are in the adult human body?", "206", ["186", "226", "246"], "Adults have 206 bones."),
          f("Which is the largest organ of the human body?", "Skin", ["Liver", "Brain", "Lungs"], "The skin is the largest organ."),
          f("Which organ produces insulin?", "Pancreas", ["Liver", "Kidney", "Stomach"], "The pancreas produces insulin."),
          f("Which organ filters blood and produces urine?", "Kidney", ["Liver", "Spleen", "Lung"], "The kidneys filter blood."),
          f("How many teeth does a normal adult have?", "32", ["28", "30", "36"], "Adults normally have 32 teeth."),
          f("Which part of the brain controls balance?", "Cerebellum", ["Cerebrum", "Medulla", "Hypothalamus"], "The cerebellum controls balance."),
        ],
      },
      {
        slug: "food-nutrition",
        facts: [
          f("Which nutrient is the main source of energy?", "Carbohydrate", ["Protein", "Fat", "Water"], "Carbohydrates are the main energy source."),
          f("Which nutrient builds and repairs the body?", "Protein", ["Carbohydrate", "Fat", "Water"], "Protein builds and repairs the body."),
          f("Which vitamin is found in citrus fruits?", "Vitamin C", ["Vitamin A", "Vitamin D", "Vitamin K"], "Citrus fruits are rich in vitamin C."),
          f("Which mineral is important for strong bones?", "Calcium", ["Iron", "Zinc", "Iodine"], "Calcium strengthens bones."),
          f("Which mineral prevents anaemia?", "Iron", ["Calcium", "Zinc", "Sodium"], "Iron prevents anaemia."),
          f("How many calories does 1 gram of carbohydrate provide?", "4", ["9", "7", "2"], "Carbohydrates provide about 4 kcal/g."),
        ],
      },
      {
        slug: "vitamins",
        facts: [
          f("Which vitamin is produced in skin on sun exposure?", "Vitamin D", ["Vitamin A", "Vitamin C", "Vitamin K"], "Skin produces vitamin D in sunlight."),
          f("Which vitamin deficiency causes scurvy?", "Vitamin C", ["Vitamin A", "Vitamin D", "Vitamin B12"], "Vitamin C deficiency causes scurvy."),
          f("Which vitamin is important for vision?", "Vitamin A", ["Vitamin C", "Vitamin D", "Vitamin K"], "Vitamin A is important for vision."),
          f("Which vitamin helps blood clotting?", "Vitamin K", ["Vitamin A", "Vitamin C", "Vitamin D"], "Vitamin K aids clotting."),
          f("Which vitamin deficiency causes rickets?", "Vitamin D", ["Vitamin A", "Vitamin C", "Vitamin K"], "Vitamin D deficiency causes rickets."),
          f("Which B vitamin prevents beriberi?", "Vitamin B1", ["Vitamin B12", "Vitamin C", "Vitamin D"], "Vitamin B1 deficiency causes beriberi."),
        ],
      },
      {
        slug: "inventions-discoveries",
        facts: [
          f("Who invented the aeroplane?", "Wright brothers", ["Thomas Edison", "Alexander Bell", "Henry Ford"], "The Wright brothers invented the aeroplane."),
          f("Who invented the steam engine?", "James Watt", ["Thomas Edison", "Alexander Bell", "Marconi"], "Watt improved the steam engine."),
          f("Who discovered radioactivity?", "Henri Becquerel", ["Marie Curie only", "Einstein", "Newton"], "Becquerel discovered radioactivity."),
          f("Who discovered X-rays?", "Wilhelm Röntgen", ["Marie Curie", "Einstein", "Newton"], "Röntgen discovered X-rays."),
          f("Who developed the polio vaccine?", "Jonas Salk", ["Alexander Fleming", "Louis Pasteur", "Edward Jenner"], "Salk developed the polio vaccine."),
          f("Who invented the World Wide Web?", "Tim Berners-Lee", ["Bill Gates", "Steve Jobs", "Charles Babbage"], "Berners-Lee invented the WWW."),
        ],
      },
      {
        slug: "environment",
        facts: [
          f("Which gas do humans need for respiration?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Hydrogen"], "Humans need oxygen."),
          f("Which of these is a renewable energy source?", "Solar", ["Coal", "Oil", "Gas"], "Solar energy is renewable."),
          f("Which practice conserves water?", "Fixing leaks", ["Leaving taps open", "Flooding fields", "Dumping waste"], "Fixing leaks conserves water."),
          f("Air pollution can cause:", "Respiratory problems", ["Better vision", "Stronger bones", "Better hearing"], "Air pollution causes respiratory problems."),
          f("Planting trees helps to:", "Purify air", ["Increase pollution", "Reduce rainfall", "Cause erosion"], "Trees purify air."),
          f("Which is a biodegradable waste?", "Vegetable peels", ["Plastic", "Glass", "Metal"], "Vegetable peels are biodegradable."),
        ],
      },
    ],
  },

  /* ============================ General Knowledge ============================ */
  {
    slug: "general-knowledge",
    topics: [
      {
        slug: "international-organizations",
        facts: [
          f("Where is the UN headquarters?", "New York", ["Geneva", "Paris", "Vienna"], "The UN is headquartered in New York."),
          f("How many permanent members are on the UN Security Council?", "5", ["7", "10", "15"], "There are five permanent members."),
          f("Where is the WHO headquartered?", "Geneva", ["New York", "Paris", "Rome"], "WHO is in Geneva."),
          f("What does IMF stand for?", "International Monetary Fund", ["International Management Fund", "International Money Federation", "International Market Fund"], "IMF is the International Monetary Fund."),
          f("What does SAARC stand for?", "South Asian Association for Regional Cooperation", ["South Asian Alliance for Regional Commerce", "Southern Asian Association", "South Atlantic Association"], "SAARC is the South Asian Association for Regional Cooperation."),
          f("In which year was the UN founded?", "1945", ["1919", "1939", "1950"], "The UN was founded in 1945."),
        ],
      },
      {
        slug: "national-symbols",
        facts: [
          f("What is the ratio of the Pakistan flag?", "3:2", ["2:1", "4:3", "1:1"], "The flag ratio is 3:2."),
          f("Who designed the flag of Pakistan?", "Amiruddin Kidwai", ["Muhammad Ali Jinnah", "Allama Iqbal", "Liaquat Ali Khan"], "Amiruddin Kidwai designed the flag."),
          f("What is the national motto of Pakistan?", "Faith, Unity, Discipline", ["Peace and Prosperity", "Liberty and Justice", "One Nation, One People"], "The motto is Faith, Unity, Discipline."),
          f("The white portion of the Pakistan flag represents:", "Religious minorities", ["The army", "Agriculture", "Industry"], "The white stripe represents religious minorities."),
          f("Which symbol appears on Pakistan's national flag?", "Crescent and star", ["Lion", "Eagle", "Sun"], "The flag bears a crescent and star."),
          f("Deodar, the national tree of Pakistan, is a type of:", "Conifer", ["Palm", "Fern", "Grass"], "The Deodar is a conifer."),
        ],
      },
      {
        slug: "awards-honours",
        facts: [
          f("The Nobel Prize is awarded in how many categories?", "6", ["4", "5", "7"], "The Nobel Prize has six categories."),
          f("The Nobel Peace Prize is awarded in:", "Oslo", ["Stockholm", "Geneva", "Paris"], "The Peace Prize is awarded in Oslo."),
          f("Which Pakistani won the Nobel Prize in Physics?", "Abdus Salam", ["A. Q. Khan", "Malala Yousafzai", "Ishfaq Ahmad"], "Abdus Salam won the Physics Nobel."),
          f("Which Pakistani won the Nobel Peace Prize?", "Malala Yousafzai", ["Abdus Salam", "A. Q. Khan", "Benazir Bhutto"], "Malala won the Nobel Peace Prize."),
          f("The Nishan-e-Haider is Pakistan's highest:", "Military award", ["Civilian award", "Sports award", "Literary award"], "Nishan-e-Haider is the highest military award."),
          f("The Oscar is an award for:", "Films", ["Music", "Literature", "Science"], "The Oscar is a film award."),
        ],
      },
      {
        slug: "capitals-currencies",
        facts: [
          f("What is the capital of Japan?", "Tokyo", ["Osaka", "Kyoto", "Nagoya"], "Tokyo is the capital of Japan."),
          f("What is the currency of the USA?", "Dollar", ["Euro", "Pound", "Yen"], "The US currency is the dollar."),
          f("What is the capital of France?", "Paris", ["Lyon", "Marseille", "Nice"], "Paris is the capital of France."),
          f("What is the currency of the UK?", "Pound", ["Euro", "Dollar", "Franc"], "The UK currency is the pound."),
          f("What is the capital of China?", "Beijing", ["Shanghai", "Guangzhou", "Shenzhen"], "Beijing is the capital of China."),
          f("What is the currency of Saudi Arabia?", "Riyal", ["Dinar", "Dirham", "Rial"], "The Saudi currency is the riyal."),
        ],
      },
      {
        slug: "famous-personalities",
        facts: [
          f("Who was the founder of Pakistan?", "Quaid-e-Azam Muhammad Ali Jinnah", ["Allama Iqbal", "Liaquat Ali Khan", "Sir Syed Ahmad Khan"], "Jinnah founded Pakistan."),
          f("Who is known as the poet of the East?", "Allama Iqbal", ["Ghalib", "Faiz", "Mir Taqi Mir"], "Iqbal is the poet of the East."),
          f("Who was the first Prime Minister of Pakistan?", "Liaquat Ali Khan", ["Jinnah", "Khawaja Nazimuddin", "Feroz Khan Noon"], "Liaquat Ali Khan was the first PM."),
          f("Who is known as the father of the nation in India?", "Mahatma Gandhi", ["Nehru", "Tagore", "Patel"], "Gandhi is called the father of the nation in India."),
          f("Who wrote the national anthem of Pakistan?", "Hafeez Jalandhari", ["Allama Iqbal", "Faiz", "Ghalib"], "Hafeez Jalandhari wrote the anthem."),
          f("Who composed the music of Pakistan's anthem?", "Ahmed G. Chagla", ["Hafeez Jalandhari", "Iqbal", "Faiz"], "Chagla composed the anthem's music."),
        ],
      },
      {
        slug: "important-days",
        facts: [
          f("Pakistan's Independence Day is:", "14 August", ["23 March", "6 September", "25 December"], "Independence Day is 14 August."),
          f("Pakistan Day is celebrated on:", "23 March", ["14 August", "6 September", "25 December"], "Pakistan Day is 23 March."),
          f("International Women's Day is:", "8 March", ["1 May", "8 March", "10 December"], "Women's Day is 8 March."),
          f("World Health Day is:", "7 April", ["1 May", "7 April", "10 December"], "World Health Day is 7 April."),
          f("International Labour Day is:", "1 May", ["8 March", "1 May", "7 April"], "Labour Day is 1 May."),
          f("Human Rights Day is:", "10 December", ["8 March", "1 May", "7 April"], "Human Rights Day is 10 December."),
        ],
      },
    ],
  },

  /* ============================ Current Affairs ============================ */
  {
    slug: "current-affairs",
    topics: [
      {
        slug: "environment",
        facts: [
          f("The Paris Agreement addresses:", "Climate change", ["Trade", "Defence", "Health"], "The Paris Agreement addresses climate change."),
          f("Which gas is the main greenhouse gas?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Helium"], "CO₂ is the main greenhouse gas."),
          f("Which conference series addresses climate change?", "COP", ["G20", "BRICS", "NATO"], "COP conferences address climate change."),
          f("Which is a renewable energy source?", "Solar", ["Coal", "Oil", "Gas"], "Solar energy is renewable."),
          f("Deforestation contributes to:", "Climate change", ["Cooling", "Rainfall increase", "Oxygen increase"], "Deforestation contributes to climate change."),
          f("Which organisation monitors global health?", "WHO", ["IMF", "WTO", "UNESCO"], "WHO monitors global health."),
        ],
      },
      {
        slug: "sports-affairs",
        facts: [
          f("How often are the Olympic Games held?", "Every four years", ["Every two years", "Every three years", "Every five years"], "The Olympics are held every four years."),
          f("Which country hosted the 2022 FIFA World Cup?", "Qatar", ["Russia", "Brazil", "South Africa"], "Qatar hosted the 2022 World Cup."),
          f("How many players are in a cricket team?", "11", ["9", "10", "12"], "A cricket team has 11 players."),
          f("Which country hosted the 2024 Summer Olympics?", "France", ["Japan", "Brazil", "China"], "France hosted the 2024 Summer Olympics."),
          f("How many players are in a football team on the field?", "11", ["9", "10", "12"], "A football team fields 11 players."),
          f("Which sport is associated with Wimbledon?", "Tennis", ["Cricket", "Football", "Hockey"], "Wimbledon is a tennis tournament."),
        ],
      },
      {
        slug: "science-technology",
        facts: [
          f("Which organisation is Pakistan's space agency?", "SUPARCO", ["NASA", "ISRO", "ESA"], "SUPARCO is Pakistan's space agency."),
          f("The Internet was invented in the:", "1960s", ["1940s", "1980s", "1990s"], "The Internet originated in the 1960s."),
          f("AI stands for:", "Artificial Intelligence", ["Automated Information", "Advanced Internet", "Applied Informatics"], "AI is Artificial Intelligence."),
          f("Which device is used for space exploration?", "Rover", ["Printer", "Scanner", "Router"], "Rovers explore space."),
          f("5G refers to:", "Mobile network technology", ["A car model", "A vaccine", "A currency"], "5G is mobile network technology."),
          f("Which field studies genes?", "Genetics", ["Geology", "Astronomy", "Meteorology"], "Genetics studies genes."),
        ],
      },
      {
        slug: "national-affairs",
        facts: [
          f("The President of Pakistan is the:", "Head of state", ["Head of government", "Chief Justice", "Speaker"], "The President is head of state."),
          f("The Prime Minister of Pakistan is the:", "Head of government", ["Head of state", "Chief Justice", "Speaker"], "The PM heads the government."),
          f("The State Bank of Pakistan is the:", "Central bank", ["Commercial bank", "Investment bank", "Microfinance bank"], "The SBP is the central bank."),
          f("CPEC stands for:", "China-Pakistan Economic Corridor", ["Central Pakistan Economic Council", "China Pakistan Energy Corridor", "Combined Pakistan Economic Committee"], "CPEC is the China-Pakistan Economic Corridor."),
          f("The Election Commission of Pakistan conducts:", "Elections", ["Trials", "Trade", "Taxation"], "The ECP conducts elections."),
          f("Pakistan is a member of:", "OIC", ["NATO", "EU", "ASEAN"], "Pakistan is an OIC member."),
        ],
      },
    ],
  },
];
