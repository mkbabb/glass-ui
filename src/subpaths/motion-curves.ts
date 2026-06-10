// @mkbabb/glass-ui/motion-curves — the complete curve library + the CSS↔JS
// `MOTION_CURVES` table (AY.W-MOTION2).
//
// This is the value.js-BEARING leaf of the motion system, carved OFF `/motion` by
// the §2.2 profile:bundle MEASUREMENT: value.js is a ~124 KB peer with NO granular
// `/easing` sub-entry, and `/motion`'s composables are value.js-FREE — statically
// re-exporting the value.js `ease*` family from `/motion` would drag the whole
// value.js graph onto its eager chunk (the AP.W3 "a cheap import must not drag a
// heavy peer" carve, one level down; same shape as the `/color` value.js-only leaf).
//
// What ships here:
//   · MOTION_CURVES — the CSS-token→JS-callable table (every `--ease-*`/`--spring-*`
//     token's JS twin; spring rows via keyframes.js `springTimingFunction`, bezier
//     rows via value.js `CSSCubicBezier`).
//   · the value.js `ease*` family + `CSSCubicBezier`, re-exported verbatim.
//   · the shared `SPRING_PRESETS` (also on `/motion` as pure value.js-free data).
//
// A consumer that wants ONLY the keyframes.js suite (NumericAnimation, Sequence, …)
// stays on `/motion` and never reaches value.js; a consumer that wants the named
// curve set imports here.
export * from "../composables/motion/curves";
