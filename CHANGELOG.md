# Changelog

All notable changes to `vue-tiny-router` are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [semver](https://semver.org/).

## [1.8.0] — 2026-04-15

Fully backward-compatible with 1.7.x. Adds navigation helpers, route `meta`, and a match-regex cache.

### Added
- **`replace(path)`** on `$router` and `useRouter()` — navigates via `history.replaceState` (no new history entry).
- **`back()`, `forward()`, `go(n)`** on `$router` and `useRouter()` — thin wrappers over the `history` API (no-op in `memoryMode`).
- **Route `meta`** — routes now accept an optional `meta: Record<string, any>`. Exposed via `useRoute().meta`, `useRouter().meta`, `$router.meta`, and `routeState.meta`.
- **`AGENTS.md`** — guide for AI coding assistants working in the repo.

### Changed
- Match-regex cache keyed by `route.path` — route patterns are compiled once instead of on every render.
- `useRouter()` now exposes the same surface as `$router` (navigation actions + getters).
- Dev dependencies bumped: ESLint 10, Vite 8, Vitest 4.1, size-limit 12, jsdom 29, pnpm 10.33.

### Fixed
- Size budget still honored — library ships at **1.45 kB brotli** (limit: 1.5 kB) despite the added surface.

### Types
- [index.d.ts](index.d.ts): added `replace`, `back`, `forward`, `go`, and `meta` to `RouterAPI`; added `meta?` to `Route`; added `meta` to `RouteState`.

### Migration
None required. Existing 1.7.x code runs unchanged. Optional upgrades:
- Replace `history.replaceState(...)` + manual route sync with `$router.replace('/path')`.
- Attach auth flags / titles via `{ path, component, meta: { requiresAuth: true } }` and read them in guards via `useRoute().meta`.

---

## [1.7.1] — prior

Baseline before this release. See git history for earlier changes.
