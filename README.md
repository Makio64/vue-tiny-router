# vue-tiny-router 🌱
Hi! I'm a minimalist (0.98kb) but powerful vue3 router! Nice to meet you!👋

## Getting Started

### Install me! 📦
Use your favorite packages system 
- `pnpm i vue-tiny-router`
- `npm i vue-tiny-router`
- `yarn install vue-tiny-router`

### Use me! 🚀

Install me in your app, usually in `main.js`
``` js
import App from '@/App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

const app = createApp( App )
app.use( TinyRouterInstall )
app.mount( '#app' )
```

Use me where you want, usually in `App.vue`
``` vue
<template>
  <TinyRouter :routes="routes" :redirects="redirects" />
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'
// import your pages

export default {
  data: ()=>({
    routes:[
      { path: '/', component: HomeView},
      { path: '/hire/:freelanceId', component: FreelanceView  },
    ],
    redirects: {'/home': '/'}
  })
  components: { TinyRouter }
}
</script>
```

And now in any of your component you can navigate 🌐
```vue
  <div class="button" @click="$router.push('/home')">Home</div>
  <div class="button" @click="$router.push('/hire/makio64')">Hire me</div>
```

### My API! 🔥

#### Navigate to a page
`this.$router.push('/home')`

#### Route Guard
You can add a leaveGuard to your page component, for example to make a transitionOut : `beforeRouteLeave(next, to){ /*do whatever animation or process you want and then call*/ next() }`

#### history mode only
- back: `history.back()`
- forward: `history.forward()`
- go(n): `history.go(n)`

### Async loading ⚡
Use `defineAsyncComponent` from vue to do async loading, a good practice to reduce the main loading! 👑

``` vue
  routes:[
    { path: '/', component: defineAsyncComponent( () => import( '@/views/HomeView' ) )},
    { path: '/hire/:freelanceId', component: defineAsyncComponent( () => import( '@/views/FreelanceView' ) )}  },
  ]
```

## FAQ 💬

### What's your size ?
I'm the smallest ! 🤏
- 2.58kb without compression
- 0.98kb with brotly!

### What can you do ?
As a router I'll got you covered! 💪
- basic routing `$router.push('/login')` 
- parameters support `$router.push('/user/:id')`
- leaveGuard 
- redirection support 
- history & memory support 
- back / forward / go(n)

### Why do you exist?
I'm design as an alternative to vue-router with simplicity and lightness as priority. ⚡

### I need new functionality

Open an issue or a pull-request and let's discuss it! 

For pull-request keep everything as minimal and simple as possible, I wanna keep in shape! 🕺
