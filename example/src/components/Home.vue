<template>
  <div class="container">
    <div class="card">
      <h1>Vue Tiny Router Examples</h1>
      <p>This website is a demo of the Vue Tiny Router library.<br />
    It showcases the features of the library.</p>
      
    </div>

    <div class="card">
      <h2>Interactive Examples</h2>
      <p>Explore each feature with hands-on examples:</p>
      
      <div class="examples-grid">
        <a href="/params" class="example-card">
          <div class="example-icon">🎯</div>
          <h3>Route Parameters</h3>
          <p>Dynamic routes with parameters</p>
        </a>
        
        <a href="/guards" class="example-card">
          <div class="example-icon">🔒</div>
          <h3>Route Guards</h3>
          <p>Control navigation flow</p>
        </a>
        
        <a href="/anchors" class="example-card">
          <div class="example-icon">⚓</div>
          <h3>Anchor Links</h3>
          <p>Smooth scrolling to sections</p>
        </a>
        
        <a href="/memory" class="example-card">
          <div class="example-icon">🧠</div>
          <h3>Memory Mode</h3>
          <p>Routing without URL changes</p>
        </a>
      </div>
    </div>

    <div class="card">
      <h2>Quick Start</h2>
      <div class="code-block">
        <div class="code-line">npm install vue-tiny-router</div>
      </div>
      <div class="code-block">
        <div class="code-line">import { TinyRouterInstall } from 'vue-tiny-router'</div>
        <div class="code-line">app.use(TinyRouterInstall)</div>
      </div>
      <div class="code-block">
        <div class="code-line">&lt;TinyRouter :routes="routes" /&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.features {
  text-align: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.example-card {
  display: block;
  text-decoration: none;
  padding: 1.5rem;
  background: #f0fdf4;
  border: 1px solid #4ade80;
  border-radius: 12px;
  transition: all 0.2s ease;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #4ade80;
}

.example-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.example-card h3 {
  color: #2d5a3d;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.example-card p {
  color: #666;
  margin: 0;
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
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style> 