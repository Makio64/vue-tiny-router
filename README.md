# vue-tiny-router

A lightweight Vue 3 router. **Only 1kb gzipped** with all the features you need.

## Why vue-tiny-router?

- 🤏 **Tiny**: 1.02kb gzipped
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

That's it! 🎉

## API Reference

### Router Methods
- `$router.push(path)` - Navigate to a route
- `$router.route` - Current route path
- `$router.params` - Route parameters object

### Component Props
```js
<TinyRouter 
  :routes="routes"           // Required: Array of route objects
  :redirects="redirects"     // Optional: Redirect mappings
  :memoryMode="false"        // Optional: In-memory routing
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

## Browser Support

Works in all modern browsers that support ES6+ and the History API.

## Contributing

Keep it tiny! When contributing:
- Maintain minimal bundle size
- Ensure all tests pass
- Follow the simple API design

## License

MIT