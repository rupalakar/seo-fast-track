"use client";

import { useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatEntry {
  role: "user" | "assistant" | "error";
  content: string;
}

export function AskAiWidget({
  pageTitle,
  pageContext,
}: {
  pageTitle: string;
  pageContext: string;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    const question = input.trim();
    if (!question || loading) return;
    setEntries((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageTitle, pageContext, question }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEntries((prev) => [
          ...prev,
          { role: "error", content: data.error ?? "Terjadi kesalahan." },
        ]);
      } else {
        setEntries((prev) => [...prev, { role: "assistant", content: data.answer }]);
      }
    } catch {
      setEntries((prev) => [
        ...prev,
        { role: "error", content: "Gagal menghubungi server. Cek koneksi internetmu." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg sm:w-96">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Tanya AI</p>
              <p className="text-xs text-zinc-500">Seputar halaman ini</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {entries.length === 0 && (
              <p className="text-sm text-zinc-400">
                Ada bagian dari &ldquo;{pageTitle}&rdquo; yang belum kamu pahami? Tanya di sini.
              </p>
            )}
            {entries.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  entry.role === "user" && "ml-auto bg-zinc-900 text-zinc-50",
                  entry.role === "assistant" && "bg-zinc-100 text-zinc-800",
                  entry.role === "error" && "bg-red-50 text-red-700"
                )}
              >
                {entry.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> AI sedang berpikir...
              </div>
            )}
          </div>

          <div className="border-t border-zinc-200 p-3">
            <div className="flex items-end gap-2">
              <Textarea
                rows={2}
                placeholder="Tulis pertanyaanmu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="resize-none text-sm"
              />
              <Button size="icon" onClick={handleAsk} disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex h-11 items-center gap-2 rounded-full px-4 shadow-lg"
      >
        <Sparkles className="h-4 w-4" />
        Tanya AI
      </Button>
    </div>
  );
}
