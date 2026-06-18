"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { settingsSchema, type SettingsInput } from "@/validations/product";
import type { StoreSettings } from "@/types";
import { toast } from "sonner";

export function AdminSettings({ settings }: { settings: StoreSettings }) {
  const { register, handleSubmit } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      storeName: settings.storeName,
      storeDescription: settings.storeDescription,
      whatsappNumber: settings.whatsappNumber,
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
    },
  });

  const onSubmit = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Store Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle>General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Store Name</Label><Input {...register("storeName")} /></div>
            <div><Label>Description</Label><Textarea {...register("storeDescription")} rows={3} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>WhatsApp Number</Label><Input {...register("whatsappNumber")} placeholder="919876543210" /></div>
            <div><Label>Email</Label><Input {...register("email")} /></div>
            <div><Label>Phone</Label><Input {...register("phone")} /></div>
            <div><Label>Address</Label><Textarea {...register("address")} rows={2} /></div>
          </CardContent>
        </Card>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
