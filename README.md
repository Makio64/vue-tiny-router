# vue-tiny-router 🌱

Hello! I'm **vue-tiny-router**, a tiny (0.98kb) but powerful router for Vue 3. Nice to meet you! 👋

## Getting Started

### Install Me! 📦

Choose your favorite package manager:

- `pnpm i vue-tiny-router`
- `npm install vue-tiny-router`
- `yarn add vue-tiny-router`

### Use Me! 🚀

**1. Add Me to Your App**

Usually in `main.js`:

@@@
import App from '@/App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

const app = createApp(App)
app.use(TinyRouterInstall)
app.mount('#app')
@@@

**2. Use Me in Your Component**

Usually in `App.vue`:

@@@
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
@@@

**3. Navigate in Your Components**

You can navigate like this:

@@@
<div class="button" @click="$router.push('/home')">Home</div>
<div class="button" @click="$router.push('/hire/makio64')">Hire me</div>
@@@

### My API! 🔥

#### Navigate to a Page

Use `this.$router.push('/home')` to go to the Home page.

#### Route Guard

Add a `beforeRouteLeave` guard in your page component to handle actions before leaving a route:

@@@
beforeRouteLeave(next, to) {
  // Do something, like an animation
  next()
}
@@@

#### History Mode Only

- Go back: `history.back()`
- Go forward: `history.forward()`
- Go to a specific step: `history.go(n)`

### Async Loading ⚡

Use `defineAsyncComponent` from Vue for lazy loading. This helps reduce the initial load time! 👑

@@@
routes: [
  { path: '/', component: defineAsyncComponent(() => import('@/views/HomeView')) },
  { path: '/hire/:freelanceId', component: defineAsyncComponent(() => import('@/views/FreelanceView')) },
]
@@@

## FAQ 💬

### What's Your Size?

I'm super small! 🤏

- **2.58kb** without compression
- **0.98kb** with Brotli compression

### What Can You Do?

As a router, I can:

- Basic routing: `$router.push('/login')`
- Support route parameters: `$router.push('/user/:id')`
- Route guards
- Redirects
- History and memory modes
- Navigate back, forward, or to a specific step

### Why Do You Exist?

I was created as a simple and lightweight alternative to vue-router. ⚡

### I Need New Features

Feel free to open an issue or a pull request! Let's discuss it.

When submitting a pull request, keep everything minimal and simple. I like to stay lightweight! 🕺

#vuejs #vue3 #router #javascript #webdev
