"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { exportAllData, importAllData, resetAllData, type ExportedData } from "@/lib/store/exportImport";
import { createClient } from "@/lib/supabase/client";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download, Upload, Trash2, LogOut } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const user = useSupabaseUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImport, setPendingImport] = useState<ExportedData | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleExport() {
    const payload = exportAllData();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-fast-track-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setPendingImport(parsed);
      } catch {
        setError("File tidak bisa dibaca. Pastikan ini adalah file backup JSON yang valid.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function confirmImport() {
    if (!pendingImport) return;
    try {
      importAllData(pendingImport);
      setPendingImport(null);
      router.refresh();
    } catch {
      setError("Gagal mengimpor data. File mungkin tidak valid.");
      setPendingImport(null);
    }
  }

  function confirmReset() {
    resetAllData();
    setResetOpen(false);
    router.push("/onboarding");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Pengaturan"
        description="Data tersimpan otomatis ke akunmu — bisa diakses dari perangkat mana pun setelah login."
      />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Akun</CardTitle>
            <CardDescription>{user?.email ?? "-"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Backup Data</CardTitle>
            <CardDescription>
              Unduh seluruh progresmu sebagai file JSON — cadangan tambahan di luar penyimpanan cloud.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pulihkan dari Backup</CardTitle>
            <CardDescription>
              Mengimpor file backup akan menimpa seluruh data di akunmu saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" /> Import Data
            </Button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-sm text-red-700">Reset Semua Data</CardTitle>
            <CardDescription>
              Menghapus semua progres (onboarding, quiz, lesson, tugas, portofolio, lamaran,
              networking, interview) dari akunmu dan mengulang dari awal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={() => setResetOpen(true)}>
              <Trash2 className="h-4 w-4" /> Reset Semua Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!pendingImport} onOpenChange={(open) => !open && setPendingImport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timpa data saat ini?</DialogTitle>
            <DialogDescription>
              Semua data yang ada di browser ini akan digantikan dengan isi file backup. Tindakan ini
              tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingImport(null)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmImport}>
              Ya, Timpa Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset semua data?</DialogTitle>
            <DialogDescription>
              Semua progres belajar, tugas, portofolio, lamaran kerja, networking, dan interview akan
              dihapus permanen dari akunmu.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmReset}>
              Ya, Hapus Semua
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
