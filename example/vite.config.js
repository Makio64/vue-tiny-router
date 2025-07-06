import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// Helper to resolve paths relative to the example directory
const r = (...segments) => resolve(__dirname, ...segments)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Point the import to the local source so dev server finds it without publishing
      'vue-tiny-router': r('..', 'src', 'index.js')
    }
  },
  server: {
    port: 3000
  }
}) 