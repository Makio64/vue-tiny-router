# Vue Tiny Router Example

This is a comprehensive example demonstrating all features of vue-tiny-router.

## Features Demonstrated

- ✅ **Basic Navigation** - Standard route navigation
- ✅ **Route Parameters** - Dynamic route segments (`/user/:id`)
- ✅ **Route Guards** - `beforeRouteLeave` guard implementation
- ✅ **Redirects** - URL redirects (try `/home` → `/`)
- ✅ **Memory Mode** - Routing without affecting browser history
- ✅ **Anchor Links** - Smooth scrolling to page sections
- ✅ **Programmatic Navigation** - Using `$router.push()`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Example Structure

```
example/
├── src/
│   ├── components/
│   │   ├── Home.vue           # Main demo page with anchor links
│   │   ├── About.vue          # About page with feature comparison
│   │   ├── UserProfile.vue    # Route parameters demo
│   │   ├── Protected.vue      # Route guards demo
│   │   ├── MemoryPage.vue     # Memory mode explanation
│   │   ├── MemoryHome.vue     # Memory router home
│   │   └── MemoryAbout.vue    # Memory router about
│   ├── App.vue                # Main app with router configuration
│   └── main.js                # App entry point
├── package.json
└── vite.config.js
```

## Key Code Examples

### Router Setup
```javascript
import { TinyRouterInstall } from 'vue-tiny-router'
app.use(TinyRouterInstall)
```

### Route Configuration
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: UserProfile },
  { path: '/protected', component: Protected }
]
```

### Navigation
```javascript
// Programmatic navigation
this.$router.push('/user/123')

// Access route parameters
console.log(this.$router.params.id)
```

### Route Guards
```javascript
// In your component
beforeRouteLeave(next) {
  if (this.allowLeave) {
    next() // Allow navigation
  } else {
    // Block navigation
  }
}
```

## Try These Features

1. **Navigate** using the header links
2. **Test route parameters** by visiting different user profiles
3. **Try route guards** on the protected page
4. **Test redirects** by visiting `/home` or `/profile`
5. **Experience anchor links** by clicking the anchor navigation on the home page
6. **Explore memory mode** to see routing without URL changes

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. 