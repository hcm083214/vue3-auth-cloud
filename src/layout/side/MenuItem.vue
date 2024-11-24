<script lang="ts" setup>
import { MenuResource } from '@/api/resource'
import { PropType } from 'vue';
const menus = defineProps({
    menus: {
        type: Object as PropType<MenuResource>,
        default: () => ({})
    }
})
</script>

<template>
    <template v-for="menu in menus" :key="menu.resourceId">
        <router-link :to="{ name: menu.routerName }" v-if="menu.children.length == 0">
            <el-menu-item :index="menu.resourceId">
                {{ menu.resourceName }}
                <!-- {{ menu.resourceName }} -->
            </el-menu-item>
        </router-link>
        <el-sub-menu v-else :index="menu.resourceId">
            <template #title>{{ menu.resourceName }}</template>
            <menu-item :menus="subMenu" v-for="subMenu in menu.children" :key="subMenu.resourceId" />
        </el-sub-menu>
    </template>
</template>