# Vue-Tiny-Router
Hi! I'm a minimalist but powerfull vue3 router

# Getting Started

## Install
- `pnpm i vue-tiny-router`
- `npm i vue-tiny-router`
- `yarn install vue-tiny-router`
- 
## use
``` js
import App from '@/App.vue'
import { TinyRouterInstall } from 'vue-tiny-router'

const app = createApp( App )
app.use( TinyRouterInstall )
app.mount( '#app' )
```

``` vue
<template>
	<div class="view">
		<TinyRouter :routes="routes" :redirects="redirects" />
	</div>
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'

export default {
	name: 'App',
	computed: {
		routes() {
			return [
				{
					path: '/',
					component: defineAsyncComponent( () => import( '@/views/HomeView' ) ),
				},
				{
					path: '/hire/:freelanceId',
					component: defineAsyncComponent( () => import( '@/views/FreelanceView' ) ),
				},
			]
		},
		redirects() {
			return {
				'/home': '/'
			}
		},
	},
	components: { TinyRouter }
}
</script>
```

# FAQ

## What's your size ?
I'm the smallest !
- 2.58kb without compression
- 0.98kb with brotly!

## What can you do ?
As a router I'll got you coverd!
- basic routing `$router.push('/login')` 
- parameters support `$router.push('/user/:id')`
- leaveGuard 
- redirection support 
- history & memory support 
- back / forward / go(n)

## Why do you exist?
I'm design as an alternative to vue-router with simplicity and lightness as priority.

## I need new functionality
Open an issue or a pull-request and let's discuss it! For pull-request keep everything as minimal and simple as possible, I wanna keep in shape!
