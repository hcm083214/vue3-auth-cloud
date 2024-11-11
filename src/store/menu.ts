import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ResourceResponse, getMenuListApi,ResourceTypeEnum,MenuResource } from '@/api/resource';
import { getTreesNodeByIds } from "@/utils/index";
export const menuDirectoryPermissionKey = {
    home:"button:home",
    system:"directory:system",
    authority:"directory:authority",
}
export const menuDirectoryTree:MenuResource[] = [
    {
        resourceId: "1",
        resourceName: "首页",
        parentId: "0",
        resourceType: ResourceTypeEnum.B,
        permissionKey:menuDirectoryPermissionKey.home,
        children:[] as MenuResource[],
    },
    {
        resourceId: "2",
        resourceName: "系统工具",
        parentId: "0",
        resourceType: ResourceTypeEnum.D,
        permissionKey:menuDirectoryPermissionKey.system,
        children:[] as MenuResource[],
    },
    {
        resourceId: "3",
        resourceName: "权限管理",
        parentId: "0",
        resourceType: ResourceTypeEnum.D,
        permissionKey:menuDirectoryPermissionKey.authority,
        children:[] as MenuResource[],
    },
]

export const useMenuStore = defineStore('menu', () => {
    const menus = ref<MenuResource[]>([]);
    
    let activeMenuId = ref<string>("1");
    const breadcrumbMenu = ref<MenuResource[]>([]);

    const setActiveMenuId = (menuId: string) => {
        activeMenuId.value = menuId;
    };
    const loadUserMenus = async (permission: string) => {
        // const result = await getMenuListApi();
        // if (result.data.length !== 0) {
        //     menus.value = result.data;
        // }
        permission.split(",").forEach(p=>{
            
        })
    };
    const setBreadcrumbMenus = (menuIds: string[]) => {
        breadcrumbMenu.value = getTreesNodeByIds(menus.value, [...menuIds, activeMenuId.value],"resourceId");
    };
    return { menus, activeMenuId, breadcrumbMenu, setActiveMenuId,  setBreadcrumbMenus, loadUserMenus };
});