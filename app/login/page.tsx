"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Mode = "sign-in" | "sign-up";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (!data.session) {
        setCheckEmail(true);
        return;
      }
      router.replace("/onboarding");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center text-sm font-semibold tracking-tight text-zinc-900">
          SEO Fast-Track
        </p>
        <Card className="p-6">
          {checkEmail ? (
            <div className="text-center">
              <h1 className="text-base font-semibold text-zinc-900">Cek email kamu</h1>
              <p className="mt-2 text-sm text-zinc-500">
                Kami sudah mengirim link konfirmasi ke <span className="font-medium">{email}</span>.
                Klik link tersebut lalu login kembali di sini.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => setCheckEmail(false)}>
                Kembali
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 className="mb-5 text-lg font-semibold text-zinc-900">
                {mode === "sign-in" ? "Masuk" : "Buat Akun"}
              </h1>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-1.5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    className="mt-1.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <Button type="submit" className="mt-5 w-full" disabled={loading}>
                {loading ? "Memproses..." : mode === "sign-in" ? "Masuk" : "Daftar"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "sign-in" ? "sign-up" : "sign-in");
                  setError(null);
                }}
                className="mt-4 w-full text-center text-xs text-zinc-500 hover:underline"
              >
                {mode === "sign-in"
                  ? "Belum punya akun? Daftar di sini"
                  : "Sudah punya akun? Masuk di sini"}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
