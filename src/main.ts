import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import "./style.css";
import App from "./App.vue";

import "@/permission";

// !本地SVG图标 vite-plugin-svg-icons插件里面的虚拟模块
import "virtual:svg-icons-register";

createApp(App).use(router).use(createPinia()).mount("#app");
