import { requireAdmin } from "@/lib/admin-guard";
import {
  getFeatureFlags,
  getSeoSettings,
  getSiteIdentity,
  getSocialLinks,
} from "@/services/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin("settings:manage");
  const [identity, social, features, seo] = await Promise.all([
    getSiteIdentity(),
    getSocialLinks(),
    getFeatureFlags(),
    getSeoSettings(),
  ]);

  return (
    <section aria-labelledby="settings-heading" className="space-y-6">
      <div>
        <h2 id="settings-heading" className="text-xl font-bold">
          Website settings
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          These values are read from the database at render time — nothing here is
          hard-coded in the application.
        </p>
      </div>

      <SettingsForm group="site.identity" initial={identity} />
      <SettingsForm group="site.social" initial={social} />
      <SettingsForm group="site.features" initial={features} />
      <SettingsForm group="site.seo" initial={seo} />
    </section>
  );
}
