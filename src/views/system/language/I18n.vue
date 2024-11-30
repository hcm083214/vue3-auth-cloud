<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item :label="$t('system.locale')" prop="locale" class="col2">
                <el-select v-model="queryParams.locale" class="m-2" placeholder="Select">
                    <el-option v-for="item in SUPPORT_LOCALES_LIST" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('system.i18nModule')" prop="i18nModule" class="col2">
                <el-input v-model="queryParams.i18nModule" />
            </el-form-item>
            <el-form-item :label="$t('system.i18nKey')" prop="i18nKey" class="col2">
                <el-input v-model="queryParams.i18nKey" />
            </el-form-item>
        </el-form>
        <div class="search-btn">
            <el-button type="primary" @click="handleQuery">{{ $t('common.search') }}</el-button>
            <el-button @click="resetQuery(queryForm)">{{ $t('common.reset') }}</el-button>
        </div>
        <el-dialog v-model="dialogConfig.isVisible" :title="dialogConfig.title" width="50%" top="100px"
            :close-on-click-modal="false" destroy-on-close draggable>
            <i18n-config :i18nConfigData="dialogConfig.data" :mode="dialogConfig.mode" @handleConfig="handleConfig" />
        </el-dialog>
        <co-table-operation :tableOperation='["Add", "Export", "Import"]'
            @tableOperationHandler="tableOperationHandler">
            <template #default="scope">
                <el-button type="text" @click="tableHandleEventObj.handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
                <el-button type="text" @click="tableHandleEventObj.handleDelete()">{{ $t('common.delete') }}</el-button>
            </template>
        </co-table-operation>
        <co-table :table-data="tableData.i18nList" :isLoading="tableData.isLoading"
            :table-column-props="tableData.headerConfig"
            :customize-table-column-props="tableData.customizeTableHeaderConfig" @tableHandler="tableHandler">
            <template #createTime="tableData">
                <span>{{ dataFormat(tableData.createTime, "YYYY/MM/DD HH:mm:ss") }}</span>
            </template>
            <template #updateBy="tableData">
                <span>{{ tableData.scope.updateBy }}</span>
            </template>
        </co-table> 
        <Pagination v-bind="pagination" @sizeChange="sizeChange" @currentPageChange="currentPageChange" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus'

import CoTableOperation from "@/components/table/CoTableOperation.vue";
import CoTable from "@/components/table/CoTable.vue";
import { dataFormat } from "@/utils/index";

import { TableOperation, TableOperationOption, TableHandlerParams } from "@/components/table/table";
import Pagination from "@/components/Pagination.vue";
import { getIl8nListApi, searchI18nListParams, i18nParams, i18nResponse } from "@/api/i18n";
import { $t, SUPPORT_LOCALES_LIST, support_locales } from "@/utils/i18n";
import { getToken } from "@/utils/token";
import I18nConfig from "./I18nConfig.vue";

async function getI18nData(params: searchI18nListParams) {
    tableData.isLoading = true;
    const result = await getIl8nListApi(params);
    if (result.code === 200) {
        tableData.i18nList = result.data.records;
        pagination.total = result.data.total;
    }
    tableData.isLoading = false;
}
onMounted(async () => await getI18nData({ current: pagination.current, size: pagination.size }));

const queryParams = reactive<i18nParams>({
    locale: '',
    i18nModule: '',
    i18nKey: "",
})
const queryForm = ref();
async function handleQuery() {
    await getI18nData({ current: pagination.current, size: pagination.size, ...queryParams });
}
function resetQuery(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields();
    getI18nData({ current: pagination.current, size: pagination.size });
}

const tableData = reactive({
    i18nList: [] as i18nResponse[],
    isLoading: false,
    headerConfig: [
        {
            label: $t('system.i18nId'),
            prop: 'i18nId',
            width: 80,
        },
        {
            label: $t('system.locale'),
            prop: 'locale',
            width: 100,
        },
        {
            label: $t('system.i18nModule'),
            prop: 'i18nModule',
            width: 150,
        },
        {
            label: $t('system.i18nKey'),
            prop: 'i18nKey',
            width: 150,
        },
        {
            label: $t('system.i18nValue'),
            prop: 'i18nValue',
            width: 200,
        },
    ],
    customizeTableHeaderConfig: [
        {
            label: $t('common.createTime'),
            prop: 'createTime',
            width: 100,
        },
        {
            label: $t('common.updateBy'),
            prop: 'updateBy',
            width: 100,
        },
    ],
    uploadRequestConfig: {
        uploadUrl: "api/i18n/import",
        headers: {
            Authorization: getToken()
        }
    }
})

const tableHandleEventObj = {
    handleAdd() {
        dialogConfig.isVisible = true;
        dialogConfig.title = $t('common.add');
        dialogConfig.mode = "Add";
        dialogConfig.data = initI18nData;
    },
    async handleEdit(params: i18nResponse) {
        dialogConfig.isVisible = true;
        dialogConfig.title = $t('common.edit');
        dialogConfig.data = params;
        dialogConfig.mode = "Edit";
    },
    handleDelete() {

    },
    handleImport() { },
    async handleExport() {

    }
}
const tableOperationHandler = (payload: TableOperation) => {
    tableHandleEventObj[`handle${payload}`]();
}
const tableHandler = (payload: TableHandlerParams<i18nResponse>) => {
    if (payload.mode === 'Edit') {
        tableHandleEventObj[`handle${payload.mode}`](payload.rawData);
    } else {
        tableHandleEventObj[`handle${payload.mode}`]();
    }
}

// 弹框相关逻辑
const initI18nData = {
    i18nId: -1,
    i18nKey: "",
    i18nModule: "",
    i18nValue: "",
    locale: "" as support_locales,
}
const dialogConfig = reactive({
    isVisible: false,
    title: '',
    mode: 'Add' as TableOperationOption,
    data: {} as i18nResponse,
});

const handleConfig = () => {
    dialogConfig.isVisible = false;
    getI18nData({ current: pagination.current, size: pagination.size });
}

const pagination = reactive({
    current: 1,
    size: 10,
    total: 0,
    sizeSelection: [10, 20, 50, 100, 200]
})

async function sizeChange(size: number) {
    pagination.size = size;
    await getI18nData({ current: pagination.current, size });
}

async function currentPageChange(current: number) {
    pagination.current = current;
    await getI18nData({ current, size: pagination.size });
}
</script>

<style scoped>
.search-btn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    margin-right: 50px;
}
</style>