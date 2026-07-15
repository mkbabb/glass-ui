import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";

/**
 * The minimal roving option shape — the machine reads ONLY `value` + `disabled`
 * (BI.W-DOCK-CONTROLS decoupled it from `SegmentedTabOption` so the shared
 * headless `useSelectionGroup` can compose it VERBATIM over its generic option
 * type). Any richer option (the tabs' `SegmentedTabOption`) is structurally
 * assignable.
 */
export interface RovingSelectionOption {
    value: string;
    disabled?: boolean;
}

/**
 * Package-private composable for `SegmentedTabs.vue` — BG.W-COLOCATE (the WS4
 * roving-focus/responsive carve; ratchet-drain #13). The WAI-ARIA tablist/toolbar
 * roving-tabindex keyboard machine lives here, carved out of the SFC to hold the
 * no-god-module bound. BI.W-DOCK-CONTROLS composes it VERBATIM inside the shared
 * headless `useSelectionGroup` (the dock IS SegmentedTabs/ToggleGroup wearing
 * chrome — ONE roving machine, never re-forked). The SFC IMPORTS it and binds
 * `:tabindex="rovingTabindex(idx)"` + `@keydown="onStripKeydown"` in its template.
 *
 * EXACTLY ONE tab in the focus order (the active tab `tabindex="0"`, the rest `-1`);
 * the arrow keys move focus + activate (selection-follows-focus). The arrow AXIS is
 * derived off `isVertical` (ArrowRight/Left horizontal, ArrowDown/Up vertical),
 * Home/End jump, wrapping at the ends, skipping disabled. This is the keyboard contract
 * EVERY strip owes — NOT gated on `:draggable` (a draggable tab that is keyboard-broken
 * is the worse failure). The keyboard activation IS a selection → the SFC's `select(...)`
 * path (with its `squishOnTravel`), passed in as a callback (byte-behaviour identical to
 * the prior inline block).
 */
export interface UseTabRovingFocusParams {
    /** The options the strip renders (index-aligned to `buttonRefs`). */
    stripOptions: ComputedRef<readonly RovingSelectionOption[]>;
    /** The value the strip renders (the ONE tabstop anchor). */
    stripValue: ComputedRef<string | undefined>;
    /** True for the vertical (block-axis) orientation — flips the arrow axis. */
    isVertical: ComputedRef<boolean>;
    /** Per-option button refs, index-aligned to `stripOptions`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The SFC's selection handler (focus-follows activation → model write + squish). */
    select: (value: string, idx: number) => void;
}

export interface UseTabRovingFocusReturn {
    /** The active index in the rendered strip — the ONE tabstop. */
    activeIndex: ComputedRef<number>;
    /** The roving tabindex for option `idx`: `0` for the active tab, `-1` otherwise. */
    rovingTabindex: (idx: number) => number;
    /** The strip-root keydown handler (axis-derived arrows + Home/End). */
    onStripKeydown: (e: KeyboardEvent) => void;
}

export function useTabRovingFocus(
    params: UseTabRovingFocusParams,
): UseTabRovingFocusReturn {
    const { stripOptions, stripValue, isVertical, buttonRefs, select } = params;

    // The active index in the rendered strip — the ONE tabstop. Falls back to 0 so a
    // strip whose model points off the desktop subset still has a single focusable tab.
    const activeIndex = computed(() => {
        const idx = stripOptions.value.findIndex(
            (o) => o.value === stripValue.value,
        );
        return idx >= 0 ? idx : 0;
    });

    // The roving tabindex for option `idx`: `0` for the active tab, `-1` otherwise.
    function rovingTabindex(idx: number): number {
        return idx === activeIndex.value ? 0 : -1;
    }

    // Move focus to (and activate) the next enabled tab in `dir` (+1/-1), wrapping.
    function focusEnabled(fromIdx: number, dir: 1 | -1) {
        const n = stripOptions.value.length;
        if (n === 0) return;
        for (let step = 1; step <= n; step++) {
            const idx = (fromIdx + dir * step + n * step) % n;
            const option = stripOptions.value[idx];
            if (option && !option.disabled) {
                buttonRefs.value[idx]?.focus();
                select(option.value, idx);
                return;
            }
        }
    }

    // Move focus to (and activate) the first/last enabled tab.
    function focusEdge(edge: "first" | "last") {
        const n = stripOptions.value.length;
        const range =
            edge === "first"
                ? Array.from({ length: n }, (_, i) => i)
                : Array.from({ length: n }, (_, i) => n - 1 - i);
        for (const idx of range) {
            const option = stripOptions.value[idx];
            if (option && !option.disabled) {
                buttonRefs.value[idx]?.focus();
                select(option.value, idx);
                return;
            }
        }
    }

    function onStripKeydown(e: KeyboardEvent) {
        const from = activeIndex.value;
        // Axis-derived next/prev keys: vertical strips navigate on the BLOCK axis
        // (ArrowDown/Up), horizontal on the INLINE axis (ArrowRight/Left).
        const nextKey = isVertical.value ? "ArrowDown" : "ArrowRight";
        const prevKey = isVertical.value ? "ArrowUp" : "ArrowLeft";
        switch (e.key) {
            case nextKey:
                e.preventDefault();
                focusEnabled(from, 1);
                break;
            case prevKey:
                e.preventDefault();
                focusEnabled(from, -1);
                break;
            case "Home":
                e.preventDefault();
                focusEdge("first");
                break;
            case "End":
                e.preventDefault();
                focusEdge("last");
                break;
            default:
                break;
        }
    }

    return { activeIndex, rovingTabindex, onStripKeydown };
}
