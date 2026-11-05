import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    nextTick,
    type Ref,
    type ComputedRef,
} from "vue";
// The library's ONE scalar selection identity, imported `type`-only so it is erased
// at emit — `/motion-core` still ships zero component-tree BYTES (BK #84 C-1). The
// alternative was a second spelling of `string | number` living here, which the
// grammar law forbids outright.
import type { SelectionValue } from "../../../components/_shared/selection";

/**
 * useSelectionIndicator is the library's single traveling-indicator writer. The dock
 * is SegmentedTabs/ToggleGroup wearing chrome, so the indicator that glides under the active
 * selection is factored ONCE here on `/motion-core` and consumed by every
 * selection surface (SegmentedTabs pill, the dock control run, the
 * ToggleGroup single-select arm) — never re-forked.
 *
 * The indicator always measures via `ResizeObserver` + a center-anchored transform,
 * so the same code paints the same pixels on every engine. There is exactly ONE
 * indicator writer in the library.
 *
 * It owns the JS-measured single-select slider style (the slider geometry, the
 * offset measure, the model/options re-measure watchers, the RO lifecycle). The
 * indicator glides by CSS on the inline `translate`/`width`/`height` this writes, at
 * its own size: nothing here deforms it. The velocity `--stretch` law it once wrote
 * (the `plate` and `mark` deforms, the `--tab-indicator-max-stretch` cap) is gone
 * with its last consumer.
 *
 * The writer emits the selected item's full physical border box from the
 * container's padding-box origin. Measuring both axes keeps the resting fill
 * exact across orientation, fractional geometry, and writing direction; a change
 * of `vertical` re-measures.
 *
 * Generic over the minimal `SelectionOption` shape (`value` + optional
 * `disabled`), so it is decoupled from any consumer's option type. ~~the
 * `/motion-core` home carries no component-tree import.~~
 * [2026-08-08 · BK #84 C-1: it carries exactly one, `import type { SelectionValue }`,
 * and the claim is restated at the level that is actually load-bearing — no
 * component-tree RUNTIME import. A `type` import is erased at emit, so the
 * `/motion-core` chunk's bytes are unchanged; what changed is that the scalar
 * identity is now named once in the library instead of respelled here.]
 */

/**
 * The minimal option shape the indicator measures against.
 *
 * `value` is the library's `SelectionValue` (BK #84 C-1). It used to be `string`,
 * which is why `<ToggleGroup>` — whose public value has been `string | number`
 * since it shipped — could not compose this engine without narrowing its own
 * surface. Widening here rather than narrowing there is the direction C-1 ruled:
 * the engine only ever compares the value with `===` and interpolates it into a
 * reset key, so it never needed the narrower type in the first place.
 */
export interface SelectionOption {
    value: SelectionValue;
    disabled?: boolean;
}

export interface UseSelectionIndicatorParams<O extends SelectionOption> {
    /** The container scroller root (observed by the ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /** The active indicator element (the measured node). */
    indicatorRef: Ref<HTMLElement | null>;
    /** Per-option item refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The selectable options (re-measure on change). */
    options: ComputedRef<O[]>;
    /** The active value (re-measure on change), at the option type's own scalar. */
    model: Ref<O["value"] | undefined>;
    /** True for the vertical (block-axis) orientation. */
    vertical: ComputedRef<boolean>;
}

export interface UseSelectionIndicatorReturn {
    /** Inline style for the single-select JS slider — the ONE writer. */
    singleSliderStyle: Ref<Record<string, string>>;
}

export function useSelectionIndicator<O extends SelectionOption>(
    params: UseSelectionIndicatorParams<O>,
): UseSelectionIndicatorReturn {
    const { containerRef, indicatorRef, buttonRefs, options, model, vertical } = params;

    // ── The single-select slider style (the ONE JS writer — no anchor branch) ──

    const singleSliderStyle = ref<Record<string, string>>({
        left: "0px",
        top: "0px",
        width: "0px",
        height: "0px",
        translate: "0px 0px",
        opacity: "0",
    });

    function updateSingleSlider() {
        // RT-84O — THE DEAD MEASURE, ECONOMIZED AT ITS SOURCE. Everything this
        // function produces lands in `singleSliderStyle`, and the only thing that has
        // ever painted that style is the indicator element itself: both consumers
        // that read it bind it to the very node they hand back as `indicatorRef`
        // (`SegmentedTabs.vue:361/375`, `DockLayerGroup.vue:266/272`). With no
        // element there is no painter, so the two `getBoundingClientRect()` calls
        // below — one pair per mount and one per ResizeObserver callback, on every
        // plain toggle row in the library — were forcing layout into a value nobody
        // could read.
        //
        // THIS IS ONLY SAYABLE BECAUSE THE SENTINEL WAS DE-OVERLOADED. `indicatorRef`
        // used to mean two things at once — "this group has no single slider" to
        // `useSelectionGroup` and "this material does not squish" here — so acting on
        // either meaning lied about the other. What is left means exactly one thing:
        // whether an indicator element exists.
        //
        // The `ResizeObserver` still attaches UNCONDITIONALLY. The Safari-identical
        // guarantee is about there being one measure PATH, not about running it into
        // nothing.
        //
        // AND A STRIP THAT APPEARS LATE IS STILL MEASURED, because of a structural
        // fact rather than a second watcher: the indicator is a CHILD of the
        // container in both consumers that read the style (`SegmentedTabs.vue:333`
        // holds `containerRef` on the strip root and `:361` the indicator inside it;
        // `DockLayerGroup.vue:225` and `:266` the same), so the two elements can only
        // arrive together, and the `containerRef` watcher below already re-measures
        // on arrival. A watcher on `indicatorRef` was written here first and struck
        // as speculative — it greened nothing the container watcher did not, and a
        // guard against a shape the library does not have is a shape nobody
        // maintains. The arrival path is held by a case rather than by an assumption
        // (`tests/composables/motion/useSelectionIndicator.test.ts`).
        if (!indicatorRef.value) return;

        const idx = options.value.findIndex((o) => o.value === model.value);
        const container = containerRef.value;
        if (idx < 0) {
            singleSliderStyle.value = {
                ...singleSliderStyle.value,
                opacity: "0",
            };
            return;
        }
        if (!container || !buttonRefs.value[idx]) {
            singleSliderStyle.value = {
                ...singleSliderStyle.value,
                opacity: "0",
            };
            return;
        }
        const btn = buttonRefs.value[idx];
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const x =
            btnRect.left -
            containerRect.left -
            container.clientLeft +
            container.scrollLeft;
        const y =
            btnRect.top - containerRect.top - container.clientTop + container.scrollTop;
        singleSliderStyle.value = {
            left: "0px",
            top: "0px",
            width: `${btnRect.width}px`,
            height: `${btnRect.height}px`,
            translate: `${x}px ${y}px`,
            opacity: "1",
        };
    }

    function updateSliders() {
        updateSingleSlider();
    }

    // ── Watchers (the ONE writer re-measures on every model/options/axis change) ──

    watch(
        () => model.value,
        () => nextTick(updateSliders),
    );
    watch(
        () => options.value,
        () => nextTick(updateSliders),
        { deep: true },
    );
    watch(
        () => vertical.value,
        () => nextTick(updateSliders),
    );

    // ── Lifecycle ──
    //
    // The `ResizeObserver` + the initial measure attach ALWAYS (the ONE writer,
    // no anchor gate — the Safari-identical guarantee).

    let resizeObserver: ResizeObserver | null = null;

    watch(
        containerRef,
        (container) => {
            resizeObserver?.disconnect();
            if (container) {
                resizeObserver = new ResizeObserver(updateSliders);
                resizeObserver.observe(container);
                nextTick(updateSliders);
            } else updateSliders();
        },
        { flush: "post" },
    );

    onMounted(() => {
        nextTick(updateSliders);
    });

    onUnmounted(() => {
        resizeObserver?.disconnect();
    });

    return { singleSliderStyle };
}
