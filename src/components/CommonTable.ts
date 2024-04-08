export type TableOperationMode = 'Add' | 'Edit' | 'Delete' | 'Export';
// 表格相关逻辑
export interface TableHandlerOption<T> {
    mode: TableOperationMode,
    option?: {
        rowData?: T,
        // 判断是否为编辑还是新增
        isEditStatus?: boolean,
        // 'template' | undefined
        exportType?: 'template' | undefined,
    }
}

export interface TableHandler {
    label: String,
    prop: String,
    width: Number,
}