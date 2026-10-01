/**
 * Runtime server guard.
 *
 * Equivalent intent to the `server-only` package but tolerant of plain Node
 * runtimes (tests, seed scripts, CLI tasks). Any attempt to evaluate this module
 * in a browser bundle throws immediately.
 */
if (typeof window !== "undefined") {
  throw new Error(
    "This module can only be used on the server. It must not be imported into a client bundle.",
  );
}

export {};
