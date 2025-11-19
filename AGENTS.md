# AGENTS.md

## Commands

- **Dev/Build:** `npm run dev`, `npm run build`, `npm start`
- **Lint/Format:** `npm run format` (Prettier), `npm run format:check`
- **Test:** No test script currently. To run single test (if setup): `npm test -- <file>`

## Code Style & Conventions

- **Stack:** Next.js 15, TypeScript, TailwindCSS, Framer Motion
- **Formatting:** 2 spaces, single quotes, no semicolons, trailing commas (es5), width 100
- **Naming:** PascalCase for components (`app/components`), camelCase for functions
- **Imports:** React first, then third-party, then local (absolute imports preferred)
- **Types:** Strict mode. Explicit types for props/returns. Avoid `any`
- **Components:** Functional components. Use `'use client'` only when interactivity is needed
- **Styling:** TailwindCSS. Use `cn()` from `app/lib/utils.ts` for class merging
- **Error Handling:** `try/catch` for async. No silent failures
- **Commits:** Conventional Commits + Gitmoji (e.g., `✨ feat(scope): description`)
- **Structure:** `app/` (routes), `app/components/ui` (shadcn-like), `app/lib` (utils)
