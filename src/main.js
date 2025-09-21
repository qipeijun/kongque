import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { loadDirectives } from '@/plugins/directives'
import { createPinia } from 'pinia'
// import 'github-markdown-css/github-markdown-light.css'


const app = createApp(App)

app.use(router)

// 加载 自定义指令
loadDirectives(app)

// 加载 antd
app.use(Antd)

// 注册 pinia
const pinia = createPinia()
app.use(pinia)

// 聊天记录持久化恢复
import { useChatStore } from '@/store/index.js'
const chatStore = useChatStore()
chatStore.loadMessagesFromCache()

// 挂载
app.mount('#app')
