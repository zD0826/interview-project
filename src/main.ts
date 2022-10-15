import { createApp } from 'vue'
import App from '@/App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'uno.css'

import './style.css'

import { router } from '@/router'

if (import.meta.env.DEV) {
  const { worker } = await import('@/mocks/browser')
  worker.start()
}

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
