"use client";

import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Banner } from "@/types";
import { toast } from "sonner";

export function AdminBanners({ banners }: { banners: Banner[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Button onClick={() => toast.info("Connect Sanity to persist changes")}>
          <Plus className="h-4 w-4 mr-2" /> Add Banner
        </Button>
      </div>
      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[560px]">
          <TableHeader>
            <TableRow>
              <TableHead>Banner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {banner.imageUrl && (
                      <div className="relative h-10 w-16 rounded overflow-hidden bg-muted">
                        <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                      </div>
                    )}
                    <span className="font-medium">{banner.title}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{banner.type}</Badge></TableCell>
                <TableCell><Badge variant={banner.active ? "default" : "secondary"}>{banner.active ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell>{banner.order}</TableCell>
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
