import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logoutAction } from "@admin/actions/auth-actions";
import {
  LayoutDashboard, Package, Grid3x3, Tag, ShoppingBag,
  Users, Image as ImageIcon, Ticket, Settings, LogOut, Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_NAV, APP_NAME, STORE_URL } from "@admin/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Package, Grid3x3, Tag, ShoppingBag, Users, Image: ImageIcon, Ticket, Settings,
};

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login");

  return (
    <div className="flex min-h-screen bg-background flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-sidebar text-sidebar-foreground hidden md:flex flex-col border-r border-sidebar-border shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex flex-col gap-0.5">
            <span className="font-heading text-xl font-semibold tracking-wide text-sidebar-foreground">
              {APP_NAME}
            </span>
            <span className="label-caps text-sidebar-foreground/50 text-[0.6rem]">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                  "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
                )}
              >
                <Icon className="h-4 w-4 opacity-70 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent"
            asChild
          >
            <a href={STORE_URL}><Store className="h-4 w-4 mr-2" /> View Store</a>
          </Button>
          <form action={async () => { "use server"; await logoutAction(); redirect("/login"); }}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              type="submit"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="md:hidden border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
          <div className="p-3 sm:p-4 flex items-center justify-between gap-2">
            <Link href="/" className="font-heading text-lg font-semibold truncate min-w-0">Admin</Link>
            <Button variant="outline" size="sm" className="rounded-full border-sidebar-border text-sidebar-foreground shrink-0" asChild>
              <a href={STORE_URL}>Store</a>
            </Button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 scrollbar-none">
            {ADMIN_NAV.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-sidebar-accent/60 text-sidebar-foreground/90 hover:bg-sidebar-accent shrink-0"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-10 max-w-6xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
