<template>
  <div class="container">
    <div class="card">
      <h1>Vue Tiny Router Examples</h1>
      <p>This website is a demo of the Vue Tiny Router library.<br />
    It showcases the features of the library.</p>
      
    </div>

    <div class="card">
      <h2>Interactive Examples</h2>
      <ul class="example-list">
        <li><a href="/params">Route Parameters</a> – dynamic routes with parameters</li>
        <li><a href="/guards">Route Guards</a> – control navigation flow</li>
        <li><a href="/anchors">Anchor Links</a> – smooth scrolling to sections</li>
        <li><a href="/memory">Memory Mode</a> – routing without URL changes</li>
      </ul>
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

/* Simplified example list */
.example-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.example-list li {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.example-list a {
  color: #2d5a3d;
  font-weight: 600;
  text-decoration: none;
}

.example-list a:hover {
  text-decoration: underline;
}
</style> 