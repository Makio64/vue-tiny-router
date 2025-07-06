# Getting Started

Vue Tiny Router is a lightweight Vue 3 router that provides all the essential routing features you need in just 1kb gzipped.

## Installation

::: code-group
```bash [npm]
npm install vue-tiny-router
```

```bash [yarn]
yarn add vue-tiny-router
```

```bash [pnpm]
pnpm add vue-tiny-router
```
:::

## Basic Setup

### 1. Install the Plugin

```javascript
// main.js
import { createApp } from 'vue'
import { TinyRouterInstall } from 'vue-tiny-router'
import App from './App.vue'

const app = createApp(App)

// Install TinyRouter globally
app.use(TinyRouterInstall)

app.mount('#app')
```

### 2. Define Your Routes

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

### 3. Create Your Components

```vue
<!-- views/Home.vue -->
<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to Vue Tiny Router!</p>
    <button @click="$router.push('/about')">Go to About</button>
  </div>
</template>
```

```vue
<!-- views/About.vue -->
<template>
  <div>
    <h1>About Page</h1>
    <p>This router is tiny but powerful!</p>
    <button @click="$router.push('/')">Go Home</button>
  </div>
</template>
```

That's it! 🎉 You now have a working Vue application with routing.

## Navigation

### Using Links

```vue
<template>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</template>
```

Vue Tiny Router automatically intercepts clicks on `<a>` tags and handles them as in-app navigation when the destination matches a route.

### Programmatic Navigation

```javascript
// Navigate to a route
this.$router.push('/about')

// Navigate with parameters
this.$router.push('/user/123')

// Navigate to anchor
this.$router.push('/#section')
```

### Accessing Route Information

```javascript
// Get current route path
console.log(this.$router.route) // '/user/123'

// Get route parameters
console.log(this.$router.params) // { id: '123' }

// Get current component
console.log(this.$router.component)
```

## Next Steps

Now that you have a basic setup, you can explore more advanced features:

- [Route Parameters](/guide/route-parameters) - Dynamic route segments
- [Route Guards](/guide/route-guards) - Control navigation
- [Redirects](/guide/redirects) - Redirect old URLs
- [Memory Mode](/guide/memory-mode) - Routing without URL changes
- [Anchor Links](/guide/anchor-links) - Smooth scrolling to sections

## Example Project

Want to see all features in action? Check out our [full example application](/examples/full-app) that demonstrates every feature of Vue Tiny Router.

## Troubleshooting

### Router Not Working?

1. **Check the installation**: Make sure you've called `app.use(TinyRouterInstall)`
2. **Verify routes**: Ensure your routes array is properly defined
3. **Component imports**: Check that your components are imported correctly

### Need Help?

- Check the [API Reference](/api/router) for detailed documentation
- Look at [Examples](/examples/basic) for working code samples
- Browse [common issues](https://github.com/Makio64/vue-tiny-router/issues) on GitHub 