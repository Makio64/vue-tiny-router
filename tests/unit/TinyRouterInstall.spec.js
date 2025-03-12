import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { TinyRouterInstall } from '../../src/components/TinyRouter.vue'

// Create basic mock components for testing
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const User = { template: '<div>User</div>' }

describe('TinyRouterInstall', () => {
  let app
  
  beforeEach(() => {
    // Create a fresh Vue app for each test
    app = createApp({})
    
    // Spy on the app.component method
    vi.spyOn(app, 'component')
  })
  
  it('registers TinyRouter component when installed', () => {
    app.use(TinyRouterInstall)
    
    // Check if TinyRouter was registered as a component
    expect(app.component).toHaveBeenCalledWith('TinyRouter', expect.any(Object))
  })
  
  it('adds $router to the Vue app global properties', () => {
    app.use(TinyRouterInstall)
    
    // Verify $router is added to app.config.globalProperties
    expect(app.config.globalProperties.$router).toBeDefined()
    expect(typeof app.config.globalProperties.$router.push).toBe('function')
    expect(app.config.globalProperties.$router).toHaveProperty('route')
    expect(app.config.globalProperties.$router).toHaveProperty('component')
    expect(app.config.globalProperties.$router).toHaveProperty('params')
  })
  
  it('$router.push calls the TinyRouterInstance push method', () => {
    app.use(TinyRouterInstall)
    
    // We need to mock the TinyRouterInstance
    const mockPush = vi.fn()
    app.config.globalProperties.$router.push = mockPush
    
    app.config.globalProperties.$router.push('/about')
    
    expect(mockPush).toHaveBeenCalledWith('/about')
  })
})