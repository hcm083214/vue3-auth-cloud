export type TableOperationMode = 'Add' | 'Edit' | 'Delete' | 'Export';
 const enum TableOperation {
    Export = 'Export',
    Add = 'Add',
    Edit = 'Edit',
    Delete = 'Delete'
}
// 表格相关逻辑
export interface TableHandlerOption<T> {
    mode: TableOperationMode,
    option?: {
        rowData?: T,
        // 判断是否为编辑还是新增
        isEditStatus?: boolean,
        // 'template' | undefined
        exportType?: string,
    }
}