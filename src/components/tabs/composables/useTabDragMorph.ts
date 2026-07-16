import { computed, watch, nextTick } from "vue";
import type { ComputedRef, Ref } from "vue";
import {
    useDragMorph,
    type DragMorphSnapTarget,
    type UseDragMorphReturn,
} from "../../../composables/motion/useDragMorph";
import {
    effectiveCap,
    writeVelocityWeight,
} from "../../../composables/motion/core/writeVelocityWeight";
import { DEFAULT_INDICATOR_MAX_STRETCH } from "../constants";
import type { SegmentedTabOption } from "../SegmentedTabs.vue";

/**
 * Package-private composable for `SegmentedTabs.vue` — BB.W-DRAG-MORPH, the LIQUID
 * TAB (the `:draggable` axis). Carved out of the SFC at BB.W-CARVE4 to hold the
 * no-god-module bound, mirroring the `useTabIndicator` colocation sibling; the SFC
 * IMPORTS it and binds only its state; the shared morph owner writes geometry.
 *
 * When `:draggable`, the `pill` indicator is wired to `useDragMorph` with the snap
 * targets resolved off the CENTER-ANCHORED button geometry (the SAME measure
 * `useTabIndicator` runs — reused, never re-measured). Dragging the indicator follows
 * the finger, squishes on velocity, and flings to the nearest tab center on release →
 * `onSnap` writes the `model`. The drag is the `pill` material ONLY (the `underline`
 * ink hairline has no `indicatorRef` element to deform). The squish reads the SAME
 * `--tab-indicator-max-stretch` live cap the click squish does (the SOLE cap source);
 * the drag's `--stretch` write composes the existing reciprocal CSS pairing — no
 * second squish recipe.
 */
export interface UseTabDragMorphParams {
    /** The active indicator element (the drag follow + squish target). */
    indicatorRef: Ref<HTMLElement | null>;
    /** True for the vertical (block-axis) orientation. */
    isVertical: ComputedRef<boolean>;
    /** True for the underline material (drag is a no-op there). */
    isUnderline: ComputedRef<boolean>;
    /** The `:draggable` prop (ADDITIVE, default false). */
    draggable: () => boolean;
    /** The strip's rendered options (the snap targets + the refresh trigger). */
    stripOptions: ComputedRef<SegmentedTabOption[]>;
    /** Per-option button refs, index-aligned to `stripOptions`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The single-select model — the fling-to-nearest commits the selection. */
    model: Ref<string | undefined>;
}

export interface UseTabDragMorphReturn {
    /** True when the drag is live (the `pill` material + the `:draggable` prop). */
    dragEnabled: ComputedRef<boolean>;
    /** The `useDragMorph` handle (the SFC binds its gesture state). */
    drag: UseDragMorphReturn;
}

export function useTabDragMorph(
    params: UseTabDragMorphParams,
): UseTabDragMorphReturn {
    const {
        indicatorRef,
        isVertical,
        isUnderline,
        draggable,
        stripOptions,
        buttonRefs,
        model,
    } = params;

    const dragEnabled = computed(() => draggable() && !isUnderline.value);

    // BD.W-MOTION-WEIGHT — the drag squish cap is derived SITE-LOCALLY off the live
    // `--motion-weight` read at the indicator (the spike-corrected mechanism): the
    // shipped `--tab-indicator-max-stretch` token at rest weight 0.618, 1.0 at
    // weight 0. Reads the EXISTING token directly — no `--*-stretch-k` cohort.
    function readMaxStretch(): number {
        const el = indicatorRef.value;
        if (!el) return DEFAULT_INDICATOR_MAX_STRETCH;
        const raw = getComputedStyle(el)
            .getPropertyValue("--tab-indicator-max-stretch")
            .trim();
        const capToken = Number(raw) || DEFAULT_INDICATOR_MAX_STRETCH;
        return effectiveCap(el, capToken);
    }

    // The snap targets — the center-anchored button centers on the active axis. kf
    // `Draggable` tracks CLIENT-space pointer coords (`clientX`/`clientY`), so the snap
    // centers are resolved in the SAME client space (`getBoundingClientRect`) — the
    // nearest-snap resolution + the `decayRest` projection compare like spaces (the
    // center-anchor geometry the same as `useTabIndicator`, in client coords).
    function resolveSnapTargets(): DragMorphSnapTarget<string>[] {
        return stripOptions.value.map((o, idx) => {
            const btn = buttonRefs.value[idx];
            const r = btn?.getBoundingClientRect();
            const center = r
                ? isVertical.value
                    ? r.top + r.height / 2
                    : r.left + r.width / 2
                : 0;
            return { value: o.value, center };
        });
    }

    const drag = useDragMorph<string>({
        handle: indicatorRef,
        axis: () => (isVertical.value ? "y" : "x"),
        snapTargets: resolveSnapTargets,
        maxStretch: readMaxStretch,
        onSnap: (value) => {
            // The fling-to-nearest commits the selection — the consumer model is the
            // single source of truth (no shadow). The click-travel squish does not fire
            // here (the drag owns its own squish via `useDragMorph`).
            if (model.value !== value) model.value = value;
        },
    });

    // The drag `--stretch` write rides the indicator's OWN `--stretch` custom property
    // (the SAME var the click squish writes — ONE source of truth). While dragging, the
    // drag owns `--stretch`; on settle the value relaxes to 1 (the normalized-position
    // drive decays). PRM zeroes the write (the `stretch` read is 1 under reduce).
    watch(
        () => [drag.dragging.value, drag.stretch.value] as const,
        ([isDragging, stretch]) => {
            const el = indicatorRef.value;
            if (!el || !dragEnabled.value) return;
            if (isDragging) {
                el.style.setProperty("--stretch", String(stretch));
                // BD.W-MOTION-WEIGHT (§2c) — recover the saturating velocity term from
                // the tanh-law stretch (`stretch = 1 + tanh(v·k)·(cap−1)`, so
                // `flexVel = (stretch−1)/(cap−1)`) and fold it into the transient
                // `--motion-weight` boost on the indicator, so a fast fling deepens its
                // own squish. The cap here is the EFFECTIVE cap (already weight-scaled),
                // which is correct: at weight→0 the cap→1 so the boost term vanishes too.
                const cap = readMaxStretch();
                const flexVel = cap > 1 ? (stretch - 1) / (cap - 1) : 0;
                writeVelocityWeight(el, flexVel);
            } else {
                el.style.removeProperty("--stretch");
                // The boost self-extinguishes back to rest weight on settle.
                writeVelocityWeight(el, 0);
            }
        },
    );

    // BI.W-DRAG-REATTACH (Kill A) — arm `reattach` on the LIVE indicator element.
    // `useDragMorph.reattach()` runs ONCE in setup, PRE-MOUNT, when `indicatorRef` is
    // still null — the early-return leaves the `Draggable` UNBUILT — and nothing re-arms
    // it: on mount `dragEnabled`/`stripOptions.length`/`isVertical` are all STABLE (the
    // pill is `motion:full` → `dragEnabled` is born true, the option count and axis do
    // not change), so a NON-immediate watch never fires with a live element and the drag
    // stays dead. Watching the indicator ELEMENT itself (`indicatorRef.value`) with
    // `{ immediate: true }` gives `reattach` its first LIVE call the tick the element
    // resolves (the immediate run is a null-guarded no-op; the null→element transition
    // fires the real arm), and re-resolves the snap centers on every option/orientation
    // change (a resize re-resolves via the same `refresh` on the next re-arm). `refresh`
    // is a no-op mid-gesture + a no-op on a null node, so the immediate arm is safe.
    watch(
        () =>
            [
                indicatorRef.value,
                stripOptions.value.length,
                isVertical.value,
                dragEnabled.value,
            ] as const,
        () => {
            if (dragEnabled.value && indicatorRef.value) {
                nextTick(() => drag.refresh());
            }
        },
        { immediate: true },
    );

    return { dragEnabled, drag };
}
