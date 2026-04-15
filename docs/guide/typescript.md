# TypeScript Support

vue-tiny-router ships with full TypeScript definitions. No extra `@types` package needed.

## Typed Routes

```ts
import type { Route } from 'vue-tiny-router'

const routes: Route[] = [
  { path: '/', component: Home },
  { path: '/user/:id', component: User, meta: { requiresAuth: true } },
  { path: '/*', component: NotFound }
]
```

## Using Composables

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-tiny-router'

const router = useRouter()
const route = useRoute()

// Typed: route.route is string, route.params is Record<string, string>
console.log(route.params.id)

// Typed: push/replace accept a string
router.push('/user/42')
router.replace('/login')
</script>
```

## Options API

When using `TinyRouterInstall`, `$router` is typed on all component instances:

```ts
export default {
  methods: {
    navigate() {
      // $router is fully typed via module augmentation
      this.$router.push('/about')
      this.$router.replace('/home')
      console.log(this.$router.params)
      console.log(this.$router.meta)
    }
  }
}
```

## Available Types

```ts
import type {
  Route,           // { path, component, meta? }
  RedirectsMap,    // { [from]: to }
  TinyRouterProps, // Component props
  RouterAPI,       // push, replace, back, forward, go, route, params, meta
  RouteState       // route, params, meta
} from 'vue-tiny-router'
```
