<script setup lang="ts">
import { type HTMLAttributes, computed, type CSSProperties, ref, watch } from "vue";
import {
    DialogClose as RekaDialogClose,
    DialogContent as RekaDialogContent,
    DialogPortal as RekaDialogPortal,
    injectDialogRootContext,
    useForwardPropsEmits,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { useSpringMount } from "../../composables/motion/spring/useSpringMount";
import ModalOverlay from "./ModalOverlay.vue";
import type { Motion, Surface } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";
import type { DismissableContentEmits } from "../_shared/interaction";

/**
 * The DISMISSAL GRAMMAR — one axis, three rungs, and every "confirm dialog" and "gate"
 * the library used to duplicate falls out of it:
 *
 *   free (default)  ✕ · Esc · outside   — a dialog
 *   deliberate      Esc · outside       — a confirm
 *   locked          rebuffs Esc AND outside — a gate
 *
 * The old boolean close knob folds into it, and no `Confirm*`/`Gate*` symbol is minted:
 * destructive tone stays `<Button tone="destructive">` — named presets live in consumers.
 */
export type DialogDismiss = "free" | "deliberate" | "locked";

export interface DialogContentProps {
    forceMount?: boolean;
    disableOutsidePointerEvents?: boolean;
    class?: HTMLAttributes["class"];
    surface?: Surface;
    motion?: Motion;
    scroll?: boolean;
    dismiss?: DialogDismiss;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DialogContentProps>(), {
    surface: "glass",
    scroll: false,
    dismiss: "free",
});
const emits = defineEmits<DismissableContentEmits>();

const delegatedProps = computed(() => {
    const {
        class: _,
        surface: _su,
        motion: _mo,
        scroll: _sl,
        dismiss: _di,
        // `forceMount` is bound explicitly onto BOTH the Portal and the Content so the
        // spring's mount-hold survives reka's logical close — never forwarded, or the
        // passthrough would clobber the hold.
        forceMount: _fm,
        ...delegated
    } = props;
    return delegated;
});

const motionAxis = useMotionAxis(() => props.motion);
const live = computed(() => motionAxis.resolved.value !== "off");

const dialogRoot = injectDialogRootContext();
// ONE mount spring, ONE curve. MOTION-CANON gives the MODAL a single row, so the curve
// is named here once and the consumer chooses nothing — and the knob that used to offer
// the choice took its bug with it: it was captured non-reactively at setup, so a live
// `prefers-reduced-motion` flip lost both the bloom AND the spring.
const springMount = useSpringMount({ open: dialogRoot.open, preset: "present" });

// The entrance is UNTOUCHED — anisotropic squish into a small overshoot, then settle.
// The centring rides `translate:` (authored in styles.css so it survives motion="off")
// and the squish rides `scale:`, each its OWN longhand: a `transform: translate()
// scale()` composes ONE matrix, so the squish would re-derive the −50% offset off the
// scaled box and drift the plate off centre mid-bloom.
//
// No `animation: none` leg: the plate composes no `animate-in`/`animate-out` utility
// and no `.glass-reveal`, so there is no keyframe to defeat — and writing one here
// would silence the rebuff, which needs this element's animation channel.
const springStyle = computed<CSSProperties | undefined>(() => {
    if (!live.value) return undefined;
    const p = springMount.position.value; // 0 = mounted, 1 = dismissed
    return {
        transform: "none",
        scale: String(1 - 0.05 * p),
        opacity: String(1 - p),
        transition: "none",
    };
});

// Mount-hold — the spring, not a keyframe, owns unmount timing.
const contentForceMount = computed(() =>
    live.value ? springMount.present.value || dialogRoot.open.value : props.forceMount,
);
// A closing plate is inert (non-interactive, untabbable, out of the a11y tree) while it
// animates out, so the mounted-but-closing window is never tabbable.
const closingInert = computed(() =>
    live.value && !dialogRoot.open.value ? "" : undefined,
);
// CO-TERMINATION, not a re-timed exit. Scrim and plate read the SAME live scalar, so
// they cannot desync through an interrupt and they land together; the exit stays
// fade-led at 150ms, which is already correct, and the plate mints no literal.
const scrimSlideT = computed(() => (live.value ? springMount.position.value : null));
const scrimForceMount = computed(() =>
    live.value ? springMount.present.value || dialogRoot.open.value : undefined,
);

// Focus handoff — the closing plate keeps a mounted-but-inert Presence beyond reka's
// logical close, stranding focus on `<body>` for the exit window. Pull it back to the
// trigger at the LOGICAL close if it would otherwise strand inside the animating-out
// content (the inert-bounces-to-body → sync-watch-pulls-to-trigger order).
const contentAnchorEl = ref<HTMLElement | null>(null);
const resolveContentEl = (): HTMLElement | null =>
    (contentAnchorEl.value?.closest(
        '[data-slot="dialog-content"]',
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

// THE REBUFF. `locked` refuses Esc and outside-press, and the refusal is PERCEPTIBLE:
// a monotonically-increasing count drives the rung the portaled node carries, so every
// refusal starts a fresh run. There is no completion handshake to miss and therefore no
// latch — the class of bug that made the demo's hand-rolled cue fire at most once, and in
// fact never, because a scoped rule cannot reach a portaled element.
const rebuffCount = ref(0);
// The parity rung. CSS restarts an animation only when `animation-name` changes, so the
// two rungs alternate and consecutive refusals each get a fresh run.
const rebuffRung = computed(() =>
    rebuffCount.value === 0 ? undefined : rebuffCount.value % 2 === 1 ? "a" : "b",
);
const closeVisible = computed(() => props.dismiss === "free");
function refuse(event: Event) {
    if (props.dismiss !== "locked") return;
    event.preventDefault();
    rebuffCount.value += 1;
}

const forwarded = useForwardPropsEmits(delegatedProps, emits);

// The plate rides the floating tier's LIFT (edge, rim, under-shadow) at its OWN ink:
// one step above resting, one below floating — the control-centre modal, see-through
// enough that the page reads behind it, occluding enough to be a modal. The rung is
// re-pointed through the ONE seam the ladder itself uses (`--glass-veil-tier`, read by
// `@utility glass-plate`), so there is no second plate recipe and no double-named token.
// `surface="opaque"` still reaches `--glass-level: 0` — the same machinery, zeroed.
const contentStyle = computed<CSSProperties>(() => ({
    "--glass-veil-tier": "var(--glass-veil-dialog)",
    ...((motionAxis.hostStyle.value as CSSProperties | undefined) ?? {}),
    ...(springStyle.value ?? {}),
}));

// Geometry is authored ONCE, in `dialog/styles.css`, off named space rungs — there is
// no inline structural string left to disagree with it. What stays here is identity:
// position, layer, the surface tier and the room corner.
const contentClass = computed(() =>
    cn(
        "fixed left-1/2 top-1/2 z-modal",
        resolveSurfaceClass("floating"),
        props.scroll ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "",
        props.class,
    ),
);
</script>

<template>
    <RekaDialogPortal :force-mount="contentForceMount">
        <!-- `veil` is passed HERE and nowhere else: the centred plate sits inside the
             focus veil's own fixed core, which is the only geometry that mask is true
             for. `sheet/SheetContent.vue` composes the same scrim and passes none. -->
        <ModalOverlay veil :slide-t="scrimSlideT" :force-mount="scrimForceMount" />
        <RekaDialogContent
            v-bind="{ ...forwarded, ...$attrs, inert: closingInert }"
            :force-mount="contentForceMount"
            :class="contentClass"
            :style="contentStyle"
            :data-surface="props.surface"
            data-slot="dialog-content"
            data-material="overlay"
            :data-dismiss="props.dismiss"
            :data-rebuff="rebuffRung"
            :data-scroll="props.scroll ? '' : undefined"
            :data-motion="motionAxis.dataMotion.value"
            @escape-key-down="refuse"
            @pointer-down-outside="refuse"
        >
            <!-- Hidden anchor — the focus-handoff watch resolves the live content root
                 via `closest`, never a Presence-transient `$el`. -->
            <span ref="contentAnchorEl" hidden />
            <!-- DOM-FIRST. The ✕ was reachable last by Tab while reading first visually;
                 it is authored first so tab order, DOM order and visual order agree. -->
            <!-- The glyph is inline, not an icon-package import. It is two strokes, it
                 is this surface's only icon, and a static import put the whole icon module
                 in the boot graph of every consumer that mounts a Dialog — including the
                 command palette, which sets `deliberate` and never renders a ✕ at all. -->
            <RekaDialogClose v-if="closeVisible" data-slot="dialog-close">
                <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                <span class="sr-only">Close</span>
            </RekaDialogClose>
            <slot />
        </RekaDialogContent>
    </RekaDialogPortal>
</template>
