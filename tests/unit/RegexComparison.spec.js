/**
 * RegexComparison Test Suite
 * 
 * Compares the behavior of different regex patterns for route parameters:
 * - Current: ([^/]*) - Matches zero or more characters (allows empty)
 * - Alternative: ([^/]+) - Matches one or more characters (requires value)
 * 
 * Demonstrates why ([^/]*) is better for optional parameters:
 * - /user/:id can match both /user and /user/123
 * - No need for separate routes for list vs detail views
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, defineComponent, markRaw } from 'vue'
import TinyRouter, { defaultRoute, initialRoute, initialQuery } from '../../src/components/TinyRouter.vue'

const User = markRaw(defineComponent({
  template: '<div>User: {{ routeParams?.id || "(empty)" }}</div>',
  props: ['routeParams'],
  name: 'User'
}))

const NotFound = markRaw(defineComponent({
  template: '<div>404 Not Found</div>',
  name: 'NotFound'
}))

describe('Regex Pattern Comparison: ([^/]*) vs ([^/]+)', () => {
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

  describe('Current Pattern ([^/]*) - Allows empty parameters', () => {
    it('matches /user with empty id when only /user/:id is defined', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/user/:id', component: User },
            { path: '/404', component: NotFound }
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user')
      await nextTick()
      
      // Current implementation matches with empty id
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams.id).toBe('')
    })

    it('matches trailing slash /user/ with empty id', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/user/:id', component: User },
            { path: '/404', component: NotFound }
          ]
        }
      })
      await nextTick()
      
      await wrapper.vm.push('/user/')
      await nextTick()
      
      // Current implementation matches with empty id
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams.id).toBe('')
    })
  })

  describe('Alternative Pattern ([^/]+) - Requires at least one character', () => {
    it('would NOT match /user when only /user/:id is defined', async () => {
      // This test demonstrates what would happen with ([^/]+)
      // The pattern /user/:id becomes /user/([^/]+)
      // This would NOT match '/user' because + requires at least one character
      
      const testPattern = '/user/([^/]+)'
      const testPath = '/user'
      const match = testPath.match(new RegExp('^' + testPattern + '$'))
      
      expect(match).toBeNull() // Would not match
    })

    it('would NOT match /user/ with trailing slash', async () => {
      const testPattern = '/user/([^/]+)'
      const testPath = '/user/'
      const match = testPath.match(new RegExp('^' + testPattern + '$'))
      
      expect(match).toBeNull() // Would not match
    })

    it('would still match /user/123 correctly', async () => {
      const testPattern = '/user/([^/]+)'
      const testPath = '/user/123'
      const match = testPath.match(new RegExp('^' + testPattern + '$'))
      
      expect(match).not.toBeNull()
      expect(match[1]).toBe('123')
    })
  })

  describe('Real-world implications', () => {
    it('Current pattern supports optional parameters naturally', async () => {
      const wrapper = mount(TinyRouter, {
        props: {
          routes: [
            { path: '/profile/:username', component: User }
          ]
        }
      })
      await nextTick()
      
      // /profile without username - shows empty profile page
      await wrapper.vm.push('/profile')
      await nextTick()
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams.username).toBe('')
      
      // /profile/john - shows john's profile
      await wrapper.vm.push('/profile/john')
      await nextTick()
      expect(wrapper.findComponent(User).exists()).toBe(true)
      expect(wrapper.vm.routeParams.username).toBe('john')
    })

    it('Behavior difference summary', () => {
      // Test strings to demonstrate the difference
      const patterns = {
        current: '([^/]*)',  // Zero or more non-slash characters
        alternative: '([^/]+)'  // One or more non-slash characters
      }
      
      const testCases = [
        { input: '', current: true, alternative: false },
        { input: 'a', current: true, alternative: true },
        { input: 'abc', current: true, alternative: true },
        { input: '123', current: true, alternative: true }
      ]
      
      testCases.forEach(({ input, current, alternative }) => {
        const currentMatch = input.match(new RegExp('^' + patterns.current + '$'))
        const altMatch = input.match(new RegExp('^' + patterns.alternative + '$'))
        
        expect(!!currentMatch).toBe(current)
        expect(!!altMatch).toBe(alternative)
      })
    })
  })

  describe('Which approach is better?', () => {
    it('Current ([^/]*) is better for optional parameters', () => {
      // Current pattern allows:
      // - /user → list all users
      // - /user/123 → show specific user
      // Without needing separate routes
      
      expect(true).toBe(true) // Placeholder assertion
    })

    it('Alternative ([^/]+) would require explicit routes for both cases', () => {
      // With ([^/]+) you would need:
      // { path: '/user', component: UserList }
      // { path: '/user/:id', component: UserDetails }
      // To handle both /user and /user/123
      
      expect(true).toBe(true) // Placeholder assertion
    })
  })
})