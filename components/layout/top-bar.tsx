"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { useIsAdmin } from "@/lib/supabase/useIsAdmin";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Belajar" },
  { href: "/tasks", label: "Tugas Praktik" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/applications", label: "Lamaran Kerja" },
  { href: "/networking", label: "Networking" },
  { href: "/interview", label: "Persiapan Interview" },
  { href: "/skills", label: "Peta Skill" },
  { href: "/settings", label: "Pengaturan" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useSupabaseUser();
  const isAdmin = useIsAdmin(user);
  const navItems = isAdmin ? [...NAV_ITEMS, { href: "/admin", label: "Admin" }] : NAV_ITEMS;

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 sm:hidden">
      <span className="text-sm font-semibold tracking-tight text-zinc-900">SEO Fast-Track</span>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Buka menu">
        <Menu className="h-5 w-5" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs">
          <DialogTitle>Menu</DialogTitle>
          <nav className="mt-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  pathname.startsWith(item.href)
                    ? "bg-zinc-900 text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
