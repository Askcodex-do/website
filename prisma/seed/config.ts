/**
 * Seed scale configuration.
 *
 * The generators expand parameterised templates into distinct, verifiable
 * questions. These counts are deliberately generous so a fresh seed produces
 * well over the 10,000-question target the platform is designed for.
 */
export const SCALE = {
  math: {
    addition: 1400,
    subtraction: 1000,
    multiplication: 1700,
    division: 1300,
    average: 700,
    algebra: 1500,
    rectangleArea: 1000,
    triangleAngle: 600,
    speedDistance: 60,
    ratio: 800,
    simpleInterest: 500,
    hcf: 500,
    squareRoot: 500,
    fractionToPercent: 400,
  },
  reasoning: {
    numberSeriesAdd: 500,
    numberSeriesMultiply: 300,
    oddOneOut: 400,
    direction: 100,
    codingDecoding: 200,
  },
  english: {
    tenseFill: 200,
    pluralForms: 100,
    comparatives: 80,
  },
  computer: {
    binary: 256,
    storageUnits: 50,
  },
  science: {
    unitConversion: 300,
  },
} as const;
