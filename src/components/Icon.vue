<template>
    <el-icon :class="icon" :size="size"  class="svg-icon">
        <svg aria-hidden="true" v-if="isLocal" :color="color">
            <use :xlink:href="symbolId"  />
        </svg>
    </el-icon>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';

const props = defineProps({
    // icon name
    icon: {
        type: String,
        required: true,
    },
    // icon color
    color: {
        type: String,
        default: '#000'
    },
    // icon size
    size: {
        type: Number,
        default: 16
    }
})
// vite-plugin-svg-icons @purge-icons/generated https://github.com/unplugin/unplugin-icons
// 判断是否是本地图标
const isLocal = computed(() => props.icon.startsWith('svg-icon:'))
// 如果是本地图标拆分出 svg-icon: 后面的字段
const symbolId = computed(() => {
    return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})

</script>

<style scoped lang="scss">
.svg-icon{
    color: var(--base-icon-text-color);
}
</style>