# JosTEL Faculty Innovation Companion

A calm, lightweight web app that helps faculty discover teaching approaches,
strengthen assessment, capture evidence, and generate a professional activity
report — and helps JosTEL trainers support faculty through a guided,
conversational workflow instead of an audit form.

Built with React + TypeScript + Vite + Tailwind CSS, backed by Supabase
(Auth, PostgreSQL, Storage). Designed to deploy as a static site on GitHub
Pages.

---

## 1. What's included

- Full working frontend (not a mockup) — routing, forms, file upload, PDF
  generation, role-based views for Faculty / Trainer / Admin.
- `supabase/schema.sql` — full database schema + Row Level Security policies
  + a storage bucket for evidence files.
- `supabase/seed.sql` — 10 real departments (architecture supports more),
  19 pedagogies (5 with complete step-by-step playbooks), 16 assessment
  types, and department-fit mappings.
- No secrets anywhere in the frontend. Only the Supabase **anon/public** key
  is ever exposed to the browser — this is safe by design and is what Row
  Level Security is for.

## 2. Set up Supabase (10–15 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor** → paste the entire contents of
   `supabase/schema.sql` → **Run**.
3. Then paste the entire contents of `supabase/seed.sql` → **Run**.
   (Both scripts are safe to re-run — they use `on conflict do nothing`.)
4. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon / public** key (never the `service_role` key)
5. In this project, copy `.env.example` to `.env.local` and fill in those
   two values:

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

### Creating your first admin account

Every sign-up becomes a `faculty` account by default (safe default). To
make yourself an admin or a trainer:

1. Sign up normally through the app once.
2. In Supabase, go to **Table Editor → users**, find your row, and change
   `role` to `admin` (or `trainer`).
3. Sign out and back in.

From the Admin screen you can then add departments, add more pedagogies/
assessments, and assign trainers to departments. Faculty accounts get a
department via **Table Editor → faculty_profiles** (or extend the Admin UI
to do this from a form — the table and RLS policies already support it).

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit the printed local URL. Sign up as faculty, or use the trainer/admin
flow described above.

## 4. Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. Open `vite.config.ts` and set `base` to match your repo name, e.g.:

   ```ts
   base: '/your-repo-name/',
   ```

   (If you're deploying to a custom domain or a user/organization root site
   instead, set `base: '/'`.)
3. Add your Supabase values as **repository secrets** or bake them into a
   `.env.production` file before building (they are public-safe anon keys,
   but keeping them out of git history is still good practice) — or simply
   keep `.env.local` locally and build from your machine:

   ```bash
   npm install
   npm run build
   npm run deploy
   ```

   `npm run deploy` uses `gh-pages` to publish the `dist/` folder to the
   `gh-pages` branch. Enable GitHub Pages in your repo settings, pointing at
   that branch, if it isn't already.

Alternatively, use a GitHub Actions workflow that runs `npm run build` with
the Supabase values as repo secrets exposed as `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` environment variables, then deploys `dist/` with
`actions/deploy-pages`.

## 5. Project structure

```
src/
  lib/            Supabase client, PDF generator, local draft helpers
  contexts/       Auth state, online/offline draft-sync banner
  components/     Shared UI (app shell/nav, search, route guard)
  data/           Static content: LOTS/MOTS/HOTS verbs, evidence guidance
  types/          Database row types + app-facing domain types
  pages/
    Landing.tsx, Login.tsx
    faculty/      Home, pedagogy explorer & playbook, thinking-levels +
                   HOTS transformer, assessment helper + redesign tool,
                   activity report form (with evidence upload), saved
                   activities list
    trainer/      Department list, faculty list, guided conversation-mode
                   session notes with follow-up tracking
    admin/        Departments (+ trainer assignment), pedagogies,
                   assessments
supabase/
  schema.sql      Tables, triggers, RLS policies, storage bucket
  seed.sql        Departments, pedagogies, steps, mappings, assessments
```

## 6. Extending the content library

Nothing about departments, pedagogies, or assessments is hard-coded in the
app — everything is read from Supabase, and the Admin screens let you add
or edit them without touching code:

- **Departments**: Admin → Departments → add the rest of your college's 31
  departments any time; add trainer assignments from the same screen.
- **Pedagogies**: Admin → Pedagogies → add new approaches, or edit the
  "what is it / when it helps / example / 60-minute plan" fields. Step-by-
  step playbooks (the numbered implementation sequence) can be added per
  pedagogy directly in the `pedagogy_steps` table in Supabase until a
  dedicated Admin UI for steps is worth building.
- **Discipline-specific fit**: the `pedagogy_department_mapping` table
  holds the "strong fit" / "also consider" reasoning shown to faculty per
  department — add rows here (via SQL or a future Admin screen) as you
  build out more departments and disciplines.
- **Assessments**: Admin → Assessments → the same pattern.

## 7. Notes on scope and honesty

This ships as a genuinely functional application — authentication,
database persistence, file upload, PDF generation, and role-based access
all work end-to-end once Supabase is configured. Two things are
intentionally left as starting points rather than exhaustively filled in,
per the original brief's own guidance:

- Only 10 departments and full playbooks for 5 pedagogies are seeded with
  real content; the schema and Admin UI support all 31 departments and all
  19 pedagogies without any code changes.
- The Admin UI is intentionally simple (per the brief: "do not build an
  elaborate enterprise admin dashboard"). Bulk-editing tools (CSV import for
  departments, a dedicated step-editor UI) can be added later if useful.

## 8. Security checklist before going live

- [ ] Only the Supabase anon key is in `.env.local` / build secrets — never
      the `service_role` key or database password.
- [ ] RLS is enabled on every table (it is, by `schema.sql` — verify in
      Supabase → Authentication → Policies if you make schema changes).
- [ ] Promote trainer/admin accounts deliberately; don't leave test admin
      accounts with real passwords in a public repo's history.
