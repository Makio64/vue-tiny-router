<template>
  <div class="container">
    <div class="card">
      <h1>User Profile</h1>
      <p>This page shows how route parameters are extracted from the URL.</p>
      
      <div class="section">
        <h3>Current Route Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>Route Path:</strong>
            <code>{{ $router.route }}</code>
          </div>
          <div class="info-item">
            <strong>User ID Parameter:</strong>
            <code>{{ $router.params.id || 'No ID found' }}</code>
          </div>
          <div class="info-item">
            <strong>All Parameters:</strong>
            <code>{{ JSON.stringify($router.params) }}</code>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>User Details</h3>
        <div class="user-card">
          <div class="avatar">{{ userInfo.avatar }}</div>
          <div class="user-info">
            <h4>{{ userInfo.name }}</h4>
            <p><strong>ID:</strong> {{ $router.params.id }}</p>
            <p><strong>Role:</strong> {{ userInfo.role }}</p>
            <p><strong>Status:</strong> {{ userInfo.status }}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Try Different Users</h3>
        <p>Navigate to different user profiles to see how parameters change:</p>
        
        <div class="button-group">
          <button 
            v-for="userId in sampleUsers" 
            :key="userId"
            @click="$router.push(`/user/${userId}`)"
            :class="['btn', $router.params.id === userId ? 'btn-active' : '']"
          >
            User {{ userId }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3>How It Works</h3>
        <div class="code-block">
          <div class="code-line">// Route definition</div>
          <div class="code-line">{ path: '/user/:id', component: UserProfile }</div>
          <div class="code-line"></div>
          <div class="code-line">// URL: /user/123</div>
          <div class="code-line">// this.$router.params.id = "123"</div>
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
  name: 'UserProfile',
  data() {
    return {
      sampleUsers: ['123', '456', '789', '101', '202'],
      userDatabase: {
        '123': {
          name: 'Alice Johnson',
          role: 'Frontend Developer',
          status: 'Active',
          avatar: '👩‍💻'
        },
        '456': {
          name: 'Bob Smith',
          role: 'Backend Developer',
          status: 'Active',
          avatar: '👨‍💻'
        },
        '789': {
          name: 'Carol Martinez',
          role: 'UI/UX Designer',
          status: 'Active',
          avatar: '🎨'
        },
        '101': {
          name: 'David Wilson',
          role: 'DevOps Engineer',
          status: 'Active',
          avatar: '⚙️'
        },
        '202': {
          name: 'Eva Brown',
          role: 'Product Manager',
          status: 'Active',
          avatar: '📊'
        }
      }
    }
  },
  computed: {
    userInfo() {
      return this.userDatabase[this.$router.params.id] || {
        name: `User ${this.$router.params.id}`,
        role: 'Unknown',
        status: 'Guest',
        avatar: '👤'
      }
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.info-item {
  padding: 1rem;
  background: #f8fffe;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
}

.info-item strong {
  color: #2d5a3d;
  display: block;
  margin-bottom: 0.5rem;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fffe;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
  margin: 1rem 0;
}

.avatar {
  font-size: 3rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  border: 2px solid #4ade80;
}

.user-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2d5a3d;
  font-size: 1.3rem;
}

.user-info p {
  margin: 0.25rem 0;
  color: #666;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.btn-active {
  background: #22c55e !important;
  transform: translateY(-1px);
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
  .user-card {
    flex-direction: column;
    text-align: center;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style> 