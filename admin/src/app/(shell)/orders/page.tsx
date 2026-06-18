"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrderRequests } from "@/services/content-service";
import { updateOrderStatusAction } from "@/actions/order-actions";
import { formatPrice, formatDate } from "@/utils/format";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderRequest } from "@/types";
import { toast } from "sonner";
import { Download, MessageCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRequest[]>([]);

  useEffect(() => {
    getOrderRequests().then(setOrders);
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatusAction(orderId, status);
    setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: status as OrderRequest["status"] } : o));
    toast.success("Status updated");
  };

  const handleExport = () => {
    const csv = [
      ["Order Number", "Customer", "Phone", "Total", "Status", "Date"].join(","),
      ...orders.map((o) => [o.orderNumber, o.customer.name, o.customer.phone, o.grandTotal, o.status, o._createdAt].join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    toast.success("Orders exported");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h1 className="font-heading text-xl sm:text-2xl font-semibold">Order Requests</h1>
        <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto shrink-0">
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order._createdAt && formatDate(order._createdAt)}</p>
                </TableCell>
                <TableCell>
                  <p>{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                </TableCell>
                <TableCell>{order.totalItems}</TableCell>
                <TableCell className="font-semibold">{formatPrice(order.grandTotal)}</TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(v) => v && handleStatusChange(order._id, v)}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`https://wa.me/${order.customer.phone}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
