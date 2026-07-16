<script setup lang="ts">
import {
    onScopeDispose,
    ref,
    watch,
    type HTMLAttributes,
} from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "../_shared/class-names";
import { useOptionalDialogStageContext } from "./dialogStageContext";

/** Canonical Dialog scrim with one enter/exit recipe and a real intensity axis. */

interface ModalOverlayProps {
    class?: HTMLAttributes["class"];
    /**
     * Scrim intensity. `glass` reads `--overlay-scrim`; `clear` reads
     * `--overlay-scrim-subtle`; `dim` reads `--overlay-scrim-strong`.
     */
    scrim?: "glass" | "clear" | "dim";
}

const props = withDefaults(defineProps<ModalOverlayProps>(), {
    scrim: "glass",
});

const scrimClass = {
    glass: "bg-overlay-scrim",
    clear: "bg-overlay-scrim-subtle",
    dim: "bg-overlay-scrim-strong",
} as const;

const stageContext = useOptionalDialogStageContext();
const overlayAnchorEl = ref<HTMLElement | null>(null);
let registeredScrim: HTMLElement | null = null;
watch(
    overlayAnchorEl,
    (anchor) => {
        if (!stageContext) return;
        registeredScrim = anchor?.parentElement ?? null;
        stageContext.scrimEl.value = registeredScrim;
    },
    { immediate: true, flush: "post" },
);
onScopeDispose(() => {
    if (stageContext?.scrimEl.value === registeredScrim)
        stageContext.scrimEl.value = null;
});
</script>

<template>
    <DialogOverlay
        :class="
            cn(
                'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                scrimClass[props.scrim],
                'sheet-animate',
                props.class,
            )
        "
    >
        <span ref="overlayAnchorEl" hidden />
        <slot />
    </DialogOverlay>
</template>
