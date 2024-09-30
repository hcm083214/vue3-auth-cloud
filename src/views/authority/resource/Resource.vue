<template>
    <div>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column prop="date" label="Date" sortable />
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column prop="address" label="Address" sortable />
        </el-table>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss"></style>