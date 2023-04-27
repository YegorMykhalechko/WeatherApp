import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vSelect from 'vue-select'

import Notifications from '@kyvg/vue3-notification'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.component('v-select', vSelect)

app.mount('#app')
