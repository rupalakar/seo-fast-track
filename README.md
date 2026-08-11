# SEO Fast-Track

Single-user career workspace for going from SEO beginner to job-ready: **Learn → Practice → Review → Approve → Portfolio → Apply → Interview → Identify Skill Gap → Learn Again**.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + hand-rolled Radix-based UI primitives (styled like shadcn/ui) + Zustand.

No backend, no database, no auth. All progress (onboarding, quiz results, lesson progress, task submissions, portfolio, job applications, networking log, interview practice) is stored in the browser via `localStorage`, one key per domain (see `lib/store/*`). Use **Settings → Export Data** regularly to back up your progress as JSON, and **Import Data** to restore it (including on a different browser/device).

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts at onboarding, then a 20-question placement quiz, then the dashboard.

## Project Structure

- `app/` — routes (onboarding, quiz, dashboard, learn, tasks, portfolio, applications, networking, interview, skills, settings)
- `content/` — seed data: levels, skills, lessons, quiz questions, task templates, networking activities, interview questions. Expand the curriculum by adding entries here — no schema changes needed.
- `lib/store/` — one Zustand store per domain, persisted to `localStorage`
- `lib/domain/` — pure business logic: quiz placement scoring, task state machine, skill progress calculation, "what's next" dashboard logic
- `lib/types/` — shared TypeScript types for content and user-generated state
- `components/` — UI, organized by domain plus a shared `components/ui/` primitives folder

## Deploying

This is a fully static-friendly, client-persisted app — no environment variables or database setup required. Deploys to Vercel with zero configuration: `vercel deploy` or connect the repo in the Vercel dashboard.
