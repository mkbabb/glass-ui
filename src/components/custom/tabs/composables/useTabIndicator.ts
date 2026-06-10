import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    nextTick,
    type Ref,
    type ComputedRef,
} from "vue";
import type { SegmentedTabOption } from "../SegmentedTabs.vue";
import { DEFAULT_INDICATOR_MAX_STRETCH, INDICATOR_RELEASE_MS } from "../constants";
// `import type` keeps this type-only reference out of the runtime graph, so the
// SFC ↔ composable edge never forms a runtime require cycle.

/**
 * Package-private composable for `SegmentedTabs.vue` — owns the JS-measured
 * indicator path: the single- and multi-select slider styles, the offset
 * measure, the model/options re-measure watchers, and the ResizeObserver
 * lifecycle. It ALSO owns the AX.W53 travel-squish: a velocity-driven,
 * volume-preserving `--stretch` scalar the active indicator reads so it
 * STRETCHES along its travel axis as it glides between tabs and settles to fit
 * (the Material 3 ELASTIC / Apple Liquid-Glass register, capped LOW).
 *
 * The composable is the SOLE writer of the JS slider styles. The measure path
 * runs only on the multi-select OR `@supports not (anchor)` branch — on an
 * anchor-supporting single-select engine the CSS `anchor-name` owns the slider
 * position and that path stays dormant (no RO is constructed, no measure runs).
 * The squish is independent of the position path: it is a transient `--stretch`
 * write driven on EVERY selection (anchor or JS engine) and reads from
 * `--tab-indicator-max-stretch`, so the elastic warp lands on all three
 * variants. Honors `prefers-reduced-motion` (no squish under reduce).
 */
export interface UseTabIndicatorParams {
    /** The container scroller root (observed by the ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /** The active indicator element (the squish `--stretch` write target). */
    indicatorRef: Ref<HTMLElement | null>;
    /** Per-option button refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The tab options (re-measure on change). */
    options: ComputedRef<SegmentedTabOption[]>;
    /** The defineModel value (re-measure on change). */
    model: Ref<string | string[] | undefined>;
    /** True for the multi-select path. */
    multiSelect: ComputedRef<boolean>;
    /** Whether the browser supports CSS anchor positioning. */
    anchorSupported: boolean;
    /** True when ANY JS slider writer is live (gates RO/watcher attach). */
    jsSliderActive: ComputedRef<boolean>;
    /** The active option values (used by the multi-slider measure). */
    activeValues: ComputedRef<string[]>;
}

export interface UseTabIndicatorReturn {
    /** Inline style for the single-select JS slider. */
    singleSliderStyle: Ref<Record<string, string>>;
    /** Inline styles for each active multi-select slider, keyed by value. */
    multiSliderStyles: Ref<Record<string, Record<string, string>>>;
    /** Imperatively kick the travel-squish on a selection at `idx`. */
    squishOnTravel: (toIdx: number) => void;
}

export function useTabIndicator(
    params: UseTabIndicatorParams,
): UseTabIndicatorReturn {
    const {
        containerRef,
        indicatorRef,
        buttonRefs,
        options,
        model,
        multiSelect,
        anchorSupported,
        jsSliderActive,
        activeValues,
    } = params;

    // ── Single-select slider style (JS fallback path only) ──

    const singleSliderStyle = ref<Record<string, string>>({
        width: "0px",
        transform: "translateX(0px)",
        opacity: "0",
    });

    function updateSingleSlider() {
        if (multiSelect.value || anchorSupported) return;
        const idx = options.value.findIndex(
            (o) => o.value === (model.value as string),
        );
        if (idx < 0 || !buttonRefs.value[idx]) return;
        const btn = buttonRefs.value[idx];
        singleSliderStyle.value = {
            width: `${btn.offsetWidth}px`,
            transform: `translateX(${btn.offsetLeft}px)`,
            opacity: "1",
        };
    }

    // ── Multi-select slider styles ──

    const multiSliderStyles = ref<Record<string, Record<string, string>>>({});

    function updateMultiSliders() {
        if (!multiSelect.value) return;
        const styles: Record<string, Record<string, string>> = {};
        for (const value of activeValues.value) {
            const optionIdx = options.value.findIndex((o) => o.value === value);
            const btn = buttonRefs.value[optionIdx];
            if (!btn) continue;
            styles[value] = {
                width: `${btn.offsetWidth}px`,
                transform: `translateX(${btn.offsetLeft}px)`,
                opacity: "1",
            };
        }
        multiSliderStyles.value = styles;
    }

    // ── Unified update ──

    function updateSliders() {
        if (multiSelect.value) {
            updateMultiSliders();
        } else {
            updateSingleSlider();
        }
    }

    // ── AX.W53 travel-squish ──
    //
    // On selection, the active indicator STRETCHES along the travel axis (X)
    // and compresses Y in inverse proportion (volume-preserving), then releases
    // back to 1 so the CSS glide settles it to fit. The stretch magnitude
    // scales with how FAR the indicator travels (a farther jump squishes more),
    // clamped at `--tab-indicator-max-stretch`. The write is to the indicator's
    // own `--stretch` custom property; the SFC's CSS pairs it reciprocally.
    //
    // Single-select only — the multi-select sliders (N simultaneous) do not
    // travel between anchors on selection (each pops in/out), so the squish is
    // scoped to the single shared indicator.

    let lastIdx = -1;
    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    function prefersReducedMotion() {
        return (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    function squishOnTravel(toIdx: number) {
        const el = indicatorRef.value;
        if (multiSelect.value || !el) {
            lastIdx = toIdx;
            return;
        }
        if (prefersReducedMotion()) {
            lastIdx = toIdx;
            return;
        }
        const fromBtn = buttonRefs.value[lastIdx];
        const toBtn = buttonRefs.value[toIdx];
        lastIdx = toIdx;
        // No prior anchor (first paint) or missing geometry — no squish.
        if (!fromBtn || !toBtn) return;

        // Travel distance in track-widths drives the stretch ratio. A neighbour
        // hop squishes a little; a far jump squishes up to the cap. Normalize by
        // the container width so the curve is geometry-relative, not pixel-bound.
        const containerW =
            containerRef.value?.offsetWidth ||
            (toBtn.offsetParent as HTMLElement | null)?.offsetWidth ||
            1;
        const travel = Math.abs(toBtn.offsetLeft - fromBtn.offsetLeft);
        const frac = containerW > 0 ? Math.min(travel / containerW, 1) : 0;

        // Resolve the cap from the cascade (default 1.08 if unset). `--stretch`
        // is 1 + frac · (cap − 1), so a full-width jump reaches the cap and a
        // tiny hop stays near 1.
        const cs = getComputedStyle(el);
        const capRaw = cs.getPropertyValue("--tab-indicator-max-stretch").trim();
        const cap = Number(capRaw) || DEFAULT_INDICATOR_MAX_STRETCH;
        const stretch = 1 + frac * (cap - 1);

        if (releaseTimer) clearTimeout(releaseTimer);
        // Open the stretch synchronously with the glide…
        el.style.setProperty("--stretch", String(stretch));
        // …and release it so the indicator shrinks back to fit (the Material
        // "grow then shrink" close). The release rides the same glide clock.
        releaseTimer = setTimeout(() => {
            el.style.setProperty("--stretch", "1");
            releaseTimer = null;
        }, INDICATOR_RELEASE_MS);
    }

    // ── Watchers (JS slider path only) ──
    // On the anchor path the CSS `anchor-name` follows `aria-pressed`
    // reactively, so no watcher-driven re-measure is needed.

    watch(
        () => model.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
        { deep: true },
    );
    watch(
        () => options.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
        { deep: true },
    );

    // ── Lifecycle ──
    //
    // The `ResizeObserver` + the initial measure attach ONLY when a JS slider
    // writer is live (multi-select, or single-select on a non-anchor engine).
    // On an anchor-supporting single-select engine the CSS owns the slider
    // position, so no RO is constructed and no measure runs — the AQ.W6
    // listener-count win. The initial `lastIdx` is seeded from the active option
    // so the FIRST selection squishes relative to the mounted position.

    let resizeObserver: ResizeObserver | null = null;

    onMounted(() => {
        lastIdx = options.value.findIndex(
            (o) => activeValues.value.includes(o.value),
        );
        if (!jsSliderActive.value) return;
        nextTick(updateSliders);
        if (containerRef.value) {
            resizeObserver = new ResizeObserver(() => updateSliders());
            resizeObserver.observe(containerRef.value);
        }
    });

    onUnmounted(() => {
        resizeObserver?.disconnect();
        if (releaseTimer) clearTimeout(releaseTimer);
    });

    return {
        singleSliderStyle,
        multiSliderStyles,
        squishOnTravel,
    };
}
