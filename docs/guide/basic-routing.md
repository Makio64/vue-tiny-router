---
title: Basic Routing
editLink: true
---

# Basic Routing

Now that you've installed `vue-tiny-router`, let's explore the fundamentals of defining routes and navigating between them.

## Defining Routes

Routes are defined as an array of objects, where each object represents a route. At a minimum, each route needs a `path` and a `component`.

- **`path`**: A string that defines the URL path for the route.
- **`component`**: The Vue component to render when the route is active.

Here's a basic example of a routes array:

```js
// src/App.vue (in the <script> section)
import Home from './views/Home.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'

export default {
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/dashboard', component: Dashboard }
      ]
    }
  }
}
```

This configuration defines three routes:
- The root path `/` will render the `Home` component.
- The `/about` path will render the `About` component.
- The `/dashboard` path will render the `Dashboard` component.

## The `<TinyRouter>` Component

The `<TinyRouter>` component is the heart of the routing system. It's responsible for rendering the correct component based on the current URL. You simply pass your routes array to its `routes` prop.

```vue
<!-- src/App.vue -->
<template>
  <header>
    <!-- Navigation links -->
  </header>
  <main>
    <TinyRouter :routes="routes" />
  </main>
</template>
```

## Navigating Between Routes

`vue-tiny-router` offers two primary ways to navigate: declarative navigation with `<a>` tags and programmatic navigation with `$router.push()`.

### Declarative Navigation with `<a>` Tags

The simplest way to navigate is by using standard `<a>` tags. `vue-tiny-router` automatically intercepts clicks on these links and handles the navigation without a full page reload.

```vue
<template>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/dashboard">Dashboard</a>
  </nav>
</template>
```

:::tip Automatic Link Interception
You don't need to use a special component like `<RouterLink>`. `vue-tiny-router` is smart enough to handle standard anchor tags automatically, keeping your templates clean and simple.
:::

### Programmatic Navigation

You can also navigate programmatically from your component's logic using `this.$router.push()`. This is useful for situations like form submissions or other event-driven navigation.

```vue
<template>
  <button @click="goToDashboard">Go to Dashboard</button>
</template>

<script>
export default {
  methods: {
    goToDashboard() {
      // Navigate to the /dashboard route
      this.$router.push('/dashboard')
    }
  }
}
</script>
```

## Putting It All Together

Here's a complete `App.vue` example that combines route definitions, the `<TinyRouter>` component, and navigation links.

```vue
<!-- src/App.vue -->
<template>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <button @click="$router.push('/dashboard')">Dashboard</button>
    </nav>
  </header>
  
  <main>
    <TinyRouter :routes="routes" />
  </main>
</template>

<script>
import Home from './views/Home.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'

export default {
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/dashboard', component: Dashboard }
      ]
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
}
</style>
```

Next up, let's learn how to create dynamic routes with [Route Parameters](./route-parameters.md). 