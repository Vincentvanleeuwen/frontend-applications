import { createApp } from 'vue'

import App from './App.vue'
import router from './router'


// Create the app, use /router/index.js and mount element as #app
createApp(App).use(router).mount('#app')
