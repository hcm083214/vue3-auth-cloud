export type TableOperation = 'Add' | 'Edit' | 'Delete' | 'Export' | 'Import' ;
export interface TableHeaderOption {
    label: String,
    prop: String,
    width: Number,
}