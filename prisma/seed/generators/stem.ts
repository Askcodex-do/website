/**
 * Physics, chemistry and computer-science generators.
 *
 * Physics and chemistry items are computed from formulae so answers are always
 * correct; computer items cover number-system conversion, logic gates and
 * hardware/software facts.
 */

import { makeRandom } from "./core";
import { bankToQuestions, numeric, ri } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

const ELEMENTS: Array<[string, string, string]> = [
  ["Hydrogen", "H", "1"], ["Helium", "He", "2"], ["Lithium", "Li", "3"], ["Beryllium", "Be", "4"],
  ["Boron", "B", "5"], ["Carbon", "C", "6"], ["Nitrogen", "N", "7"], ["Oxygen", "O", "8"],
  ["Fluorine", "F", "9"], ["Neon", "Ne", "10"], ["Sodium", "Na", "11"], ["Magnesium", "Mg", "12"],
  ["Aluminium", "Al", "13"], ["Silicon", "Si", "14"], ["Phosphorus", "P", "15"], ["Sulfur", "S", "16"],
  ["Chlorine", "Cl", "17"], ["Argon", "Ar", "18"], ["Potassium", "K", "19"], ["Calcium", "Ca", "20"],
  ["Iron", "Fe", "26"], ["Copper", "Cu", "29"], ["Zinc", "Zn", "30"], ["Silver", "Ag", "47"],
  ["Gold", "Au", "79"], ["Mercury", "Hg", "80"], ["Lead", "Pb", "82"], ["Uranium", "U", "92"],
  ["Tin", "Sn", "50"], ["Nickel", "Ni", "28"], ["Manganese", "Mn", "25"], ["Chromium", "Cr", "24"],
];

const CHEM_FACTS: Fact[] = [
  { q: "What is the chemical formula of water?", a: "H2O", d: ["CO2", "H2O2", "O2"], e: "Water is H2O." },
  { q: "What is the chemical formula of common salt?", a: "NaCl", d: ["KCl", "CaCl2", "NaOH"], e: "Common salt is sodium chloride, NaCl." },
  { q: "What is the chemical formula of carbon dioxide?", a: "CO2", d: ["CO", "O2", "CH4"], e: "Carbon dioxide is CO2." },
  { q: "What is the chemical formula of glucose?", a: "C6H12O6", d: ["C2H6O", "CH4", "C12H22O11"], e: "Glucose is C6H12O6." },
  { q: "What is the chemical formula of baking soda?", a: "NaHCO3", d: ["Na2CO3", "NaOH", "NaCl"], e: "Baking soda is sodium bicarbonate, NaHCO3." },
  { q: "What is the pH of a neutral solution at 25°C?", a: "7", d: ["0", "14", "1"], e: "A neutral solution has pH 7." },
  { q: "Which gas is most abundant in Earth's atmosphere?", a: "Nitrogen", d: ["Oxygen", "Carbon dioxide", "Argon"], e: "Nitrogen makes up about 78% of the atmosphere." },
  { q: "What is the valency of oxygen?", a: "2", d: ["1", "3", "4"], e: "Oxygen has a valency of 2." },
  { q: "What is the atomic number of carbon?", a: "6", d: ["12", "8", "4"], e: "Carbon has atomic number 6." },
  { q: "Which particle has a negative charge?", a: "Electron", d: ["Proton", "Neutron", "Nucleus"], e: "Electrons carry a negative charge." },
  { q: "Which particle has no charge?", a: "Neutron", d: ["Proton", "Electron", "Ion"], e: "Neutrons are electrically neutral." },
  { q: "The bond formed by transfer of electrons is called:", a: "Ionic bond", d: ["Covalent bond", "Metallic bond", "Hydrogen bond"], e: "Transfer of electrons forms an ionic bond." },
];

const PHYSICS_FACTS: Fact[] = [
  { q: "What is the SI unit of force?", a: "Newton", d: ["Joule", "Watt", "Pascal"], e: "Force is measured in newtons." },
  { q: "What is the SI unit of energy?", a: "Joule", d: ["Newton", "Watt", "Ampere"], e: "Energy is measured in joules." },
  { q: "What is the SI unit of power?", a: "Watt", d: ["Joule", "Newton", "Volt"], e: "Power is measured in watts." },
  { q: "What is the SI unit of electric current?", a: "Ampere", d: ["Volt", "Ohm", "Watt"], e: "Current is measured in amperes." },
  { q: "What is the SI unit of pressure?", a: "Pascal", d: ["Newton", "Joule", "Bar"], e: "Pressure is measured in pascals." },
  { q: "What is the SI unit of frequency?", a: "Hertz", d: ["Second", "Meter", "Decibel"], e: "Frequency is measured in hertz." },
  { q: "What is the approximate value of acceleration due to gravity on Earth?", a: "9.8 m/s²", d: ["8.9 m/s²", "10.8 m/s²", "6.7 m/s²"], e: "g ≈ 9.8 m/s²." },
  { q: "What is the speed of light in vacuum?", a: "3 × 10⁸ m/s", d: ["3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁵ m/s"], e: "Light travels at about 3 × 10⁸ m/s." },
  { q: "Which instrument measures electric current?", a: "Ammeter", d: ["Voltmeter", "Barometer", "Thermometer"], e: "An ammeter measures current." },
  { q: "Which instrument measures atmospheric pressure?", a: "Barometer", d: ["Ammeter", "Hygrometer", "Galvanometer"], e: "A barometer measures atmospheric pressure." },
  { q: "Which law states that every action has an equal and opposite reaction?", a: "Newton's Third Law", d: ["Newton's First Law", "Newton's Second Law", "Ohm's Law"], e: "Newton's Third Law." },
  { q: "What is the SI unit of resistance?", a: "Ohm", d: ["Volt", "Ampere", "Watt"], e: "Resistance is measured in ohms." },
];

const COMPUTER_FACTS: Fact[] = [
  { q: "What does CPU stand for?", a: "Central Processing Unit", d: ["Central Program Unit", "Computer Processing Unit", "Control Processing Unit"], e: "CPU = Central Processing Unit." },
  { q: "What does RAM stand for?", a: "Random Access Memory", d: ["Read Access Memory", "Rapid Access Memory", "Real Access Memory"], e: "RAM = Random Access Memory." },
  { q: "What does ROM stand for?", a: "Read Only Memory", d: ["Random Only Memory", "Read Once Memory", "Rapid Only Memory"], e: "ROM = Read Only Memory." },
  { q: "Which of these is an operating system?", a: "Linux", d: ["Oracle", "Photoshop", "Chrome"], e: "Linux is an operating system." },
  { q: "What does HTML stand for?", a: "HyperText Markup Language", d: ["HyperText Machine Language", "HighText Markup Language", "HyperTool Markup Language"], e: "HTML = HyperText Markup Language." },
  { q: "What does URL stand for?", a: "Uniform Resource Locator", d: ["Universal Resource Locator", "Uniform Reference Link", "Universal Reference Link"], e: "URL = Uniform Resource Locator." },
  { q: "Which device is used to input text?", a: "Keyboard", d: ["Monitor", "Printer", "Speaker"], e: "A keyboard inputs text." },
  { q: "Which device is used to display output?", a: "Monitor", d: ["Keyboard", "Mouse", "Scanner"], e: "A monitor displays output." },
  { q: "What does LAN stand for?", a: "Local Area Network", d: ["Large Area Network", "Long Area Network", "Linked Area Network"], e: "LAN = Local Area Network." },
  { q: "What does WAN stand for?", a: "Wide Area Network", d: ["Wireless Area Network", "World Area Network", "Web Area Network"], e: "WAN = Wide Area Network." },
  { q: "Which is a programming language?", a: "Python", d: ["HTTP", "FTP", "SMTP"], e: "Python is a programming language." },
  { q: "1 byte is equal to how many bits?", a: "8", d: ["4", "16", "32"], e: "1 byte = 8 bits." },
  { q: "Which company developed the Windows operating system?", a: "Microsoft", d: ["Apple", "Google", "IBM"], e: "Microsoft developed Windows." },
  { q: "Which protocol is used for sending email?", a: "SMTP", d: ["HTTP", "FTP", "TCP"], e: "SMTP sends email." },
  { q: "Which is the brain of the computer?", a: "CPU", d: ["RAM", "Hard disk", "Monitor"], e: "The CPU is the brain of the computer." },
  { q: "What does USB stand for?", a: "Universal Serial Bus", d: ["Universal System Bus", "Uniform Serial Bus", "United Serial Bus"], e: "USB = Universal Serial Bus." },
];

const DATA_STRUCTURES_FACTS: Fact[] = [
  { q: "A stack follows which order?", a: "LIFO", d: ["FIFO", "Random", "Priority"], e: "A stack is Last-In-First-Out." },
  { q: "A queue follows which order?", a: "FIFO", d: ["LIFO", "Random", "Priority"], e: "A queue is First-In-First-Out." },
  { q: "Which data structure uses a key-value mapping?", a: "Hash table", d: ["Stack", "Queue", "Linked list"], e: "A hash table maps keys to values." },
  { q: "A binary tree node has at most how many children?", a: "2", d: ["1", "3", "4"], e: "A binary tree node has at most two children." },
  { q: "In a binary search tree, the left subtree holds values that are:", a: "Smaller than the node", d: ["Larger than the node", "Equal to the node", "Unrelated"], e: "Left subtree values are smaller." },
  { q: "Which structure grows by linking nodes with pointers?", a: "Linked list", d: ["Array", "Stack", "Queue"], e: "A linked list links nodes with pointers." },
  { q: "What is the average time to search a balanced binary search tree?", a: "O(log n)", d: ["O(n)", "O(1)", "O(n log n)"], e: "A balanced BST searches in O(log n)." },
  { q: "Which traversal visits root, then left, then right?", a: "Pre-order", d: ["In-order", "Post-order", "Level-order"], e: "Pre-order visits root first." },
  { q: "Which traversal visits left, then root, then right?", a: "In-order", d: ["Pre-order", "Post-order", "Level-order"], e: "In-order visits left, root, right." },
  { q: "A graph with no cycles is called a:", a: "Tree", d: ["Cycle graph", "Complete graph", "Multigraph"], e: "A connected acyclic graph is a tree." },
  { q: "What is the worst-case time to search an unsorted array?", a: "O(n)", d: ["O(log n)", "O(1)", "O(n log n)"], e: "An unsorted array needs a linear scan." },
  { q: "Which technique solves a problem by breaking it into overlapping subproblems?", a: "Dynamic programming", d: ["Greedy", "Backtracking", "Recursion only"], e: "Dynamic programming caches subproblem results." },
];

export function generateStemV1(): SeedQuestion[] {
  const { rand } = makeRandom("stem-v1");
  const out: SeedQuestion[] = [];

  /* ---- physics: computed ---- */
  out.push(
    ...numeric(11000, { subject: "physics", topic: "units-measurements", prefix: "s1-unit", tags: ["units"] }, () => {
      const conv: Array<[string, string, number]> = [
        ["metres", "centimetres", 100], ["kilometres", "metres", 1000],
        ["kilograms", "grams", 1000], ["litres", "millilitres", 1000],
        ["hours", "minutes", 60], ["minutes", "seconds", 60],
      ];
      const [from, to, factor] = conv[ri(rand, 0, conv.length - 1)];
      const n = ri(rand, 2, 60);
      const correct = n * factor;
      return {
        stem: `Convert ${n} ${from} into ${to}.`,
        correct,
        distractors: [correct / factor, correct + factor, correct - factor, correct * 2],
        explanation: `1 ${from.slice(0, -1)} = ${factor} ${to}, so ${n} ${from} = ${correct} ${to}.`,
      };
    }),
  );
  out.push(
    ...numeric(9000, { subject: "physics", topic: "mechanics", prefix: "s1-newton", tags: ["force"] }, () => {
      const m = ri(rand, 2, 200);
      const a = ri(rand, 2, 40);
      const f = m * a;
      return {
        stem: `A body of mass ${m} kg accelerates at ${a} m/s². What force acts on it (F = ma)?`,
        correct: `${f} N`,
        distractors: [`${m + a} N`, `${f / 2} N`, `${f + a} N`, `${a} N`],
        explanation: `F = m × a = ${m} × ${a} = ${f} N.`,
      };
    }),
  );
  out.push(
    ...numeric(8000, { subject: "physics", topic: "electricity-magnetism", prefix: "s1-ohm", tags: ["ohms-law"] }, () => {
      const i = ri(rand, 1, 20);
      const r = ri(rand, 2, 200);
      const v = i * r;
      return {
        stem: `A current of ${i} A flows through a resistor of ${r} Ω. What is the voltage (V = IR)?`,
        correct: `${v} V`,
        distractors: [`${i + r} V`, `${Math.round(r / i)} V`, `${v + i} V`, `${v / 2} V`],
        explanation: `V = I × R = ${i} × ${r} = ${v} V.`,
      };
    }),
  );
  out.push(
    ...numeric(8000, { subject: "physics", topic: "work-energy-power", prefix: "s1-work", tags: ["work", "energy"] }, () => {
      const f = ri(rand, 5, 300);
      const d = ri(rand, 2, 60);
      const w = f * d;
      return {
        stem: `A force of ${f} N moves an object ${d} m. How much work is done (W = Fd)?`,
        correct: `${w} J`,
        distractors: [`${f + d} J`, `${Math.round(f / d)} J`, `${w + f} J`, `${w / 2} J`],
        explanation: `W = F × d = ${f} × ${d} = ${w} J.`,
      };
    }),
  );
  out.push(
    ...numeric(7000, { subject: "physics", topic: "waves-sound", prefix: "s1-speed", tags: ["speed"] }, () => {
      const d = ri(rand, 10, 900);
      const t = ri(rand, 2, 30);
      const s = d / t;
      const correct = `${Math.round(s * 100) / 100} m/s`;
      return {
        stem: `A body covers ${d} m in ${t} s. What is its average speed?`,
        correct,
        distractors: [`${d * t} m/s`, `${Math.round((t / d) * 100) / 100} m/s`, `${d - t} m/s`, `${Math.round(s * 2 * 100) / 100} m/s`],
        explanation: `Speed = distance ÷ time = ${d} ÷ ${t} = ${correct}.`,
      };
    }),
  );

  /* ---- chemistry ---- */
  out.push(...bankToQuestions(CHEM_FACTS, { subject: "chemistry", topic: "chemical-formulae", prefix: "s1-chem", tags: ["chemistry"] }));
  out.push(...bankToQuestions(CHEM_FACTS, { subject: "chemistry", topic: "atomic-structure", prefix: "s1-atom", tags: ["chemistry"] }));
  out.push(
    ...bankToQuestions(
      ELEMENTS.map(([name, sym, num]) => ({
        q: `What is the chemical symbol of ${name}?`,
        a: sym,
        d: ["Xx", "Yy", "Zz"],
        e: `The symbol of ${name} is ${sym}.`,
      })),
      { subject: "chemistry", topic: "periodic-table", prefix: "s1-sym", tags: ["periodic-table"] },
    ),
  );
  out.push(
    ...bankToQuestions(
      ELEMENTS.map(([name, , num]) => ({
        q: `What is the atomic number of ${name}?`,
        a: num,
        d: [String(Number(num) + 1), String(Math.max(1, Number(num) - 1)), String(Number(num) + 10)],
        e: `The atomic number of ${name} is ${num}.`,
      })),
      { subject: "chemistry", topic: "periodic-table", prefix: "s1-anum", tags: ["periodic-table"] },
    ),
  );

  /* ---- physics facts ---- */
  out.push(...bankToQuestions(PHYSICS_FACTS, { subject: "physics", topic: "units-measurements", prefix: "s1-punit", tags: ["units"] }));
  out.push(...bankToQuestions(PHYSICS_FACTS, { subject: "physics", topic: "mechanics", prefix: "s1-pmech", tags: ["mechanics"] }));
  out.push(...bankToQuestions(PHYSICS_FACTS, { subject: "general-science", topic: "physics", prefix: "s1-gphys", tags: ["science"] }));

  /* ---- computer: number systems (computed) ---- */
  out.push(
    ...numeric(11000, { subject: "computer", topic: "computer-fundamentals", prefix: "s1-bin", tags: ["number-systems"] }, () => {
      const n = ri(rand, 2, 255);
      return {
        stem: `What is the binary representation of the decimal number ${n}?`,
        correct: n.toString(2),
        distractors: [(n + 1).toString(2), (n - 1).toString(2), (n * 2).toString(2), n.toString(16)],
        explanation: `${n} in binary is ${n.toString(2)}.`,
      };
    }),
  );
  out.push(
    ...numeric(7000, { subject: "computer", topic: "computer-fundamentals", prefix: "s1-hex", tags: ["number-systems"] }, () => {
      const n = ri(rand, 16, 4095);
      return {
        stem: `What is the hexadecimal representation of the decimal number ${n}?`,
        correct: n.toString(16).toUpperCase(),
        distractors: [(n + 1).toString(16).toUpperCase(), (n - 1).toString(16).toUpperCase(), n.toString(2), n.toString(10)],
        explanation: `${n} in hexadecimal is ${n.toString(16).toUpperCase()}.`,
      };
    }),
  );
  out.push(
    ...numeric(7000, { subject: "computer", topic: "computer-fundamentals", prefix: "s1-binadd", tags: ["number-systems"] }, () => {
      const a = ri(rand, 2, 120);
      const b = ri(rand, 2, 120);
      const sum = a + b;
      return {
        stem: `Add the binary numbers ${a.toString(2)} and ${b.toString(2)}. Give the result in binary.`,
        correct: sum.toString(2),
        distractors: [(sum + 1).toString(2), (a * b).toString(2), (sum - 1).toString(2), sum.toString(10)],
        explanation: `${a} + ${b} = ${sum}, which is ${sum.toString(2)} in binary.`,
      };
    }),
  );
  out.push(...bankToQuestions(COMPUTER_FACTS, { subject: "computer", topic: "computer-fundamentals", prefix: "s1-comp", tags: ["computer"] }));
  out.push(...bankToQuestions(DATA_STRUCTURES_FACTS, { subject: "computer-science", topic: "data-structures", prefix: "s1-cs", tags: ["computer-science"] }));

  return out;
}
