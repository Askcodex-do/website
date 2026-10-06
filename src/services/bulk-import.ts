import "@/lib/server-guard";

import ExcelJS from "exceljs";
import { z } from "zod";
import { db } from "@/lib/db";
import { audit } from "@/lib/audit";
import { contentHash } from "@/lib/utils";
import { slugify } from "@/services/admin";

/**
 * BulkImportService — parses CSV/Excel uploads into validated question rows,
 * reporting per-row errors instead of failing the whole file.
 *
 * The importer never trusts the file: every row is validated, duplicates are
 * detected against both the file and the database, and only valid rows are
 * inserted. Administrators get a full report they can act on.
 */

export const IMPORT_COLUMNS = [
  "question",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "correct_answer",
  "explanation",
  "subject",
  "topic",
  "exam",
  "education_level",
  "difficulty",
  "year",
  "source",
  "tags",
] as const;

export interface ImportRow {
  rowNumber: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  subject: string;
  topic: string;
  exams: string[];
  educationLevels: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  year?: number;
  source: string;
  tags: string[];
}

export interface ImportError {
  rowNumber: number;
  field?: string;
  message: string;
}

export interface ImportPreview {
  totalRows: number;
  valid: ImportRow[];
  errors: ImportError[];
  duplicateInFile: number;
  duplicateInDatabase: number;
}

interface RawRow {
  rowNumber: number;
  values: Record<string, string>;
}

const LETTERS: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
const DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);

/** Convert an uploaded file buffer into raw string rows. */
export async function parseUpload(
  buffer: Buffer,
  filename: string,
): Promise<RawRow[]> {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".csv")) return parseCsv(buffer.toString("utf8"));
  if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) return parseExcel(buffer);
  throw new Error("Unsupported file type. Upload a .csv or .xlsx file.");
}

function parseCsv(text: string): RawRow[] {
  const rows = splitCsv(text);
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).flatMap((cells, index) => {
    if (cells.every((c) => !c.trim())) return [];
    const values: Record<string, string> = {};
    header.forEach((key, i) => {
      values[key] = (cells[i] ?? "").trim();
    });
    return [{ rowNumber: index + 2, values }];
  });
}

/** Minimal RFC-4180 CSV splitter — handles quoted fields and embedded commas. */
function splitCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (inQuotes) {
      if (char === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function parseExcel(buffer: Buffer): Promise<RawRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
  const sheet = workbook.worksheets[0];
  if (!sheet) return [];

  const header: string[] = [];
  sheet.getRow(1).eachCell((cell, col) => {
    header[col] = String(cell.value ?? "").trim().toLowerCase();
  });

  const rows: RawRow[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const values: Record<string, string> = {};
    let hasContent = false;
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      const key = header[col];
      if (!key) return;
      const text = cellToText(cell.value).trim();
      values[key] = text;
      if (text) hasContent = true;
    });
    if (hasContent) rows.push({ rowNumber, values });
  });
  return rows;
}

function cellToText(value: ExcelJS.CellValue): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    if ("text" in value && typeof value.text === "string") return value.text;
    if ("result" in value) return String((value as { result: unknown }).result ?? "");
    if ("richText" in value) {
      return (value as ExcelJS.CellRichTextValue).richText
        .map((part) => part.text)
        .join("");
    }
  }
  return String(value);
}

const rowSchema = z.object({
  question: z.string().trim().min(5, "Question text is required"),
  option_a: z.string().trim().min(1, "Option A is required"),
  option_b: z.string().trim().min(1, "Option B is required"),
  option_c: z.string().trim().min(1, "Option C is required"),
  option_d: z.string().trim().min(1, "Option D is required"),
  correct_answer: z.string().trim().min(1, "Correct answer is required"),
  subject: z.string().trim().min(1, "Subject is required"),
  topic: z.string().trim().min(1, "Topic is required"),
});

function parseCorrectIndex(raw: string): number | null {
  const value = raw.trim().toLowerCase();
  if (value in LETTERS) return LETTERS[value];
  const numeric = Number.parseInt(value, 10);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= 4) return numeric - 1;
  if (Number.isInteger(numeric) && numeric >= 0 && numeric <= 3) return numeric;
  return null;
}

/**
 * Validate every row, resolving subject/topic/exam/level names against the
 * database so the preview reflects exactly what would be inserted.
 */
export async function buildImportPreview(
  rawRows: RawRow[],
): Promise<ImportPreview> {
  const [subjects, topics, exams, levels] = await Promise.all([
    db.subject.findMany({ select: { id: true, slug: true, name: true } }),
    db.topic.findMany({ select: { id: true, slug: true, name: true } }),
    db.exam.findMany({ select: { slug: true, name: true } }),
    db.educationLevel.findMany({ select: { slug: true, name: true } }),
  ]);

  const subjectByKey = indexByName(subjects);
  const topicByKey = indexByName(topics);
  const examByKey = indexByName(exams);
  const levelByKey = indexByName(levels);

  const errors: ImportError[] = [];
  const valid: ImportRow[] = [];
  const seenHashes = new Set<string>();
  let duplicateInFile = 0;

  for (const raw of rawRows) {
    const parsed = rowSchema.safeParse(raw.values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push({
          rowNumber: raw.rowNumber,
          field: issue.path.join("."),
          message: issue.message,
        });
      }
      continue;
    }
    const row = parsed.data;

    const correctIndex = parseCorrectIndex(row.correct_answer);
    if (correctIndex === null) {
      errors.push({
        rowNumber: raw.rowNumber,
        field: "correct_answer",
        message: "Use A, B, C, D or 1–4 to indicate the correct option",
      });
      continue;
    }

    const subject = subjectByKey.get(normalize(row.subject));
    if (!subject) {
      errors.push({
        rowNumber: raw.rowNumber,
        field: "subject",
        message: `Unknown subject "${row.subject}"`,
      });
      continue;
    }
    const topic = topicByKey.get(normalize(row.topic));
    if (!topic) {
      errors.push({
        rowNumber: raw.rowNumber,
        field: "topic",
        message: `Unknown topic "${row.topic}"`,
      });
      continue;
    }

    const options: [string, string, string, string] = [
      row.option_a,
      row.option_b,
      row.option_c,
      row.option_d,
    ];
    if (new Set(options.map((o) => normalize(o))).size !== 4) {
      errors.push({
        rowNumber: raw.rowNumber,
        field: "options",
        message: "Options must be four distinct values",
      });
      continue;
    }

    const difficultyRaw = (raw.values.difficulty ?? "").trim().toUpperCase();
    const difficulty = DIFFICULTIES.has(difficultyRaw)
      ? (difficultyRaw as "EASY" | "MEDIUM" | "HARD")
      : "MEDIUM";

    const yearRaw = (raw.values.year ?? "").trim();
    const year = /^\d{4}$/.test(yearRaw) ? Number.parseInt(yearRaw, 10) : undefined;

    const examSlugs = splitList(raw.values.exam)
      .map((name) => examByKey.get(normalize(name))?.slug)
      .filter((slug): slug is string => Boolean(slug));
    const educationLevels = splitList(raw.values.education_level)
      .map((name) => levelByKey.get(normalize(name))?.slug)
      .filter((slug): slug is string => Boolean(slug));

    const hash = contentHash({
      stem: row.question,
      options,
      correct: options[correctIndex],
    });
    if (seenHashes.has(hash)) {
      duplicateInFile++;
      errors.push({
        rowNumber: raw.rowNumber,
        message: "Duplicate of an earlier row in this file",
      });
      continue;
    }
    seenHashes.add(hash);

    valid.push({
      rowNumber: raw.rowNumber,
      question: row.question,
      options,
      correctIndex,
      explanation: (raw.values.explanation ?? "").trim(),
      subject: subject.slug,
      topic: topic.slug,
      exams: examSlugs,
      educationLevels,
      difficulty,
      year,
      source: (raw.values.source ?? "").trim(),
      tags: splitList(raw.values.tags),
    });
  }

  // Existing duplicates are checked in one query rather than row by row.
  const hashes = valid.map((row) =>
    contentHash({
      stem: row.question,
      options: row.options,
      correct: row.options[row.correctIndex],
    }),
  );
  const existing = hashes.length
    ? await db.question.findMany({
        where: { contentHash: { in: hashes } },
        select: { contentHash: true },
      })
    : [];
  const existingSet = new Set(existing.map((e) => e.contentHash));
  const deduped = valid.filter(
    (row) =>
      !existingSet.has(
        contentHash({
          stem: row.question,
          options: row.options,
          correct: row.options[row.correctIndex],
        }),
      ),
  );
  const duplicateInDatabase = valid.length - deduped.length;

  return {
    totalRows: rawRows.length,
    valid: deduped,
    errors,
    duplicateInFile,
    duplicateInDatabase,
  };
}

export interface CommitResult {
  inserted: number;
  skipped: number;
}

/** Insert the validated rows from a preview. */
export async function commitImport(
  rows: ImportRow[],
  actorId: string,
): Promise<CommitResult> {
  if (rows.length === 0) return { inserted: 0, skipped: 0 };

  const [subjects, topics, exams, levels] = await Promise.all([
    db.subject.findMany({ select: { id: true, slug: true } }),
    db.topic.findMany({ select: { id: true, slug: true } }),
    db.exam.findMany({ select: { id: true, slug: true } }),
    db.educationLevel.findMany({ select: { id: true, slug: true } }),
  ]);
  const subjectId = new Map(subjects.map((s) => [s.slug, s.id]));
  const topicId = new Map(topics.map((t) => [t.slug, t.id]));
  const examId = new Map(exams.map((e) => [e.slug, e.id]));
  const levelId = new Map(levels.map((l) => [l.slug, l.id]));

  const LABELS = ["A", "B", "C", "D"];
  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const subject = subjectId.get(row.subject);
    const topic = topicId.get(row.topic);
    if (!subject || !topic) {
      skipped++;
      continue;
    }

    const slug = await uniqueImportSlug(slugify(row.question));
    const hash = contentHash({
      stem: row.question,
      options: row.options,
      correct: row.options[row.correctIndex],
    });

    try {
      await db.question.create({
        data: {
          slug,
          stem: row.question,
          explanation: row.explanation || null,
          source: row.source || null,
          difficulty: row.difficulty,
          status: "PUBLISHED",
          year: row.year ?? null,
          contentHash: hash,
          createdById: actorId,
          publishedAt: new Date(),
          options: {
            create: row.options.map((text, index) => ({
              label: LABELS[index],
              text,
              isCorrect: index === row.correctIndex,
              sortOrder: index,
            })),
          },
          subjects: { create: { subjectId: subject } },
          topics: { create: { topicId: topic } },
          exams: {
            create: row.exams
              .map((slug) => examId.get(slug))
              .filter((id): id is string => Boolean(id))
              .map((id) => ({ examId: id })),
          },
          educationLevels: {
            create: row.educationLevels
              .map((slug) => levelId.get(slug))
              .filter((id): id is string => Boolean(id))
              .map((id) => ({ educationLevelId: id })),
          },
        },
      });
      inserted++;
    } catch {
      // A unique-constraint collision (e.g. slug race) is skipped, not fatal.
      skipped++;
    }
  }

  await audit({
    actorId,
    action: "question.bulk_import",
    entityType: "question",
    metadata: { inserted, skipped },
  });

  return { inserted, skipped };
}

async function uniqueImportSlug(base: string): Promise<string> {
  const root = base || "imported-question";
  let candidate = root;
  let counter = 1;
  for (;;) {
    const existing = await db.question.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${root}-${++counter}`;
  }
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[|;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function indexByName<T extends { slug: string; name: string }>(items: T[]) {
  const map = new Map<string, T>();
  for (const item of items) {
    map.set(normalize(item.name), item);
    map.set(normalize(item.slug), item);
  }
  return map;
}
