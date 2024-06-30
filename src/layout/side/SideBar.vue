<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1');

</script>

<template>
    <div class="sider-bar-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="首页" name="1">
            </el-collapse-item>
            <el-collapse-item title="系统管理" name="2">
                <div>国际化配置</div>
                <div>日志</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped>
.sider-bar-container {
    :deep(.el-collapse) {
        border-top: var(--base-sidebar-header-background);
        border-bottom: var(--base-sidebar-header-background);
    }

    :deep(.el-collapse-item__header) {
        background-color: var(--base-sidebar-header-background);
        color: var(--base-sidebar-header-text-color);
        border-bottom: var(--base-sidebar-header-background);
    }

    :deep(.el-collapse-item__wrap) {
        background-color: var(--base-sidebar-background);
        border-bottom: var(--base-sidebar-background);

        .el-collapse-item__content {
            color: var(--base-sidebar-text-color);
        }
    }



}
</style>