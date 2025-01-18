# vue-tiny-router 🌱

Hello! I'm **vue-tiny-router**, a tiny (0.98kb) router for Vue3. Nice to meet you! 👋

## Summary 🌟

- [Getting Started](#getting-started)
  - [Installation 📦](#installation-)
  - [Quick Start 🚀](#quick-start-)
- [API Reference ✨](#api-reference-)
  - [Navigate to a Page 🔗](#navigate-to-a-page-)
  - [Route Parameters 🛠️](#route-parameters-)
  - [Route Guards 💂‍♂️](#route-guards-)
  - [Default Route 🗺️](#default-route-)
  - [History Management 📜](#history-management-)
  - [Memory Mode 💾](#memory-mode-)
- [Asynchronous Loading ⚡](#asynchronous-loading-⚡)
- [FAQ 💬](#faq-💬)
  - [What’s Your Size? 🤏](#whats-your-size)
  - [What Can You Do? 💪](#what-can-you-do-)
  - [Why a New Router? 🫠](#why-a-new-router-)
  - [Need More Features? 💡](#need-more-features-)


## Getting Started

### Installation 📦

Use your preferred package manager to install me:
```bash
npm i vue-tiny-router
# or
pnpm i vue-tiny-router
# or
yarn add vue-tiny-router
```

### Quick Start 🚀

**1. Register the Router in Your App**

Typically in `main.js`:

```js
// main.js
import App from '@/App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

const app = createApp(App)
app.use(TinyRouterInstall)
app.mount('#app')
```

**2. Configure the Router in Your App Component**


```js
<template>
  <TinyRouter :routes="routes" :redirects="redirects" />
</template>

<script lang='js'>
// usually App.vue
import { TinyRouter } from 'vue-tiny-router' // Import the router
import { HomeView, ProfileView } from '@/views' // Import your page components

export default {

  data(){
    return {
      routes: [ 
        { path: '/', component: HomeView }, 
        { path: '/profile/:username', component: ProfileView }
      ],
      redirects: { '/home': '/' }
    }
  },

  components: { TinyRouter } // Make TinyRouter available in the template
}
</script>
```

**3. Implement Navigation Actions**

Navigate directly using `$router`:
```html
<div class="button" @click="$router.push('/home')">Home</div>
<div class="button" @click="$router.push(`/profile/${username}`)">My Profile</div>
```

Or navigate via `methods`:
```js
<template>
  <div class="button" @click="goProfile">Profile</div>
</template>

<script>
export default {
  data : ()=> ({
      username: 'makio64',
  }),
  methods: {
    goProfile() {
      this.$router.push(`/profile/${this.username}`)
    },
  },
}
</script>
```


## API Reference ✨

No worries—I'm not complicating things! I simply add a friendly `$router` property to your components.

### Available Properties and Methods 🌐
- `$router.push(path)` navigates to a new route,
- `$router.route` gives you the current path,
- `$router.params` is the object holding route parameters,
- `$router.component` references the current TinyRouter component.

### TinyRouter Component Props 📦
- routes `Array of Objects`
- redirects `Object (default:{})`
- memoryMode `Boolean (default:false)`

```js
  <TinyRouter :routes="routes" :redirects="redirects" :memoryMode="false" />
```

### Navigate to a Page 🔗

Use `this.$router.push( path )` to go to the page define by path.

### Parameters 🛠️
Use `this.$router.params` to get the parameters of the current route.

For example if your route is `/profile/:username`, you can grab the username via: `this.$router.params.username`

### Route Guard 💂‍♂️

I let you define a "leave" guard in your component using `beforeRouteLeave(next, to)`. 
This is perfect if you want to prevent navigation until an async task finishes 
or show a fancy animation before heading out. 
Just be sure to call `next()` when you're done to let me continue!

```js
beforeRouteLeave(next, to) {
  // Option 1: for example make a transition out and then call next
  animate(this.$el, {opacity:0, duration:1, onComplete:next})

  // Option 2: Perform an action and call next directly
  this.saveData()
  next()
}
```

### Async Loading ⚡

Use `defineAsyncComponent` from Vue for lazy loading. 
```js
routes: [
  { path: '/', component: defineAsyncComponent(() => import('@/views/HomeView')) },
  { path: '/profile/:username', component: defineAsyncComponent(() => import('@/views/ProfileView')) },
]
```
This helps reduce the initial load time! I recommend to use it but you're the boss! 👑

### Default Route 🗺️
- You can define a default route using `defaultRoute.value = '/loader'` then I'll redirect all your user to this route by default
- I also save the initial path & query in `initialPath` & `initialQuery`
```js
  import {defaultRoute, initialPath, initialQuery} from 'vue-tiny-router'
```

### History Management 📜

To keep me small I use the History API for navigation methods:
- `history.back()`: Navigate back.
- `history.forward()`: Navigate forward.
- `history.go(n)`: Move `n` steps in history.

### Memory Mode 💾

Enable memoryMode to manage routing purely in memory without affecting the browser's history or URL.

**Usage:**
```js
<TinyRouter :routes="routes" :memoryMode="true" />
```

**Benefits:**

- Ideal for embedded environments. ( Nodejs )
- Prevents altering the actual browser history.

## FAQ 💬

### What's Your Size?

I'm the smallest! 🤏

- **0.98kb** with Brotli compression
- **2.58kb** without compression

### What Can You Do? 💪
I focus on easily switch pages in your app. 

I support basic and dynamic routes, handle redirects, manage browsing history, and lazy loading.

Finaly make smooth transition using my `leaveGuard` before leaving a page.

### Why a new Router? 🫠
My big brother `vue-router` was too bulky for my needs (~30kb vs ~1kb) so I'm design as a minimalist alternative with lightness and performance as priority. ⚡ 

### I Need More Features? 💡
Feel free to open an issue or a pull request and let's discuss it. 💬

For pull request, keep everything minimalist as much as possible. I wanna keep in shape! 🕺

## Thanks for reading ❤️

I'm excited to work together and help you build cool projects!

Best, 

**vue-tiny-router**