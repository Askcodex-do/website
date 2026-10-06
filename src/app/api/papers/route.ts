import { z } from "zod";
import {
  ApiError,
  assertSameOrigin,
  jsonOk,
  parseJson,
  routeHandler,
} from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { rateLimitByIp } from "@/lib/rate-limit";
import {
  generatePaper,
  listRecentGeneratedPapers,
  PaperError,
} from "@/services/paper-generator";

export const runtime = "nodejs";

const generateSchema = z.object({
  kind: z.enum(["MOCK", "SUBJECT", "TOPIC", "DIFFICULTY", "GUESS", "RANDOM"]),
  exam: z.string().min(1).max(120).optional(),
  subject: z.string().min(1).max(120).optional(),
  topic: z.string().min(1).max(120).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  count: z.coerce.number().int().min(1).max(100).optional(),
  timeLimitMinutes: z.coerce.number().int().min(0).max(600).nullable().optional(),
  title: z.string().min(1).max(160).optional(),
});

/** Recent generated papers (public list). */
export const GET = routeHandler(async () => {
  const papers = await listRecentGeneratedPapers(20);
  return jsonOk(
    papers.map((paper) => ({
      id: paper.id,
      slug: paper.slug,
      title: paper.title,
      kind: paper.kind,
      questionCount: paper.questionCount,
      createdAt: paper.createdAt.toISOString(),
      exam: paper.exam,
    })),
  );
});

/** Generate a new practice paper. Available to guests and logged-in users. */
export const POST = routeHandler(async (request) => {
  assertSameOrigin(request);

  const limited = await rateLimitByIp("paper:generate", 20, 60);
  if (!limited.allowed) {
    throw new ApiError(429, "Too many papers generated. Please slow down.");
  }

  const input = await parseJson(request, generateSchema);
  const user = await getCurrentUser();

  try {
    const paper = await generatePaper({
      ...input,
      userId: user?.id ?? null,
    });
    return jsonOk(paper, { status: 201 });
  } catch (error) {
    if (error instanceof PaperError) {
      throw new ApiError(
        error.code === "NO_QUESTIONS" ? 404 : 400,
        error.message,
      );
    }
    throw error;
  }
});
