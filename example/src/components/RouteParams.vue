<template>
  <div class="container">
    <div class="card">
      <h1>Route Parameters</h1>
      <p>Learn how to use dynamic route segments to capture values from the URL.</p>
      
      <div class="section">
        <h3>What are Route Parameters?</h3>
        <p>Route parameters allow you to capture dynamic segments from the URL. They're defined with a colon prefix like <code>:id</code>.</p>
        
        <div class="code-block">
          <div class="code-line">const routes = [</div>
          <div class="code-line">  { path: '/user/:id', component: UserProfile }</div>
          <div class="code-line">]</div>
        </div>
      </div>

      <div class="section">
        <h3>Try It Out</h3>
        <p>Click these buttons to navigate to different user profiles:</p>
        
        <div class="button-group">
          <button @click="$router.push('/user/123')" class="btn">User 123</button>
          <button @click="$router.push('/user/456')" class="btn">User 456</button>
          <button @click="$router.push('/user/789')" class="btn">User 789</button>
        </div>
        
        <div class="info-box">
          <strong>Current Route:</strong> {{ $router.route || 'N/A' }}
        </div>
      </div>

      <div class="section">
        <h3>How to Access Parameters</h3>
        <p>In your component, access route parameters using <code>this.$router.params</code>:</p>
        
        <div class="code-block">
          <div class="code-line">// In your component</div>
          <div class="code-line">console.log(this.$router.params.id)</div>
          <div class="code-line">// Returns: "123" for /user/123</div>
        </div>
      </div>

      <div class="section">
        <h3>Multiple Parameters</h3>
        <p>You can have multiple parameters in a single route:</p>
        
        <div class="code-block">
          <div class="code-line">{ path: '/user/:id/post/:postId', component: Post }</div>
        </div>
        
        <p>Both <code>id</code> and <code>postId</code> would be available in <code>this.$router.params</code>.</p>
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
.section {
  margin-bottom: 2rem;
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