-- SEO Fast-Track — Admin/CMS schema (run AFTER supabase/schema.sql)
-- Paste into Supabase Dashboard > SQL Editor > New query, then Run.

-- ── Admins ──────────────────────────────────────────────────────────────
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;
-- Intentionally no select/insert policies: nobody can read/write this table
-- via the API. Only the security-definer function below can see it, and you
-- manage it yourself from the SQL Editor (see the insert at the bottom).

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins where email = auth.jwt() ->> 'email'
  );
$$;

grant execute on function public.is_admin() to authenticated;

-- ── Lessons (shared content, not per-user) ─────────────────────────────
create table if not exists public.lessons (
  id text primary key,
  level_id text not null,
  skill_id text not null,
  "order" integer not null default 0,
  title text not null,
  summary text not null,
  est_minutes integer not null default 10,
  blocks jsonb not null default '[]'::jsonb,
  resources jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);
alter table public.lessons enable row level security;

drop policy if exists "lessons readable by authenticated" on public.lessons;
create policy "lessons readable by authenticated"
  on public.lessons for select
  using (auth.role() = 'authenticated');

drop policy if exists "lessons insertable by admin" on public.lessons;
create policy "lessons insertable by admin"
  on public.lessons for insert
  with check (public.is_admin());

drop policy if exists "lessons updatable by admin" on public.lessons;
create policy "lessons updatable by admin"
  on public.lessons for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "lessons deletable by admin" on public.lessons;
create policy "lessons deletable by admin"
  on public.lessons for delete
  using (public.is_admin());

drop trigger if exists set_lessons_updated_at on public.lessons;
create trigger set_lessons_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- ── Lesson feedback ("materi ini perlu diupdate") ──────────────────────
create table if not exists public.lesson_feedback (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null,
  lesson_title text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text not null,
  note text not null,
  status text not null default 'open' check (status in ('open', 'resolved')),
  created_at timestamptz not null default now()
);
alter table public.lesson_feedback enable row level security;

drop policy if exists "insert own feedback" on public.lesson_feedback;
create policy "insert own feedback"
  on public.lesson_feedback for insert
  with check (auth.uid() = user_id);

drop policy if exists "select own feedback or admin" on public.lesson_feedback;
create policy "select own feedback or admin"
  on public.lesson_feedback for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "admin update feedback" on public.lesson_feedback;
create policy "admin update feedback"
  on public.lesson_feedback for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin delete feedback" on public.lesson_feedback;
create policy "admin delete feedback"
  on public.lesson_feedback for delete
  using (public.is_admin());

-- ── Make yourself admin ─────────────────────────────────────────────────
-- Replace with the email of the account you log into the app with, then run
-- just this line (safe to re-run — it upserts, won't error on duplicates).
insert into public.admins (email) values ('YOUR_EMAIL_HERE')
  on conflict (email) do nothing;
