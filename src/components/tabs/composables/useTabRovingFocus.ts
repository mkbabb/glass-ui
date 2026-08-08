import { computed, ref, watch } from "vue";
import type { ComputedRef, Ref } from "vue";
import type { SelectionValue } from "../../_shared/selection";

/**
 * The minimal roving option shape reads only `value` + `disabled`, decoupling it
 * from `SegmentedTabOption` so the shared
 * headless `useSelectionGroup` can compose it VERBATIM over its generic option
 * type). Any richer option (the tabs' `SegmentedTabOption`) is structurally
 * assignable.
 *
 * Generic in the value scalar, defaulting to `string` (BK #84 C-1). The machine
 * only compares values with `===` and interpolates them into a reset key, so it is
 * indifferent to which scalar it carries — but a callback parameter is
 * contravariant, so `select` could not simply be widened in place without breaking
 * every narrower caller. The type variable is what lets `<ToggleGroup>` pass
 * `SelectionValue` and `<SegmentedTabs>` keep `string`, from one machine.
 */
export interface RovingSelectionOption<V extends SelectionValue = string> {
    value: V;
    disabled?: boolean;
}

export type TabActivation = "automatic" | "manual";

/**
 * Package-private composable for `SegmentedTabs.vue` (the
 * roving-focus/responsive carve). The WAI-ARIA tablist/toolbar
 * roving-tabindex keyboard machine lives here, held under the
 * no-god-module bound. It is composed VERBATIM inside the shared
 * headless `useSelectionGroup` (the dock IS SegmentedTabs/ToggleGroup wearing
 * chrome — ONE roving machine, never re-forked). The SFC IMPORTS it and binds
 * `:tabindex="rovingTabindex(idx)"` + `@keydown="onStripKeydown"` in its template.
 *
 * EXACTLY ONE tab remains in the focus order. Automatic activation keeps that tabstop
 * on the selection; manual activation moves it independently and commits only on
 * Enter/Space. The arrow axis derives from `isVertical`, Home/End jump, navigation
 * wraps, and disabled options are skipped. This keyboard contract is never gated by
 * pointer motion.
 */
export interface UseTabRovingFocusParams<V extends SelectionValue = string> {
    /** The options the strip renders (index-aligned to `buttonRefs`). */
    stripOptions: ComputedRef<readonly RovingSelectionOption<V>[]>;
    /** The value the strip renders (the ONE tabstop anchor). */
    stripValue: ComputedRef<V | undefined>;
    /** True for the vertical (block-axis) orientation — flips the arrow axis. */
    isVertical: ComputedRef<boolean>;
    /** Automatic selection-follows-focus or manual Enter/Space activation. */
    activation: ComputedRef<TabActivation>;
    /** Per-option button refs, index-aligned to `stripOptions`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The SFC's selection handler (focus-follows activation → model write + squish). */
    select: (value: V, idx: number) => void;
}

export interface UseTabRovingFocusReturn {
    /** The selected index in the rendered strip. */
    activeIndex: ComputedRef<number>;
    /** The roving tabindex for option `idx`: exactly one `0`, all others `-1`. */
    rovingTabindex: (idx: number) => number;
    /** The strip-root keydown handler (axis-derived arrows + Home/End). */
    onStripKeydown: (e: KeyboardEvent) => void;
}

export function useTabRovingFocus<V extends SelectionValue = string>(
    params: UseTabRovingFocusParams<V>,
): UseTabRovingFocusReturn {
    const { stripOptions, stripValue, isVertical, activation, buttonRefs, select } =
        params;

    // The selected index in the rendered strip. If selection is absent or disabled,
    // anchor roving focus on the first enabled item; a fully-disabled strip has no
    // dishonest tab stop.
    const activeIndex = computed(() => {
        const idx = stripOptions.value.findIndex(
            (o) => o.value === stripValue.value,
        );
        if (idx >= 0 && !stripOptions.value[idx]?.disabled) return idx;
        return stripOptions.value.findIndex((option) => !option.disabled);
    });

    const focusedIndex = ref(activeIndex.value);
    const focusResetKey = computed(() =>
        [
            stripValue.value ?? "",
            ...stripOptions.value.map(
                (option) => `${option.value}:${option.disabled ? "1" : "0"}`,
            ),
        ].join("\u0000"),
    );
    watch(
        focusResetKey,
        () => {
            // A controlled selection update must not steal manual focus already
            // inside the strip. Outside the strip, the next Tab entry follows the
            // newly-selected (or first enabled) item.
            const activeElement =
                typeof document === "undefined" ? null : document.activeElement;
            const domIndex = buttonRefs.value.findIndex(
                (button, index) =>
                    button === activeElement && !stripOptions.value[index]?.disabled,
            );
            focusedIndex.value = domIndex >= 0 ? domIndex : activeIndex.value;
        },
        { flush: "post" },
    );

    const tabstopIndex = computed(() =>
        activation.value === "manual" &&
        focusedIndex.value >= 0 &&
        !stripOptions.value[focusedIndex.value]?.disabled
            ? focusedIndex.value
            : activeIndex.value,
    );

    // The roving tabindex follows selection automatically or focus in manual mode.
    function rovingTabindex(idx: number): number {
        return idx === tabstopIndex.value ? 0 : -1;
    }

    function focusOption(idx: number) {
        const option = stripOptions.value[idx];
        if (!option || option.disabled) return;
        focusedIndex.value = idx;
        buttonRefs.value[idx]?.focus();
        if (activation.value === "automatic") select(option.value, idx);
    }

    // Move focus to (and activate) the next enabled tab in `dir` (+1/-1), wrapping.
    function focusEnabled(fromIdx: number, dir: 1 | -1) {
        const n = stripOptions.value.length;
        if (n === 0) return;
        for (let step = 1; step <= n; step++) {
            const idx = (fromIdx + dir * step + n * step) % n;
            const option = stripOptions.value[idx];
            if (option && !option.disabled) {
                focusOption(idx);
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
                focusOption(idx);
                return;
            }
        }
    }

    function onStripKeydown(e: KeyboardEvent) {
        const targetIndex = buttonRefs.value.indexOf(e.target as HTMLElement);
        const from =
            targetIndex >= 0 && !stripOptions.value[targetIndex]?.disabled
                ? targetIndex
                : tabstopIndex.value;
        // Axis-derived next/prev keys: vertical strips navigate on the BLOCK axis
        // (ArrowDown/Up), horizontal on the INLINE axis (ArrowRight/Left).
        const nextKey = isVertical.value ? "ArrowDown" : "ArrowRight";
        const prevKey = isVertical.value ? "ArrowUp" : "ArrowLeft";
        const currentTarget = e.currentTarget as HTMLElement | null;
        const computedDirection = currentTarget
            ? getComputedStyle(currentTarget).direction
            : "";
        const declaredDirection = currentTarget
            ?.closest<HTMLElement>("[dir]")
            ?.getAttribute("dir")
            ?.toLowerCase();
        const rtl =
            !isVertical.value &&
            (computedDirection === "rtl" || declaredDirection === "rtl");
        const nextDirection: 1 | -1 = rtl ? -1 : 1;
        switch (e.key) {
            case nextKey:
                e.preventDefault();
                focusEnabled(from, nextDirection);
                break;
            case prevKey:
                e.preventDefault();
                focusEnabled(from, nextDirection === 1 ? -1 : 1);
                break;
            case "Home":
                e.preventDefault();
                focusEdge("first");
                break;
            case "End":
                e.preventDefault();
                focusEdge("last");
                break;
            case "Enter":
            case " ": {
                if (activation.value !== "manual") break;
                e.preventDefault();
                const option = stripOptions.value[from];
                if (option && !option.disabled) {
                    focusedIndex.value = from;
                    select(option.value, from);
                }
                break;
            }
            default:
                break;
        }
    }

    return { activeIndex, rovingTabindex, onStripKeydown };
}
