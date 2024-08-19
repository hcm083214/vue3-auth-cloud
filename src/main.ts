import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import 'virtual:svg-icons-register'
import { createPinia } from 'pinia'

import router from "@/router/index";

import "@/index.css";
import "@/style.scss";
import i18n from "@/utils/i18n";
import App from './App.vue'
import "@/api/mock/index";

createApp(App)
    .use(router)
    .use(i18n)
    .use(ElementPlus)
    .use(createPinia())
    .mount('#app')
