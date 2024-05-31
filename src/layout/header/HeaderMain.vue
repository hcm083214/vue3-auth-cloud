<script lang="ts" setup>
const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
})
</script>

<template>
    <div class="header-container" :style="{ width: props.width }"></div>
</template>
<style scoped lang="scss">
.header-container {
    height: 50px;
    background-color: #fff;
}
</style>