<script lang="ts">
import { h, defineComponent } from "vue";
import { ElRow, ElCol, ElButton } from 'element-plus'

import { TableOperation } from "./table";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";

export default defineComponent({
    props: {
        tableOperation: {
            type: Array as () => TableOperation[],
            default: () => []
        }
    },
    emits: {
        tableOperationHandler: (payload: TableOperation) => { }
    },
    setup(props, ctx) {
        const { slots } = ctx;
        type TableOperationMap = {
            [key in TableOperation]: {
                icon: string;
                label: string;
                type: "default" | "text" | "success" | "warning" | "info" | "primary" | "danger";
                plain: boolean;
                onClick: () => void;
            };
        };
        const tableOperationMap:TableOperationMap = {
            Add: {
                icon: "svg-icon:add",
                label: "common.add",
                type: "primary",
                plain: true,
                onClick: () => {
                    ctx.emit("tableOperationHandler", "Add");
                }
            },
            Delete: {
                icon: "svg-icon:delete",
                label: "common.delete",
                type: "danger",
                plain: true,
                onClick: () => {
                    ctx.emit("tableOperationHandler", "Delete");
                }
            },
            Export: {
                icon: "svg-icon:export",
                label: "common.export",
                type: "info",
                plain: true,
                onClick: () => {
                    ctx.emit("tableOperationHandler", "Export");
                }
            },
            Import: {
                icon: "svg-icon:import",
                label: "common.import",
                type: "warning",
                plain: true,
                onClick: () => {
                    ctx.emit("tableOperationHandler", "Import");
                }
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
        return () => {
            return h(ElRow, { gutter: 10 }, [children, h(ElCol, { span: 1.5 }, slots.default && slots.default())])
        };
    },
})
</script>