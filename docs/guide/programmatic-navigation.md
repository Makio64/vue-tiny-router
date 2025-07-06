---
title: Programmatic Navigation
editLink: true
---

# Programmatic Navigation

While declarative navigation with `<a>` tags is great for most use cases, you'll often need to navigate from your component's logic. `vue-tiny-router` makes this easy with the `$router.push()` method.

## Using `$router.push()`

The `$router` object is available on all your components thanks to the `TinyRouterInstall` plugin. To navigate to a new route, simply call `this.$router.push()` with the desired path.

```vue
<template>
  <div>
    <input v-model="username" placeholder="Enter username" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    async login() {
      try {
        // Simulate an API call
        await api.login(this.username)
        
        // Redirect to the dashboard on success
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Login failed:', error)
        // Redirect to an error page
        this.$router.push('/login-error')
      }
    }
  }
}
</script>
```

`$router.push()` is incredibly versatile and can be used in any method, lifecycle hook, or watcher within your components.

### Navigating with Route Parameters

You can also use `$router.push()` to navigate to routes with parameters. Simply construct the path string with the required values.

```vue
<template>
  <div>
    <p>Select a product to view:</p>
    <button @click="viewProduct('p123')">View Product 123</button>
    <button @click="viewProduct('p456')">View Product 456</button>
  </div>
</template>

<script>
export default {
  methods: {
    viewProduct(productId) {
      // Navigate to a dynamic route like /products/p123
      this.$router.push(`/products/${productId}`)
    }
  }
}
</script>
```

### Navigating with a Hash

If you need to scroll to a specific section on the target page, you can include a hash fragment in the path.

```js
// This will navigate to the /about page and scroll to the element with id="contact"
this.$router.push('/about#contact')
```

## Accessing Router Properties

The `$router` object also provides useful reactive properties to inspect the current route state:

- **`$router.route`**: A string representing the current route path (e.g., `/user/123`).
- **`$router.params`**: An object containing the key-value pairs of route parameters (e.g., `{ id: '123' }`).
- **`$router.component`**: The component instance for the currently active route.

You can use these properties directly in your template or script to react to route changes.

```vue
<template>
  <div class="status-bar">
    <p>Current Path: <strong>{{ $router.route }}</strong></p>
    <p>Route Params: <strong>{{ JSON.stringify($router.params) }}</strong></p>
  </div>
</template>

<script>
export default {
  watch: {
    // Watch for changes to the route and log them
    '$router.route'(newRoute, oldRoute) {
      console.log(`Route changed from ${oldRoute} to ${newRoute}`)
    }
  }
}
</script>
```

Next, let's explore how to protect your routes and control navigation with [Route Guards](./route-guards.md). 