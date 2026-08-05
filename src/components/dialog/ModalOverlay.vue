<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "../_shared/class-names";
import { scrimOpacity } from "../sheet/motion";

/**
 * The modal scrim — DIM ONLY.
 *
 * The `backdrop-filter` leg is gone. It measurably BRIGHTENED the page it was meant to
 * recede: +5.1% at the core and +31.3% below the plate in light, +76.0% in dark, because
 * a wash blur pulls bright neighbours into every sampled pixel. A scrim that raises the
 * luminance of what it occludes is not a scrim, and no amount of re-inking fixes a
 * mechanism whose sign is wrong. Dimming is the whole job.
 *
 * The α token is NOT this component's to mint — it belongs to the scrim register, and
 * this seat supplies measurement only.
 *
 * THE FOCUS VEIL IS GEOMETRY, so it is a decision the CALLER makes, not a constant.
 * `.glass-focus-veil` (styles/glass/focus-veil.css, MOTION-CANON §5) is a centre-weighted
 * frost mask: a fixed `--glass-focus-veil-core-x/-y` 13rem core plus a 7rem bloom, sited
 * at `--veil-x`/`--veil-y`'s 50% rest. A CENTRED plate sits inside that core and IS the
 * definitional focus event. A SIDE SHEET does not: the engaged surface is anchored at an
 * edge, so an unconditional veil paints a ~640×640 frost pool in the middle of the
 * viewport with nothing engaged inside it — the pool measured against a 384-wide sheet at
 * the far right of a 1440 viewport. Slide-gating cannot save it either, because the sheet
 * drives `slideT` and the centre-path plate leaves it null.
 *
 * So the veil takes an explicit boolean and `DialogContent` is its ONE passer. This is not
 * the retired graded-overlay opt-in coming back — that one gated a private brightening
 * recipe and is gone with its tokens. This selects between two geometries that both
 * already exist and cannot both be right for one component.
 */
interface ModalOverlayProps {
    class?: HTMLAttributes["class"];
    /**
     * A sheet's live slide position (0 open → 1 dismissed). When set, the scrim drops
     * its `sheet-animate` fade keyframe and drives `opacity` off this SAME scalar so it
     * can never desync from the surface through an interrupt.
     */
    slideT?: number | null;
    /** Hold the scrim mounted through the spring exit (mirrors the content forceMount). */
    forceMount?: boolean;
    /**
     * Paint the centre-weighted focus veil. TRUE only where the engaged surface sits at
     * the veil's own centre — i.e. the centred modal. An edge-anchored surface passes
     * nothing and gets the dim alone.
     */
    veil?: boolean;
}

const props = withDefaults(defineProps<ModalOverlayProps>(), {
    slideT: null,
    veil: false,
});
</script>

<template>
    <DialogOverlay
        :force-mount="props.forceMount"
        :class="
            cn(
                'fixed inset-0 z-overlay bg-overlay-scrim',
                props.slideT == null ? 'sheet-animate' : '',
                props.class,
            )
        "
        :style="
            props.slideT == null ? undefined : { opacity: scrimOpacity(props.slideT) }
        "
    >
        <span v-if="props.veil" class="glass-focus-veil" data-engaged aria-hidden="true" />
        <slot />
    </DialogOverlay>
</template>
