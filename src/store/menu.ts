import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ResourceTypeEnum, MenuResource } from '@/api/resource';
import { getTreesNodeByIds } from "@/utils/index";
import { getRouteByPermissionKey, RouteRecordRaw, directoryPermissionKey } from "@/router/asyncRoutes";

const directoryTree: MenuResource[] = [
    {
        resourceId: directoryPermissionKey.home,
        resourceName: "首页",
        parentId: directoryPermissionKey.root,
        resourceType: ResourceTypeEnum.B,
        permissionKey: directoryPermissionKey.home,
        routerPath: "",
        routerName: "",
        children: [] as MenuResource[],
    },
    {
        resourceId: directoryPermissionKey.systemMonitor,
        resourceName: "系统监控",
        parentId: directoryPermissionKey.root,
        resourceType: ResourceTypeEnum.D,
        permissionKey: directoryPermissionKey.systemMonitor,
        routerPath: "",
        routerName: "",
        children: [
            {
                resourceId: directoryPermissionKey.log,
                resourceName: "日志管理",
                parentId: directoryPermissionKey.systemMonitor,
                resourceType: ResourceTypeEnum.P,
                permissionKey: directoryPermissionKey.log,
                routerPath: "",
                routerName: "",
                children: [] as MenuResource[],
            }
        ],
    },
    {
        resourceId: directoryPermissionKey.authority,
        resourceName: "权限管理",
        parentId: directoryPermissionKey.root,
        resourceType: ResourceTypeEnum.D,
        permissionKey: directoryPermissionKey.authority,
        routerPath: "",
        routerName: "",
        children: [] as MenuResource[],
    },
]

export const useMenuStore = defineStore('menu', () => {
    const menus = ref(directoryTree);

    let activeMenuId = ref(directoryPermissionKey.home);
    const breadcrumbMenu = ref<MenuResource[]>([]);

    const setActiveMenuId = (menuId: string) => {
        activeMenuId.value = menuId;
    };
    const addMenuByDirectoryPermissionKey = (routeRecord: RouteRecordRaw) => {
        const directoryPermissionKey = routeRecord.meta.directoryPermissionKey;
        function _addMenu(directoryPermissionKey: string, directoryTree: MenuResource[]) {
            if (directoryPermissionKey && directoryTree.length > 0) {
                directoryTree.forEach(item => {
                    if (item.permissionKey === directoryPermissionKey) {
                        item.children.push({
                            resourceId: routeRecord.meta.permissionKey,
                            resourceName: routeRecord.meta.title,
                            parentId: directoryPermissionKey,
                            resourceType: ResourceTypeEnum.P,
                            permissionKey: routeRecord.meta.permissionKey,
                            routerPath: routeRecord.path,
                            routerName: routeRecord.name,
                            children: [] as MenuResource[],
                        })
                    }else{
                        _addMenu(directoryPermissionKey, item.children);
                    }
                })
            }
        }
        _addMenu(directoryPermissionKey,menus.value)
    }
    const loadUserMenus = async (permissions: string[]) => {
        permissions.forEach(p => {
            const router = getRouteByPermissionKey(p);
            router && addMenuByDirectoryPermissionKey(router);
        })
        console.log("menus",menus.value)
    };
    const setBreadcrumbMenus = (menuIds: string[]) => {
        breadcrumbMenu.value = getTreesNodeByIds(menus.value, [...menuIds, activeMenuId.value], "resourceId");
    };
    return { menus, activeMenuId, breadcrumbMenu, setActiveMenuId, setBreadcrumbMenus, loadUserMenus };
});