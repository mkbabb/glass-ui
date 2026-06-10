// Sub-tree barrel for the keyframes.js-BEARING motion composables.
//
// AP.W3 R0G-7 — re-pointed to the bearing set only. The keyframes-FREE leaves
// (useStaggerReveal, useScrollProgress, useRAFLoop, useIntersectionPause,
// constants) carved out to the flat `@mkbabb/glass-ui/motion-core`
// sibling subpath (`composables/motion/core/index.ts`); the keyframes-free but
// vueuse-bearing `installDarkModeSync` relocated to `composables/dark/`. This
// barrel ships ONLY the leaves whose module-eval reaches `@mkbabb/keyframes.js`
// (directly or transitively) so a `/motion-core` import stays engine-free.
//
// `constants` stays here too — it is keyframes-free (so it also ships on
// `/motion-core`), but the bearing leaves read DAMPING/SNAP_THRESHOLD from it.
// Duplicate-exporting a pure-data module from two entries is benign (W1.2 §A.2).
//
// NO alias for the relocated free leaves / installDarkModeSync (inv 47);
// consumers rename per call site (see MIGRATION.md / CHANGELOG.md).
export * from "./constants";
export * from "./useSpring";
export * from "./useSpringMount";
export * from "./useSpringPress";
export * from "./useNumericTransition";
export * from "./useAnimatedNumber";
// AW.W19/Item-5 (extended) — useAnimatedNumberMap re-instated: removed at the AV
// cbbaeb0 orphan sweep, but it has ≥2 LIVE external consumers over /motion
// (muster ×3: ssr-entry/useReRank/RankedVerdict; speedtest ×2:
// useMetricResult/MetricGaugeCards) — the same internal-only-rg blind spot that
// mis-pruned the /dom leaves. Keyframes-bearing (composes useAnimatedNumber).
export * from "./useAnimatedNumberMap";
// AV.W3 — the editorial count-up animator. Rides the keyframes LIGHT
// `NumericAnimation` engine (value.js-free callable easing) → keyframes-BEARING,
// so it ships ONLY here (`/motion`), NOT on `/motion-core` and NOT on the root.
export * from "./useCountup";

// AY.W-MOTION2 — `/motion` is the documented home of the keyframes.js motion
// system. The keyframes.js STATIC suite (NumericAnimation, Sequence, the spring/
// FLIP/gesture/stagger constructors, loadAnimationEngine itself) re-exported
// verbatim; the DYNAMIC engine surface stays behind `loadAnimationEngine()`
// (suite.ts header).
export * from "./suite";
// The (response, ζ) shared table is re-exported here too (value.js-FREE pure data),
// so a `/motion` consumer reaches SPRING_PRESETS without the curve-library peer edge.
export {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetRow,
    type SpringPresetName,
} from "./springPresets";
//
// The complete CURVE LIBRARY (MOTION_CURVES + the value.js `ease*` family +
// CSSCubicBezier) ships on the FLAT SIBLING `@mkbabb/glass-ui/motion-curves`
// (`src/motion-curves.ts` → `./curves`), NOT here — §2.2 MEASUREMENT decided it:
// value.js is a ~124 KB peer with no granular `/easing` sub-entry, and `/motion`'s
// composables are value.js-FREE; statically importing the `ease*` family here would
// drag value.js onto `/motion`'s eager graph (the AP.W3 "a cheap import must not
// drag a heavy peer" carve, again). The curve table rides the `/color`-leaf pattern.
