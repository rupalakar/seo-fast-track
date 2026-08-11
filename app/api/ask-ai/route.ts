import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const MAX_CONTEXT_CHARS = 6000;
const MAX_QUESTION_CHARS = 800;

export async function POST(request: Request) {
  // Require a logged-in session so this paid endpoint isn't open to the public internet.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Kamu harus login dulu." }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Fitur Tanya AI belum dikonfigurasi (OPENAI_API_KEY belum diset)." },
      { status: 500 }
    );
  }

  let body: { pageTitle?: string; pageContext?: string; question?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  const pageTitle = (body.pageTitle ?? "").slice(0, 200);
  const pageContext = (body.pageContext ?? "").slice(0, MAX_CONTEXT_CHARS);
  const question = (body.question ?? "").trim().slice(0, MAX_QUESTION_CHARS);

  if (!question) {
    return NextResponse.json({ error: "Pertanyaan tidak boleh kosong." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten belajar SEO di aplikasi SEO Fast-Track. Jawab dalam Bahasa Indonesia yang sederhana dan mudah dipahami pemula, boleh pakai istilah industri dalam Bahasa Inggris bila memang lazim (misal: crawling, indexing, keyword). " +
            "Jawaban HARUS berdasarkan dan relevan dengan konten halaman yang diberikan di bawah — bantu pengguna memahami bagian yang membingungkan dari materi itu. " +
            "Jika pertanyaan di luar topik SEO/konten halaman ini, arahkan dengan sopan agar bertanya seputar materi yang sedang dibuka. " +
            "Jawab ringkas: 2-5 kalimat atau beberapa poin singkat, jangan bertele-tele.",
        },
        {
          role: "user",
          content: `Judul halaman: ${pageTitle}\n\nIsi halaman:\n${pageContext}\n\nPertanyaan: ${question}`,
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim();
    if (!answer) {
      return NextResponse.json({ error: "Tidak ada jawaban dari AI." }, { status: 502 });
    }
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("ask-ai route error:", error);
    return NextResponse.json({ error: "Gagal menghubungi AI. Coba lagi." }, { status: 502 });
  }
}
