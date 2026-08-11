"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Briefcase,
  Send,
  Users,
  MessageSquare,
  Target,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { useIsAdmin } from "@/lib/supabase/useIsAdmin";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Belajar", icon: BookOpen },
  { href: "/tasks", label: "Tugas Praktik", icon: ClipboardCheck },
  { href: "/portfolio", label: "Portofolio", icon: Briefcase },
  { href: "/applications", label: "Lamaran Kerja", icon: Send },
  { href: "/networking", label: "Networking", icon: Users },
  { href: "/interview", label: "Persiapan Interview", icon: MessageSquare },
  { href: "/skills", label: "Peta Skill", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useSupabaseUser();
  const isAdmin = useIsAdmin(user);

  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-200 bg-white sm:flex sm:flex-col">
      <div className="px-5 py-5">
        <Link href="/dashboard" className="text-sm font-semibold tracking-tight text-zinc-900">
          SEO Fast-Track
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-900 text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-0.5 px-3 pb-4">
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/admin")
                ? "bg-zinc-900 text-zinc-50"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        )}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith("/settings")
              ? "bg-zinc-900 text-zinc-50"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          )}
        >
          <Settings className="h-4 w-4" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}
