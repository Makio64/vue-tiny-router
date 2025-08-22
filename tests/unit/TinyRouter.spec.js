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

  it('re-creates component when navigating to same route with different params', async () => {
    const ComponentWithState = markRaw(defineComponent({
      name: 'ComponentWithState',
      props: ['routeParams'],
      template: '<div>ID: {{ internalId }}</div>',
      data() {
        return {
          internalId: this.routeParams.id,
        }
      },
    }))

    const routes = [
      { path: '/', component: Home },
      { path: '/item/:id', component: ComponentWithState },
    ]

    const wrapper = mount(TinyRouter, {
      props: { routes },
    })
    await nextTick()

    await wrapper.vm.push('/item/1')
    await nextTick()
    
    expect(wrapper.findComponent(ComponentWithState).exists()).toBe(true)
    expect(wrapper.text()).toBe('ID: 1')

    await wrapper.vm.push('/item/2')
    await nextTick()
    
    expect(wrapper.findComponent(ComponentWithState).exists()).toBe(true)
    expect(wrapper.text()).toBe('ID: 2')
  })

  describe('Parameterized Route Pattern Tests', () => {
    it('correctly matches /user/:id pattern', async () => {
      const routes = [
        { path: '/', component: Home },
        { path: '/user/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test various user IDs
      const testCases = [
        { path: '/user/123', expectedParams: { id: '123' } },
        { path: '/user/abc', expectedParams: { id: 'abc' } },
        { path: '/user/test-user', expectedParams: { id: 'test-user' } },
        { path: '/user/user_1', expectedParams: { id: 'user_1' } }
      ]
      
      for (const { path, expectedParams } of testCases) {
        await wrapper.vm.push(path)
        await nextTick()
        
        expect(wrapper.findComponent(User).exists()).toBe(true)
        expect(wrapper.vm.route).toBe(path)
        expect(wrapper.vm.routeParams).toEqual(expectedParams)
      }
    })

    it('correctly matches /:id pattern at root level', async () => {
      const routes = [
        { path: '/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test various IDs at root level
      const testCases = [
        { path: '/123', expectedParams: { id: '123' } },
        { path: '/about', expectedParams: { id: 'about' } },
        { path: '/test-page', expectedParams: { id: 'test-page' } }
      ]
      
      for (const { path, expectedParams } of testCases) {
        await wrapper.vm.push(path)
        await nextTick()
        
        expect(wrapper.findComponent(User).exists()).toBe(true)
        expect(wrapper.vm.route).toBe(path)
        expect(wrapper.vm.routeParams).toEqual(expectedParams)
      }
    })

    it('matches / path with ONLY /:id pattern defined (no explicit / route)', async () => {
      const routes = [
        { path: '/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test / - should match User with empty id parameter
      await wrapper.vm.push('/')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/')
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
      
      // Test /something - should still match User with params
      await wrapper.vm.push('/something')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/something')
      expect(wrapper.vm.routeParams).toEqual({ id: 'something' })
    })

    it('matches /user and /user/ when ONLY /user/:id pattern is defined', async () => {
      const routes = [
        { path: '/', component: Home },
        { path: '/user/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test /user without params - should match User with empty id
      await wrapper.vm.push('/user')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user')
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
      
      // Test /user/ with trailing slash - should match User with empty id
      await wrapper.vm.push('/user/')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/')
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
      
      // Test /user/123 - should match User with params
      await wrapper.vm.push('/user/123')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/123')
      expect(wrapper.vm.routeParams).toEqual({ id: '123' })
    })

    it('prioritizes exact match /user over /user/:id when both are defined', async () => {
      const UserList = markRaw(defineComponent({
        template: '<div>User List</div>',
        name: 'UserList'
      }))
      
      const routes = [
        { path: '/', component: Home },
        { path: '/user', component: UserList },
        { path: '/user/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test /user without params - should match UserList (exact match)
      await wrapper.vm.push('/user')
      await nextTick()
      
      expect(wrapper.findComponent(UserList).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user')
      expect(wrapper.vm.routeParams).toEqual({})
      
      // Test /user/123 - should match User with params
      await wrapper.vm.push('/user/123')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/123')
      expect(wrapper.vm.routeParams).toEqual({ id: '123' })
    })

    it('matches / path when /:id pattern is also defined', async () => {
      const routes = [
        { path: '/', component: Home },
        { path: '/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test / - should match Home
      await wrapper.vm.push('/')
      await nextTick()
      
      expect(wrapper.findComponent(Home).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/')
      expect(wrapper.vm.routeParams).toEqual({})
      
      // Test /something - should match User with params
      await wrapper.vm.push('/something')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/something')
      expect(wrapper.vm.routeParams).toEqual({ id: 'something' })
    })

    it('prioritizes exact matches over parameterized routes', async () => {
      const About = markRaw(defineComponent({
        template: '<div>About Page</div>',
        name: 'About'
      }))
      
      const routes = [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test /about - should match About (exact match)
      await wrapper.vm.push('/about')
      await nextTick()
      
      expect(wrapper.findComponent(About).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/about')
      expect(wrapper.vm.routeParams).toEqual({})
      
      // Test /other - should match User (parameterized route)
      await wrapper.vm.push('/other')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/other')
      expect(wrapper.vm.routeParams).toEqual({ id: 'other' })
    })

    it('does not match /user/:id pattern for paths with extra segments', async () => {
      const routes = [
        { path: '/', component: Home },
        { path: '/user/:id', component: User }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test /user/123/profile - should NOT match /user/:id
      await wrapper.vm.push('/user/123/profile')
      await nextTick()
      
      // Should fallback to first route (Home) since no match
      expect(wrapper.findComponent(Home).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/123/profile')
    })

    it('handles multiple parameters in a single route', async () => {
      const Post = markRaw(defineComponent({
        template: '<div>User: {{ routeParams.userId }}, Post: {{ routeParams.postId }}</div>',
        props: ['routeParams'],
        name: 'Post'
      }))
      
      const routes = [
        { path: '/', component: Home },
        { path: '/user/:userId/post/:postId', component: Post }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      await wrapper.vm.push('/user/john/post/42')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/john/post/42')
      expect(wrapper.vm.routeParams).toEqual({ userId: 'john', postId: '42' })
    })

    it('matches routes with optional parameters at the end', async () => {
      const Post = markRaw(defineComponent({
        template: '<div>User: {{ routeParams.userId || "(empty)" }}, Post: {{ routeParams.postId || "(empty)" }}</div>',
        props: ['routeParams'],
        name: 'Post'
      }))
      
      const routes = [
        { path: '/', component: Home },
        { path: '/user/:userId/post/:postId', component: Post }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test with both params
      await wrapper.vm.push('/user/john/post/42')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/john/post/42')
      expect(wrapper.vm.routeParams).toEqual({ userId: 'john', postId: '42' })
      
      // Test without last param - should match with empty postId
      await wrapper.vm.push('/user/john/post')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/john/post')
      expect(wrapper.vm.routeParams).toEqual({ userId: 'john', postId: '' })
      
      // Test with trailing slash
      await wrapper.vm.push('/user/john/post/')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.route).toBe('/user/john/post/')
      expect(wrapper.vm.routeParams).toEqual({ userId: 'john', postId: '' })
    })

    it('matches deeply nested routes with optional params', async () => {
      const Category = markRaw(defineComponent({
        template: '<div>Category: {{ routeParams.category }}, Subcategory: {{ routeParams.subcategory }}, Item: {{ routeParams.item }}</div>',
        props: ['routeParams'],
        name: 'Category'
      }))
      
      const routes = [
        { path: '/shop/:category/:subcategory/:item', component: Category }
      ]
      
      const wrapper = mount(TinyRouter, {
        props: { routes }
      })
      
      // Test with all params
      await wrapper.vm.push('/shop/electronics/phones/iphone')
      await nextTick()
      
      expect(wrapper.findComponent(Category).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ 
        category: 'electronics', 
        subcategory: 'phones', 
        item: 'iphone' 
      })
      
      // Test without last param
      await wrapper.vm.push('/shop/electronics/phones')
      await nextTick()
      
      expect(wrapper.findComponent(Category).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ 
        category: 'electronics', 
        subcategory: 'phones', 
        item: '' 
      })
    })
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