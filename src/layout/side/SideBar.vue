<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/store/menu'
import MenuItem from "./MenuItem.vue"


const menuStore = useMenuStore();
const { menus, activeMenuId } = storeToRefs(menuStore);

const activeMenuIndex = ref(activeMenuId)
const handleMenuSelect = (key: string, keyPath: string[]) => {
    menuStore.setActiveMenuId(key);
    menuStore.setBreadcrumbMenus(keyPath);
}
</script>

<template>
    <div class="side-bar-container">
        <el-menu :default-active="activeMenuIndex" @select="handleMenuSelect" class="el-menu-container">
            <menu-item :menus="menu" v-for="menu in menus" :key="menu.resourceId"></menu-item>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.side-bar-container {
    width: 100%;
    --el-menu-text-color: var(--base-sidebar-text-color);
    --el-menu-hover-text-color: var(--base-sidebar-hover-text-color);
    --el-menu-bg-color: var(--base-sidebar-background);
    --el-menu-hover-bg-color: var(--base-sidebar-hover-background);
    --el-menu-active-color: var(--base-sidebar-active-color);
}
</style>