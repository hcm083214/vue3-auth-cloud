<script lang="ts" setup>
import IconReadMore from '~icons/material-symbols/read-more';
import IconSearch from '~icons/material-symbols/search';
import IconGithub from '~icons/mdi/github';
import IconQuestion from '~icons/ph/question';
import IconExpand from '~icons/bx/expand';
import IconTextSize from '~icons/uil/text-size';
import IconArrowDown from '~icons/dashicons/arrow-down';

import { storeToRefs } from 'pinia';

import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore();
const { activeMenuId, breadcrumbMenu } = storeToRefs(menuStore);

</script>

<template>
    <div class="header-container">
        <div class="header-left">
            <div class="expand">
                <icon-read-more />
            </div>
            <div class="breadcrumb-container">
                <el-breadcrumb separator="/">
                    <template v-for="menu in breadcrumbMenu">
                        <el-breadcrumb-item :class="{ 'active-menu': activeMenuId === menu.resourceId }"
                            v-if="menu.resourceType === 'M'" :to="{ path: menu.resourcePath }">
                            {{ menu.resourceName  }}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item v-else>{{ menu.resourceName }}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>
        </div>
        <div class="header-right">
            <icon-search />
            <icon-github />
            <icon-question />
            <icon-expand />
            <icon-text-size />
            <icon-arrow-down />
        </div>
    </div>
</template>
<style scoped lang="scss">
.header-container {
    height: var(--base-header-height);
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 8px #f0f1f2;
    box-sizing: border-box;
    justify-content: space-between;
    width: 100%;

    .header-left {
        display: flex;
        align-items: center;

        .active-menu {
            --el-text-color-regular : #ffd04b;
            color: var(--base-sidebar-active-color);
        }

        .expand {
            display: flex;
            align-items: center;
            margin: 0 5px;
            cursor: pointer;
        }
    }

    .header-right {
        display: flex;
        align-items: center;
    }
}
</style>