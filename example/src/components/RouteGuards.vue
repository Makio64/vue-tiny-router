<template>
  <div class="container">
    <div class="card">
      <h1>Route Guard Demo</h1>
      <p>Toggle the guard and attempt navigation. Guards can also trigger page transition animations.</p>
      
      <div class="section">
        <strong>Status:</strong>
        
        <div class="guard-controls">
          <div class="guard-status">
            <span :class="guardEnabled ? 'status-blocked' : 'status-allowed'">
              {{ guardEnabled ? 'Enabled — navigation blocked' : 'Disabled — navigation allowed' }}
            </span>
          </div>
          
          <button 
            @click="guardEnabled = !guardEnabled" 
            :class="['btn', guardEnabled ? 'btn-success' : 'btn-secondary']"
          >
            {{ guardEnabled ? 'Disable Guard' : 'Enable Guard' }}
          </button>
        </div>
        
        <div class="test-area">
          <p>Navigation test:</p>
          <div class="button-group">
            <button @click="$router.push('/')" class="btn">Home</button>
            <button @click="$router.push('/params')" class="btn">Route Params</button>
            <button @click="$router.push('/anchors')" class="btn">Anchors</button>
          </div>
          
          <div v-if="guardEnabled" class="warning-box">
            <strong>Navigation is currently blocked</strong>
            <p>Disable the guard to allow route change.</p>
          </div>
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
.section { margin-bottom: 1.5rem; }

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

.code-block,
.use-cases,
.use-case-icon {
  display: none;
}

@media (max-width: 768px) {
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