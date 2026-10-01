import { ApiError, assertSameOrigin, jsonOk, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import { buildImportPreview, commitImport, parseUpload } from "@/services/bulk-import";
import { rateLimitByIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
// Uploads are parsed with ExcelJS, which needs the Node.js runtime.
export const maxDuration = 60;

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB is ~50k CSV rows.

/**
 * POST /api/admin/import
 *
 * Multipart upload. `mode=preview` validates and reports without writing;
 * `mode=commit` inserts the validated rows. The file is validated (extension,
 * size, content) before any parsing.
 */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);
  const user = await requireAdminApi("question:write");

  const limit = await rateLimitByIp("bulk-import", 20, 60 * 60);
  if (!limit.allowed) {
    throw new ApiError(429, "Too many import attempts. Please wait and try again.");
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) throw new ApiError(400, "Expected a multipart form upload");

  const mode = formData.get("mode") === "commit" ? "commit" : "preview";
  const file = formData.get("file");
  if (!(file instanceof File)) throw new ApiError(422, "No file was uploaded");
  if (file.size === 0) throw new ApiError(422, "The uploaded file is empty");
  if (file.size > MAX_FILE_BYTES) {
    throw new ApiError(413, "File is too large. Maximum size is 8 MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let rawRows;
  try {
    rawRows = await parseUpload(buffer, file.name);
  } catch (error) {
    throw new ApiError(
      422,
      error instanceof Error ? error.message : "Could not read the uploaded file",
    );
  }

  if (rawRows.length === 0) {
    throw new ApiError(422, "No data rows were found in the file");
  }

  const preview = await buildImportPreview(rawRows);

  if (mode === "commit") {
    const result = await commitImport(preview.valid, user.id);
    return jsonOk({
      mode: "commit",
      inserted: result.inserted,
      skipped: result.skipped,
      errors: preview.errors.slice(0, 200),
      totalRows: preview.totalRows,
    });
  }

  return jsonOk({
    mode: "preview",
    totalRows: preview.totalRows,
    validCount: preview.valid.length,
    duplicateInFile: preview.duplicateInFile,
    duplicateInDatabase: preview.duplicateInDatabase,
    errors: preview.errors.slice(0, 200),
    sample: preview.valid.slice(0, 10).map((row) => ({
      rowNumber: row.rowNumber,
      question: row.question,
      subject: row.subject,
      topic: row.topic,
      difficulty: row.difficulty,
    })),
  });
});
