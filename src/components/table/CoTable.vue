<script setup lang="ts">
import { PropType } from "vue";

import { TableHeaderOption, TableOperationOption } from "./table";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    tableData: {
        type: Array,
        default: () => ([]),
    },
    tableColumnProps: {
        type: Object as PropType<TableHeaderOption[]>,
        default: () => ([{
            label: '',
            prop: '',
            width: 120,
        }])
    },
    customizeTableColumnProps: {
        type: Object as PropType<TableHeaderOption[]>,
        default: () => ([])
    }
})
const emit = defineEmits(['tableHandler']);
const tableHandler = (mode: TableOperationOption, rawData: any) => {
    emit('tableHandler', {mode, rawData});
}
</script>
<template>
    <el-table v-loading="props.isLoading" :data="props.tableData">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="rows.label" :prop="rows.prop" :width="rows.width"
            v-for="rows in props.tableColumnProps" :key="rows.label" />
        <el-table-column v-for="rows in props.customizeTableColumnProps" :key="rows.label" :label="rows.label"
            :prop="rows.prop" :width="rows.width">
            <template #default="scope">
                <slot :name="rows.prop" :scope="scope.row"></slot>
            </template>
        </el-table-column>
        <el-table-column :label="$t('common.operation')" align="center" class-name="small-padding fixed-width"
            fixed="right" min-width="120">
            <template #default="scope">
                <slot :tableData="scope.row">
                    <el-button size="small" link type="primary" 
                    @click="tableHandler('Edit',scope.row)">
                        <icon icon="svg-icon:edit" />{{ $t('common.edit') }}
                    </el-button>
                    <el-button size="small" link type="primary"
                    @click="tableHandler('Delete',scope.row)">
                        <icon icon="svg-icon:delete" />{{ $t('common.delete') }}
                    </el-button>
                </slot>
            </template>
        </el-table-column>
    </el-table>
</template>