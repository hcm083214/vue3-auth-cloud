import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ResourceResponse, getMenuListApi, ResourceTypeEnum, MenuResource } from '@/api/resource';
import { getTreesNodeByIds } from "@/utils/index";
import { getRouteByPermissionKey, RouteRecord,menuDirectoryPermissionKey } from "@/router/asyncRoutes";

const menuDirectoryTree: MenuResource[] = [
    {
        resourceId: menuDirectoryPermissionKey.home,
        resourceName: "首页",
        parentId: "0",
        resourceType: ResourceTypeEnum.B,
        permissionKey: menuDirectoryPermissionKey.home,
        routerPath: "",
        routerName: "",
        children: [] as MenuResource[],
    },
    {
        resourceId: menuDirectoryPermissionKey.system,
        resourceName: "系统工具",
        parentId: "0",
        resourceType: ResourceTypeEnum.D,
        permissionKey: menuDirectoryPermissionKey.system,
        routerPath: "",
        routerName: "",
        children: [] as MenuResource[],
    },
    {
        resourceId: menuDirectoryPermissionKey.authority,
        resourceName: "权限管理",
        parentId: "0",
        resourceType: ResourceTypeEnum.D,
        permissionKey: menuDirectoryPermissionKey.authority,
        routerPath: "",
        routerName: "",
        children: [] as MenuResource[],
    },
]
function addMenuByDirectoryPermissionKey(routeRecord: RouteRecord) {
    const parentPermissionKey = routeRecord.meta.parentPermissionKey;
    if (parentPermissionKey) {
        menuDirectoryTree.forEach(item => {
            if (item.permissionKey === parentPermissionKey) {
                item.children.push({
                    resourceId: routeRecord.meta.permissionKey,
                    resourceName: routeRecord.meta.title,
                    parentId: routeRecord.meta.parentPermissionKey,
                    resourceType: ResourceTypeEnum.P,
                    permissionKey: routeRecord.meta.parentPermissionKey,
                    routerPath: routeRecord.path,
                    routerName: routeRecord.name,
                    children: [] as MenuResource[],
                })
            }
        })
    }
}
export const useMenuStore = defineStore('menu', () => {
    const menus = ref(menuDirectoryTree);

    let activeMenuId = ref(menuDirectoryPermissionKey.home);
    const breadcrumbMenu = ref<MenuResource[]>([]);

    const setActiveMenuId = (menuId: string) => {
        activeMenuId.value = menuId;
    };
    const loadUserMenus = async (permission: string) => {
        // const result = await getMenuListApi();
        // if (result.data.length !== 0) {
        //     menus.value = result.data;
        // }
        permission.split(",").forEach(p => {
            const router = getRouteByPermissionKey(p);
            router && addMenuByDirectoryPermissionKey(router);
        })
    };
    const setBreadcrumbMenus = (menuIds: string[]) => {
        breadcrumbMenu.value = getTreesNodeByIds(menus.value, [...menuIds, activeMenuId.value], "resourceId");
    };
    return { menus, activeMenuId, breadcrumbMenu, setActiveMenuId, setBreadcrumbMenus, loadUserMenus };
});