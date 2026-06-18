import { getBrands } from "@/services/content-service";
import { AdminBrands } from "@admin/features/brands-table";

export default async function AdminBrandsPage() {
  const brands = await getBrands();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Brands</h1>
      <AdminBrands brands={brands} />
    </div>
  );
}
