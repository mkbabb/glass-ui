// AY.W-MOTION2 — the complete curve library + the CSS↔JS curve TABLE made code.
//
// glass-ui's motion system has two published halves: the CSS half names a curve
// vocabulary in `tokens.css §2` / `theme.css` (`--spring-*`, `--ease-*`, the
// bezier cores) and the JS half is the keyframes.js / value.js easing set. Before
// this module the two halves were published ASYMMETRICALLY — a token had no
// programmatic JS twin. `MOTION_CURVES` binds each `--ease-*`/`--spring-*` token
// to its JS twin so a consumer driving a `NumericAnimation` / `SpringProgress`
// reaches the SAME curve the CSS uses, by name. ONE vocabulary, both halves.
//
// NO-FORK discipline (gate §3.4): every row REFERENCES a peer symbol —
//   · spring rows → keyframes.js `springTimingFunction(preset)` over the SAME
//     (response, ζ) pair `springLinearStops` solved the CSS `linear()` from
//     (the pair single-sourced in `springPresets.ts` — drift-proof);
//   · bezier rows → value.js `CSSCubicBezier(x1,y1,x2,y2)` (the shipped
//     control-point→callable evaluator) or a value.js `ease*` callable.
// This module re-implements NEITHER the forward `cssTwinFor` (keyframes.js's
// JS-name→CSS-string direction) NOR the spring solver NOR a bezier sampler — it is
// the REVERSE direction (CSS-token-name→JS-callable), composed from peer symbols.

import {
    CSSCubicBezier,
    easeOutExpo,
    easeOutCubic,
    type easeInQuad,
} from "@mkbabb/value.js";
import { springTimingFunction, type Easing, type TimingFunction } from "@mkbabb/keyframes.js";

import { SPRING_PRESETS, springPreset, type SpringPresetName } from "./springPresets";

/** A value.js easing callable `(t: number) => number` (the family's shape). */
export type CurveFn = typeof easeInQuad;

/** The kind of a `MOTION_CURVES` row — a spring `linear()` or a cubic-bezier. */
export type MotionCurveKind = "spring" | "bezier";

/**
 * One row of the CSS↔JS curve table. CANONICAL rows carry their own JS twin;
 * ALIAS rows resolve through a `canonical` target (no duplicated twin).
 */
export interface MotionCurve {
    /** The CSS token name, including the leading `--`. */
    readonly token: `--${string}`;
    /** `spring` (a solved `linear()` token) or `bezier` (a cubic-bezier token). */
    readonly kind: MotionCurveKind;
    /**
     * The JS twin — a callable `Easing` (springs, via `springTimingFunction`) or a
     * `TimingFunction` (`(t) => number`, beziers via `CSSCubicBezier`). For ALIAS
     * rows this is the canonical row's twin (resolve-through, not a copy).
     */
    readonly js: Easing | TimingFunction;
    /**
     * For an ALIAS row: the canonical `--token` this resolves through. `undefined`
     * on a canonical row.
     */
    readonly canonical?: `--${string}`;
    /** The register doc (springs lift it from the shared preset table). */
    readonly note: string;
}

// ── The CANONICAL bezier-core JS twins (value.js `CSSCubicBezier` — no sampler fork) ──
// Each control-point tuple is the SAME quadruple the matching `--motion-ease-*`
// cubic-bezier token declares in tokens.css §2.
const easeStandardFn: TimingFunction = CSSCubicBezier(0.4, 0, 0.2, 1);
const easeOutFn: TimingFunction = CSSCubicBezier(0, 0, 0.2, 1);
const easeInFn: TimingFunction = CSSCubicBezier(0.4, 0, 1, 1);
// out-expo: the value.js `easeOutExpo` IS the cubic-bezier(0.16,1,0.3,1) register's
// analytic twin (the house expo curve) — reference it directly, not a re-sampled bezier.
const easeOutExpoFn: TimingFunction = easeOutExpo;
const easeAppleFn: TimingFunction = CSSCubicBezier(0.25, 0.1, 0.25, 1);

/** Build a canonical spring row from its shared preset (single-sourced pair). */
function springRow(name: SpringPresetName): MotionCurve {
    const preset = springPreset(name);
    return {
        token: `--spring-${name}`,
        kind: "spring",
        // The SAME (response, ζ) pair `springLinearStops` solved the CSS `linear()`
        // from — `springTimingFunction` is its JS sibling (keyframes.js: "same solver").
        js: springTimingFunction({
            response: preset.response,
            dampingFraction: preset.dampingFraction,
        }),
        note: preset.comment,
    };
}

// ── CANONICAL rows ────────────────────────────────────────────────────────────
const CANONICAL: MotionCurve[] = [
    // The five generated springs (tokens.css:191-195).
    ...SPRING_PRESETS.map((p) => springRow(p.name)),
    // The bezier cores (tokens.css:198-201).
    {
        token: "--motion-ease-standard",
        kind: "bezier",
        js: easeStandardFn,
        note: "Material standard — surface props (bg/border/color/box-shadow/opacity)",
    },
    {
        token: "--motion-ease-out",
        kind: "bezier",
        js: easeOutFn,
        note: "decelerate — exits, no overshoot",
    },
    {
        token: "--motion-ease-in",
        kind: "bezier",
        js: easeInFn,
        note: "accelerate — leaving entrances",
    },
    {
        token: "--motion-ease-out-expo",
        kind: "bezier",
        js: easeOutExpoFn,
        note: "house expo — bold decelerating reveal (the underline draw-on register)",
    },
    // Apple ambient (tokens.css:209).
    {
        token: "--motion-ease-apple",
        kind: "bezier",
        js: easeAppleFn,
        note: "Apple ambient — the Pulse aura register (NOT an interactive-transform authority)",
    },
];

/** Resolve a canonical row's JS twin (for an alias row's resolve-through). */
function twinOf(token: `--${string}`): Easing | TimingFunction {
    const row = CANONICAL.find((c) => c.token === token);
    if (!row) throw new Error(`MOTION_CURVES alias targets a missing canonical row: ${token}`);
    return row.js;
}

// ── ALIAS rows (resolve-through — the canonical row's twin, NOT a duplicate) ───
// Each names its `canonical` target; the gate REDs an alias whose target is absent
// and REDs a new `--ease-*`/`--spring-*` declaration with neither a canonical nor
// an alias row (the two halves cannot drift).
const ALIAS_SPEC: ReadonlyArray<{ token: `--${string}`; canonical: `--${string}`; note: string }> = [
    // tokens.css §2 bezier aliases (tokens.css:203-208).
    { token: "--ease-standard", canonical: "--motion-ease-standard", note: "alias → --motion-ease-standard" },
    { token: "--ease-out", canonical: "--motion-ease-out", note: "alias → --motion-ease-out" },
    { token: "--ease-in", canonical: "--motion-ease-in", note: "alias → --motion-ease-in" },
    { token: "--ease-out-expo", canonical: "--motion-ease-out-expo", note: "alias → --motion-ease-out-expo" },
    { token: "--ease-apple", canonical: "--motion-ease-apple", note: "alias → --motion-ease-apple" },
    // The spring alias + decelerate/accelerate (tokens.css:212-214).
    { token: "--ease-spring", canonical: "--spring-snappy", note: "alias → --spring-snappy (the default spring register)" },
    { token: "--ease-decelerate", canonical: "--motion-ease-out", note: "alias → --motion-ease-out" },
    { token: "--ease-accelerate", canonical: "--motion-ease-in", note: "alias → --motion-ease-in" },
    // The bridges.css @theme aliases + the @theme --ease-spring (the default register).
    { token: "--ease-spring-smooth", canonical: "--spring-smooth", note: "@theme alias → --spring-smooth" },
    { token: "--ease-spring-snappy", canonical: "--spring-snappy", note: "@theme alias → --spring-snappy" },
    { token: "--ease-spring-bouncy", canonical: "--spring-bouncy", note: "@theme alias → --spring-bouncy" },
    { token: "--ease-spring-gentle", canonical: "--spring-gentle", note: "@theme alias → --spring-gentle" },
    // BC.W-SPRING-EASE — the minted iOS interactive press register's @theme alias.
    { token: "--ease-spring-press", canonical: "--spring-press", note: "@theme alias → --spring-press (the iOS interactive press register)" },
    // BC.W-MOTION-PRESETS — the brand "convergence-reveal" / partial-sum settle.
    // DECIDE (recorded, MEASURED): a Fourier partial sum converges ONTO its target
    // with a Gibbs ripple that DECAYS — its macro envelope is a monotone
    // critically-damped approach with NO sustained overshoot past terminal. That is
    // EXACTLY `gentle` (response 0.7, ζ=1.0): analytic overshoot exp(-ζπ/√(1-ζ²))=0,
    // the emitted `--spring-gentle` linear() peaks at 1.00000 (never exceeds 1.0).
    // The reference curve is NOT measurably distinct from `gentle`, so this is the
    // ALIAS reuse (zero new SPRING_PRESETS row, zero new engine — the no-contrivance
    // line). `--ease-convergence` resolves THROUGH `--spring-gentle`'s twin; the
    // settle clock is `--spring-gentle-duration`.
    { token: "--ease-convergence", canonical: "--spring-gentle", note: "alias → --spring-gentle (the partial-sum settle — critically-damped, no overshoot; REUSE, measured-not-distinct)" },
];

const ALIASES: MotionCurve[] = ALIAS_SPEC.map(({ token, canonical, note }) => ({
    token,
    // An alias inherits the canonical row's kind via the twin's identity; record the
    // kind from the target so a consumer can branch on it.
    kind: CANONICAL.find((c) => c.token === canonical)!.kind,
    js: twinOf(canonical),
    canonical,
    note,
}));

/**
 * The CSS↔JS curve table, keyed by CSS token name. Covers EVERY `--ease-*` /
 * `--spring-*` token declared in `tokens.css §2` + `theme.css` (CURVE-TABLE-BOUND
 * gate §3.2). Spring rows carry a keyframes.js `Easing`; bezier rows a value.js
 * `TimingFunction`; alias rows resolve through their `canonical` target.
 *
 * @example
 *   import { MOTION_CURVES } from "@mkbabb/glass-ui/motion";
 *   const easing = MOTION_CURVES["--spring-snappy"].js; // the iOS-control twin
 *   new NumericAnimation(frames, { timingFunction: easing });
 */
export const MOTION_CURVES: Readonly<Record<string, MotionCurve>> = Object.freeze(
    Object.fromEntries([...CANONICAL, ...ALIASES].map((c) => [c.token, c])),
);

/** The canonical (non-alias) curve rows, in declaration order. */
export const MOTION_CURVES_CANONICAL: readonly MotionCurve[] = CANONICAL;

/** Look up a curve's JS twin by CSS token name (throws on an unknown token). */
export function motionCurve(token: string): MotionCurve {
    const row = MOTION_CURVES[token];
    if (!row) throw new Error(`Unknown motion curve token: ${token}`);
    return row;
}

// ── The value.js `ease*` family, re-exported (the complete curve library) ─────
// The full value.js easing set — re-exported verbatim from the peer so a consumer
// reaches every named curve from `/motion` without a direct value.js dependency.
export {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInBounce,
    CSSCubicBezier,
} from "@mkbabb/value.js";

export { SPRING_PRESETS, springPreset } from "./springPresets";
// NOTE: `SpringPreset` (the 4-name mount type) is owned by useSpringMount.ts; the
// curve library exposes the 5-name `SpringPresetName` + the row interface only.
export type { SpringPresetRow, SpringPresetName } from "./springPresets";
