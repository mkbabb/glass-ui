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
import {
    DEFAULT_INDICATOR_MAX_STRETCH,
    INDICATOR_RELEASE_AT_ARRIVAL,
} from "../constants";
// AZ.W-MORPH-SHOWCASE (W-LIQUID fold) — the indicator squish is the SECOND consumer
// of the shared `useLiquidFlex` primitive. The reciprocal-stretch cap-clamp + the
// `--stretch` value computation are the SHARED reconcile; the geometry-relative
// travel FRACTION (the load-bearing local detail) is fed via `squish(frac)` under
// the `"linear"` law so the write is byte-identical to the prior local
// `1 + frac·(cap−1)`. The composable owns no size span here (squish-only consumer).
import { useLiquidFlex } from "../../../../composables/motion/useLiquidFlex";
// `import type` keeps this type-only reference out of the runtime graph, so the
// SFC ↔ composable edge never forms a runtime require cycle.

/**
 * Package-private composable for `SegmentedTabs.vue` — owns the JS-measured
 * single-select indicator path: the slider style, the offset measure, the
 * model/options re-measure watchers, and the ResizeObserver lifecycle. It ALSO
 * owns the AX.W53 travel-squish: a velocity-driven, volume-preserving `--stretch`
 * scalar the active indicator reads so it STRETCHES along its travel axis as it
 * glides between tabs and settles to fit (the Material 3 ELASTIC / Apple
 * Liquid-Glass register, capped LOW).
 *
 * BA.W-TABS — the engine is AXIS-DERIVED (the `vertical` param): the JS slider
 * writes width/translateX on the inline axis (horizontal) OR height/translateY on
 * the block axis (vertical). It is CENTER-ANCHORED (the BA-VJS-3 / valuejs-fold A-5
 * fix): the indicator is positioned by its CENTER == the active button's center
 * (translate = buttonCenter − indicatorSize/2), so the squish (which scales from
 * `transform-origin: center`) keeps the indicator center pinned to the label
 * center — the prior `translateX(offsetLeft)` left-edge write is GONE.
 *
 * The composable is the SOLE writer of the JS slider style. The measure path runs
 * only on the `@supports not (anchor)` branch — on an anchor-supporting engine the
 * CSS `anchor-name` owns the slider position and that path stays dormant (no RO is
 * constructed, no measure runs). The squish is independent of the position path: it
 * is a transient `--stretch` write driven on EVERY selection (anchor or JS engine)
 * and reads from `--tab-indicator-max-stretch`, and RELEASES AT ARRIVAL (keyed to
 * the calibrated clock, not a fixed mid-glide timer). Honors
 * `prefers-reduced-motion` (no squish under reduce). The underline material SLIDES
 * (no squish — a hairline does not deform), gated by the `vertical`/underline
 * early-return at the SFC's `squishOnTravel` call shape (the underline has no
 * `indicatorRef` element).
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
    model: Ref<string | undefined>;
    /** Whether the browser supports CSS anchor positioning. */
    anchorSupported: boolean;
    /** True when the JS slider writer is live (gates RO/watcher attach). */
    jsSliderActive: ComputedRef<boolean>;
    /** The active option values (used by the measure). */
    activeValues: ComputedRef<string[]>;
    /** True for the vertical (block-axis) orientation. */
    vertical: ComputedRef<boolean>;
}

export interface UseTabIndicatorReturn {
    /** Inline style for the single-select JS slider. */
    singleSliderStyle: Ref<Record<string, string>>;
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
        anchorSupported,
        jsSliderActive,
        activeValues,
        vertical,
    } = params;

    // ── Single-select slider style (JS fallback path only) ──

    const singleSliderStyle = ref<Record<string, string>>({
        width: "0px",
        transform: "translateX(0px)",
        opacity: "0",
    });

    function updateSingleSlider() {
        if (anchorSupported) return;
        const idx = options.value.findIndex(
            (o) => o.value === (model.value as string),
        );
        if (idx < 0 || !buttonRefs.value[idx]) return;
        const btn = buttonRefs.value[idx];
        if (vertical.value) {
            // Block axis — the indicator spans the button's height, centered on
            // the button's vertical center (BA-VJS-3: center-anchored, never the
            // raw `offsetTop` left-edge write).
            const h = btn.offsetHeight;
            const centerY = btn.offsetTop + h / 2;
            singleSliderStyle.value = {
                height: `${h}px`,
                width: "",
                transform: `translateY(${centerY - h / 2}px)`,
                opacity: "1",
            };
        } else {
            // Inline axis — span the button's width, centered on its horizontal
            // center (BA-VJS-3 center-correction; algebraically `offsetLeft` but
            // expressed via the center so the squish stays pinned).
            const w = btn.offsetWidth;
            const centerX = btn.offsetLeft + w / 2;
            singleSliderStyle.value = {
                width: `${w}px`,
                height: "",
                transform: `translateX(${centerX - w / 2}px)`,
                opacity: "1",
            };
        }
    }

    // ── Unified update ──

    function updateSliders() {
        updateSingleSlider();
    }

    // ── AX.W53 travel-squish (release-at-arrival, BA.W-TABS) ──
    //
    // On selection, the active indicator STRETCHES along the travel axis and
    // compresses the cross axis in inverse proportion (volume-preserving), then
    // releases back to 1 so the CSS glide settles it to fit. The stretch magnitude
    // scales with how FAR the indicator travels (a farther jump squishes more),
    // clamped at `--tab-indicator-max-stretch`. The write is to the indicator's
    // own `--stretch` custom property; the SFC's CSS pairs it reciprocally.
    //
    // The release fires AT ARRIVAL — keyed to the calibrated clock
    // (`--tab-indicator-duration`) scaled by `INDICATOR_RELEASE_AT_ARRIVAL`, so the
    // stretch peaks DURING travel and shrinks to fit when the glide is within the
    // arrival fraction of its target. The prior fixed `INDICATOR_RELEASE_MS = 60ms`
    // mid-glide timer (which fired BEFORE the ~100ms 90%-travel point) is GONE.

    let lastIdx = -1;
    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    // The shared liquid-flex squish (W-LIQUID consumer #2). Squish-only (no size
    // span — the indicator travels via CSS `inset`/`transform`, not this primitive):
    // the indicator feeds its geometry-relative travel FRACTION via `squish(frac)`
    // under the `"linear"` law. The cap is read LIVE from the cascade (the consumer's
    // `--tab-indicator-max-stretch` override) via the `capForSquish` getter, so the
    // primitive owns the cap-clamp + the reciprocal `--stretch` value while the
    // travel-fraction stays the indicator's load-bearing local detail. The resulting
    // `--stretch` write is byte-identical to the prior local `1 + frac·(cap−1)`.
    let capForSquish = DEFAULT_INDICATOR_MAX_STRETCH;
    const liquidSquish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width",
        squishLaw: "linear",
        maxStretch: () => capForSquish,
    });

    function prefersReducedMotion() {
        return (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    // Resolve the calibrated clock (ms) from the cascade so the release lands at
    // ARRIVAL, not a fixed mid-glide timer. `--tab-indicator-duration` resolves to
    // a `<time>` (e.g. `0.34s`); parse it to ms with a sane fallback.
    function clockMs(el: HTMLElement): number {
        const raw = getComputedStyle(el)
            .getPropertyValue("--tab-indicator-duration")
            .trim();
        if (!raw) return 340;
        if (raw.endsWith("ms")) return Number.parseFloat(raw) || 340;
        if (raw.endsWith("s")) return (Number.parseFloat(raw) || 0.34) * 1000;
        return Number.parseFloat(raw) || 340;
    }

    function squishOnTravel(toIdx: number) {
        const el = indicatorRef.value;
        if (!el) {
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

        // Travel distance on the active axis drives the stretch ratio. A neighbour
        // hop squishes a little; a far jump squishes up to the cap. Normalize by
        // the container extent so the curve is geometry-relative, not pixel-bound.
        const axisExtent = vertical.value
            ? containerRef.value?.offsetHeight ||
              (toBtn.offsetParent as HTMLElement | null)?.offsetHeight ||
              1
            : containerRef.value?.offsetWidth ||
              (toBtn.offsetParent as HTMLElement | null)?.offsetWidth ||
              1;
        const travel = vertical.value
            ? Math.abs(toBtn.offsetTop - fromBtn.offsetTop)
            : Math.abs(toBtn.offsetLeft - fromBtn.offsetLeft);
        const frac = axisExtent > 0 ? Math.min(travel / axisExtent, 1) : 0;

        // Resolve the cap from the cascade (default 1.08 if unset) into the shared
        // primitive's live-cap getter, then feed the travel FRACTION to the squish.
        // `useLiquidFlex` (linear law) computes `--stretch` = 1 + frac·(cap − 1),
        // capped — byte-identical to the prior local write — so a full-width jump
        // reaches the cap and a tiny hop stays near 1.
        const cs = getComputedStyle(el);
        const capRaw = cs.getPropertyValue("--tab-indicator-max-stretch").trim();
        capForSquish = Number(capRaw) || DEFAULT_INDICATOR_MAX_STRETCH;
        liquidSquish.squish(frac);

        if (releaseTimer) clearTimeout(releaseTimer);
        // Open the stretch synchronously with the glide…
        el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
        // …and release it so the indicator shrinks back to fit (the Material
        // "grow then shrink" close) AT ARRIVAL — the release fires when the glide
        // is within the arrival fraction of its target (the calibrated clock ×
        // `INDICATOR_RELEASE_AT_ARRIVAL`), so the peak stretch reads DURING travel
        // and the shrink punctuates arrival, never mid-glide.
        const releaseAt = clockMs(el) * INDICATOR_RELEASE_AT_ARRIVAL;
        releaseTimer = setTimeout(() => {
            liquidSquish.squish(0);
            el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
            releaseTimer = null;
        }, releaseAt);
    }

    // ── Watchers (JS slider path only) ──
    // On the anchor path the CSS `anchor-name` follows `aria-pressed`/`aria-selected`
    // reactively, so no watcher-driven re-measure is needed.

    watch(
        () => model.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
    );
    watch(
        () => options.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
        { deep: true },
    );
    watch(
        () => vertical.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
    );

    // ── Lifecycle ──
    //
    // The `ResizeObserver` + the initial measure attach ONLY when the JS slider
    // writer is live (single-select on a non-anchor engine). On an anchor-supporting
    // engine the CSS owns the slider position, so no RO is constructed and no
    // measure runs — the AQ.W6 listener-count win. The initial `lastIdx` is seeded
    // from the active option so the FIRST selection squishes relative to the mounted
    // position.

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
        squishOnTravel,
    };
}
