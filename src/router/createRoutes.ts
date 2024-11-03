const router = [
    {
        resourceId: 1,
        resourceName: "首页",
        resourcePath: "/home",
        resourceType: "M",
        routerName: "home",
        permissionKey: "home",
        parentId: 0,
        children: []
    },
    {
        resourceId: 2,
        resourceName: "系统工具",
        resourcePath: "",
        resourceType: "D",
        routerName: "",
        parentId: 0,
        children: [
            {
                resourceId: 3,
                resourceName: "国际化工具",
                resourcePath: "/system/language",
                resourceType: "D",
                parentId: 2,
                children: [
                    {
                        resourceId: 4,
                        resourceName: "国际化新增",
                        resourcePath: "/system/language",
                        resourceType: "M",
                        routerName: "language",
                        permissionKey: "language",
                        parentId: 3,
                        children: []
                    },
                ]
            },
            {
                resourceId: 6,
                resourceName: "日志管理",
                resourcePath: "",
                resourceType: "D",
                routerName: "log",
                parentId: 2,
                children: [
                    {
                        resourceId: 7,
                        resourceName: "日志修改",
                        resourcePath: "/system/log",
                        resourceType: "M",
                        routerName: "log",
                        permissionKey: "log",
                        parentId: 6,
                        children: []
                    },
                ]
            },
        ]
    }
];
import type { RouteComponent, RouteRecordRaw, RouteRecordName } from "vue-router";
const directory = {
    system:"系统工具",
    authority:"权限管理",
}
export interface RouteRecord {
    component: RouteComponent | Promise<RouteComponent>,
    path: string,
    name: string,
    redirect?: string | { name: string },
    meta: {
        title: string,
        permission: string,
        directory: keyof typeof directory,
        icon?: string,
        hidden?: boolean,
        keepAlive?: boolean,
    }
}
export const asyncRoutes :RouteRecord[]= [
    {
        path: 'language',
        name: 'language',
        component: () => import('@/views/system/language/I18n.vue'),
        meta: {
            title: '国际化工具',
            permission: 'page:system:language',
            directory:'system'
        }
    },
    {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log/Log.vue'),
        meta: {
            title: '国际化工具',
            permission: 'page:system:log',
            directory:'system'
        }
    },
    {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/authority/resource/Resource.vue'),
        meta: {
            title: '国际化工具',
            permission: 'page:authority:resource',
            directory:'authority'
        }
    },
]