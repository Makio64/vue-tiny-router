---
title: Route Parameters
editLink: true
---

# Route Parameters

Route parameters allow you to create dynamic routes by capturing segments of the URL. This is essential for building pages like user profiles, product details, or blog posts.

## Defining a Route with Parameters

To define a route with a parameter, use a colon (`:`) followed by the parameter name in the `path`.

For example, to create a route for user profiles that captures a user ID, you can define it like this:

```js
import UserProfile from './views/UserProfile.vue'

const routes = [
  // This route will match /user/1, /user/jane, etc.
  { path: '/user/:id', component: UserProfile }
]
```

In this example, `:id` is the route parameter.

### Multiple Parameters

You can include multiple parameters in a single route. For instance, to view a specific post by a user:

```js
import UserPost from './views/UserPost.vue'

const routes = [
  { path: '/user/:userId/post/:postId', component: UserPost }
]
```

This route would match URLs like `/user/123/post/456`.

## Accessing Route Parameters

Inside your component, you can access the values of the route parameters through the `$router.params` object. This object contains a key-value pair for each parameter in the matched route.

Let's create the `UserProfile.vue` component to see how this works:

```vue
<!-- src/views/UserProfile.vue -->
<template>
  <div>
    <h1>User Profile</h1>
    <p>Loading profile for User ID: {{ userId }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    userId() {
      // Access the 'id' parameter from the route
      return this.$router.params.id
    }
  },
  mounted() {
    console.log('User ID:', this.$router.params.id)
    // You can now fetch user data using this ID
  }
}
</script>
```

When a user navigates to `/user/123`:
- `this.$router.params` will be `{ id: '123' }`.
- `this.userId` will return `'123'`.

For the route `/user/:userId/post/:postId`, navigating to `/user/123/post/456` would result in:
- `this.$router.params` being `{ userId: '123', postId: '456' }`.

## Reacting to Parameter Changes

A common scenario is navigating from one user profile to another (e.g., from `/user/123` to `/user/456`). `vue-tiny-router` handles this by re-creating the component instance by default. This ensures that lifecycle hooks like `mounted` are re-triggered, and `data` is re-initialized, which is often the desired behavior for fetching new data.

This means the `UserProfile` component from the example above will work as expected when navigating between different user profiles. The `userId` computed property will automatically update, and the component will re-render with the new data.

## Optional Parameters

`vue-tiny-router`'s minimalist design does not support optional parameters (e.g., `/user/:id?`) out of the box. If you need to handle optional parameters, you can define multiple routes that point to the same component:

```js
import UserProfile from './views/UserProfile.vue'

const routes = [
  { path: '/user/:id', component: UserProfile },
  { path: /user', component: UserProfile } // Handles the case without an ID
]
```

Next, let's learn about navigating programmatically in more detail in the [Programmatic Navigation](./programmatic-navigation.md) guide. 