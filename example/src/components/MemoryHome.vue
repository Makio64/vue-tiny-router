<template>
  <div class="memory-home">
    <h3>🏠 Memory Router Home</h3>
    <p>This is the home page of the memory router. Notice how the browser URL doesn't change!</p>

    <div class="memory-nav">
      <button @click="navigate('/about')" class="btn btn-secondary">
        Go to Memory About
      </button>
      <span class="separator">|</span>
      <span class="current-route">Current: {{ currentRoute }}</span>
    </div>

    <div class="info">
      <p>🧠 This router operates in memory mode - it doesn't affect the browser's history or URL.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryHome',
  data() {
    return {
      currentRoute: '/'
    }
  },
  methods: {
    navigate(path) {
      // We need to find the memory router instance
      // For demo purposes, we'll simulate navigation
      this.currentRoute = path
      // In reality, you'd call the memory router's push method
      console.log('Memory router navigating to:', path)
    }
  }
}
</script>

<style scoped>
.memory-home {
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
