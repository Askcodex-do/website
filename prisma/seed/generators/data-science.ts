/**
 * Science, health and medical subject banks.
 *
 * Fills biology (the MDCAT core), zoology, botany, statistics, IT, software
 * engineering, environmental science, agriculture, geology and the health
 * subjects (anatomy, physiology, pharmacology, nursing, public health,
 * biochemistry, medical). Each fact carries an explanation, so every generated
 * question has an answer rationale.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const SCIENCE_BANKS: SubjectSpec[] = [
  {
    slug: "biology",
    topics: [
      {
        slug: "cell-biology",
        facts: [
          f("Which organelle is the site of protein synthesis?", "Ribosome", ["Mitochondrion", "Golgi apparatus", "Lysosome"], "Ribosomes translate mRNA into protein."),
          f("Which organelle is the powerhouse of the cell?", "Mitochondrion", ["Nucleus", "Ribosome", "Vacuole"], "Mitochondria generate ATP by oxidative phosphorylation."),
          f("Which structure controls what enters and leaves the cell?", "Cell membrane", ["Cell wall", "Nucleus", "Cytoplasm"], "The selectively permeable plasma membrane regulates transport."),
          f("Which organelle packages and modifies proteins?", "Golgi apparatus", ["Ribosome", "Mitochondrion", "Nucleolus"], "The Golgi apparatus modifies, sorts and packages proteins."),
          f("In which organelle does photosynthesis occur?", "Chloroplast", ["Mitochondrion", "Ribosome", "Nucleus"], "Chloroplasts contain chlorophyll and carry out photosynthesis."),
          f("Which cell organelle contains digestive enzymes?", "Lysosome", ["Ribosome", "Golgi apparatus", "Chloroplast"], "Lysosomes digest cellular waste and debris."),
          f("What is the jelly-like substance that fills the cell called?", "Cytoplasm", ["Nucleoplasm", "Matrix", "Stroma"], "Cytoplasm is the fluid medium where organelles are suspended."),
          f("Which organelle is called the control centre of the cell?", "Nucleus", ["Ribosome", "Vacuole", "Lysosome"], "The nucleus contains DNA and directs cell activity."),
        ],
      },
      {
        slug: "genetics",
        facts: [
          f("What is the basic unit of heredity?", "Gene", ["Chromosome", "Allele", "Genome"], "A gene is a DNA segment that codes for a trait."),
          f("How many chromosomes does a normal human body cell have?", "46", ["23", "44", "48"], "Human somatic cells have 46 chromosomes (23 pairs)."),
          f("DNA stands for:", "Deoxyribonucleic acid", ["Diribonucleic acid", "Deoxyribose nucleic acid", "Dinucleic acid"], "DNA is deoxyribonucleic acid."),
          f("Which molecule carries genetic information from DNA to ribosomes?", "mRNA", ["tRNA", "rRNA", "DNA polymerase"], "Messenger RNA carries the genetic code to ribosomes."),
          f("Who is regarded as the father of genetics?", "Gregor Mendel", ["Charles Darwin", "Watson and Crick", "Hugo de Vries"], "Mendel established the laws of inheritance using pea plants."),
          f("What is an alternative form of a gene called?", "Allele", ["Genome", "Chromatid", "Codon"], "Alleles are variant forms of a gene."),
          f("A cross between a tall (TT) and a short (tt) pea plant gives offspring that are:", "All tall", ["All short", "Half tall", "All medium"], "TT × tt gives all Tt, which are tall (dominant)."),
          f("Which of these is a sex-linked disorder?", "Haemophilia", ["Colour blindness only", "Down syndrome", "Sickle-cell anaemia"], "Haemophilia is X-linked; colour blindness is also X-linked but the best answer here is haemophilia."),
        ],
      },
      {
        slug: "human-physiology",
        facts: [
          f("Which organ pumps blood around the body?", "Heart", ["Liver", "Lungs", "Kidney"], "The heart is a muscular pump driving circulation."),
          f("How many chambers does the human heart have?", "4", ["2", "3", "5"], "Two atria and two ventricles make four chambers."),
          f("Which organ is the main site of nutrient absorption?", "Small intestine", ["Stomach", "Large intestine", "Oesophagus"], "Most nutrient absorption occurs in the small intestine."),
          f("Which gas is taken in during inhalation for respiration?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Hydrogen"], "Oxygen is used in cellular respiration."),
          f("Which organ filters blood to form urine?", "Kidney", ["Liver", "Spleen", "Lung"], "The kidneys filter blood and produce urine."),
          f("Which part of the brain controls breathing and heart rate?", "Medulla oblongata", ["Cerebrum", "Cerebellum", "Thalamus"], "The medulla controls involuntary vital functions."),
          f("Which blood vessels carry blood away from the heart?", "Arteries", ["Veins", "Capillaries", "Venules"], "Arteries carry blood away from the heart."),
          f("Which hormone regulates blood glucose by lowering it?", "Insulin", ["Glucagon", "Adrenaline", "Thyroxine"], "Insulin lowers blood glucose; glucagon raises it."),
        ],
      },
      {
        slug: "plant-biology",
        facts: [
          f("The process by which plants make food using sunlight is:", "Photosynthesis", ["Respiration", "Transpiration", "Digestion"], "Photosynthesis converts light, CO₂ and water into glucose."),
          f("Which pigment absorbs light for photosynthesis?", "Chlorophyll", ["Haemoglobin", "Melanin", "Carotene"], "Chlorophyll absorbs light energy in chloroplasts."),
          f("Which part of the plant absorbs water and minerals?", "Root", ["Leaf", "Stem", "Flower"], "Roots absorb water and minerals from the soil."),
          f("The loss of water vapour from leaves is called:", "Transpiration", ["Respiration", "Guttation", "Condensation"], "Transpiration is water loss as vapour through stomata."),
          f("Which tissue transports water in plants?", "Xylem", ["Phloem", "Cambium", "Epidermis"], "Xylem conducts water and dissolved minerals upward."),
          f("Which tissue transports food in plants?", "Phloem", ["Xylem", "Cortex", "Pith"], "Phloem translocates sugars produced by photosynthesis."),
          f("Sexual reproduction in flowering plants occurs in the:", "Flower", ["Leaf", "Root", "Stem"], "The flower contains the reproductive organs of the plant."),
          f("Which gas is released by plants during photosynthesis?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Methane"], "Oxygen is a by-product of photosynthesis."),
        ],
      },
      {
        slug: "ecology",
        facts: [
          f("The study of the relationship between organisms and their environment is:", "Ecology", ["Genetics", "Taxonomy", "Anatomy"], "Ecology studies organisms and their environment."),
          f("A group of organisms of the same species living together is a:", "Population", ["Community", "Ecosystem", "Biome"], "A population is one species in one area."),
          f("All living organisms and their physical environment form an:", "Ecosystem", ["Population", "Species", "Niche"], "An ecosystem includes biotic and abiotic components."),
          f("Which organism produces its own food?", "Producer", ["Consumer", "Decomposer", "Predator"], "Producers (plants) make their own food by photosynthesis."),
          f("Which of these is a decomposer?", "Fungus", ["Grass", "Goat", "Eagle"], "Fungi break down dead organic matter."),
          f("The flow of energy in an ecosystem is described by:", "Food chain", ["Water cycle", "Nitrogen cycle", "Carbon cycle"], "A food chain shows energy transfer between organisms."),
          f("Which gas is chiefly responsible for the greenhouse effect?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Helium"], "CO₂ traps heat, contributing to the greenhouse effect."),
          f("The place where an organism lives is its:", "Habitat", ["Niche", "Biome", "Community"], "A habitat is the natural home of an organism."),
        ],
      },
      {
        slug: "evolution",
        facts: [
          f("Who proposed the theory of natural selection?", "Charles Darwin", ["Gregor Mendel", "Lamarck", "Louis Pasteur"], "Darwin proposed natural selection in 'On the Origin of Species'."),
          f("The remains of ancient organisms preserved in rock are called:", "Fossils", ["Minerals", "Sediments", "Artifacts"], "Fossils provide evidence of past life."),
          f("The similarity in structure of different species indicating common ancestry is:", "Homology", ["Analogy", "Convergence", "Mutation"], "Homologous structures share a common origin."),
          f("Which of these is a vestigial organ in humans?", "Appendix", ["Heart", "Liver", "Lung"], "The appendix is a reduced, non-essential structure."),
          f("The process by which species change over time is:", "Evolution", ["Respiration", "Mutation", "Adaptation"], "Evolution is change in species over generations."),
          f("A random change in DNA sequence is called:", "Mutation", ["Migration", "Selection", "Recombination"], "Mutations introduce new genetic variation."),
        ],
      },
      {
        slug: "microbiology",
        facts: [
          f("Which of these is caused by a virus?", "COVID-19", ["Tuberculosis", "Cholera", "Tetanus"], "COVID-19 is caused by the SARS-CoV-2 virus."),
          f("Which microorganism is used to make yoghurt?", "Bacteria", ["Virus", "Fungus", "Protozoan"], "Lactic-acid bacteria ferment milk into yoghurt."),
          f("Which organism causes malaria?", "Plasmodium", ["Virus", "Bacterium", "Fungus"], "Malaria is caused by Plasmodium, transmitted by mosquitoes."),
          f("Penicillin was discovered by:", "Alexander Fleming", ["Louis Pasteur", "Robert Koch", "Edward Jenner"], "Fleming discovered penicillin from Penicillium mould."),
          f("Which of these is a fungal disease?", "Ringworm", ["Malaria", "Typhoid", "Measles"], "Ringworm is a fungal skin infection."),
          f("Bacteria are:", "Prokaryotes", ["Eukaryotes", "Viruses", "Fungi"], "Bacteria lack a true nucleus, so they are prokaryotes."),
        ],
      },
      {
        slug: "reproduction",
        facts: [
          f("The fusion of male and female gametes is called:", "Fertilisation", ["Ovulation", "Gestation", "Implantation"], "Fertilisation is the union of sperm and egg."),
          f("In humans, the male gamete is the:", "Sperm", ["Ovum", "Zygote", "Embryo"], "The sperm is the male reproductive cell."),
          f("The developing human is called a foetus after about:", "8 weeks", ["1 week", "4 weeks", "20 weeks"], "After the embryonic stage (~8 weeks) it is termed a foetus."),
          f("Which organ connects the foetus to the mother's blood supply?", "Placenta", ["Uterus", "Ovary", "Cervix"], "The placenta exchanges nutrients, gases and waste."),
          f("How many chromosomes are in a human gamete?", "23", ["46", "22", "44"], "Gametes are haploid, carrying 23 chromosomes."),
          f("The process of cell division producing gametes is:", "Meiosis", ["Mitosis", "Fission", "Budding"], "Meiosis halves the chromosome number to form gametes."),
        ],
      },
    ],
  },

  {
    slug: "zoology",
    topics: [
      {
        slug: "animal-diversity",
        facts: [
          f("Animals without a backbone are called:", "Invertebrates", ["Vertebrates", "Chordates", "Mammals"], "Invertebrates lack a vertebral column."),
          f("Which phylum do sponges belong to?", "Porifera", ["Cnidaria", "Annelida", "Mollusca"], "Sponges belong to phylum Porifera."),
          f("Which class of vertebrates includes frogs?", "Amphibia", ["Reptilia", "Pisces", "Aves"], "Frogs are amphibians."),
          f("Which group of animals is warm-blooded?", "Mammals", ["Reptiles", "Amphibians", "Fish"], "Mammals (and birds) maintain a constant body temperature."),
          f("Which of these is a marsupial?", "Kangaroo", ["Whale", "Bat", "Horse"], "Kangaroos carry young in a pouch."),
          f("Insects have how many legs?", "6", ["4", "8", "10"], "Insects are hexapods, with six legs."),
        ],
      },
      {
        slug: "animal-physiology",
        facts: [
          f("Which pigment transports oxygen in vertebrate blood?", "Haemoglobin", ["Chlorophyll", "Melanin", "Myoglobin only"], "Haemoglobin binds oxygen in red blood cells."),
          f("Which organ system exchanges gases in fish?", "Gills", ["Lungs", "Skin", "Trachea"], "Fish extract dissolved oxygen through gills."),
          f("Which heart chamber receives oxygenated blood from the lungs?", "Left atrium", ["Right atrium", "Left ventricle", "Right ventricle"], "The left atrium receives oxygenated blood from the lungs."),
          f("Which organ produces bile in vertebrates?", "Liver", ["Pancreas", "Gall bladder", "Spleen"], "The liver produces bile; the gall bladder stores it."),
          f("Nerve cells are called:", "Neurons", ["Nephrons", "Alveoli", "Villi"], "Neurons transmit electrical impulses."),
          f("The functional unit of the kidney is the:", "Nephron", ["Neuron", "Alveolus", "Villus"], "Nephrons filter blood in the kidney."),
        ],
      },
      {
        slug: "taxonomy",
        facts: [
          f("The scientific naming system using two names is called:", "Binomial nomenclature", ["Taxonomy", "Classification", "Phylogeny"], "Binomial nomenclature gives each species a genus and species name."),
          f("Who is known as the father of taxonomy?", "Carl Linnaeus", ["Charles Darwin", "Aristotle", "Gregor Mendel"], "Linnaeus devised the binomial naming system."),
          f("Which is the largest taxonomic category listed here?", "Kingdom", ["Phylum", "Class", "Order"], "Kingdom is the broadest of these ranks."),
          f("The scientific name of the human being is:", "Homo sapiens", ["Homo erectus", "Pan troglodytes", "Homo habilis"], "Modern humans are Homo sapiens."),
          f("Which kingdom includes mushrooms?", "Fungi", ["Plantae", "Animalia", "Protista"], "Mushrooms belong to kingdom Fungi."),
          f("Which of these is a vertebrate class?", "Reptilia", ["Insecta", "Arachnida", "Crustacea"], "Reptilia is a vertebrate class; the others are invertebrate groups."),
        ],
      },
      {
        slug: "entomology",
        facts: [
          f("Which insect transmits malaria?", "Anopheles mosquito", ["Housefly", "Cockroach", "Butterfly"], "Female Anopheles mosquitoes transmit malaria."),
          f("Which insect produces honey?", "Honey bee", ["Wasp", "Ant", "Termite"], "Honey bees produce honey from nectar."),
          f("The study of insects is called:", "Entomology", ["Ornithology", "Ichthyology", "Herpetology"], "Entomology is the study of insects."),
          f("Which insect is a social insect living in colonies?", "Termite", ["Butterfly", "Moth", "Dragonfly"], "Termites live in organised colonies."),
          f("How many pairs of wings does a butterfly have?", "2", ["1", "3", "4"], "Butterflies have two pairs (four wings)."),
          f("Silk is obtained from:", "Silkworm", ["Honey bee", "Lac insect", "Spider"], "Silk is produced by the silkworm larva."),
        ],
      },
      {
        slug: "wildlife",
        facts: [
          f("Which is the national animal of Pakistan?", "Markhor", ["Lion", "Tiger", "Deer"], "The Markhor is Pakistan's national animal."),
          f("Which endangered species is protected in Pakistan's national parks?", "Snow leopard", ["Camel", "Goat", "Sheep"], "The snow leopard is a protected endangered species."),
          f("Which organisation works for global wildlife conservation?", "WWF", ["WHO", "IMF", "UNESCO"], "WWF works to conserve wildlife and habitats."),
          f("The Chitral Gol National Park is known for:", "Markhor", ["Tiger", "Elephant", "Rhino"], "Chitral Gol is famous for its Markhor population."),
          f("Which is a protected marine mammal found along Pakistan's coast?", "Indus dolphin", ["Blue whale", "Walrus", "Seal"], "The Indus (river) dolphin is a protected species."),
          f("Which of these is a wildlife sanctuary concern?", "Poaching", ["Recycling", "Farming", "Mining"], "Poaching is an illegal threat to wildlife."),
        ],
      },
    ],
  },

  {
    slug: "botany",
    topics: [
      {
        slug: "plant-taxonomy",
        facts: [
          f("Plants that bear seeds within fruits are called:", "Angiosperms", ["Gymnosperms", "Pteridophytes", "Bryophytes"], "Angiosperms are flowering plants with enclosed seeds."),
          f("Which group has seeds but no enclosed fruit?", "Gymnosperms", ["Angiosperms", "Algae", "Fungi"], "Gymnosperms have naked seeds, e.g. pines."),
          f("The scientific study of plants is:", "Botany", ["Zoology", "Ecology", "Mycology"], "Botany is the study of plants."),
          f("Which of these is a non-vascular plant?", "Moss", ["Fern", "Pine", "Rose"], "Mosses are bryophytes and lack vascular tissue."),
          f("Which plant group includes ferns?", "Pteridophytes", ["Bryophytes", "Gymnosperms", "Angiosperms"], "Ferns are pteridophytes (vascular, seedless)."),
          f("Which of these is a monocot?", "Wheat", ["Mango", "Rose", "Sunflower"], "Wheat is a monocot with parallel leaf venation."),
        ],
      },
      {
        slug: "plant-physiology",
        facts: [
          f("Which process produces oxygen in plants?", "Photosynthesis", ["Respiration", "Transpiration", "Digestion"], "Photosynthesis releases oxygen."),
          f("Which pigment is essential for photosynthesis?", "Chlorophyll", ["Carotene", "Xanthophyll", "Anthocyanin"], "Chlorophyll absorbs light for photosynthesis."),
          f("Which factor does NOT directly limit the rate of photosynthesis?", "Soil colour", ["Light intensity", "CO₂ concentration", "Temperature"], "Soil colour is not a limiting factor."),
          f("Water moves up a plant mainly through:", "Xylem", ["Phloem", "Cortex", "Pith"], "Xylem transports water upward."),
          f("Stomata are mainly found on the:", "Leaves", ["Roots", "Stem", "Flowers"], "Stomata for gas exchange are chiefly on leaves."),
          f("Which hormone promotes cell elongation in plants?", "Auxin", ["Insulin", "Thyroxine", "Adrenaline"], "Auxins promote growth by cell elongation."),
        ],
      },
      {
        slug: "plant-anatomy",
        facts: [
          f("The outermost layer of a plant cell is the:", "Cell wall", ["Cell membrane", "Cytoplasm", "Nucleus"], "Plant cells have a rigid cellulose cell wall."),
          f("Which tissue forms the outer covering of a leaf?", "Epidermis", ["Xylem", "Phloem", "Cambium"], "The epidermis is the protective outer layer."),
          f("Which plant tissue is responsible for growth in thickness?", "Cambium", ["Epidermis", "Pith", "Cortex"], "The cambium is a lateral meristem."),
          f("The root hair is an extension of which cell?", "Epidermal cell", ["Xylem cell", "Phloem cell", "Cortex cell"], "Root hairs are extensions of epidermal cells."),
          f("Which structure stores food in a seed?", "Endosperm", ["Radicle", "Plumule", "Testa"], "The endosperm provides nutrients to the embryo."),
          f("The green, flat part of a leaf is the:", "Lamina", ["Petiole", "Stipule", "Midrib"], "The lamina (blade) is the flat, photosynthetic part."),
        ],
      },
      {
        slug: "plant-pathology",
        facts: [
          f("Which organism causes late blight of potato?", "Fungus", ["Virus", "Bacterium", "Alga"], "Late blight is caused by the fungus-like Phytophthora."),
          f("Rust disease of wheat is caused by a:", "Fungus", ["Virus", "Bacterium", "Protozoan"], "Wheat rust is a fungal disease."),
          f("Which disease affects tobacco?", "Tobacco mosaic", ["Late blight", "Rust", "Smut"], "Tobacco mosaic is a viral disease."),
          f("Which of these is a plant virus disease?", "Mosaic disease", ["Smut", "Rust", "Blight"], "Mosaic diseases are typically viral."),
          f("Which pest commonly attacks stored grain?", "Weevil", ["Aphid", "Locust", "Whitefly"], "Weevils damage stored grain."),
          f("Integrated pest management aims to:", "Reduce pesticide use", ["Increase pesticide use", "Remove all crops", "Stop irrigation"], "IPM combines methods to minimise chemical use."),
        ],
      },
      {
        slug: "ethnobotany",
        facts: [
          f("The study of how people use plants is called:", "Ethnobotany", ["Ethnography", "Botany", "Taxonomy"], "Ethnobotany studies traditional plant use."),
          f("Which plant is a source of the drug quinine?", "Cinchona", ["Neem", "Aloe", "Tulsi"], "Quinine is obtained from Cinchona bark."),
          f("Aloe vera is chiefly used for:", "Skin care", ["Fuel", "Timber", "Dye"], "Aloe vera gel is used in skin care."),
          f("Which plant is a natural insecticide?", "Neem", ["Rose", "Wheat", "Lotus"], "Neem has natural insecticidal properties."),
          f("Which plant yields cotton fibre?", "Cotton plant", ["Jute", "Flax", "Hemp"], "Cotton fibre comes from the cotton plant's seed hairs."),
          f("Turmeric is obtained from which part of the plant?", "Rhizome", ["Leaf", "Flower", "Fruit"], "Turmeric is a rhizome."),
        ],
      },
    ],
  },

  {
    slug: "statistics",
    topics: [
      {
        slug: "descriptive-statistics",
        facts: [
          f("The most frequently occurring value in a data set is the:", "Mode", ["Mean", "Median", "Range"], "The mode is the most frequent value."),
          f("The middle value of an ordered data set is the:", "Median", ["Mean", "Mode", "Variance"], "The median divides ordered data into two halves."),
          f("The sum of all values divided by their number is the:", "Mean", ["Median", "Mode", "Range"], "The arithmetic mean is the average."),
          f("The difference between the largest and smallest values is the:", "Range", ["Variance", "Mean", "Mode"], "Range = maximum − minimum."),
          f("Which measure of central tendency is most affected by extreme values?", "Mean", ["Median", "Mode", "Range"], "The mean is sensitive to outliers."),
          f("The square root of the variance is the:", "Standard deviation", ["Mean", "Median", "Mode"], "Standard deviation is √variance."),
        ],
      },
      {
        slug: "probability-distributions",
        facts: [
          f("A normal distribution is:", "Bell-shaped and symmetric", ["Skewed right", "Skewed left", "Uniform"], "The normal curve is symmetric and bell-shaped."),
          f("The total probability of all outcomes in a distribution equals:", "1", ["0", "0.5", "100"], "Probabilities sum to 1."),
          f("Which distribution models the number of successes in a fixed number of trials?", "Binomial", ["Normal", "Poisson", "Exponential"], "The binomial distribution counts successes in n trials."),
          f("Which distribution models rare events over an interval?", "Poisson", ["Binomial", "Normal", "Uniform"], "The Poisson distribution models rare events."),
          f("In a normal distribution, about what percentage lies within one standard deviation of the mean?", "68%", ["50%", "95%", "99%"], "About 68% lies within ±1 SD."),
          f("A fair coin tossed once has what probability of heads?", "0.5", ["0.25", "0.75", "1"], "A fair coin gives P(heads) = 1/2."),
        ],
      },
      {
        slug: "inferential-statistics",
        facts: [
          f("A hypothesis that states no effect or difference is the:", "Null hypothesis", ["Alternative hypothesis", "Research hypothesis", "Directional hypothesis"], "The null hypothesis asserts no effect."),
          f("The probability of rejecting a true null hypothesis is the:", "Type I error", ["Type II error", "Power", "Confidence"], "A Type I error is a false positive."),
          f("Failing to reject a false null hypothesis is a:", "Type II error", ["Type I error", "Power", "Significance"], "A Type II error is a false negative."),
          f("A 95% confidence interval means:", "95% of such intervals contain the parameter", ["95% of data lies inside", "The mean is certain", "The sample is biased"], "Confidence intervals capture the true parameter with given probability."),
          f("A t-test is used to compare:", "Means", ["Variances only", "Proportions only", "Correlations"], "The t-test compares means."),
          f("The level of significance is usually denoted by:", "α (alpha)", ["β (beta)", "μ (mu)", "σ (sigma)"], "Alpha denotes the significance level."),
        ],
      },
      {
        slug: "correlation-regression",
        facts: [
          f("Correlation measures the relationship between:", "Two variables", ["One variable", "Three variables", "Populations"], "Correlation measures association between two variables."),
          f("A correlation coefficient of +1 indicates:", "Perfect positive correlation", ["No correlation", "Perfect negative correlation", "Weak correlation"], "r = +1 is perfect positive correlation."),
          f("A correlation coefficient of 0 indicates:", "No linear correlation", ["Perfect correlation", "Negative correlation", "Strong correlation"], "r = 0 means no linear relationship."),
          f("In regression, the variable being predicted is the:", "Dependent variable", ["Independent variable", "Control variable", "Constant"], "The dependent variable is predicted."),
          f("The line of best fit in simple linear regression is:", "y = a + bx", ["y = ab", "y = a − b/x", "y = b/x"], "Simple linear regression uses y = a + bx."),
          f("Correlation does not imply:", "Causation", ["Association", "Relationship", "Direction"], "Correlation does not prove causation."),
        ],
      },
      {
        slug: "sampling",
        facts: [
          f("Choosing every nth individual from a list is:", "Systematic sampling", ["Random sampling", "Stratified sampling", "Cluster sampling"], "Systematic sampling picks every nth unit."),
          f("Dividing a population into groups and sampling each is:", "Stratified sampling", ["Cluster sampling", "Systematic sampling", "Convenience sampling"], "Stratified sampling samples within strata."),
          f("A sample that is easy to obtain is a:", "Convenience sample", ["Random sample", "Stratified sample", "Systematic sample"], "Convenience sampling uses readily available subjects."),
          f("The list of all individuals in a population is the:", "Sampling frame", ["Sample", "Census", "Parameter"], "A sampling frame lists the population."),
          f("Sampling error decreases as the sample size:", "Increases", ["Decreases", "Stays constant", "Doubles only"], "Larger samples reduce sampling error."),
          f("A complete count of every member of a population is a:", "Census", ["Sample", "Survey", "Poll"], "A census counts every member."),
        ],
      },
    ],
  },

  {
    slug: "information-technology",
    topics: [
      {
        slug: "it-fundamentals",
        facts: [
          f("ICT stands for:", "Information and Communication Technology", ["Internet and Computer Technology", "Integrated Computer Technology", "Information Control Technology"], "ICT is Information and Communication Technology."),
          f("Which unit is the smallest in digital storage?", "Bit", ["Byte", "Kilobyte", "Megabyte"], "A bit is the smallest unit of data."),
          f("1 kilobyte equals how many bytes?", "1024", ["1000", "512", "2048"], "1 KB = 1024 bytes in binary."),
          f("Which of these is system software?", "Operating system", ["Word processor", "Spreadsheet", "Web browser"], "An operating system is system software."),
          f("Which is an input device?", "Scanner", ["Monitor", "Printer", "Speaker"], "A scanner inputs data into the computer."),
          f("RAM is a:", "Volatile memory", ["Permanent storage", "Output device", "Processor"], "RAM loses data when power is off."),
        ],
      },
      {
        slug: "information-systems",
        facts: [
          f("A system that supports management decision-making is:", "Management Information System", ["Operating system", "Compiler", "Spreadsheet"], "MIS supports management decisions."),
          f("The primary purpose of an information system is to:", "Process data into information", ["Store games", "Print documents", "Charge batteries"], "Information systems turn data into useful information."),
          f("A database that links several tables is a:", "Relational database", ["Flat file", "Spreadsheet", "Text file"], "Relational databases link tables by keys."),
          f("Which is an example of unstructured data?", "Video", ["Number", "Date", "Currency"], "Video is unstructured data."),
          f("ERP stands for:", "Enterprise Resource Planning", ["Electronic Resource Program", "Enterprise Report Plan", "Extended Resource Planning"], "ERP is Enterprise Resource Planning."),
          f("A decision support system mainly helps:", "Managers make decisions", ["Store files", "Compile code", "Print reports"], "DSS aids managerial decision-making."),
        ],
      },
      {
        slug: "e-commerce",
        facts: [
          f("Buying and selling goods online is called:", "E-commerce", ["E-learning", "E-governance", "E-banking"], "E-commerce is online trade."),
          f("B2C stands for:", "Business to Consumer", ["Business to Company", "Buyer to Consumer", "Bank to Customer"], "B2C means business-to-consumer."),
          f("Which payment method is common in online shopping?", "Credit card", ["Cash on delivery only", "Cheque", "Money order"], "Credit cards are widely used online."),
          f("A common risk in e-commerce is:", "Fraud", ["Speed", "Convenience", "Automation"], "Online fraud is a key e-commerce risk."),
          f("Which technology secures online transactions?", "SSL/TLS", ["HTML", "FTP", "SMTP"], "SSL/TLS encrypts online transactions."),
          f("An online marketplace example is:", "Daraz", ["MS Word", "Photoshop", "WinRAR"], "Daraz is an e-commerce marketplace."),
        ],
      },
      {
        slug: "multimedia",
        facts: [
          f("Multimedia combines:", "Text, audio, video and graphics", ["Only text", "Only video", "Only audio"], "Multimedia combines several media types."),
          f("Which file format is used for images?", "JPEG", ["MP3", "DOCX", "XLSX"], "JPEG is an image format."),
          f("Which format is used for audio?", "MP3", ["JPEG", "PNG", "DOCX"], "MP3 is an audio format."),
          f("Which format is used for video?", "MP4", ["JPG", "TXT", "CSV"], "MP4 is a common video format."),
          f("The number of pixels per inch is called:", "Resolution", ["Bandwidth", "Frame rate", "Bit depth"], "Resolution is measured in pixels per inch."),
          f("Animation is:", "Simulated movement of images", ["Compression of files", "Encryption of data", "Storage of text"], "Animation simulates movement."),
        ],
      },
      {
        slug: "networking-it",
        facts: [
          f("A network that covers a small area is a:", "LAN", ["WAN", "MAN", "VPN"], "A LAN covers a small area."),
          f("The device that connects networks is a:", "Router", ["Monitor", "Printer", "Keyboard"], "Routers connect networks."),
          f("IP stands for:", "Internet Protocol", ["Internal Program", "Input Port", "Integrated Processor"], "IP is Internet Protocol."),
          f("Which is a valid IP address?", "192.168.0.1", ["999.1.1.1", "abc.def.ghi.jkl", "12.34.56"], "192.168.0.1 is a valid IPv4 address."),
          f("HTTP is used for:", "Web browsing", ["Email", "File transfer", "Printing"], "HTTP transfers web pages."),
          f("A firewall is used to:", "Filter network traffic", ["Speed up CPU", "Store files", "Print documents"], "Firewalls filter network traffic for security."),
        ],
      },
    ],
  },

  {
    slug: "software-engineering",
    topics: [
      {
        slug: "software-process",
        facts: [
          f("Which model follows a linear, sequential phase order?", "Waterfall", ["Agile", "Spiral", "DevOps"], "Waterfall is a linear sequential model."),
          f("Agile development emphasises:", "Iterative delivery", ["Big upfront design", "Single release", "No testing"], "Agile emphasises iterative, incremental delivery."),
          f("Which is a software process model?", "Spiral", ["Binary", "Hexadecimal", "Boolean"], "Spiral is a process model."),
          f("DevOps combines:", "Development and operations", ["Design and testing only", "Sales and marketing", "Hardware and firmware"], "DevOps integrates development and operations."),
          f("A sprint is associated with:", "Scrum", ["Waterfall", "V-model", "Big bang"], "Sprints are Scrum iterations."),
          f("Continuous integration means:", "Frequently merging and testing code", ["Writing code once", "Avoiding testing", "Manual release only"], "CI merges and tests code frequently."),
        ],
      },
      {
        slug: "software-design",
        facts: [
          f("A blueprint of system structure is a:", "Design", ["Requirement", "Test case", "Bug"], "Design describes system structure."),
          f("UML stands for:", "Unified Modeling Language", ["Universal Machine Language", "Unified Machine Logic", "User Model Language"], "UML is the Unified Modeling Language."),
          f("Which diagram shows class relationships?", "Class diagram", ["Use case diagram", "Activity diagram", "Deployment diagram"], "Class diagrams show class relationships."),
          f("Coupling should be:", "Low", ["High", "Maximum", "Irrelevant"], "Low coupling improves maintainability."),
          f("Cohesion should be:", "High", ["Low", "Zero", "Negative"], "High cohesion means focused modules."),
          f("A design pattern that ensures a single instance is:", "Singleton", ["Observer", "Factory", "Adapter"], "The singleton pattern ensures one instance."),
        ],
      },
      {
        slug: "software-testing",
        facts: [
          f("Testing individual units of code is:", "Unit testing", ["Integration testing", "System testing", "Acceptance testing"], "Unit testing tests individual units."),
          f("Testing combined modules is:", "Integration testing", ["Unit testing", "Regression testing", "Beta testing"], "Integration testing tests combined modules."),
          f("Testing by end users before release is:", "Acceptance testing", ["Unit testing", "White-box testing", "Load testing"], "Acceptance testing is done by users."),
          f("Testing that verifies no new bugs are introduced is:", "Regression testing", ["Unit testing", "Smoke testing", "Alpha testing"], "Regression testing checks for new defects."),
          f("A bug is also called a:", "Defect", ["Feature", "Requirement", "Module"], "A bug is a defect."),
          f("Black-box testing focuses on:", "Inputs and outputs", ["Internal code", "Memory usage", "Compiler flags"], "Black-box testing ignores internal structure."),
        ],
      },
      {
        slug: "software-project-management",
        facts: [
          f("A Gantt chart shows:", "Project schedule", ["Code coverage", "Memory usage", "Network topology"], "Gantt charts show schedules."),
          f("Estimating effort in person-months is part of:", "Project planning", ["Testing", "Debugging", "Deployment"], "Effort estimation is part of planning."),
          f("A risk in software projects is:", "Scope creep", ["Code reuse", "Version control", "Unit testing"], "Scope creep is uncontrolled change."),
          f("The critical path is the:", "Longest sequence of dependent tasks", ["Shortest task", "Cheapest task", "Optional task"], "The critical path determines project duration."),
          f("A deliverable is a:", "Tangible project output", ["Risk", "Assumption", "Constraint"], "Deliverables are tangible outputs."),
          f("Version control helps manage:", "Code changes", ["Hardware", "Network cables", "Printers"], "Version control tracks code changes."),
        ],
      },
      {
        slug: "requirements-engineering",
        facts: [
          f("Gathering what the user needs is:", "Requirements elicitation", ["Testing", "Deployment", "Debugging"], "Requirements elicitation gathers user needs."),
          f("Functional requirements describe:", "What the system does", ["How fast it runs", "Its cost", "Its colour"], "Functional requirements describe behaviour."),
          f("Non-functional requirements describe:", "Quality attributes", ["System functions", "User names", "Data types"], "Non-functional requirements cover quality attributes."),
          f("A use case describes:", "Interaction between user and system", ["Database schema", "Code structure", "Network layout"], "Use cases describe user-system interaction."),
          f("An ambiguous requirement is:", "Undesirable", ["Ideal", "Mandatory", "Always testable"], "Ambiguity harms requirement quality."),
          f("A requirements specification should be:", "Clear and testable", ["Vague", "Secret", "Temporary"], "Requirements must be clear and testable."),
        ],
      },
    ],
  },

  {
    slug: "environmental-science",
    topics: [
      {
        slug: "pollution",
        facts: [
          f("Which gas is a major cause of acid rain?", "Sulphur dioxide", ["Oxygen", "Nitrogen", "Helium"], "SO₂ forms acid rain."),
          f("Which pollutant depletes the ozone layer?", "Chlorofluorocarbons", ["Carbon dioxide", "Oxygen", "Water vapour"], "CFCs deplete stratospheric ozone."),
          f("The main source of air pollution in cities is:", "Vehicle emissions", ["Trees", "Rain", "Wind"], "Vehicles are a major urban pollution source."),
          f("Water pollution is commonly measured by:", "Biochemical oxygen demand", ["Temperature only", "Colour only", "Depth"], "BOD indicates organic water pollution."),
          f("Which of these is a biodegradable pollutant?", "Sewage", ["Plastic", "Glass", "Heavy metals"], "Sewage is biodegradable."),
          f("Noise pollution is measured in:", "Decibels", ["Litres", "Metres", "Watts"], "Noise is measured in decibels."),
        ],
      },
      {
        slug: "climate-change",
        facts: [
          f("The main greenhouse gas from burning fossil fuels is:", "Carbon dioxide", ["Oxygen", "Nitrogen", "Argon"], "CO₂ is the chief greenhouse gas from fossil fuels."),
          f("Global warming refers to:", "Rise in average global temperature", ["Fall in sea level", "Increase in rainfall only", "Cooling of oceans"], "Global warming is rising average temperature."),
          f("Which international agreement addresses climate change?", "Paris Agreement", ["Kyoto Protocol only", "Geneva Convention", "Helsinki Accord"], "The Paris Agreement addresses climate change."),
          f("Rising sea levels are mainly caused by:", "Melting ice and thermal expansion", ["Volcanic eruptions", "Earthquakes", "Wind"], "Ice melt and thermal expansion raise sea levels."),
          f("Which energy source is renewable?", "Solar", ["Coal", "Oil", "Natural gas"], "Solar energy is renewable."),
          f("Deforestation contributes to climate change by:", "Reducing carbon absorption", ["Increasing oxygen", "Cooling the Earth", "Raising rainfall"], "Fewer trees means less CO₂ absorption."),
        ],
      },
      {
        slug: "conservation",
        facts: [
          f("Protecting natural resources for the future is called:", "Conservation", ["Pollution", "Extraction", "Urbanisation"], "Conservation protects resources."),
          f("Which practice conserves water?", "Rainwater harvesting", ["Leaving taps open", "Flooding fields", "Dumping waste"], "Rainwater harvesting conserves water."),
          f("Recycling helps to:", "Reduce waste", ["Increase waste", "Deplete resources", "Pollute water"], "Recycling reduces waste."),
          f("Which is a renewable resource?", "Wind", ["Coal", "Petroleum", "Natural gas"], "Wind is renewable."),
          f("National parks are established to:", "Protect wildlife", ["Increase pollution", "Build factories", "Expand cities"], "National parks protect wildlife."),
          f("Sustainable development meets needs:", "Without compromising future generations", ["By exhausting resources", "By ignoring the environment", "By halting growth"], "Sustainability considers future generations."),
        ],
      },
      {
        slug: "ecosystems",
        facts: [
          f("The non-living components of an ecosystem are:", "Abiotic factors", ["Biotic factors", "Producers", "Consumers"], "Abiotic factors are non-living."),
          f("An example of a biotic factor is:", "Predator", ["Temperature", "Rainfall", "Soil"], "Predators are living (biotic) factors."),
          f("Which biome has the highest biodiversity?", "Tropical rainforest", ["Desert", "Tundra", "Grassland"], "Tropical rainforests are the most biodiverse."),
          f("A food web is made of:", "Interconnected food chains", ["Single food chains", "Producers only", "Consumers only"], "Food webs interconnect food chains."),
          f("Energy in an ecosystem ultimately comes from:", "The Sun", ["Soil", "Water", "Air"], "The Sun is the primary energy source."),
          f("Which cycle involves nitrogen fixation?", "Nitrogen cycle", ["Water cycle", "Carbon cycle", "Oxygen cycle"], "Nitrogen fixation is part of the nitrogen cycle."),
        ],
      },
      {
        slug: "environmental-health",
        facts: [
          f("Which disease is linked to air pollution?", "Asthma", ["Scurvy", "Rickets", "Malaria"], "Air pollution aggravates asthma."),
          f("Safe drinking water is essential to prevent:", "Cholera", ["Diabetes", "Asthma", "Arthritis"], "Contaminated water spreads cholera."),
          f("Which heavy metal poisoning causes Minamata disease?", "Mercury", ["Iron", "Calcium", "Zinc"], "Mercury poisoning causes Minamata disease."),
          f("Which is a health effect of noise pollution?", "Hearing loss", ["Improved vision", "Better sleep", "Stronger bones"], "Noise pollution can cause hearing loss."),
          f("Proper waste disposal prevents:", "Disease spread", ["Plant growth", "Rainfall", "Sunlight"], "Waste disposal prevents disease."),
          f("Which practice improves indoor air quality?", "Ventilation", ["Sealing all windows", "Burning coal indoors", "Using lead paint"], "Ventilation improves indoor air quality."),
        ],
      },
    ],
  },

  {
    slug: "agriculture",
    topics: [
      {
        slug: "agronomy",
        facts: [
          f("The science of crop production is:", "Agronomy", ["Horticulture", "Sericulture", "Apiculture"], "Agronomy studies crop production."),
          f("Which crop is the staple food of Pakistan?", "Wheat", ["Rice", "Maize", "Barley"], "Wheat is Pakistan's staple crop."),
          f("Which is a Kharif crop?", "Rice", ["Wheat", "Barley", "Mustard"], "Rice is a Kharif (summer) crop."),
          f("Which is a Rabi crop?", "Wheat", ["Rice", "Cotton", "Maize"], "Wheat is a Rabi (winter) crop."),
          f("Green revolution refers to:", "Increased agricultural productivity", ["Deforestation", "Urbanisation", "Industrialisation"], "The green revolution raised farm productivity."),
          f("Which practice improves soil fertility?", "Crop rotation", ["Monocropping", "Deforestation", "Overgrazing"], "Crop rotation maintains soil fertility."),
        ],
      },
      {
        slug: "soil-science",
        facts: [
          f("Which soil type is best for agriculture?", "Loamy soil", ["Sandy soil", "Clay soil", "Rocky soil"], "Loamy soil is ideal for crops."),
          f("The pH of neutral soil is:", "7", ["3", "5", "9"], "Neutral soil has pH 7."),
          f("Which nutrient is most important for leaf growth?", "Nitrogen", ["Iron", "Calcium", "Zinc"], "Nitrogen promotes leafy growth."),
          f("Which nutrient promotes root development?", "Phosphorus", ["Nitrogen", "Potassium", "Sulphur"], "Phosphorus supports roots."),
          f("Erosion is the:", "Loss of topsoil", ["Build-up of soil", "Addition of fertiliser", "Watering of crops"], "Erosion removes topsoil."),
          f("Which practice prevents soil erosion?", "Contour ploughing", ["Deforestation", "Overgrazing", "Monocropping"], "Contour ploughing reduces erosion."),
        ],
      },
      {
        slug: "horticulture",
        facts: [
          f("The cultivation of fruits and vegetables is:", "Horticulture", ["Agronomy", "Apiculture", "Sericulture"], "Horticulture deals with fruits and vegetables."),
          f("Which fruit is Pakistan a leading producer of?", "Mango", ["Apple", "Banana", "Grapes"], "Pakistan is a major mango producer."),
          f("Grafting is a method of:", "Vegetative propagation", ["Seed sowing", "Irrigation", "Harvesting"], "Grafting propagates plants vegetatively."),
          f("Which is a citrus fruit?", "Orange", ["Mango", "Apple", "Guava"], "Orange is a citrus fruit."),
          f("Pruning is done to:", "Improve growth and yield", ["Kill the plant", "Reduce water", "Add fertiliser"], "Pruning improves growth and yield."),
          f("Which vegetable is a root vegetable?", "Carrot", ["Spinach", "Tomato", "Cabbage"], "Carrot is a root vegetable."),
        ],
      },
      {
        slug: "plant-protection",
        facts: [
          f("Pesticides are used to:", "Control pests", ["Increase soil pH", "Water crops", "Harvest grain"], "Pesticides control pests."),
          f("Which pest damages cotton?", "Bollworm", ["Aphid only", "Locust only", "Weevil only"], "Bollworm damages cotton."),
          f("Biological control uses:", "Natural enemies of pests", ["Chemicals only", "Machinery", "Irrigation"], "Biological control uses natural predators."),
          f("Weeds compete with crops for:", "Nutrients and water", ["Oxygen only", "Sunlight only", "Space only"], "Weeds compete for nutrients, water and light."),
          f("Which is a fungal disease of wheat?", "Rust", ["Mosaic", "Blight", "Canker"], "Rust is a fungal wheat disease."),
          f("Integrated pest management reduces:", "Chemical pesticide use", ["Crop yield", "Soil quality", "Water supply"], "IPM reduces chemical use."),
        ],
      },
      {
        slug: "livestock",
        facts: [
          f("Which animal is the main source of milk in Pakistan?", "Buffalo", ["Goat", "Camel", "Sheep"], "Buffalo is the main dairy animal in Pakistan."),
          f("Which breed is a famous cattle breed of Pakistan?", "Sahiwal", ["Holstein", "Jersey", "Angus"], "Sahiwal is a famous Pakistani cattle breed."),
          f("Foot and mouth disease affects:", "Cattle", ["Wheat", "Cotton", "Fish"], "Foot and mouth disease affects cattle."),
          f("Poultry farming produces:", "Eggs and meat", ["Milk", "Wool", "Honey"], "Poultry produces eggs and meat."),
          f("Which animal yields wool?", "Sheep", ["Cow", "Buffalo", "Goat only"], "Sheep yield wool."),
          f("Vaccination of livestock helps prevent:", "Disease", ["Growth", "Reproduction", "Feeding"], "Vaccination prevents disease."),
        ],
      },
      {
        slug: "irrigation",
        facts: [
          f("Which is the largest irrigation system in Pakistan?", "Indus Basin Irrigation System", ["Thar Canal", "Kabul Canal", "Ravi Canal"], "The Indus Basin Irrigation System is the largest."),
          f("Which method conserves the most water?", "Drip irrigation", ["Flood irrigation", "Furrow irrigation", "Basin irrigation"], "Drip irrigation is the most water-efficient."),
          f("The barter system of irrigation refers to:", "Water sharing", ["Seed sharing", "Crop sharing", "Labour sharing"], "Barter relates to water sharing."),
          f("Which dam is a major source of irrigation water?", "Tarbela", ["Mangla only", "Warsak only", "Rawal only"], "Tarbela is a major irrigation source."),
          f("Waterlogging reduces crop yield by:", "Restricting root respiration", ["Adding nutrients", "Cooling soil", "Increasing oxygen"], "Waterlogging starves roots of oxygen."),
          f("Which crop requires the most water?", "Rice", ["Wheat", "Barley", "Gram"], "Rice is the most water-intensive crop."),
        ],
      },
    ],
  },

  {
    slug: "geology",
    topics: [
      {
        slug: "mineralogy",
        facts: [
          f("The hardest natural mineral is:", "Diamond", ["Quartz", "Feldspar", "Calcite"], "Diamond has the highest Mohs hardness (10)."),
          f("Mohs scale measures:", "Mineral hardness", ["Mineral colour", "Mineral weight", "Mineral age"], "Mohs scale measures hardness."),
          f("Which mineral is the main component of sand?", "Quartz", ["Mica", "Gypsum", "Talc"], "Quartz is the main component of sand."),
          f("Which is a precious metal?", "Gold", ["Iron", "Copper", "Lead"], "Gold is a precious metal."),
          f("Rock salt is chemically:", "Sodium chloride", ["Calcium carbonate", "Silica", "Iron oxide"], "Rock salt is NaCl."),
          f("Which mineral is used to make plaster of Paris?", "Gypsum", ["Quartz", "Mica", "Talc"], "Gypsum yields plaster of Paris."),
        ],
      },
      {
        slug: "petrology",
        facts: [
          f("Igneous rocks form from:", "Cooling magma or lava", ["Compaction of sediment", "Heat and pressure", "Evaporation"], "Igneous rocks solidify from magma or lava."),
          f("Sedimentary rocks form by:", "Deposition and compaction", ["Cooling magma", "Melting", "Volcanic eruption"], "Sedimentary rocks form from deposited sediments."),
          f("Metamorphic rocks form by:", "Heat and pressure", ["Cooling lava", "Deposition", "Evaporation"], "Metamorphic rocks change under heat and pressure."),
          f("Which is an example of igneous rock?", "Granite", ["Limestone", "Marble", "Sandstone"], "Granite is igneous."),
          f("Which is a sedimentary rock?", "Limestone", ["Granite", "Basalt", "Marble"], "Limestone is sedimentary."),
          f("Which is a metamorphic rock?", "Marble", ["Granite", "Sandstone", "Basalt"], "Marble is metamorphosed limestone."),
        ],
      },
      {
        slug: "structural-geology",
        facts: [
          f("A fracture in rock along which movement occurs is a:", "Fault", ["Fold", "Joint", "Vein"], "Faults are fractures with movement."),
          f("A bend in rock strata is a:", "Fold", ["Fault", "Joint", "Vein"], "Folds are bends in rock layers."),
          f("The point on the Earth's surface above an earthquake focus is the:", "Epicentre", ["Focus", "Fault", "Core"], "The epicentre is directly above the focus."),
          f("Which instrument records earthquakes?", "Seismograph", ["Barometer", "Thermometer", "Anemometer"], "Seismographs record earthquakes."),
          f("The Richter scale measures:", "Earthquake magnitude", ["Wind speed", "Rainfall", "Temperature"], "The Richter scale measures magnitude."),
          f("Which plate boundary creates mountains?", "Convergent", ["Divergent", "Transform", "Passive"], "Convergent boundaries build mountains."),
        ],
      },
      {
        slug: "palaeontology",
        facts: [
          f("The study of fossils is:", "Palaeontology", ["Geology", "Mineralogy", "Petrology"], "Palaeontology studies fossils."),
          f("Fossils are mainly found in:", "Sedimentary rocks", ["Igneous rocks", "Metamorphic rocks", "Volcanic rocks"], "Fossils occur in sedimentary rocks."),
          f("Which era is known as the age of dinosaurs?", "Mesozoic", ["Palaeozoic", "Cenozoic", "Precambrian"], "Dinosaurs dominated the Mesozoic era."),
          f("Which is the largest era of geological time?", "Precambrian", ["Palaeozoic", "Mesozoic", "Cenozoic"], "Precambrian covers most of Earth's history."),
          f("The age of the Earth is about:", "4.6 billion years", ["4.6 million years", "46 billion years", "460 million years"], "Earth is about 4.6 billion years old."),
          f("Which fossil group is used to date rocks?", "Index fossils", ["Trace fossils", "Body fossils", "Mould fossils"], "Index fossils help date rock layers."),
        ],
      },
    ],
  },

  {
    slug: "anatomy",
    topics: [
      {
        slug: "general-anatomy",
        facts: [
          f("The study of body structure is:", "Anatomy", ["Physiology", "Histology", "Pathology"], "Anatomy studies body structure."),
          f("The anatomical position has the body:", "Standing upright, facing forward", ["Lying down", "Bent forward", "Sitting"], "Anatomical position is upright and forward-facing."),
          f("The plane dividing the body into left and right is:", "Sagittal", ["Coronal", "Transverse", "Oblique"], "The sagittal plane divides left and right."),
          f("Which cavity contains the heart?", "Thoracic", ["Abdominal", "Pelvic", "Cranial"], "The heart lies in the thoracic cavity."),
          f("The term 'proximal' means:", "Closer to the trunk", ["Farther from the trunk", "Toward the back", "Toward the front"], "Proximal means nearer the trunk."),
          f("The term 'distal' means:", "Farther from the trunk", ["Closer to the trunk", "Toward the head", "Toward the feet"], "Distal means farther from the trunk."),
        ],
      },
      {
        slug: "osteology",
        facts: [
          f("How many bones are in the adult human body?", "206", ["186", "226", "246"], "Adults have 206 bones."),
          f("The longest bone in the body is the:", "Femur", ["Tibia", "Humerus", "Fibula"], "The femur is the longest bone."),
          f("The skull bones are joined by:", "Sutures", ["Ligaments", "Tendons", "Cartilage"], "Skull bones are joined by sutures."),
          f("Which bone protects the brain?", "Cranium", ["Sternum", "Pelvis", "Femur"], "The cranium protects the brain."),
          f("The backbone is made of:", "Vertebrae", ["Ribs", "Sternum", "Clavicles"], "The vertebral column is made of vertebrae."),
          f("The knee joint is a:", "Hinge joint", ["Ball-and-socket joint", "Pivot joint", "Saddle joint"], "The knee is a hinge joint."),
        ],
      },
      {
        slug: "neuroanatomy",
        facts: [
          f("The basic functional unit of the nervous system is the:", "Neuron", ["Nephron", "Alveolus", "Villus"], "Neurons are nerve cells."),
          f("The largest part of the brain is the:", "Cerebrum", ["Cerebellum", "Medulla", "Pons"], "The cerebrum is the largest brain part."),
          f("The cerebellum controls:", "Balance and coordination", ["Vision", "Hearing", "Smell"], "The cerebellum controls balance and coordination."),
          f("The spinal cord is part of the:", "Central nervous system", ["Peripheral nervous system", "Autonomic nervous system only", "Somatic nervous system only"], "The spinal cord is in the CNS."),
          f("Which lobe is responsible for vision?", "Occipital", ["Frontal", "Parietal", "Temporal"], "The occipital lobe processes vision."),
          f("The gap between two neurons is the:", "Synapse", ["Node", "Axon", "Dendrite"], "The synapse is the neuron junction."),
        ],
      },
      {
        slug: "regional-anatomy",
        facts: [
          f("The thorax contains the:", "Heart and lungs", ["Stomach and liver", "Kidneys", "Brain"], "The thorax contains heart and lungs."),
          f("The abdomen contains the:", "Stomach and liver", ["Heart", "Lungs", "Brain"], "Abdominal organs include stomach and liver."),
          f("Which region contains the urinary bladder?", "Pelvic", ["Thoracic", "Cranial", "Abdominal"], "The bladder lies in the pelvic region."),
          f("The upper limb is attached to the trunk at the:", "Shoulder", ["Hip", "Knee", "Ankle"], "The upper limb attaches at the shoulder."),
          f("The lower limb is attached at the:", "Hip", ["Shoulder", "Elbow", "Wrist"], "The lower limb attaches at the hip."),
          f("Which cavity contains the brain?", "Cranial", ["Thoracic", "Abdominal", "Pelvic"], "The brain is in the cranial cavity."),
        ],
      },
      {
        slug: "histology",
        facts: [
          f("The study of tissues is:", "Histology", ["Anatomy", "Physiology", "Pathology"], "Histology studies tissues."),
          f("Which tissue covers body surfaces?", "Epithelial tissue", ["Muscle tissue", "Nervous tissue", "Connective tissue"], "Epithelium covers surfaces."),
          f("Which tissue connects and supports organs?", "Connective tissue", ["Epithelial tissue", "Muscle tissue", "Nervous tissue"], "Connective tissue supports organs."),
          f("Which tissue enables movement?", "Muscle tissue", ["Epithelial tissue", "Nervous tissue", "Connective tissue"], "Muscle tissue produces movement."),
          f("Which tissue transmits impulses?", "Nervous tissue", ["Muscle tissue", "Epithelial tissue", "Connective tissue"], "Nervous tissue transmits impulses."),
          f("Blood is a type of:", "Connective tissue", ["Epithelial tissue", "Muscle tissue", "Nervous tissue"], "Blood is a fluid connective tissue."),
        ],
      },
    ],
  },

  {
    slug: "physiology",
    topics: [
      {
        slug: "general-physiology",
        facts: [
          f("The study of body functions is:", "Physiology", ["Anatomy", "Histology", "Pathology"], "Physiology studies body functions."),
          f("Homeostasis means maintaining a:", "Stable internal environment", ["Changing environment", "Cold body", "Warm body"], "Homeostasis maintains internal stability."),
          f("The normal human body temperature is about:", "37 °C", ["27 °C", "47 °C", "57 °C"], "Normal body temperature is ~37 °C."),
          f("Which fluid makes up most of the body?", "Water", ["Oil", "Blood", "Air"], "Water is the main body fluid."),
          f("The functional unit of the kidney is the:", "Nephron", ["Neuron", "Alveolus", "Villus"], "Nephrons are the kidney's functional units."),
          f("Metabolism refers to:", "Chemical reactions in the body", ["Body movement", "Sleep", "Growth only"], "Metabolism is the sum of body chemistry."),
        ],
      },
      {
        slug: "cardiovascular",
        facts: [
          f("The heart has how many chambers?", "4", ["2", "3", "5"], "The heart has four chambers."),
          f("Which blood vessels carry blood away from the heart?", "Arteries", ["Veins", "Capillaries", "Venules"], "Arteries carry blood away from the heart."),
          f("Which blood vessels have valves to prevent backflow?", "Veins", ["Arteries", "Capillaries", "Arterioles"], "Veins have valves."),
          f("The normal resting heart rate is about:", "60–100 bpm", ["20–40 bpm", "120–160 bpm", "180–200 bpm"], "Resting heart rate is 60–100 bpm."),
          f("Which chamber pumps blood to the body?", "Left ventricle", ["Right ventricle", "Left atrium", "Right atrium"], "The left ventricle pumps to the body."),
          f("The liquid part of blood is:", "Plasma", ["Serum only", "Platelets", "Red cells"], "Plasma is the liquid part of blood."),
        ],
      },
      {
        slug: "respiratory",
        facts: [
          f("Gas exchange in the lungs occurs in the:", "Alveoli", ["Bronchi", "Trachea", "Larynx"], "Alveoli are the gas-exchange surfaces."),
          f("The windpipe is called the:", "Trachea", ["Oesophagus", "Larynx", "Bronchus"], "The trachea is the windpipe."),
          f("Which muscle aids breathing?", "Diaphragm", ["Biceps", "Quadriceps", "Deltoid"], "The diaphragm aids breathing."),
          f("Which gas is exhaled in larger amount?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Helium"], "Exhaled air has more CO₂."),
          f("Normal breathing rate for adults is about:", "12–20 per minute", ["2–5 per minute", "40–60 per minute", "80–100 per minute"], "Adults breathe 12–20 times per minute."),
          f("The voice box is the:", "Larynx", ["Pharynx", "Trachea", "Epiglottis"], "The larynx is the voice box."),
        ],
      },
      {
        slug: "nervous-system",
        facts: [
          f("The nervous system is divided into the CNS and the:", "Peripheral nervous system", ["Endocrine system", "Circulatory system", "Digestive system"], "The PNS complements the CNS."),
          f("Which part controls involuntary functions?", "Autonomic nervous system", ["Somatic nervous system", "Central nervous system", "Skeletal system"], "The autonomic system controls involuntary functions."),
          f("The fight-or-flight response is controlled by the:", "Sympathetic nervous system", ["Parasympathetic nervous system", "Somatic system", "Enteric system"], "The sympathetic system mediates fight-or-flight."),
          f("Which neurotransmitter is associated with reward?", "Dopamine", ["Insulin", "Adrenaline", "Thyroxine"], "Dopamine is linked to reward."),
          f("A reflex action is:", "An automatic response", ["A learned skill", "A thought", "A memory"], "Reflexes are automatic responses."),
          f("Which cells produce myelin in the peripheral nervous system?", "Schwann cells", ["Neurons", "Astrocytes", "Microglia"], "Schwann cells myelinate peripheral nerves."),
        ],
      },
      {
        slug: "endocrine",
        facts: [
          f("The master endocrine gland is the:", "Pituitary", ["Thyroid", "Adrenal", "Pancreas"], "The pituitary controls other glands."),
          f("Which gland secretes insulin?", "Pancreas", ["Liver", "Thyroid", "Adrenal"], "The pancreas secretes insulin."),
          f("Which hormone regulates metabolism?", "Thyroxine", ["Insulin", "Adrenaline", "Cortisol only"], "Thyroxine regulates metabolism."),
          f("Adrenaline is secreted by the:", "Adrenal gland", ["Pituitary", "Thyroid", "Pancreas"], "Adrenaline comes from the adrenal gland."),
          f("Which hormone is the 'fight or flight' hormone?", "Adrenaline", ["Insulin", "Thyroxine", "Oestrogen"], "Adrenaline drives fight-or-flight."),
          f("Diabetes mellitus results from a deficiency of:", "Insulin", ["Thyroxine", "Adrenaline", "Cortisol"], "Diabetes involves insulin deficiency."),
        ],
      },
      {
        slug: "renal",
        facts: [
          f("The kidneys filter:", "Blood", ["Air", "Food", "Bile"], "Kidneys filter blood."),
          f("The functional unit of the kidney is the:", "Nephron", ["Neuron", "Alveolus", "Villus"], "Nephrons filter blood."),
          f("Urine is formed in the:", "Kidney", ["Liver", "Bladder", "Ureter"], "Urine forms in the kidney."),
          f("Which organ stores urine?", "Urinary bladder", ["Kidney", "Ureter", "Urethra"], "The bladder stores urine."),
          f("Which hormone increases water reabsorption?", "ADH", ["Insulin", "Adrenaline", "Thyroxine"], "ADH increases water reabsorption."),
          f("The kidneys help regulate:", "Blood pressure and fluid balance", ["Vision", "Hearing", "Smell"], "Kidneys regulate blood pressure and fluids."),
        ],
      },
    ],
  },

  {
    slug: "pharmacology",
    topics: [
      {
        slug: "general-pharmacology",
        facts: [
          f("The study of drugs and their effects is:", "Pharmacology", ["Pathology", "Anatomy", "Physiology"], "Pharmacology studies drugs."),
          f("A drug's movement through the body is:", "Pharmacokinetics", ["Pharmacodynamics", "Pharmacognosy", "Toxicology"], "Pharmacokinetics covers absorption, distribution, metabolism, excretion."),
          f("A drug's effect on the body is:", "Pharmacodynamics", ["Pharmacokinetics", "Pharmacognosy", "Therapeutics"], "Pharmacodynamics is drug action."),
          f("The fraction of a drug reaching circulation is its:", "Bioavailability", ["Half-life", "Clearance", "Volume of distribution"], "Bioavailability is the fraction reaching circulation."),
          f("The time for half a drug to be eliminated is its:", "Half-life", ["Bioavailability", "Clearance", "Dose"], "Half-life is the elimination half-time."),
          f("An unwanted drug effect is an:", "Adverse effect", ["Indication", "Dose", "Route"], "Adverse effects are unwanted."),
        ],
      },
      {
        slug: "systemic-pharmacology",
        facts: [
          f("Which drug class lowers blood pressure?", "Antihypertensives", ["Antibiotics", "Antifungals", "Antivirals"], "Antihypertensives lower blood pressure."),
          f("Which drug relieves pain?", "Analgesic", ["Antibiotic", "Antiseptic", "Antipyretic only"], "Analgesics relieve pain."),
          f("Which drug reduces fever?", "Antipyretic", ["Analgesic only", "Antibiotic", "Antiseptic"], "Antipyretics reduce fever."),
          f("Which drug class treats asthma?", "Bronchodilators", ["Antibiotics", "Anticoagulants", "Diuretics"], "Bronchodilators treat asthma."),
          f("Which drug increases urine output?", "Diuretic", ["Antibiotic", "Analgesic", "Antacid"], "Diuretics increase urine output."),
          f("Insulin is used to treat:", "Diabetes", ["Asthma", "Malaria", "Tuberculosis"], "Insulin treats diabetes."),
        ],
      },
      {
        slug: "chemotherapy",
        facts: [
          f("Antibiotics are used to treat:", "Bacterial infections", ["Viral infections", "Fungal infections", "All infections"], "Antibiotics treat bacterial infections."),
          f("Which antibiotic was the first discovered?", "Penicillin", ["Streptomycin", "Tetracycline", "Erythromycin"], "Penicillin was the first antibiotic."),
          f("Antiviral drugs are used against:", "Viruses", ["Bacteria", "Fungi", "Parasites"], "Antivirals target viruses."),
          f("Chemotherapy in cancer treatment uses:", "Cytotoxic drugs", ["Vitamins", "Antibiotics", "Vaccines"], "Cancer chemotherapy uses cytotoxic drugs."),
          f("Antifungal drugs treat:", "Fungal infections", ["Bacterial infections", "Viral infections", "Parasitic infections"], "Antifungals treat fungal infections."),
          f("Drug resistance is a concern with:", "Antibiotics", ["Vitamins", "Minerals", "Water"], "Antibiotic resistance is a major concern."),
        ],
      },
      {
        slug: "toxicology",
        facts: [
          f("The study of poisons is:", "Toxicology", ["Pharmacology", "Pathology", "Anatomy"], "Toxicology studies poisons."),
          f("Which is a common toxic substance?", "Lead", ["Water", "Oxygen", "Salt"], "Lead is toxic."),
          f("An antidote is a substance that:", "Neutralises a poison", ["Increases poison", "Has no effect", "Delays absorption only"], "Antidotes neutralise poisons."),
          f("Overdose refers to:", "Excessive drug intake", ["Correct dose", "No dose", "Half dose"], "Overdose is excessive intake."),
          f("Which organ is mainly affected by paracetamol overdose?", "Liver", ["Kidney only", "Heart only", "Lung only"], "Paracetamol overdose harms the liver."),
          f("The lethal dose 50 (LD50) measures:", "Toxicity", ["Efficacy", "Bioavailability", "Half-life"], "LD50 measures acute toxicity."),
        ],
      },
    ],
  },

  {
    slug: "nursing",
    topics: [
      {
        slug: "fundamentals-nursing",
        facts: [
          f("The first step of the nursing process is:", "Assessment", ["Planning", "Implementation", "Evaluation"], "Nursing begins with assessment."),
          f("Normal adult body temperature is about:", "37 °C", ["27 °C", "47 °C", "57 °C"], "Normal temperature is ~37 °C."),
          f("Which position is used for a patient in shock?", "Supine with legs elevated", ["Prone", "Sitting", "Standing"], "Shock is managed with legs elevated."),
          f("Asepsis means:", "Absence of infection-causing microorganisms", ["Presence of bacteria", "Use of medicine", "Physical exercise"], "Asepsis prevents infection."),
          f("The normal pulse rate for an adult is about:", "60–100 bpm", ["20–40 bpm", "120–160 bpm", "180–200 bpm"], "Adult pulse is 60–100 bpm."),
          f("Hand hygiene is important to:", "Prevent infection", ["Increase temperature", "Lower blood pressure", "Increase pulse"], "Hand hygiene prevents infection."),
        ],
      },
      {
        slug: "medical-surgical-nursing",
        facts: [
          f("A wound that is clean and sutured heals by:", "Primary intention", ["Secondary intention", "Tertiary intention", "Delayed intention"], "Clean sutured wounds heal by primary intention."),
          f("Which is a sign of infection?", "Fever", ["Low temperature", "Slow pulse", "Pale skin only"], "Fever indicates infection."),
          f("Post-operative care includes monitoring for:", "Haemorrhage", ["Growth", "Vision", "Hearing"], "Post-op care watches for haemorrhage."),
          f("A nasogastric tube is used for:", "Feeding", ["Breathing", "Urination", "Hearing"], "NG tubes are for feeding."),
          f("Which vital sign measures heart rate?", "Pulse", ["Temperature", "Respiration", "Blood pressure"], "Pulse measures heart rate."),
          f("Sterile technique is essential during:", "Surgery", ["Counselling", "Teaching", "Documentation"], "Surgery requires sterile technique."),
        ],
      },
      {
        slug: "community-health-nursing",
        facts: [
          f("Community health nursing focuses on:", "Population health", ["Individual surgery", "Laboratory work", "Pharmacy"], "Community nursing addresses population health."),
          f("Immunisation helps prevent:", "Infectious diseases", ["Diabetes", "Asthma", "Arthritis"], "Vaccines prevent infectious disease."),
          f("Which is a vector-borne disease?", "Malaria", ["Diabetes", "Anaemia", "Rickets"], "Malaria is vector-borne."),
          f("Health education aims to:", "Promote healthy behaviour", ["Increase disease", "Reduce literacy", "Limit access"], "Health education promotes healthy behaviour."),
          f("Antenatal care is care during:", "Pregnancy", ["Childhood", "Old age", "Surgery"], "Antenatal care is pregnancy care."),
          f("Which is a notifiable disease?", "Tuberculosis", ["Common cold", "Acne", "Dandruff"], "Tuberculosis is notifiable."),
        ],
      },
      {
        slug: "pediatric-nursing",
        facts: [
          f("The normal heart rate of a newborn is about:", "120–160 bpm", ["60–80 bpm", "40–60 bpm", "20–40 bpm"], "Newborns have faster heart rates."),
          f("Which vaccine is given at birth?", "BCG", ["MMR", "Hepatitis B only", "Typhoid"], "BCG is given at birth."),
          f("Breast milk is the ideal food for:", "Infants", ["Adults", "Elderly", "Athletes only"], "Breast milk is ideal for infants."),
          f("Growth monitoring in children tracks:", "Height and weight", ["Blood group", "Eye colour", "Hair colour"], "Growth monitoring tracks height and weight."),
          f("Which condition is common in premature infants?", "Respiratory distress", ["Arthritis", "Cataract", "Gout"], "Premature infants risk respiratory distress."),
          f("Dehydration in children is indicated by:", "Sunken eyes", ["Bright eyes", "Weight gain", "Slow pulse only"], "Sunken eyes indicate dehydration."),
        ],
      },
      {
        slug: "nursing-ethics",
        facts: [
          f("Informed consent respects a patient's:", "Autonomy", ["Confidentiality only", "Beneficence only", "Justice only"], "Informed consent upholds autonomy."),
          f("Maintaining patient privacy is:", "Confidentiality", ["Autonomy", "Justice", "Beneficence"], "Confidentiality protects privacy."),
          f("Doing good for the patient is the principle of:", "Beneficence", ["Non-maleficence", "Autonomy", "Justice"], "Beneficence means doing good."),
          f("Avoiding harm is the principle of:", "Non-maleficence", ["Beneficence", "Autonomy", "Justice"], "Non-maleficence means avoiding harm."),
          f("Fair distribution of care is the principle of:", "Justice", ["Autonomy", "Beneficence", "Confidentiality"], "Justice concerns fairness."),
          f("A nurse's code of conduct is set by:", "Nursing council", ["Police", "Court", "Parliament only"], "Nursing councils set codes of conduct."),
        ],
      },
    ],
  },

  {
    slug: "public-health",
    topics: [
      {
        slug: "epidemiology",
        facts: [
          f("The study of disease distribution in populations is:", "Epidemiology", ["Pathology", "Anatomy", "Pharmacology"], "Epidemiology studies disease in populations."),
          f("The number of new cases in a period is the:", "Incidence", ["Prevalence", "Mortality", "Morbidity"], "Incidence measures new cases."),
          f("The total number of existing cases is the:", "Prevalence", ["Incidence", "Mortality", "Attack rate"], "Prevalence counts existing cases."),
          f("A disease present constantly in a population is:", "Endemic", ["Epidemic", "Pandemic", "Sporadic"], "Endemic diseases are constantly present."),
          f("A worldwide disease outbreak is a:", "Pandemic", ["Epidemic", "Endemic", "Sporadic"], "A pandemic is worldwide."),
          f("The first case of an outbreak is the:", "Index case", ["Secondary case", "Tertiary case", "Carrier"], "The index case is the first."),
        ],
      },
      {
        slug: "health-promotion",
        facts: [
          f("Health promotion aims to:", "Enable people to improve health", ["Treat disease only", "Increase costs", "Reduce access"], "Health promotion enables healthier living."),
          f("Which is a primary prevention measure?", "Vaccination", ["Rehabilitation", "Surgery", "Dialysis"], "Vaccination is primary prevention."),
          f("Secondary prevention focuses on:", "Early detection", ["Preventing onset", "Rehabilitation", "Palliative care"], "Secondary prevention is early detection."),
          f("Which is a healthy lifestyle practice?", "Regular exercise", ["Smoking", "Sedentary life", "Junk food"], "Exercise is a healthy practice."),
          f("Health education is a form of:", "Health promotion", ["Treatment", "Diagnosis", "Surgery"], "Health education promotes health."),
          f("Which is a risk factor for heart disease?", "Smoking", ["Exercise", "Balanced diet", "Sleep"], "Smoking raises heart disease risk."),
        ],
      },
      {
        slug: "health-policy",
        facts: [
          f("Health policy is made by:", "Government", ["Individuals only", "Schools only", "Hospitals only"], "Governments make health policy."),
          f("WHO stands for:", "World Health Organization", ["World Hospital Organization", "World Hygiene Office", "World Health Office"], "WHO is the World Health Organization."),
          f("Universal health coverage means:", "Access to health services for all", ["Free services for some", "Private insurance only", "No services"], "UHC means access for all."),
          f("Which is a health system building block?", "Health financing", ["Sports", "Tourism", "Media"], "Health financing is a system block."),
          f("Primary health care is provided at:", "Basic community level", ["Tertiary hospitals only", "Private clinics only", "Research labs"], "PHC is community-level care."),
          f("Health equity means:", "Fair access to health", ["Equal disease", "Equal income", "Equal education"], "Health equity is fair access."),
        ],
      },
      {
        slug: "biostatistics",
        facts: [
          f("Biostatistics applies statistics to:", "Health data", ["Engineering", "Law", "History"], "Biostatistics analyses health data."),
          f("Infant mortality rate measures deaths of:", "Infants under one year", ["Children under five", "Adults", "Elderly"], "IMR measures deaths under one year."),
          f("Life expectancy is the average:", "Years a person is expected to live", ["Income", "Height", "Weight"], "Life expectancy is expected lifespan."),
          f("Maternal mortality ratio measures deaths during:", "Pregnancy and childbirth", ["Childhood", "Old age", "Work"], "MMR relates to pregnancy and childbirth."),
          f("A crude birth rate is per:", "1000 population", ["100 population", "10000 population", "100000 population"], "Birth rate is per 1000."),
          f("Standardisation in epidemiology adjusts for:", "Age distribution", ["Gender only", "Income", "Education"], "Age standardisation adjusts for age structure."),
        ],
      },
      {
        slug: "maternal-child-health",
        facts: [
          f("Antenatal care is care during:", "Pregnancy", ["Childhood", "Old age", "Surgery"], "Antenatal care is pregnancy care."),
          f("Exclusive breastfeeding is recommended for:", "6 months", ["1 month", "3 months", "12 months"], "Exclusive breastfeeding is advised for six months."),
          f("Which vaccine protects against measles?", "MMR", ["BCG", "OPV", "DTP"], "MMR protects against measles, mumps and rubella."),
          f("Oral rehydration solution treats:", "Dehydration", ["Fever", "Cough", "Rash"], "ORS treats dehydration."),
          f("Family planning aims to:", "Space and limit births", ["Increase births", "Stop all births", "Increase mortality"], "Family planning helps space births."),
          f("Which is a danger sign in pregnancy?", "Severe bleeding", ["Mild hunger", "Light exercise", "Normal sleep"], "Severe bleeding is a danger sign."),
        ],
      },
    ],
  },

  {
    slug: "biochemistry",
    topics: [
      {
        slug: "biomolecules",
        facts: [
          f("Which biomolecule is the main source of energy?", "Carbohydrate", ["Protein", "Lipid", "Nucleic acid"], "Carbohydrates are the primary energy source."),
          f("Which biomolecule is made of amino acids?", "Protein", ["Carbohydrate", "Lipid", "Nucleic acid"], "Proteins are polymers of amino acids."),
          f("Which biomolecule stores genetic information?", "Nucleic acid", ["Protein", "Carbohydrate", "Lipid"], "Nucleic acids store genetic information."),
          f("Which biomolecule is insoluble in water?", "Lipid", ["Protein", "Carbohydrate", "Salt"], "Lipids are hydrophobic."),
          f("The building block of carbohydrates is:", "Monosaccharide", ["Amino acid", "Fatty acid", "Nucleotide"], "Monosaccharides are sugar monomers."),
          f("Enzymes are chemically:", "Proteins", ["Carbohydrates", "Lipids", "Nucleic acids"], "Most enzymes are proteins."),
        ],
      },
      {
        slug: "metabolism",
        facts: [
          f("The breakdown of glucose to release energy is:", "Glycolysis", ["Gluconeogenesis", "Photosynthesis", "Digestion"], "Glycolysis breaks down glucose."),
          f("Cellular respiration produces mainly:", "ATP", ["DNA", "Protein", "Fat"], "Respiration produces ATP."),
          f("Which cycle is also called the citric acid cycle?", "Krebs cycle", ["Calvin cycle", "Urea cycle", "Nitrogen cycle"], "The Krebs cycle is the citric acid cycle."),
          f("The synthesis of glucose from non-carbohydrates is:", "Gluconeogenesis", ["Glycolysis", "Glycogenesis", "Lipolysis"], "Gluconeogenesis makes glucose."),
          f("Where does glycolysis occur?", "Cytoplasm", ["Nucleus", "Mitochondrial matrix", "Ribosome"], "Glycolysis occurs in the cytoplasm."),
          f("Which molecule is the energy currency of the cell?", "ATP", ["ADP", "NADH", "Glucose"], "ATP is the energy currency."),
        ],
      },
      {
        slug: "enzymes",
        facts: [
          f("Enzymes act as:", "Biological catalysts", ["Substrates", "Products", "Solvents"], "Enzymes are biological catalysts."),
          f("The region of an enzyme where substrate binds is the:", "Active site", ["Allosteric site", "Binding pocket only", "Cofactor"], "Substrate binds at the active site."),
          f("Enzyme activity is affected by:", "Temperature and pH", ["Colour", "Volume", "Mass"], "Temperature and pH affect enzyme activity."),
          f("An enzyme that is permanently inactivated is:", "Denatured", ["Activated", "Inhibited only", "Enhanced"], "Denaturation permanently inactivates enzymes."),
          f("A non-protein helper of an enzyme is a:", "Cofactor", ["Substrate", "Product", "Inhibitor"], "Cofactors assist enzymes."),
          f("Enzymes are specific to:", "Their substrate", ["Any substrate", "Temperature", "Colour"], "Enzymes are substrate-specific."),
        ],
      },
      {
        slug: "molecular-biology",
        facts: [
          f("DNA replication is:", "Semiconservative", ["Conservative", "Dispersive", "Random"], "DNA replication is semiconservative."),
          f("The enzyme that unwinds DNA is:", "Helicase", ["Polymerase", "Ligase", "Primase"], "Helicase unwinds DNA."),
          f("Transcription produces:", "RNA", ["DNA", "Protein", "Lipid"], "Transcription makes RNA."),
          f("Translation produces:", "Protein", ["RNA", "DNA", "Lipid"], "Translation makes protein."),
          f("The genetic code is read in triplets called:", "Codons", ["Genes", "Alleles", "Chromosomes"], "Codons are triplet base sequences."),
          f("PCR is used to:", "Amplify DNA", ["Digest protein", "Synthesise lipid", "Break RNA"], "PCR amplifies DNA."),
        ],
      },
    ],
  },

  {
    slug: "medical",
    topics: [
      {
        slug: "pathology",
        facts: [
          f("The study of disease is:", "Pathology", ["Anatomy", "Physiology", "Pharmacology"], "Pathology studies disease."),
          f("Inflammation is a response to:", "Injury or infection", ["Exercise", "Sleep", "Nutrition"], "Inflammation responds to injury or infection."),
          f("A tumour that spreads is:", "Malignant", ["Benign", "Dormant", "Cystic"], "Malignant tumours spread."),
          f("Which is a sign of inflammation?", "Redness", ["Pallor", "Coldness", "Numbness"], "Redness is a classic inflammation sign."),
          f("Necrosis means:", "Cell death", ["Cell growth", "Cell division", "Cell repair"], "Necrosis is cell death."),
          f("A biopsy is used to:", "Examine tissue", ["Measure height", "Test hearing", "Check vision"], "Biopsy examines tissue."),
        ],
      },
      {
        slug: "microbiology-medical",
        facts: [
          f("Which organism causes tuberculosis?", "Bacterium", ["Virus", "Fungus", "Protozoan"], "TB is caused by Mycobacterium tuberculosis."),
          f("Which organism causes AIDS?", "Virus", ["Bacterium", "Fungus", "Protozoan"], "AIDS is caused by HIV."),
          f("Which organism causes ringworm?", "Fungus", ["Virus", "Bacterium", "Protozoan"], "Ringworm is fungal."),
          f("Which organism causes malaria?", "Protozoan", ["Virus", "Bacterium", "Fungus"], "Malaria is caused by Plasmodium."),
          f("Sterilisation destroys:", "Microorganisms", ["Nutrients", "Water", "Minerals"], "Sterilisation destroys microbes."),
          f("Antibiotics are ineffective against:", "Viruses", ["Bacteria", "Fungi", "Parasites"], "Antibiotics do not treat viruses."),
        ],
      },
      {
        slug: "forensic-medicine",
        facts: [
          f("Forensic medicine applies medicine to:", "Legal matters", ["Sports", "Education", "Commerce"], "Forensic medicine serves the law."),
          f("An autopsy is a:", "Post-mortem examination", ["Blood test", "X-ray", "Vaccination"], "An autopsy is a post-mortem."),
          f("Rigor mortis is:", "Stiffening after death", ["Cooling after death", "Bleeding", "Healing"], "Rigor mortis is post-mortem stiffening."),
          f("DNA fingerprinting is used in:", "Identification", ["Vaccination", "Surgery", "Nutrition"], "DNA fingerprinting identifies individuals."),
          f("The time since death is the:", "Post-mortem interval", ["Incubation period", "Latent period", "Recovery period"], "PMI is time since death."),
          f("Which is a sign of death?", "Absence of pulse", ["Presence of fever", "Rapid breathing", "High blood pressure"], "Absence of pulse indicates death."),
        ],
      },
      {
        slug: "community-medicine",
        facts: [
          f("Community medicine deals with health of:", "Populations", ["Individuals only", "Animals only", "Plants"], "Community medicine addresses populations."),
          f("Which is a preventive measure?", "Immunisation", ["Surgery", "Chemotherapy", "Dialysis"], "Immunisation prevents disease."),
          f("Epidemiology is part of:", "Community medicine", ["Surgery", "Radiology", "Dentistry"], "Epidemiology belongs to community medicine."),
          f("Sanitation is important to prevent:", "Waterborne disease", ["Diabetes", "Asthma", "Arthritis"], "Sanitation prevents waterborne disease."),
          f("Health screening aims at:", "Early detection", ["Late treatment", "Rehabilitation", "Palliation"], "Screening enables early detection."),
          f("Which is a public health indicator?", "Infant mortality rate", ["Stock price", "Literacy only", "Rainfall"], "IMR is a public health indicator."),
        ],
      },
      {
        slug: "clinical-medicine",
        facts: [
          f("Hypertension means:", "High blood pressure", ["Low blood pressure", "High temperature", "Low pulse"], "Hypertension is high blood pressure."),
          f("Diabetes mellitus is characterised by:", "High blood glucose", ["Low blood glucose", "High temperature", "Low pulse"], "Diabetes features high blood glucose."),
          f("A heart attack is caused by:", "Blocked coronary artery", ["Excess water", "Low salt", "Exercise"], "Heart attacks result from coronary blockage."),
          f("Anaemia is a deficiency of:", "Haemoglobin", ["Water", "Salt", "Protein only"], "Anaemia is low haemoglobin."),
          f("Asthma affects the:", "Airways", ["Kidneys", "Liver", "Bones"], "Asthma affects the airways."),
          f("Which is a symptom of stroke?", "Sudden weakness on one side", ["Gradual weight gain", "Slow hair growth", "Mild hunger"], "Sudden one-sided weakness suggests stroke."),
        ],
      },
    ],
  },
];
