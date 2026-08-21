# Arthiq

Arthiq is a React and Vite personal finance prototype. It currently runs offline and persists goals, transactions, budgets, notifications, and profile data in browser `localStorage`.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run test
npm run build
```

## Backend Roadmap

Supabase placeholders are available in `src/data/supabaseClient.js` and `src/data/supabaseService.js`. Supabase is not active yet, so no credentials or network requests are required. Copy `.env.example` to `.env.local` only when beginning backend integration. See [docs/supabase-setup.md](docs/supabase-setup.md) for the planned tables, authentication flow, Row Level Security, and localStorage migration.

## Original Vite Notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
