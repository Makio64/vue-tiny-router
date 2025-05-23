<template>
	<component :is="currentComponent" ref="activeView" :route-params="routeParams" />
</template>

<script>
import { ref } from 'vue'

let TinyRouterInstance
let isNavigatingProgrammatically = false

/** 
 * Array of URL paths to intercept with router navigation
 * @example interceptURL.value = ['/login', '/signup']
 */
export const interceptURL = ref( [] )

/** 
 * Default route to redirect to on app start
 * @example defaultRoute.value = '/home'
 */
export const defaultRoute = ref( null )

/** Initial route when app started */
export const initialRoute = ref( window?.location.pathname )

/** Initial query params when app started */
export const initialQuery = ref( window?.location.search )

const TinyRouter = {
	name: 'TinyRouter',
	props: {
		/** 
		 * Array of route objects with path and component
		 * @example [{ path: '/', component: Home }, { path: '/user/:id', component: User }]
		 */
		routes: { type: Array, required: true },
		
		/** 
		 * Object mapping old paths to new paths for redirects
		 * @example { '/old': '/new', '/home': '/' }
		 */
		redirects: { type: Object, default: () => ( {} ) },
		
		/** 
		 * Enable memory-only routing (doesn't affect browser URL/history)
		 * Useful for embedded apps or testing
		 */
		memoryMode: { type: Boolean, default: false }
	},
	data: () => ( { route: '', routeParams: {} } ),
	computed: {
		currentComponent() {
			const pathOnly = this.route.split( '#' )[0].split( '?' )[0]
			const resolved = this.redirects[pathOnly] || pathOnly
			const match = this.routes.find( r => {
				if ( !resolved ) return false
				const paramNames = []
				const regex = r.path.replace( /:([^/]+)/g, ( _, n ) => ( paramNames.push( n ), '([^/]+)' ) )
				const found = resolved.match( new RegExp( `^${regex}$` ) )
				if ( found ) {
					this.routeParams = paramNames.reduce( ( acc, name, i ) => ( acc[name] = found[i + 1], acc ), {} )
					return true
				}
			} )
			if ( !match ) console.warn( `Route "${resolved}" not found` )
			return match ? match.component : this.routes[0].component
		}
	},
	created() {
		TinyRouterInstance = this
		if( !this.memoryMode ) window?.addEventListener( 'popstate', () => this.push( window?.location.pathname, true ) )
		this.push( ( defaultRoute.value || initialRoute.value ) + initialQuery.value )
	},
	methods: {
		proceed( path, isPop = false ) {
			if ( !isPop ) {
				isNavigatingProgrammatically = true
				setTimeout( () => { isNavigatingProgrammatically = false }, 0 )
				if ( this.memoryMode ) this.push( path, true )
				else history.pushState( null, '', path )
			}
			this.route = path
		},
		
		/** 
		 * Navigate to a new route
		 * @param {string} path - The path to navigate to (e.g., '/user/123')
		 * @param {boolean} isPop - Internal flag for history navigation
		 */
		push( path, isPop = false ) {
			path = path.replace(/\/{2,}/g, '/')
			if ( path === this.route ) return
			const leaveGuard = this.$refs.activeView?.beforeRouteLeave
			leaveGuard ? leaveGuard( () => this.proceed( path, isPop ) ) : this.proceed( path, isPop )
		}
	}
}

// Handle external links
if (typeof navigation !== 'undefined') {
	navigation?.addEventListener( "navigate", ( event ) => {
		const { pathname, search, hash, origin } = new URL( event.destination.url )
		if ( isNavigatingProgrammatically || origin !== window.location.origin || !interceptURL.value.includes( pathname ) ) return
		event.preventDefault()
		let path = pathname + search + hash
		path = path.replace(/\/{2,}/g, '/')
		TinyRouterInstance ? TinyRouterInstance.push( path ) : ( window.location.href = path )
	} )
}

export default TinyRouter

export { TinyRouter }

/**
 * Vue plugin installer - adds TinyRouter component and $router global property
 * Usage: app.use(TinyRouterInstall)
 */
export const TinyRouterInstall = {
	install( app ) {
		app.component( 'TinyRouter', TinyRouter )
		app.config.globalProperties.$router = {
			/** Navigate to a route - this.$router.push('/path') */
			push( path ) { TinyRouterInstance?.push( path ) },
			
			/** Get current route path - this.$router.route */
			get route() { return TinyRouterInstance?.route },
			
			/** Get current component instance - this.$router.component */
			get component() { return TinyRouterInstance?.currentComponent },
			
			/** Get route parameters object - this.$router.params.id */
			get params() { return TinyRouterInstance?.routeParams },
			// this is native history API so doesnt need to be wrapped, dont work in memorymode
			// go( n ) { history.go( n ) },
			// forward() { history.forward() },
			// back() { history.back() }
		}
	}
}
</script>
