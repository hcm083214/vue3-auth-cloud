<script setup lang="ts">
import { PropType } from "vue";

import { TableHeaderOption } from "./table";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    tableList: {
        type: Array,
        default: () => ([]),
    },
    tableHeaderConfig: {
        type: Object as PropType<TableHeaderOption[]>,
        default: () => ([{
            label: '',
            prop: '',
            width: 120,
        }])
    },
    customizeTableHeaderConfig: {
        type: Object as PropType<TableHeaderOption[]>,
        default: () => ([])
    }
})


</script>
<template>
    <el-table v-loading="props.isLoading" :data="props.tableList">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="rows.label" :prop="rows.prop" :width="rows.width"
            v-for="rows in props.tableHeaderConfig" :key="rows.label" />
        <el-table-column v-for="rows in props.customizeTableHeaderConfig" :key="rows.label" :label="rows.label"
            :prop="rows.prop">
            <template #default="scope">
                <slot :name="rows.prop" :scope="scope.row"></slot>
            </template>
        </el-table-column>
        <el-table-column :label="$t('common.operation')" align="center" class-name="small-padding fixed-width"
            fixed="right" min-width="120">
            <template #default="scope">
                <slot :scope="scope.row">
                    <el-button size="small" link type="primary">
                        <icon icon="svg-icon:edit" />{{ $t('common.edit') }}
                    </el-button>
                    <el-button size="small" link type="primary">
                        <icon icon="svg-icon:delete" />{{ $t('common.delete') }}
                    </el-button>
                </slot>
            </template>
        </el-table-column>
    </el-table>
</template>