---
title: Route Guards
editLink: true
---

# Route Guards

Route guards are functions that are called before a navigation event, allowing you to control or cancel the navigation. They are perfect for implementing authentication, preventing users from leaving a page with unsaved changes, or logging analytics events.

`vue-tiny-router` provides a simple yet effective in-component guard: `beforeRouteLeave`.

## `beforeRouteLeave`

The `beforeRouteLeave` guard is triggered when the user attempts to navigate away from the component where the guard is defined.

To use it, add a `beforeRouteLeave` method to your component. This method will receive one argument:
- `next`: A function that you must call to resolve the navigation. If you don't call `next()`, the navigation will be blocked.

### Example: Preventing Navigation with Unsaved Changes

A classic use case for `beforeRouteLeave` is to prevent a user from accidentally losing their work. Imagine a form component with a data property `isFormDirty` that tracks whether the user has made changes.

```vue
<!-- src/components/EditProfile.vue -->
<template>
  <div>
    <h2>Edit Profile</h2>
    <input v-model="name" @input="isFormDirty = true" />
    <textarea v-model="bio" @input="isFormDirty = true"></textarea>
    <button @click="saveProfile">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      bio: '',
      isFormDirty: false
    }
  },
  methods: {
    saveProfile() {
      // Logic to save the profile...
      this.isFormDirty = false
      this.$router.push('/profile')
    },
    beforeRouteLeave(next) {
      if (this.isFormDirty) {
        // Ask the user for confirmation
        if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
          // If they confirm, allow navigation
          next()
        } else {
          // If they cancel, block navigation
          // (do nothing, don't call next())
        }
      } else {
        // If there are no unsaved changes, allow navigation
        next()
      }
    }
  }
}
</script>
```

In this example:
1. When the user tries to navigate away, `beforeRouteLeave` is called.
2. It checks if `isFormDirty` is `true`.
3. If it is, it shows a confirmation dialog.
   - If the user clicks "OK", `next()` is called, and the navigation proceeds.
   - If the user clicks "Cancel", `next()` is not called, and the user stays on the current page.
4. If the form is not dirty, `next()` is called immediately, allowing the navigation to proceed without interruption.

### Asynchronous Guards

`beforeRouteLeave` also supports asynchronous operations. For example, you might need to save some data to an API before leaving the page.

```js
// ...
methods: {
  async beforeRouteLeave(next) {
    if (this.needsToSave) {
      try {
        await this.saveDraft()
        // Once the async operation is complete, allow navigation
        next()
      } catch (error) {
        // Handle the error, maybe block navigation
        console.error('Failed to save draft:', error)
      }
    } else {
      next()
    }
  }
}
// ...
```

:::tip Note on Global Guards
`vue-tiny-router` focuses on simplicity and keeps guards component-centric. It does not provide global guards like `beforeEach` or `afterEach` found in `vue-router`. If you need global logic, you can implement it in your root `App.vue` component by watching for changes to `$router.route`.
:::

Next, let's learn how to set up [Redirects](./redirects.md) to handle old or alternative URLs. 