# Router API

## TinyRouter Component

The main router component that renders the current route.

### Props

#### `routes`
- **Type:** `Array<RouteObject>`
- **Required:** `true`
- **Description:** Array of route objects defining the routing configuration

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: UserProfile },
  { path: '/about', component: About }
]
```

#### `redirects`
- **Type:** `Object`
- **Default:** `{}`
- **Description:** Object mapping old paths to new paths for redirects

```javascript
const redirects = {
  '/old-path': '/new-path',
  '/home': '/',
  '/profile': '/user/123'
}
```

#### `memoryMode`
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** Enable memory-only routing (doesn't affect browser URL/history)

```vue
<TinyRouter :routes="routes" :memoryMode="true" />
```

### Usage

```vue
<template>
  <TinyRouter 
    :routes="routes" 
    :redirects="redirects" 
    :memoryMode="false" 
  />
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
      ],
      redirects: {
        '/home': '/'
      }
    }
  }
}
</script>
```

## RouteObject

Definition of a route object.

### Properties

#### `path`
- **Type:** `String`
- **Required:** `true`
- **Description:** The route path pattern

```javascript
// Static path
{ path: '/', component: Home }

// Dynamic parameter
{ path: '/user/:id', component: UserProfile }

// Multiple parameters
{ path: '/user/:id/post/:postId', component: UserPost }
```

#### `component`
- **Type:** `Component`
- **Required:** `true`
- **Description:** The Vue component to render for this route

```javascript
import Home from './views/Home.vue'
import { defineAsyncComponent } from 'vue'

const routes = [
  // Regular component
  { path: '/', component: Home },
  
  // Lazy loaded component
  { 
    path: '/about', 
    component: defineAsyncComponent(() => import('./views/About.vue'))
  }
]
```

## Global Properties

When you install `TinyRouterInstall`, these properties are available on `this.$router`.

### `$router.push(path)`
- **Type:** `Function`
- **Parameters:** `path: String`
- **Description:** Navigate to a new route

```javascript
// Navigate to a route
this.$router.push('/')
this.$router.push('/about')

// Navigate with parameters
this.$router.push('/user/123')

// Navigate with anchor
this.$router.push('/#section')
```

### `$router.route`
- **Type:** `String` (getter)
- **Description:** Get the current route path

```javascript
console.log(this.$router.route) // '/user/123'
```

### `$router.params`
- **Type:** `Object` (getter)
- **Description:** Get route parameters object

```javascript
// For route '/user/:id' with URL '/user/123'
console.log(this.$router.params) // { id: '123' }

// For route '/user/:id/post/:postId' with URL '/user/123/post/456'
console.log(this.$router.params) // { id: '123', postId: '456' }
```

### `$router.component`
- **Type:** `Component` (getter)
- **Description:** Get the current component instance

```javascript
console.log(this.$router.component) // Current component
```

## Route Guards

Components can implement route guards to control navigation.

### `beforeRouteLeave(next)`

Called before leaving the current route.

```javascript
export default {
  name: 'MyComponent',
  methods: {
    beforeRouteLeave(next) {
      // Allow navigation
      next()
      
      // Or block navigation
      // Don't call next() to prevent navigation
      
      // Async operations
      this.saveData().then(() => {
        next()
      })
    }
  }
}
```

#### Parameters

- **`next`** `Function` - Call this function to allow navigation

#### Example Use Cases

```javascript
// Confirm before leaving
beforeRouteLeave(next) {
  if (confirm('Are you sure you want to leave?')) {
    next()
  }
}

// Check for unsaved changes
beforeRouteLeave(next) {
  if (this.hasUnsavedChanges) {
    if (confirm('You have unsaved changes. Leave anyway?')) {
      next()
    }
  } else {
    next()
  }
}

// Async validation
beforeRouteLeave(next) {
  this.validateForm().then(isValid => {
    if (isValid) {
      next()
    } else {
      alert('Please fix form errors before leaving')
    }
  })
}
```

## Exports

### Named Exports

```javascript
import { 
  TinyRouter,          // Main router component
  TinyRouterInstall,   // Vue plugin installer
  defaultRoute,        // Reactive ref for default route
  initialRoute,        // Reactive ref for initial route
  initialQuery         // Reactive ref for initial query
} from 'vue-tiny-router'
```

### Default Export

```javascript
import TinyRouter from 'vue-tiny-router'
// Same as importing { TinyRouter }
```

## Reactive Configuration

### `defaultRoute`
- **Type:** `Ref<String>`
- **Description:** Set a default route to redirect to on app start

```javascript
import { defaultRoute } from 'vue-tiny-router'

// Redirect to dashboard on app start
defaultRoute.value = '/dashboard'
```

### `initialRoute`
- **Type:** `Ref<String>`
- **Description:** The initial route when the app started
- **Default:** `window.location.pathname`

### `initialQuery`
- **Type:** `Ref<String>`
- **Description:** The initial query parameters when the app started
- **Default:** `window.location.search`

## Browser Navigation

Vue Tiny Router automatically handles:

- **Link interception**: Clicks on `<a>` tags are intercepted if they match a route
- **Back/Forward buttons**: Browser navigation is handled automatically
- **History API**: Uses `pushState` for navigation (unless in memory mode)

## Memory Mode

When `memoryMode` is enabled:

- Router maintains internal state without affecting browser history
- `history.pushState()` is not called
- Perfect for embedded applications or testing
- Multiple router instances can coexist

```vue
<TinyRouter :routes="routes" :memoryMode="true" />
``` 