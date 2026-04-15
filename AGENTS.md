# AGENTS.md

Guide for AI coding assistants working in this repo. Humans: see [README.md](README.md).

## Project
`vue-tiny-router` — a minimalist Vue 3 router (~1.4 kB brotli) with route params, guards, lazy loading, redirects, wildcards, and `meta`. Zero runtime deps; `vue` is a peer dep.

## Layout
- [src/](src/) — library source. Entry: [src/index.js](src/index.js). Core: [src/components/TinyRouter.vue](src/components/TinyRouter.vue).
- [index.d.ts](index.d.ts) — TypeScript definitions (public API contract).
- [tests/](tests/) — vitest + `@vue/test-utils` + jsdom.
- [example/](example/) — runnable playground (its own `package.json`).
- [docs/](docs/) — VitePress site (its own `package.json`).
- [dist/](dist/) — build output (do not edit).

## Commands (run from repo root)
- `pnpm dev` — start the example app.
- `pnpm test` — run vitest suite.
- `pnpm lint` — ESLint with `--fix`.
- `pnpm build` — build the library via Vite.
- `pnpm size:check` — enforce the 1.5 kB brotli budget defined in [package.json](package.json).
- `pnpm docs:dev` / `pnpm docs:build` — VitePress docs.

Before proposing any change: `pnpm lint && pnpm test && pnpm build && pnpm size:check`.

## Public API
Exported from [src/index.js](src/index.js) (typed in [index.d.ts](index.d.ts)):
- `TinyRouter` — the `<TinyRouter>` component (`routes`, `redirects`, `memoryMode` props).
- `TinyRouterInstall` — Vue plugin; registers the component and `$router`.
- `useRouter()` — composition API: `push`, `replace`, `back`, `forward`, `go`, `route`, `params`, `meta`, `component`.
- `useRoute()` — read-only: `route`, `params`, `meta`.
- `defaultRoute`, `initialRoute`, `routeState` — reactive refs.

`$router` (Options API) exposes the same surface as `useRouter()`.

## Conventions
- **Style**: tabs for indent, single quotes, spaces inside parens — matches existing `.vue` and `.js` files. ESLint config in [eslint.config.js](eslint.config.js) is authoritative.
- **No runtime deps.** Adding one requires strong justification; `vue` stays peer-only.
- **Bundle budget**: must stay under 1.5 kB brotli. If a change pushes it over, rework it — don't raise the limit without discussion.
- **No comments unless the *why* is non-obvious.** Don't narrate what named code already says.
- **Keep the API small.** New surface area must earn its bytes. Prefer extending existing methods over adding new ones.
- **Tests required** for API-visible changes. Place under [tests/](tests/) mirroring the feature.

## When editing TinyRouter.vue
- Route matching is cached per `route.path` in `regexCache` — invalidation isn't needed because routes are static per mount, but be aware when adding dynamic route support.
- `routerAPI()` is the single source of truth for both `$router` and `useRouter()` — keep them in sync by editing that factory, not by forking.
- `routeState` (exported ref) drives reactivity; update it inside `proceed()` so watchers fire.

## Don't
- Don't add a history abstraction — `memoryMode` + `history.*` is intentional.
- Don't pull in a query-string parser; current behavior is to preserve the raw `search` string.
- Don't switch to TypeScript source — types live in `index.d.ts` by design.
