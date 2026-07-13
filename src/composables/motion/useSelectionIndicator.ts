import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    nextTick,
    type Ref,
    type ComputedRef,
} from "vue";
// AZ.W-MORPH-SHOWCASE (W-LIQUID fold) — the indicator squish is a consumer of the
// shared `useLiquidFlex` primitive. The reciprocal-stretch cap-clamp + the `--stretch`
// value computation are the SHARED reconcile; the geometry-relative travel FRACTION
// (the load-bearing local detail) is fed via `squish(frac)` under the `"linear"` law.
import { useLiquidFlex } from "./useLiquidFlex";
import { effectiveCap, writeVelocityWeight } from "./core/writeVelocityWeight";

/**
 * useSelectionIndicator — the library's ONE traveling-indicator writer
 * (BI.W-DOCK-CONTROLS, promoted from the package-private `tabs/composables/
 * useTabIndicator.ts`). The dock IS SegmentedTabs/ToggleGroup wearing chrome
 * (PASS-1 §1 DOCK-D verdict), so the indicator that glides under the active
 * selection is factored ONCE here on `/motion-core` and consumed by every
 * selection surface (SegmentedTabs pill, the dock control run, the
 * ToggleGroup single-select arm) — never re-forked.
 *
 * THE ONE WRITER, SAFARI-IDENTICAL BY CONSTRUCTION (the C2 fold). The prior
 * dual path — a CSS `position-anchor` branch on supporting engines OR a JS
 * measured slider on the rest — meant Chrome and Safari rendered the indicator
 * through DIFFERENT code. This promotion RETIRES the CSS-anchor branch: the
 * indicator ALWAYS measures via `ResizeObserver` + a center-anchored transform,
 * so the same code paints the same pixels on every engine. There is exactly ONE
 * indicator writer in the library.
 *
 * It owns the JS-measured single-select slider style (the slider geometry, the
 * offset measure, the model/options re-measure watchers, the RO lifecycle) AND
 * the AX.W53 travel-squish: a velocity-driven, volume-preserving `--stretch`
 * scalar the active indicator reads so it STRETCHES along its travel axis as it
 * glides and settles to fit (the Material-3 ELASTIC / Apple Liquid-Glass
 * register, capped LOW). Honors `prefers-reduced-motion` (no squish under
 * reduce). The underline material SLIDES (no squish — a hairline does not
 * deform), gated by the caller passing no `indicatorRef` element.
 *
 * AXIS-DERIVED (the `vertical` param): the writer emits width/translateX on the
 * inline axis (horizontal) OR height/translateY on the block axis (vertical),
 * CENTER-ANCHORED (translate = buttonCenter − size/2) so the squish (which
 * scales from `transform-origin: center`) keeps the indicator center pinned to
 * the item center.
 *
 * Generic over the minimal `SelectionOption` shape (`value` + optional
 * `disabled`), so it is decoupled from any consumer's option type — the
 * `/motion-core` home carries no component-tree import.
 */

/** The minimal option shape the indicator measures against. */
export interface SelectionOption {
    value: string;
    disabled?: boolean;
}

/**
 * Fallback for `--tab-indicator-max-stretch` when the cascade leaves it unset —
 * the default travel-squish cap. `--stretch = 1 + frac · (cap − 1)`, so a
 * full-width jump reaches the cap and a tiny hop stays near 1. The token is the
 * authority; this is the no-token floor (the SOLE cap source, shared by the
 * click travel-squish AND the drag pull-morph — the constant + the token in
 * lockstep, never a fork).
 */
export const DEFAULT_INDICATOR_MAX_STRETCH = 1.11;

/**
 * Fallback for `--tab-indicator-blob-max` when the cascade leaves it unset: the
 * 5-beat blob's area-inflation overshoot peak. The 2nd `useLiquidFlex` channel
 * drives `--tab-blob` toward this on the grow-overshoot beat, then de-inflates
 * to 1 at arrival (shrink-to-fit). Kept LOW so the COMPOSED bbox area
 * (`blob × stretch` ≈ blob², the squish being volume-preserving) clears the
 * ≤ ~1.14 anti-taffy fence.
 */
export const DEFAULT_INDICATOR_BLOB_MAX = 1.045;

/**
 * The travel-progress fraction at which the squish RELEASES — the Material
 * "grow then shrink" close, keyed to ARRIVAL. The squish opens with the glide
 * and releases when the indicator is within this fraction of its target, so the
 * stretch peaks DURING travel and shrinks to fit AT arrival, never before.
 */
export const INDICATOR_RELEASE_AT_ARRIVAL = 0.82;

export interface UseSelectionIndicatorParams<O extends SelectionOption> {
    /** The container scroller root (observed by the ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /** The active indicator element (the squish `--stretch` write target). */
    indicatorRef: Ref<HTMLElement | null>;
    /** Per-option item refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The selectable options (re-measure on change). */
    options: ComputedRef<O[]>;
    /** The active value (re-measure on change). */
    model: Ref<string | undefined>;
    /** The active option values (used by the initial squish seed). */
    activeValues: ComputedRef<string[]>;
    /** True for the vertical (block-axis) orientation. */
    vertical: ComputedRef<boolean>;
}

export interface UseSelectionIndicatorReturn {
    /** Inline style for the single-select JS slider — the ONE writer. */
    singleSliderStyle: Ref<Record<string, string>>;
    /** Imperatively kick the travel-squish on a selection at `idx`. */
    squishOnTravel: (toIdx: number) => void;
}

export function useSelectionIndicator<O extends SelectionOption>(
    params: UseSelectionIndicatorParams<O>,
): UseSelectionIndicatorReturn {
    const {
        containerRef,
        indicatorRef,
        buttonRefs,
        options,
        model,
        activeValues,
        vertical,
    } = params;

    // ── The single-select slider style (the ONE JS writer — no anchor branch) ──

    const singleSliderStyle = ref<Record<string, string>>({
        width: "0px",
        transform: "translateX(0px)",
        opacity: "0",
    });

    function updateSingleSlider() {
        const idx = options.value.findIndex(
            (o) => o.value === (model.value as string),
        );
        if (idx < 0 || !buttonRefs.value[idx]) return;
        const btn = buttonRefs.value[idx];
        if (vertical.value) {
            // Block axis — the indicator spans the item's height, centered on
            // the item's vertical center (center-anchored, never a raw
            // `offsetTop` left-edge write).
            const h = btn.offsetHeight;
            const centerY = btn.offsetTop + h / 2;
            singleSliderStyle.value = {
                height: `${h}px`,
                width: "",
                transform: `translateY(${centerY - h / 2}px)`,
                opacity: "1",
            };
        } else {
            // Inline axis — span the item's width, centered on its horizontal
            // center (algebraically `offsetLeft` but expressed via the center so
            // the squish stays pinned).
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

    function updateSliders() {
        updateSingleSlider();
    }

    // ── AX.W53 travel-squish (release-at-arrival) ──
    //
    // On selection, the active indicator STRETCHES along the travel axis and
    // compresses the cross axis in inverse proportion (volume-preserving), then
    // releases back to 1 so the CSS glide settles it to fit.

    let lastIdx = -1;
    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    // The shared liquid-flex squish (W-LIQUID consumer). Squish-only (no size
    // span — the indicator travels via CSS `transform`, not this primitive): the
    // travel FRACTION is fed via `squish(frac)` under the `"linear"` law. The cap
    // is read LIVE from the cascade via the `maxStretch` getter, so the primitive
    // owns the cap-clamp + the reciprocal `--stretch` value.
    let capForSquish = DEFAULT_INDICATOR_MAX_STRETCH;
    const liquidSquish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width",
        squishLaw: "linear",
        maxStretch: () => capForSquish,
    });

    // BD.W-TABS-LIQUID — the area-inflation BLOB channel (the 5-beat grow→
    // overshoot→shrink envelope). The SAME shared primitive as a pure SIZE-span
    // projection: `blob.drive(1)` inflates PAST the destination footprint, driven
    // by `--tab-indicator-blob-max`.
    let blobPeak = DEFAULT_INDICATOR_BLOB_MAX;
    const liquidBlob = useLiquidFlex({
        from: 1,
        to: () => blobPeak,
        axis: "width",
        squishLaw: "linear",
    });

    function prefersReducedMotion() {
        return (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    // Resolve the calibrated clock (ms) from the cascade so the release lands at
    // ARRIVAL. `--tab-indicator-duration` resolves to a `<time>`; parse to ms.
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
        if (!fromBtn || !toBtn) return;

        // Travel distance on the active axis drives the stretch ratio, normalized
        // by the container extent so the curve is geometry-relative.
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

        // Resolve the cap SITE-LOCALLY off the live `--motion-weight` via
        // `effectiveCap` (rest weight → byte-identical feel; weight 0 → 1.0, the
        // observer/PRM fence). Reads the EXISTING `--tab-indicator-max-stretch`.
        const cs = getComputedStyle(el);
        const capRaw = cs.getPropertyValue("--tab-indicator-max-stretch").trim();
        const capToken = Number(capRaw) || DEFAULT_INDICATOR_MAX_STRETCH;
        capForSquish = effectiveCap(el, capToken);
        liquidSquish.squish(frac);

        // Resolve the blob peak the SAME way, scaled by `--motion-weight`; FENCE
        // the composed area at ≤ ~1.14 (the anti-taffy bar): clamp the peak
        // ≤ √1.14 so even a fast jump cannot breach.
        const blobRaw = cs.getPropertyValue("--tab-indicator-blob-max").trim();
        const blobToken = Number(blobRaw) || DEFAULT_INDICATOR_BLOB_MAX;
        const BLOB_AREA_FENCE = Math.sqrt(1.14); // ≈ 1.0677
        const lifted = effectiveCap(el, blobToken);
        blobPeak = lifted > BLOB_AREA_FENCE ? BLOB_AREA_FENCE : lifted;
        // Fold the travel velocity into the transient `--motion-weight` boost on
        // the SAME element so a far jump deepens its own squish + self-extinguishes.
        writeVelocityWeight(el, liquidSquish.flexVel.value);

        if (releaseTimer) clearTimeout(releaseTimer);
        // Open the stretch synchronously with the glide…
        el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
        // …and OPEN the blob (grow+overshoot beat).
        liquidBlob.drive(1);
        el.style.setProperty("--tab-blob", String(liquidBlob.size.value));
        // …and release both channels AT ARRIVAL (the ONE timer, in lockstep).
        const releaseAt = clockMs(el) * INDICATOR_RELEASE_AT_ARRIVAL;
        releaseTimer = setTimeout(() => {
            liquidSquish.squish(0);
            el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
            liquidBlob.drive(0);
            el.style.setProperty("--tab-blob", String(liquidBlob.size.value));
            writeVelocityWeight(el, 0);
            releaseTimer = null;
        }, releaseAt);
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
    // no anchor gate — the Safari-identical guarantee). The initial `lastIdx` is
    // seeded from the active option so the FIRST selection squishes relative to
    // the mounted position.

    let resizeObserver: ResizeObserver | null = null;

    onMounted(() => {
        lastIdx = options.value.findIndex((o) =>
            activeValues.value.includes(o.value),
        );
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
