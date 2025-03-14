<template>
	<component :is="currentComponent" ref="activeView" :route-params="routeParams" />
</template>

<script>
import { ref } from 'vue'
let TinyRouterInstance

export const defaultRoute = ref( null )
export const initialRoute = ref( window?.location.pathname )
export const initialQuery = ref( window?.location.search )

const TinyRouter = {
	name: 'TinyRouter',
	props: {
		routes: { type: Array, required: true },
		redirects: { type: Object, default: () => ( {} ) },
		memoryMode: { type: Boolean, default: false }
	},
	data: () => ( { route: '', routeParams: {} } ),
	computed: {
		currentComponent() {
			const pathOnly = this.route.split('?')[0]
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
		this.push( (defaultRoute.value || initialRoute.value ) + initialQuery.value )
	},
	methods: {
		proceed( path, isPop = false ) {
			if ( !isPop ) this.memoryMode ? this.push( path, true ) : history.pushState( null, '', path )
			this.route = path
		},
		push( path, isPop = false ) {
			const leaveGuard = this.$refs.activeView?.beforeRouteLeave
			leaveGuard ? leaveGuard( () => this.proceed( path, isPop ) ) : this.proceed( path, isPop )
		}
	}
}

export default TinyRouter

export const TinyRouterInstall = {
	install( app ) {
		app.component( 'TinyRouter', TinyRouter )
		app.config.globalProperties.$router = {
			push( path ) { TinyRouterInstance?.push( path ) },
			get route() { return TinyRouterInstance?.route },
			get component() { return TinyRouterInstance?.currentComponent },
			get params() { return TinyRouterInstance?.routeParams },
			// this is native history API so doesnt need to be wrapped, dont work in memorymode
			// go( n ) { history.go( n ) },
			// forward() { history.forward() },
			// back() { history.back() }
		}
	}
}
</script>
