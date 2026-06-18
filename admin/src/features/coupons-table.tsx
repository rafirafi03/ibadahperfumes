"use client";

import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/format";
import type { Coupon } from "@/types";
import { toast } from "sonner";

export function AdminCoupons({ coupons }: { coupons: Coupon[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Button onClick={() => toast.info("Connect Sanity to persist changes")}>
          <Plus className="h-4 w-4 mr-2" /> Add Coupon
        </Button>
      </div>
      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[520px]">
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                <TableCell>
                  {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : formatPrice(coupon.discountValue)}
                </TableCell>
                <TableCell>{coupon.usedCount}/{coupon.usageLimit}</TableCell>
                <TableCell><Badge variant={coupon.active ? "default" : "secondary"}>{coupon.active ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
