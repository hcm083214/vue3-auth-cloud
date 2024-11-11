import { createRouter, createWebHistory } from "vue-router";
import type { RouteComponent, RouteRecordRaw, RouteRecordName } from "vue-router";
import NProgress from 'nprogress';

import { loadLanguageAsync, getLocale, support_locales } from "@/utils/i18n"
import { useMenuStore } from "@/store/menu";
import Layout from "@/layout/Layout.vue";




const constantRoutes = [
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
            }
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
    // TODOS：根据用户的permission匹配路由，将路由加入到菜单目录中
    await loadUserMenus(localStorage.getItem('permission') as string);
    next();
});
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
});

export function addRoutes(parentName: RouteRecordName, routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
        if (route.children && route.children.length > 0) {
            if (route.name) {
                addRoutes(route.name, route.children);
            } else {
                console.warn(`Route with path "${route.path}" has no name and will not be added to the router.`);
            }
        } else {
            router.addRoute(parentName, route)
        }
    });
}

export const REDIRECT_KEY = "REDIREC";
export default router;