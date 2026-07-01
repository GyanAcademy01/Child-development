---
name: project-memory
description: TAT GK App — project context, tech stack
---

# 🧠 Project Memory

## Overview
- **App**: TAT GK (TAT Exam General Knowledge - ગુજરાતી)
- **Root**: `d:\w\Gyan academy  project\TAT-gk`
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **CSS**: TailwindCSS v4
- **Build**: `npm run dev` / `npm run build`

## Tech Stack
- **UI**: Base UI (@base-ui/react)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **PDF**: pdfjs-dist
- **CSS Animate**: tw-animate-css
- **TypeScript**: strict mode

## Design System
- TailwindCSS v4 (new syntax)
- @tailwindcss/postcss for build
- tailwind-merge + clsx for class handling
- class-variance-authority for variants
- Responsive: Mobile + Desktop

## Key Paths
| Need | Path |
|------|------|
| Pages | `src/app/` |
| Components | `src/components/` |
| Styling | `postcss.config.mjs` |

## Rules
- TypeScript strict
- TailwindCSS v4 for all styling
- Framer Motion for animations
- Responsive: Mobile + Desktop
- File paths → absolute paths always
- New file → update this memory
