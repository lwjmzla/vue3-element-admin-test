import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// !本地SVG图标 vite-plugin-svg-icons插件里面的虚拟模块
import "virtual:svg-icons-register";

createApp(App).mount('#app')
