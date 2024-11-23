import type { RouteComponent, RouteRecordRaw, RouteRecordName } from "vue-router";


export const USERPERMISSIONSTORAGE = "user_permission";
export const pagePermissionKey = {
    language: "page:system:language",
    log: "page:system:log",
    resource: "page:authority:resource"
}
export const menuDirectoryPermissionKey = {
    home: "button:home",
    system: "directory:system",
    authority: "directory:authority",
}
export interface RouteRecord {
    component: RouteComponent | Promise<RouteComponent>,
    path: string,
    name: string,
    redirect?: string | { name: string },
    meta: {
        title: string,
        permissionKey: typeof pagePermissionKey[keyof typeof pagePermissionKey],
        parentPermissionKey: typeof menuDirectoryPermissionKey[keyof typeof menuDirectoryPermissionKey],
        icon?: string,
        hidden?: boolean,
        keepAlive?: boolean,
    }
}

export const asyncRoutes: RouteRecord[] = [
    {
        path: 'language',
        name: 'language',
        component: () => import('@/views/system/language/I18n.vue'),
        meta: {
            title: '国际化工具',
            permissionKey: pagePermissionKey.language,
            parentPermissionKey: menuDirectoryPermissionKey.system
        }
    },
    {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log/Log.vue'),
        meta: {
            title: '国际化工具',
            permissionKey: pagePermissionKey.log,
            parentPermissionKey: menuDirectoryPermissionKey.system
        }
    },
    {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/authority/resource/Resource.vue'),
        meta: {
            title: '国际化工具',
            permissionKey: pagePermissionKey.resource,
            parentPermissionKey: menuDirectoryPermissionKey.authority
        }
    },
]
export function getRouteByPermissionKey(permissionKey:string) {
    return asyncRoutes.find(item => item.meta.permissionKey === permissionKey)
}