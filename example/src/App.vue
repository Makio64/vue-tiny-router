<template>
  <div id="app">
    <aside class="sidebar">
      <div class="logo">
        <h1>Vue Tiny Router</h1>
        <p>Interactive Examples</p>
      </div>

      <nav class="nav">
        <a href="/" class="nav-item" :class="{ active: $router.route === '/' }">Home</a>
        <a href="/params" class="nav-item" :class="{ active: $router.route?.startsWith('/params') }">Route Parameters</a>
        <a href="/guards" class="nav-item" :class="{ active: $router.route === '/guards' }">Route Guards</a>
        <a href="/anchors" class="nav-item" :class="{ active: $router.route === '/anchors' }">Anchor Links</a>
        <a href="/memory" class="nav-item" :class="{ active: $router.route === '/memory' }">Memory Mode</a>
      </nav>
    </aside>

    <main class="main-content">
      <TinyRouter :routes="routes" :redirects="redirects" :smoothScroll="false"/>
    </main>
  </div>
</template>

<script>
import { TinyRouter } from '../../src/index.js'
import Home from './components/Home.vue'
import RouteParams from './components/RouteParams.vue'
import UserProfile from './components/UserProfile.vue'
import RouteGuards from './components/RouteGuards.vue'
import AnchorLinks from './components/AnchorLinks.vue'
import MemoryMode from './components/MemoryMode.vue'

export default {
  name: 'App',
  components: {
    TinyRouter
  },
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/params', component: RouteParams },
        { path: '/user/:id', component: UserProfile },
        { path: '/guards', component: RouteGuards },
        { path: '/anchors', component: AnchorLinks },
        { path: '/memory', component: MemoryMode }
      ],
      redirects: {
        '/home': '/',
        '/profile': '/user/123',
        '/about': '/params'
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #fafafa;
}

#app {
  display: flex;
  min-height: 200vh;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e8f5e8;
  padding: 2rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.logo {
  padding: 0 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e8f5e8;
  padding-bottom: 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  color: #2d5a3d;
  margin-bottom: 0.5rem;
}

.logo p {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.nav {
  position: sticky;
  top: 1rem;
  left: 0;
  padding: 0 1rem;
}

.nav-item {
  display: block;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: #666;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: #f0f9f0;
  color: #2d5a3d;
}

.nav-item.active {
  background: #e8f5e8;
  color: #2d5a3d;
  border-left: 3px solid #4ade80;
}

/* Main content */
.main-content {
  width: calc(100vw - 280px);
  padding: 2rem;
  overflow-y: auto;
}

/* Common styles */
.container {
  width: 100%;
  max-width: none;
  padding: 0 1rem;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8f5e8;
}

.card h1 {
  color: #2d5a3d;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.card h2 {
  color: #2d5a3d;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.7;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: #4ade80;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.85rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
}

.btn:hover {
  background: #22c55e;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f1f5f9;
  color: #2d5a3d;
  border: 1px solid #e8f5e8;
}

.btn-secondary:hover {
  background: #e8f5e8;
  color: #2d5a3d;
}

.btn-outline {
  background: transparent;
  color: #4ade80;
  border: 1px solid #4ade80;
}

.btn-outline:hover {
  background: #4ade80;
  color: white;
}

/* Section styles */
.section {
  margin-bottom: 2rem;
}

.section h3 {
  color: #2d5a3d;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

/* Code blocks */
.code-block {
  background: #f8fafc;
  border: 1px solid #e8f5e8;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}

/* Info boxes */
.info-box {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.info-box.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.info-box.warning {
  background: #fffbeb;
  border-color: #fed7aa;
}

/* Responsive */
@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 1rem 0;
  }

  .nav {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .nav-item {
    white-space: nowrap;
    margin-bottom: 0;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
