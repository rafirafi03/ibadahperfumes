import { getDashboardStats } from "@/services/content-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Grid3x3, Users, ShoppingBag } from "lucide-react";
import { formatPrice, formatDate } from "@/utils/format";
import { ORDER_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package },
    { title: "Categories", value: stats.totalCategories, icon: Grid3x3 },
    { title: "Users", value: stats.totalUsers, icon: Users },
    { title: "Order Requests", value: stats.totalOrderRequests, icon: ShoppingBag },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="label-caps mb-2">Overview</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/60 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-xl bg-muted">
                <stat.icon className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="font-heading text-4xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 shadow-sm rounded-2xl">
        <CardHeader className="border-b border-border/60 pb-4">
          <p className="label-caps mb-1">Activity</p>
          <CardTitle className="font-heading text-xl font-medium">Recent Order Requests</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          {stats.recentOrders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-1">
              {stats.recentOrders.map((order) => {
                const status = ORDER_STATUSES.find((s) => s.value === order.status);
                return (
                  <div
                    key={order._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-4 border-b border-border/40 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm tracking-wide">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {order.customer.name} · {order._createdAt && formatDate(order._createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-sm">{formatPrice(order.grandTotal)}</span>
                      <Badge className={cn(status?.color, "rounded-full text-[10px] uppercase tracking-wider")}>
                        {status?.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
