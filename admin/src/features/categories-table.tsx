"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Category } from "@/types";
import { toast } from "sonner";

export function AdminCategories({ categories }: { categories: Category[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => toast.info("Connect Sanity to persist changes")}>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>
      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[560px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.productCount || 0}</TableCell>
                <TableCell>{cat.featured ? <Badge>Featured</Badge> : "-"}</TableCell>
                <TableCell>{cat.order}</TableCell>
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
