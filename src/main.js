import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

import App from './App.vue'
import './Assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'
import './theme-witcher.css'

const app = createApp(App)
 app.config.devtools = false;

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
