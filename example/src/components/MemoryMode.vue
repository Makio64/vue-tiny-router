<template>
  <div class="container">
    <div class="card">
      <h1>Memory Mode</h1>
      <p>Learn how to use memory mode for routing that doesn't affect the browser URL.</p>
      
      <div class="section">
        <h3>What is Memory Mode?</h3>
        <p>Memory mode allows the router to maintain its own internal state without affecting the browser's URL or history. This is perfect for embedded applications, modals, or testing scenarios.</p>
        
        <div class="code-block">
          <div class="code-line">&lt;TinyRouter :routes="routes" :memoryMode="true" /&gt;</div>
        </div>
      </div>

      <div class="section">
        <h3>Current Browser URL</h3>
        <div class="url-display">
          <strong>{{ currentUrl }}</strong>
        </div>
        <p>Notice how this URL stays the same when you navigate in the memory router below.</p>
      </div>

      <div class="section">
        <h3>When to Use Memory Mode</h3>
        <div class="use-cases">
          <div class="use-case">
            <div class="use-case-icon">🧪</div>
            <h4>Testing</h4>
            <p>Perfect for unit tests where you don't want to affect the browser's history</p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">📱</div>
            <h4>Embedded Apps</h4>
            <p>When your Vue app is embedded in another application</p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">🎭</div>
            <h4>Modals & Overlays</h4>
            <p>For complex navigation within modals or overlay components</p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">📝</div>
            <h4>Multi-step Forms</h4>
            <p>Navigate through form steps without changing the main URL</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Memory Router Demo</h3>
        <p>This is a separate router instance running in memory mode:</p>
        
        <div class="memory-router-container">
          <div class="memory-nav">
            <button @click="memoryRoute = '/'" :class="['memory-btn', memoryRoute === '/' ? 'active' : '']">
              Memory Home
            </button>
            <button @click="memoryRoute = '/about'" :class="['memory-btn', memoryRoute === '/about' ? 'active' : '']">
              Memory About
            </button>
            <button @click="memoryRoute = '/contact'" :class="['memory-btn', memoryRoute === '/contact' ? 'active' : '']">
              Memory Contact
            </button>
          </div>
          
          <div class="memory-content">
            <div class="memory-status">
              <strong>Memory Router Route:</strong> {{ memoryRoute }}
            </div>
            
            <div v-if="memoryRoute === '/'" class="memory-page">
              <h4>🏠 Memory Home</h4>
              <p>This is the home page of the memory router. Notice how the browser URL doesn't change when you navigate here.</p>
            </div>
            
            <div v-if="memoryRoute === '/about'" class="memory-page">
              <h4>ℹ️ Memory About</h4>
              <p>This is the about page of the memory router. The navigation is completely independent of the main router.</p>
            </div>
            
            <div v-if="memoryRoute === '/contact'" class="memory-page">
              <h4>📞 Memory Contact</h4>
              <p>This is the contact page of the memory router. Perfect for embedded scenarios where you need isolated navigation.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>How It Works</h3>
        <p>Memory mode routers maintain their own state without using the browser's history API:</p>
        
        <div class="comparison">
          <div class="comparison-item">
            <h4>Normal Mode</h4>
            <ul>
              <li>Updates browser URL</li>
              <li>Affects browser history</li>
              <li>Can use back/forward buttons</li>
              <li>Shareable URLs</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h4>Memory Mode</h4>
            <ul>
              <li>Internal state only</li>
              <li>No history changes</li>
              <li>Isolated navigation</li>
              <li>Perfect for embedded apps</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Code Example</h3>
        <div class="code-block">
          <div class="code-line">// Regular router instance</div>
          <div class="code-line">&lt;TinyRouter :routes="mainRoutes" /&gt;</div>
          <div class="code-line"></div>
          <div class="code-line">// Memory router instance</div>
          <div class="code-line">&lt;TinyRouter :routes="memoryRoutes" :memoryMode="true" /&gt;</div>
        </div>
      </div>

      <div class="section">
        <button @click="$router.push('/')" class="btn">← Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryMode',
  data() {
    return {
      memoryRoute: '/',
      currentUrl: window.location.href
    }
  },
  mounted() {
    // Update URL display periodically to show it doesn't change
    this.urlInterval = setInterval(() => {
      this.currentUrl = window.location.href
    }, 100)
  },
  beforeUnmount() {
    if (this.urlInterval) {
      clearInterval(this.urlInterval)
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.url-display {
  padding: 1rem;
  background: #f8fffe;
  border: 1px solid #e8f5e8;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  word-break: break-all;
  border-left: 4px solid #4ade80;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.use-case {
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
  text-align: center;
}

.use-case-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.use-case h4 {
  margin: 0 0 0.5rem 0;
  color: #2d5a3d;
}

.use-case p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.memory-router-container {
  border: 2px dashed #4ade80;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  background: #f8fffe;
}

.memory-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.memory-btn {
  padding: 0.5rem 1rem;
  background: white;
  color: #2d5a3d;
  border: 1px solid #e8f5e8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.memory-btn:hover {
  background: #e8f5e8;
  border-color: #4ade80;
}

.memory-btn.active {
  background: #4ade80;
  color: white;
  border-color: #4ade80;
}

.memory-content {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e8f5e8;
}

.memory-status {
  padding: 0.75rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  margin-bottom: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

.memory-page {
  padding: 1rem;
}

.memory-page h4 {
  margin: 0 0 1rem 0;
  color: #2d5a3d;
}

.memory-page p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.comparison-item {
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #2d5a3d;
}

.comparison-item ul {
  margin: 0;
  padding-left: 1.5rem;
}

.comparison-item li {
  margin: 0.5rem 0;
  color: #666;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

.code-line {
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .use-cases,
  .comparison {
    grid-template-columns: 1fr;
  }
  
  .memory-nav {
    flex-direction: column;
  }
  
  .memory-btn {
    text-align: center;
  }
}
</style> 