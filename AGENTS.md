# AGENTS.md

This file provides guidance for agentic coding assistants working in this repository.

## Build/Lint/Test Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

**Note**: No lint or test scripts are currently configured. If you add tests, consider using Jest or Vitest with `npm run test` and `npm run test:watch` for single test runs.

## Git Commit Guidelines

### Conventional Commits
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Scopes:** Use component names, file paths, or feature areas (e.g., `navbar`, `button`, `layout`)

**Examples:**
- `feat(navbar): add scroll progress indicator`
- `fix(button): resolve hover state styling issue`
- `docs(readme): update installation instructions`
- `refactor(layout): optimize component structure`

### Gitmoji
Use [Gitmoji](https://gitmoji.dev/) to add visual context to commits:

**Common Gitmojis:**
- 🎨 `:art:` - Improve structure/format of the code
- ⚡ `:zap:` - Improve performance
- 🔥 `:fire:` - Remove code or files
- 🐛 `:bug:` - Fix a bug
- ✨ `:sparkles:` - Introduce new features
- 📝 `:memo:` - Add or update documentation
- 🚀 `:rocket:` - Deploy stuff
- 💄 `:lipstick:` - Add or update the UI and style files
- ♻️ `:recycle:` - Refactor code
- ✅ `:white_check_mark:` - Add or update tests
- 🔒 `:lock:` - Add or update secrets
- 🔧 `:wrench:` - Add or update configuration files
- 📦 `:package:` - Add or update compiled files or packages
- 👥 `:busts_in_silhouette:` - Add or update contributor(s)
- 🚨 `:rotating_light:` - Fix compiler/linter warnings
- 🚀 `:rocket:` - Deploy stuff

**Example commit with gitmoji:**
```
✨ feat(navbar): add scroll progress indicator
```

## Code Style Guidelines

### TypeScript Configuration
- Non-strict mode with `strictNullChecks: true`
- Target ES5 with modern lib support
- JSX preserve mode
- Base URL set to project root

### Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party imports (alphabetical)
import { motion } from 'framer-motion'
import Link from 'next/link'

// 3. Local imports (relative paths)
import { cn } from 'app/lib/utils'
import Navbar from 'app/components/nav'
```

### Component Patterns
- Use functional components with `FC` type annotation
- Define interfaces for component props
- Use `React.memo()` for performance-critical components
- Prefer hooks over class components

```typescript
interface ComponentProps {
  children: ReactNode
  className?: string
}

const Component: FC<ComponentProps> = ({ children, className }) => {
  // component logic
}
```

### Naming Conventions
- **Components**: PascalCase (`Button`, `Navbar`, `ScrollProgress`)
- **Functions/Variables**: camelCase (`scrollProgress`, `updateScrollProgress`)
- **Interfaces**: PascalCase with `Props` suffix (`ButtonProps`)
- **Files**: PascalCase for components, camelCase for utilities

### Styling
- **Tailwind CSS** with custom design tokens
- Use CSS custom properties for theming
- Dark mode support via `media` query preference
- Responsive design with mobile-first approach
- Custom color palette using HSL values

### Accessibility
- Include `aria-label` and `aria-current` attributes
- Use semantic HTML elements
- Add `role` attributes where needed
- Ensure keyboard navigation support

### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Handle loading states appropriately

### Formatting
- 2-space indentation
- Single quotes for strings
- No semicolons
- Trailing commas in objects/arrays
- Max line length: ~100 characters

### Performance
- Use `React.memo()` for components that re-render frequently
- Implement proper dependency arrays in hooks
- Use `useMemo` for expensive calculations
- Optimize images and assets

### File Structure
- `app/` - Next.js app router pages and layouts
- `app/components/` - Reusable components
- `app/components/ui/` - Base UI components
- `app/components/ui/magicui/` - Animated/specialized components
- `app/constants/` - Static configuration data
- `app/lib/` - Utility functions

### Dependencies
- Next.js 15 with React 19
- TypeScript with non-strict configuration
- Tailwind CSS with custom theme
- Framer Motion for animations
- Radix UI for accessible primitives
- Geist font family

### Best Practices
- Follow existing patterns in the codebase
- Use TypeScript interfaces for type safety
- Implement proper error boundaries
- Test components in both light and dark modes
- Ensure mobile responsiveness
- Use semantic HTML and accessibility features</content>
</xai:function_call/>
</xai:function_call name="read">
<parameter name="filePath">/home/m1n/dev/m1n.land/AGENTS.md