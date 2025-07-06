<template>
  <div class="container">
    <div class="card">
      <h1>Route Parameters Demo</h1>
      <p>Select a user to update the route, then check the logged parameter value.</p>
      
      <div class="section">
        <strong>Navigate:</strong>
        
        <div class="button-group">
          <button @click="$router.push('/user/123')" class="btn">User 123</button>
          <button @click="$router.push('/user/456')" class="btn">User 456</button>
          <button @click="$router.push('/user/789')" class="btn">User 789</button>
        </div>
        
        <div class="info-box">
          <strong>Current params:</strong> {{ JSON.stringify($router.params) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteParams'
}
</script>

<style scoped>
/* Simplified layout */
.section {
  margin-bottom: 1.5rem;
}

/* Remove unused styles */
.code-block,
.code-line {
  display: none;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.info-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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

code {
  background: #e8f5e8;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: #2d5a3d;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }
}
</style> 