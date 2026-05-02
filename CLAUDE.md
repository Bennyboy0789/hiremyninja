# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4

### App Router layout

```
app/
  layout.tsx    # Root layout — Geist fonts, global metadata
  page.tsx      # Home route
  globals.css   # Tailwind import + CSS custom properties
public/         # Static assets
```

All routes live under `app/`. There are no API routes yet.

### Tailwind CSS v4

This project uses Tailwind v4, which has breaking changes from v3:
- `globals.css` uses `@import "tailwindcss"` (not the old `@tailwind base/components/utilities` directives)
- PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`
- Configuration is CSS-first (no `tailwind.config.js` needed for basic use)

### TypeScript paths

`@/*` resolves to the repository root (configured in `tsconfig.json`).
