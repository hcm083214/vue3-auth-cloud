import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ResourceResponse, getMenuListApi } from '@/api/resource';
import { getTreesNodeByIds } from "@/utils/index";

export const useMenuStore = defineStore('menu', () => {
    const menus = ref<ResourceResponse[]>([]);
    let activeMenuId = ref<string>("1");
    const breadcrumbMenu = ref<ResourceResponse[]>([]);

    const setActiveMenuId = (menuId: string) => {
        activeMenuId.value = menuId;
    };
    const loadUserMenus = async () => {
        const result = await getMenuListApi();
        if (result.data.length !== 0) {
            menus.value = result.data;
        }
    };
    const setBreadcrumbMenus = (menuIds: string[]) => {
        breadcrumbMenu.value = getTreesNodeByIds(menus.value, [...menuIds, activeMenuId.value],"resourceId");
    };
    return { menus, activeMenuId, breadcrumbMenu, setActiveMenuId,  setBreadcrumbMenus, loadUserMenus };
});