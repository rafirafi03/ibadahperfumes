import { getBanners } from "@/services/content-service";
import { AdminBanners } from "@admin/features/banners-table";

export default async function AdminBannersPage() {
  const banners = await getBanners();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Banners</h1>
      <AdminBanners banners={banners} />
    </div>
  );
}
