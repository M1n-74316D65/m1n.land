# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Architecture

This is a Next.js 15 personal portfolio website built with TypeScript, Tailwind CSS, and Framer Motion animations.

### Key Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **Layout**: Root layout (`app/layout.tsx`) provides global structure with Geist fonts, dark mode support, and analytics
- **Pages**: Main pages in `app/` directory (home, guestbook, projects, radio)
- **Components**: Organized in `app/components/` with UI components in `app/components/ui/`
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming

### Component Organization
- `app/components/ui/` - Reusable UI components (buttons, cards, inputs, etc.)
- `app/components/ui/magicui/` - Custom animated components (blur-fade, morphing-text, typing-animation)
- `app/components/footer/` - Footer-related components
- `app/constants/` - Static configuration (navigation items, footer links)

### Design System
- Uses CSS custom properties for consistent theming in `app/globals.css`
- Dark mode support via `media` query preference (configured in `tailwind.config.js`)
- OKLCH color space for consistent color representation
- Custom animations with calculated timing for cohesive UX
- Radix UI components for accessible primitives
- Custom animations using Framer Motion and Tailwind CSS

### Animation Philosophy
Components use coordinated timing for smooth user experiences. For example, the homepage (`app/page.tsx`) calculates typing animation duration, morphing text delays, and content fade timing to create cohesive sequences.

### Styling Approach
- CSS variables defined in `:root` and `.dark` classes for theme switching
- Tailwind CSS with custom theme extensions
- `components.json` configures shadcn/ui with New York style and Lucide icons
- Custom keyframe animations defined in CSS for complex effects

### Key Dependencies
- Next.js 15 with React 19
- TypeScript (non-strict mode with `strictNullChecks: true`)
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- Radix UI for accessible components
- Vercel Analytics and Speed Insights
- MDX support for content (next-mdx-remote)
- Geist font family (Sans and Mono variants)

### Configuration Details
- TypeScript configured with non-strict mode but enables `strictNullChecks`
- Tailwind configured with custom theme extending default colors and animations
- Uses `media` dark mode strategy (not `class` based)
- Component aliases configured for easy imports (`@/components`, `@/lib`, etc.)
- Custom analytics integration with Umami at analytics.m1n.land