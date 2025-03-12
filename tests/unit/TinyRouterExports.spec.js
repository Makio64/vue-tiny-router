import { describe, it, expect } from 'vitest'
import { markRaw } from 'vue'
import DefaultExport, { TinyRouter, TinyRouterInstall } from '../../src/index.js'

const RawTinyRouter = markRaw(TinyRouter)

describe('TinyRouter Exports', () => {
  it('provides correct default export', () => {
    // Default export should be the TinyRouter component
    expect(DefaultExport).toBeDefined()
    expect(DefaultExport.name).toBe('TinyRouter')
  })

  it('provides named exports for TinyRouter and TinyRouterInstall', () => {
    // Named exports should be available
    expect(RawTinyRouter).toBeDefined()
    expect(RawTinyRouter.name).toBe('TinyRouter')
    
    expect(TinyRouterInstall).toBeDefined()
    expect(typeof TinyRouterInstall.install).toBe('function')
  })
  
  it('TinyRouter has required methods and props', () => {
    // Ensure the component has the expected structure
    expect(RawTinyRouter.props).toBeDefined()
    expect(RawTinyRouter.props.routes).toBeDefined()
    expect(RawTinyRouter.props.redirects).toBeDefined()
    expect(RawTinyRouter.props.memoryMode).toBeDefined()
    
    expect(RawTinyRouter.methods).toBeDefined()
    expect(typeof RawTinyRouter.methods.push).toBe('function')
    expect(typeof RawTinyRouter.methods.proceed).toBe('function')
  })
})