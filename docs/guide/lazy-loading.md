---
title: Lazy Loading
editLink: true
---

# Lazy Loading

Lazy loading lets you split your application into smaller chunks that load only when needed.

## Define Lazy-Loaded Routes

Use Vue's `defineAsyncComponent` to wrap your component imports:

```js
import { defineAsyncComponent } from 'vue'

const routes = [
  { path: '/', component: defineAsyncComponent(() => import('./Home.vue')) },
  { path: '/heavy', component: defineAsyncComponent(() => import('./Heavy.vue')) }
]
```

Now, the `Heavy` component will only be fetched when navigating to `/heavy`.

## Benefits

- Improved initial load time  
- Better code-splitting  
- On-demand resource usage  

Next: Learn how to use multiple router instances on the same page in the [Multiple Routers](./multiple-routers.md) guide. 