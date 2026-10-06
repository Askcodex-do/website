import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  buildImportPreview,
  commitImport,
  parseUpload,
} from "@/services/bulk-import";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/**
 * Bulk import tests. The importer must validate rows, detect duplicates and
 * invalid answers, and insert only valid records — so each of those paths is
 * asserted against real file content.
 */

let fixtures: TestFixtures;

const HEADER =
  "question,option_a,option_b,option_c,option_d,correct_answer,explanation,subject,topic,exam,education_level,difficulty,year,source,tags";

function csv(...rows: string[]): Buffer {
  return Buffer.from([HEADER, ...rows].join("\n"), "utf8");
}

const IMPORT_STEMS = [
  "Import duplicate probe",
  "Commit test question alpha",
];

async function cleanImportRows() {
  await db.question.deleteMany({
    where: { OR: IMPORT_STEMS.map((stem) => ({ stem: { startsWith: stem } })) },
  });
}

beforeAll(async () => {
  await cleanImportRows();
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  // Committed import rows get slugs derived from their stem, so clean them by
  // the stems this file uses rather than by slug prefix.
  await cleanImportRows();
  await teardownFixtures();
});

describe("file parsing", () => {
  it("parses a CSV file into raw rows", async () => {
    const buffer = csv(
      `"What is 2+2?","4","3","5","6","A","Basic addition","Test Subject","Test Topic","Test Exam","Test Level","EASY","2024","","math"`,
    );
    const rows = await parseUpload(buffer, "questions.csv");
    expect(rows).toHaveLength(1);
    expect(rows[0].values.question).toBe("What is 2+2?");
    expect(rows[0].values.correct_answer).toBe("A");
  });

  it("rejects unsupported file types", async () => {
    await expect(parseUpload(Buffer.from("x"), "data.pdf")).rejects.toThrow(
      /Unsupported file type/,
    );
  });
});

describe("row validation", () => {
  it("accepts a fully valid row", async () => {
    const buffer = csv(
      `"Which planet is known as the Red Planet?","Mars","Venus","Jupiter","Saturn","A","Mars appears red due to iron oxide.","Test Subject","Test Topic","Test Exam","Test Level","MEDIUM","2023","NASA","space;planets"`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.errors).toHaveLength(0);
    expect(preview.valid).toHaveLength(1);
    expect(preview.valid[0].correctIndex).toBe(0);
    expect(preview.valid[0].difficulty).toBe("MEDIUM");
    expect(preview.valid[0].year).toBe(2023);
  });

  it("flags a missing required field", async () => {
    const buffer = csv(
      `"Incomplete row","A","B","C","D","A","","","Test Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.valid).toHaveLength(0);
    expect(preview.errors.some((e) => e.field === "subject")).toBe(true);
  });

  it("flags an invalid correct answer", async () => {
    const buffer = csv(
      `"Bad answer row","A","B","C","D","E","","Test Subject","Test Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.errors.some((e) => e.field === "correct_answer")).toBe(true);
  });

  it("flags an unknown subject or topic", async () => {
    const buffer = csv(
      `"Unknown taxonomy","A","B","C","D","B","","Nonexistent Subject","Nonexistent Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.errors.some((e) => e.field === "subject")).toBe(true);
  });

  it("flags duplicate options", async () => {
    const buffer = csv(
      `"Duplicate options","Same","Same","Other","Another","A","","Test Subject","Test Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.errors.some((e) => e.field === "options")).toBe(true);
  });

  it("detects duplicates within the file", async () => {
    const row = `"Repeated question","A","B","C","D","A","","Test Subject","Test Topic","","","","","",""`;
    const preview = await buildImportPreview(
      await parseUpload(csv(row, row), "q.csv"),
    );
    expect(preview.duplicateInFile).toBe(1);
    expect(preview.valid).toHaveLength(1);
  });

  it("detects duplicates already in the database", async () => {
    const row = `"Import duplicate probe","A","B","C","D","A","","Test Subject","Test Topic","","","","","",""`;
    const preview = await buildImportPreview(await parseUpload(csv(row), "q.csv"));
    expect(preview.valid).toHaveLength(1);

    // Insert it, then re-run the same file: the row must now be reported as an
    // existing duplicate rather than a new valid row.
    await commitImport(preview.valid, fixtures.adminId);
    const second = await buildImportPreview(await parseUpload(csv(row), "q.csv"));
    expect(second.duplicateInDatabase).toBe(1);
    expect(second.valid).toHaveLength(0);
  });

  it("parses the correct answer given as a number", async () => {
    const buffer = csv(
      `"Numeric answer row","A","B","C","D","2","","Test Subject","Test Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.valid[0].correctIndex).toBe(1);
  });
});

describe("commit", () => {
  it("inserts only the valid rows", async () => {
    const buffer = csv(
      `"Commit test question alpha","A","B","C","D","C","Explained.","Test Subject","Test Topic","Test Exam","Test Level","HARD","2022","",""`,
      `"Broken row","","B","C","D","A","","Test Subject","Test Topic","","","","","",""`,
    );
    const preview = await buildImportPreview(await parseUpload(buffer, "q.csv"));
    expect(preview.valid).toHaveLength(1);

    const result = await commitImport(preview.valid, fixtures.adminId);
    expect(result.inserted).toBe(1);
    expect(result.skipped).toBe(0);

    const created = await db.question.findFirst({
      where: { stem: "Commit test question alpha" },
      include: { options: true, subjects: true },
    });
    expect(created).not.toBeNull();
    expect(created!.options).toHaveLength(4);
    expect(created!.options.find((o) => o.isCorrect)?.label).toBe("C");
    expect(created!.subjects).toHaveLength(1);
  });
});
