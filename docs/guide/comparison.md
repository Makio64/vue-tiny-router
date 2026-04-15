# Comparison with Other Routers

## vue-tiny-router vs vue-router

| Feature | vue-tiny-router | vue-router |
|---------|:-:|:-:|
| Bundle size (Brotli) | **~1.33 kB** | ~34 kB |
| Route parameters | Yes | Yes |
| Route guards | Component-level | Route + component + global |
| Route meta | Yes | Yes |
| Lazy loading | Yes | Yes |
| Redirects | Yes | Yes |
| `replace()` / `back()` / `forward()` | Yes | Yes |
| Memory mode | Yes | Via `createMemoryHistory` |
| Nested routes | No | Yes |
| Named routes | No | Yes |
| Named views | No | Yes |
| Per-route guards | No | Yes |
| SSR support | No | Yes |
| Route transitions | No | Yes |
| Navigation failures | No | Yes |
| Scroll behavior config | Basic | Advanced |

## When to use vue-tiny-router

- **Small to medium projects** with straightforward routing needs
- **Performance-critical apps** where every kilobyte matters
- **Embedded Vue widgets** inside larger applications
- **Prototypes and MVPs** where simplicity is key
- Projects with **fewer than ~10 routes**

## When to use vue-router

- **Large applications** with complex nested layouts
- Projects requiring **SSR** (Nuxt.js)
- Apps needing **named routes**, **named views**, or **per-route guards**
- Teams that rely on the full **Vue Router DevTools** integration

## Migration

Already using vue-router? See the [migration guide](/migration/from-vue-router) for a step-by-step transition.
