<script setup lang="ts">
import NavBar from '@/layout/header/NavBar.vue';
import SideBar from "@/layout/side/SideBar.vue";
</script>

<template>
    <div class="app-main">
        <div class="app-main-left">
            <div class="logo">
                <router-link to="/">权限管理系统</router-link>
            </div>
            <side-bar />
        </div>
        <div class="app-main-right">
            <nav-bar />
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss">
.app-main {
    width: 100%;
    height: 100%;
    display: flex;
    --sideBarWidth: 15%;

    .app-main-left {
        width: var(--sideBarWidth);
        background-color: var(--base-logo-background);

        .logo {
            width: 100%;
            height: var(--base-header-height);
            display: flex;
            align-items: center;
            justify-content: center;

            a {
                color: var(--base-logo-text-color);
            }
        }
    }

    .app-main-right {
        width: calc(1 - var(--sideBarWidth));
        flex-grow: 1;
    }
}
</style>