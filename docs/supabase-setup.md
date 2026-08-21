# Supabase Setup Plan

Supabase is intentionally not enabled yet. The prototype currently uses `localStorage` through `FinanceContext` and works offline.

## Environment

Copy `.env.example` to `.env.local` and add:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Only the public anon key belongs in the browser. Never expose a Supabase service-role key through a `VITE_` variable or commit it to the repository.

## Activation Order

1. Install the client SDK with `npm install @supabase/supabase-js`.
2. Replace the deliberate `getSupabaseClient` placeholder in `src/data/supabaseClient.js` with `createClient(env.supabaseUrl, env.supabaseAnonKey)`.
3. Add authentication screens and listen for auth state changes.
4. Load the signed-in user's rows into `FinanceContext`.
5. Keep localStorage as an offline fallback while reads and writes migrate.
6. Remove the fallback only after sync conflict and sign-out behavior are tested.

## Proposed Tables

Every application table should include `id uuid primary key`, `user_id uuid references auth.users not null`, `created_at timestamptz default now()`, and `updated_at timestamptz default now()`.

- `profiles`: display name, onboarding answers, personality
- `goals`: name, current amount, target amount, deadline, icon
- `investments`: name, provider, invested amount, current amount, return percentage, type
- `transactions`: name, category, signed amount, transaction date, icon
- `budgets`: total amount, month, category limits
- `debts`: name, outstanding amount, original amount, EMI, interest rate
- `emergency_funds`: saved amount, target amount, monthly expenses
- `notifications`: title, message, icon, read state, read timestamp

## Security

Enable Row Level Security on every user-owned table. Policies should restrict `select`, `insert`, `update`, and `delete` to rows where `user_id = auth.uid()`. Add indexes on `user_id` and common filters such as transaction date or budget month.

The service contract in `src/data/supabaseService.js` already mirrors the intended CRUD boundary. It returns a clear not-configured result today and can be switched to Supabase calls once authentication and RLS are ready.
