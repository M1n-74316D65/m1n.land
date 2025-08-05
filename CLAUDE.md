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
- Uses CSS custom properties for consistent theming
- Dark mode support via `media` query preference
- Radix UI components for accessible primitives
- Custom animations using Framer Motion and Tailwind CSS

### Key Dependencies
- Next.js 15 with React 19
- TypeScript (non-strict mode)
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- Radix UI for accessible components
- Vercel Analytics and Speed Insights
- MDX support for content

### Configuration
- TypeScript configured with non-strict mode
- Tailwind configured with custom theme extending default colors and animations
- Uses Geist Sans and Mono fonts