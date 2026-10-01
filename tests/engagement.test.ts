import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  getUserQuestionFlags,
  listBookmarkedQuestions,
  listLikedQuestions,
} from "@/services/engagement";
import { search } from "@/services/search";
import { db, setupFixtures, teardownFixtures, type TestFixtures } from "./helpers/db";

/** Bookmarks, likes and search — all exercised against the real database. */

let fixtures: TestFixtures;

beforeAll(async () => {
  await teardownFixtures();
  fixtures = await setupFixtures();
});

afterAll(async () => {
  await teardownFixtures();
});

describe("bookmarks and likes", () => {
  it("reflects a user's bookmark and like state for a question", async () => {
    const questionId = fixtures.questionIds[0];
    await db.bookmark.create({ data: { userId: fixtures.userId, questionId } });
    await db.like.create({ data: { userId: fixtures.userId, questionId } });

    const flags = await getUserQuestionFlags(fixtures.userId, questionId);
    expect(flags).toEqual({ bookmarked: true, liked: true });

    const bookmarks = await listBookmarkedQuestions(fixtures.userId);
    expect(bookmarks.some((q) => q.id === questionId)).toBe(true);

    const likes = await listLikedQuestions(fixtures.userId);
    expect(likes.some((q) => q.id === questionId)).toBe(true);
  });

  it("reports no engagement for an anonymous user", async () => {
    const flags = await getUserQuestionFlags(null, fixtures.questionIds[0]);
    expect(flags).toEqual({ bookmarked: false, liked: false });
  });
});

describe("search", () => {
  it("finds questions by stem text", async () => {
    const results = await search("Test question number 1", { limit: 5 });
    expect(results.total.questions).toBeGreaterThan(0);
    expect(results.questions.length).toBeGreaterThan(0);
  });

  it("returns nothing for a query shorter than two characters", async () => {
    const results = await search("a");
    expect(results.questions).toHaveLength(0);
    expect(results.total.questions).toBe(0);
  });

  it("does not expose correct answers in search results", async () => {
    const results = await search("Test question", { limit: 5 });
    for (const question of results.questions) {
      for (const option of question.options) {
        expect(option).not.toHaveProperty("isCorrect");
      }
    }
  });
});
