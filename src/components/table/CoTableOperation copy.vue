<script lang="ts">
import { h, defineComponent, PropType } from "vue";
import { ElRow, ElCol, ElButton } from 'element-plus'

import { TableOperation } from "./table";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";

export default defineComponent({
    props: {
        tableOperation: {
            type: Array as PropType<TableOperation[]>,
            default: () => []
        }
    },
    emits: ['tableOperationHandler'],
    setup(props, ctx) {
        const { slots, emit } = ctx;
        type TableOperationMap = {
            [key in TableOperation]: {
                icon: string;
                label: string;
                type: "default" | "text" | "success" | "warning" | "info" | "primary" | "danger";
                plain: boolean;
                onClick: () => void;
            };
        };
        const handleTableOperation = (operation: TableOperation) => {
            emit("tableOperationHandler", operation);
        };
        const tableOperationMap: TableOperationMap = {
            Add: {
                icon: "svg-icon:add",
                label: "common.add",
                type: "primary",
                plain: true,
                onClick: () => handleTableOperation("Add")
            },
            Delete: {
                icon: "svg-icon:delete",
                label: "common.delete",
                type: "danger",
                plain: true,
                onClick: () => handleTableOperation("Delete")
            },
            Export: {
                icon: "svg-icon:export",
                label: "common.export",
                type: "info",
                plain: true,
                onClick: () => handleTableOperation("Export")
            },
            Import: {
                icon: "svg-icon:import",
                label: "common.import",
                type: "warning",
                plain: true,
                onClick: () => handleTableOperation("Import")
            }
        }
        const children = props.tableOperation.map(item => {
            const { icon, label, type, plain, onClick } = tableOperationMap[item];
            return h(ElCol, { span: 1.5 }, [
                h(
                    ElButton,
                    {
                        type,
                        plain,
                        onClick
                    },
                    () => {
                        return [h(Icon, { icon }), $t(label)]
                    }
                )
            ])
        })
        return () => h(
            ElRow,
            { gutter: 10 },
            [...children, slots.default && h(ElCol, { span: 1.5 }, slots.default && slots.default())]
        );
    },
})
</script>