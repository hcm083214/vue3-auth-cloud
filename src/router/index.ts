import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';

import { loadLanguageAsync, getLocale, support_locales } from "@/utils/i18n"
import { useMenuStore } from "@/store/menu";
import Layout from "@/layout/Layout.vue";

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
    },
    {
        path: "/",
        redirect: { name: 'home' },
        name: 'index',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: { title: '首页' }
            },
        ]
    },
    {
        path: "/system",
        component: Layout,
        name: 'system',
        children: [
            {
                path: 'language',
                name: 'language',
                component: () => import('@/views/system/language/I18n.vue'),
            },
            {
                path: 'log',
                name: 'log',
                component: () => import('@/views/system/log/Log.vue'),
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const menuStore = useMenuStore();
    const loadUserMenus = menuStore.loadUserMenus;

    await loadLanguageAsync(getLocale());
    await loadUserMenus();
    next();
});
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
});

export const REDIRECT_KEY = "REDIREC";
export default router;