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
        resourceType: ResourceTypeEnum.P,
        permissionKey: directoryPermissionKey.home,
        routerPath: "/",
        routerName: "home",
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
    const addMenu = (directory: MenuResource, routeRecord: RouteRecordRaw) => {
        directory.children.push({
            resourceId: routeRecord.meta.permissionKey,
            resourceName: routeRecord.meta.title,
            parentId: routeRecord.meta.directoryPermissionKey,
            resourceType: ResourceTypeEnum.P,
            permissionKey: routeRecord.meta.permissionKey,
            routerPath: routeRecord.path,
            routerName: routeRecord.name,
            children: [] as MenuResource[],
        });
    }

    const updateMenuByDirectoryPermissionKey = (routeRecord: RouteRecordRaw) => {
        const directoryPermissionKey = routeRecord.meta.directoryPermissionKey;
        function _updateMenu(directoryPermissionKey: string, directoryTree: MenuResource[]) {
            if (directoryPermissionKey && directoryTree.length > 0) {
                directoryTree.forEach(item => {
                    if (item.permissionKey === directoryPermissionKey) {
                        addMenu(item, routeRecord);
                    } else {
                        _updateMenu(directoryPermissionKey, item.children);
                    }
                })
            }
        }
        _updateMenu(directoryPermissionKey, menus.value);
    }
    const loadUserMenus = async (addPermissions: string[]) => {
        addPermissions.forEach(p => {
            const router = getRouteByPermissionKey(p);
            router && updateMenuByDirectoryPermissionKey(router);
        })
    };
    const setBreadcrumbMenus = (menuIds: string[]) => {
        breadcrumbMenu.value = getTreesNodeByIds(menus.value, [...menuIds, activeMenuId.value], "resourceId");
    };
    return { menus, activeMenuId, breadcrumbMenu, setActiveMenuId, setBreadcrumbMenus, loadUserMenus };
});