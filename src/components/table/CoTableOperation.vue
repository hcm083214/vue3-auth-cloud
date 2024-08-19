<script setup lang="ts">
import { h, defineComponent, PropType, onMounted, computed } from "vue";
import { ElRow, ElCol, ElButton } from 'element-plus'

import { TableOperation,tableOperationMap } from "./table";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";


const props = defineProps({
    tableOperation: {
        type: Array as PropType<TableOperation[]>,
        default: () => []
    }
})
const emit = defineEmits<{
    (e: 'tableOperationHandler', operation: TableOperation): void
}>();
const tableOperationHandler = (operation: TableOperation) => {
    emit("tableOperationHandler", operation);
};

const tableOperationMapWithSelection = computed(() => {
    return props.tableOperation.map(operation => tableOperationMap[operation])
})
</script>
<template>
    <el-row :gutter="10">
        <el-col :span="1.5" v-for="tableOperation in tableOperationMapWithSelection" :key="tableOperation.operation">
            <el-button :type="tableOperation.type" 
                @click="tableOperationHandler(tableOperation.operation)">
                <icon :icon="tableOperation.icon" color="#fff"/> {{ $t(tableOperation.label) }}
            </el-button>
        </el-col>
    </el-row>
</template>