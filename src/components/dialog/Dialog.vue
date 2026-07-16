<script setup lang="ts">
import { DialogRoot, useForwardPropsEmits } from "reka-ui";
import { onBeforeUnmount, ref, watch } from "vue";
import { provideDialogStageContext } from "./dialogStageContext";

export interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
    unmountOnHide?: boolean;
}

const props = defineProps<DialogProps>();
const emits = defineEmits<{ "update:open": [value: boolean] }>();

const forwarded = useForwardPropsEmits(props, emits);

// Scene staging belongs to this Dialog instance. The in-flow anchor resolves only
// the nearest consumer-owned page wrapper; the portaled overlay registers its own
// scrim through the same logical Vue context.
const stageAnchorEl = ref<HTMLElement | null>(null);
const stageWrapperEl = ref<HTMLElement | null>(null);
const stageScrimEl = ref<HTMLElement | null>(null);
watch(
    stageAnchorEl,
    (anchor) => {
        stageWrapperEl.value =
            (anchor?.closest("[data-stage-wrapper]") as HTMLElement | null) ?? null;
    },
    { immediate: true, flush: "post" },
);
onBeforeUnmount(() => {
    stageWrapperEl.value = null;
    stageScrimEl.value = null;
});
provideDialogStageContext({ wrapperEl: stageWrapperEl, scrimEl: stageScrimEl });
</script>

<template>
    <DialogRoot data-slot="dialog" v-bind="forwarded">
        <span ref="stageAnchorEl" hidden />
        <slot />
    </DialogRoot>
</template>
