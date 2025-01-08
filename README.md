# vue-tiny-router 🌱

Hello! I'm **vue-tiny-router**, a tiny (0.98kb) router for Vue3. Nice to meet you! 👋

## Summary

- [Getting Started](#getting-started)
  - [Install Me! 📦](#install-me-📦)
  - [Use Me! 🚀](#use-me-🚀)
- [My API! 🔥](#my-api-🔥)
  - [Navigate to a Page](#navigate-to-a-page)
  - [Route Guard](#route-guard)
  - [History Mode API](#history-mode-only)
- [Async Loading ⚡](#async-loading-⚡)
- [FAQ 💬](#faq-💬)
  - [What's Your Size?](#whats-your-size-)
  - [What Can You Do?](#what-can-you-do-)
  - [Why Do You Exist?](#why-do-you-exist-)
  - [I Need New Features?](#i-need-new-features)

## Getting Started

### Install Me! 📦

Choose your favorite package manager:

- `pnpm i vue-tiny-router`
- `npm install vue-tiny-router`
- `yarn add vue-tiny-router`

### Use Me! 🚀

**1. Add Me to Your App**

Usually in `main.js`:

```js
import App from '@/App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

const app = createApp(App)
app.use(TinyRouterInstall)
app.mount('#app')
```

**2. Use Me in Your App Component**

Usually in `App.vue`:

```vue
<template>
  <TinyRouter :routes="routes" :redirects="redirects" />
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'
// Import your page components

export default {
  data: () => ({
    routes: [
      { path: '/', component: HomeView },
      { path: '/hire/:freelanceId', component: FreelanceView },
    ],
    redirects: { '/home': '/' }
  }),
  components: { TinyRouter }
}
</script>
```

**3. Navigate!**

You can navigate like this:

```html
<div class="button" @click="$router.push('/home')">Home</div>
<div class="button" @click="$router.push('/hire/makio64')">Hire me</div>
```

### My API! 🔥

#### Navigate to a Page

Use `this.$router.push( path )` to go to the page define by path.
#### Route Guard

Add a `beforeRouteLeave` guard in your page component to handle actions before leaving a route:

```js
beforeRouteLeave(next, to) {
  // Do something, like an animation
  next()
}
```

#### Parameters
Use `this.$router.params` to get the current parameters object

#### History Mode API

To keep me super small these features directly relate on history API : `history.back()`, `history.forward()`,  `history.go(n)`

### Async Loading ⚡

Use `defineAsyncComponent` from Vue for lazy loading. This helps reduce the initial load time! It's the way I recommend but you're the boss! 👑

```js
routes: [
  { path: '/', component: defineAsyncComponent(() => import('@/views/HomeView')) },
  { path: '/hire/:freelanceId', component: defineAsyncComponent(() => import('@/views/FreelanceView')) },
]
```

## FAQ 💬

### What's Your Size?

I'm the smallest! 🤏

- **0.98kb** with Brotli compression
- **2.58kb** without compression

### What Can I Do? 💪
I focus on easily switch pages in your app. 

I support basic and dynamic routes, handle redirects, manage browsing history, and lazy loading.

Finaly make smooth transition using my `leaveGuard` before leaving a page.

### Why do you exist?
My big brother `vue-router` was too heavy for my needs (~30kb vs ~1kb) so I'm design as an alternative with lightness as priority. ⚡ 

### I Need New Features?
Feel free to open an issue or a pull request and let's discuss it. 💬

For pull request, keep everything minimalist as much as possible. I wanna keep in shape! 🕺

## Thanks for reading ! 💖

I'm looking forward to work together and make cool stuffs!

Best, vue-tiny-router