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
type TableOperationMap = {
    [key in TableOperation]: {
        icon: string;
        label: string;
        type: "default" | "text" | "success" | "warning" | "info" | "primary" | "danger";
        plain: boolean;
        operation: TableOperation;
    };
};
export const tableOperationMap: TableOperationMap = {
    Add: {
        icon: "svg-icon:add",
        label: "common.add",
        type: "primary",
        plain: true,
        operation: "Add"
    },
    Delete: {
        icon: "svg-icon:delete",
        label: "common.delete",
        type: "danger",
        plain: true,
        operation: "Delete"
    },
    Export: {
        icon: "svg-icon:export",
        label: "common.export",
        type: "info",
        plain: true,
        operation: "Export"
    },
    Import: {
        icon: "svg-icon:import",
        label: "common.import",
        type: "warning",
        plain: true,
        operation: "Import"
    }
}