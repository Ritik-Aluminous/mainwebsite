# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript site. App entry points live in `src/main.tsx` and `src/App.tsx`. Route pages are in `src/pages`, reusable sections and shared UI live in `src/components` and `src/components/ui`, hooks live in `src/hooks`, and context providers live in `src/contexts`. Static assets belong in `src/assets` when imported by code and `public/` when served directly. Supabase client code is under `src/integrations/supabase`, and edge functions live in `supabase/functions/send-lead-email`.

## Build, Test, and Development Commands
Use `npm install` to install dependencies.

- `npm run dev`: start the local Vite dev server.
- `npm run build`: create the production build in `dist/`.
- `npm run build:dev`: build using development mode settings.
- `npm run preview`: serve the built app locally for verification.
- `npm run lint`: run ESLint across the repo.
- `npm test`: run Vitest once in `jsdom`.
- `npm run test:watch`: run Vitest in watch mode.

## Coding Style & Naming Conventions
Write TypeScript and TSX with the existing 2-space indentation and semicolons. Prefer React function components, the `@/` import alias for `src`, and Tailwind utility classes for styling. Use `PascalCase` for components and page files (`HeroSection.tsx`), `camelCase` for hooks and helpers (`use-mobile.tsx`, `utils.ts`), and keep test files as `*.test.ts` or `*.test.tsx`. Treat generated files such as `src/integrations/supabase/types.ts` as generated unless regeneration is intentional.

## Testing Guidelines
Vitest is configured in `vitest.config.ts` and loads shared setup from `src/test/setup.ts`. Place tests near the code they cover or in `src/test/` when they are app-wide. Prefer Testing Library assertions for UI behavior. There is no formal coverage gate yet, but new UI logic, hooks, and form behavior should ship with focused tests.

## Commit & Pull Request Guidelines
The Git history is minimal, so follow a clear imperative style for commits, such as `feat: add lead form validation` or `fix: guard missing Supabase env`. Keep commits scoped to one change. PRs should include a concise summary, screenshots or screen recordings for visual updates, test notes (`npm run lint`, `npm test`), and any required environment or Supabase configuration changes.

## Security & Configuration Tips
Keep secrets in local environment files and never commit real credentials. Frontend Supabase values are read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; edge functions should use server-side environment variables only.
