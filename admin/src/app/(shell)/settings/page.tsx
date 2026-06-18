import { getSettings } from "@/services/content-service";
import { AdminSettings } from "@admin/features/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Store Settings</h1>
      <AdminSettings settings={settings} />
    </div>
  );
}
