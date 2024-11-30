<script lang="ts" setup>
import { onMounted, reactive } from "vue";

import CommonTable from "@/components/table/CoTable.vue";
import CoTableOperation from "@/components/table/CoTableOperation.vue";
import { getSystemResourceApi, ResourceResponse } from "@/api/resource";


const resourceDate = reactive({
    isLoading: false,
    data: [] as ResourceResponse[]
})

onMounted(async () => {
    resourceDate.isLoading = true;
    const result = await getSystemResourceApi();
    if(result.code = 200){
        resourceDate.data = result.data.records;
    }
    resourceDate.isLoading = false;
})

</script>

<template>
    <div class="resource-container">
        <co-table-operation :tableOperation='["Add", "Export", "Import"]' />
        <common-table :tableData="resourceDate.data" :isLoading="resourceDate.isLoading" />
    </div>
</template>

<style lang="scss" scoped></style>