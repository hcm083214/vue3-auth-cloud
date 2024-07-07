<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex2 = ref('1')

</script>

<template>
    <div class="side-bar-container">
        <el-menu :default-active="activeIndex2" class="el-menu-container">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
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