"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Brand } from "@/types";
import { toast } from "sonner";

export function AdminBrands({ brands }: { brands: Brand[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Brands</h1>
        <Button onClick={() => toast.info("Connect Sanity to persist changes")}>
          <Plus className="h-4 w-4 mr-2" /> Add Brand
        </Button>
      </div>
      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[480px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand._id}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell>{brand.slug.current}</TableCell>
                <TableCell>{brand.website || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
