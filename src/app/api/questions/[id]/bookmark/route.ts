import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ApiError, assertSameOrigin, jsonOk, routeHandler } from "@/lib/api";

export const runtime = "nodejs";

/** POST /api/questions/[id]/bookmark — toggle a bookmark for the signed-in user. */
export const POST = routeHandler(async (request, context) => {
  assertSameOrigin(request);
  const { id } = await context.params;

  const user = await getCurrentUser();
  if (!user) throw new ApiError(401, "Sign in to save questions.");

  const question = await db.question.findFirst({
    where: { id, status: "PUBLISHED" },
    select: { id: true },
  });
  if (!question) throw new ApiError(404, "Question not found");

  const existing = await db.bookmark.findUnique({
    where: { userId_questionId: { userId: user.id, questionId: id } },
  });

  if (existing) {
    await db.$transaction([
      db.bookmark.delete({ where: { id: existing.id } }),
      db.question.update({
        where: { id },
        data: { bookmarkCount: { decrement: 1 } },
      }),
    ]);
    return jsonOk({ bookmarked: false });
  }

  await db.$transaction([
    db.bookmark.create({ data: { userId: user.id, questionId: id } }),
    db.question.update({
      where: { id },
      data: { bookmarkCount: { increment: 1 } },
    }),
  ]);
  return jsonOk({ bookmarked: true });
});
