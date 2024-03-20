<template>
    <div>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain @click="handleAdd">
                    <icon icon="svg-icon:add" />
                    {{ $t('common.add') }}
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain @click="handleExport">
                    <icon icon="svg-icon:export" />
                    {{ $t('common.export') }}
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain @click="handleExport('template')">
                    <icon icon="svg-icon:export" />
                    {{ $t('common.importTemplate') }}
                </el-button>
            </el-col>

            <el-col :span="1.5">
                <el-upload v-model:file-list="fileList" class="upload-demo" method="post" :on-success="handleUploadSuccess"
                    :on-error="handleUploadError" :show-file-list="false" :action="uploadRequestConfig.uploadUrl"
                    :headers="uploadRequestConfig.headers">
                    <el-button type="success" plain>
                        <icon icon="svg-icon:import" />
                        {{ $t('common.import') }}
                    </el-button>
                </el-upload>
            </el-col>
        </el-row>
        <el-table v-loading="props.isLoading" :data="props.tableList">
            <el-table-column type="selection" width="55" align="center" />
            <template v-for="rows in props.tableHeaderConfig" :key="rows.label">

                <el-table-column :label="rows.label" align="center" :width="rows.width" v-if="rows.label == $t('common.status')">
                    <template #default="scope">
                        <el-switch active-value="1" inactive-value="0" v-model="scope.row.status"
                            @change="handleEdit(scope.row, true)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column :label="rows.label" align="center" :width="rows.width" v-else-if="rows.label === $t('permission.functionList')">
                    <template #default="scope">
                        <span>{{ getFunctionListString(scope.row) }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="rows.label" align="center" prop="createTime" :width="rows.width"
                    v-else-if="rows.label === $t('common.createTime')">
                    <template #default="scope">
                        <span>{{ dataFormat(scope.row.createTime, "YYYY/MM/DD HH:mm:ss") }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="rows.label" :prop="rows.prop" :width="rows.width" v-else />
            </template>
            <el-table-column :label="$t('common.operation')" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
                <template #default="scope">
                    <el-button size="small" link type="primary" @click="handleEdit(scope.row)">
                        <icon icon="svg-icon:edit" />{{ $t('common.edit') }}
                    </el-button>
                    <el-button size="small" link type="primary">
                        <icon icon="svg-icon:delete" />{{ $t('common.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadUserFile, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus';

import { dataFormat } from "@/utils/index";
import Icon from "@/components/Icon.vue";
import { FunctionList, RoleList } from "@/api/types";
import { TableOperation } from "@/components/CommonTable";
import { $t } from "@/utils/i18n";

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    tableList: {
        type: Array,
        default: [],
    },
    tableHeaderConfig: {
        default: () => ([{
            label: '',
            prop: '',
            width: 120,
        }])
    },
    // 提供给upload组件的请求配置
    uploadRequestConfig: {
        type: Object,
        default: () => ({
            uploadUrl: '',
            headers: {
                Authorization: ''
            }
        })
    }
})
const fileList = ref<UploadUserFile[]>();
const emit = defineEmits(["handleEvent"])
const handleAdd = () => {
    emit("handleEvent", { mode: TableOperation.Add })
}
const handleExport = (exportType: 'template' | undefined) => {
    emit("handleEvent", {
        mode: TableOperation.Export,
        option: {
            exportType
        }
    })
}
const getFunctionListString = (role: RoleList) => {
    if (!!role.functionList) {
        return role.functionList.reduce((prev: string, next: FunctionList, index: number) => index == 0 ? prev + next.functionKey : prev + ',' + next.functionKey, "")
    } else {
        return ''
    }
}
const handleUploadSuccess = (response: any) => {
    if (response.code === 200) {
        ElMessage({
            type: 'success',
            message: response.msg
        })
    } else {
        ElMessage({
            type: 'error',
            message: response.msg
        })
    }
}
const handleUploadError = (error: Error) => {
    ElMessage({
        type: 'error',
        message: $t('common.operationFail')
    })
}

const handleEdit = (row: any, isEditStatus = false) => {
    emit("handleEvent", {
        mode: TableOperation.Edit,
        option: {
            rowData: row,
            isEditStatus
        }
    })
}
</script>

<style scoped lang="scss"></style>