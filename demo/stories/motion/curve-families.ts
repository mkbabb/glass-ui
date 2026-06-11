// AZ.W-MOTION-SUITE — the demo-local FULL curve taxonomy, grouped by the keyframes
// 10-family register (EASING_GROUPS at keyframes.js/demo/easing/easingGroups.ts:28):
// Standard / Sine / Quad / Cubic / Expo / Circ / Back / Bounce / Steps / Custom.
//
// Every row's `fn` is the REAL JS twin — NO hand-rolled cubic/step sampler. The twin
// SOURCE split is binding (the Back/Steps trap):
//   · the glass-ui canonical springs + bezier cores ride `MOTION_CURVES` (the /motion
//     re-export — the shipped CSS↔JS table);
//   · the analytic ease* set (Sine/Quad/Cubic/Expo/Circ + `easeInBounce`) rides the
//     `curves.ts` re-export of the value.js family;
//   · Back has NO analytic `ease*` twin — it is a value.js `bezierPresets` entry, so a
//     Back row is `CSSCubicBezier(...bezierPresets["ease-*-back"])`;
//   · the Bounce family's 5 `bounce*Ease` siblings + Steps' `steppedEase`/`stepStart`/
//     `stepEnd` live ONLY as value.js generators.
// `curves.ts` re-exports NEITHER `bezierPresets` NOR the step generators, so Back/
// Bounce/Steps import their twins DIRECTLY from `@mkbabb/value.js` (the sanctioned
// peer demo dep) — the shipped twin, not a fork.

import {
    // the analytic ease* set (Sine/Quad/Cubic/Expo/Circ + the bounce primitive) — via
    // the glass-ui /motion re-export (curves.ts:190-211).
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInBounce,
    linear,
    CSSCubicBezier,
    MOTION_CURVES,
    type MotionCurve,
} from "../../../src/composables/motion/curves";
import {
    // Back (bezier preset only) / Bounce siblings / Steps generators — the value.js
    // twins NOT re-exported by curves.ts. The sanctioned direct peer import.
    bezierPresets,
    bounceInEase,
    bounceInEaseHalf,
    bounceOutEase,
    bounceOutEaseHalf,
    bounceInOutEase,
    steppedEase,
    stepStart,
    stepEnd,
} from "@mkbabb/value.js";

/** A curve sampled by its REAL JS twin `(t) => number`. */
export type CurveFn = (t: number) => number;

export interface CurveRow {
    /** The curve's display name (the value.js / CSS-token name). */
    readonly name: string;
    /** The JS-twin source label (the right column made concrete). */
    readonly jsName: string;
    /** The REAL JS twin — sampled directly, never a hand-rolled approximation. */
    readonly fn: CurveFn;
    /** A spring overshoots past 1 (plot/dot must allow it); a step jumps. */
    readonly kind: "spring" | "bezier" | "analytic" | "step";
    /** The register doc (one line). */
    readonly note: string;
}

export interface CurveFamily {
    readonly family: string;
    readonly blurb: string;
    readonly rows: readonly CurveRow[];
}

// Sample a `MOTION_CURVES` row's twin (spring → Easing.fn; bezier → callable).
function motionFn(row: MotionCurve): CurveFn {
    const js = row.js as { fn?: (t: number) => number } | ((t: number) => number);
    return typeof js === "function" ? js : (t: number) => js.fn?.(t) ?? t;
}

function springRow(token: string, jsName: string): CurveRow {
    const row = MOTION_CURVES[token];
    return { name: token, jsName, fn: motionFn(row), kind: "spring", note: row.note };
}

function bezierCoreRow(token: string, jsName: string): CurveRow {
    const row = MOTION_CURVES[token];
    return { name: token, jsName, fn: motionFn(row), kind: "bezier", note: row.note };
}

function analyticRow(name: string, fn: CurveFn, note: string): CurveRow {
    return { name, jsName: name, fn, kind: "analytic", note };
}

// Back lives ONLY as a value.js bezier preset — drive it through CSSCubicBezier.
function backRow(name: string, preset: keyof typeof bezierPresets, note: string): CurveRow {
    const [x1, y1, x2, y2] = bezierPresets[preset];
    return {
        name,
        jsName: `CSSCubicBezier(${x1}, ${y1}, ${x2}, ${y2})`,
        fn: CSSCubicBezier(x1, y1, x2, y2),
        kind: "bezier",
        note,
    };
}

// The step generators are FACTORIES — `steppedEase(n, mode)` / `stepStart()` /
// `stepEnd()` each RETURN the actual easing fn.
const stepStartFn = stepStart();
const stepEndFn = stepEnd();
const steps4Fn = steppedEase(4, "end");

export const CURVE_FAMILIES: readonly CurveFamily[] = [
    {
        family: "Standard",
        blurb: "The glass-ui canonical springs + bezier cores — the shipped MOTION_CURVES table.",
        rows: [
            springRow("--spring-smooth", "springTimingFunction(0.5, 0.86)"),
            springRow("--spring-snappy", "springTimingFunction(0.35, 0.65)"),
            springRow("--spring-bouncy", "springTimingFunction(0.5, 0.45)"),
            springRow("--spring-gentle", "springTimingFunction(0.7, 1.0)"),
            springRow("--spring-dock", "springTimingFunction(0.32, 0.7)"),
            bezierCoreRow("--motion-ease-standard", "CSSCubicBezier(.4,0,.2,1)"),
            bezierCoreRow("--motion-ease-out", "CSSCubicBezier(0,0,.2,1)"),
            bezierCoreRow("--motion-ease-in", "CSSCubicBezier(.4,0,1,1)"),
            analyticRow("linear", linear, "no easing — the reference diagonal"),
        ],
    },
    {
        family: "Sine",
        blurb: "Gentle sinusoidal — the softest analytic register.",
        rows: [
            analyticRow("easeInSine", easeInSine, "soft accelerate"),
            analyticRow("easeOutSine", easeOutSine, "soft decelerate"),
            analyticRow("easeInOutSine", easeInOutSine, "soft both ends"),
        ],
    },
    {
        family: "Quad",
        blurb: "Quadratic — the mild power register.",
        rows: [
            analyticRow("easeInQuad", easeInQuad, "t² accelerate"),
            analyticRow("easeOutQuad", easeOutQuad, "t² decelerate"),
            analyticRow("easeInOutQuad", easeInOutQuad, "t² both ends"),
        ],
    },
    {
        family: "Cubic",
        blurb: "Cubic — the workhorse power register.",
        rows: [
            analyticRow("easeInCubic", easeInCubic, "t³ accelerate"),
            analyticRow("easeOutCubic", easeOutCubic, "t³ decelerate"),
            analyticRow("easeInOutCubic", easeInOutCubic, "t³ both ends"),
        ],
    },
    {
        family: "Expo",
        blurb: "Exponential — the boldest decelerate (the underline draw-on register).",
        rows: [
            analyticRow("easeInExpo", easeInExpo, "2^x accelerate"),
            analyticRow("easeOutExpo", easeOutExpo, "house expo — bold reveal"),
            analyticRow("easeInOutExpo", easeInOutExpo, "2^x both ends"),
        ],
    },
    {
        family: "Circ",
        blurb: "Circular — the arc-of-a-circle register.",
        rows: [
            analyticRow("easeInCirc", easeInCirc, "circular accelerate"),
            analyticRow("easeOutCirc", easeOutCirc, "circular decelerate"),
            analyticRow("easeInOutCirc", easeInOutCirc, "circular both ends"),
        ],
    },
    {
        family: "Back",
        blurb: "Anticipate / overshoot — the value.js bezierPresets back curves (no analytic twin).",
        rows: [
            backRow("ease-in-back", "ease-in-back", "anticipate before accelerating"),
            backRow("ease-out-back", "ease-out-back", "overshoot then settle"),
            backRow("ease-in-out-back", "ease-in-out-back", "anticipate + overshoot"),
        ],
    },
    {
        family: "Bounce",
        blurb: "Bounce — easeInBounce (curves.ts) + the value.js bounce*Ease siblings.",
        rows: [
            analyticRow("easeInBounce", easeInBounce, "bounce into place"),
            analyticRow("bounceInEase", bounceInEase, "bounce-in register"),
            analyticRow("bounceInEaseHalf", bounceInEaseHalf, "half-amplitude bounce-in"),
            analyticRow("bounceOutEase", bounceOutEase, "bounce-out register"),
            analyticRow("bounceOutEaseHalf", bounceOutEaseHalf, "half-amplitude bounce-out"),
            analyticRow("bounceInOutEase", bounceInOutEase, "bounce both ends"),
        ],
    },
    {
        family: "Steps",
        blurb: "Discrete jumps — the value.js step generators (steppedEase / stepStart / stepEnd).",
        rows: [
            { name: "steps(4, end)", jsName: "steppedEase(4, \"end\")", fn: steps4Fn, kind: "step", note: "four discrete jumps, last on arrival" },
            { name: "step-start", jsName: "stepStart()", fn: stepStartFn, kind: "step", note: "instant jump at t=0" },
            { name: "step-end", jsName: "stepEnd()", fn: stepEndFn, kind: "step", note: "instant jump at t=1" },
        ],
    },
];
