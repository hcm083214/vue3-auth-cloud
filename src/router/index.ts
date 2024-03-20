import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';

import { loadLanguageAsync, getLocale, support_locales } from "@/utils/i18n"

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
        path: '/i18n',
        name: 'i18n',
        component: () => import('@/views/i18n/I18n.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    await loadLanguageAsync(getLocale() as support_locales);
    next();
});
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
});

export const REDIRECT_KEY = "REDIREC";
export default router;