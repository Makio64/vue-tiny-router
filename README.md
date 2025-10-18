# vue-tiny-router

[![CI](https://github.com/Makio64/vue-tiny-router/actions/workflows/ci.yml/badge.svg)](https://github.com/Makio64/vue-tiny-router/actions/workflows/ci.yml)

A lightweight Vue 3 router. **~1.25 kB Brotli** with all the features you need.

## Why vue-tiny-router?

- 🤏 **Tiny**: ~1.25 kB Brotli
- ⚡ **Fast**: Minimal overhead, maximum performance
- 🎯 **Simple**: Easy setup, intuitive API
- 💪 **Complete**: Route params, guards, lazy loading, redirects

## Quick Start

### 1. Install

```bash
npm install vue-tiny-router
```

### 2. Setup

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

createApp(App)
  .use(TinyRouterInstall)
  .mount('#app')
```

### 3. Configure Routes

```vue
<!-- App.vue -->
<template>
  <TinyRouter :routes="routes" />
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'

export default {
  components: { TinyRouter },
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/profile/:id', component: Profile }
      ]
    }
  }
}
</script>
```

### 4. Navigate

```vue
<template>
  <button @click="$router.push('/')">Home</button>
  <button @click="$router.push('/profile/123')">Profile</button>
</template>
```

### 5. Composition API (setup)

Use the provided composables in `<script setup>` or setup():

```vue
<script setup>
import { TinyRouter, useRouter, useRoute } from 'vue-tiny-router'

const router = useRouter()
const route = useRoute()

function goUser(id) {
  router.push(`/profile/${id}`)
}
</script>

<template>
  <TinyRouter :routes="routes" />
  <div>Current: {{ route.route }}</div>
  <div>User id: {{ route.params.id }}</div>
  <button @click="goUser('42')">Go user 42</button>
  <button @click="router.push('/')">Home</button>
  <button @click="router.push('/profile/123')">Profile</button>
  
</template>
```

That's it! 🎉

## API Reference

### Router Methods
- `$router.push(path)` - Navigate to a route
- `$router.route` - Current route path
- `$router.params` - Route parameters object

### Composables
- `useRouter()` - Returns an object with:
  - `push(path)` - Navigate programmatically
  - `route` - Reactive current path string
  - `params` - Reactive params object
  - `component` - Current matched component (non-reactive reference)
- `useRoute()` - Returns an object with:
  - `route` - Reactive current path string
  - `params` - Reactive params object

### Component Props
```js
<TinyRouter 
  :routes="routes"           // Required: Array of route objects
  :redirects="redirects"     // Optional: Redirect mappings
  :memoryMode="false"        // Optional: In-memory routing
  :scrollSmooth="false"        // Optional: smooth scrolling on navigation
/>
```

## Advanced Features

### Route Parameters
Access dynamic route segments:
```js
// Route: /user/:id
// URL: /user/123
this.$router.params.id // "123"
```

### Route Guards
Prevent navigation or add animations:
```js
export default {
  beforeRouteLeave(next, to) {
    // Do something async, then call next()
    this.saveData().then(next)
  }
}
```

### Lazy Loading
Reduce initial bundle size:
```js
import { defineAsyncComponent } from 'vue'

const routes = [
  { 
    path: '/heavy', 
    component: defineAsyncComponent(() => import('./HeavyComponent.vue'))
  }
]
```

### Redirects
```js
const redirects = {
  '/old-path': '/new-path',
  '/home': '/'
}
```

### Default Routes
```js
import { defaultRoute } from 'vue-tiny-router'
defaultRoute.value = '/dashboard'
```

### Memory Mode
Perfect for embedded apps or testing:
```vue
<TinyRouter :routes="routes" :memoryMode="true" />
```

### Automatic Link Interception
`vue-tiny-router` automatically intercepts clicks on `<a>` tags. If the link's destination is a route managed by the router, it will prevent a page reload and handle it as an in-app navigation. For all other links (external sites or unhandled paths), it will allow the browser's default behavior. No configuration is needed.

## Migration from vue-router

Most common patterns work the same:

| vue-router | vue-tiny-router |
|------------|-----------------|
| `$router.push()` | `$router.push()` ✅ |
| `$route.params` | `$router.params` ✅ |
| `beforeRouteLeave` | `beforeRouteLeave` ✅ |
| Route guards | Route guards ✅ |
| Lazy loading | Lazy loading ✅ |

[See full migration guide →](docs/migration/from-vue-router.md)

## Example & Documentation

### 🎯 Live Example
```bash
pnpm run dev
```

The example demonstrates all features including:
- Route parameters
- Route guards  
- Anchor links
- Memory mode
- Redirects

### 📚 Full Documentation
```bash
# Run the VitePress documentation
pnpm run docs:dev
```

Or view online: [Vue Tiny Router Docs](https://github.com/Makio64/vue-tiny-router/tree/main/docs)

## Browser Support

Works in all modern browsers that support ES6+ and the History API.

## Limitations

This library is intentionally tiny and focuses on the 80% use cases:
- No nested routes or child routes
- No named routes or route names
- No history mode configuration (uses browser History API when not in memory mode)
- No automatic query parsing (query string is appended as-is; parse it in your component if needed)
- No route metadata or per-route guards (supports component-level `beforeRouteLeave` only)
- No SSR integration

If you need these features, consider using `vue-router`.

## Contributing

Keep it tiny! When contributing:
- Maintain minimal bundle size
- Ensure all tests pass
- Follow the simple API design

Run the full development setup:
```bash
# Run tests
pnpm test

# Check bundle size
pnpm run size:check

# Run example app
pnpm run example:dev

# Run documentation
pnpm run docs:dev
```

## License

MIT
