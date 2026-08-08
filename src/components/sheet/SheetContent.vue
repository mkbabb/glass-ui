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
import ModalOverlay from "../dialog/ModalOverlay.vue";
import type { Motion, Surface } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
import { surfaceClass } from "../_shared/surface/resolve";
import {
    scrimDetentOpacity,
    scrimOpacity,
    sheetSlideTransform,
    type SidePlacement,
} from "./motion";
import { useSheetDetents } from "./detents/use";
import type { DismissableContentEmits } from "../_shared/interaction";

export interface SheetContentProps {
    forceMount?: boolean;
    disableOutsidePointerEvents?: boolean;
    class?: HTMLAttributes["class"];
    surface?: Surface;
    /** The anchored edge. A sheet always slides; a centred surface is `DialogContent`. */
    side?: SidePlacement;
    /**
     * The detent ladder — ascending fractions of the anchored axis the sheet may rest
     * at. Supplying it makes the sheet DETENTED: it takes its size from the live rung
     * instead of sliding whole, it grows a grip that carries the ladder, and it can be
     * dragged and flung between rungs or off the edge entirely.
     *
     * A detent is a size, so `left`/`right` ladders are as legal as `bottom`/`top` ones
     * — the geometry is axis-agnostic and there is no side to fence off.
     */
    detents?: number[];
    /** The active rung (`v-model:detent`). Defaults to the ladder's fullest. */
    detent?: number | null;
    motion?: Motion;
    scroll?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SheetContentProps>(), {
    surface: "glass",
    side: "right",
    scroll: false,
    detents: undefined,
    detent: undefined,
});
const emits = defineEmits<
    DismissableContentEmits & { "update:detent": [value: number | null] }
>();

const delegatedProps = computed(() => {
    const {
        class: _,
        surface: _su,
        side: _sd,
        motion: _mo,
        scroll: _sl,
        detents: _dt,
        detent: _dv,
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
// reka Presence unmounts instantly).
const live = computed(() => motionAxis.resolved.value !== "off");

// THE TWO ARRIVALS, and a sheet has exactly one of them. Without a ladder it SLIDES:
// it is already its own size and the only question is where it sits. With a ladder it
// GROWS: the rung IS the size, so there is nothing left to translate and translating it
// anyway is what used to push the footer below the fold at three rungs out of four.
const ladder = computed<readonly number[]>(() =>
    props.detents ? [...props.detents].sort((a, b) => a - b) : [],
);
const detented = computed(() => ladder.value.length > 0);

// Only the inner edge borders; the per-side room corners are `styles.css`'s, off the
// ROOM rung (PROPORTION:233 binds room to "dialog, sheet, drawer" by name).
const SIDE_BORDER: Record<SidePlacement, string> = {
    top: "border-b",
    bottom: "border-t",
    left: "border-r",
    right: "border-l",
};

const contentClass = computed(() =>
    cn(SIDE_BORDER[props.side], surfaceClass("floating"), props.class),
);

const dialogRoot = injectDialogRootContext();
// ONE spring mount PER ARM, and the sheet has exactly one arm at a time. The slide's
// panel spring is seated only on the SLIDING arm: a detented sheet is driven end to end
// by its own engine (`detents/use.ts`) — `springStyle`, `held` and `scrimAlpha` all read
// the rung scalar there and nothing on that path reads `springMount` at all — so its
// open edge is gated off `detented` and the kernel never seats a second clock on the one
// surface whose gesture gate arms G-SPRING-HONEST.
const slideOpen = computed(() => !detented.value && dialogRoot.open.value);
const springMount = useSpringMount({ open: slideOpen, preset: "panel" });

// The rung model. Self-controlled so an unbound sheet still has one, mirrored from the
// prop when the consumer binds `v-model:detent`, and emitted on every settled rung.
const detentModel = ref<number | null>(props.detent ?? null);
watch(
    () => props.detent,
    (value) => {
        if (value !== undefined) detentModel.value = value;
    },
);
watch(detentModel, (value) => emits("update:detent", value));

const sheetDetents = useSheetDetents({
    open: dialogRoot.open,
    side: () => props.side,
    // A sheet with no ladder still hands the engine a legal one; `detented` gates every
    // consumer of it, so the engine simply never runs.
    ladder: () => (ladder.value.length > 0 ? ladder.value : [1]),
    detent: detentModel,
    requestClose: () => dialogRoot.onOpenChange(false),
});

const springStyle = computed<CSSProperties | undefined>(() => {
    if (!live.value) return undefined;
    // A detented sheet is SIZED by its rung, so it publishes the scalar and translates
    // nothing at all — the box the frost samples is stationary at every rung.
    if (detented.value) return { "--detent-t": String(sheetDetents.t.value) };
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
const held = computed(() =>
    detented.value ? sheetDetents.present.value : springMount.present.value,
);
const contentForceMount = computed(() =>
    live.value ? held.value || dialogRoot.open.value : props.forceMount,
);
// THE SAMPLER'S PRESENCE IS THE SURFACE'S. It is a portal sibling now, so reka's own
// `<Presence>` around the content no longer covers it: rendered unguarded it would paint
// one sampler per MOUNTED SHEET on the page, open or not, and each would anchor to
// whichever surface happened to precede it. This is the content's own present-condition,
// spelled once — `forceMount` while the spring holds the exit, `open` otherwise.
const haloPresent = computed(
    () =>
        props.surface === "glass" && (contentForceMount.value || dialogRoot.open.value),
);
// A closing sheet is inert (non-interactive, untabbable, out of the a11y tree) while it
// animates out, so the mounted-but-closing window is never tabbable.
const closingInert = computed(() =>
    live.value && !dialogRoot.open.value ? "" : undefined,
);
// The scrim reads the SAME live scalar as the surface, so the two can never desync
// through an interrupt — the rung scalar when there is a ladder, the slide otherwise.
const scrimAlpha = computed(() => {
    if (!live.value) return null;
    return detented.value
        ? scrimDetentOpacity(sheetDetents.t.value)
        : scrimOpacity(springMount.position.value);
});
const scrimForceMount = computed(() =>
    live.value ? held.value || dialogRoot.open.value : undefined,
);

// ── the grip: the ladder made visible, and the only thing that carries it ──────────
// It is a slider over the rungs, so the keyboard reaches every one of them, and its
// width tracks the live scalar — the affordance IS the read-out, at rest and in flight.
const rungIndex = computed(() => {
    const rungs = ladder.value;
    // A settled slider reports its RUNG; a dragging one reports where the finger has it.
    // Reading the live scalar in both states would make the resting `aria-valuenow` a
    // transient of whichever frame the reader arrived on.
    const value = sheetDetents.dragging.value
        ? sheetDetents.t.value
        : (detentModel.value ?? sheetDetents.t.value);
    let best = 0;
    for (let i = 1; i < rungs.length; i += 1)
        if (Math.abs(rungs[i]! - value) < Math.abs(rungs[best]! - value)) best = i;
    return best;
});
const rungValueText = computed(() => {
    const rungs = ladder.value;
    return `${Math.round((rungs[rungIndex.value] ?? 1) * 100)}%, position ${
        rungIndex.value + 1
    } of ${rungs.length}`;
});

// THE MARK'S OWN SCALAR, and the reason it is written twice. `--detent-t` is registered
// `inherits: false` — a nested sheet must never take its parent's rung — so on any
// element that does not DECLARE it the property resolves to its registered initial `0`.
// The content root declares it for the size and the congeal (`springStyle`); the two
// read-out legs (the grip's `inline-size` and its idle α) are rules on the GRIP, so the
// grip declares it too. Publishing it on the HANDLE instead moves the read one level
// closer and leaves the grip frozen at `--space-section` forever — which is exactly what
// the first cut of this row shipped, prose and all. An inheriting mirror would work and
// is refused: it is a second name for one scalar.
const markStyle = computed<CSSProperties | undefined>(() =>
    detented.value ? { "--detent-t": String(sheetDetents.t.value) } : undefined,
);

function onGripKeydown(event: KeyboardEvent) {
    const rungs = ladder.value;
    const last = rungs.length - 1;
    let index = rungIndex.value;
    if (event.key === "Home") index = 0;
    else if (event.key === "End") index = last;
    else if (event.key === "ArrowUp" || event.key === "ArrowRight")
        index = Math.min(last, index + 1);
    else if (event.key === "ArrowDown" || event.key === "ArrowLeft")
        index = Math.max(0, index - 1);
    else return;
    event.preventDefault();
    sheetDetents.snapTo(rungs[index]!);
}

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
//
// THE CONGEAL rides that same ONE seam. A detented sheet re-points `--glass-veil-tier`
// at a live lerp between two rungs of the published ladder — CROWN at the peek, SHEET at
// full — so the plate thickens monotonically as the sheet commits, the page bleeds
// through at the peek where it should, and there is no terminal opaque arm to slam into
// at the top: the fullest rung is still glass. One step of the ladder end to end, so no
// pair of adjacent rungs can move the plate further than the register itself moves.
const CONGEAL_TIER =
    "calc(var(--glass-veil-crown) + (var(--glass-veil-sheet) - var(--glass-veil-crown)) * clamp(0, var(--detent-t), 1))";

const contentStyle = computed<CSSProperties>(() => ({
    "--glass-veil-tier": detented.value ? CONGEAL_TIER : "var(--glass-veil-dialog)",
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
        <ModalOverlay :opacity="scrimAlpha" :force-mount="scrimForceMount" />
        <RekaDialogContent
            v-bind="{ ...forwarded, ...$attrs, inert: closingInert }"
            :force-mount="contentForceMount"
            :class="contentClass"
            :style="contentStyle"
            :data-surface="props.surface"
            data-slot="sheet-content"
            :data-side="props.side"
            :data-modal="dialogRoot.modal.value ? undefined : 'false'"
            :data-detents="detented ? '' : undefined"
            :data-dragging="sheetDetents.dragging.value ? '' : undefined"
            :data-scroll="props.scroll ? '' : undefined"
            :data-motion="motionAxis.dataMotion.value"
            @pointerdown="detented ? sheetDetents.onPointerdown($event) : undefined"
        >
            <!-- Hidden anchor — the focus-handoff watch resolves the live content root
                 via `closest`, never a Presence-transient `$el`. -->
            <span ref="contentAnchorEl" hidden />
            <!-- THE ✕ — the fifth of the merge's five affordances (CWT-2 §4 A7), and it
                 is the SIBLING'S control, not a second one: the 44px target, the inset
                 capsule, the hover/press split and the focus ring are authored once in
                 `dialog/styles.css` on an UNSCOPED `[data-slot="dialog-close"]`, so the
                 sheet composes that rule and adds only its own gutter reservation.

                 UNCONDITIONAL, on the same ground the plate's is conditional. The plate
                 carries a `dismiss` axis and drops the ✕ on two of its three rungs; the
                 sheet carries no such axis — its dismissal is always free (Esc, outside
                 press, and a flick that resolves onto `0`) — so a knob here could only
                 hide the control on a surface that stays dismissable regardless.

                 DOM-FIRST, as on the plate: authored ahead of the content so tab order,
                 DOM order and the family's one contract agree. -->
            <RekaDialogClose data-slot="dialog-close">
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
            <!-- THE GRIP. It is the ladder, not a decoration of it: a slider over the
                 rungs for the keyboard, and a width that tracks the live scalar for the
                 eye. Its hover affordance is scoped to ITS OWN region — the shipped
                 drawer moved this mark from 456px away because the rule was written
                 plate-wide, which is a plate reacting to nothing. -->
            <div
                v-if="detented"
                data-slot="sheet-detent-handle"
                role="slider"
                tabindex="0"
                aria-label="Sheet position"
                :aria-orientation="
                    props.side === 'left' || props.side === 'right'
                        ? 'horizontal'
                        : 'vertical'
                "
                :aria-valuemin="ladder[0]"
                :aria-valuemax="ladder[ladder.length - 1]"
                :aria-valuenow="ladder[rungIndex]"
                :aria-valuetext="rungValueText"
                @keydown="onGripKeydown"
            >
                <!-- The mark carries the scalar ITSELF: `--detent-t` does not inherit,
                     and both of its read-out legs are rules on this element. -->
                <span
                    data-slot="sheet-detent-grip"
                    :style="markStyle"
                    aria-hidden="true"
                />
            </div>
            <!-- One stable inner region: it packs content at intrinsic height, and
                 `scroll` only changes that region's overflow. The plate and sampler
                 remain stationary siblings. -->
            <div data-slot="sheet-content-region">
                <slot />
            </div>
        </RekaDialogContent>
        <!-- ONE NONINTERACTIVE, MASK-GRADED BACKDROP SAMPLE — and it is the surface's
             SIBLING, not its child, because a child of this plate CANNOT SAMPLE THE PAGE.
             The glass recipe carries a `plus-lighter` specular pseudo and a `soft-light`
             grain pseudo, and a descendant with a blend mode makes its parent an isolated
             group: every child's backdrop sample stops at the plate it sits on, so the
             filter landed nothing and a masked gradient tint painted in its place while
             computed style read `blur(34px) saturate(1.5)` the whole time. The figures and
             the isolation ladder are at `styles.css`; the cure is measured, not inferred.

             It is authored AFTER the surface so the surface is an acceptable anchor for it
             (anchor positioning only looks BACKWARD in tree order) — the box is the
             surface's own, at every rung and through the slide, with no second size law.
             Paint order is z-index's, one rung under the surface, so DOM order costs
             nothing. The host's flat blur stays off: this is the sole sampler. -->
        <span
            v-if="haloPresent"
            data-slot="glass-graded-halo"
            :data-side="props.side"
            :data-detents="detented ? '' : undefined"
            :data-modal="dialogRoot.modal.value ? undefined : 'false'"
            aria-hidden="true"
        />
    </RekaDialogPortal>
</template>
