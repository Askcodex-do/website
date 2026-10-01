/**
 * Client-safe class name helper. Kept separate from `@/lib/utils` because that
 * module imports `node:crypto` for server-side hashing, which cannot be bundled
 * into client components.
 */
export function classNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
