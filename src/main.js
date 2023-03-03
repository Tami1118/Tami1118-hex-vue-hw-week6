import { createApp } from 'vue'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import './assets/all.scss'

const app = createApp(App)

// Axios
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
