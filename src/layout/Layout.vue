<script lang="ts">
import { h } from "vue";

import Classic from "@/layout/Classic.vue";
import TopLeft from "@/layout/TopLeft.vue";
import Top from "@/layout/Top.vue";

export default {
    setup() {
        // const { configState } = appStore.configStore
        type LayoutType = "classic" | "top-left" | "top";
        const layoutType:LayoutType = "classic";
        return () => {
            if (layoutType == "classic") {
                return h(Classic)
            } else if (layoutType == "top-left") {
                return h(TopLeft)
            } else if (layoutType == "top") {
                return h(Top)
            }
        }
    }
}
</script>