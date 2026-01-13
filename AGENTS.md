# AGENTS.md

## Purpose

- Provide quick reference for agentic coding help
- Follow repository conventions before introducing new patterns
- Keep edits minimal, targeted, and consistent with existing code
- Prefer using established helpers and shared tokens

## Commands

- Install dependencies: `bun install` (or `npm install`)
- Dev server: `bun run dev`
- Production build: `bun run build`
- Start production server: `bun run start`
- Format all files: `bun run format`
- Check formatting: `bun run format:check`
- Lint: no npm script yet, use `bunx eslint .` if needed
- Tests: no test runner configured in `package.json`
- Single test (once configured): `bun test <file>` or runner-specific
- Avoid adding tests/tools unless explicitly requested

## Editor Rules

- No `.cursor/rules/` or `.cursorrules` files detected
- No `.github/copilot-instructions.md` file detected
- If editor rules are added later, mirror them here

## Stack Overview

- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode)
- UI: React 19, Tailwind CSS v4, Radix UI, class-variance-authority
- Animation: Framer Motion / Motion utilities
- MDX: `next-mdx-remote` with `sugar-high` highlighting

## Project Structure

- `app/` contains all routes and layouts
- `app/layout.tsx` is the root layout
- `app/page.tsx` is the home route
- `app/og/route.tsx` handles OpenGraph images
- `app/components/` holds shared UI and layout components
- `app/components/ui/` holds shadcn-like primitives
- `app/components/ui/magicui/` holds animated UI widgets
- `app/constants/` stores data arrays and static config
- `app/lib/` hosts utilities like `cn` and design tokens
- `app/global.css` is imported by `app/layout.tsx`
- `app/globals.css` defines theme tokens and semantic utilities

## Formatting

- Prettier is the source of truth for formatting
- 2-space indentation
- Single quotes for strings
- No semicolons
- Trailing commas (es5)
- Line width: 100 characters
- End-of-line: LF

## Imports

- Order imports: React first, then Next, then third-party, then local
- Use `import type` for type-only imports
- Prefer absolute imports (e.g., `app/components/...`)
- Separate import groups with a blank line
- Avoid unused imports and keep lists tidy

## TypeScript

- Strict mode is enabled in `tsconfig.json`
- Avoid `any`; use proper types or generics
- Add explicit types for component props and exports
- Prefer named `interface`/`type` aliases for props
- Use `as const` for literal unions when appropriate
- Keep types colocated with their components

## Components

- Favor function components over class components
- Use `'use client'` only when state, effects, or browser APIs are needed
- Routes/layouts generally use default exports
- Shared utilities and UI pieces use named exports
- Use `cn()` from `app/lib/utils.ts` for class merging
- Use `cva` for variant-based UI components
- Keep component logic near the render, avoid hidden side effects

## Styling

- Tailwind utilities are the primary styling mechanism
- Use semantic tokens from `app/globals.css` when possible
- Use `designSystem` tokens from `app/lib/design-system.ts`
- Avoid inline styles unless Tailwind cannot express the rule
- Keep global styles in `app/global.css` or `app/globals.css`
- Prefer `className` over hard-coded style objects

## Error Handling

- Wrap async work in `try/catch` and log errors
- Provide contextual `console.error` messages
- Avoid silent failures or empty catches
- Use `ErrorBoundary` when client components can throw
- Prefer early returns for invalid input

## Accessibility

- Use semantic HTML elements for structure
- Provide `aria-*` attributes for custom controls
- Ensure interactive elements are keyboard accessible
- Use `next/link` for internal navigation
- Use `next/image` for images and optimize `alt` text

## Data & Constants

- Store static data in `app/constants/`
- Keep URLs and configuration centralized (see `baseUrl.ts`)
- Prefer immutable exports (`const`) for constants
- Avoid inline arrays/objects in components when reused

## Routing & Metadata

- Use Next.js `Metadata` and `Viewport` types
- Define metadata in route/layout files
- Keep SEO and OpenGraph values centralized
- Use `robots.ts` and `sitemap.ts` for crawler config

## MDX

- Use `app/components/mdx.tsx` for MDX rendering
- Reuse the `components` map for consistent styling
- Keep slug generation deterministic for headings
- Use `sugar-high` for syntax highlighting

## Performance

- Prefer server components by default
- Minimize client-side state and effects
- Avoid large client bundles in shared components
- Use `next/image` and lazy-loading where appropriate

## Testing

- No automated tests are configured right now
- If a test runner is added, document commands here
- Prefer adding tests only when the user requests them
