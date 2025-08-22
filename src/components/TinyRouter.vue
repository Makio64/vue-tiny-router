<template>
	<component :is="currentComponent" ref="activeView" :key="route" :route-params="routeParams" />
</template>

<script>
import { ref } from 'vue'

let TinyRouterInstance
let isNavigatingProgrammatically = false

/** 
 * Default route to redirect to on app start
 * @example defaultRoute.value = '/home'
 */
export const defaultRoute = ref( null )

/** Initial route when app started */
export const initialRoute = ref( window?.location.pathname )

/** Initial query params when app started */
export const initialQuery = ref( window?.location.search )

const findMatch = ( path, routes, redirects ) => {
	const pathOnly = path.split( '#' )[0].split( '?' )[0]
	const resolved = redirects[pathOnly] || pathOnly
	if ( !resolved ) return { route: null, params: {}, resolved: pathOnly }

	for ( const route of routes ) {
		const paramNames = []
		let pattern = route.path.replace( /:([^/]+)/g, ( _, name ) => {
			paramNames.push( name )
			return '([^/]*)'
		} )
		
		// Make last segment optional if it has a param
		if ( /:[^/]+$/.test( route.path ) ) {
			const i = pattern.lastIndexOf( '/([^/]*)' )
			if ( i > 0 ) pattern = pattern.slice( 0, i ) + '(?:' + pattern.slice( i ) + ')?'
		}
		
		const match = resolved.match( new RegExp( '^' + pattern + '/?$' ) )
		if ( match ) {
			const params = paramNames.reduce( ( acc, name, i ) => {
				acc[name] = match[i + 1] || ''
				return acc
			}, {} )
			return { route, params, resolved }
		}
	}

	return { route: null, params: {}, resolved }
}

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
			const { route, params, resolved } = findMatch( this.route, this.routes, this.redirects )
			this.routeParams = params
			if ( !route ) console.warn( `Route "${resolved}" not found` )
			return route ? route.component : this.routes[0].component
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
			// Anchor support – if the path contains a hash, scroll to the element with the corresponding id
			if ( typeof document !== 'undefined' ) {
				const hashParts = path.split( '#' )
				if ( hashParts.length > 1 ) {
					const hash = hashParts[1]
					if ( hash ) {
						requestAnimationFrame( () => document.getElementById( decodeURIComponent( hash ) )?.scrollIntoView({ behavior: 'smooth', block: 'start' }) )
					} else {
						// Empty hash - scroll to top
						requestAnimationFrame( () => window.scrollTo({ top: 0, behavior: 'smooth' }) )
					}
				}
			}
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
		if ( isNavigatingProgrammatically || origin !== window.location.origin || !TinyRouterInstance ) return

		const { route } = findMatch( pathname, TinyRouterInstance.routes, TinyRouterInstance.redirects )

		if ( !route ) return

		event.preventDefault()
		let path = pathname + search + hash
		path = path.replace(/\/{2,}/g, '/')
		TinyRouterInstance.push( path )
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
