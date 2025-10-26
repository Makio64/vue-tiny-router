import { createApp } from 'vue'
import { TinyRouterInstall } from 'vue-tiny-router'

import App from './App.vue'

const app = createApp( App )

// Install TinyRouter globally
app.use( TinyRouterInstall )

app.mount( '#app' ) 