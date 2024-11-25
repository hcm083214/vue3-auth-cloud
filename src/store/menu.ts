import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ResourceTypeEnum, MenuResource } from '@/api/resource';
import { getTreesNodeByIds } from "@/utils/index";
import { getRouteByPermissionKey, RouteRecordRaw, directoryPermissionKey } from "@/router/asyncRoutes";

const directoryTree: MenuResource[] = [
    {
        resourceName: "首页",
        parentPermissionKey: directoryPermissionKey.root,
        resourceType: ResourceTypeEnum.P,
        permissionKey: directoryPermissionKey.home,
        routerPath: "/",
        routerName: "home",
        children: [] as MenuResource[],
    },
    {
        resourceName: "系统监控",
        parentPermissionKey: directoryPermissionKey.root,
        resourceType: ResourceTypeEnum.D,
        permissionKey: directoryPermissionKey.systemMonitor,
        routerPath: "",
        routerName: "",
        children: [
            {
                resourceName: "日志管理",
                parentPermissionKey: directoryPermissionKey.systemMonitor,
                resourceType: ResourceTypeEnum.P,
                permissionKey: directoryPermissionKey.log,
                routerPath: "",
                routerName: "",
                children: [] as MenuResource[],
            }
        ],
    },
    {
        resourceName: "权限管理",
        parentPermissionKey: directoryPermissionKey.root,
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
            resourceName: routeRecord.meta.title,
            parentPermissionKey: routeRecord.meta.directoryPermissionKey,
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
    const deleteEmptyMenu = () => {
        for (let i = menus.value.length - 1; i >= 0; i--) {
            if (menus.value[i].children.length === 0 &&
                menus.value[i].resourceType === ResourceTypeEnum.D
            ) {
                menus.value.splice(i, 1);
            }
        }
    }
    const loadUserMenus = async (addPermissions: string[]) => {
        // TODOs: get menu list from server
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