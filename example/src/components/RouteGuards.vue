<template>
  <div class="container">
    <div class="card">
      <h1>Route Guards</h1>
      <p>Learn how to control navigation with route guards.</p>
      
      <div class="section">
        <h3>What are Route Guards?</h3>
        <p>Route guards allow you to control navigation by blocking or allowing route changes. They're perfect for preventing users from leaving unsaved forms or implementing authentication.</p>
        
        <div class="code-block">
          <div class="code-line">// In your component</div>
          <div class="code-line">beforeRouteLeave(next) {</div>
          <div class="code-line">  if (this.canLeave) {</div>
          <div class="code-line">    next() // Allow navigation</div>
          <div class="code-line">  } else {</div>
          <div class="code-line">    // Block navigation</div>
          <div class="code-line">  }</div>
          <div class="code-line">}</div>
        </div>
      </div>

      <div class="section">
        <h3>Try It Out</h3>
        <p>Toggle the guard status and try to navigate away:</p>
        
        <div class="guard-controls">
          <div class="guard-status">
            <span class="status-label">Guard Status:</span>
            <span :class="guardEnabled ? 'status-blocked' : 'status-allowed'">
              {{ guardEnabled ? '🔒 Enabled (will block)' : '🔓 Disabled (will allow)' }}
            </span>
          </div>
          
          <button 
            @click="guardEnabled = !guardEnabled" 
            :class="['btn', guardEnabled ? 'btn-success' : 'btn-secondary']"
          >
            {{ guardEnabled ? '🔓 Disable Guard' : '🔒 Enable Guard' }}
          </button>
        </div>
        
        <div class="test-area">
          <p>Try to navigate away using these buttons:</p>
          <div class="button-group">
            <button @click="$router.push('/')" class="btn">Go to Home</button>
            <button @click="$router.push('/params')" class="btn">Route Parameters</button>
            <button @click="$router.push('/anchors')" class="btn">Anchor Links</button>
          </div>
          
          <div v-if="guardEnabled" class="warning-box">
            <strong>⚠️ Navigation Blocked!</strong>
            <p>The route guard is currently enabled and will prevent navigation. Disable it to allow navigation.</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Common Use Cases</h3>
        <div class="use-cases">
          <div class="use-case">
            <div class="use-case-icon">💾</div>
            <h4>Unsaved Changes</h4>
            <p>Prevent users from leaving a form with unsaved changes</p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">🔐</div>
            <h4>Authentication</h4>
            <p>Ensure users are logged in before accessing protected routes</p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">📊</div>
            <h4>Analytics</h4>
            <p>Track user behavior before they leave a page</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Implementation</h3>
        <p>Add the guard method to your component:</p>
        
        <div class="code-block">
          <div class="code-line">export default {</div>
          <div class="code-line">  name: 'MyComponent',</div>
          <div class="code-line">  methods: {</div>
          <div class="code-line">    beforeRouteLeave(next) {</div>
          <div class="code-line">      // Your logic here</div>
          <div class="code-line">      if (this.shouldAllowNavigation) {</div>
          <div class="code-line">        next() // Allow</div>
          <div class="code-line">      } else {</div>
          <div class="code-line">        // Don't call next() to block</div>
          <div class="code-line">      }</div>
          <div class="code-line">    }</div>
          <div class="code-line">  }</div>
          <div class="code-line">}</div>
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
  name: 'RouteGuards',
  data() {
    return {
      guardEnabled: false
    }
  },
  methods: {
    beforeRouteLeave(next) {
      if (this.guardEnabled) {
        // Block navigation
        console.log('Navigation blocked by route guard!')
        return
      }
      
      // Allow navigation
      next()
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.guard-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
  margin: 1rem 0;
}

.guard-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-label {
  font-weight: 600;
  color: #2d5a3d;
}

.status-allowed {
  color: #22c55e;
  font-weight: 600;
}

.status-blocked {
  color: #ef4444;
  font-weight: 600;
}

.btn-success {
  background: #22c55e;
}

.btn-success:hover {
  background: #16a34a;
}

.test-area {
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
  margin: 1rem 0;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.warning-box {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.warning-box strong {
  color: #92400e;
}

.warning-box p {
  margin: 0.5rem 0 0 0;
  color: #92400e;
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
  .use-cases {
    grid-template-columns: 1fr;
  }
  
  .guard-controls {
    align-items: stretch;
  }
  
  .guard-status {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style> 