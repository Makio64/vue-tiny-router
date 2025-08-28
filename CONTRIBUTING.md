# Contributing to vue-tiny-router

Thanks for considering contributing! This project aims to stay tiny, simple, and well-tested.

## Principles
- Keep it tiny: target bundle size ≤ 1.3 kB Brotli
- Prefer minimal features that cover common use-cases
- Maintain clear, readable code and tests ( help yourself with AI )

## Getting Started
```bash
pnpm install
pnpm test
pnpm run size:check
```

## Development
- Add tests for any behavior change
- Ensure all tests pass and size stays under the limit
- Update docs and README as needed

## Commit & PR
- Describe the motivation and impact
- Include before/after behavior when relevant
- Avoid large refactors without prior discussion

## Scope & Limitations
The router intentionally does not support: nested routes, named routes, query parsing, SSR, or route metadata. Please propose features that align with the tiny scope.

Thank you for helping keep this library tiny and useful!

