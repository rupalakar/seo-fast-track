import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { Lesson, LevelId, SkillId } from "@/lib/types/content";

interface LessonRow {
  id: string;
  level_id: string;
  skill_id: string;
  order: number;
  title: string;
  summary: string;
  est_minutes: number;
  blocks: unknown;
  resources: unknown;
}

function rowToLesson(row: LessonRow): Lesson {
  return {
    id: row.id,
    levelId: row.level_id as LevelId,
    skillId: row.skill_id as SkillId,
    order: row.order,
    title: row.title,
    summary: row.summary,
    estMinutes: row.est_minutes,
    blocks: (row.blocks as Lesson["blocks"]) ?? [],
    resources: (row.resources as Lesson["resources"]) ?? [],
  };
}

function lessonToRow(lesson: Lesson) {
  return {
    id: lesson.id,
    level_id: lesson.levelId,
    skill_id: lesson.skillId,
    order: lesson.order,
    title: lesson.title,
    summary: lesson.summary,
    est_minutes: lesson.estMinutes,
    blocks: lesson.blocks,
    resources: lesson.resources,
  };
}

interface LessonsState {
  lessons: Lesson[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  fetchLessons: () => Promise<void>;
  upsertLesson: (lesson: Lesson) => Promise<{ error: string | null }>;
  deleteLesson: (id: string) => Promise<{ error: string | null }>;
}

// Lessons are shared content (not per-user), so this talks to Supabase
// directly instead of going through the per-user app_state cloud-sync layer.
export const useLessonsStore = create<LessonsState>()((set, get) => ({
  lessons: [],
  loading: false,
  loaded: false,
  error: null,

  fetchLessons: async () => {
    if (get().loading) return;
    set({ loading: true, error: null });
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }
    set({ lessons: (data ?? []).map(rowToLesson), loading: false, loaded: true });
  },

  upsertLesson: async (lesson) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("lessons")
      .upsert({ ...lessonToRow(lesson), updated_by: user?.id });

    if (error) return { error: error.message };
    await get().fetchLessons();
    return { error: null };
  },

  deleteLesson: async (id) => {
    const supabase = createClient();
    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) return { error: error.message };
    set({ lessons: get().lessons.filter((l) => l.id !== id) });
    return { error: null };
  },
}));
