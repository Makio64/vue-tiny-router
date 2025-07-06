---
layout: home

hero:
  name: "Vue Tiny Router"
  text: "Lightweight Vue 3 Router"
  tagline: "Only 1kb gzipped with all the features you need"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Makio64/vue-tiny-router
    - theme: alt
      text: Live Example
      link: /demo

features:
  - icon: 🤏
    title: Incredibly Small
    details: Only 1.02kb gzipped - perfect for performance-conscious applications
  - icon: ⚡
    title: Lightning Fast
    details: Minimal overhead with maximum performance
  - icon: 🎯
    title: Simple API
    details: Easy to learn and use, with an intuitive API design
  - icon: 💪
    title: Feature Complete
    details: Route params, guards, lazy loading, redirects, anchor links, and more
  - icon: 🔧
    title: Memory Mode
    details: Perfect for embedded apps or testing scenarios
  - icon: 🚀
    title: Vue 3 Ready
    details: Built specifically for Vue 3 with modern JavaScript features
---

## Quick Start

Install vue-tiny-router:

```bash
npm install vue-tiny-router
```

Set up your router:

```javascript
// main.js
import { createApp } from 'vue'
import { TinyRouterInstall } from 'vue-tiny-router'
import App from './App.vue'

createApp(App)
  .use(TinyRouterInstall)
  .mount('#app')
```

Configure your routes:

```vue
<!-- App.vue -->
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

Navigate programmatically:

```javascript
// In your components
this.$router.push('/about')
```

## Why Vue Tiny Router?

### 📦 Bundle Size Comparison

| Router | Bundle Size (gzipped) | Features |
|--------|----------------------|----------|
| vue-tiny-router | **1.02kb** | Route params, guards, lazy loading, redirects, anchor links, memory mode |
| vue-router | ~34kb | Full-featured router with extensive API |

### 🎯 Perfect For

- **Performance-critical applications** where every byte counts
- **Embedded Vue apps** within larger applications
- **Simple to medium complexity** routing needs
- **Projects** that need basic routing without the overhead

### ✨ All Essential Features

- ✅ Route parameters (`/user/:id`)
- ✅ Route guards (`beforeRouteLeave`)
- ✅ Lazy loading with `defineAsyncComponent`
- ✅ Redirects and default routes
- ✅ Anchor link support with smooth scrolling
- ✅ Memory mode for embedded scenarios
- ✅ Programmatic navigation
- ✅ Auto link interception

## Browser Support

Works in all modern browsers that support ES6+ and the History API.

## Migration from vue-router

Most common patterns work the same way:

```javascript
// vue-router ✅ → vue-tiny-router ✅
$router.push('/path')     // Same API
$route.params.id          // $router.params.id
beforeRouteLeave(next)    // Same API
```

[See full migration guide →](/migration/from-vue-router) 