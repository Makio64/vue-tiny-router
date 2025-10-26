<template>
	<div class="container">
		<div class="card">
			<h1>Memory Mode Demo</h1>
			<p>Navigate below: the browser URL stays unchanged.</p>
      
			<div class="section">
				<strong>Current Browser URL</strong>
				<div class="url-display">
					<strong>{{ currentUrl }}</strong>
				</div>
			</div>

			<div class="section">
				<strong>Memory Router</strong>
        
				<div class="memory-router-container">
					<div class="memory-nav">
						<button :class="['memory-btn', memoryRoute === '/' ? 'active' : '']" @click="memoryRoute = '/'">
							Home
						</button>
						<button :class="['memory-btn', memoryRoute === '/about' ? 'active' : '']" @click="memoryRoute = '/about'">
							About
						</button>
						<button :class="['memory-btn', memoryRoute === '/contact' ? 'active' : '']" @click="memoryRoute = '/contact'">
							Contact
						</button>
					</div>
          
					<div class="memory-content">
						<div class="memory-status">
							<strong>Route:</strong> {{ memoryRoute }}
						</div>
            
						<div v-if="memoryRoute === '/'" class="memory-page">
							Home content (memory router)
						</div>
            
						<div v-if="memoryRoute === '/about'" class="memory-page">
							About content (memory router)
						</div>
            
						<div v-if="memoryRoute === '/contact'" class="memory-page">
							Contact content (memory router)
						</div>
					</div>
				</div>
			</div>

			<div class="section">
				<button class="btn" @click="$router.push('/')">← Home</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MemoryMode',
	data() {
		return {
			memoryRoute: '/',
			currentUrl: window.location.href
		}
	},
	mounted() {
		// Update URL display periodically to show it doesn't change
		this.urlInterval = setInterval( () => {
			this.currentUrl = window.location.href
		}, 100 )
	},
	beforeUnmount() {
		if ( this.urlInterval ) {
			clearInterval( this.urlInterval )
		}
	}
}
</script>

<style scoped>
.section {
  margin-bottom: 1.5rem;
}

.url-display {
  padding: 1rem;
  background: #f8fffe;
  border: 1px solid #e8f5e8;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  word-break: break-all;
  border-left: 4px solid #4ade80;
}

.use-cases,
.comparison,
.code-block,
.use-case-icon {
  display: none;
}

.memory-router-container {
  border: 2px dashed #4ade80;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  background: #f8fffe;
}

.memory-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.memory-btn {
  padding: 0.5rem 1rem;
  background: white;
  color: #2d5a3d;
  border: 1px solid #e8f5e8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.memory-btn:hover {
  background: #e8f5e8;
  border-color: #4ade80;
}

.memory-btn.active {
  background: #4ade80;
  color: white;
  border-color: #4ade80;
}

.memory-content {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e8f5e8;
}

.memory-status {
  padding: 0.75rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  margin-bottom: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

.memory-page {
  padding: 1rem;
}

.memory-page h4 {
  margin: 0 0 1rem 0;
  color: #2d5a3d;
}

.memory-page p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.comparison-item {
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #2d5a3d;
}

.comparison-item ul {
  margin: 0;
  padding-left: 1.5rem;
}

.comparison-item li {
  margin: 0.5rem 0;
  color: #666;
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
  .use-cases,
  .comparison {
    grid-template-columns: 1fr;
  }
  
  .memory-nav {
    flex-direction: column;
  }
  
  .memory-btn {
    text-align: center;
  }
}
</style> 