import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, markRaw, nextTick } from 'vue'

let scrollSpy
let scrollSpyTop

// Mock component containing anchor targets
const Page = markRaw(defineComponent({
  template: `
    <div>
      <h1>Page</h1>
      <div id="about">About section</div>
      <div id="contact">Contact section</div>
    </div>
  `,
}))

describe('TinyRouter – anchor support', () => {
  const originalLocation = window.location
  const originalHistory = window.history
  let TinyRouter, navigationEventListeners

  beforeEach(async () => {
    // fresh import each time to reset state + navigation listener
    vi.resetModules()

    // Create spy on scrollIntoView (needs to exist on HTMLElement prototype)
    scrollSpy = vi.fn()
    Element.prototype.scrollIntoView = scrollSpy

    // Spy on window.scrollTo for top scrolling
    scrollSpyTop = vi.fn()
    window.scrollTo = scrollSpyTop

    // Immediately execute any requestAnimationFrame callbacks
    vi.stubGlobal('requestAnimationFrame', (cb) => cb())

    // Mock location / history
    delete window.location
    window.location = { pathname: '/', search: '', origin: 'http://localhost' }
    window.history = { ...window.history, pushState: vi.fn() }

    // Mock Navigation API so router installs listener
    navigationEventListeners = new Map()
    vi.stubGlobal('navigation', {
      addEventListener: vi.fn((evt, handler) => navigationEventListeners.set(evt, handler)),
    })

    ;({ default: TinyRouter } = await import('../../src/components/TinyRouter.vue'))
  })

  afterEach(() => {
    window.location = originalLocation
    window.history = originalHistory
    // Cleanup spies
    delete window.scrollTo
    vi.resetAllMocks()
  })

  it('scrolls to the element when navigating to a hash fragment', async () => {
    const routes = [{ path: '/', component: Page }]
    const wrapper = mount(TinyRouter, { props: { routes }, attachTo: document.body })
    await nextTick()

    // trigger hash navigation
    await wrapper.vm.push('/#about')
    await nextTick()

    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })

  it('scrolls to top when navigating to an empty hash (#)', async () => {
    const routes = [{ path: '/', component: Page }]
    const wrapper = mount(TinyRouter, { props: { routes }, attachTo: document.body })
    await nextTick()

    // trigger navigation to top
    await wrapper.vm.push('/#')
    await nextTick()

    expect(scrollSpyTop).toHaveBeenCalledTimes(1)
  })
}) 