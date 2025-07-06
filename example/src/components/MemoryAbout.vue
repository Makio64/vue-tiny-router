<template>
  <div class="memory-about">
    <h3>ℹ️ Memory Router About</h3>
    <p>This is the about page of the memory router. The browser URL remains unchanged!</p>
    
    <div class="memory-nav">
      <button @click="navigate('/')" class="btn btn-secondary">
        Go to Memory Home
      </button>
      <span class="separator">|</span>
      <span class="current-route">Current: {{ currentRoute }}</span>
    </div>
    
    <div class="features">
      <h4>🌟 Memory Mode Features:</h4>
      <ul>
        <li>✅ No browser history changes</li>
        <li>✅ No URL changes</li>
        <li>✅ Perfect for embedded scenarios</li>
        <li>✅ Ideal for testing</li>
      </ul>
    </div>
    
    <div class="info">
      <p>🧠 This demonstrates how you can have multiple router instances with different behaviors.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryAbout',
  data() {
    return {
      currentRoute: '/about'
    }
  },
  methods: {
    navigate(path) {
      this.currentRoute = path
      console.log('Memory router navigating to:', path)
    }
  }
}
</script>

<style scoped>
.memory-about {
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 8px;
  border: 2px dashed #3498db;
  margin: 1rem 0;
}

.memory-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.separator {
  color: #bdc3c7;
  font-weight: bold;
}

.current-route {
  font-family: 'Fira Code', 'Consolas', monospace;
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.features {
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(52, 152, 219, 0.05);
  border-radius: 8px;
}

.features h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.features ul {
  margin: 0;
  padding-left: 1.5rem;
}

.features li {
  margin: 0.25rem 0;
  color: #2c3e50;
}

.info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 4px;
  border-left: 4px solid #3498db;
}

.info p {
  margin: 0;
  font-size: 0.9rem;
  color: #2c3e50;
}
</style> 