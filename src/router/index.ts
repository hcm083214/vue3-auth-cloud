import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordName } from "vue-router";
import NProgress from 'nprogress';

import { loadLanguageAsync, getLocale, support_locales } from "@/utils/i18n"
import { useMenuStore } from "@/store/menu";
import Layout from "@/layout/Layout.vue";
import { USERPERMISSIONSTORAGE, getRouteByPermissionKey, pagePermissionKey, directoryPermissionKey } from "@/router/asyncRoutes";
import type { RouteRecordRaw } from "@/router/asyncRoutes";

interface RouteRecord extends RouteRecordRaw {
    children: RouteRecord[];
}

const constantRoutes: RouteRecord[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
            title: '登录',
            permissionKey: pagePermissionKey.login,
            parentPermissionKey: pagePermissionKey.root,
            directoryPermissionKey: directoryPermissionKey.null,
        },
        children: [],
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
            title: '注册',
            permissionKey: pagePermissionKey.register,
            parentPermissionKey: pagePermissionKey.root,
            directoryPermissionKey: directoryPermissionKey.null,
        },
        children: [],
    },
    {
        path: "/",
        redirect: { name: 'home' },
        name: 'index',
        component: Layout,
        meta: {
            title: '首页',
            permissionKey: pagePermissionKey.index,
            parentPermissionKey: pagePermissionKey.root,
            directoryPermissionKey: directoryPermissionKey.null,
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页',
                    permissionKey: pagePermissionKey.home,
                    parentPermissionKey: pagePermissionKey.index,
                    directoryPermissionKey: directoryPermissionKey.null,
                },
                children: [],
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('@/views/authority/role/Role.vue'),
                meta: {
                    title: '角色',
                    permissionKey: pagePermissionKey.home,
                    parentPermissionKey: pagePermissionKey.index,
                    directoryPermissionKey: directoryPermissionKey.null,
                },
                children: [],
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
    const permissions = getUpdatePermissions();
    console.log("permissions", permissions)

    loadRouter(permissions);
    await loadLanguageAsync(getLocale());
    await loadUserMenus(permissions);

    next();
});
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
});

function getUpdatePermissions() {
    const permissions = localStorage.getItem(USERPERMISSIONSTORAGE) || "";
    const routes = router.getRoutes();
    console.log("routes", routes)
    return permissions.split(",").filter(p =>
        !routes.some(route => route.meta.permissionKey === p)
    )
}
function loadRouter(updateRoutes: string[]) {
    updateRoutes.length > 0 && updateRoutes.forEach(p => {
        const route = getRouteByPermissionKey(p);
        if (route) {
            let parentName: RouteRecordName = "";
            if (route.meta.parentPermissionKey === pagePermissionKey.index) {
                parentName = "home"
            } else {
                const parentRoute = getRouteByPermissionKey(p);
                parentName = parentRoute?.name || "";
            }
            console.log("Adding route:", route, "to parent:", parentName);
            router.addRoute(parentName, route as RouteRecord);
            console.log("Current routes:", router.getRoutes());
        }
    });
}

export const REDIRECT_KEY = "REDIREC";
export default router;