import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";

/** Shared helpers for JSON API routes: consistent envelopes and validation. */

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function jsonError(
  message: string,
  status = 400,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public extra?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Parse and validate a JSON body, throwing ApiError(422) on failure. */
export async function parseJson<T>(
  request: Request,
  schema: ZodSchema<T>,
): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new ApiError(400, "Request body must be valid JSON");
  }
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError(422, "Validation failed", {
        issues: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    throw error;
  }
}

/**
 * Wrap a route handler so thrown ApiErrors become clean JSON responses and
 * unexpected errors are logged without leaking internals to the client.
 */
export function routeHandler(
  handler: (request: Request, context: { params: Promise<Record<string, string>> }) => Promise<Response>,
) {
  return async (
    request: Request,
    context: { params: Promise<Record<string, string>> },
  ): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return jsonError(error.message, error.status, error.extra);
      }
      console.error("[api] unhandled error", error);
      return jsonError("Something went wrong. Please try again.", 500);
    }
  };
}

/** Basic same-origin check to mitigate CSRF on state-changing requests. */
export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) return; // same-origin form posts may omit Origin
  const host = request.headers.get("host");
  try {
    if (host && new URL(origin).host !== host) {
      throw new ApiError(403, "Cross-origin request blocked");
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(403, "Invalid origin");
  }
}
