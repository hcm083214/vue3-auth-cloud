import type { RouteComponent } from "vue-router";


export const USERPERMISSIONSTORAGE = "user_permission";
export const pagePermissionKey = {
    root: "root",
    index: "page:index",
    home: "page:home",
    login: "page:login",
    register: "page:register",
    language: "page:system:language",
    log: "page:system:log",
    resource: "page:authority:resource"
}
export const directoryPermissionKey = {
    null: "directory:null", // 不需要挂载到目录下
    root: "directory:root",
    home: "directory:home",
    systemMonitor: "directory:system",
    log: "directory:system:log",
    authority: "directory:authority",
}
export interface RouteRecordRaw {
    component: RouteComponent | Promise<RouteComponent>,
    path: string,
    name: string,
    redirect?: string | { name: string },
    meta: {
        title: string,
        permissionKey: string,
        parentPermissionKey: string,
        directoryPermissionKey: string,
        icon?: string,
        hidden?: boolean,
        keepAlive?: boolean,
    },
}

export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: 'language',
        name: 'language',
        component: () => import('@/views/system/language/I18n.vue'),
        meta: {
            title: '国际化',
            permissionKey: pagePermissionKey.language,
            parentPermissionKey:pagePermissionKey.index,
            directoryPermissionKey: directoryPermissionKey.systemMonitor
        }
    },
    {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log/Log.vue'),
        meta: {
            title: '登录日志',
            permissionKey: pagePermissionKey.log,
            parentPermissionKey:pagePermissionKey.index,
            directoryPermissionKey: directoryPermissionKey.log
        }
    },
    {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/authority/resource/Resource.vue'),
        meta: {
            title: '资源管理',
            permissionKey: pagePermissionKey.resource,
            parentPermissionKey:pagePermissionKey.index,
            directoryPermissionKey: directoryPermissionKey.authority
        }
    },
]
export function getRouteByPermissionKey(permissionKey: string) {
    return asyncRoutes.find(item => item.meta.permissionKey === permissionKey)
}