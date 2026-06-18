"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminLoginAction } from "@admin/actions/auth-actions";
import { APP_NAME, STORE_URL } from "@admin/lib/constants";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await adminLoginAction(formData);
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="label-caps mb-2">{APP_NAME}</p>
          <h1 className="font-heading text-3xl font-semibold">Admin Sign In</h1>
          <p className="text-sm text-muted-foreground mt-2">
            <Link href={STORE_URL} className="hover:text-foreground transition-colors">
              ← Back to store
            </Link>
          </p>
        </div>
        <Card className="border-border/60 shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="font-heading text-xl font-medium">Administrator</CardTitle>
            <CardDescription>Sign in to manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input name="email" type="email" required className="h-11 rounded-xl" defaultValue="admin@luxestore.com" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input name="password" type="password" required className="h-11 rounded-xl" />
              </div>
              <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
