import { getUsers } from "@/services/content-service";
import { AdminCustomers } from "@admin/features/customers-table";

export default async function AdminCustomersPage() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Customers</h1>
      <AdminCustomers users={users} />
    </div>
  );
}
