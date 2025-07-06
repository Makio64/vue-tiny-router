<template>
  <div class="protected">
    <div class="card">
      <h2>🔒 Protected Route</h2>
      <p>This page demonstrates route guards in action.</p>
      
      <div class="section">
        <h3>✅ Access Granted</h3>
        <p>You successfully accessed this protected route! This shows that the route guard allowed navigation.</p>
      </div>

      <div class="section">
        <h3>🛡️ How Route Guards Work</h3>
        <div class="explanation">
          <p>This component implements the <code>beforeRouteLeave</code> guard:</p>
          <div class="code-example">
            <pre><code>beforeRouteLeave(next) {
  if (this.allowLeave) {
    next() // Allow navigation
  } else {
    // Block navigation
    console.log('Navigation blocked!')
  }
}</code></pre>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>🔄 Test Route Guard</h3>
        <p>Toggle the guard and try to navigate away:</p>
        
        <div class="guard-controls">
          <div class="guard-status">
            <strong>Guard Status:</strong>
            <span :class="allowLeave ? 'status-allowed' : 'status-blocked'">
              {{ allowLeave ? '✅ Allow Navigation' : '❌ Block Navigation' }}
            </span>
          </div>
          
          <button 
            @click="allowLeave = !allowLeave" 
            :class="['btn', allowLeave ? 'btn-danger' : 'btn-success']"
          >
            {{ allowLeave ? '🔒 Enable Guard' : '🔓 Disable Guard' }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3>🚨 Guard Test Area</h3>
        <div class="test-area">
          <p>Try to navigate away using these buttons:</p>
          <div class="test-buttons">
            <button @click="$router.push('/')" class="btn">Go to Home</button>
            <button @click="$router.push('/about')" class="btn">Go to About</button>
            <button @click="$router.push('/user/123')" class="btn">Go to User</button>
          </div>
          
          <div v-if="!allowLeave" class="warning">
            <p>⚠️ Navigation is currently blocked. Toggle the guard above to allow navigation.</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>📝 Guard Use Cases</h3>
        <div class="use-cases">
          <div class="use-case">
            <h4>💾 Unsaved Changes</h4>
            <p>Prevent users from leaving a form with unsaved changes</p>
          </div>
          <div class="use-case">
            <h4>🔐 Authentication</h4>
            <p>Ensure users are logged in before accessing protected routes</p>
          </div>
          <div class="use-case">
            <h4>📊 Analytics</h4>
            <p>Track user behavior before they leave a page</p>
          </div>
          <div class="use-case">
            <h4>🎬 Animations</h4>
            <p>Play exit animations before navigation</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>💡 Implementation Tips</h3>
        <div class="tips">
          <div class="tip">
            <strong>Call next():</strong> Always call the next function to allow navigation
          </div>
          <div class="tip">
            <strong>Async Operations:</strong> You can perform async operations before calling next()
          </div>
          <div class="tip">
            <strong>Conditional Logic:</strong> Use any condition to determine if navigation should proceed
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Protected',
  data() {
    return {
      allowLeave: true
    }
  },
  methods: {
    beforeRouteLeave(next) {
      if (this.allowLeave) {
        // Allow navigation
        next()
      } else {
        // Block navigation
        console.log('Navigation blocked by route guard!')
        
        // You could show a modal here, or perform other actions
        // For this demo, we're just blocking the navigation
        // In a real app, you might do something like:
        // if (confirm('Are you sure you want to leave?')) {
        //   next()
        // }
      }
    }
  }
}
</script>

<style scoped>
.protected {
  max-width: 800px;
}

.explanation {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #f39c12;
  margin: 1rem 0;
}

.code-example {
  margin: 1rem 0;
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
}

.guard-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
}

.guard-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-allowed {
  color: #27ae60;
  font-weight: 600;
}

.status-blocked {
  color: #e74c3c;
  font-weight: 600;
}

.btn-success {
  background: #27ae60;
}

.btn-success:hover {
  background: #219a52;
}

.btn-danger {
  background: #e74c3c;
}

.btn-danger:hover {
  background: #c0392b;
}

.test-area {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  margin: 1rem 0;
}

.test-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.warning {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  color: #856404;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.use-case {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.use-case h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.use-case p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.tips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tip {
  padding: 0.75rem;
  background: #e8f5e8;
  border-radius: 8px;
  border-left: 4px solid #27ae60;
}

.tip strong {
  color: #27ae60;
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
  
  .test-buttons {
    flex-direction: column;
  }
}
</style> 