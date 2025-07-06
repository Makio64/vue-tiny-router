<template>
  <div class="container">
    <div class="card">
      <h1>Anchor Links</h1>
      <p>Learn how to use anchor links for smooth scrolling to different sections of your page.</p>
      
      <div class="section">
        <h3>What are Anchor Links?</h3>
        <p>Anchor links allow you to link to specific sections within a page using hash fragments. Vue Tiny Router automatically handles smooth scrolling to elements with matching IDs.</p>
        
        <div class="code-block">
          <div class="code-line">// In your template</div>
          <div class="code-line">&lt;a href="#section1"&gt;Go to Section 1&lt;/a&gt;</div>
          <div class="code-line">&lt;div id="section1"&gt;Section content&lt;/div&gt;</div>
        </div>
      </div>

      <div class="section">
        <h3>Navigation Menu</h3>
        <p>Click these anchor links to scroll to different sections:</p>
        
        <div class="anchor-nav">
          <a href="#features" class="anchor-link">Features</a>
          <a href="#benefits" class="anchor-link">Benefits</a>
          <a href="#usage" class="anchor-link">Usage</a>
          <a href="#examples" class="anchor-link">Examples</a>
        </div>
      </div>

      <div class="section">
        <h3>How It Works</h3>
        <p>Vue Tiny Router automatically detects hash fragments and scrolls to matching elements:</p>
        
        <div class="code-block">
          <div class="code-line">// Navigation to /anchors#features</div>
          <div class="code-line">// Router finds element with id="features"</div>
          <div class="code-line">// Automatically scrolls with smooth behavior</div>
        </div>
      </div>

      <div class="section">
        <button @click="$router.push('/')" class="btn">← Back to Home</button>
      </div>
    </div>

    <!-- Anchor Sections -->
    <div class="anchor-section" id="features">
      <div class="card">
        <h2>✨ Features</h2>
        <p>Vue Tiny Router provides smooth anchor link functionality out of the box:</p>
        
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <div>
              <h4>Automatic Detection</h4>
              <p>Automatically detects hash fragments in URLs</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🏃‍♂️</div>
            <div>
              <h4>Smooth Scrolling</h4>
              <p>Uses native smooth scrolling behavior</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔧</div>
            <div>
              <h4>No Configuration</h4>
              <p>Works automatically with no setup required</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="anchor-section" id="benefits">
      <div class="card">
        <h2>🎁 Benefits</h2>
        <p>Anchor links provide several advantages for user experience:</p>
        
        <div class="benefit-grid">
          <div class="benefit">
            <h4>Better Navigation</h4>
            <p>Users can quickly jump to specific sections</p>
          </div>
          <div class="benefit">
            <h4>Improved UX</h4>
            <p>Smooth scrolling feels more polished</p>
          </div>
          <div class="benefit">
            <h4>SEO Friendly</h4>
            <p>Search engines can index section links</p>
          </div>
          <div class="benefit">
            <h4>Accessibility</h4>
            <p>Screen readers can navigate sections</p>
          </div>
        </div>
      </div>
    </div>

    <div class="anchor-section" id="usage">
      <div class="card">
        <h2>🚀 Usage</h2>
        <p>Using anchor links is straightforward:</p>
        
        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Add ID to target element</h4>
              <div class="code-block">
                <div class="code-line">&lt;div id="my-section"&gt;Content&lt;/div&gt;</div>
              </div>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Create anchor link</h4>
              <div class="code-block">
                <div class="code-line">&lt;a href="#my-section"&gt;Go to section&lt;/a&gt;</div>
              </div>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Enjoy smooth scrolling!</h4>
              <p>Vue Tiny Router handles the rest automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="anchor-section" id="examples">
      <div class="card">
        <h2>📝 Examples</h2>
        <p>Here are some practical examples of anchor links in action:</p>
        
        <div class="example-grid">
          <div class="example">
            <h4>Table of Contents</h4>
            <p>Create a navigation menu for long articles</p>
          </div>
          <div class="example">
            <h4>FAQ Sections</h4>
            <p>Link directly to specific questions</p>
          </div>
          <div class="example">
            <h4>Feature Highlights</h4>
            <p>Navigate between product features</p>
          </div>
          <div class="example">
            <h4>Documentation</h4>
            <p>Jump to specific API sections</p>
          </div>
        </div>
        
        <div class="back-to-top">
          <a href="#" class="btn btn-outline">↑ Back to Top</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnchorLinks'
}
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.anchor-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.anchor-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8fffe;
  color: #2d5a3d;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  transition: all 0.2s ease;
  font-weight: 500;
}

.anchor-link:hover {
  background: #e8f5e8;
  border-color: #4ade80;
  transform: translateY(-1px);
}

.anchor-section {
  margin: 3rem 0;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-item h4 {
  margin: 0 0 0.25rem 0;
  color: #2d5a3d;
}

.feature-item p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.benefit {
  padding: 1rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  text-align: center;
}

.benefit h4 {
  margin: 0 0 0.5rem 0;
  color: #2d5a3d;
}

.benefit p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1rem 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: #4ade80;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2d5a3d;
}

.step-content p {
  margin: 0;
  color: #666;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.example {
  padding: 1rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  text-align: center;
}

.example h4 {
  margin: 0 0 0.5rem 0;
  color: #2d5a3d;
}

.example p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.back-to-top {
  text-align: center;
  margin: 2rem 0;
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
</style> 