<script setup lang="ts">
import {
    computed,
    onScopeDispose,
    ref,
    watch,
    type HTMLAttributes,
} from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { Backdrop } from "../_shared/axes";
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
     * The backdrop axis. `scrim` (default) is today's flat full-viewport scrim,
     * byte-identical. `graded` swaps it for ONE masked box-following halo child
     * (`data-slot="glass-graded-halo"`) — the flat blur + dim drop and the halo is
     * the sole plate (the `--stage-t` scrim/immersive arms are gated off in
     * drawer/styles.css). The centred immersive Dialog opts in.
     */
    backdrop?: Backdrop;
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
    backdrop: "scrim",
    slideT: null,
});

const isGraded = computed(() => props.backdrop === "graded");

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
        :data-backdrop="isGraded ? 'graded' : undefined"
        :class="
            cn(
                isGraded
                    ? 'fixed inset-0 z-overlay'
                    : 'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                isGraded ? '' : scrimClass[props.scrim],
                props.slideT == null ? 'sheet-animate' : '',
                props.class,
            )
        "
        :style="
            props.slideT == null ? undefined : { opacity: scrimOpacity(props.slideT) }
        "
    >
        <span ref="overlayAnchorEl" hidden />
        <!-- The graded box-following halo — ONE plate that REPLACES the flat scrim
             (blur + dim dropped above; drawer/styles.css gates the stage arms off).
             Full-viewport child, z below the surface / above the page, non-interactive.
             Geometry + intersect mask live in placement.css (FORM 2). -->
        <span v-if="isGraded" data-slot="glass-graded-halo" aria-hidden="true" />
        <slot />
    </DialogOverlay>
</template>
