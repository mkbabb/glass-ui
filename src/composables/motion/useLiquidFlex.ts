// AZ.W-MORPH-SHOWCASE (W-LIQUID fold) — useLiquidFlex: the shared amorphous
// flex+squish primitive.
//
// R3-13 names a "liquid-glass" morph register that the dock orientation-morph, the
// segmented-tab indicator, and the metaball blob all speak in scattered dialects:
//   • useTabIndicator writes a reciprocal `--stretch` / `1/--stretch` scale that the
//     active indicator reads so it STRETCHES along its travel axis and settles to fit
//     (the Material-3 ELASTIC / Apple Liquid-Glass "grow then shrink" register);
//   • the metaball shader runs a volume-preserving anisotropic squash `sa = 1 +
//     tanh(speed·k)·uStretch`, exactly `1/sa` perpendicular (metaball.frag.ts), driven
//     off the body's motion speed.
// Both are the SAME idea — a single normalized progress drives a size span AND a
// volume-preserving squish keyed off how FAST the progress is travelling. W-LIQUID
// reconciles them into ONE named primitive so a re-tune (the cap, the squish curve)
// lands in one place rather than three.
//
// The primitive is DELIBERATELY framework-light — it owns NO spring, NO rAF, NO
// element. It is a PURE projection of an externally-driven normalized scalar `t`
// (and the scalar's per-update travel velocity) onto:
//   • `size`     — the `from + (to − from)·t` span interpolation along `axis`;
//   • `stretch`  — the volume-preserving squish scalar `1 + tanh(|ṫ|·k)·max`,
//                  capped LOW at `maxStretch`, released to 1 as the travel stills;
//   • the matching CSS custom-property style objects a consumer binds.
// The caller owns the clock (a `SpringProgress`, a CSS scroll-timeline, a manual
// drive) and feeds `t` via `drive(t)`. So the dock-orientation-morph drives it off
// the `--dock-morph-t` spring; the tabs-indicator drives it off the selection travel;
// the metaball reads the same squish curve in-shader. ONE squish law, ≥2 consumers
// (the ≥2-consumer bar — the W-LIQUID 3-name reconcile).
//
// SQUISH DETERMINISM (the M5 clause the morph-showcase gate asserts): the squish is a
// pure function of the scalar's DERIVATIVE (the per-`drive` travel `Δt`), NOT a live
// wall-clock nor a live pointer speed — so a frame captured at a given `t` with a
// given drive history is reproducible. The release-to-1 rides the SAME `drive` calls
// (the travel decays as `t` approaches its target), never a free-running timer.

import { computed, ref, type ComputedRef, type Ref } from "vue";

export type LiquidFlexAxis = "width" | "height";

export interface UseLiquidFlexParams {
    /**
     * The size span endpoints, in px. `from` is the `t=0` size, `to` is the `t=1`
     * size. Either may be a getter (a live FLIP-measured `to`) or a plain number.
     */
    from: number | (() => number);
    to: number | (() => number);
    /** Which dimension the size span drives (the squish is reciprocal across it). */
    axis: LiquidFlexAxis;
    /**
     * The LOW squish cap — the maximum `--stretch` the travel can reach (a +N%
     * elongation along the travel axis). Defaults to 1.08 (the iOS-segmented register
     * the tabs-indicator already speaks — `DEFAULT_INDICATOR_MAX_STRETCH`). Kept LOW:
     * the liquid register is a lively settle, never a rubber-band taffy-pull. May be a
     * getter so a consumer reading a live cascade override (`--tab-indicator-max-
     * stretch`) re-resolves the cap per-read without reconstructing the primitive.
     */
    maxStretch?: number | (() => number);
    /**
     * The tanh saturation constant `k` in `1 + tanh(|ṫ|·k)·(max−1)`. Higher `k`
     * reaches the cap on a slower travel. Defaults to 1.6 (the metaball shader's
     * `sa = 1 + tanh(speed·1.6)·uStretch` constant — the SAME curve, reconciled).
     * Read only in the `"tanh"` squish mode (the default).
     */
    squishK?: number;
    /**
     * The squish curve law:
     *   • `"tanh"` (DEFAULT) — `1 + tanh(|ṫ|·squishK)·(max−1)`, the SATURATING
     *     velocity-driven register the metaball shader runs and the morph-showcase
     *     drives off the spring derivative. A fast travel reads as a lively swell
     *     capped at `max`, never a taffy-pull.
     *   • `"linear"` — `1 + travel·(max−1)`, the geometry-relative register the
     *     tabs-indicator speaks (`travel` is the travel FRACTION 0→1, so a
     *     full-track jump reaches the cap and a neighbour hop stays near 1). This is
     *     the load-bearing local detail of the indicator squish (§7) — selected here
     *     so the reconcile is byte-identical, not a curve change.
     */
    squishLaw?: "tanh" | "linear";
}

export interface UseLiquidFlexReturn {
    /** The live normalized progress (0→1), last value handed to `drive`. */
    t: Readonly<Ref<number>>;
    /** The interpolated size in px: `from + (to − from)·t`. */
    size: ComputedRef<number>;
    /**
     * The volume-preserving squish scalar (≥1). 1 at rest; rises toward `maxStretch`
     * as the travel velocity grows, capped at `maxStretch`. The consumer pairs it
     * reciprocally (`scale: var(--stretch) calc(1 / var(--stretch))` along the axis).
     */
    stretch: ComputedRef<number>;
    /**
     * The size as a CSS length style object, keyed on `axis` (`{ width: "Npx" }` or
     * `{ height: "Npx" }`). Bind on the morphing element's style.
     *
     * DOCTRINE (BB.W-MOTION-CANON, P5 — the SIZESTYLE-LATENT record): `sizeStyle`
     * is the SETTLED-FOOTPRINT writer — a one-time reserve of the morph TARGET box
     * (the FLIP-measured `to` span), NEVER the per-frame animation channel. The
     * per-frame channel is `transform` (the `stretchStyle` `--stretch` reciprocal
     * scale, a compositor property). Binding `sizeStyle` to a CONTINUOUSLY-animated
     * element animates `width`/`height` per frame OFF the compositor (the A'-3
     * reflow-storm class proof:no-layout-animation forbids library-wide) — FORBIDDEN
     * by the canon. Write the reserved footprint ONCE at the morph endpoint, then
     * drive the visible motion through `stretchStyle`/`transform`. See
     * `docs/precepts/motion-canon.md` P5.
     */
    sizeStyle: ComputedRef<Record<string, string>>;
    /**
     * The squish as a CSS custom-property style object (`{ "--stretch": "1.04" }`).
     * The SFC's CSS pairs `--stretch` reciprocally along the travel axis.
     */
    stretchStyle: ComputedRef<Record<string, string>>;
    /**
     * Advance the morph: set the normalized progress to `next` (0→1). The squish
     * travel velocity is the |Δt| since the prior `drive`, so calling `drive` on a
     * spring's per-frame value gives a squish that swells on a fast travel and
     * relaxes to 1 as the value settles (no free-running timer — the SAME drive calls
     * carry the release). This is the morph consumer's path (it owns a size span).
     */
    drive(next: number): void;
    /**
     * Set the squish-travel input DIRECTLY (the squish-only consumer's path — the
     * tabs-indicator has no size span; it feeds its geometry-relative travel
     * fraction here). In `"linear"` law `travel` is the 0→1 fraction; in `"tanh"`
     * law it is the velocity magnitude. Releasing the squish to fit is a `squish(0)`
     * call (the tabs-indicator's release-to-1 step rides the same input).
     */
    squish(travel: number): void;
}

/**
 * The shared amorphous flex+squish primitive. PURE projection of a caller-driven
 * normalized scalar onto a size span + a volume-preserving squish — no spring, no
 * rAF, no element. See the module header for the W-LIQUID reconcile rationale.
 */
export function useLiquidFlex(params: UseLiquidFlexParams): UseLiquidFlexReturn {
    const { axis } = params;
    const squishK = params.squishK ?? 1.6;
    const squishLaw = params.squishLaw ?? "tanh";
    const maxStretchOf = (): number =>
        typeof params.maxStretch === "function"
            ? params.maxStretch()
            : (params.maxStretch ?? 1.08);

    const fromOf = (): number =>
        typeof params.from === "function" ? params.from() : params.from;
    const toOf = (): number =>
        typeof params.to === "function" ? params.to() : params.to;

    const t = ref(0);
    // The squish travel input — |Δt| per `drive` (a pure derivative of the scalar,
    // never a wall-clock read — the M5 determinism clause), OR a directly-set
    // geometry-relative fraction via `squish()` (the squish-only tabs path).
    const travel = ref(0);

    function drive(next: number): void {
        const clamped = next < 0 ? 0 : next > 1 ? 1 : next;
        travel.value = Math.abs(clamped - t.value);
        t.value = clamped;
    }

    function squish(next: number): void {
        travel.value = next < 0 ? 0 : next;
    }

    const size = computed(() => {
        const a = fromOf();
        const b = toOf();
        return a + (b - a) * t.value;
    });

    // Volume-preserving squish, capped at maxStretch. The cap-clamp + the reciprocal
    // `--stretch` style projection are the SHARED reconcile both consumers speak; the
    // CURVE is law-selected:
    //   • "tanh"   — 1 + tanh(travel·k)·(max−1): the metaball shader's `sa = 1 +
    //                tanh(speed·k)·uStretch` saturating velocity register (a fast
    //                morph swells then caps, never a taffy-pull). The morph/blob law.
    //   • "linear" — 1 + travel·(max−1): the tabs-indicator's geometry-relative
    //                travel-FRACTION register (byte-identical to its prior local
    //                `1 + frac·(cap−1)` write — the load-bearing local detail, §7).
    const stretch = computed(() => {
        const cap = maxStretchOf();
        const raw =
            squishLaw === "linear"
                ? 1 + travel.value * (cap - 1)
                : 1 + Math.tanh(travel.value * squishK) * (cap - 1);
        return raw > cap ? cap : raw;
    });

    const sizeStyle = computed<Record<string, string>>(() => ({
        [axis]: `${size.value}px`,
    }));

    const stretchStyle = computed<Record<string, string>>(() => ({
        "--stretch": String(stretch.value),
    }));

    return {
        t,
        size,
        stretch,
        sizeStyle,
        stretchStyle,
        drive,
        squish,
    };
}
