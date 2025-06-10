import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick, defineComponent, ref, markRaw } from 'vue'
import TinyRouter, { defaultRoute, initialRoute, initialQuery } from '../../src/components/TinyRouter.vue'

// Mock components for testing
const Home = markRaw(defineComponent({
  template: '<div>Home Component</div>',
  name: 'Home'
}))

const About = markRaw(defineComponent({
  template: '<div>About Component</div>',
  name: 'About'
}))

const User = markRaw(defineComponent({
  template: '<div>User: {{ routeParams.id }}</div>',
  props: ['routeParams'],
  name: 'User'
}))

const NotFound = markRaw(defineComponent({
  template: '<div>Not Found</div>',
  name: 'NotFound'
}))

// Component with leave guard
const Protected = markRaw(defineComponent({
  template: '<div>Protected Component</div>',
  name: 'Protected',
  methods: {
    beforeRouteLeave(proceed) {
      // Simulate confirmation
      this.confirmResult ? proceed() : null
    }
  },
  data() {
    return {
      confirmResult: true
    }
  }
}))

describe('TinyRouter', () => {
  // Mock window.location and history
  const originalLocation = window.location
  const originalHistory = window.history

  beforeEach(() => {
    // Reset refs between tests
    defaultRoute.value = null
    initialRoute.value = '/'
    initialQuery.value = ''
    
    // Mock location and history methods
    delete window.location
    window.location = { pathname: '/', search: '', origin: 'http://localhost' }
    
    window.history = {
      ...window.history,
      pushState: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      go: vi.fn()
    }
  })

  afterEach(() => {
    window.location = originalLocation
    window.history = originalHistory
    vi.resetAllMocks()
  })

  it('renders the default route component', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    await nextTick()
    //console.log('Rendered default component route:', wrapper.vm.route)
    expect(wrapper.findComponent(Home).exists()).toBe(true)
  })

  it('handles route changes', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    await nextTick()
    //console.log('Initial route:', wrapper.vm.route)
    expect(wrapper.findComponent(Home).exists()).toBe(true)

    // Change route
    await wrapper.vm.push('/about')
    await nextTick()
    
    //console.log('Route after push:', wrapper.vm.route)
    expect(wrapper.findComponent(About).exists()).toBe(true)
  })

  it('handles route parameters correctly', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/user/:id', component: User }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    // Navigate to user with param
    await wrapper.vm.push('/user/123')
    await nextTick()
    
    //console.log('Route with parameters:', wrapper.vm.route, 'Params:', wrapper.vm.routeParams)
    expect(wrapper.findComponent(User).exists()).toBe(true)
    expect(wrapper.findComponent(User).props('routeParams')).toEqual({ id: '123' })
  })

  it('handles route redirects', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const redirects = {
      '/about-us': '/about'
    }
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes,
        redirects
      }
    })
    
    // Navigate to a route that should redirect
    await wrapper.vm.push('/about-us')
    await nextTick()
    
    //console.log('Redirect route, reached:', wrapper.vm.route)
    // Should render the About component due to redirect
    expect(wrapper.findComponent(About).exists()).toBe(true)
  })

  it('fallbacks to first route when route is not found', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    // Navigate to non-existent route
    await wrapper.vm.push('/does-not-exist')
    await nextTick()
    
    //console.log('Fallback route, reached:', wrapper.vm.route)
    // Should fall back to the first route component
    expect(wrapper.findComponent(Home).exists()).toBe(true)
  })

  it('respects defaultRoute when provided', async () => {
    defaultRoute.value = '/about'
    
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    await nextTick()
    //console.log('Default route applied:', wrapper.vm.route)
    // Should render the About component due to defaultRoute
    expect(wrapper.findComponent(About).exists()).toBe(true)
  })

  it('respects leave guards when navigating', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/protected', component: Protected }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    // Navigate to protected route
    await wrapper.vm.push('/protected')
    await nextTick()
    
    //console.log('Protected route reached:', wrapper.vm.route)
    // Check if we're on protected route
    expect(wrapper.findComponent(Protected).exists()).toBe(true)
    
    // Set confirmResult to false to block navigation
    wrapper.findComponent(Protected).vm.confirmResult = false
    
    // Attempt to navigate away
    await wrapper.vm.push('/')
    await nextTick()
    
    //console.log('Attempted navigation with guard blocking, current route:', wrapper.vm.route)
    // Should still be on protected route
    expect(wrapper.findComponent(Protected).exists()).toBe(true)
    
    // Allow navigation now
    wrapper.findComponent(Protected).vm.confirmResult = true
    
    // Try again
    await wrapper.vm.push('/')
    await nextTick()
    
    //console.log('Guard allowed navigation, current route:', wrapper.vm.route)
    // Should navigate to home
    expect(wrapper.findComponent(Home).exists()).toBe(true)
  })

  it('handles initial query parameters', async () => {
    window.location.search = '?test=123'
    initialQuery.value = '?test=123'
    
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes
      }
    })
    
    await nextTick()
    //console.log('Route with query parameters:', wrapper.vm.route)
    expect(wrapper.vm.route).toBe('/?test=123')
  })

  it('works in memory mode without affecting browser history', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
    
    const wrapper = mount(TinyRouter, {
      props: {
        routes,
        memoryMode: true
      }
    })
    
    // Change route
    await wrapper.vm.push('/about')
    await nextTick()
    
    //console.log('Memory mode route reached:', wrapper.vm.route)
    // Component should change
    expect(wrapper.findComponent(About).exists()).toBe(true)
    
    // But history.pushState should not be called
    expect(window.history.pushState).not.toHaveBeenCalled()
  })

  describe('Navigation Interception', () => {
    let TinyRouterFresh
    let mockNavigation
    let navigationEventListeners

    beforeEach(async () => {
      vi.useFakeTimers()
      navigationEventListeners = new Map()
      mockNavigation = {
        addEventListener: vi.fn((event, listener) => {
          navigationEventListeners.set(event, listener)
        }),
      }
      vi.stubGlobal('navigation', mockNavigation)

      vi.resetModules()
      const routerModule = await import('../../src/components/TinyRouter.vue')
      TinyRouterFresh = routerModule.default
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('automatically intercepts navigation to a known route', async () => {
        const routes = [
            { path: '/', component: Home },
            { path: '/about', component: About }
        ]
        
        const wrapper = mount(TinyRouterFresh, { props: { routes } })
        vi.runAllTimers()
        await nextTick()

        const navigateListener = navigationEventListeners.get('navigate')
        expect(navigateListener).toBeDefined()
        
        const event = {
            destination: { url: new URL('http://localhost/about') },
            preventDefault: vi.fn()
        }
        
        navigateListener(event)
        
        expect(event.preventDefault).toHaveBeenCalled()

        await nextTick()
        
        expect(wrapper.findComponent(About).exists()).toBe(true)
        expect(wrapper.vm.route).toBe('/about')
    })

    it('does not intercept navigation to an unknown route', async () => {
        const routes = [
            { path: '/', component: Home },
            { path: '/about', component: About }
        ]
        
        const wrapper = mount(TinyRouterFresh, { props: { routes } })
        vi.runAllTimers()
        await nextTick()

        const navigateListener = navigationEventListeners.get('navigate')
        expect(navigateListener).toBeDefined()
        
        const event = {
            destination: { url: new URL('http://localhost/unknown') },
            preventDefault: vi.fn()
        }
        
        navigateListener(event)
        await nextTick()
        
        expect(event.preventDefault).not.toHaveBeenCalled()
        expect(wrapper.findComponent(Home).exists()).toBe(true) // Should stay on initial route
        expect(wrapper.vm.route).toBe('/')
    })

    it('does not intercept navigation to a different origin', async () => {
        const routes = [
            { path: '/', component: Home },
            { path: '/about', component: About }
        ]
        
        const wrapper = mount(TinyRouterFresh, { props: { routes } })
        vi.runAllTimers()
        await nextTick()

        const navigateListener = navigationEventListeners.get('navigate')
        expect(navigateListener).toBeDefined()
        
        const event = {
            destination: { url: new URL('https://example.com/about') },
            preventDefault: vi.fn()
        }
        
        navigateListener(event)
        await nextTick()
        
        expect(event.preventDefault).not.toHaveBeenCalled()
        expect(wrapper.findComponent(Home).exists()).toBe(true)
    })

    it('intercepts navigation to a known route with params', async () => {
      const routes = [
          { path: '/', component: Home },
          { path: '/user/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouterFresh, { props: { routes } })
      vi.runAllTimers()
      await nextTick()

      const navigateListener = navigationEventListeners.get('navigate')
      expect(navigateListener).toBeDefined()
      
      const event = {
          destination: { url: new URL('http://localhost/user/abc') },
          preventDefault: vi.fn()
      }
      
      navigateListener(event)
      
      expect(event.preventDefault).toHaveBeenCalled()

      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/abc')
      expect(wrapper.vm.routeParams).toEqual({ id: 'abc' })
    })
  })
})