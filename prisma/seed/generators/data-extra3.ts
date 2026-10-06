/**
 * Coverage completion banks (STEM, computer science and general awareness).
 *
 * Fills the remaining physics, chemistry, mathematics, computer, computer
 * science, general-science, everyday-science, general-knowledge and
 * current-affairs topics. Each topic has its own content so the seed's global
 * content-hash de-duplication never drops an item.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const EXTRA3_BANKS: SubjectSpec[] = [
  /* ============================ Physics ============================ */
  {
    slug: "physics",
    topics: [
      {
        slug: "optics",
        facts: [
          f("The speed of light in a vacuum is approximately:", "3 × 10⁸ m/s", ["3 × 10⁶ m/s", "3 × 10⁵ m/s", "3 × 10¹⁰ m/s"], "Light travels at about 3 × 10⁸ m/s."),
          f("Which lens is used to correct short-sightedness?", "Concave lens", ["Convex lens", "Cylindrical lens", "Bifocal lens"], "Concave lenses correct myopia."),
          f("Which lens is used to correct long-sightedness?", "Convex lens", ["Concave lens", "Cylindrical lens", "Plane lens"], "Convex lenses correct hypermetropia."),
          f("The bending of light as it passes between media is:", "Refraction", ["Reflection", "Diffraction", "Dispersion"], "Refraction is the bending of light."),
          f("The splitting of white light into colours is:", "Dispersion", ["Reflection", "Refraction", "Diffraction"], "Dispersion splits white light."),
          f("A mirror that curves inward is a:", "Concave mirror", ["Convex mirror", "Plane mirror", "Cylindrical mirror"], "Inward-curving mirrors are concave."),
        ],
      },
      {
        slug: "thermodynamics",
        facts: [
          f("The first law of thermodynamics is about:", "Conservation of energy", ["Entropy increase", "Heat flow only", "Pressure only"], "The first law is energy conservation."),
          f("The second law of thermodynamics introduces:", "Entropy", ["Force", "Momentum", "Power"], "The second law concerns entropy."),
          f("Absolute zero is:", "0 K", ["0 °C", "100 K", "273 K"], "Absolute zero is 0 K."),
          f("Heat transfer by direct contact is:", "Conduction", ["Convection", "Radiation", "Evaporation"], "Conduction transfers heat by contact."),
          f("Heat transfer by fluid movement is:", "Convection", ["Conduction", "Radiation", "Evaporation"], "Convection transfers heat by fluid motion."),
          f("A heat engine converts:", "Heat to work", ["Work to heat", "Heat to light", "Light to heat"], "Heat engines convert heat to work."),
        ],
      },
      {
        slug: "modern-physics",
        facts: [
          f("The theory of relativity was proposed by:", "Einstein", ["Newton", "Bohr", "Planck"], "Einstein proposed relativity."),
          f("Light behaves as both a wave and a:", "Particle", ["Solid", "Gas", "Liquid"], "Light has wave-particle duality."),
          f("The photoelectric effect was explained by:", "Einstein", ["Newton", "Bohr", "Faraday"], "Einstein explained the photoelectric effect."),
          f("A photon is a:", "Quantum of light", ["An electron", "A proton", "A neutron"], "A photon is a quantum of light."),
          f("The uncertainty principle was proposed by:", "Heisenberg", ["Einstein", "Newton", "Bohr"], "Heisenberg proposed the uncertainty principle."),
          f("The mass-energy relation is:", "E = mc²", ["E = mgh", "F = ma", "V = IR"], "Einstein's relation is E = mc²."),
        ],
      },
      {
        slug: "nuclear-physics",
        facts: [
          f("The nucleus of an atom contains:", "Protons and neutrons", ["Electrons only", "Protons only", "Electrons and protons"], "The nucleus has protons and neutrons."),
          f("Which particle has a positive charge?", "Proton", ["Electron", "Neutron", "Photon"], "Protons are positively charged."),
          f("Which particle has no charge?", "Neutron", ["Proton", "Electron", "Ion"], "Neutrons are neutral."),
          f("Nuclear fission involves:", "Splitting a nucleus", ["Joining nuclei", "Adding electrons", "Removing protons"], "Fission splits a nucleus."),
          f("Nuclear fusion involves:", "Joining light nuclei", ["Splitting nuclei", "Adding electrons", "Removing neutrons"], "Fusion joins light nuclei."),
          f("The Sun's energy comes from:", "Nuclear fusion", ["Nuclear fission", "Combustion", "Friction"], "The Sun is powered by fusion."),
        ],
      },
      {
        slug: "electronics-physics",
        facts: [
          f("A semiconductor has conductivity between a:", "Conductor and insulator", ["Two conductors", "Two insulators", "Metal and gas"], "Semiconductors lie between conductors and insulators."),
          f("Silicon is commonly used in:", "Electronics", ["Cooking", "Farming", "Painting"], "Silicon is used in electronics."),
          f("A diode allows current in:", "One direction", ["Both directions", "No direction", "Random direction"], "Diodes conduct in one direction."),
          f("A transistor can act as a:", "Switch and amplifier", ["Resistor only", "Capacitor only", "Battery"], "Transistors switch and amplify."),
          f("Doping adds impurities to a:", "Semiconductor", ["Conductor", "Insulator", "Vacuum"], "Doping adds impurities to semiconductors."),
          f("An LED converts electrical energy into:", "Light", ["Heat only", "Sound", "Motion"], "LEDs convert electrical energy to light."),
        ],
      },
    ],
  },

  /* ============================ Chemistry ============================ */
  {
    slug: "chemistry",
    topics: [
      {
        slug: "physical-chemistry",
        facts: [
          f("The study of the physical properties of matter is:", "Physical chemistry", ["Organic chemistry", "Inorganic chemistry", "Analytical chemistry"], "Physical chemistry studies physical properties."),
          f("The mole is a unit of:", "Amount of substance", ["Mass", "Volume", "Length"], "The mole measures amount of substance."),
          f("Avogadro's number is approximately:", "6.02 × 10²³", ["6.02 × 10²⁰", "3.14 × 10²³", "1.6 × 10⁻¹⁹"], "Avogadro's number is 6.02 × 10²³."),
          f("The rate of a reaction is affected by:", "Temperature and concentration", ["Colour only", "Shape only", "Volume only"], "Temperature and concentration affect reaction rate."),
          f("A catalyst:", "Speeds up a reaction", ["Slows a reaction", "Stops a reaction", "Has no effect"], "Catalysts speed up reactions."),
          f("pH measures:", "Acidity or alkalinity", ["Temperature", "Mass", "Volume"], "pH measures acidity or alkalinity."),
        ],
      },
      {
        slug: "organic-chemistry",
        facts: [
          f("Organic chemistry studies compounds of:", "Carbon", ["Iron", "Sodium", "Calcium"], "Organic chemistry studies carbon compounds."),
          f("The simplest organic compound is:", "Methane", ["Ethane", "Propane", "Butane"], "Methane (CH₄) is the simplest organic compound."),
          f("Which is a hydrocarbon?", "Methane", ["Water", "Salt", "Carbon dioxide"], "Methane is a hydrocarbon."),
          f("The functional group -OH is characteristic of:", "Alcohols", ["Acids", "Aldehydes", "Ketones"], "-OH is the alcohol functional group."),
          f("The functional group -COOH is characteristic of:", "Carboxylic acids", ["Alcohols", "Esters", "Ethers"], "-COOH is the carboxylic acid group."),
          f("Benzene has a structure that is:", "Aromatic", ["Aliphatic", "Cyclic aliphatic", "Linear"], "Benzene is aromatic."),
        ],
      },
      {
        slug: "inorganic-chemistry",
        facts: [
          f("Inorganic chemistry studies compounds that generally lack:", "Carbon", ["Oxygen", "Nitrogen", "Hydrogen"], "Inorganic chemistry largely excludes carbon compounds."),
          f("Which is an inorganic compound?", "Sodium chloride", ["Methane", "Ethanol", "Glucose"], "Sodium chloride is inorganic."),
          f("The periodic table has how many groups?", "18", ["8", "16", "20"], "The periodic table has 18 groups."),
          f("The periodic table has how many periods?", "7", ["6", "8", "9"], "The periodic table has seven periods."),
          f("Group 1 elements are called:", "Alkali metals", ["Halogens", "Noble gases", "Alkaline earth metals"], "Group 1 elements are alkali metals."),
          f("Group 18 elements are called:", "Noble gases", ["Alkali metals", "Halogens", "Transition metals"], "Group 18 elements are noble gases."),
        ],
      },
      {
        slug: "analytical-chemistry",
        facts: [
          f("Analytical chemistry deals with:", "Analysis of substances", ["Only synthesis", "Only reactions", "Only bonding"], "Analytical chemistry analyses substances."),
          f("Titration is used to determine:", "Concentration", ["Colour", "Mass only", "Volume only"], "Titration determines concentration."),
          f("Chromatography separates:", "Mixtures", ["Compounds only", "Elements only", "Atoms"], "Chromatography separates mixtures."),
          f("Spectroscopy uses:", "Light absorption", ["Weight", "Volume", "Temperature"], "Spectroscopy uses light absorption."),
          f("Qualitative analysis determines:", "What a substance is", ["How much there is", "How heavy it is", "How hot it is"], "Qualitative analysis identifies substances."),
          f("Quantitative analysis determines:", "How much of a substance there is", ["What a substance is", "Its colour", "Its age"], "Quantitative analysis measures amounts."),
        ],
      },
      {
        slug: "chemical-reactions",
        facts: [
          f("A reaction that releases heat is:", "Exothermic", ["Endothermic", "Neutral", "Reversible"], "Exothermic reactions release heat."),
          f("A reaction that absorbs heat is:", "Endothermic", ["Exothermic", "Neutral", "Irreversible"], "Endothermic reactions absorb heat."),
          f("Rusting of iron is an example of:", "Oxidation", ["Reduction", "Sublimation", "Neutralisation"], "Rusting is oxidation."),
          f("Acid plus base gives:", "Salt and water", ["Salt only", "Water only", "Gas only"], "Acid + base gives salt and water."),
          f("A reaction that can go both ways is:", "Reversible", ["Irreversible", "Permanent", "Complete"], "Reversible reactions go both ways."),
          f("In a redox reaction, oxidation and reduction occur:", "Together", ["Separately", "Never", "Only once"], "Oxidation and reduction occur together."),
        ],
      },
      {
        slug: "biochemistry-chem",
        facts: [
          f("Biochemistry studies:", "Chemistry of living things", ["Only metals", "Only gases", "Only minerals"], "Biochemistry studies living systems."),
          f("Which biomolecule is the main energy source?", "Carbohydrate", ["Protein", "Lipid", "Nucleic acid"], "Carbohydrates are the main energy source."),
          f("Proteins are made of:", "Amino acids", ["Sugars", "Fatty acids", "Nucleotides"], "Proteins are made of amino acids."),
          f("DNA is a:", "Nucleic acid", ["Protein", "Carbohydrate", "Lipid"], "DNA is a nucleic acid."),
          f("Enzymes are chemically:", "Proteins", ["Carbohydrates", "Lipids", "Nucleic acids"], "Most enzymes are proteins."),
          f("Glucose is a:", "Monosaccharide", ["Disaccharide", "Polysaccharide", "Protein"], "Glucose is a monosaccharide."),
        ],
      },
    ],
  },

  /* ============================ Mathematics ============================ */
  {
    slug: "mathematics",
    topics: [
      {
        slug: "calculus",
        facts: [
          f("Calculus deals with:", "Rates of change and accumulation", ["Only shapes", "Only numbers", "Only data"], "Calculus studies change and accumulation."),
          f("The derivative measures:", "Rate of change", ["Area", "Volume", "Length"], "The derivative measures rate of change."),
          f("The integral measures:", "Accumulation or area", ["Slope", "Rate", "Speed"], "The integral measures accumulation."),
          f("The derivative of x² is:", "2x", ["x", "2", "x²/2"], "d/dx(x²) = 2x."),
          f("The derivative of a constant is:", "0", ["1", "The constant", "Infinity"], "The derivative of a constant is 0."),
          f("The integral of 1 dx is:", "x + C", ["1 + C", "0", "x²/2"], "∫1 dx = x + C."),
        ],
      },
      {
        slug: "matrices",
        facts: [
          f("A matrix is an array of:", "Numbers", ["Letters", "Shapes", "Sounds"], "A matrix is an array of numbers."),
          f("The order of a matrix is given by:", "Rows × columns", ["Rows + columns", "Rows only", "Columns only"], "Matrix order is rows × columns."),
          f("The identity matrix has:", "1s on the diagonal", ["0s on the diagonal", "All 1s", "All 0s"], "The identity matrix has 1s on the diagonal."),
          f("Matrix multiplication is:", "Not always commutative", ["Always commutative", "Never defined", "Always zero"], "Matrix multiplication is not commutative."),
          f("The determinant of a 2×2 matrix [a b; c d] is:", "ad − bc", ["ab − cd", "ac − bd", "a + d"], "Det = ad − bc."),
          f("A matrix with equal rows and columns is:", "Square", ["Rectangular", "Row", "Column"], "Square matrices have equal rows and columns."),
        ],
      },
      {
        slug: "series-sequences",
        facts: [
          f("A sequence is an ordered list of:", "Terms", ["Shapes", "Angles", "Circles"], "A sequence is an ordered list of terms."),
          f("An arithmetic sequence has a constant:", "Common difference", ["Common ratio", "Sum", "Product"], "Arithmetic sequences have a common difference."),
          f("A geometric sequence has a constant:", "Common ratio", ["Common difference", "Sum", "Product"], "Geometric sequences have a common ratio."),
          f("The sum of an arithmetic series is given by:", "n/2 × (first + last)", ["n × first", "first + last", "n × last"], "Sum = n/2 × (first + last)."),
          f("In the sequence 2, 4, 6, 8, the common difference is:", "2", ["1", "4", "6"], "The common difference is 2."),
          f("In the sequence 3, 6, 12, 24, the common ratio is:", "2", ["3", "6", "12"], "The common ratio is 2."),
        ],
      },
      {
        slug: "sets-functions",
        facts: [
          f("A set is a collection of:", "Distinct objects", ["Repeated objects", "Numbers only", "Letters only"], "A set is a collection of distinct objects."),
          f("The symbol ∪ denotes:", "Union", ["Intersection", "Difference", "Complement"], "∪ denotes union."),
          f("The symbol ∩ denotes:", "Intersection", ["Union", "Difference", "Complement"], "∩ denotes intersection."),
          f("A function maps each input to:", "One output", ["Many outputs", "No output", "Two outputs"], "A function maps to one output."),
          f("The set with no elements is the:", "Empty set", ["Universal set", "Power set", "Subset"], "The empty set has no elements."),
          f("The domain of a function is the set of:", "Inputs", ["Outputs", "Constants", "Variables"], "The domain is the set of inputs."),
        ],
      },
    ],
  },

  /* ============================ Computer ============================ */
  {
    slug: "computer",
    topics: [
      {
        slug: "internet",
        facts: [
          f("The Internet is a:", "Global network of networks", ["Single computer", "Local printer", "One website"], "The Internet is a global network of networks."),
          f("WWW stands for:", "World Wide Web", ["Wide World Web", "World Web Wide", "Web World Wide"], "WWW is the World Wide Web."),
          f("A web browser is used to:", "Access websites", ["Print files", "Scan images", "Burn discs"], "Browsers access websites."),
          f("URL stands for:", "Uniform Resource Locator", ["Universal Resource Link", "Uniform Reference Link", "Universal Reference Locator"], "URL is Uniform Resource Locator."),
          f("Email stands for:", "Electronic mail", ["Express mail", "External mail", "Emergency mail"], "Email is electronic mail."),
          f("HTTP is a protocol for:", "Transferring web pages", ["Sending faxes", "Printing", "Scanning"], "HTTP transfers web pages."),
        ],
      },
      {
        slug: "databases-basic",
        facts: [
          f("A database is an organised collection of:", "Data", ["Programs", "Printers", "Cables"], "A database stores organised data."),
          f("A record in a database is a:", "Row of related fields", ["Column", "Table", "File"], "A record is a row of fields."),
          f("A field in a database is a:", "Single piece of information", ["A table", "A record", "A file"], "A field is a single piece of information."),
          f("SQL is used to:", "Query databases", ["Design websites", "Print files", "Scan images"], "SQL queries databases."),
          f("A primary key uniquely identifies a:", "Record", ["Table", "Field", "Database"], "A primary key identifies a record."),
          f("DBMS stands for:", "Database Management System", ["Data Backup Management System", "Database Memory System", "Data Base Machine System"], "DBMS is Database Management System."),
        ],
      },
      {
        slug: "programming-basic",
        facts: [
          f("Programming is the process of writing:", "Instructions for a computer", ["Documents", "Emails", "Reports"], "Programming writes instructions."),
          f("A variable stores:", "Data", ["A printer", "A screen", "A cable"], "A variable stores data."),
          f("A loop is used to:", "Repeat instructions", ["Stop a program", "Print once", "Delete files"], "Loops repeat instructions."),
          f("A conditional statement controls:", "Decision-making", ["Printing", "Saving", "Scanning"], "Conditionals control decisions."),
          f("A compiler translates:", "Source code to machine code", ["English to Urdu", "Data to files", "Files to images"], "Compilers translate source to machine code."),
          f("Which is a programming language?", "Python", ["HTTP", "HTML only", "JPEG"], "Python is a programming language."),
        ],
      },
      {
        slug: "operating-systems",
        facts: [
          f("An operating system manages:", "Hardware and software resources", ["Only printers", "Only files", "Only users"], "An OS manages system resources."),
          f("Which is an operating system?", "Windows", ["Photoshop", "Chrome", "Excel"], "Windows is an operating system."),
          f("A GUI provides a:", "Graphical interface", ["Command line only", "Text only", "Sound only"], "A GUI is graphical."),
          f("Multitasking allows:", "Running several programs at once", ["Running one program", "No programs", "Only games"], "Multitasking runs several programs."),
          f("File management is a function of the:", "Operating system", ["Printer", "Monitor", "Keyboard"], "The OS manages files."),
          f("Linux is an:", "Open-source operating system", ["Application", "Printer", "Website"], "Linux is an open-source OS."),
        ],
      },
      {
        slug: "cyber-security-basic",
        facts: [
          f("Cyber security protects against:", "Digital threats", ["Physical theft only", "Weather", "Traffic"], "Cyber security protects against digital threats."),
          f("A virus is a type of:", "Malware", ["Hardware", "Network", "Protocol"], "A virus is malware."),
          f("A strong password should be:", "Long and complex", ["Short and simple", "Your name", "12345"], "Strong passwords are long and complex."),
          f("Phishing attempts to:", "Steal information", ["Speed up computers", "Print files", "Scan images"], "Phishing steals information."),
          f("A firewall helps to:", "Block unauthorised access", ["Speed up the CPU", "Print documents", "Store files"], "Firewalls block unauthorised access."),
          f("Two-factor authentication adds:", "An extra security step", ["A second monitor", "A second keyboard", "A second printer"], "2FA adds an extra security step."),
        ],
      },
    ],
  },

  /* ============================ Computer Science ============================ */
  {
    slug: "computer-science",
    topics: [
      {
        slug: "algorithms",
        facts: [
          f("An algorithm is a:", "Step-by-step procedure", ["A computer", "A program language", "A file"], "An algorithm is a step-by-step procedure."),
          f("The time complexity of binary search is:", "O(log n)", ["O(n)", "O(n²)", "O(1)"], "Binary search is O(log n)."),
          f("The time complexity of linear search is:", "O(n)", ["O(log n)", "O(1)", "O(n²)"], "Linear search is O(n)."),
          f("Bubble sort has an average complexity of:", "O(n²)", ["O(n)", "O(log n)", "O(1)"], "Bubble sort is O(n²)."),
          f("Which algorithm finds the shortest path?", "Dijkstra's algorithm", ["Bubble sort", "Binary search", "Merge sort"], "Dijkstra finds shortest paths."),
          f("Recursion is a technique where a function:", "Calls itself", ["Loops forever", "Stops itself", "Prints itself"], "Recursion is self-calling."),
        ],
      },
      {
        slug: "operating-systems-cs",
        facts: [
          f("A process is a:", "Program in execution", ["A file", "A folder", "A device"], "A process is a running program."),
          f("A thread is a:", "Lightweight unit of execution", ["A heavy process", "A file", "A device"], "A thread is a lightweight execution unit."),
          f("Scheduling decides:", "Which process runs next", ["Which file opens", "Which disk spins", "Which key is pressed"], "Scheduling picks the next process."),
          f("Deadlock occurs when processes:", "Wait for each other", ["Finish early", "Run fast", "Exit cleanly"], "Deadlock is mutual waiting."),
          f("Virtual memory extends:", "Physical memory", ["Disk space only", "CPU speed", "Network"], "Virtual memory extends physical memory."),
          f("A page fault occurs when:", "A page is not in memory", ["A file is deleted", "A process ends", "A disk fails"], "Page faults occur on memory misses."),
        ],
      },
      {
        slug: "dbms",
        facts: [
          f("DBMS stands for:", "Database Management System", ["Data Backup Management System", "Database Memory System", "Data Base Machine System"], "DBMS is Database Management System."),
          f("Normalisation is used to:", "Reduce redundancy", ["Increase redundancy", "Delete data", "Encrypt data"], "Normalisation reduces redundancy."),
          f("SQL stands for:", "Structured Query Language", ["Simple Query Language", "Standard Query Logic", "System Query Language"], "SQL is Structured Query Language."),
          f("A foreign key links:", "Two tables", ["Two files", "Two users", "Two databases"], "Foreign keys link tables."),
          f("ACID stands for:", "Atomicity, Consistency, Isolation, Durability", ["Access, Control, Index, Data", "Atomic, Clear, Isolated, Durable", "Add, Create, Insert, Delete"], "ACID describes transactions."),
          f("A join combines:", "Rows from tables", ["Files", "Users", "Databases"], "Joins combine rows from tables."),
        ],
      },
      {
        slug: "software-engineering",
        facts: [
          f("The waterfall model is:", "Sequential", ["Iterative", "Random", "Parallel only"], "Waterfall is sequential."),
          f("Agile development is:", "Iterative", ["Sequential", "Random", "Static"], "Agile is iterative."),
          f("SDLC stands for:", "Software Development Life Cycle", ["System Design Logic Cycle", "Software Data Logic Cycle", "System Development Logic Code"], "SDLC is the Software Development Life Cycle."),
          f("Unit testing tests:", "Individual components", ["The whole system", "Users", "Hardware"], "Unit testing tests components."),
          f("Version control helps manage:", "Code changes", ["Hardware", "Network cables", "Printers"], "Version control manages code changes."),
          f("Refactoring improves code:", "Structure without changing behaviour", ["Colour", "Speed only", "Size only"], "Refactoring improves structure."),
        ],
      },
      {
        slug: "computer-networks",
        facts: [
          f("A LAN covers:", "A small area", ["A country", "The world", "A continent"], "A LAN covers a small area."),
          f("A WAN covers:", "A large area", ["A room", "A building", "A desk"], "A WAN covers a large area."),
          f("IP stands for:", "Internet Protocol", ["Internal Program", "Input Port", "Integrated Processor"], "IP is Internet Protocol."),
          f("A router connects:", "Networks", ["Printers only", "Monitors only", "Keyboards only"], "Routers connect networks."),
          f("The OSI model has how many layers?", "7", ["4", "5", "6"], "The OSI model has seven layers."),
          f("TCP/IP is a:", "Protocol suite", ["Hardware device", "Programming language", "Operating system"], "TCP/IP is a protocol suite."),
        ],
      },
      {
        slug: "theory-of-computation",
        facts: [
          f("An automaton is a:", "Mathematical model of computation", ["A machine part", "A program", "A file"], "An automaton models computation."),
          f("A finite automaton has:", "A finite number of states", ["Infinite states", "No states", "One state"], "Finite automata have finite states."),
          f("A Turing machine is a:", "Theoretical computing model", ["A real computer", "A printer", "A phone"], "Turing machines are theoretical models."),
          f("A regular language is recognised by a:", "Finite automaton", ["Turing machine", "Stack machine", "Queue machine"], "Regular languages are recognised by finite automata."),
          f("The halting problem is:", "Undecidable", ["Decidable", "Trivial", "Solvable in linear time"], "The halting problem is undecidable."),
          f("A context-free grammar generates:", "Context-free languages", ["Regular languages only", "All languages", "No languages"], "CFGs generate context-free languages."),
        ],
      },
      {
        slug: "artificial-intelligence",
        facts: [
          f("AI stands for:", "Artificial Intelligence", ["Automated Information", "Advanced Internet", "Applied Informatics"], "AI is Artificial Intelligence."),
          f("Machine learning is a subset of:", "AI", ["Networking", "Databases", "Hardware"], "Machine learning is a subset of AI."),
          f("Supervised learning uses:", "Labelled data", ["Unlabelled data", "No data", "Random data"], "Supervised learning uses labelled data."),
          f("Unsupervised learning uses:", "Unlabelled data", ["Labelled data", "No data", "Random data"], "Unsupervised learning uses unlabelled data."),
          f("A neural network is inspired by:", "The human brain", ["The Internet", "A database", "A printer"], "Neural networks are inspired by the brain."),
          f("Which is an AI application?", "Speech recognition", ["Printing", "Scanning", "Cabling"], "Speech recognition is an AI application."),
        ],
      },
      {
        slug: "web-technologies",
        facts: [
          f("HTML is used to:", "Structure web pages", ["Style web pages", "Program servers", "Store data"], "HTML structures web pages."),
          f("CSS is used to:", "Style web pages", ["Structure web pages", "Store data", "Program servers"], "CSS styles web pages."),
          f("JavaScript adds:", "Interactivity", ["Structure only", "Storage only", "Printing"], "JavaScript adds interactivity."),
          f("A web server serves:", "Web pages", ["Printers", "Keyboards", "Monitors"], "Web servers serve web pages."),
          f("HTTPS is a:", "Secure web protocol", ["Printing protocol", "Storage format", "Programming language"], "HTTPS is a secure web protocol."),
          f("A domain name identifies:", "A website", ["A printer", "A keyboard", "A monitor"], "A domain name identifies a website."),
        ],
      },
      {
        slug: "cyber-security",
        facts: [
          f("Encryption protects:", "Data confidentiality", ["Hardware", "Network cables", "Printers"], "Encryption protects confidentiality."),
          f("A symmetric key uses:", "One shared key", ["Two different keys", "No key", "Three keys"], "Symmetric encryption uses one key."),
          f("Asymmetric encryption uses:", "A public and private key", ["One shared key", "No key", "Three keys"], "Asymmetric encryption uses a key pair."),
          f("A DDoS attack aims to:", "Overwhelm a service", ["Improve performance", "Encrypt data", "Backup data"], "DDoS attacks overwhelm services."),
          f("A vulnerability is a:", "Weakness in a system", ["Strength", "Feature", "Protocol"], "A vulnerability is a weakness."),
          f("Penetration testing checks:", "System security", ["Printing speed", "Screen size", "Keyboard layout"], "Penetration testing checks security."),
        ],
      },
    ],
  },
];
