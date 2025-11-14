# AGENTS.md

## Build/Lint/Test Commands

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- No lint/test scripts configured. To add tests, use Jest or Vitest and add `npm run test`. For single test: `npm run test -- <pattern>` (after setup).

## Code Style Guidelines

- **Imports:**
  1. React imports first
  2. Third-party imports (alphabetical)
  3. Local imports (relative paths)
- **Components:** Use functional components with TypeScript interfaces. Use `React.memo()` for performance-critical components.
- **Naming:** PascalCase for components, camelCase for functions/variables.
- **Formatting:** 2-space indentation, single quotes, no semicolons, trailing commas, max line length ~100 chars.
- **Types:** Prefer explicit types for props, state, and function returns. Use TypeScript non-strict mode.
- **Error Handling:** Use try/catch for async code. Log errors with context. Avoid silent failures.
- **Utilities:** Use `cn()` for className merging.

## File Structure

- `app/components/` — Reusable components
- `app/components/ui/` — Base UI components
- `app/lib/` — Utility functions
- `app/constants/` — Static config

## Git Commits

- Use conventional commits with gitmoji: `✨ feat(navbar): add scroll progress indicator`
