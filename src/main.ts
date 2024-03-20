import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'

import router from "@/router/index";
import "@/index.css"
import "@/style.scss"
import i18n from "@/utils/i18n";
import App from './App.vue'

createApp(App)
    .use(router)
    .use(i18n)
    .use(ElementPlus)
    .mount('#app')
