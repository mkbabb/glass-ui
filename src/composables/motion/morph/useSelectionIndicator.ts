import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    nextTick,
    type Ref,
    type ComputedRef,
} from "vue";
// The indicator squish consumes the
// shared `useLiquidFlex` primitive. The reciprocal-stretch cap-clamp + the `--stretch`
// value computation are the SHARED reconcile; the geometry-relative travel FRACTION
// (the load-bearing local detail) is fed via `squish(frac)` under the `"linear"` law.
import { useLiquidFlex } from "../spring/useLiquidFlex";
import { effectiveCap, writeVelocityWeight } from "../core/writeVelocityWeight";
// The library's ONE scalar selection identity, imported `type`-only so it is erased
// at emit — `/motion-core` still ships zero component-tree BYTES (BK #84 C-1). The
// alternative was a second spelling of `string | number` living here, which the
// grammar law forbids outright.
import type { SelectionValue } from "../../../components/_shared/selection";
// The EYEGLASS organ's law — pure geometry, no cascade, no DOM. This writer applies
// it; `eyeglass.ts` states it and owns every figure in it.
import {
    eyeglassSpan,
    eyeglassSwell,
    eyeglassOriginPercent,
    EYEGLASS_SPAN_MAX,
} from "./eyeglass";

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
 * offset measure, the model/options re-measure watchers, the RO lifecycle) AND
 * the travel deform: a velocity-driven `--stretch` scalar the active indicator
 * reads so it lengthens along its travel axis as it glides and settles to fit
 * (the Material-3 ELASTIC, Apple Liquid-Glass register). Honors
 * `prefers-reduced-motion` (no deform under reduce).
 *
 * WHAT DEFORMS IS A POLICY, AND IT IS A PARAMETER. It used to be inferred from
 * `indicatorRef` being null, which was an OVERLOADED sentinel: the same null meant
 * "this group has no single slider" to `useSelectionGroup` and "this material does
 * not squish" here, so neither meaning could be stated without lying about the
 * other. `deform` says it outright:
 *   • `"plate"` (default) — the full body: `--stretch` plus, where the surface arms
 *     the organ, the EYEGLASS span/swell/lean. A body of glass with area to move.
 *   • `"mark"` — `--stretch` only. A hairline lengthens along its travel; it has no
 *     area to inflate and no cross axis to swell.
 *   • `"none"` — no deform at all (a multi-toggle group has no single travelling
 *     body to deform).
 * The `if (!el)` guard below stays what it always should have been: null-safety.
 *
 * THE EYEGLASS is armed by the SURFACE, in its own cascade, by declaring
 * `--eyeglass-span-max`. Where it is armed the deform stops being a centre-pump and
 * becomes the measured organ — it spans origin and destination, leans 2:1 into its
 * travel, swells across, and clamps at the track's inner edge. Where it is not
 * declared the fraction law is byte-identical to what shipped. See `eyeglass.ts`.
 *
 * The writer emits the selected item's full physical border box from the
 * container's padding-box origin. Measuring both axes keeps the resting fill
 * exact across orientation, fractional geometry, and writing direction; the
 * `vertical` param only selects the transient squish axis.
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
 * The travel-progress fraction at which the squish RELEASES — the Material
 * "grow then shrink" close, keyed to ARRIVAL. The squish opens with the glide
 * and releases when the indicator is within this fraction of its target, so the
 * stretch peaks DURING travel and shrinks to fit AT arrival, never before.
 */
export const INDICATOR_RELEASE_AT_ARRIVAL = 0.82;

/**
 * The deform POLICY — what the travelling body is made of, stated rather than
 * inferred from a null ref. See the module docstring for why the sentinel had to go.
 */
export type SelectionDeform = "plate" | "mark" | "none";

export interface UseSelectionIndicatorParams<O extends SelectionOption> {
    /** The container scroller root (observed by the ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /** The active indicator element (the squish `--stretch` write target). */
    indicatorRef: Ref<HTMLElement | null>;
    /** Per-option item refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The selectable options (re-measure on change). */
    options: ComputedRef<O[]>;
    /** The active value (re-measure on change), at the option type's own scalar. */
    model: Ref<O["value"] | undefined>;
    /** The active option values (used by the initial squish seed). */
    activeValues: ComputedRef<O["value"][]>;
    /** True for the vertical (block-axis) orientation. */
    vertical: ComputedRef<boolean>;
    /** What the travelling body is made of. Defaults to `"plate"`. */
    deform?: ComputedRef<SelectionDeform>;
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
    const deformOf = (): SelectionDeform => params.deform?.value ?? "plate";

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
        // either meaning lied about the other. `deform` took the second one, and what
        // is left means exactly one thing: whether an indicator element exists.
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

    // ──  travel-squish (release-at-arrival) ──
    //
    // On selection, the active indicator STRETCHES along the travel axis and
    // compresses the cross axis in inverse proportion (volume-preserving), then
    // releases back to 1 so the CSS glide settles it to fit.

    let lastIdx = -1;
    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    // The shared liquid-flex squish ( consumer). Squish-only (no size
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

    // THE SEPARATE AREA-INFLATION CHANNEL IS GONE, not disabled. It drove a second
    // uniform scalar (`--tab-blob`) that composed multiplicatively with this one, so
    // the surface carried two area laws and a fence (`blob × stretch ≤ ~1.14`) whose
    // only job was to keep them from arguing. The eyeglass is one law: the body spans
    // and swells, and the fences are its own geometry — the span ceiling and the
    // track's inner edge. Its last painter and its token left with it.

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
        // The no-token floor is the travel/indicator row's own settle
        // (`--spring-dock-settle`), which is what `--tab-indicator-duration` resolves
        // to. It is NOT the retired snappy clock this fallback used to name.
        if (!raw) return 220;
        if (raw.endsWith("ms")) return Number.parseFloat(raw) || 220;
        if (raw.endsWith("s")) return (Number.parseFloat(raw) || 0.22) * 1000;
        return Number.parseFloat(raw) || 220;
    }

    function squishOnTravel(toIdx: number) {
        const el = indicatorRef.value;
        // Null-safety, not policy — the policy is `deform`.
        if (!el) {
            lastIdx = toIdx;
            return;
        }
        if (deformOf() === "none") {
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
        const containerRect = containerRef.value?.getBoundingClientRect();
        const fromRect = fromBtn.getBoundingClientRect();
        const toRect = toBtn.getBoundingClientRect();
        const axisExtent = vertical.value
            ? containerRect?.height || 1
            : containerRect?.width || 1;
        const travel = vertical.value
            ? Math.abs(
                  toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2),
              )
            : Math.abs(
                  toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2),
              );
        const frac = axisExtent > 0 ? Math.min(travel / axisExtent, 1) : 0;

        // Resolve the cap SITE-LOCALLY off the live `--motion-weight` via
        // `effectiveCap` (rest weight → byte-identical feel; weight 0 → 1.0, the
        // observer/PRM fence). Reads the EXISTING `--tab-indicator-max-stretch`.
        const cs = getComputedStyle(el);
        const capRaw = cs.getPropertyValue("--tab-indicator-max-stretch").trim();
        const capToken = Number(capRaw) || DEFAULT_INDICATOR_MAX_STRETCH;
        capForSquish = effectiveCap(el, capToken);
        liquidSquish.squish(frac);

        // ── THE EYEGLASS ARM ──
        //
        // Armed by the SURFACE: a strip that wants the organ declares
        // `--eyeglass-span-max` in its own cascade. Absent, everything below is
        // skipped and the fraction law above is what paints — the same bytes that
        // shipped, on every surface that has not asked for the organ.
        const spanMaxRaw = cs.getPropertyValue("--eyeglass-span-max").trim();
        const armed = spanMaxRaw !== "" && deformOf() === "plate";
        if (armed) {
            const spanMax = effectiveCap(el, Number(spanMaxRaw) || EYEGLASS_SPAN_MAX);
            // The organ is measured on the TRAVEL axis in the container's own
            // coordinates, and clamps against the container's PADDING box — the
            // "bar's inner edge" §C1 photographs it compressing into.
            const axis = (r: DOMRect) =>
                vertical.value
                    ? { start: r.top, end: r.bottom }
                    : { start: r.left, end: r.right };
            const track = containerRect
                ? vertical.value
                    ? {
                          start: containerRect.top + (containerRef.value?.clientTop ?? 0),
                          end: containerRect.bottom,
                      }
                    : {
                          start: containerRect.left + (containerRef.value?.clientLeft ?? 0),
                          end: containerRect.right,
                      }
                : undefined;
            const organ = eyeglassSpan({
                from: axis(fromRect),
                to: axis(toRect),
                track,
                spanMax,
            });
            // The lean: ONE transform-origin write produces the 2:1 edge asymmetry.
            el.style.setProperty(
                "--eyeglass-origin",
                `${eyeglassOriginPercent(organ.direction)}%`,
            );
            el.style.setProperty("--eyeglass-span", String(organ.span));
            el.style.setProperty("--eyeglass-swell", String(eyeglassSwell(frac)));
            // The clamp is REPORTED, never silently absorbed — the paint reads it to
            // compress against the wall instead of pretending it spanned freely.
            if (organ.clamped) el.dataset.eyeglassClamped = "";
            else delete el.dataset.eyeglassClamped;
            // The WAKE. §C1: "the whole bar lifts in chroma one frame BEFORE the pill
            // moves", fast-in ~120ms / slow-out ~400ms. Those are not new constants:
            // they are `control-engage`'s own t90 pair (60·ln10 = 138ms attack,
            // 180·ln10 = 414ms release), which is the envelope register's first
            // honest consumer. The container wears it, because the wake is the ORGAN
            // of the bar and not of the pill.
            containerRef.value?.setAttribute("data-eyeglass-wake", "");
        }

        // Fold the travel velocity into the transient `--motion-weight` boost on
        // the SAME element so a far jump deepens its own deform + self-extinguishes.
        writeVelocityWeight(el, liquidSquish.flexVel.value);

        if (releaseTimer) clearTimeout(releaseTimer);
        // Open the stretch synchronously with the glide…
        el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
        // …and release AT ARRIVAL (the ONE timer — every channel in lockstep).
        const releaseAt = clockMs(el) * INDICATOR_RELEASE_AT_ARRIVAL;
        releaseTimer = setTimeout(() => {
            liquidSquish.squish(0);
            el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
            if (armed) {
                // Position is monotone with zero overshoot (§C1); the elasticity is
                // entirely in the deform, so the retraction is these two scalars
                // returning to 1 and nothing moving back.
                el.style.setProperty("--eyeglass-span", "1");
                el.style.setProperty("--eyeglass-swell", "1");
                delete el.dataset.eyeglassClamped;
                containerRef.value?.removeAttribute("data-eyeglass-wake");
            }
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
        lastIdx = options.value.findIndex((o) => activeValues.value.includes(o.value));
        nextTick(updateSliders);
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
