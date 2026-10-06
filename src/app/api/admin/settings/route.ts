import { assertSameOrigin, jsonOk, parseJson, routeHandler } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin-guard";
import { updateSetting } from "@/services/settings";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  key: z.enum(["site.identity", "site.social", "site.features", "site.seo"]),
  value: z.record(z.string(), z.union([z.string(), z.boolean()])),
});

/** PUT /api/admin/settings — update a settings group. */
export const PUT = routeHandler(async (request) => {
  assertSameOrigin(request);
  const actor = await requireAdminApi("settings:manage");
  const input = await parseJson(request, schema);

  // A dedicated permission covers SEO-specific fields.
  if (input.key === "site.seo") {
    await requireAdminApi("seo:manage");
  }

  await updateSetting(input.key, input.value);
  return jsonOk({ key: input.key });
});

export const POST = PUT;
