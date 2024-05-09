<template>
    <div class="pagination">
        <span class="size">共{{ total }}条</span>
        <el-select v-model="pageSizeInside" class="m-2 pagination-select" placeholder="Select">
            <el-option v-for="(item, index) in props.sizeSelection" :key="index" :label="item + '条/页'" :value="item" />
        </el-select>
        <el-pagination v-model:current-page="currentPageInside" v-model:page-size="pageSizeInside" :background="true"
            layout="prev, pager, next" :total="total" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
    total: Number,
    size: Number,
    current: Number,
    sizeSelection: {
        type: Array,
        default: [10, 20, 50, 100, 200]
    }
});
const pageSizeInside = ref(props.size);
const currentPageInside = ref(props.current);
const emit = defineEmits(['sizeChange', 'currentPageChange'])
watch(currentPageInside, (currentPage) => {
    emit("currentPageChange", currentPage);
});
watch(pageSizeInside, (pageSize) => {
    emit("sizeChange", pageSize);
})
</script>

<style scoped lang="scss">
.pagination {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .pagination-size {
        margin-left: 10px;
        width: 80px;
    }

    .size {
        margin-right: 10px;
    }

    .pagination-select {
        margin-right: 10px;
        width: 100px;
        height: 30px;
    }
}
</style>