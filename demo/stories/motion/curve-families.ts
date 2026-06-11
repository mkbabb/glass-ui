// AZ.W-MOTION2 (R7-4) — the demo-local curve taxonomy, 1:1 ISOMORPHIC to the
// keyframes easing canon (EASING_GROUPS at keyframes.js/demo/easing/easingGroups.ts:28
// + the SPRING_PRESETS spring surface + the CSS Easing L2 linear() form):
//   Standard · Sine · Quad · Cubic · Expo · Circ · Back · Bounce · Steps ·
//   Linear() · Springs · Custom.
//
// The W-MOTION-SUITE buildout grouped the 5 springs UNDER "Standard" and named
// every analytic row camelCase; this REDRESS corrects the isomorphism:
//   · the keyframes-canon Standard = `linear` + the 4 CSS keyword beziers
//     (`ease`/`ease-in`/`ease-out`/`ease-in-out` from `bezierPresets`);
//   · `smooth-step-3` joins Cubic (the value.js Hermite);
//   · a `Linear()` family demonstrates the CSS Easing L2 piecewise form (the
//     `cssLinear` twin — the form springTimingFunction EMITS);
//   · the 5 springs MOVE to their own `Springs` family, DISPLAY-NAMED by FEEL
//     (smooth/snappy/bouncy/gentle/dock) with the glass-ui token in the sublabel;
//   · every analytic row's `name` is the keyframes-demo HYPHEN register
//     (`ease-in-sine`, …, `ease-in-bounce`); the camel source stays in `jsName`.
//
// Every row's `fn` is the REAL JS twin — NO hand-rolled cubic/step/Hermite sampler.
// The twin SOURCE split is binding (the Back/Steps/Hermite trap):
//   · the glass-ui canonical springs + bezier cores ride `MOTION_CURVES`;
//   · the analytic ease* set rides the `curves.ts` re-export of the value.js family;
//   · Back has NO analytic `ease*` twin — a `bezierPresets` entry via `CSSCubicBezier`;
//   · the 4 CSS Standard keywords are `bezierPresets["ease*"]` via `CSSCubicBezier`;
//   · `smoothStep3` (Cubic), `cssLinear` (Linear()), the Bounce `bounce*Ease`
//     siblings + Steps' `steppedEase`/`stepStart`/`stepEnd` live ONLY as value.js
//     twins — imported DIRECTLY from `@mkbabb/value.js` (the sanctioned peer dep).

import {
    // the analytic ease* set (Sine/Quad/Cubic/Expo/Circ + the bounce primitive) — via
    // the glass-ui /motion re-export (curves.ts).
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
    // Back + the 4 CSS Standard keywords (bezier presets) / Bounce siblings / Steps
    // generators / the Hermite smoothStep3 / the cssLinear piecewise twin — the
    // value.js twins NOT re-exported by curves.ts. The sanctioned direct peer import.
    bezierPresets,
    bounceInEase,
    bounceInEaseHalf,
    bounceOutEase,
    bounceOutEaseHalf,
    bounceInOutEase,
    steppedEase,
    stepStart,
    stepEnd,
    smoothStep3,
    cssLinear,
    type LinearStop,
} from "@mkbabb/value.js";

/** A curve sampled by its REAL JS twin `(t) => number`. */
export type CurveFn = (t: number) => number;

export interface CurveRow {
    /** The curve's display name — the keyframes-demo HYPHEN register. */
    readonly name: string;
    /** The JS-twin source label (the camel/source name made concrete). */
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

// A spring row — DISPLAY-NAMED by FEEL (the keyframes-demo register), the glass-ui
// token in the jsName sublabel.
function springRow(feel: string, token: string, jsName: string): CurveRow {
    const row = MOTION_CURVES[token];
    return { name: feel, jsName: `${jsName}  ·  ${token}`, fn: motionFn(row), kind: "spring", note: row.note };
}

function analyticRow(name: string, jsName: string, fn: CurveFn, note: string): CurveRow {
    return { name, jsName, fn, kind: "analytic", note };
}

// A bezier row driven through CSSCubicBezier from a value.js bezierPresets entry
// (the 4 CSS Standard keywords + the 3 Back curves — neither has an analytic twin).
function bezierPresetRow(name: string, preset: keyof typeof bezierPresets, note: string): CurveRow {
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

// The CSS Easing L2 linear() multi-stop demonstration row — the piecewise form
// `springTimingFunction` EMITS, distinct from the `linear` keyword. Driven by the
// shipped value.js `cssLinear` twin (the §3a scope-reveal disposition: a direct
// shipped twin, NOT a hand-rolled piecewise sampler). The stops are a representative
// non-monotone overshoot envelope (the form a spring round-trips to).
const LINEAR_STOPS: LinearStop[] = [
    { output: 0 },
    { output: 0.55, input: 22 },
    { output: 1.08, input: 55 },
    { output: 0.98, input: 78 },
    { output: 1 },
];
const cssLinearFn = cssLinear(LINEAR_STOPS);

export const CURVE_FAMILIES: readonly CurveFamily[] = [
    {
        family: "Standard",
        blurb: "The keyframes-canon Standard — the reference linear plus the four CSS bezier keywords (ease / ease-in / ease-out / ease-in-out), driven by the value.js bezierPresets control points.",
        rows: [
            analyticRow("linear", "linear", linear, "no easing — the reference diagonal"),
            bezierPresetRow("ease", "ease", "gentle start & end — the CSS default"),
            bezierPresetRow("ease-in", "ease-in", "slow start, fast end"),
            bezierPresetRow("ease-out", "ease-out", "fast start, slow end"),
            bezierPresetRow("ease-in-out", "ease-in-out", "slow start & end"),
        ],
    },
    {
        family: "Sine",
        blurb: "Gentle sinusoidal — the softest analytic register.",
        rows: [
            analyticRow("ease-in-sine", "easeInSine", easeInSine, "soft accelerate"),
            analyticRow("ease-out-sine", "easeOutSine", easeOutSine, "soft decelerate"),
            analyticRow("ease-in-out-sine", "easeInOutSine", easeInOutSine, "soft both ends"),
        ],
    },
    {
        family: "Quad",
        blurb: "Quadratic — the mild power register.",
        rows: [
            analyticRow("ease-in-quad", "easeInQuad", easeInQuad, "t² accelerate"),
            analyticRow("ease-out-quad", "easeOutQuad", easeOutQuad, "t² decelerate"),
            analyticRow("ease-in-out-quad", "easeInOutQuad", easeInOutQuad, "t² both ends"),
        ],
    },
    {
        family: "Cubic",
        blurb: "Cubic — the workhorse power register, plus the value.js Hermite smooth-step.",
        rows: [
            analyticRow("ease-in-cubic", "easeInCubic", easeInCubic, "t³ accelerate"),
            analyticRow("ease-out-cubic", "easeOutCubic", easeOutCubic, "t³ decelerate"),
            analyticRow("ease-in-out-cubic", "easeInOutCubic", easeInOutCubic, "t³ both ends"),
            analyticRow("smooth-step-3", "smoothStep3", smoothStep3, "hermite interpolation (3t² − 2t³)"),
        ],
    },
    {
        family: "Expo",
        blurb: "Exponential — the boldest decelerate (the underline draw-on register).",
        rows: [
            analyticRow("ease-in-expo", "easeInExpo", easeInExpo, "2^x accelerate"),
            analyticRow("ease-out-expo", "easeOutExpo", easeOutExpo, "house expo — bold reveal"),
            analyticRow("ease-in-out-expo", "easeInOutExpo", easeInOutExpo, "2^x both ends"),
        ],
    },
    {
        family: "Circ",
        blurb: "Circular — the arc-of-a-circle register.",
        rows: [
            analyticRow("ease-in-circ", "easeInCirc", easeInCirc, "circular accelerate"),
            analyticRow("ease-out-circ", "easeOutCirc", easeOutCirc, "circular decelerate"),
            analyticRow("ease-in-out-circ", "easeInOutCirc", easeInOutCirc, "circular both ends"),
        ],
    },
    {
        family: "Back",
        blurb: "Anticipate / overshoot — the value.js bezierPresets back curves (no analytic twin).",
        rows: [
            bezierPresetRow("ease-in-back", "ease-in-back", "anticipate before accelerating"),
            bezierPresetRow("ease-out-back", "ease-out-back", "overshoot then settle"),
            bezierPresetRow("ease-in-out-back", "ease-in-out-back", "anticipate + overshoot"),
        ],
    },
    {
        family: "Bounce",
        blurb: "Bounce — ease-in-bounce (curves.ts) + the value.js bounce*Ease siblings.",
        rows: [
            analyticRow("ease-in-bounce", "easeInBounce", easeInBounce, "bounce into place"),
            analyticRow("bounce-in-ease", "bounceInEase", bounceInEase, "bounce-in register"),
            analyticRow("bounce-in-ease-half", "bounceInEaseHalf", bounceInEaseHalf, "half-amplitude bounce-in"),
            analyticRow("bounce-out-ease", "bounceOutEase", bounceOutEase, "bounce-out register"),
            analyticRow("bounce-out-ease-half", "bounceOutEaseHalf", bounceOutEaseHalf, "half-amplitude bounce-out"),
            analyticRow("bounce-in-out-ease", "bounceInOutEase", bounceInOutEase, "bounce both ends"),
        ],
    },
    {
        family: "Steps",
        blurb: "Discrete jumps — the value.js step generators (steppedEase / stepStart / stepEnd). A live-parameterized n / jump-term editor is the W-MOTION3 successor.",
        rows: [
            { name: "steps(4, end)", jsName: "steppedEase(4, \"end\")", fn: steps4Fn, kind: "step", note: "four discrete jumps, last on arrival" },
            { name: "step-start", jsName: "stepStart()", fn: stepStartFn, kind: "step", note: "instant jump at t=0" },
            { name: "step-end", jsName: "stepEnd()", fn: stepEndFn, kind: "step", note: "instant jump at t=1" },
        ],
    },
    {
        family: "Linear()",
        blurb: "The CSS Easing L2 linear() multi-stop form — a piecewise-linear timing function. This is the artifact springTimingFunction EMITS (and getTimingFunction re-parses), distinct from the bare linear keyword. Driven by the shipped value.js cssLinear twin.",
        rows: [
            {
                name: "linear(0, .55 22%, 1.08 55%, .98 78%, 1)",
                jsName: "cssLinear([{0},{.55,22%},{1.08,55%},{.98,78%},{1}])",
                fn: cssLinearFn,
                kind: "step",
                note: "piecewise-linear overshoot envelope — the spring's linear() round-trip form",
            },
        ],
    },
    {
        family: "Springs",
        blurb: "The iOS spring presets — named by FEEL (the keyframes demo/spring register), the glass-ui --spring-* token in the sublabel. ζ < 1 overshoots past 1 then settles; keyframes presents springs on their own surface, so they get their own family here.",
        rows: [
            springRow("smooth", "--spring-smooth", "springTimingFunction(0.5, 0.86)"),
            springRow("snappy", "--spring-snappy", "springTimingFunction(0.35, 0.65)"),
            springRow("bouncy", "--spring-bouncy", "springTimingFunction(0.5, 0.45)"),
            springRow("gentle", "--spring-gentle", "springTimingFunction(0.7, 1.0)"),
            springRow("dock", "--spring-dock", "springTimingFunction(0.32, 0.7)"),
        ],
    },
];
