---
title: Anchor Links
editLink: true
---

# Anchor Links

`vue-tiny-router` automatically supports smooth scrolling to anchor elements in your application.

## How It Works

When navigating to a URL with a hash fragment (e.g. `/about#team`), the router:

1. Matches the `/about` route.  
2. After rendering, it finds the element with the ID from the fragment.  
3. Scrolls it into view with smooth behavior.

## Usage

```html
<a href="/about#team">Meet the Team</a>
<div id="team">...</div>
```

No additional configuration is required.

## Custom Behavior

If you need custom scroll logic, you can watch `$router.route`:

```js
watch: {
  '$router.route'(newRoute) {
    if (newRoute.endsWith('#team')) {
      // custom scroll logic
    }
  }
}
```

Next: See how to lazy-load your components in the [Lazy Loading](./lazy-loading.md) guide. 