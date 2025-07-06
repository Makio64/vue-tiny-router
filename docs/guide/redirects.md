---
title: Redirects
editLink: true
---

# Redirects

Sometimes you need to route old or deprecated paths to new ones. `vue-tiny-router` supports redirects through the `redirects` prop.

## Defining Redirects

Pass a `redirects` object to the `<TinyRouter>` component, where keys are source paths and values are target paths:

```js
const redirects = {
  '/old-path': '/new-path',
  '/home': '/',
  '/profile': '/user/123'
}

<TinyRouter :routes="routes" :redirects="redirects" />
```

Now, navigating to an old path will automatically replace it with the new path before rendering.

## Redirect Behavior

- Redirects happen before route matching.  
- The browser URL is updated to the new path.  
- Guards, parameters, and other features apply to the final route.

## Use Cases

- Migrating legacy URLs  
- Handling typo-ed user-entered paths  
- Shortcuts (e.g. `/go` → `/get-started`)

Next: Learn about advanced routing features in the [Memory Mode](./memory-mode.md) guide. 