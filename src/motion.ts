// @mkbabb/glass-ui/motion — keyframes.js-bearing motion composables (v1.0 flat subpath)
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
// Asymmetry note (the latent oversight this subpath retires): the L.W1 Lane C
// closure curated the vueuse-bearing surface into its own subpath but left the
// keyframes-bearing surface on the root barrel. The motion sub-tree's barrel
// (`composables/motion/index.ts`) re-exports `useSpringOrchestrator`,
// `useAnimatedNumber`, `useAnimatedNumberMap`, `useStagger`, `useStaggerReveal`,
// `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `installDarkModeSync`
// + `constants` (DAMPING, SNAP_THRESHOLD, RAFLoopTiming type, etc.). Only
// `useSpringOrchestrator` + `useAnimatedNumber` (and `useAnimatedNumberMap` via
// `useAnimatedNumber`) actually import from `@mkbabb/keyframes.js`, but the
// barrel ships them together because the bundler walks the sub-tree's
// `export *` chain as one SCC anyway — separating keyframes-touching from
// keyframes-adjacent composables here would be a fictitious distinction.
//
// L.W2 — Implementation home is the `src/composables/motion/` sub-tree. This
// file is a thin re-export that resolves through the sub-tree's `index.ts`,
// so the public flat subpath stays decoupled from the internal directory
// layout (same pattern as `/dark` and `/keyboard`).
//
// BREAKING (v2.0.0): consumers that previously reached `useStagger`,
// `useAnimatedNumber`, `useAnimatedNumberMap`, `useSpringOrchestrator`,
// `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`,
// `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD`, `RAFLoopTiming`,
// `PausableRuntime`, etc. through `@mkbabb/glass-ui` must migrate to
// `@mkbabb/glass-ui/motion`. See MIGRATION.md and CHANGELOG.md for the full
// migration list. No back-compat root-barrel alias is retained — the carry
// retires cleanly per precept 1 (NO workarounds) + precept 2 (NO legacy code).
export * from "./composables/motion";
