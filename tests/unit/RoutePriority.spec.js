/**
 * RoutePriority Test Suite
 * 
 * Tests the route matching priority in TinyRouter:
 * - Exact routes have priority over parameterized routes
 * - Order of route definition doesn't affect exact match priority
 * - Real-world scenarios like blog routing with mixed exact/dynamic paths
 * 
 * Key finding: The router now uses two-pass matching:
 * 1. First checks all exact matches
 * 2. Then checks parameterized routes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, defineComponent, markRaw } from 'vue'
import TinyRouter, { defaultRoute, initialRoute, initialQuery } from '../../src/components/TinyRouter.vue'

const Dynamic = markRaw(defineComponent({
  template: '<div>Dynamic: {{ routeParams?.id || "(empty)" }}</div>',
  props: ['routeParams'],
  name: 'Dynamic'
}))

const Test = markRaw(defineComponent({
  template: '<div>Test Page</div>',
  name: 'Test'
}))

const About = markRaw(defineComponent({
  template: '<div>About Page</div>',
  name: 'About'
}))

const Home = markRaw(defineComponent({
  template: '<div>Home Page</div>',
  name: 'Home'
}))

describe('Route Priority: Exact vs Parameterized', () => {
  beforeEach(() => {
    defaultRoute.value = null
    initialRoute.value = '/'
    initialQuery.value = ''
    
    delete window.location
    window.location = { pathname: '/', search: '', origin: 'http://localhost' }
    
    window.history = {
      ...window.history,
      pushState: vi.fn()
    }
    
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('CRITICAL TEST: /:id defined BEFORE /test', () => {
    it('should prioritize /test over /:id when both match', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/:id', component: Dynamic },  // Parameterized route FIRST
            { path: '/test', component: Test }     // Exact route SECOND
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/test')
      await nextTick()
      
      // Exact match should have priority even when /:id is defined first
      
      expect(wrapper.findComponent(Test).exists()).toBe(true)
      expect(wrapper.findComponent(Dynamic).exists()).toBe(false)
    })
  })

  describe('/:id defined AFTER /test', () => {
    it('should match /test with Test component', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/test', component: Test },    // Exact route FIRST
            { path: '/:id', component: Dynamic }    // Parameterized route SECOND
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/test')
      await nextTick()
      
      expect(wrapper.findComponent(Test).exists()).toBe(true)
      expect(wrapper.findComponent(Dynamic).exists()).toBe(false)
    })

    it('should match /other with Dynamic component', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/test', component: Test },
            { path: '/:id', component: Dynamic }
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/other')
      await nextTick()
      
      expect(wrapper.findComponent(Dynamic).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: 'other' })
    })
  })

  describe('Multiple exact routes with /:id', () => {
    it('should match exact routes over parameterized', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/:id', component: Dynamic },  // Catch-all FIRST
            { path: '/test', component: Test },
            { path: '/about', component: About },
            { path: '/', component: Home }
          ]
        }
      })
      await nextTick()
      
      // Test exact /test
      await wrapper.vm.push('/test')
      await nextTick()
      expect(wrapper.findComponent(Test).exists()).toBe(true)
      
      // Test exact /about
      await wrapper.vm.push('/about')
      await nextTick()
      expect(wrapper.findComponent(About).exists()).toBe(true)
      
      // Test exact /
      await wrapper.vm.push('/')
      await nextTick()
      expect(wrapper.findComponent(Home).exists()).toBe(true)
      
      // Test dynamic /something
      await wrapper.vm.push('/something')
      await nextTick()
      expect(wrapper.findComponent(Dynamic).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: 'something' })
    })
  })

  describe('Real-world scenario', () => {
    it('should handle typical blog routing', async () => {
      const BlogPost = markRaw(defineComponent({
        template: '<div>Blog Post: {{ routeParams?.slug }}</div>',
        props: ['routeParams'],
        name: 'BlogPost'
      }))
      
      const BlogHome = markRaw(defineComponent({
        template: '<div>Blog Home</div>',
        name: 'BlogHome'
      }))
      
      const BlogAbout = markRaw(defineComponent({
        template: '<div>Blog About</div>',
        name: 'BlogAbout'
      }))
      
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/blog/:slug', component: BlogPost },  // Dynamic route
            { path: '/blog', component: BlogHome },        // Exact route
            { path: '/blog/about', component: BlogAbout }  // Another exact route
          ]
        }
      })
      await nextTick()
      
      // Test /blog - should match BlogHome
      await wrapper.vm.push('/blog')
      await nextTick()
      expect(wrapper.findComponent(BlogHome).exists()).toBe(true)
      
      // Test /blog/about - should match BlogAbout
      await wrapper.vm.push('/blog/about')
      await nextTick()
      expect(wrapper.findComponent(BlogAbout).exists()).toBe(true)
      
      // Test /blog/my-post - should match BlogPost
      await wrapper.vm.push('/blog/my-post')
      await nextTick()
      expect(wrapper.findComponent(BlogPost).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ slug: 'my-post' })
    })
  })
})