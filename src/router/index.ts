import { createRouter, createWebHistory } from "vue-router";
import type { RouteComponent } from "vue-router";
import NProgress from 'nprogress';

import { loadLanguageAsync, getLocale, support_locales } from "@/utils/i18n"
import { useMenuStore } from "@/store/menu";
import Layout from "@/layout/Layout.vue";
import { Resource } from "@/api/resource";

export interface Menus  {
    component: RouteComponent | Promise<RouteComponent>,
    path: string,
    name?: string,
    redirect?: string | { name: string },
    meta: {
        title: string,
        icon?: string,
        hidden?: boolean,
        keepAlive?: boolean,
        activeMenu?: string,
        breadcrumb?: boolean,
        roles?: string[],
    }
    children?: Menus[]
}

const constantRoutes= [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { title: '登录' },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { title: '注册' },
    },
    {
        path: "/",
        redirect: { name: 'home' },
        name: 'index',
        component: Layout,
        meta: { title: '首页' },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: { title: '首页' },
            },
        ]
    }
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