import { computed, watch, nextTick } from "vue";
import type { ComputedRef, Ref } from "vue";
import {
    useDragMorph,
    type DragMorphSnapTarget,
    type UseDragMorphReturn,
} from "../../../composables/motion/morph/useDragMorph";
import type { SegmentedTabOption } from "../types";

/**
 * Package-private composable for `SegmentedTabs.vue` — the LIQUID
 * TAB (the `:draggable` axis). A composable held under the
 * no-god-module bound, beside the `useTabIndicator` colocation sibling; the SFC
 * IMPORTS it and binds only its state; the shared morph owner writes geometry.
 *
 * When `:draggable`, the `pill` indicator is wired to `useDragMorph` with the snap
 * targets resolved off the CENTER-ANCHORED button geometry (the SAME measure
 * `useTabIndicator` runs — reused, never re-measured). Dragging the indicator follows
 * the finger and flings to the nearest tab center on release → `onSnap` writes the
 * `model`. The drag is the `pill` material ONLY. The indicator keeps its size while
 * it follows: no velocity squish is written.
 */
export interface UseTabDragMorphParams {
    /** The active indicator element (the drag follow target). */
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
        onSnap: (value) => {
            // The fling-to-nearest commits the selection — the consumer model is the
            // single source of truth (no shadow). The click-travel squish does not fire
            // here (the drag owns its own squish via `useDragMorph`).
            if (model.value !== value) model.value = value;
        },
    });

    // Arm `reattach` on the live indicator element.
    // `useDragMorph.reattach()` runs ONCE in setup, PRE-MOUNT, when `indicatorRef` is
    // still null — the early-return leaves the `Draggable` UNBUILT — and nothing re-arms
    // it: on mount `dragEnabled`/`stripOptions.length`/`isVertical` are all STABLE (the
    // pill is `motion:full` → `dragEnabled` is born true, the option count and axis do
    // not change), so a NON-immediate watch never fires with a live element and the drag
    // stays dead. Watching the indicator ELEMENT itself (`indicatorRef.value`) with
    // `{ immediate: true }` gives `reattach` its first LIVE call the tick the element
    // resolves (the immediate run is a null-guarded no-op; the null→element transition
    // fires the real arm), and re-arms on every option/orientation change (the snap
    // centers themselves are re-read at each press). `refresh` is a no-op mid-gesture +
    // a no-op on a null node, so the immediate arm is safe.
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
