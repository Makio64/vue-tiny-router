<template>
	<component :is="currentComponent" ref="activeView" :key="route" :route-params="routeParams" />
</template>

<script>
import { ref } from 'vue'

let TinyRouterInstance
let isNavigatingProgrammatically = false
const regexCache = {}

export const defaultRoute = ref( null )
export const initialRoute = ref( window?.location.pathname )
export const initialQuery = ref( window?.location.search )
export const routeState = ref( { route: ( ( initialRoute.value || '' ) + ( initialQuery.value || '' ) ), params: {}, meta: {} } )

const findMatch = ( path, routes, redirects ) => {
	const pathOnly = path.split( '#' )[0].split( '?' )[0]
	const resolved = redirects[pathOnly] || pathOnly
	if ( !resolved ) return { route: null, params: {}, resolved: pathOnly }

	// Check exact matches first
	const exactMatch = routes.find( r =>  r.path === resolved || r.path === resolved + '/' || r.path + '/' === resolved )
	if ( exactMatch ) return { route: exactMatch, params: {}, resolved }

	// Check parameterized and wildcard routes
	for ( const route of routes ) {
		if ( !regexCache[route.path] ) {
			const paramNames = []
			let pattern = route.path
			// Support wildcard catch-all (e.g., /* or /user/*)
			if ( pattern.includes( '*' ) ) pattern = pattern.replace( /\*+/g, '.*' )
			pattern = pattern.replace( /:([^/]+)/g, ( _, name ) => {
				paramNames.push( name )
				return '([^/]*)'
			} )

			// Make last segment optional if it has a param
			if ( /:[^/]+$/.test( route.path ) ) {
				const i = pattern.lastIndexOf( '/([^/]*)' )
				if ( i > 0 ) pattern = pattern.slice( 0, i ) + '(?:' + pattern.slice( i ) + ')?'
			}
			regexCache[route.path] = { regex: new RegExp( '^' + pattern + '/?$' ), paramNames }
		}

		const { regex, paramNames } = regexCache[route.path]
		const match = resolved.match( regex )
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
		routes: { type: Array, required: true },
		redirects: { type: Object, default: () => ( {} ) },
		memoryMode: { type: Boolean, default: false },
		scrollSmooth: { type: Boolean, default: false }
	},
	data: () => ( { route: '', routeParams: {} } ),
	computed: {
		currentComponent() {
			const { route, params, resolved } = findMatch( this.route, this.routes, this.redirects )
			this.routeParams = params
			routeState.value.params = params
			routeState.value.meta = route?.meta || {}
			if ( !route ) console.warn( `Route "${resolved}" not found` )
			return route ? route.component : this.routes[0].component
		}
	},
	created() {
		TinyRouterInstance = this
		if ( !this.memoryMode ) window?.addEventListener( 'popstate', () => this.push( window?.location.pathname, true ) )
		this.push( ( defaultRoute.value || initialRoute.value ) + initialQuery.value )
	},
	unmounted() {
		if ( this.__onPop ) window?.removeEventListener( 'popstate', this.__onPop )
		if ( this.__onNavigate ) navigation?.removeEventListener( 'navigate', this.__onNavigate )
	},
	methods: {
		proceed( path, _isPop = true, _isReplace = false ) {
			if ( !_isPop ) {
				isNavigatingProgrammatically = true
				setTimeout( () => { isNavigatingProgrammatically = false }, 0 )
				if ( !this.memoryMode ) _isReplace ? history.replaceState( null, '', path ) : history.pushState( null, '', path )
			}
			this.route = path
			routeState.value.route = path

			const first = !this.__didFirstNav
			this.__didFirstNav = true
			if ( first ) return

			const [, hash = ''] = path.split( '#' )
			const behavior = this.scrollSmooth ? 'smooth' : 'auto'
			requestAnimationFrame( () => {
				if ( hash ) {
					document.getElementById( decodeURIComponent( hash ) )?.scrollIntoView( { behavior, block: 'start' } )
				} else {
					window.scrollTo( { top: 0, left: 0, behavior } )
				}
			} )
		}
		,
		/**
		 * Navigate to a new route.
		 * @param {string} path - Target path (e.g. '/user/123').
		 * @param {boolean} [_isPop=false] - Internal: true when called from popstate/navigate handlers.
		 * @param {boolean} [_isReplace=false] - Internal: true to use history.replaceState; prefer calling replace().
		 */
		push( path, _isPop = false, _isReplace = false ) {
			path = path.replace( /\/{2,}/g, '/' )
			if ( path === this.route ) return
			const leaveGuard = this.$refs.activeView?.beforeRouteLeave
			leaveGuard ? leaveGuard( () => this.proceed( path, _isPop, _isReplace ) ) : this.proceed( path, _isPop, _isReplace )
		},
		/** Navigate without pushing a history entry (history.replaceState). */
		replace( path ) { this.push( path, false, true ) }
	}
}

if ( typeof navigation !== 'undefined' ) {
	navigation?.addEventListener( "navigate", ( event ) => {
		const { pathname, search, hash, origin } = new URL( event.destination.url )
		if ( isNavigatingProgrammatically || origin !== window.location.origin || !TinyRouterInstance ) return

		const { route } = findMatch( pathname, TinyRouterInstance.routes, TinyRouterInstance.redirects )

		if ( !route ) return

		event.preventDefault()
		let path = pathname + search + hash
		path = path.replace( /\/{2,}/g, '/' )
		TinyRouterInstance.push( path )
	} )
}

export default TinyRouter

export { TinyRouter }

const navActions = {
	push( path ) { TinyRouterInstance?.push( path ) },
	replace( path ) { TinyRouterInstance?.replace( path ) },
	back() { history.back() },
	forward() { history.forward() },
	go( n ) { history.go( n ) }
}

/**
 * Vue plugin installer — registers the <TinyRouter> component and the $router
 * global. $router reads through TinyRouterInstance to preserve the original
 * pre-mount semantics (route/params/component are undefined until mounted).
 * @usage app.use(TinyRouterInstall)
 */
export const TinyRouterInstall = {
	install( app ) {
		app.component( 'TinyRouter', TinyRouter )
		app.config.globalProperties.$router = {
			...navActions,
			get route() { return TinyRouterInstance?.route },
			get component() { return TinyRouterInstance?.currentComponent },
			get params() { return TinyRouterInstance?.routeParams },
			get meta() { return routeState.value.meta }
		}
	}
}

export const useRouter = () => ( {
	...navActions,
	get route() { return routeState.value.route },
	get params() { return routeState.value.params },
	get meta() { return routeState.value.meta },
	get component() { return TinyRouterInstance?.currentComponent }
} )

export const useRoute = () => ( {
	get route() { return routeState.value.route },
	get params() { return routeState.value.params },
	get meta() { return routeState.value.meta }
} )
</script>
