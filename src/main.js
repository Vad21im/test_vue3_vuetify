/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from './router';
import { createRouter } from 'vue-router';
import { createPinia } from 'pinia';
// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia();

registerPlugins(app)
app.use(pinia);
app.use(router)
app.mount('#app')
