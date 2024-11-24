<template>
    home<br />
    <router-link :to="{ name: 'login' }" v-for="route in routes" :key="route.name">
        {{ route.meta.title }}<br />
    </router-link>

</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const routes = ref(router.getRoutes());          
</script>