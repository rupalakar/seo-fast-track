-- SEO Fast-Track — Supabase schema
-- Paste this whole file into Supabase Dashboard > SQL Editor > New query, then Run.
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- One row per (user, domain). Each domain mirrors a Zustand store's state
-- exactly as shape defined in lib/types/state.ts — same shape the app's
-- Export/Import JSON feature already uses, so migrating existing browser
-- data in is just "paste the exported JSON per domain" if ever needed.
create table if not exists public.app_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  domain text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, domain)
);

alter table public.app_state enable row level security;

drop policy if exists "select own app_state" on public.app_state;
create policy "select own app_state"
  on public.app_state for select
  using (auth.uid() = user_id);

drop policy if exists "insert own app_state" on public.app_state;
create policy "insert own app_state"
  on public.app_state for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own app_state" on public.app_state;
create policy "update own app_state"
  on public.app_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own app_state" on public.app_state;
create policy "delete own app_state"
  on public.app_state for delete
  using (auth.uid() = user_id);

-- Keep updated_at fresh on every upsert.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_app_state_updated_at on public.app_state;
create trigger set_app_state_updated_at
  before update on public.app_state
  for each row execute function public.set_updated_at();
