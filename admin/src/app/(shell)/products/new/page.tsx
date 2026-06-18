"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productSchema, type ProductInput } from "@/validations/product";
import { mockCategories, mockBrands } from "@/lib/mock-data";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { status: "active", stock: 0, price: 0 },
  });

  const onSubmit = () => {
    toast.success("Product created successfully");
    router.push("/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Name</Label><Input {...register("name")} />{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}</div>
            <div><Label>Slug</Label><Input {...register("slug")} />{errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}</div>
            <div><Label>Short Description</Label><Input {...register("shortDescription")} /></div>
            <div><Label>Description</Label><Textarea {...register("description")} rows={4} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pricing & Inventory</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Price</Label><Input type="number" {...register("price", { valueAsNumber: true })} /></div>
              <div><Label>Compare At Price</Label><Input type="number" {...register("compareAtPrice", { valueAsNumber: true })} /></div>
            </div>
            <div><Label>Stock</Label><Input type="number" {...register("stock", { valueAsNumber: true })} /></div>
            <div>
              <Label>Status</Label>
              <Select defaultValue="active" onValueChange={(v) => { if (typeof v === "string") setValue("status", v as "active" | "draft" | "archived"); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Category</Label>
              <Select onValueChange={(v) => { if (typeof v === "string") setValue("categoryId", v); }}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {mockCategories.map((c) => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Brand</Label>
              <Select onValueChange={(v) => { if (typeof v === "string") setValue("brandId", v); }}>
                <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                <SelectContent>
                  {mockBrands.map((b) => <SelectItem key={b._id} value={b._id}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2"><Switch onCheckedChange={(v) => setValue("featured", v)} /><Label>Featured</Label></div>
              <div className="flex items-center gap-2"><Switch onCheckedChange={(v) => setValue("isNewArrival", v)} /><Label>New Arrival</Label></div>
              <div className="flex items-center gap-2"><Switch onCheckedChange={(v) => setValue("isBestSeller", v)} /><Label>Best Seller</Label></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">Create Product</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
