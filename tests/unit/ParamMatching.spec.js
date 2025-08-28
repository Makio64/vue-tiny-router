/**
 * ParamMatching Test Suite
 * 
 * Tests the route parameter matching behavior of TinyRouter, specifically:
 * - How /:id patterns match URLs with and without values
 * - Optional parameter behavior (e.g., /user matching /user/:id)
 * - Priority between exact and parameterized routes
 * - Edge cases with special characters and multiple parameters
 * 
 * Key behavior verified:
 * - Routes like /user/:id match both /user (with empty id) and /user/123
 * - Exact routes have priority over parameterized routes
 * - Parameters use ([^/]*) regex allowing empty values for flexibility
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, defineComponent, markRaw } from 'vue'
import TinyRouter, { defaultRoute, initialRoute, initialQuery } from '../../src/components/TinyRouter.vue'

// Test components
const User = markRaw(defineComponent({
  template: '<div>User: {{ routeParams?.id || "(empty)" }}</div>',
  props: ['routeParams'],
  name: 'User'
}))

const UserList = markRaw(defineComponent({
  template: '<div>User List</div>',
  name: 'UserList'
}))

describe('Critical /:id Pattern Matching Tests', () => {
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
    
    // Suppress "Route not found" warnings in tests
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Scenario: Only /:id route defined', () => {
    it('should match / with empty id parameter', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
    })

    it('should match /test with id="test"', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/test')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: 'test' })
    })
  })

  describe('Scenario: Only /user/:id route defined (no /user route)', () => {
    it('should match /user with empty id parameter', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/user/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
    })

    it('should match /user/ with empty id parameter', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/user/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user/')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
    })

    it('should match /user/123 with id="123"', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/user/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user/123')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '123' })
    })
  })

  describe('Scenario: Both /user and /user/:id routes defined', () => {
    it('should match /user with UserList (exact match priority)', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/user', component: UserList },
            { path: '/user/:id', component: User }
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user')
      await nextTick()
      
      expect(wrapper.findComponent(UserList).exists()).toBe(true)
      expect(wrapper.findComponent(User).exists()).toBe(false)
      expect(wrapper.vm.routeParams).toEqual({})
    })

    it('should match /user/123 with User component', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/user', component: UserList },
            { path: '/user/:id', component: User }
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user/123')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.findComponent(UserList).exists()).toBe(false)
      expect(wrapper.vm.routeParams).toEqual({ id: '123' })
    })
  })

  describe('Edge cases with parameter patterns', () => {
    it('should NOT require at least one character for parameter value', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/item/:id', component: User }]
        }
      })
      await nextTick()
      
      // Test /item without id - should match with empty id
      await wrapper.vm.push('/item')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
      
      // Test /item/ with trailing slash - should match with empty id
      await wrapper.vm.push('/item/')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: '' })
    })

    it('should handle URL-encoded parameters', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/user/:id', component: User }]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user/test%20user')
      await nextTick()
      
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ id: 'test%20user' })
    })

    it('should handle special characters in parameters', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/user/:id', component: User }]
        }
      })
      await nextTick()
      
      const testCases = [
        { path: '/user/test-user', expectedId: 'test-user' },
        { path: '/user/test_user', expectedId: 'test_user' },
        { path: '/user/test.user', expectedId: 'test.user' },
        { path: '/user/test@user', expectedId: 'test@user' }
      ]
      
      for (const { path, expectedId } of testCases) {
        await wrapper.vm.push(path)
        await nextTick()
        
        expect(wrapper.findComponent(User).exists()).toBe(true)
        expect(wrapper.vm.routeParams).toEqual({ id: expectedId })
      }
    })
  })

  describe('Multiple parameter routes', () => {
    it('should handle optional trailing parameter', async () => {
      const Post = markRaw(defineComponent({
        template: '<div>Post</div>',
        props: ['routeParams'],
        name: 'Post'
      }))
      
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [{ path: '/blog/:category/:post', component: Post }]
        }
      })
      await nextTick()
      
      // With both parameters
      await wrapper.vm.push('/blog/tech/article')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ category: 'tech', post: 'article' })
      
      // Without last parameter
      await wrapper.vm.push('/blog/tech')
      await nextTick()
      
      expect(wrapper.findComponent(Post).exists()).toBe(true)
      expect(wrapper.vm.routeParams).toEqual({ category: 'tech', post: '' })
    })
  })
})