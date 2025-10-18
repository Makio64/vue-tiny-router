<template>
  <component :is="currentComponent" ref="activeView" :key="route" :route-params="routeParams" />
</template>

<script>
import { ref } from 'vue'

let TinyRouterInstance
let isNavigatingProgrammatically = false

export const defaultRoute = ref( null )
export const initialRoute = ref( window?.location.pathname )
export const initialQuery = ref( window?.location.search )
export const routeState = ref( { route: ( ( initialRoute.value || '' ) + ( initialQuery.value || '' ) ), params: {} } )

const findMatch = ( path, routes, redirects ) => {
  const pathOnly = path.split( '#' )[0].split( '?' )[0]
  const resolved = redirects[pathOnly] || pathOnly
  if ( !resolved ) return { route: null, params: {}, resolved: pathOnly }

  // Check exact matches first
  const exactMatch = routes.find( r =>  r.path === resolved || r.path === resolved + '/' || r.path + '/' === resolved )
  if ( exactMatch ) return { route: exactMatch, params: {}, resolved }

  // Check parameterized and wildcard routes
  for ( const route of routes ) {
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
    routes: {type: Array, required: true},
    redirects: {type: Object, default: () => ({})},
    memoryMode: {type: Boolean, default: false},
    scrollSmooth: {type: Boolean, default: false}
  },
  data: () => ({route: '', routeParams: {}}),
  computed: {
    currentComponent() {
      const {route, params, resolved} = findMatch(this.route, this.routes, this.redirects)
      this.routeParams = params
      routeState.value.params = params
      if (!route) console.warn(`Route "${resolved}" not found`)
      return route ? route.component : this.routes[0].component
    }
  },
  created() {
    TinyRouterInstance = this
    if (!this.memoryMode) window?.addEventListener('popstate', () => this.push(window?.location.pathname, true))
    this.push((defaultRoute.value || initialRoute.value) + initialQuery.value)
  },
  unmounted() {
    if (this.__onPop) window?.removeEventListener('popstate', this.__onPop)
    if (this.__onNavigate) navigation?.removeEventListener('navigate', this.__onNavigate)
  },
  methods: {
    proceed(path, isPop = true) {
      if (!isPop) {
        isNavigatingProgrammatically = true
        setTimeout(() => { isNavigatingProgrammatically = false }, 0)
        if (!this.memoryMode) history.pushState(null, '', path)
      }
      this.route = path
      routeState.value.route = path

      const first = !this.__didFirstNav
      this.__didFirstNav = true
      if (first) return

      const [, hash = ''] = path.split('#')
      const behavior = this.scrollSmooth ? 'smooth' : 'auto'
      requestAnimationFrame(() => {
        if (hash) {
          document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior, block: 'start' })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior })
        }
      })
    }
    ,

    /**
     * Navigate to a new route
     * @param {string} path - The path to navigate to (e.g., '/user/123')
     * @param {boolean} isPop - Internal flag for history navigation
     */
    push(path, isPop = false) {
      path = path.replace(/\/{2,}/g, '/')
      if (path === this.route) return
      const leaveGuard = this.$refs.activeView?.beforeRouteLeave
      leaveGuard ? leaveGuard(() => this.proceed(path, isPop)) : this.proceed(path, isPop)
    }
  }
}

// Handle external links
if (typeof navigation !== 'undefined') {
  navigation?.addEventListener("navigate", (event) => {
    const {pathname, search, hash, origin} = new URL(event.destination.url)
    if (isNavigatingProgrammatically || origin !== window.location.origin || !TinyRouterInstance) return

    const {route} = findMatch(pathname, TinyRouterInstance.routes, TinyRouterInstance.redirects)

    if (!route) return

    event.preventDefault()
    let path = pathname + search + hash
    path = path.replace(/\/{2,}/g, '/')
    TinyRouterInstance.push(path)
  })
}

export default TinyRouter

export {TinyRouter}

/**
 * Vue plugin installer - adds TinyRouter component and $router global property
 * @usage app.use(TinyRouterInstall)
 */
export const TinyRouterInstall = {
  install(app) {
    app.component('TinyRouter', TinyRouter)
    app.config.globalProperties.$router = {
      push(path) { TinyRouterInstance?.push(path) },
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

//---- Composition API
export const useRouter = () => ({
  push(path) {
    TinyRouterInstance?.push(path)
  },
  get route() { return routeState.value.route},
  get params() { return routeState.value.params},
  get component() { return TinyRouterInstance?.currentComponent}
})

export const useRoute = () => ({
  get route() { return routeState.value.route },
  get params() { return routeState.value.params }
})
</script>
