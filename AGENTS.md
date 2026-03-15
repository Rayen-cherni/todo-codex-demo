# AGENTS.md

This repository is a small Angular todo app. Keep changes practical, local, and easy to verify.

## Stack

- Angular 21 standalone application
- TypeScript
- npm for package management
- Tailwind CSS v4 via `@import "tailwindcss"` in `src/styles.css`
- PostCSS configured in `postcss.config.json`
- Angular CLI build/test flow through npm scripts

## Primary Commands

- `npm start` starts the Angular dev server
- `npm run start:fr` starts the Angular dev server with the French locale configuration
- `npm run build` creates a production build
- `npm test -- --watch=false` runs the test suite once

## App Structure

- Routes include `/`, `/en`, and `/fr`; unknown routes redirect to `/`
- Main UI lives in `src/app/todo-page/`
- Language switch UI and route-aware EN/FR copy live in `src/app/todo-page/`
- Todo state and persistence live in `src/app/todo.service.ts`
- Shared todo types live in `src/app/todo.model.ts`
- Global styles live in `src/styles.css`

## Working Conventions

- Preserve standalone Angular patterns; do not introduce NgModules unless there is a clear need
- Prefer Angular signals and injected services over ad hoc shared state
- Keep business logic in services or component class methods, not in templates
- Reuse the existing typed interfaces such as `Todo`, `TodoFilter`, and `TodoService`
- Extend the current routed app structure instead of creating a parallel app shell
- Keep language toggle behavior consistent with route behavior (`/` for EN, `/fr` for FR)
- Keep EN and FR copy updates synchronized whenever labels or user-facing text changes
- Keep styling in Tailwind utility classes; use global CSS only for app-wide concerns
- Avoid adding extra libraries when Angular and the current stack already cover the need

## Todo App Notes

- Todos are persisted in browser `localStorage`
- Persistence changes must remain browser-safe and should not break test execution
- The todo page currently supports add, toggle, delete, and filter behavior
- Locale text switching on the todo page is runtime-driven via route-aware EN/FR copy
- Angular dev server localizes one locale per serve process; use `npm run start:fr` to validate the French-locale serve flow
- If you add fields or behavior to todos, update the model and service together

## Verification

- Run `npm test -- --watch=false` after behavior changes
- Run `npm run build` before closing substantial work
- For language changes, verify `/` renders EN copy and `/fr` renders FR copy
- Verify language switch links navigate in both directions (`EN -> /`, `FR -> /fr`)
- If verification cannot run, state why clearly and mention the blocking dependency or environment issue

## Editing Guidance

- Keep changes narrowly scoped to the task
- Prefer updating existing files and patterns before creating new abstractions
- When changing routing, state shape, or persistence, check the corresponding tests
