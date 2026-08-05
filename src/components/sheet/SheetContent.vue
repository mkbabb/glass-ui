<script setup lang="ts">
import { type HTMLAttributes, computed, type CSSProperties, ref, watch } from "vue";
import {
    DialogContent as RekaDialogContent,
    DialogPortal as RekaDialogPortal,
    injectDialogRootContext,
    useForwardPropsEmits,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { useSpringMount } from "../../composables/motion/spring/useSpringMount";
import ModalOverlay from "../dialog/ModalOverlay.vue";
import type { Motion, Surface } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";
import { sheetSlideTransform, type SidePlacement } from "./motion";
import type { DismissableContentEmits } from "../_shared/interaction";

export interface SheetContentProps {
    forceMount?: boolean;
    disableOutsidePointerEvents?: boolean;
    class?: HTMLAttributes["class"];
    surface?: Surface;
    /** The anchored edge. A sheet always slides; a centred surface is `DialogContent`. */
    side?: SidePlacement;
    motion?: Motion;
    scroll?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SheetContentProps>(), {
    surface: "glass",
    side: "right",
    scroll: false,
});
const emits = defineEmits<DismissableContentEmits>();

const delegatedProps = computed(() => {
    const {
        class: _,
        surface: _su,
        side: _sd,
        motion: _mo,
        scroll: _sl,
        // `forceMount` is bound explicitly onto BOTH the Portal and the Content so the
        // spring's mount-hold survives reka's logical close — never forwarded, or the
        // passthrough would clobber the hold.
        forceMount: _fm,
        ...delegated
    } = props;
    return delegated;
});

const motionAxis = useMotionAxis(() => props.motion);
// Every sheet rides the JS slide-spring — the interruptible reverse the CSS `slide-*`
// keyframe could not do (it snapped to fully-open then slid out). `off` is handled
// INSIDE the armed path (`live` false → render at rest, no translate, no mount-hold, so
// reka Presence unmounts instantly). The drag-dismiss gesture + detents stay Drawer's.
const live = computed(() => motionAxis.resolved.value !== "off");

// Only the inner edge borders; the per-side room corners are `styles.css`'s, off the
// ROOM rung (PROPORTION:233 binds room to "dialog, sheet, drawer" by name).
const SIDE_BORDER: Record<SidePlacement, string> = {
    top: "border-b",
    bottom: "border-t",
    left: "border-r",
    right: "border-l",
};

const contentClass = computed(() =>
    cn(SIDE_BORDER[props.side], resolveSurfaceClass("floating"), props.class),
);

const dialogRoot = injectDialogRootContext();
// ONE spring mount; the exit is the same kernel reversed.
const springMount = useSpringMount({ open: dialogRoot.open, preset: "panel" });

const springStyle = computed<CSSProperties | undefined>(() => {
    if (!live.value) return undefined;
    // The slide rides the `translate` LONGHAND: an unclamped position drives a
    // side-keyed off-edge offset, and `p<0` overshoot IS the liquid settle.
    // `transform/animation/transition: none` make the inline longhand the sole source.
    return {
        translate: sheetSlideTransform(props.side, springMount.position.value),
        transform: "none",
        animation: "none",
        transition: "none",
    };
});

// Mount-hold — the spring, not a keyframe, owns unmount timing.
const contentForceMount = computed(() =>
    live.value ? springMount.present.value || dialogRoot.open.value : props.forceMount,
);
// A closing sheet is inert (non-interactive, untabbable, out of the a11y tree) while it
// animates out, so the mounted-but-closing window is never tabbable.
const closingInert = computed(() =>
    live.value && !dialogRoot.open.value ? "" : undefined,
);
// The scrim reads the SAME live scalar as the surface, so the two can never desync
// through an interrupt.
const scrimSlideT = computed(() => (live.value ? springMount.position.value : null));
const scrimForceMount = computed(() =>
    live.value ? springMount.present.value || dialogRoot.open.value : undefined,
);

// Focus handoff — a closing sheet keeps a mounted-but-inert Presence beyond reka's
// logical close, stranding focus on `<body>` for the exit window. Move focus to the
// trigger at the LOGICAL close if it would otherwise strand inside the animating-out
// content (the inert-bounces-to-body → sync-watch-pulls-to-trigger order).
const contentAnchorEl = ref<HTMLElement | null>(null);
const resolveContentEl = (): HTMLElement | null =>
    (contentAnchorEl.value?.closest(
        '[data-slot="sheet-content"]',
    ) as HTMLElement | null) ?? null;
watch(
    () => dialogRoot.open.value,
    (open) => {
        if (!live.value || open !== false) return;
        const active = document.activeElement;
        if (active && resolveContentEl()?.contains(active))
            dialogRoot.triggerElement.value?.focus({ preventScroll: true });
    },
    { flush: "sync" },
);

const forwarded = useForwardPropsEmits(delegatedProps, emits);

// The sheet relays its concentric-radius context (for the gear-sheet Configurator's
// nested cards): it PUBLISHES its resolved corner as `--radius-ctx` + its content pad as
// `--radius-inset`, so a nested card-class surface DERIVES its own corner concentric
// with the outer.
const contentStyle = computed<CSSProperties>(() => ({
    "--glass-veil-tier": "var(--glass-veil-dialog)",
    "--radius-ctx": "var(--radius-3xl)",
    "--radius-inset": "var(--space-family)",
    ...((motionAxis.hostStyle.value as CSSProperties | undefined) ?? {}),
    ...(springStyle.value ?? {}),
}));
</script>

<template>
    <RekaDialogPortal :force-mount="contentForceMount">
        <!-- The scrim is DIM ONLY here — no `veil`. The focus veil's core is fixed at
             the viewport centre, and a sheet is anchored at an edge: the pool would
             frost the middle of the page with nothing engaged inside it. -->
        <ModalOverlay :slide-t="scrimSlideT" :force-mount="scrimForceMount" />
        <RekaDialogContent
            v-bind="{ ...forwarded, ...$attrs, inert: closingInert }"
            :force-mount="contentForceMount"
            :class="contentClass"
            :style="contentStyle"
            :data-surface="props.surface"
            data-slot="sheet-content"
            data-material="overlay"
            :data-side="props.side"
            :data-scroll="props.scroll ? '' : undefined"
            :data-motion="motionAxis.dataMotion.value"
        >
            <!-- Hidden anchor — the focus-handoff watch resolves the live content root
                 via `closest`, never a Presence-transient `$el`. -->
            <span ref="contentAnchorEl" hidden />
            <!-- One noninteractive, mask-graded backdrop sample. The host's flat blur is
                 disabled for this glass-only arm in styles.css, so this is not a nested
                 second plate. -->
            <span
                v-if="props.surface === 'glass'"
                data-slot="glass-graded-halo"
                aria-hidden="true"
            />
            <!-- One stable inner region: it packs content at intrinsic height, and
                 `scroll` only changes that region's overflow. The plate and sampler
                 remain stationary siblings. -->
            <div data-slot="sheet-content-region">
                <slot />
            </div>
        </RekaDialogContent>
    </RekaDialogPortal>
</template>
