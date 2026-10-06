/**
 * Commerce, finance, banking and engineering subject banks.
 *
 * Fills finance, commerce, banking and the engineering subjects. Several topics
 * also carry parametric specs (computed items) so their volume scales with the
 * rest of the bank while every answer remains verifiable.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const COMMERCE_BANKS: SubjectSpec[] = [
  {
    slug: "finance",
    topics: [
      {
        slug: "corporate-finance",
        facts: [
          f("Corporate finance deals with:", "Financial decisions of a firm", ["Household budgets", "National policy", "Personal savings"], "Corporate finance covers a firm's financial decisions."),
          f("The primary goal of a firm is often:", "Maximising shareholder value", ["Minimising profit", "Maximising costs", "Reducing sales"], "Firms aim to maximise shareholder value."),
          f("Capital budgeting evaluates:", "Long-term investments", ["Daily expenses", "Petty cash", "Wages"], "Capital budgeting assesses long-term investments."),
          f("WACC stands for:", "Weighted Average Cost of Capital", ["Weighted Annual Cash Cost", "Working Average Capital Cost", "Weighted Asset Capital Cost"], "WACC is the Weighted Average Cost of Capital."),
          f("Dividend policy decides:", "Distribution of profits", ["Hiring", "Purchasing", "Production"], "Dividend policy concerns profit distribution."),
          f("Leverage refers to the use of:", "Debt", ["Equity only", "Cash only", "Assets only"], "Leverage is the use of debt."),
        ],
      },
      {
        slug: "investment",
        facts: [
          f("Return on investment measures:", "Profit relative to cost", ["Cost only", "Revenue only", "Tax only"], "ROI measures profit relative to cost."),
          f("A share represents:", "Ownership in a company", ["A loan to a company", "A tax", "A bond"], "Shares represent ownership."),
          f("A bond is a:", "Debt instrument", ["Equity instrument", "Tax", "Wage"], "Bonds are debt instruments."),
          f("Diversification reduces:", "Risk", ["Return always", "Liquidity", "Tax"], "Diversification reduces risk."),
          f("A portfolio is a:", "Collection of investments", ["Single investment", "A tax", "A loan"], "A portfolio is a collection of investments."),
          f("Liquidity refers to how easily an asset can be:", "Converted to cash", ["Stored", "Insured", "Taxed"], "Liquidity is ease of conversion to cash."),
        ],
      },
      {
        slug: "financial-markets",
        facts: [
          f("A stock exchange trades:", "Shares", ["Crops", "Machinery", "Land"], "Stock exchanges trade shares."),
          f("The primary market is where securities are:", "First issued", ["Resold", "Taxed", "Insured"], "The primary market issues new securities."),
          f("The secondary market is where securities are:", "Traded after issue", ["First issued", "Taxed", "Regulated only"], "The secondary market trades existing securities."),
          f("A bull market is characterised by:", "Rising prices", ["Falling prices", "Stable prices", "No prices"], "A bull market has rising prices."),
          f("A bear market is characterised by:", "Falling prices", ["Rising prices", "Stable prices", "No prices"], "A bear market has falling prices."),
          f("The regulator of Pakistan's capital market is:", "SECP", ["SBP", "FBR", "NAB"], "SECP regulates Pakistan's capital market."),
        ],
      },
      {
        slug: "financial-management",
        facts: [
          f("Working capital is:", "Current assets minus current liabilities", ["Fixed assets", "Long-term debt", "Equity only"], "Working capital is current assets less current liabilities."),
          f("The cash flow statement shows:", "Cash inflows and outflows", ["Only profit", "Only assets", "Only liabilities"], "It shows cash movements."),
          f("A balance sheet shows:", "Assets, liabilities and equity", ["Only profit", "Only cash", "Only sales"], "A balance sheet shows the financial position."),
          f("The income statement shows:", "Revenues and expenses", ["Only assets", "Only liabilities", "Only equity"], "The income statement shows performance."),
          f("Break-even point is where:", "Total revenue equals total cost", ["Profit is maximum", "Loss is maximum", "Sales are zero"], "Break-even is where revenue equals cost."),
          f("Depreciation allocates the cost of an asset over its:", "Useful life", ["Purchase day", "Sale day", "Tax year only"], "Depreciation spreads cost over useful life."),
        ],
      },
      {
        slug: "risk-management",
        facts: [
          f("Risk management identifies and:", "Mitigates risks", ["Increases risks", "Ignores risks", "Creates risks"], "Risk management mitigates risks."),
          f("Market risk arises from:", "Price movements", ["Employee behaviour", "Office layout", "Software bugs only"], "Market risk comes from price movements."),
          f("Credit risk is the risk of:", "Default by a borrower", ["Price rise", "Interest fall", "Tax rise"], "Credit risk is borrower default."),
          f("Hedging is used to:", "Reduce risk", ["Increase risk", "Ignore risk", "Create risk"], "Hedging reduces risk."),
          f("Insurance transfers:", "Risk", ["Profit", "Ownership", "Tax"], "Insurance transfers risk."),
          f("Diversification is a strategy to manage:", "Risk", ["Return only", "Tax only", "Wages only"], "Diversification manages risk."),
        ],
      },
    ],
  },

  {
    slug: "commerce",
    topics: [
      {
        slug: "trade-commerce",
        facts: [
          f("Trade involves the exchange of:", "Goods and services", ["Only goods", "Only services", "Only money"], "Trade exchanges goods and services."),
          f("Internal trade is trade within a:", "Country", ["Region only", "Continent", "World"], "Internal trade is within a country."),
          f("External trade is trade between:", "Countries", ["Cities", "Provinces", "Districts"], "External trade is between countries."),
          f("Exports are goods:", "Sold abroad", ["Bought from abroad", "Stored", "Destroyed"], "Exports are sold abroad."),
          f("Imports are goods:", "Bought from abroad", ["Sold abroad", "Stored", "Destroyed"], "Imports are bought from abroad."),
          f("A trade surplus occurs when exports:", "Exceed imports", ["Are less than imports", "Equal imports", "Are zero"], "A surplus means exports exceed imports."),
        ],
      },
      {
        slug: "business-law",
        facts: [
          f("A contract requires:", "Offer and acceptance", ["Offer only", "Acceptance only", "Neither"], "A contract needs offer and acceptance."),
          f("Consideration in a contract is:", "Something of value exchanged", ["A gift only", "A tax", "A penalty"], "Consideration is value exchanged."),
          f("A minor's contract is generally:", "Void", ["Valid", "Binding", "Enforceable"], "Minors' contracts are generally void."),
          f("A partnership is governed by the:", "Partnership Act", ["Company Act", "Contract Act", "Tax Act"], "Partnerships are governed by the Partnership Act."),
          f("A company is a:", "Separate legal entity", ["Partnership", "Sole proprietorship", "A person"], "A company is a separate legal entity."),
          f("Breach of contract gives rise to:", "Remedies", ["Rewards", "Taxes", "Penalties only"], "Breach gives rise to remedies."),
        ],
      },
      {
        slug: "commercial-geography",
        facts: [
          f("Commercial geography studies:", "Trade and resources", ["Only climate", "Only population", "Only culture"], "Commercial geography studies trade and resources."),
          f("Which is a major export of Pakistan?", "Textiles", ["Aircraft", "Wine", "Rubber"], "Textiles are a major export."),
          f("Which is a major import of Pakistan?", "Machinery", ["Wheat only", "Cotton only", "Rice only"], "Machinery is a major import."),
          f("Pakistan's main trading partner for CPEC is:", "China", ["Brazil", "Canada", "Australia"], "China is the CPEC partner."),
          f("Ports facilitate:", "Sea trade", ["Air travel only", "Road travel only", "Rail travel only"], "Ports facilitate sea trade."),
          f("Gwadar port is located in:", "Balochistan", ["Sindh", "Punjab", "KP"], "Gwadar is in Balochistan."),
        ],
      },
      {
        slug: "business-communication",
        facts: [
          f("Business communication should be:", "Clear and concise", ["Vague", "Verbose", "Ambiguous"], "Business communication is clear and concise."),
          f("A memorandum is:", "An internal note", ["An external letter", "A contract", "An invoice"], "A memo is an internal note."),
          f("A business letter should include:", "A salutation and closing", ["Only a date", "Only a signature", "Only a subject"], "Letters include salutation and closing."),
          f("Feedback in communication:", "Completes the process", ["Starts the process", "Is optional", "Is irrelevant"], "Feedback completes communication."),
          f("A report presents:", "Findings and recommendations", ["Only opinions", "Only rumours", "Only greetings"], "Reports present findings and recommendations."),
          f("Non-verbal communication includes:", "Body language", ["Only words", "Only writing", "Only speech"], "Non-verbal communication includes body language."),
        ],
      },
    ],
  },

  {
    slug: "banking",
    topics: [
      {
        slug: "banking-operations",
        facts: [
          f("A bank accepts:", "Deposits", ["Only loans", "Only shares", "Only bonds"], "Banks accept deposits."),
          f("A current account is mainly for:", "Business transactions", ["Long-term saving", "Fixed investment", "Retirement"], "Current accounts serve business transactions."),
          f("A savings account earns:", "Interest or profit", ["No return", "Only fees", "Only penalties"], "Savings accounts earn a return."),
          f("A cheque is a:", "Payment instrument", ["Loan", "Share", "Bond"], "A cheque is a payment instrument."),
          f("A bank draft is a:", "Secure payment instrument", ["Loan", "Share", "Bond"], "A bank draft is a secure instrument."),
          f("ATM stands for:", "Automated Teller Machine", ["Automatic Transaction Machine", "Advanced Teller Machine", "Automated Transfer Machine"], "ATM is Automated Teller Machine."),
        ],
      },
      {
        slug: "islamic-banking",
        facts: [
          f("Islamic banking avoids:", "Interest", ["Trade", "Profit", "Investment"], "Islamic banking avoids interest."),
          f("Mudarabah is a:", "Profit-sharing partnership", ["Loan", "Interest", "Tax"], "Mudarabah shares profit."),
          f("Musharakah is a:", "Joint partnership", ["Loan", "Interest", "Tax"], "Musharakah is joint partnership."),
          f("Murabaha is a:", "Cost-plus sale", ["Interest loan", "Gift", "Tax"], "Murabaha is a cost-plus sale."),
          f("Takaful is Islamic:", "Insurance", ["Banking", "Taxation", "Trade"], "Takaful is Islamic insurance."),
          f("Riba means:", "Interest/usury", ["Trade", "Charity", "Partnership"], "Riba is interest."),
        ],
      },
      {
        slug: "central-banking",
        facts: [
          f("The central bank of Pakistan is the:", "State Bank of Pakistan", ["National Bank", "Habib Bank", "Bank of Punjab"], "The SBP is the central bank."),
          f("A central bank controls:", "Monetary policy", ["Fiscal policy only", "Foreign policy", "Trade policy"], "Central banks control monetary policy."),
          f("The central bank issues:", "Currency", ["Shares", "Bonds", "Cheques"], "Central banks issue currency."),
          f("Raising the policy rate tends to:", "Reduce inflation", ["Increase inflation", "Increase borrowing", "Reduce savings"], "Higher rates tend to curb inflation."),
          f("A central bank acts as:", "Lender of last resort", ["A commercial bank", "An investment bank", "A stock exchange"], "Central banks are lenders of last resort."),
          f("Monetary policy in Pakistan is set by:", "State Bank of Pakistan", ["Ministry of Finance", "SECP", "FBR"], "The SBP sets monetary policy."),
        ],
      },
      {
        slug: "banking-law",
        facts: [
          f("Banking regulation in Pakistan is governed by the:", "State Bank of Pakistan Act", ["Companies Act only", "Contract Act only", "Tax Act only"], "The SBP Act governs banking regulation."),
          f("Know Your Customer (KYC) helps prevent:", "Money laundering", ["Trade", "Investment", "Saving"], "KYC helps prevent money laundering."),
          f("Anti-money laundering rules require:", "Reporting suspicious transactions", ["Ignoring transactions", "Hiding transactions", "Delaying transactions"], "AML rules require suspicious transaction reporting."),
          f("Customer confidentiality is a:", "Banking duty", ["Optional practice", "Illegal act", "Tax"], "Banks have a duty of confidentiality."),
          f("A bank must maintain:", "Adequate capital", ["No capital", "Only deposits", "Only loans"], "Banks must maintain adequate capital."),
          f("Deposit insurance protects:", "Depositors", ["Shareholders", "Directors", "Auditors"], "Deposit insurance protects depositors."),
        ],
      },
    ],
  },

  {
    slug: "electrical-engineering",
    topics: [
      {
        slug: "circuit-theory",
        facts: [
          f("Ohm's law states V equals:", "IR", ["I/R", "R/I", "I+R"], "V = IR."),
          f("The SI unit of resistance is the:", "Ohm", ["Volt", "Ampere", "Watt"], "Resistance is measured in ohms."),
          f("In a series circuit, the current is:", "The same throughout", ["Different at each point", "Zero", "Infinite"], "Series circuits have constant current."),
          f("In a parallel circuit, the voltage across each branch is:", "The same", ["Different", "Zero", "Infinite"], "Parallel branches share the same voltage."),
          f("Kirchhoff's current law relates to:", "Conservation of charge", ["Conservation of energy", "Magnetic flux", "Power"], "KCL is conservation of charge."),
          f("Power in a circuit is given by:", "VI", ["V/I", "I/V", "V+I"], "P = VI."),
        ],
      },
      {
        slug: "electrical-machines",
        facts: [
          f("A transformer works on the principle of:", "Mutual induction", ["Self induction only", "Resistance", "Capacitance"], "Transformers use mutual induction."),
          f("A step-up transformer increases:", "Voltage", ["Current", "Resistance", "Power"], "Step-up transformers increase voltage."),
          f("An electric motor converts:", "Electrical energy to mechanical energy", ["Mechanical to electrical", "Heat to light", "Light to heat"], "Motors convert electrical to mechanical energy."),
          f("A generator converts:", "Mechanical energy to electrical energy", ["Electrical to mechanical", "Heat to light", "Light to heat"], "Generators convert mechanical to electrical energy."),
          f("A DC machine has a:", "Commutator", ["Slip ring only", "Capacitor", "Resistor"], "DC machines use a commutator."),
          f("An induction motor runs on:", "AC", ["DC only", "Battery only", "Solar only"], "Induction motors run on AC."),
        ],
      },
      {
        slug: "power-systems",
        facts: [
          f("Power is transmitted at high voltage to:", "Reduce losses", ["Increase losses", "Reduce voltage", "Increase resistance"], "High voltage reduces transmission losses."),
          f("The standard frequency of AC in Pakistan is:", "50 Hz", ["60 Hz", "40 Hz", "100 Hz"], "Pakistan uses 50 Hz."),
          f("A circuit breaker is used to:", "Protect circuits", ["Increase current", "Increase voltage", "Store energy"], "Circuit breakers protect circuits."),
          f("A fuse protects against:", "Overcurrent", ["Overvoltage only", "Undervoltage", "Frequency change"], "Fuses protect against overcurrent."),
          f("A busbar is used to:", "Distribute power", ["Store power", "Generate power", "Measure power"], "Busbars distribute power."),
          f("The unit of electrical energy is the:", "Kilowatt-hour", ["Watt", "Volt", "Ampere"], "Electrical energy is measured in kWh."),
        ],
      },
      {
        slug: "control-systems",
        facts: [
          f("A control system regulates:", "System output", ["System colour", "System size", "System age"], "Control systems regulate output."),
          f("Open-loop control lacks:", "Feedback", ["Input", "Output", "Power"], "Open-loop systems lack feedback."),
          f("Closed-loop control uses:", "Feedback", ["No input", "No output", "No power"], "Closed-loop systems use feedback."),
          f("A PID controller has Proportional, Integral and:", "Derivative terms", ["Direct terms", "Digital terms", "Dual terms"], "PID stands for Proportional-Integral-Derivative."),
          f("A sensor in a control system provides:", "Measurement", ["Power", "Storage", "Cooling"], "Sensors provide measurements."),
          f("An actuator in a control system:", "Performs an action", ["Measures", "Stores", "Cools"], "Actuators perform actions."),
        ],
      },
      {
        slug: "measurements-instruments",
        facts: [
          f("A voltmeter measures:", "Voltage", ["Current", "Resistance", "Power"], "Voltmeters measure voltage."),
          f("An ammeter measures:", "Current", ["Voltage", "Resistance", "Power"], "Ammeters measure current."),
          f("A multimeter can measure:", "Voltage, current and resistance", ["Only voltage", "Only current", "Only resistance"], "Multimeters measure several quantities."),
          f("An oscilloscope displays:", "Waveforms", ["Only numbers", "Only text", "Only images"], "Oscilloscopes display waveforms."),
          f("A galvanometer detects:", "Small currents", ["Large voltages only", "Resistance only", "Power only"], "Galvanometers detect small currents."),
          f("An ammeter is connected in:", "Series", ["Parallel", "Series-parallel", "Neither"], "Ammeters connect in series."),
        ],
      },
    ],
  },

  {
    slug: "mechanical-engineering",
    topics: [
      {
        slug: "engineering-mechanics",
        facts: [
          f("The SI unit of force is the:", "Newton", ["Joule", "Watt", "Pascal"], "Force is measured in newtons."),
          f("Newton's second law states F equals:", "ma", ["mv", "m/a", "a/m"], "F = ma."),
          f("Moment of a force is:", "Force × perpendicular distance", ["Force / distance", "Force + distance", "Force − distance"], "Moment = force × distance."),
          f("Equilibrium means the net force is:", "Zero", ["Maximum", "Infinite", "Negative"], "Equilibrium has zero net force."),
          f("Friction acts:", "Opposite to motion", ["Along motion", "Perpendicular to motion", "Upward only"], "Friction opposes motion."),
          f("The centre of gravity is where:", "Weight acts", ["Mass is zero", "Force is maximum", "Speed is zero"], "Weight acts at the centre of gravity."),
        ],
      },
      {
        slug: "thermodynamics-me",
        facts: [
          f("A Carnot cycle is a:", "Ideal thermodynamic cycle", ["Real engine cycle", "Electrical cycle", "Chemical cycle"], "The Carnot cycle is ideal."),
          f("Efficiency of a heat engine equals:", "Work output divided by heat input", ["Heat input divided by work output", "Work plus heat", "Heat minus work"], "Efficiency = work output / heat input."),
          f("An isothermal process occurs at constant:", "Temperature", ["Pressure", "Volume", "Entropy"], "Isothermal means constant temperature."),
          f("An adiabatic process has no:", "Heat transfer", ["Work", "Volume change", "Pressure change"], "Adiabatic means no heat transfer."),
          f("An isobaric process occurs at constant:", "Pressure", ["Temperature", "Volume", "Entropy"], "Isobaric means constant pressure."),
          f("Entropy is a measure of:", "Disorder", ["Order", "Temperature", "Pressure"], "Entropy measures disorder."),
        ],
      },
      {
        slug: "fluid-mechanics",
        facts: [
          f("Pressure is:", "Force per unit area", ["Force × area", "Force + area", "Area per force"], "Pressure = force/area."),
          f("Bernoulli's principle relates pressure and:", "Velocity", ["Temperature", "Mass", "Colour"], "Bernoulli relates pressure and velocity."),
          f("Archimedes' principle explains:", "Buoyancy", ["Friction", "Magnetism", "Combustion"], "Archimedes explained buoyancy."),
          f("Viscosity is a fluid's resistance to:", "Flow", ["Heat", "Light", "Sound"], "Viscosity resists flow."),
          f("Pascal's law applies to:", "Fluid pressure transmission", ["Gas combustion", "Solid stress", "Heat transfer"], "Pascal's law concerns pressure transmission."),
          f("Reynolds number predicts:", "Flow regime", ["Temperature", "Pressure only", "Volume only"], "Reynolds number predicts laminar/turbulent flow."),
        ],
      },
      {
        slug: "machine-design",
        facts: [
          f("A gear is used to:", "Transmit motion", ["Store energy", "Generate heat", "Absorb light"], "Gears transmit motion."),
          f("A bearing reduces:", "Friction", ["Torque", "Power", "Speed"], "Bearings reduce friction."),
          f("A shaft transmits:", "Torque", ["Heat", "Light", "Sound"], "Shafts transmit torque."),
          f("A key in machine design is used to:", "Prevent relative rotation", ["Increase heat", "Reduce speed", "Absorb light"], "Keys prevent relative rotation."),
          f("Fatigue failure occurs due to:", "Repeated stress", ["Single overload", "Corrosion only", "Heat only"], "Fatigue is from repeated stress."),
          f("A spring stores:", "Energy", ["Mass", "Heat", "Light"], "Springs store energy."),
        ],
      },
      {
        slug: "manufacturing",
        facts: [
          f("Casting is a manufacturing process that:", "Pours molten metal into a mould", ["Cuts metal", "Joins metal", "Bends metal"], "Casting pours molten metal into moulds."),
          f("Welding is a process that:", "Joins materials", ["Separates materials", "Melts materials only", "Cools materials"], "Welding joins materials."),
          f("Turning is a:", "Machining operation", ["Casting operation", "Welding operation", "Forging operation"], "Turning is machining."),
          f("Lathe is a machine used for:", "Turning", ["Casting", "Welding", "Cooking"], "Lathes perform turning."),
          f("CNC stands for:", "Computer Numerical Control", ["Central Numerical Control", "Computer Network Control", "Common Numerical Control"], "CNC is Computer Numerical Control."),
          f("3D printing is an example of:", "Additive manufacturing", ["Subtractive manufacturing", "Casting", "Welding"], "3D printing is additive manufacturing."),
        ],
      },
    ],
  },

  {
    slug: "civil-engineering",
    topics: [
      {
        slug: "structural-analysis",
        facts: [
          f("A beam is a structural element that resists:", "Bending", ["Torsion only", "Compression only", "Tension only"], "Beams resist bending."),
          f("A column primarily resists:", "Compression", ["Tension", "Torsion", "Bending only"], "Columns resist compression."),
          f("A truss is made of:", "Triangles", ["Circles", "Squares", "Pentagons"], "Trusses use triangles for stability."),
          f("A cantilever is supported at:", "One end", ["Both ends", "Neither end", "The middle"], "Cantilevers are supported at one end."),
          f("Shear force acts:", "Parallel to the cross-section", ["Perpendicular to the cross-section", "Along the length only", "At an angle only"], "Shear acts parallel to the section."),
          f("A fixed support resists:", "Translation and rotation", ["Only translation", "Only rotation", "Neither"], "Fixed supports resist translation and rotation."),
        ],
      },
      {
        slug: "concrete-technology",
        facts: [
          f("Concrete is made of cement, water and:", "Aggregate", ["Steel only", "Wood", "Glass"], "Concrete contains cement, water and aggregate."),
          f("Reinforced concrete contains:", "Steel", ["Wood", "Glass", "Plastic"], "Reinforced concrete contains steel bars."),
          f("The water-cement ratio affects:", "Strength", ["Colour only", "Cost only", "Weight only"], "The water-cement ratio affects strength."),
          f("Curing of concrete ensures:", "Proper hardening", ["Rapid drying", "Colour change", "Weight loss"], "Curing ensures proper hardening."),
          f("The grade of concrete indicates its:", "Strength", ["Colour", "Cost", "Age"], "Concrete grade indicates strength."),
          f("Slump test measures:", "Workability", ["Strength", "Durability", "Density"], "Slump tests measure workability."),
        ],
      },
      {
        slug: "surveying",
        facts: [
          f("Surveying determines:", "Positions on the Earth's surface", ["Colours", "Sounds", "Temperatures"], "Surveying determines positions."),
          f("A theodolite measures:", "Angles", ["Distances only", "Volumes only", "Masses only"], "Theodolites measure angles."),
          f("A levelling instrument measures:", "Elevation differences", ["Angles only", "Volumes only", "Masses only"], "Levels measure elevation differences."),
          f("GPS is used for:", "Positioning", ["Cooking", "Painting", "Welding"], "GPS provides positioning."),
          f("A benchmark is a:", "Reference point", ["Tool", "Building", "Machine"], "Benchmarks are reference points."),
          f("Chain surveying uses:", "Chains or tapes", ["Angles only", "Levels only", "Satellites only"], "Chain surveying measures distances with chains."),
        ],
      },
      {
        slug: "geotechnical",
        facts: [
          f("Soil bearing capacity is the soil's ability to:", "Support loads", ["Absorb water", "Change colour", "Conduct heat"], "Bearing capacity supports loads."),
          f("A foundation transfers loads to:", "The ground", ["The roof", "The walls", "The beams"], "Foundations transfer loads to the ground."),
          f("Consolidation of soil causes:", "Settlement", ["Uplift", "Colour change", "Heating"], "Consolidation causes settlement."),
          f("A retaining wall resists:", "Lateral soil pressure", ["Vertical loads only", "Wind only", "Snow only"], "Retaining walls resist lateral pressure."),
          f("The water table is the:", "Upper level of groundwater", ["Roof level", "Floor level", "Ceiling level"], "The water table is the groundwater level."),
          f("A standard penetration test measures:", "Soil resistance", ["Soil colour", "Soil temperature", "Soil age"], "SPT measures soil resistance."),
        ],
      },
      {
        slug: "transportation",
        facts: [
          f("Transportation engineering deals with:", "Roads, railways and airports", ["Only buildings", "Only bridges", "Only dams"], "Transportation engineering covers roads, railways and airports."),
          f("A flexible pavement has a:", "Bituminous surface", ["Concrete surface", "Steel surface", "Wood surface"], "Flexible pavements are bituminous."),
          f("A rigid pavement is made of:", "Concrete", ["Bitumen", "Gravel only", "Steel"], "Rigid pavements are concrete."),
          f("The camber of a road is provided for:", "Drainage", ["Speed", "Lighting", "Parking"], "Camber aids drainage."),
          f("A superelevation helps vehicles to:", "Turn safely", ["Stop", "Park", "Reverse"], "Superelevation aids safe turning."),
          f("Traffic volume is measured as:", "Vehicles per hour", ["Vehicles per year only", "Weight per vehicle", "Length of road"], "Traffic volume is vehicles per hour."),
        ],
      },
    ],
  },

  {
    slug: "electronics",
    topics: [
      {
        slug: "semiconductor-devices",
        facts: [
          f("A diode allows current in:", "One direction", ["Both directions", "No direction", "Random direction"], "Diodes conduct in one direction."),
          f("A transistor has how many terminals?", "3", ["2", "4", "5"], "Transistors have three terminals."),
          f("Silicon is a:", "Semiconductor", ["Conductor", "Insulator", "Superconductor"], "Silicon is a semiconductor."),
          f("A PN junction forms a:", "Diode", ["Resistor", "Capacitor", "Inductor"], "A PN junction forms a diode."),
          f("Doping adds:", "Impurities", ["Water", "Heat", "Light"], "Doping adds impurities to semiconductors."),
          f("An LED is a:", "Light-emitting diode", ["Light-enhancing device", "Low-energy diode", "Linear electronic device"], "LED is a light-emitting diode."),
        ],
      },
      {
        slug: "analog-electronics",
        facts: [
          f("An operational amplifier amplifies:", "Voltage", ["Current only", "Power only", "Resistance"], "Op-amps amplify voltage."),
          f("A capacitor stores:", "Charge", ["Mass", "Heat", "Light"], "Capacitors store charge."),
          f("An inductor stores energy in a:", "Magnetic field", ["Electric field", "Gravitational field", "Thermal field"], "Inductors store energy magnetically."),
          f("A rectifier converts:", "AC to DC", ["DC to AC", "AC to AC", "DC to DC"], "Rectifiers convert AC to DC."),
          f("An amplifier increases signal:", "Amplitude", ["Frequency", "Phase", "Wavelength"], "Amplifiers increase amplitude."),
          f("Negative feedback in an amplifier:", "Reduces gain and distortion", ["Increases gain", "Increases distortion", "Has no effect"], "Negative feedback reduces gain and distortion."),
        ],
      },
      {
        slug: "digital-electronics",
        facts: [
          f("A logic gate with output 1 only when all inputs are 1 is:", "AND", ["OR", "NOT", "NOR"], "AND outputs 1 only when all inputs are 1."),
          f("An OR gate outputs 1 when:", "Any input is 1", ["All inputs are 0", "All inputs are 1", "No input is 1"], "OR outputs 1 if any input is 1."),
          f("A NOT gate:", "Inverts the input", ["Doubles the input", "Adds inputs", "Stores input"], "NOT inverts the input."),
          f("Binary uses digits:", "0 and 1", ["0 to 9", "1 to 10", "A to Z"], "Binary uses 0 and 1."),
          f("A flip-flop stores:", "One bit", ["One byte", "One word", "One nibble"], "A flip-flop stores one bit."),
          f("A multiplexer:", "Selects one of many inputs", ["Adds numbers", "Stores data", "Converts AC to DC"], "A multiplexer selects an input."),
        ],
      },
      {
        slug: "communication-systems",
        facts: [
          f("Modulation is used to:", "Transmit signals efficiently", ["Store signals", "Block signals", "Destroy signals"], "Modulation aids efficient transmission."),
          f("AM stands for:", "Amplitude Modulation", ["Angle Modulation", "Analog Modulation", "Advanced Modulation"], "AM is Amplitude Modulation."),
          f("FM stands for:", "Frequency Modulation", ["Fast Modulation", "Fixed Modulation", "Full Modulation"], "FM is Frequency Modulation."),
          f("Bandwidth is the range of:", "Frequencies", ["Voltages", "Currents", "Resistances"], "Bandwidth is a frequency range."),
          f("A repeater is used to:", "Boost signals", ["Block signals", "Store signals", "Destroy signals"], "Repeaters boost signals."),
          f("Antennas are used to:", "Transmit and receive signals", ["Store signals", "Amplify power only", "Convert AC to DC"], "Antennas transmit and receive."),
        ],
      },
    ],
  },

  {
    slug: "engineering-fundamentals",
    topics: [
      {
        slug: "engineering-drawing",
        facts: [
          f("Engineering drawing is a:", "Technical representation", ["Painting", "Photograph", "Advertisement"], "Engineering drawing is a technical representation."),
          f("Orthographic projection shows:", "Views from different directions", ["Only one view", "Only colour", "Only text"], "Orthographic projection shows multiple views."),
          f("A scale in drawing represents:", "Ratio of drawing to object", ["Colour", "Weight", "Temperature"], "Scale is the drawing-to-object ratio."),
          f("A dimension line indicates:", "Size", ["Colour", "Texture", "Weight"], "Dimension lines indicate size."),
          f("First-angle projection is common in:", "Europe", ["America only", "Africa only", "Australia only"], "First-angle projection is common in Europe."),
          f("A section view shows:", "Internal details", ["Only external details", "Only colour", "Only text"], "Section views show internal details."),
        ],
      },
      {
        slug: "engineering-materials",
        facts: [
          f("Steel is an alloy of iron and:", "Carbon", ["Copper", "Zinc", "Tin"], "Steel is iron and carbon."),
          f("Bronze is an alloy of copper and:", "Tin", ["Zinc", "Iron", "Lead"], "Bronze is copper and tin."),
          f("Brass is an alloy of copper and:", "Zinc", ["Tin", "Iron", "Lead"], "Brass is copper and zinc."),
          f("Which material is a good conductor?", "Copper", ["Rubber", "Wood", "Glass"], "Copper is a good conductor."),
          f("Which material is an insulator?", "Rubber", ["Copper", "Aluminium", "Silver"], "Rubber is an insulator."),
          f("Composite materials combine:", "Two or more materials", ["One material only", "Only metals", "Only plastics"], "Composites combine materials."),
        ],
      },
      {
        slug: "basic-mechanics",
        facts: [
          f("Speed is:", "Distance per unit time", ["Time per unit distance", "Distance × time", "Distance + time"], "Speed = distance/time."),
          f("Acceleration is the rate of change of:", "Velocity", ["Distance", "Mass", "Force"], "Acceleration is change of velocity."),
          f("Momentum is:", "Mass × velocity", ["Mass / velocity", "Velocity / mass", "Mass + velocity"], "Momentum = mass × velocity."),
          f("Work is:", "Force × displacement", ["Force / displacement", "Force + displacement", "Displacement / force"], "Work = force × displacement."),
          f("Energy is measured in:", "Joules", ["Newtons", "Watts", "Pascals"], "Energy is measured in joules."),
          f("Power is:", "Work per unit time", ["Work × time", "Work + time", "Time / work"], "Power = work/time."),
        ],
      },
      {
        slug: "engineering-ethics",
        facts: [
          f("Engineering ethics concerns:", "Professional conduct", ["Only profits", "Only speed", "Only costs"], "Engineering ethics concerns conduct."),
          f("Public safety in engineering is:", "Paramount", ["Optional", "Secondary", "Irrelevant"], "Public safety is paramount."),
          f("A conflict of interest should be:", "Disclosed", ["Hidden", "Ignored", "Encouraged"], "Conflicts of interest should be disclosed."),
          f("Whistleblowing reports:", "Unethical practices", ["Good practices", "Routine work", "Profits"], "Whistleblowing reports wrongdoing."),
          f("Engineers should follow:", "Codes of conduct", ["Only orders", "Only profit", "Only speed"], "Engineers follow codes of conduct."),
          f("Sustainability in engineering means:", "Designing for the long term", ["Ignoring the environment", "Maximising waste", "Short-term profit only"], "Sustainable engineering considers the long term."),
        ],
      },
    ],
  },
];
