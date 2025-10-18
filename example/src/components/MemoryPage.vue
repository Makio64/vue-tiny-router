<template>
  <div class="memory-page">
    <div class="card">
      <h2>🧠 Memory Mode</h2>
      <p>This page demonstrates memory mode routing - a separate router instance that doesn't affect the browser URL.</p>

      <div class="section">
        <h3>📍 Current Browser URL</h3>
        <div class="url-display">
          <strong>{{ window.location.href }}</strong>
        </div>
        <p>Notice how the URL stays the same when you navigate in the memory router below.</p>
      </div>

      <div class="section">
        <h3>🎯 When to Use Memory Mode</h3>
        <div class="use-cases">
          <div class="use-case">
            <h4>🧪 Testing</h4>
            <p>Perfect for unit tests where you don't want to affect the browser's history</p>
          </div>
          <div class="use-case">
            <h4>📱 Embedded Apps</h4>
            <p>When your Vue app is embedded in another application</p>
          </div>
          <div class="use-case">
            <h4>🎭 Modals & Overlays</h4>
            <p>For complex navigation within modals or overlay components</p>
          </div>
          <div class="use-case">
            <h4>🔄 Multi-step Forms</h4>
            <p>Navigate through form steps without changing the main URL</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>💡 How It Works</h3>
        <div class="explanation">
          <p>Memory mode is enabled by setting the <code>memoryMode</code> prop to <code>true</code>:</p>
          <div class="code-example">
            <pre><code>&lt;TinyRouter :routes="routes" :memoryMode="true" /&gt;</code></pre>
          </div>
          <p>The router maintains its own internal state without calling <code>history.pushState()</code>.</p>
        </div>
      </div>

      <div class="section">
        <h3>🔗 Navigation</h3>
        <button @click="$router.push('/')" class="btn">Back to Home</button>
        <button @click="$router.push('/about')" class="btn">About Page</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryPage',
  data() {
    return {
      window: window
    }
  }
}
</script>

<style scoped>
.memory-page {
  max-width: 800px;
}

.url-display {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  margin: 1rem 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  word-break: break-all;
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

.explanation {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #f39c12;
  margin: 1rem 0;
}

.explanation code {
  background: #e9ecef;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
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

@media (max-width: 768px) {
  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>
