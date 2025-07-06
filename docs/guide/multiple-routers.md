---
title: Multiple Routers
editLink: true
---

# Multiple Routers

You can run multiple `<TinyRouter>` instances in the same app for independent routing contexts.

## Use Cases

- Sidebars + main views  
- Embedded flows  
- Isolated modals  

## Example

```vue
<template>
  <div class="layout">
    <aside>
      <TinyRouter :routes="menuRoutes" :memoryMode="true" />
    </aside>
    <section>
      <TinyRouter :routes="mainRoutes" />
    </section>
  </div>
</template>

<script>
import MenuHome from './MenuHome.vue'
import MenuSettings from './MenuSettings.vue'
import Page1 from './Page1.vue'
import Page2 from './Page2.vue'

export default {
  data() {
    return {
      menuRoutes: [
        { path: '/', component: MenuHome },
        { path: '/settings', component: MenuSettings }
      ],
      mainRoutes: [
        { path: '/', component: Page1 },
        { path: '/page2', component: Page2 }
      ]
    }
  }
}
</script>
```

Each `<TinyRouter>` maintains its own route state and renders its own components.

This concludes our Advanced section. Check out the [API Reference](../api/router.md) for more details. 