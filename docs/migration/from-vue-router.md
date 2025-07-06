# Migration from vue-router

This guide helps you migrate from vue-router to vue-tiny-router. Most common patterns work the same way, making the transition smooth.

## API Comparison

### Installation

::: code-group
```javascript [vue-router]
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})

app.use(router)
```

```javascript [vue-tiny-router]
import { TinyRouterInstall } from 'vue-tiny-router'

app.use(TinyRouterInstall)
```
:::

### Route Configuration

::: code-group
```vue [vue-router]
<template>
  <router-view />
</template>

<script>
export default {
  // Routes are configured in router instance
}
</script>
```

```vue [vue-tiny-router]
<template>
  <TinyRouter :routes="routes" />
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'

export default {
  components: { TinyRouter },
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
      ]
    }
  }
}
</script>
```
:::

### Navigation

::: code-group
```javascript [vue-router]
// Programmatic navigation
this.$router.push('/about')
this.$router.push({ path: '/user', params: { id: 123 } })

// Access route info
this.$route.path      // '/user/123'
this.$route.params    // { id: '123' }
```

```javascript [vue-tiny-router]
// Programmatic navigation
this.$router.push('/about')
this.$router.push('/user/123')

// Access route info
this.$router.route    // '/user/123'
this.$router.params   // { id: '123' }
```
:::

## What's Different

### Simplified API

Vue Tiny Router has a much simpler API surface:

| Feature | vue-router | vue-tiny-router |
|---------|------------|-----------------|
| Route config | Separate router instance | Component props |
| Route info | `$route` object | `$router` properties |
| Navigation | `$router.push()` | `$router.push()` ✅ |
| Parameters | `$route.params` | `$router.params` |

### Route Configuration Location

::: code-group
```javascript [vue-router - Centralized]
// router/index.js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

```vue [vue-tiny-router - Component Level]
<!-- App.vue -->
<template>
  <TinyRouter :routes="routes" />
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
      ]
    }
  }
}
</script>
```
:::

## Supported Features

### ✅ Fully Compatible

These features work the same way:

```javascript
// Route parameters
{ path: '/user/:id', component: UserProfile }

// Programmatic navigation
this.$router.push('/path')

// Route guards
beforeRouteLeave(next) {
  next()
}

// Lazy loading
component: defineAsyncComponent(() => import('./Component.vue'))
```

### ⚠️ Different Syntax

These features are supported but with different syntax:

| vue-router | vue-tiny-router | Notes |
|------------|-----------------|-------|
| `$route.params` | `$router.params` | Different location |
| `$route.path` | `$router.route` | Different property name |
| Router config | Component props | Routes defined in component |

### ❌ Not Included

These vue-router features are **not** included to keep the bundle small:

- Named routes
- Nested routes
- Route meta fields
- beforeEach/afterEach global guards
- History modes (only uses history API)
- Route aliases
- Route matching priority
- Transition animations (use CSS instead)

## Migration Steps

### 1. Update Installation

Remove vue-router and install vue-tiny-router:

```bash
npm uninstall vue-router
npm install vue-tiny-router
```

### 2. Update Main App File

::: code-group
```javascript [Before (vue-router)]
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
```

```javascript [After (vue-tiny-router)]
import { createApp } from 'vue'
import { TinyRouterInstall } from 'vue-tiny-router'
import App from './App.vue'

createApp(App).use(TinyRouterInstall).mount('#app')
```
:::

### 3. Move Routes to Component

::: code-group
```vue [Before (vue-router)]
<template>
  <router-view />
</template>
```

```vue [After (vue-tiny-router)]
<template>
  <TinyRouter :routes="routes" />
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

export default {
  components: { TinyRouter },
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
      ]
    }
  }
}
</script>
```
:::

### 4. Update Route Access

Find and replace these patterns in your components:

```javascript
// Replace these
this.$route.params     → this.$router.params
this.$route.path       → this.$router.route
this.$route.query      → Not available (use window.location.search)

// These stay the same
this.$router.push()    → this.$router.push() ✅
beforeRouteLeave()     → beforeRouteLeave() ✅
```

### 5. Handle Redirects

::: code-group
```javascript [Before (vue-router)]
const routes = [
  { path: '/old-path', redirect: '/new-path' },
  { path: '/', component: Home }
]
```

```vue [After (vue-tiny-router)]
<template>
  <TinyRouter :routes="routes" :redirects="redirects" />
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/new-path', component: NewPage }
      ],
      redirects: {
        '/old-path': '/new-path'
      }
    }
  }
}
</script>
```
:::

## Common Migration Issues

### Issue: `$route is undefined`

**Problem:** Trying to access `this.$route`

**Solution:** Use `this.$router` instead:

```javascript
// ❌ Old way
this.$route.params.id

// ✅ New way  
this.$router.params.id
```

### Issue: Named routes not working

**Problem:** Using named routes like `{ name: 'user' }`

**Solution:** Use path-based navigation:

```javascript
// ❌ Old way
this.$router.push({ name: 'user', params: { id: 123 } })

// ✅ New way
this.$router.push('/user/123')
```

### Issue: Nested routes missing

**Problem:** Having nested route structures

**Solution:** Flatten your routes or consider if you need vue-router instead:

```javascript
// ❌ Old way (nested)
{
  path: '/user',
  component: User,
  children: [
    { path: 'profile', component: Profile },
    { path: 'settings', component: Settings }
  ]
}

// ✅ New way (flat)
{ path: '/user', component: User },
{ path: '/user/profile', component: Profile },
{ path: '/user/settings', component: Settings }
```

## When to Migrate

### ✅ Good candidates for migration:

- Simple routing needs
- Performance-critical applications
- Embedded Vue apps
- Apps with < 10 routes
- Apps that don't use advanced vue-router features

### ❌ Keep vue-router if you need:

- Nested routes
- Named routes
- Complex route matching
- Global navigation guards
- Route meta fields
- Multiple router instances

## Performance Benefits

After migration, you'll see:

- **Bundle size reduction**: ~33kb smaller (vue-router ~34kb → vue-tiny-router ~1kb)
- **Faster initial load**: Less JavaScript to parse and execute
- **Reduced memory usage**: Simpler router implementation

## Getting Help

If you encounter issues during migration:

1. Check the [API Reference](/api/router) for equivalent features
2. Look at [Examples](/examples/basic) for working patterns
3. Review [GitHub Issues](https://github.com/Makio64/vue-tiny-router/issues) for known problems
4. Consider if vue-router might be better for your use case 