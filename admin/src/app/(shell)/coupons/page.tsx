import { getCoupons } from "@/services/content-service";
import { AdminCoupons } from "@admin/features/coupons-table";

export default async function AdminCouponsPage() {
  const coupons = await getCoupons();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Coupons</h1>
      <AdminCoupons coupons={coupons} />
    </div>
  );
}
