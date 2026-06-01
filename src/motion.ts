// @mkbabb/glass-ui/motion — keyframes.js-BEARING motion composables (v1.0 flat subpath)
//
// AI.W1 R3 — closes AI-CARRY-GLASS-UI-KEYFRAMES-EDGE (4-tranche chronic from
// the AI tranche; ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk carried on
// every consumer's entry path because the root barrel statically reached
// `@mkbabb/keyframes.js` through the `composables/motion` sub-tree).
//
// This subpath isolates the composables whose implementations import
// `@mkbabb/keyframes.js` so consumers opt into them explicitly. Mirrors the
// L.W1 Lane C SCC-trap-closure precedent that carved `/dark` + `/keyboard`
// + `/carousel` off the root barrel for the vueuse-bearing surface — same
// shape, same rationale, different heavy peer (NumericAnimation + SmoothProgress
// engines instead of the @vueuse/core SCC).
//
// AP.W3 R0G-7 — the SCC carve is now finished one level down. The AI.W1 barrel
// shipped ALL twelve motion leaves together on the theory that "the bundler
// walks the sub-tree's `export *` chain as one SCC anyway" — a fictitious
// distinction. That premise is OVERTURNED by consumer measurement: a cheap path
// touching ZERO keyframes still dragged the ~125 KB engine onto the eager graph,
// because the joined barrel is what made the SCC, not the leaves (they split
// cleanly). W3 breaks the barrel: the keyframes-BEARING leaves stay here, the
// keyframes-FREE leaves carve out to the flat `@mkbabb/glass-ui/motion-core`
// sibling, and the keyframes-free-but-vueuse-bearing `installDarkModeSync`
// relocates to `@mkbabb/glass-ui/dark`. So `/motion` now ships ONLY:
// `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`,
// `useAnimatedNumber`, `useAnimatedNumberMap` + `constants` (DAMPING,
// SNAP_THRESHOLD — duplicate-exported on `/motion-core`; the bearing leaves read
// them). `RAFLoopTiming` + `PausableRuntime` types move to `/motion-core` with
// their leaves (no bearing leaf references them).
//
// L.W2 — Implementation home is the `src/composables/motion/` sub-tree. This
// file is a thin re-export that resolves through the sub-tree's `index.ts`,
// so the public flat subpath stays decoupled from the internal directory
// layout (same pattern as `/dark` and `/keyboard`).
//
// BREAKING (v2.0.0): consumers that previously reached `useAnimatedNumber`,
// `useAnimatedNumberMap`, `useNumericTransition`, `useSpring`, `useSpringMount`,
// `useSpringPress`, `DAMPING`, `SNAP_THRESHOLD` through `@mkbabb/glass-ui` must
// migrate to `@mkbabb/glass-ui/motion`. The keyframes-free leaves
// (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
// `useIntersectionPause`, `RAFLoopTiming`, `PausableRuntime`) live on
// `@mkbabb/glass-ui/motion-core`; `installDarkModeSync` lives on
// `@mkbabb/glass-ui/dark`. See MIGRATION.md and CHANGELOG.md for the full
// rename table. No back-compat alias is retained on either subpath — the carve
// retires cleanly per precept 1 (NO workarounds) + precept 2 (NO legacy code).
export * from "./composables/motion";
