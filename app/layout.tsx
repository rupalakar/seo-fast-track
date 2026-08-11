import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "SEO Fast-Track",
  description: "Ruang kerja karier untuk menjadi SEO specialist yang siap kerja.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
