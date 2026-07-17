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
import { scrimOpacity } from "./sheet-motion";

/** Canonical Dialog scrim with one enter/exit recipe and a real intensity axis. */

interface ModalOverlayProps {
    class?: HTMLAttributes["class"];
    /**
     * Scrim intensity. `glass` reads `--overlay-scrim`; `clear` reads
     * `--overlay-scrim-subtle`; `dim` reads `--overlay-scrim-strong`.
     */
    scrim?: "glass" | "clear" | "dim";
    /**
     * A side sheet's live slide position (0 open → 1 dismissed). When set, the scrim
     * drops its `sheet-animate` fade keyframe and drives `opacity` off this SAME scalar
     * so it can never desync from the surface through an interrupt. `null` (center
     * dialog + the `off` side path) keeps the keyframe fade.
     */
    slideT?: number | null;
    /** Hold the scrim mounted through the spring exit (mirrors the content forceMount). */
    forceMount?: boolean;
}

const props = withDefaults(defineProps<ModalOverlayProps>(), {
    scrim: "glass",
    slideT: null,
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
        :force-mount="props.forceMount"
        :class="
            cn(
                'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                scrimClass[props.scrim],
                props.slideT == null ? 'sheet-animate' : '',
                props.class,
            )
        "
        :style="
            props.slideT == null ? undefined : { opacity: scrimOpacity(props.slideT) }
        "
    >
        <span ref="overlayAnchorEl" hidden />
        <slot />
    </DialogOverlay>
</template>
