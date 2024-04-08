<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item :label="$t('system.locale')" prop="locale" class="col2">
                <el-select v-model="queryParams.locale" class="m-2" placeholder="Select">
                    <el-option v-for="item in locales" :key="item" :label="item" :value="item" />
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
        <common-table :tableList="tableData.i18nList" :isLoading="tableData.isLoading"
            :tableHeaderConfig="tableData.headerConfig" :uploadRequestConfig="tableData.uploadRequestConfig"
            @handleEvent="tableHandler" />
        <Pagination v-bind = "pagination"
            @sizeChange="sizeChange" @currentPageChange="currentPageChange" />
        <el-dialog v-model="dialogConfig.isVisible" :title="dialogConfig.title" width="50%" top="100px"
            :close-on-click-modal="false" destroy-on-close draggable>
            <i18n-config :i18nConfigData="dialogConfig.data" :mode="dialogConfig.mode" @handleConfig="handleConfig" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus'

import CommonTable from "@/components/CommonTable.vue";
import { TableOperationMode, TableHandlerOption } from "@/components/CommonTable";
import Pagination from "@/components/Pagination.vue";
import { I18nData } from "@/api/types";
import { getIl8nListApi, searchI18nListParams,i18nParams } from "@/api/i18n";
import { $t, SUPPORT_LOCALES as locales } from "@/utils/i18n";
import { getToken } from "@/utils/token";
import I18nConfig from "./I18nConfig.vue";

async function getI18nData(params: searchI18nListParams) {
    console.log("🚀 ~ getI18nData ~ params:", params)
    tableData.isLoading = true;
    const result = await getIl8nListApi(params);
    if (result.code === 200) {
        tableData.i18nList = result.data.records;
        pagination.total = result.data.total;
    }
    tableData.isLoading = false;
}
onMounted(() => getI18nData({ current: pagination.current, size: pagination.size }));

const queryParams = reactive<i18nParams>({
    locale: '',
    i18nModule: '',
    i18nKey: "",
})
const queryForm = ref();
function handleQuery() {
    getI18nData({ current: pagination.current, size: pagination.size, ...queryParams });
}
function resetQuery(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields();
    getI18nData({ current: pagination.current, size: pagination.size });
}

const tableData = reactive({
    i18nList: [] as I18nData[],
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
            width: 180,
        },
        {
            label: $t('system.i18nKey'),
            prop: 'i18nKey',
            width: 200,
        },
        {
            label: $t('system.i18nValue'),
            prop: 'i18nValue',
            width: 250,
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
    async handleEdit(option: TableHandlerOption<I18nData>) {
        dialogConfig.isVisible = true;
        dialogConfig.title = $t('common.edit');
        dialogConfig.data = option.option?.rowData as I18nData;
        dialogConfig.mode = "Edit";
    },
    handleDelete() {

    },
    async handleExport(config: TableHandlerOption<I18nData>) {

    }
}
const tableHandler = (option: TableHandlerOption<I18nData>) => {
    tableHandleEventObj[`handle${option.mode}`](option);
}

// 弹框相关逻辑
const initI18nData = {
    i18nId: -1,
    i18nKey: "",
    i18nModule: "",
    i18nValue: "",
    locale: "",
}
const dialogConfig = reactive({
    isVisible: false,
    title: '',
    mode: '' as TableOperationMode,
    data: {} as I18nData,
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

function sizeChange(size: number) {
    pagination.size = size;
    getI18nData({ current: pagination.current, size });
}

function currentPageChange(current: number) {
    pagination.current = current;
    getI18nData({ current, size: pagination.size });
}
</script>

<style scoped>
.search-btn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    margin-right: 50px;
}
</style>@/api/i18n