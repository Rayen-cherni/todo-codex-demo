# Todo Demo Codex

Small Angular todo app with standalone components, signal-based state, EN/FR copy switching, and browser `localStorage` persistence.

## Stack

- Angular 21 (standalone)
- TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` in `src/styles.css`)
- PostCSS (`postcss.config.json`)
- Vitest via Angular CLI test runner

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Scripts

- `npm start`: Start Angular dev server (default locale flow)
- `npm run start:fr`: Start dev server with French locale configuration
- `npm run build`: Production build
- `npm run build:locales`: Build localized bundles
- `npm test -- --watch=false`: Run tests once
- `npm run extract-i18n`: Extract i18n messages to `src/locale`

## Routes and Language Behavior

- `/` renders English copy
- `/en` renders English copy
- `/fr` renders French copy
- Unknown routes redirect to `/`
- Language switch links:
  - EN -> `/`
  - FR -> `/fr`

## Features

- Add todo
- Toggle complete/incomplete
- Delete todo
- Filter by `All`, `Active`, `Completed`
- Persist todos in browser `localStorage`

Core files:

- `src/app/todo-page/`: Main UI and EN/FR copy
- `src/app/todo.service.ts`: Todo state, filtering, persistence
- `src/app/todo.model.ts`: Shared todo types
- `src/app/app.routes.ts`: Route definitions

## Verification

Run after behavior changes:

```bash
npm test -- --watch=false
npm run build
```

Manual checks:

- `/` shows EN content
- `/fr` shows FR content
- Language switch navigates both ways

## Netlify Deployment

This repository includes `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist/todo-demo-codex/browser`
- SPA redirect: `/* -> /index.html (200)`

Common commands:

```bash
npx netlify status
npx netlify deploy
npx netlify deploy --prod
```
