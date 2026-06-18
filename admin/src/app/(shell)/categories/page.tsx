import { getCategories } from "@/services/content-service";
import { AdminCategories } from "@admin/features/categories-table";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Categories</h1>
      <AdminCategories categories={categories} />
    </div>
  );
}
