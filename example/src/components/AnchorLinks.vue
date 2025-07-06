<template>
  <div class="container">
    <div class="card">
      <h1>Anchor Links Demo</h1>
      <p>Click a link to jump to a section.</p>
      
      <div class="section">
        <div class="anchor-nav">
          <button class="anchor-btn" @click="$router.push('/anchors#section1')">Section 1</button>
          <button class="anchor-btn" @click="$router.push('/anchors#section2')">Section 2</button>
          <button class="anchor-btn" @click="$router.push('/anchors#section3')">Section 3</button>
        </div>
      </div>

      <div class="section">
      </div>
    </div>

    <!-- Minimal anchor sections -->
    <div class="anchor-section section-1" id="section1">
      <h2>SECTION 1</h2>
      <button class="back-btn" @click="scrollToTop">Back to Top</button>
    </div>
    <div class="anchor-section section-2" id="section2">
      <h2>SECTION 2</h2>
      <button class="back-btn" @click="scrollToTop">Back to Top</button>
    </div>
    <div class="anchor-section section-3" id="section3">
      <h2>SECTION 3</h2>
      <button class="back-btn" @click="scrollToTop">Back to Top</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnchorLinks',
  methods: {
    scrollToTop() {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 1.5rem;
}

.anchor-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.anchor-btn {
  padding: 0.6rem 1.2rem;
  background: #4ade80;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.anchor-btn:hover {
  background: #22c55e;
  transform: translateY(-1px);
}

.anchor-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-size: 2rem;
}

.section-1 {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
}

.section-2 {
  background: linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%);
}

.section-3 {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
}

.feature-list {
  display: none;
}

.benefit-grid {
  display: none;
}

.usage-steps {
  display: none;
}

.example-grid {
  display: none;
}

.feature-item {
  display: none;
}

.benefit {
  display: none;
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
  .anchor-nav {
    flex-direction: column;
  }
  
  .benefit-grid,
  .example-grid {
    grid-template-columns: 1fr;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
  }
}

.back-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #2d5a3d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.back-btn:hover {
  background: #ffffff;
}
</style> 