/**
 * Conducting authorities and testing bodies referenced by exams.
 */

export interface SeedOrganization {
  slug: string;
  name: string;
  shortName?: string;
  website?: string;
  description?: string;
}

export const ORGANIZATIONS: SeedOrganization[] = [
  { slug: "fpsc", name: "Federal Public Service Commission", shortName: "FPSC", website: "https://www.fpsc.gov.pk" },
  { slug: "ppsc", name: "Punjab Public Service Commission", shortName: "PPSC", website: "https://www.ppsc.gop.pk" },
  { slug: "spsc", name: "Sindh Public Service Commission", shortName: "SPSC", website: "https://www.spsc.gov.pk" },
  { slug: "kppsc", name: "Khyber Pakhtunkhwa Public Service Commission", shortName: "KPPSC", website: "https://www.kppsc.gov.pk" },
  { slug: "bpsc", name: "Balochistan Public Service Commission", shortName: "BPSC", website: "https://www.bpsc.gob.pk" },
  { slug: "ajkpsc", name: "Azad Jammu & Kashmir Public Service Commission", shortName: "AJK PSC" },
  { slug: "gbpsc", name: "Gilgit-Baltistan Public Service Commission", shortName: "GB PSC" },
  { slug: "nts", name: "National Testing Service", shortName: "NTS", website: "https://www.nts.org.pk" },
  { slug: "ots", name: "Open Testing Service", shortName: "OTS" },
  { slug: "pts", name: "Pakistan Testing Service", shortName: "PTS" },
  { slug: "cts", name: "Central Testing Service", shortName: "CTS" },
  { slug: "hec", name: "Higher Education Commission", shortName: "HEC", website: "https://www.hec.gov.pk" },
  { slug: "pmc", name: "Pakistan Medical & Dental Council", shortName: "PMDC", website: "https://www.pmdc.pk" },
  { slug: "pmdc", name: "Pakistan Medical Commission", shortName: "PMC" },
  { slug: "uhs", name: "University of Health Sciences", shortName: "UHS" },
  { slug: "aku", name: "Aga Khan University", shortName: "AKU" },
  { slug: "uet", name: "University of Engineering & Technology", shortName: "UET" },
  { slug: "nust", name: "National University of Sciences & Technology", shortName: "NUST" },
  { slug: "fast", name: "FAST National University", shortName: "FAST" },
  { slug: "ned", name: "NED University of Engineering & Technology", shortName: "NED" },
  { slug: "giki", name: "Ghulam Ishaq Khan Institute", shortName: "GIKI" },
  { slug: "punjab-police", name: "Punjab Police", shortName: "Punjab Police" },
  { slug: "sindh-police", name: "Sindh Police", shortName: "Sindh Police" },
  { slug: "kp-police", name: "Khyber Pakhtunkhwa Police", shortName: "KP Police" },
  { slug: "balochistan-police", name: "Balochistan Police", shortName: "Balochistan Police" },
  { slug: "pak-army", name: "Pakistan Army", shortName: "Pakistan Army" },
  { slug: "paf", name: "Pakistan Air Force", shortName: "PAF" },
  { slug: "pak-navy", name: "Pakistan Navy", shortName: "Pakistan Navy" },
  { slug: "fc", name: "Frontier Corps", shortName: "FC" },
  { slug: "rangers", name: "Pakistan Rangers", shortName: "Rangers" },
  { slug: "asf", name: "Airport Security Force", shortName: "ASF" },
  { slug: "fia", name: "Federal Investigation Agency", shortName: "FIA" },
  { slug: "ib", name: "Intelligence Bureau", shortName: "IB" },
  { slug: "nab", name: "National Accountability Bureau", shortName: "NAB" },
  { slug: "fbr", name: "Federal Board of Revenue", shortName: "FBR" },
  { slug: "pak-railways", name: "Pakistan Railways", shortName: "Pakistan Railways" },
  { slug: "wapda", name: "Water & Power Development Authority", shortName: "WAPDA" },
  { slug: "nadra", name: "National Database & Registration Authority", shortName: "NADRA" },
  { slug: "sbp", name: "State Bank of Pakistan", shortName: "SBP" },
  { slug: "nbp", name: "National Bank of Pakistan", shortName: "NBP" },
  { slug: "ibp", name: "Institute of Bankers Pakistan", shortName: "IBP" },
  { slug: "icap", name: "Institute of Chartered Accountants of Pakistan", shortName: "ICAP" },
  { slug: "icma", name: "Institute of Cost & Management Accountants", shortName: "ICMA" },
  { slug: "acca", name: "Association of Chartered Certified Accountants", shortName: "ACCA" },
  { slug: "pmi", name: "Project Management Institute", shortName: "PMI" },
  { slug: "pleb", name: "Punjab Legal Education Board", shortName: "PLEB" },
  { slug: "tevt", name: "Technical Education & Vocational Training Authority", shortName: "TEVTA" },
  { slug: "radio-pakistan", name: "Radio Pakistan", shortName: "Radio Pakistan" },
];
