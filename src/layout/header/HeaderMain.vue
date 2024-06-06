<script lang="ts" setup>
const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
})
</script>

<template>
    <div class="header-container" :style="{ width: props.width }">
        <div class="breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <a href="/">promotion management</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<style scoped lang="scss">
.header-container {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 8px #f0f1f2;
}
</style>