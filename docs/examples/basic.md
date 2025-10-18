# Basic Usage Examples

## Simple Router Setup

The most basic example of Vue Tiny Router in action.

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    
    <TinyRouter :routes="routes" />
  </div>
</template>

<script>
import { TinyRouter } from 'vue-tiny-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

export default {
  name: 'App',
  components: { TinyRouter },
  data() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
      ]
    }
  }
}
</script>
```

## Home Component

```vue
<!-- views/Home.vue -->
<template>
  <div class="home">
    <h1>Welcome Home</h1>
    <p>This is the home page.</p>
    
    <div class="navigation">
      <button @click="$router.push('/about')">
        Go to About (Programmatic)
      </button>
      <a href="/about" class="link">Go to About (Link)</a>
    </div>
    
    <div class="info">
      <h3>Router Info</h3>
      <p><strong>Current Route:</strong> {{ $router.route }}</p>
      <p><strong>Route Params:</strong> {{ JSON.stringify($router.params) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 2rem;
}

.navigation {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.link {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.info {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>
```

## About Component

```vue
<!-- views/About.vue -->
<template>
  <div class="about">
    <h1>About Us</h1>
    <p>Learn more about Vue Tiny Router.</p>
    
    <div class="features">
      <h3>Features</h3>
      <ul>
        <li>Only ~1.33 kB (Brotli)</li>
        <li>Route parameters</li>
        <li>Route guards</li>
        <li>Lazy loading</li>
        <li>Memory mode</li>
      </ul>
    </div>
    
    <button @click="goHome" class="btn">Go Home</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.about {
  padding: 2rem;
}

.features {
  margin: 2rem 0;
}

.btn {
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Main.js Setup

```javascript
// main.js
import { createApp } from 'vue'
import { TinyRouterInstall } from 'vue-tiny-router'
import App from './App.vue'

const app = createApp(App)

// Install TinyRouter plugin
app.use(TinyRouterInstall)

app.mount('#app')
```

## Navigation Examples

### Link Navigation

```vue
<template>
  <nav>
    <!-- These links are automatically intercepted by the router -->
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</template>
```

### Programmatic Navigation

```vue
<template>
  <div>
    <button @click="goToPage('/about')">About</button>
    <button @click="goToPage('/contact')">Contact</button>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      this.$router.push(path)
    },
    goBack() {
      // Note: TinyRouter doesn't include back() method to keep size small
      // Use browser's native history API if needed
      window.history.back()
    }
  }
}
</script>
```

## Conditional Navigation

```vue
<template>
  <div>
    <button @click="navigateConditionally">
      Smart Navigation
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateConditionally() {
      if (this.userIsLoggedIn) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    userIsLoggedIn() {
      // Your authentication logic here
      return false
    }
  }
}
</script>
```

## Multiple Route Definitions

```javascript
// Comprehensive route setup
const routes = [
  // Home page
  { path: '/', component: Home },
  
  // Static pages
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/services', component: Services },
  
  // Dynamic routes (will be covered in route parameters section)
  { path: '/user/:id', component: UserProfile },
  { path: '/blog/:slug', component: BlogPost },
  
  // Catch-all or fallback (uses first route)
  // TinyRouter automatically falls back to the first route for unmatched paths
]
```

## Route Information Access

```vue
<template>
  <div class="debug-info">
    <h3>Debug Information</h3>
    <div class="info-grid">
      <div>
        <strong>Current Route:</strong>
        <code>{{ $router.route }}</code>
      </div>
      <div>
        <strong>Route Parameters:</strong>
        <code>{{ JSON.stringify($router.params, null, 2) }}</code>
      </div>
      <div>
        <strong>Current Component:</strong>
        <code>{{ $router.component?.name || 'Unknown' }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-info {
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.info-grid > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

code {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}
</style>
```

## Next Steps

- [Route Parameters](/examples/route-parameters) - Handle dynamic segments
- [Route Guards](/examples/route-guards) - Control navigation flow
- [Memory Mode](/examples/memory-mode) - Routing without URL changes
- [Full App Example](/examples/full-app) - Complete application demo 