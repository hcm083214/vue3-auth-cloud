export type TableOperation = 'Add' | 'Delete' | 'Export' | 'Import';
export interface TableHeaderOption {
    label: String,
    prop: String,
    width: Number,
}
export type TableOperationOption = TableOperation | 'Edit';
export interface TableHandlerParams<T> {
    mode: TableOperationOption,
    rawData: T,
}