---
title: Memory Mode
editLink: true
---

# Memory Mode

The `memoryMode` prop lets you run a router instance in memory without affecting the browser's URL or history. This is useful for embedded widgets or testing.

## Enabling Memory Mode

Add the `memoryMode` boolean prop to your `<TinyRouter>` component:

```vue
<TinyRouter :routes="routes" :memoryMode="true" />
```

## Behavior

- Navigations update only an internal state.  
- The browser URL and history remain unchanged.  
- Useful for isolated routing (e.g., modals, widgets).

## Example

```vue
<template>
  <TinyRouter :routes="tabs" :memoryMode="true" />
</template>

<script>
import TabHome from './TabHome.vue'
import TabSettings from './TabSettings.vue'

export default {
  data() {
    return {
      tabs: [
        { path: '/', component: TabHome },
        { path: '/settings', component: TabSettings }
      ]
    }
  }
}
</script>
```

Now clicking links will switch tabs without changing the browser address bar.

Learn how to use anchor links in the [Anchor Links](./anchor-links.md) guide. 